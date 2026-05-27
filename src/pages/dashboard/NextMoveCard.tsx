import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { type NextMove, formatReward } from "./useNextMove";

/**
 * "Do this next" hero card for returning members.
 * One card, one primary action. The card's tone shifts with `kind`:
 *  - event   → live tomato dot + butter surface, urgent but warm
 *  - mission → butter surface with reward chip, focused
 *  - bounty  → cream surface with crew-tinted reward chip
 *  - nudge   → cream surface, no reward, fully soft
 *  - onboarding → butter surface, gentle catch-up
 */

type Props = { move: NextMove };

const bennyExpressions: Record<NextMove["bennyMood"], { mouth: string; brow: number }> = {
  hyped:   { mouth: "M48 76 Q 60 90, 72 76", brow: -2 },
  curious: { mouth: "M50 78 Q 60 82, 70 78", brow: 0 },
  warm:    { mouth: "M50 76 Q 60 84, 70 76", brow: 0 },
  wink:    { mouth: "M50 78 Q 60 84, 70 78", brow: 0 },
};

const Benny = ({ mood }: { mood: NextMove["bennyMood"] }) => {
  const expr = bennyExpressions[mood];
  const winking = mood === "wink";
  return (
    <svg viewBox="0 0 120 110" className="h-20 w-20 md:h-24 md:w-24" aria-hidden>
      <path d="M10 92 L60 4 L110 92 Z" fill="hsl(var(--butter))" />
      <path
        d="M14 90 Q 35 78, 50 92 Q 65 78, 78 92 Q 92 80, 106 90 L110 92 L10 92 Z"
        fill="hsl(45 95% 75%)"
      />
      <circle cx="48" cy="60" r="6.5" fill="hsl(var(--tomato))" />
      <circle cx="74" cy="68" r="5.5" fill="hsl(var(--tomato))" />
      <circle cx="60" cy="40" r="4.5" fill="hsl(var(--tomato))" />
      {/* Three eyes — middle one winks for "wink" mood */}
      <circle cx="45" cy={52 + expr.brow} r="2.4" fill="hsl(var(--ink))" />
      {winking ? (
        <path
          d="M57 34 Q 60 32, 63 34"
          stroke="hsl(var(--ink))"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <circle cx="60" cy={34 + expr.brow} r="2.4" fill="hsl(var(--ink))" />
      )}
      <circle cx="73" cy={58 + expr.brow} r="2.4" fill="hsl(var(--ink))" />
      <path
        d={expr.mouth}
        stroke="hsl(var(--ink))"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

const surfaceFor = (kind: NextMove["kind"]) => {
  switch (kind) {
    case "event":
    case "mission":
    case "onboarding":
      return "bg-butter/65";
    case "bounty":
    case "nudge":
    default:
      return "bg-cream";
  }
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const NextMoveCard = ({ move }: Props) => {
  const surface = surfaceFor(move.kind);
  const cta = (
    <>
      <span className="whitespace-nowrap">{move.cta}</span>
      <ArrowRight className="h-4 w-4" strokeWidth={2} />
    </>
  );

  return (
    <article
      className={`relative overflow-hidden rounded-[28px] ${surface} p-6 ring-1 ring-ink/[0.06] shadow-[0_1px_2px_hsl(30_20%_12%/0.05),0_18px_48px_-24px_hsl(30_20%_12%/0.22)] md:p-10`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="ui inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink/55">
          {move.live && (
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-tomato/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tomato" />
            </span>
          )}
          {move.eyebrow}
        </p>
        {move.reward && (
          <span className="ui inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink/[0.06] px-3 py-1 text-[12px] font-semibold tabular-nums text-ink/80">
            +{formatReward(move.reward)}
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-6 md:gap-10">
        <div className="min-w-0">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1] tracking-tight text-ink">
            {move.title}
          </h2>
          {move.body && (
            <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink/70">
              {move.body}
            </p>
          )}

          <div className="mt-7">
            {isExternal(move.href) ? (
              <a
                href={move.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-lg inline-flex whitespace-nowrap bg-tomato text-cream hover:bg-tomato-deep"
                style={{ ["--button-radius" as never]: "9999px" }}
              >
                {cta}
              </a>
            ) : (
              <Link
                to={move.href}
                className="btn-pill-lg inline-flex whitespace-nowrap bg-tomato text-cream hover:bg-tomato-deep"
                style={{ ["--button-radius" as never]: "9999px" }}
              >
                {cta}
              </Link>
            )}
          </div>
        </div>

        <div className="hidden shrink-0 self-end md:block">
          <Benny mood={move.bennyMood} />
        </div>
      </div>

      {/* Mobile Benny — smaller, tucked at top-right */}
      <div className="pointer-events-none absolute right-3 top-3 md:hidden">
        <Benny mood={move.bennyMood} />
      </div>
    </article>
  );
};

export default NextMoveCard;
