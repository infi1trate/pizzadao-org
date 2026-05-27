import { CalendarPlus, ExternalLink } from "lucide-react";
import Window from "../components/Window";
import { useWeek, buildAddToCalendarUrl, type WeekItem } from "../week/useWeek";

/**
 * "Your week" — a horizontal strip of upcoming events the member is RSVP'd
 * to or eligible for. The first (most imminent) item gets a butter tint;
 * the rest stay cream. Each card uses Window chrome so the row reads as a
 * single shelf of small panels, not floating tiles.
 */

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const fmtDay = (iso: string) => {
  const d = new Date(iso);
  return `${DAY[d.getDay()]} ${d.getDate()}`;
};
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const EventCard = ({ ev, imminent }: { ev: WeekItem; imminent: boolean }) => {
  const tone = imminent ? "butter" : "cream";
  const sticker = ev.crew === "Party" ? "🎉" : ev.isLiveNow ? "🔴" : "📅";
  return (
    <Window
      label={ev.crew ? `${ev.crew} crew` : "Crew call"}
      sticker={sticker}
      tone={tone}
      className="min-w-[260px] max-w-[340px] flex-1"
      bodyClassName="flex h-full flex-col"
    >
      <div className="flex items-baseline gap-2">
        <span className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-extrabold leading-none tracking-tight">
          {fmtDay(ev.start)}
        </span>
        <span className="ui text-[12px] font-medium text-ink/55 tabular-nums">
          {fmtTime(ev.start)}
        </span>
      </div>
      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-ink line-clamp-2">
        {ev.title}
      </h3>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {ev.joinUrl && (
          <a
            href={ev.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-[12.5px] font-semibold text-cream hover:bg-ink-soft"
            style={{ ["--button-radius" as never]: "9999px" }}
          >
            <span className="whitespace-nowrap">{ev.isLiveNow ? "Jump in" : "Join"}</span>
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        )}
        <a
          href={buildAddToCalendarUrl(ev)}
          target="_blank"
          rel="noopener noreferrer"
          className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[hsl(var(--rule-warm))]/60 px-3.5 py-1.5 text-[12.5px] font-medium text-ink/75 hover:border-ink/40 hover:text-ink"
          style={{ ["--button-radius" as never]: "9999px" }}
        >
          <CalendarPlus className="h-3.5 w-3.5" strokeWidth={2} />
          <span className="whitespace-nowrap">Add to calendar</span>
        </a>
      </div>
    </Window>
  );
};

const Skeleton = () => (
  <div className="flex gap-5 overflow-hidden">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="window min-w-[260px] flex-1 animate-pulse"
        style={{ height: 180 }}
      />
    ))}
  </div>
);

const WeekStrip = () => {
  const { items, loading, error } = useWeek();

  const top = (items ?? []).slice(0, 3);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(1.25rem,2.2vw,1.5rem)] font-extrabold leading-tight tracking-tight">
          <span className="ui mr-2 align-middle text-[11px] uppercase tracking-[0.22em] text-ink/45">
            § Your week
          </span>
        </h2>
      </div>

      {loading && <Skeleton />}
      {error && !loading && (
        <Window label="Your week" sticker="📅" tone="paper">
          <p className="text-[14.5px] text-ink/65">
            Calendar is taking a beat — try again in a minute.
          </p>
        </Window>
      )}
      {!loading && !error && top.length === 0 && (
        <Window label="Your week" sticker="📅" tone="paper">
          <p className="text-[14.5px] text-ink/65">
            Nothing on the calendar this week. Quiet week in the kitchen.
          </p>
        </Window>
      )}
      {!loading && top.length > 0 && (
        <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
          {top.map((ev, i) => (
            <EventCard key={`${ev.start}-${i}`} ev={ev} imminent={i === 0} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WeekStrip;
