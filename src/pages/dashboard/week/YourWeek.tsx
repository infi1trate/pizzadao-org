import { Link } from "react-router-dom";
import { CalendarPlus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildAddToCalendarUrl, useWeek, type WeekItem } from "./useWeek";

/**
 * "Your Week" — calm, scannable calendar surface, pulled forward from the
 * marketing site's buried calendar. Cream cards, soft corners, no red unless
 * an item is live now (then a small pinging tomato dot).
 *
 * The first item gets a butter tint so it visually echoes the hero "Do this
 * next" card when both are showing the same crew call.
 *
 * Data: real PizzaDAO calendar via the existing `get-calendar-events` edge fn.
 * Crew tags are inferred from event titles (heuristic) until real crew
 * memberships exist on the backend.
 */

// TODO: read from member profile once it exists.
const MOCK_MEMBER_CREWS = ["Creative", "Tech"];

const fmt = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const formatRange = (item: WeekItem) => {
  const start = new Date(item.start);
  const end = item.end ? new Date(item.end) : null;
  const startStr = fmt.format(start);
  if (!end) return startStr;
  const mins = Math.round((end.getTime() - start.getTime()) / 60000);
  return `${startStr} · ${mins}m`;
};

const ItemCard = ({ item, primary }: { item: WeekItem; primary: boolean }) => {
  const live = item.isLiveNow;

  const action = live && item.joinUrl ? (
    <a
      href={item.joinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-pill inline-flex whitespace-nowrap bg-tomato text-cream hover:bg-tomato-deep"
      style={{ ["--button-radius" as never]: "9999px" }}
    >
      <span className="whitespace-nowrap">Join now</span>
      <ArrowRight className="h-4 w-4" strokeWidth={2} />
    </a>
  ) : item.joinUrl ? (
    <a
      href={item.joinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-pill inline-flex whitespace-nowrap bg-ink text-cream hover:bg-tomato"
      style={{ ["--button-radius" as never]: "9999px" }}
    >
      <span className="whitespace-nowrap">RSVP</span>
      <ArrowRight className="h-4 w-4" strokeWidth={2} />
    </a>
  ) : (
    <a
      href={buildAddToCalendarUrl(item)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-pill inline-flex whitespace-nowrap bg-ink text-cream hover:bg-tomato"
      style={{ ["--button-radius" as never]: "9999px" }}
    >
      <CalendarPlus className="h-4 w-4" strokeWidth={2} />
      <span className="whitespace-nowrap">Add to calendar</span>
    </a>
  );

  return (
    <article
      className={cn(
        "rounded-3xl p-5 ring-1 ring-ink/[0.06] md:p-6",
        primary ? "bg-butter/55" : "bg-cream",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="ui inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink/55">
            {live && (
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-tomato/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tomato" />
              </span>
            )}
            {live ? <span className="text-tomato">Live now</span> : formatRange(item)}
          </p>
          <h3 className="font-display mt-2 text-[20px] font-extrabold leading-tight tracking-tight text-ink">
            {item.title}
          </h3>
          {item.crew && (
            <p className="mt-1.5 text-[12px] text-ink/55">
              <Link
                to={`/dashboard/crew?c=${encodeURIComponent(item.crew.toLowerCase())}`}
                className="ui font-semibold text-ink/75 underline-offset-2 hover:underline"
              >
                {item.crew} crew
              </Link>
              {item.recurring ? " · recurring" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">{action}</div>
    </article>
  );
};

const Skeleton = () => (
  <div className="grid gap-3 md:grid-cols-2">
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-[148px] rounded-3xl bg-cream ring-1 ring-ink/[0.06]"
        aria-hidden
      />
    ))}
  </div>
);

const YourWeek = () => {
  const { items, error, loading } = useWeek(MOCK_MEMBER_CREWS);

  return (
    <section className="mt-16">
      <header className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="ui text-[11px] uppercase tracking-[0.22em] text-ink/55">
            § Your week
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1] tracking-tight">
            What&rsquo;s cooking.
          </h2>
        </div>
        <Link
          to="/dashboard/events"
          className="ui hidden whitespace-nowrap text-[13px] font-semibold text-ink/65 underline-offset-4 hover:text-ink hover:underline md:inline"
        >
          See all
        </Link>
      </header>

      {loading && <Skeleton />}

      {error && (
        <p className="rounded-2xl bg-cream p-5 text-[14px] text-ink/65 ring-1 ring-ink/[0.06]">
          Couldn&rsquo;t reach the calendar right now. Try again in a bit.
        </p>
      )}

      {items && items.length === 0 && (
        <p className="rounded-2xl bg-cream p-5 text-[14px] text-ink/65 ring-1 ring-ink/[0.06]">
          Nothing on the books for your crews this week. Quiet kitchens cook
          the best dough.
        </p>
      )}

      {items && items.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item, i) => (
            <ItemCard
              key={`${item.start}-${item.title}`}
              item={item}
              primary={i === 0}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default YourWeek;
