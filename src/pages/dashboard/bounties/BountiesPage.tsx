import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Clock, Plus } from "lucide-react";
import { toast } from "sonner";
import Window from "../components/Window";
import StatusPill from "./StatusPill";
import {
  BOUNTY_FILTERS,
  BOUNTY_SORTS,
  applyBountyFilters,
  getBounties,
  timeAgo,
  timeRemaining,
  type Bounty,
  type BountyFilterKey,
  type BountySortKey,
} from "./bountiesData";

/**
 * /dashboard/bounties — claim open work, earn $PEP.
 *
 * The verb is always CLAIM. Filter chips + sort dropdown at the top,
 * red "Post a bounty" CTA on the right (front-end only for now), and
 * a vertical list of window-chrome cards. Empty state ships with a
 * shrugging Benny.
 */
const BountiesPage = () => {
  const [filter, setFilter] = useState<BountyFilterKey>("all");
  const [sort, setSort] = useState<BountySortKey>("newest");

  const bounties = useMemo(
    () => applyBountyFilters(getBounties(), filter, sort),
    [filter, sort],
  );

  const counts = useMemo(() => {
    const all = getBounties();
    return {
      open: all.filter((b) => b.status === "open").length,
      "in-progress": all.filter((b) => b.status === "in-progress").length,
      completed: all.filter((b) => b.status === "completed").length,
    };
  }, []);

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[60ch]">
          <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
            § Bounties
          </p>
          <h1 className="font-display mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.94] tracking-tight">
            <span className="handwritten text-tomato">Bounties</span>.
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
            Open jobs. First to finish gets paid.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            toast.success("Bounty draft started.", {
              description: "Posting flow goes live with the next update.",
            })
          }
          className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-tomato px-4 py-2 text-[13px] font-semibold text-cream shadow-sm hover:bg-tomato-deep"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          <span className="whitespace-nowrap">Post a bounty</span>
        </button>
      </header>

      {/* filter strip */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {BOUNTY_FILTERS.map((f) => {
          const on = filter === f.key;
          const n =
            f.key === "open" || f.key === "in-progress" || f.key === "completed"
              ? counts[f.key]
              : undefined;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={
                "ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors " +
                (on
                  ? "bg-ink text-cream"
                  : "bg-paper text-ink/65 ring-1 ring-ink/10 hover:bg-cream hover:text-ink")
              }
            >
              <span className="whitespace-nowrap">{f.label}</span>
              {n !== undefined && (
                <span
                  className={
                    "rounded-full px-1.5 text-[10.5px] " +
                    (on ? "bg-cream/15 text-cream" : "bg-ink/[0.07] text-ink/60")
                  }
                >
                  {n}
                </span>
              )}
            </button>
          );
        })}

        <span className="ml-auto inline-flex items-center gap-1">
          <span className="ui text-[11px] uppercase tracking-[0.18em] text-ink/45">
            Sort
          </span>
          <label className="relative inline-flex items-center gap-1 rounded-full bg-paper px-3 py-1.5 text-[12.5px] font-semibold text-ink/70 ring-1 ring-ink/10 hover:text-ink">
            <span className="ui whitespace-nowrap">
              {BOUNTY_SORTS.find((s) => s.key === sort)?.label}
            </span>
            <ChevronDown className="h-3.5 w-3.5 opacity-70" strokeWidth={2} />
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as BountySortKey)}
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {BOUNTY_SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </span>
      </div>

      {/* list */}
      <div className="mt-6 flex flex-col gap-4">
        {bounties.map((b) => (
          <BountyRow key={b.id} bounty={b} />
        ))}
      </div>

      {bounties.length === 0 && <EmptyState />}
    </section>
  );
};

// ---------------------------------------------------------------------------

