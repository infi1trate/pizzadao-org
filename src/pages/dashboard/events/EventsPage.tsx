import { useMemo, useState } from "react";
import {
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Share2,
  X as XIcon,
} from "lucide-react";
import Window from "../components/Window";
import {
  FILTERS,
  applyFilter,
  downloadIcs,
  getAllEvents,
  shareToX,
  type DashboardEvent,
  type FilterKey,
  type RSVPStatus,
} from "./eventsData";

/**
 * /dashboard/events — "What's cooking".
 *
 * Three views (this week / all upcoming / calendar), filter chips,
 * a 7-day strip at the top, window-chrome event cards, and a focused
 * detail panel as a modal. Member-only: view + RSVP, no admin create.
 *
 * Data merges Discord scheduled events + PizzaDAO events (placeholder
 * for both). Each is fetched in eventsData.ts so swapping in real
 * sources is a one-file change.
 */

type View = "week" | "upcoming" | "calendar";

const VIEWS: Array<{ key: View; label: string }> = [
  { key: "week",     label: "This week" },
  { key: "upcoming", label: "All upcoming" },
  { key: "calendar", label: "Calendar view" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const durationLabel = (start: string, end: string) => {
  const mins = Math.max(15, Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / 60_000,
  ));
  if (mins < 60) return `${mins}m`;
  const h = mins / 60;
  if (Number.isInteger(h)) return `${h}h`;
  return `${h.toFixed(1)}h`;
};

// ---------------------------------------------------------------------------

const EventsPage = () => {
  const all = useMemo(getAllEvents, []);
  const [view, setView] = useState<View>("week");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [rsvps, setRsvps] = useState<Record<string, RSVPStatus>>({});
  const [active, setActive] = useState<DashboardEvent | null>(null);
  const [focusDay, setFocusDay] = useState<string | null>(null);

  const filtered = useMemo(() => applyFilter(all, filter), [all, filter]);

  // 7-day strip
  const week = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const events = filtered.filter((e) => sameDay(new Date(e.start), d));
      return { date: d, events };
    });
  }, [filtered]);

  // visible list depends on view + focused day
  const visible = useMemo(() => {
    if (focusDay) {
      const target = new Date(focusDay);
      return filtered.filter((e) => sameDay(new Date(e.start), target));
    }
    if (view === "week") {
      const cutoff = Date.now() + 7 * 86_400_000;
      return filtered.filter((e) => new Date(e.start).getTime() < cutoff);
    }
    return filtered;
  }, [filtered, view, focusDay]);

  const setRsvp = (id: string, status: RSVPStatus) =>
    setRsvps((r) => ({ ...r, [id]: status }));

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      {/* header */}
      <header className="max-w-[60ch]">
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
          § Events
        </p>
        <h1 className="font-display mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.94] tracking-tight">
          What&rsquo;s <span className="handwritten text-tomato">cooking</span>.
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
          Every call, every party, every city.
        </p>
      </header>

      {/* 7-day strip */}
      <div className="mt-8">
        <WeekDayStrip
          week={week}
          focusDay={focusDay}
          onPick={(iso) => {
            setFocusDay((cur) => (cur === iso ? null : iso));
            setView("week");
          }}
        />
      </div>

      {/* view tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {VIEWS.map((v) => {
          const on = view === v.key;
          return (
            <button
              key={v.key}
              type="button"
              onClick={() => {
                setView(v.key);
                setFocusDay(null);
              }}
              className={
                "ui inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors " +
                (on
                  ? "bg-ink text-cream"
                  : "bg-paper text-ink/70 ring-1 ring-ink/10 hover:bg-cream hover:text-ink")
              }
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* filter chips */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {FILTERS.map((f, i) => {
          const on = filter === f.key;
          return (
            <span key={f.key} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilter(f.key)}
                className={
                  "ui inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-[11.5px] font-semibold transition-colors " +
                  (on
                    ? "bg-butter text-ink ring-1 ring-ink/15"
                    : "bg-transparent text-ink/55 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/25")
                }
              >
                {f.label}
              </button>
              {i < FILTERS.length - 1 && (
                <span className="text-ink/20" aria-hidden>·</span>
              )}
            </span>
          );
        })}
      </div>

      {focusDay && (
        <p className="ui mt-4 inline-flex items-center gap-2 text-[12px] text-ink/55">
          Showing {new Date(focusDay).toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
          <button
            onClick={() => setFocusDay(null)}
            className="underline decoration-ink/20 underline-offset-2 hover:text-ink hover:decoration-ink/50"
          >
            Clear
          </button>
        </p>
      )}

      {/* body */}
      <div className="mt-6">
        {view === "calendar" && !focusDay ? (
          <CalendarGrid
            events={filtered}
            onPick={(iso) => {
              setFocusDay(iso);
              setView("week");
            }}
          />
        ) : (
          <EventList
            events={visible}
            rsvps={rsvps}
            onRsvp={setRsvp}
            onOpen={setActive}
          />
        )}
      </div>

      {active && (
        <EventDetail
          ev={active}
          rsvp={rsvps[active.id]}
          onRsvp={(s) => setRsvp(active.id, s)}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
};

// ---------------------------------------------------------------------------

const WeekDayStrip = ({
  week,
  focusDay,
  onPick,
}: {
  week: Array<{ date: Date; events: DashboardEvent[] }>;
  focusDay: string | null;
  onPick: (iso: string) => void;
}) => {
  const today = new Date();
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {week.map(({ date, events }) => {
        const iso = date.toISOString();
        const isToday = sameDay(date, today);
        const isFocus = focusDay && sameDay(new Date(focusDay), date);
        const dots = Math.min(events.length, 3);

        return (
          <button
            key={iso}
            type="button"
            onClick={() => onPick(iso)}
            className={
              "flex min-w-[68px] flex-col items-center rounded-2xl px-3 py-3 ring-1 transition-all " +
              (isFocus
                ? "bg-ink text-cream ring-ink"
                : isToday
                  ? "bg-butter text-ink ring-ink/15"
                  : "bg-cream text-ink ring-ink/10 hover:-translate-y-px hover:ring-ink/25")
            }
          >
            <span className="ui text-[10.5px] uppercase tracking-[0.18em] opacity-70">
              {DAYS[date.getDay()]}
            </span>
            <span className="font-display mt-0.5 text-[1.5rem] font-extrabold leading-none">
              {date.getDate()}
            </span>
            <span className="mt-2 flex h-1.5 items-center gap-1">
              {Array.from({ length: dots }, (_, i) => (
                <span
                  key={i}
                  className={
                    "h-1.5 w-1.5 rounded-full " +
                    (isFocus ? "bg-cream" : "bg-tomato")
                  }
                />
              ))}
              {dots === 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-ink/10" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------

const EventList = ({
  events,
  rsvps,
  onRsvp,
  onOpen,
}: {
  events: DashboardEvent[];
  rsvps: Record<string, RSVPStatus>;
  onRsvp: (id: string, s: RSVPStatus) => void;
  onOpen: (ev: DashboardEvent) => void;
}) => {
  if (events.length === 0) {
    return (
      <Window label="What's cooking" sticker="📅" tone="paper">
        <p className="text-[14.5px] text-ink/65">
          Nothing on the calendar here. Quiet kitchen.
        </p>
      </Window>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {events.map((ev) => (
        <EventCard
          key={ev.id}
          ev={ev}
          rsvp={rsvps[ev.id]}
          onRsvp={(s) => onRsvp(ev.id, s)}
          onOpen={() => onOpen(ev)}
        />
      ))}
    </div>
  );
};

const categorySticker: Record<string, string> = {
  "community-call": "📣",
  "bitcoin-pizza-day": "🍕",
  "city-meetup": "🌍",
  crew: "🛠️",
};

const EventCard = ({
  ev,
  rsvp,
  onRsvp,
  onOpen,
}: {
  ev: DashboardEvent;
  rsvp: RSVPStatus | undefined;
  onRsvp: (s: RSVPStatus) => void;
  onOpen: () => void;
}) => {
  const isUrl = /^https?:/.test(ev.location);
  const tone = ev.special ? "butter" : "cream";

  return (
    <Window
      label={`${DAYS[new Date(ev.start).getDay()]} · ${fmtTime(ev.start)}`}
      sticker={categorySticker[ev.category]}
      tone={tone}
      bodyClassName="flex h-full flex-col"
    >
      <button onClick={onOpen} className="text-left">
        <h3 className="font-display text-[1.25rem] font-bold leading-tight tracking-tight text-ink">
          {ev.title}
        </h3>
        <p className="ui mt-1 text-[11.5px] uppercase tracking-[0.16em] text-ink/45">
          {durationLabel(ev.start, ev.end)} · {ev.host}
          {ev.crew && ` · ${ev.crew} crew`}
        </p>
        <p className="mt-3 inline-flex items-start gap-1.5 text-[13.5px] text-ink/75">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          <span className="line-clamp-1">
            {isUrl ? new URL(ev.location).host : ev.location}
          </span>
        </p>
      </button>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <RsvpToggle value={rsvp} onChange={onRsvp} />
        <button
          type="button"
          onClick={() => downloadIcs(ev)}
          className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[hsl(var(--rule-warm))]/60 px-3 py-1.5 text-[12px] font-medium text-ink/75 hover:border-ink/40 hover:text-ink"
        >
          <CalendarPlus className="h-3.5 w-3.5" strokeWidth={2} />
          <span className="whitespace-nowrap">Add to calendar</span>
        </button>
      </div>
    </Window>
  );
};

// ---------------------------------------------------------------------------

const RSVP_OPTIONS: Array<{ key: RSVPStatus; label: string }> = [
  { key: "going",   label: "Going" },
  { key: "maybe",   label: "Maybe" },
  { key: "not-yet", label: "Not yet" },
];

const RsvpToggle = ({
  value,
  onChange,
}: {
  value: RSVPStatus | undefined;
  onChange: (s: RSVPStatus) => void;
}) => (
  <div className="inline-flex items-center rounded-full bg-paper p-0.5 ring-1 ring-ink/10">
    {RSVP_OPTIONS.map((o) => {
      const on = value === o.key;
      return (
        <button
          key={o.key}
          type="button"
          onClick={() => onChange(o.key)}
          className={
            "ui inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-[11.5px] font-semibold transition-colors " +
            (on
              ? o.key === "going"
                ? "bg-tomato text-cream"
                : "bg-ink text-cream"
              : "text-ink/65 hover:text-ink")
          }
        >
          {on && o.key === "going" && (
            <Check className="-ml-0.5 mr-1 h-3 w-3" strokeWidth={2.5} />
          )}
          {o.label}
        </button>
      );
    })}
  </div>
);

// ---------------------------------------------------------------------------

const CalendarGrid = ({
  events,
  onPick,
}: {
  events: DashboardEvent[];
  onPick: (iso: string) => void;
}) => {
  const today = new Date();
  const [cursor, setCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(
    cursor.getFullYear(),
    cursor.getMonth() + 1,
    0,
  ).getDate();

  const cells: Array<{ date: Date | null; events: DashboardEvent[] }> = [];
  for (let i = 0; i < startWeekday; i++) cells.push({ date: null, events: [] });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(cursor.getFullYear(), cursor.getMonth(), d);
    const dayEvents = events.filter((e) => sameDay(new Date(e.start), date));
    cells.push({ date, events: dayEvents });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null, events: [] });

  return (
    <Window
      label={`${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`}
      sticker="📅"
      bodyClassName="p-3 md:p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
          }
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-ink/[0.06] hover:text-ink"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        </button>
        <span className="font-display text-[1rem] font-bold tracking-tight">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </span>
        <button
          type="button"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
          }
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/60 hover:bg-ink/[0.06] hover:text-ink"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS.map((d) => (
          <div
            key={d}
            className="ui pb-2 text-[10.5px] uppercase tracking-[0.18em] text-ink/40"
          >
            {d}
          </div>
        ))}

        {cells.map((c, i) => {
          if (!c.date) return <div key={i} className="aspect-square" />;
          const isToday = sameDay(c.date, today);
          const has = c.events.length > 0;
          return (
            <button
              key={i}
              type="button"
              onClick={() => has && onPick(c.date!.toISOString())}
              disabled={!has}
              className={
                "relative flex aspect-square flex-col items-center justify-start rounded-lg p-1.5 text-left transition-colors " +
                (isToday
                  ? "bg-butter ring-1 ring-ink/15"
                  : has
                    ? "bg-cream ring-1 ring-ink/10 hover:bg-paper"
                    : "text-ink/35")
              }
            >
              <span className="ui text-[12px] font-semibold tabular-nums">
                {c.date.getDate()}
              </span>
              {has && (
                <span className="mt-auto flex h-1.5 items-center gap-0.5 self-center">
                  {c.events.slice(0, 3).map((_, k) => (
                    <span
                      key={k}
                      className="h-1.5 w-1.5 rounded-full bg-tomato"
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Window>
  );
};

// ---------------------------------------------------------------------------

const EventDetail = ({
  ev,
  rsvp,
  onRsvp,
  onClose,
}: {
  ev: DashboardEvent;
  rsvp: RSVPStatus | undefined;
  onRsvp: (s: RSVPStatus) => void;
  onClose: () => void;
}) => {
  const isUrl = /^https?:/.test(ev.location);
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-3 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Window
          label={ev.special ? "Special event" : "Event"}
          sticker={categorySticker[ev.category]}
          tone={ev.special ? "butter" : "cream"}
          bodyClassName="p-5 md:p-6"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/50 hover:bg-ink/[0.06] hover:text-ink"
          >
            <XIcon className="h-4 w-4" strokeWidth={2} />
          </button>

          <p className="ui text-[11px] uppercase tracking-[0.18em] text-ink/45">
            {new Date(ev.start).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
            {" · "}
            {fmtTime(ev.start)} – {fmtTime(ev.end)} ·{" "}
            {durationLabel(ev.start, ev.end)}
          </p>

          <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-tight tracking-tight">
            {ev.title}
            {ev.special && (
              <span className="handwritten ml-2 text-tomato">a big one</span>
            )}
          </h2>

          <p className="ui mt-2 text-[12.5px] uppercase tracking-[0.16em] text-ink/55">
            Hosted by {ev.host}
            {ev.crew && ` · ${ev.crew} crew`}
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-ink/80">
            {ev.description}
          </p>

          <div className="mt-5 inline-flex items-start gap-2 text-[14px] text-ink/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
            {isUrl ? (
              <a
                href={ev.location}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline decoration-ink/30 underline-offset-2 hover:text-ink"
              >
                {new URL(ev.location).host}
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            ) : (
              <span>{ev.location}</span>
            )}
          </div>

          {/* attendees */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex -space-x-2">
              {ev.attendeeAvatars.slice(0, 5).map((a, i) => (
                <span
                  key={i}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-paper text-[14px] ring-2 ring-cream"
                >
                  {a}
                </span>
              ))}
            </div>
            <p className="text-[13.5px] text-ink/70">
              {ev.attendees.toLocaleString()} going
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-ink/[0.08] pt-5">
            <RsvpToggle value={rsvp} onChange={onRsvp} />
            <button
              type="button"
              onClick={() => downloadIcs(ev)}
              className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[hsl(var(--rule-warm))]/60 px-3.5 py-1.5 text-[12.5px] font-medium text-ink/75 hover:border-ink/40 hover:text-ink"
            >
              <CalendarPlus className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="whitespace-nowrap">Add to calendar</span>
            </button>
            <button
              type="button"
              onClick={() => shareToX(ev)}
              className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-[12.5px] font-semibold text-cream hover:bg-ink-soft"
            >
              <Share2 className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="whitespace-nowrap">Share to X</span>
            </button>
          </div>
        </Window>
      </div>
    </div>
  );
};

export default EventsPage;
