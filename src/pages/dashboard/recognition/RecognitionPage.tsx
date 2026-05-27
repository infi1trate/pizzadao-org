import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Share2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import Window from "../components/Window";
import {
  CURRENT_MEMBER_ID,
  formatVouchDate,
  getBadges,
  getCurrentMember,
  getVouchesGiven,
  getVouchesReceived,
  getWallOfMade,
  type Badge,
  type MadeEntry,
  type VouchEntry,
} from "./recognitionData";

/**
 * /dashboard/recognition — vouches, achievements, wall of made.
 *
 * Three vertical window panels:
 *   1. Your Vouches (two columns: received / given)
 *   2. Your Achievements (badge grid + story modal)
 *   3. Wall of Made (butter tint, confetti Benny)
 *
 * Plus an opening "Recognition card" — a shareable summary tile with a
 * one-tap share-to-X CTA. Pure front-end; the share intent is real.
 */

const RecognitionPage = () => {
  const me = useMemo(getCurrentMember, []);
  const received = useMemo(getVouchesReceived, []);
  const given = useMemo(getVouchesGiven, []);
  const badges = useMemo(getBadges, []);
  const wall = useMemo(getWallOfMade, []);
  const [openBadge, setOpenBadge] = useState<Badge | null>(null);

  if (!me) {
    return (
      <section className="animate-fade-in pb-28 md:pb-0">
        <Header />
        <Window label="Recognition" sticker="🏅" tone="paper" className="mt-6">
          <p className="text-[14.5px] text-ink/65">
            Sign in to see your recognition.
          </p>
        </Window>
      </section>
    );
  }

  const shareText = `Recognized by ${received.length} of the family in PizzaDAO. ${me.crews[0]} crew · ${me.level} · ${me.city}. The family is cooking. 🍕`;
  const shareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&hashtags=PizzaDAO`;

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <Header />

      {/* Shareable recognition card */}
      <Window
        label="Your recognition card"
        sticker="✨"
        tone="ink"
        bodyClassName="p-0"
        className="mt-6"
      >
        <RecognitionCard
          name={me.mafiaName}
          city={me.city}
          level={me.level}
          crew={me.crews[0]}
          vouchCount={received.length}
          badgeCount={badges.length}
          shareHref={shareHref}
          onShare={() => toast.success("Recognition card ready to share.")}
        />
      </Window>

      {/* 1. Your Vouches */}
      <Window
        label="Your vouches"
        sticker="🤝"
        bodyClassName="p-5 md:p-6"
        className="mt-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <VouchColumn
            title="Vouching for you"
            count={received.length}
            entries={received}
            emptyTitle="No vouches yet."
            emptyBody="Show up, ship something, the family will notice."
          />
          <VouchColumn
            title="You vouch for"
            count={given.length}
            entries={given}
            emptyTitle="You haven&rsquo;t vouched yet."
            emptyBody="See someone real? Put your name behind theirs."
          />
        </div>
        <div className="mt-6 flex justify-end border-t border-rule/40 pt-4">
          <Link
            to="/dashboard/family?sort=newest"
            className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-tomato px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-tomato-deep"
          >
            Find more to vouch for
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
          </Link>
        </div>
      </Window>

      {/* 2. Your Achievements */}
      <Window
        label="Your achievements"
        sticker="🏅"
        bodyClassName="p-5 md:p-6"
        className="mt-6"
      >
        {badges.length === 0 ? (
          <EmptyState
            title="Just joined."
            body="Watch this space — your first badge is one ship away."
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {badges.map((b) => (
              <BadgeTile key={b.id} badge={b} onClick={() => setOpenBadge(b)} />
            ))}
          </div>
        )}
      </Window>

      {/* 3. Wall of Made */}
      <WallOfMade entries={wall} />

      {/* Badge story modal */}
      {openBadge && (
        <BadgeModal
          badge={openBadge}
          onClose={() => setOpenBadge(null)}
          memberName={me.mafiaName}
        />
      )}
    </section>
  );
};

export default RecognitionPage;

/* ------------------------------------------------------------------------ */
/* Header                                                                   */
/* ------------------------------------------------------------------------ */

const Header = () => (
  <header>
    <h1 className="font-display text-[44px] leading-[0.94] tracking-[-0.02em] text-ink md:text-[64px]">
      Recognition
    </h1>
    <p className="mt-3 max-w-xl text-[15px] leading-[1.55] text-ink/65">
      Who trusts you. What you&rsquo;ve shipped. Who just got made.
    </p>
  </header>
);

/* ------------------------------------------------------------------------ */
/* Recognition Card (shareable hero)                                        */
/* ------------------------------------------------------------------------ */

interface CardProps {
  name: string;
  city: string;
  level: string;
  crew: string;
  vouchCount: number;
  badgeCount: number;
  shareHref: string;
  onShare: () => void;
}

const RecognitionCard = ({
  name,
  city,
  level,
  crew,
  vouchCount,
  badgeCount,
  shareHref,
  onShare,
}: CardProps) => (
  <div className="relative overflow-hidden bg-ink text-cream">
    {/* halftone backdrop */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "radial-gradient(hsl(var(--butter)) 1px, transparent 1.4px)",
        backgroundSize: "10px 10px",
      }}
    />
    <div className="relative grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
      <div>
        <span className="ui inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-butter">
          <Sparkles className="h-3 w-3" strokeWidth={2.5} />
          Recognition card
        </span>
        <h2 className="font-display mt-3 text-[34px] leading-[0.95] tracking-[-0.015em] md:text-[44px]">
          {name}
        </h2>
        <p className="ui mt-2 text-[12px] uppercase tracking-[0.18em] text-cream/70">
          {level} · {crew} crew · {city}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <Stat label="Vouches" value={vouchCount} />
          <Stat label="Badges" value={badgeCount} />
          <Stat label="Crew" value={crew} small />
        </div>
      </div>
      <a
        href={shareHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onShare}
        className="ui inline-flex items-center justify-center gap-2 self-start whitespace-nowrap rounded-full bg-tomato px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-tomato-deep md:self-center"
      >
        <Share2 className="h-3.5 w-3.5" strokeWidth={2.25} />
        Share to X
      </a>
    </div>
  </div>
);

const Stat = ({
  label,
  value,
  small,
}: {
  label: string;
  value: number | string;
  small?: boolean;
}) => (
  <div>
    <div
      className={`font-display leading-none ${
        small ? "text-[22px]" : "text-[30px]"
      }`}
    >
      {value}
    </div>
    <div className="ui mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/55">
      {label}
    </div>
  </div>
);

/* ------------------------------------------------------------------------ */
/* Vouches column                                                           */
/* ------------------------------------------------------------------------ */

const VouchColumn = ({
  title,
  count,
  entries,
  emptyTitle,
  emptyBody,
}: {
  title: string;
  count: number;
  entries: VouchEntry[];
  emptyTitle: string;
  emptyBody: string;
}) => (
  <div>
    <div className="mb-3 flex items-baseline justify-between">
      <h3 className="font-display text-[20px] leading-tight tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <span className="ui text-[11px] uppercase tracking-[0.18em] text-ink/55">
        {count}
      </span>
    </div>
    {entries.length === 0 ? (
      <EmptyState title={emptyTitle} body={emptyBody} compact />
    ) : (
      <ul className="space-y-2.5">
        {entries.map((e) => (
          <li key={e.member.id}>
            <Link
              to={`/dashboard/family/${e.member.id}`}
              className="group flex items-start gap-3 rounded-xl border border-rule/50 bg-card/60 p-3 transition hover:border-ink/30 hover:bg-card"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-butter/60 text-[20px]"
              >
                {e.member.avatarEmoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-[15.5px] leading-tight text-ink">
                    {e.member.mafiaName}
                  </span>
                  <span className="ui shrink-0 text-[10.5px] uppercase tracking-[0.16em] text-ink/45">
                    {formatVouchDate(e.date)}
                  </span>
                </div>
                <div className="ui mt-0.5 text-[11px] uppercase tracking-[0.14em] text-ink/55">
                  {e.member.city} · {e.member.crews[0]}
                </div>
                {e.note && (
                  <p className="mt-1.5 text-[13px] leading-[1.45] text-ink/70">
                    &ldquo;{e.note}&rdquo;
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

/* ------------------------------------------------------------------------ */
/* Badge tile + modal                                                       */
/* ------------------------------------------------------------------------ */

const BadgeTile = ({
  badge,
  onClick,
}: {
  badge: Badge;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative flex flex-col items-center gap-2 rounded-2xl border border-rule/60 bg-card/70 p-4 text-center transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-md"
  >
    {badge.rare && (
      <span
        className="ui absolute -right-1 -top-1 rounded-full bg-tomato px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-cream"
        style={{ transform: "rotate(8deg)" }}
      >
        Rare
      </span>
    )}
    <span
      aria-hidden
      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-butter text-[34px] shadow-inner ring-1 ring-ink/15"
      style={{
        boxShadow: "inset 0 -3px 0 hsl(var(--ink) / 0.08), 0 2px 0 hsl(var(--ink) / 0.06)",
      }}
    >
      <span style={{ transform: "rotate(-6deg)" }}>{badge.emoji}</span>
    </span>
    <span className="font-display text-[13.5px] leading-tight text-ink">
      {badge.label}
    </span>
    <span className="ui text-[10px] uppercase tracking-[0.16em] text-ink/45">
      {formatVouchDate(badge.earnedAt)}
    </span>
  </button>
);

const BadgeModal = ({
  badge,
  onClose,
  memberName,
}: {
  badge: Badge;
  onClose: () => void;
  memberName: string;
}) => {
  const text = `Earned the "${badge.label}" badge in PizzaDAO. ${badge.story} 🍕`;
  const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&hashtags=PizzaDAO`;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={badge.label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ink/15 bg-card shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-1.5 text-ink/55 transition hover:bg-ink/5 hover:text-ink"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
        <div className="flex flex-col items-center gap-3 bg-butter/40 px-6 pb-5 pt-8 text-center">
          <span
            aria-hidden
            className="flex h-20 w-20 items-center justify-center rounded-full bg-butter text-[44px] ring-1 ring-ink/15"
          >
            <span style={{ transform: "rotate(-6deg)" }}>{badge.emoji}</span>
          </span>
          <h3 className="font-display text-[26px] leading-tight tracking-[-0.01em]">
            {badge.label}
          </h3>
          <span className="ui text-[11px] uppercase tracking-[0.18em] text-ink/55">
            Earned {formatVouchDate(badge.earnedAt)} · {memberName}
          </span>
        </div>
        <div className="px-6 pb-6 pt-5">
          <p className="text-[14.5px] leading-[1.55] text-ink/75">
            {badge.story}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="ui mt-5 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-ink-soft"
          >
            <Share2 className="h-3.5 w-3.5" strokeWidth={2.25} />
            Share to X
          </a>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------ */
/* Wall of Made                                                             */
/* ------------------------------------------------------------------------ */

const WallOfMade = ({ entries }: { entries: MadeEntry[] }) => (
  <Window
    label="Wall of made"
    sticker={<BennyConfetti />}
    tone="butter"
    bodyClassName="p-5 md:p-6"
    className="mt-6"
  >
    <div className="mb-4 flex items-baseline justify-between gap-3">
      <div>
        <h3 className="font-display text-[22px] leading-tight tracking-[-0.01em] text-ink">
          Recently made
        </h3>
        <p className="ui mt-1 text-[11px] uppercase tracking-[0.16em] text-ink/55">
          Level 7 · Made Mafia
        </p>
      </div>
      <span className="ui whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-ink/55">
        {entries.length} this month
      </span>
    </div>
    <ul className="space-y-2">
      {entries.map((e) => (
        <li key={e.member.id}>
          <Link
            to={`/dashboard/family/${e.member.id}`}
            className="group flex items-center gap-3 rounded-xl border border-ink/10 bg-cream/60 p-3 transition hover:border-ink/25 hover:bg-cream"
          >
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-butter text-[20px] ring-1 ring-ink/15"
            >
              {e.member.avatarEmoji}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-[16px] leading-tight text-ink">
                  {e.member.mafiaName}
                </span>
                <span className="ui text-[10.5px] uppercase tracking-[0.16em] text-ink/55">
                  {e.member.city} · made {formatVouchDate(e.madeAt)}
                </span>
              </div>
              {e.vouchedBy.length > 0 && (
                <div className="ui mt-1 flex items-center gap-1.5 text-[11px] text-ink/60">
                  <span className="uppercase tracking-[0.14em]">Vouched by</span>
                  <span className="flex -space-x-1.5">
                    {e.vouchedBy.map((v) => (
                      <span
                        key={v.id}
                        title={v.mafiaName}
                        aria-label={v.mafiaName}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-butter text-[11px] ring-1 ring-cream"
                      >
                        {v.avatarEmoji}
                      </span>
                    ))}
                  </span>
                  <span className="font-display text-[12.5px] text-ink/75">
                    {e.vouchedBy.map((v) => v.mafiaName.split(" ")[0]).join(", ")}
                  </span>
                </div>
              )}
            </div>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-ink"
              strokeWidth={2}
            />
          </Link>
        </li>
      ))}
    </ul>
  </Window>
);

/* ------------------------------------------------------------------------ */
/* Benny confetti sticker                                                   */
/* ------------------------------------------------------------------------ */

const BennyConfetti = () => (
  <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
    <circle cx="16" cy="17" r="9" fill="hsl(var(--cream))" stroke="hsl(var(--ink))" strokeWidth="1.5" />
    <circle cx="13" cy="16" r="1.1" fill="hsl(var(--ink))" />
    <circle cx="19" cy="16" r="1.1" fill="hsl(var(--ink))" />
    <path d="M13 19q3 2 6 0" stroke="hsl(var(--ink))" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    {/* confetti */}
    <rect x="4" y="4" width="2" height="2" fill="hsl(var(--tomato))" transform="rotate(20 5 5)" />
    <rect x="26" y="6" width="2" height="2" fill="hsl(var(--butter))" transform="rotate(-15 27 7)" />
    <rect x="6" y="24" width="2" height="2" fill="hsl(var(--tomato))" transform="rotate(30 7 25)" />
    <rect x="25" y="22" width="2" height="2" fill="hsl(var(--ink))" transform="rotate(-20 26 23)" />
  </svg>
);

/* ------------------------------------------------------------------------ */
/* Empty state                                                              */
/* ------------------------------------------------------------------------ */

const EmptyState = ({
  title,
  body,
  compact,
}: {
  title: string;
  body: string;
  compact?: boolean;
}) => (
  <div
    className={`rounded-xl border border-dashed border-rule bg-card/40 ${
      compact ? "p-4" : "p-6"
    } text-center`}
  >
    <p className="font-display text-[16px] leading-tight text-ink">{title}</p>
    <p
      className="mt-1.5 text-[13px] leading-[1.5] text-ink/60"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);