const BountyRow = ({ bounty }: { bounty: Bounty }) => {
  const action =
    bounty.status === "open"
      ? "Claim it"
      : bounty.status === "in-progress"
        ? "View updates"
        : "View work";

  return (
    <Window
      label={bounty.crew ? `${bounty.crew} crew` : "Open to all"}
      sticker="🎯"
      tone={bounty.status === "open" ? "cream" : "paper"}
      bodyClassName="p-5 md:p-6"
    >
      <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
        {/* status + payout column */}
        <div className="flex shrink-0 flex-col items-start gap-2">
          <StatusPill status={bounty.status} />
          <div className="flex items-baseline gap-1">
            <span className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold leading-none tracking-tight text-ink">
              {bounty.payoutPep}
            </span>
            <span className="ui text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">
              $PEP
            </span>
          </div>
        </div>

        {/* body */}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[1.25rem] font-bold leading-tight tracking-tight text-ink">
            {bounty.title}
          </h3>
          <p className="mt-1.5 text-[14px] leading-snug text-ink/75">
            {bounty.summary}
          </p>

          {bounty.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {bounty.tags.map((t) => (
                <li
                  key={t}
                  className="ui inline-flex items-center rounded-full bg-paper px-2 py-0.5 text-[11px] text-ink/65 ring-1 ring-ink/10"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-ink/60">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cream text-[12px] ring-1 ring-ink/10"
              >
                {bounty.posterAvatar}
              </span>
              Posted by{" "}
              <span className="font-semibold text-ink/80">
                {bounty.posterName}
              </span>
            </span>
            <span className="text-ink/20" aria-hidden>·</span>
            <span>{timeAgo(bounty.postedAt)}</span>
            {bounty.deadlineAt && (
              <>
                <span className="text-ink/20" aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" strokeWidth={2} />
                  {timeRemaining(bounty.deadlineAt)}
                </span>
              </>
            )}
            {bounty.claimedByName && (
              <>
                <span className="text-ink/20" aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cream text-[12px] ring-1 ring-ink/10"
                  >
                    {bounty.claimedByAvatar}
                  </span>
                  Claimed by{" "}
                  <span className="font-semibold text-ink/80">
                    {bounty.claimedByName}
                  </span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="shrink-0">
          <Link
            to={`/dashboard/bounties/${bounty.id}`}
            className={
              "ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors " +
              (bounty.status === "open"
                ? "bg-tomato text-cream hover:bg-tomato-deep"
                : "bg-ink text-cream hover:bg-ink-soft")
            }
          >
            <span className="whitespace-nowrap">{action}</span>
          </Link>
        </div>
      </div>
    </Window>
  );
};

// ---------------------------------------------------------------------------

const EmptyState = () => (
  <Window label="Bounties" sticker="🎯" tone="paper" className="mt-6">
    <div className="flex flex-col items-center gap-4 py-8 text-center md:flex-row md:gap-7 md:text-left">
      <BennyShrug />
      <div>
        <h3 className="font-display text-[1.25rem] font-bold tracking-tight">
          No open bounties right now.
        </h3>
        <p className="mt-1.5 text-[14.5px] text-ink/70">
          Check back soon, or post one yourself.
        </p>
      </div>
    </div>
  </Window>
);

const BennyShrug = () => (
  <svg
    viewBox="0 0 140 140"
    aria-hidden
    className="h-28 w-28 shrink-0"
  >
    {/* slice body */}
    <path
      d="M70 18 L122 122 L18 122 Z"
      fill="hsl(var(--butter))"
      stroke="hsl(var(--ink))"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* crust */}
    <path
      d="M18 122 L122 122"
      stroke="hsl(var(--ink))"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* pepperonis */}
    <circle cx="60" cy="78" r="8" fill="hsl(var(--tomato))" />
    <circle cx="86" cy="92" r="6" fill="hsl(var(--tomato))" />
    <circle cx="70" cy="56" r="5" fill="hsl(var(--tomato))" />
    {/* eyes */}
    <circle cx="58" cy="88" r="2.4" fill="hsl(var(--ink))" />
    <circle cx="82" cy="88" r="2.4" fill="hsl(var(--ink))" />
    {/* friendly mouth */}
    <path
      d="M60 104 Q70 110 80 104"
      stroke="hsl(var(--ink))"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* shrug arms */}
    <path
      d="M30 100 Q22 92 26 80"
      stroke="hsl(var(--ink))"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M110 100 Q118 92 114 80"
      stroke="hsl(var(--ink))"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export default BountiesPage;
