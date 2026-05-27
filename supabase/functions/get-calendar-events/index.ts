import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import ical from 'npm:node-ical@0.20.1';

const ICS_URL =
  'https://calendar.google.com/calendar/ical/lolibebt0pv7da9lv35dviqasg%40group.calendar.google.com/public/basic.ics';

// Warm-instance cache to dodge Google's aggressive ICS rate limiting (HTTP 429).
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 min
const STALE_TTL_MS = 6 * 60 * 60 * 1000; // serve stale up to 6h on 429
let cache: { at: number; text: string } | null = null;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    let text: string;
    const fresh = cache && Date.now() - cache.at < CACHE_TTL_MS;
    if (fresh) {
      text = cache!.text;
    } else {
      const res = await fetch(ICS_URL, {
        headers: {
          // Default Deno UA gets rate-limited fast; a browser-ish UA is friendlier.
          'User-Agent':
            'Mozilla/5.0 (compatible; PizzaDAO-Calendar/1.0; +https://pizzadao.org)',
          Accept: 'text/calendar, text/plain, */*',
        },
      });
      if (res.status === 429 && cache && Date.now() - cache.at < STALE_TTL_MS) {
        // Throttled — serve stale cache.
        text = cache.text;
      } else if (!res.ok) {
        throw new Error(`ICS fetch failed: ${res.status}`);
      } else {
        text = await res.text();
        cache = { at: Date.now(), text };
      }
    }

    const parsed = ical.parseICS(text);

    const now = new Date();
    const horizon = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    const events: Array<{
      start: string;
      end: string | null;
      title: string;
      location: string;
      description: string;
      recurring: boolean;
    }> = [];

    for (const k of Object.keys(parsed)) {
      const ev: any = parsed[k];
      if (!ev || ev.type !== 'VEVENT') continue;

      const isRecurring = !!ev.rrule;
      const pushEv = (start: Date, end: Date | null) => {
        events.push({
          start: start.toISOString(),
          end: end ? end.toISOString() : null,
          title: (ev.summary || '').toString(),
          location: (ev.location || '').toString(),
          description: (ev.description || '').toString(),
          recurring: isRecurring,
        });
      };

      if (ev.rrule) {
        const dates: Date[] = ev.rrule.between(now, horizon, true);
        const duration = ev.end && ev.start ? ev.end.getTime() - ev.start.getTime() : 0;
        for (const d of dates) {
          // Adjust for original time-of-day
          const orig = ev.start as Date;
          const occ = new Date(d);
          occ.setHours(orig.getHours(), orig.getMinutes(), 0, 0);
          // Skip exdates
          if (ev.exdate) {
            const key = occ.toISOString().slice(0, 10);
            const skip = Object.keys(ev.exdate).some((ek) =>
              new Date(ev.exdate[ek]).toISOString().slice(0, 10) === key
            );
            if (skip) continue;
          }
          pushEv(occ, duration ? new Date(occ.getTime() + duration) : null);
        }
      } else if (ev.start) {
        const start = ev.start as Date;
        if (start >= now && start <= horizon) pushEv(start, ev.end ?? null);
      }
    }

    events.sort((a, b) => a.start.localeCompare(b.start));

    return new Response(JSON.stringify({ events }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown';
    return new Response(JSON.stringify({ error: msg, events: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
