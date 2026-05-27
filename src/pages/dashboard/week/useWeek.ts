import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type CalendarEvent = {
  start: string;
  end: string | null;
  title: string;
  location: string;
  description: string;
  recurring: boolean;
};

export type WeekItem = CalendarEvent & {
  // Heuristic crew tag inferred from the event title.
  crew: string | null;
  // Time classification at fetch time.
  isLiveNow: boolean;
  // First non-empty URL we could find for "Join".
  joinUrl: string | null;
};

const CREW_KEYWORDS: Array<{ crew: string; match: RegExp }> = [
  { crew: "Creative", match: /\b(creative|brand|design|art)\b/i },
  { crew: "Tech",     match: /\b(tech|dev|engineering|code)\b/i },
  { crew: "Comms",    match: /\b(comms|marketing|writing|editorial)\b/i },
  { crew: "Ops",      match: /\b(ops|operations|coord|gov)\b/i },
  { crew: "Party",    match: /\b(party|pizza party|gpp|host|city)\b/i },
];

const URL_RE = /https?:\/\/[^\s)>\]]+/i;

const inferCrew = (title: string): string | null => {
  for (const { crew, match } of CREW_KEYWORDS) if (match.test(title)) return crew;
  return null;
};

const findJoinUrl = (ev: CalendarEvent): string | null => {
  const hay = `${ev.location}\n${ev.description}`;
  const m = hay.match(URL_RE);
  return m ? m[0] : null;
};

/**
 * Fetches upcoming PizzaDAO calendar events from the shared edge function,
 * augments them with a crew tag, live-now flag, and a join URL.
 * Filters to the member's crews when provided; otherwise returns everything.
 */
export const useWeek = (memberCrews?: string[]) => {
  const [items, setItems] = useState<WeekItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke<{ events: CalendarEvent[] }>(
          "get-calendar-events",
        );
        if (error) throw error;
        const now = Date.now();
        const enriched: WeekItem[] = (data?.events ?? []).map((ev) => {
          const startMs = new Date(ev.start).getTime();
          const endMs = ev.end ? new Date(ev.end).getTime() : startMs + 60 * 60 * 1000;
          return {
            ...ev,
            crew: inferCrew(ev.title),
            isLiveNow: now >= startMs && now <= endMs,
            joinUrl: findJoinUrl(ev),
          };
        });

        const scoped =
          memberCrews && memberCrews.length > 0
            ? enriched.filter((e) => !e.crew || memberCrews.includes(e.crew))
            : enriched;

        if (!cancelled) setItems(scoped.slice(0, 8));
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [memberCrews?.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return { items, error, loading: items === null && error === null };
};

const pad = (n: number) => String(n).padStart(2, "0");
const toGCalDate = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

export const buildAddToCalendarUrl = (ev: WeekItem) => {
  const start = new Date(ev.start);
  const end = ev.end ? new Date(ev.end) : new Date(start.getTime() + 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${toGCalDate(start)}/${toGCalDate(end)}`,
    details: ev.description?.slice(0, 1000) || "",
    location: ev.location || "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
