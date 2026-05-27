import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Window from "../components/Window";
import { useNextMove, formatReward, type NextMove } from "../useNextMove";

/**
 * "Your next move" — left half of the home split hero.
 *
 * One smart card, one tomato CTA, Benny present as a margin illustration in
 * the corner of the panel (never inside data). The card body uses the shared
 * Window chrome so it reads as a peer to "The family is cooking".
 */

const bennyExpressions: Record<NextMove["bennyMood"], { mouth: string }> = {
  hyped:   { mouth: "M48 76 Q 60 90, 72 76" },
  curious: { mouth: "M50 78 Q 60 82, 70 78" },
  warm:    { mouth: "M50 76 Q 60 84, 70 76" },
  wink:    { mouth: "M50 78 Q 60 84, 70 78" },
};

const Benny = ({ mood }: { mood: NextMove["bennyMood"] }) => {
  const expr = bennyExpressions[mood];
  const winking = mood === "wink";
  return (
    <svg viewBox="0 0 120 110" className="h-24 w-24 md:h-28 md:w-28" aria-hidden>
      <path d="M10 92 L60 4 L110 92 Z" fill="hsl(var(--butter))" />
      <path
        d="M14 90 Q 35 78, 50 92 Q 65 78, 78 92 Q 92 80, 106 90 L110 92 L10 92 Z"
        fill="hsl(45 95% 75%)"
      />
      <circle cx="48" cy="60" r="6.5" fill="hsl(var(--tomato))" />
      <circle cx="74" cy="68" r="5.5" fill="hsl(var(--tomato))" />
      <circle cx="60" cy="40" r="4.5" fill="hsl(var(--tomato))" />
      <circle cx="45" cy="52" r="2.4" fill="hsl(var(--ink))" />
      {winking ? (
        <path d="M57 34 Q 60 32, 63 34" stroke="hsl(var(--ink))" strokeWidth="2" strokeLinecap="round" fill="none" />
      ) : (
        <circle cx="60" cy="34" r="2.4" fill="hsl(var(--ink))" />
      )}
      <circle cx="73" cy="58" r="2.4" fill="hsl(var(--ink))" />
      <path d={expr.mouth} stroke="hsl(var(--ink))" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const NextMovePanel = () => {
  const move = useNextMove();
  const external = isExternal(move.href);

  return (
    <Window
      label="Your next move"
      sticker="🍕"
      tone={move.kind === "event" || move.kind === "mission" ? "butter" : "cream"}
      className="relative overflow-hidden"
      bodyClassName="relative"
    >
      {/* Benny peeks from the margin (bottom-right), not inside the data */}
      <div className="pointer-events-none absolute -bottom-3 -right-2 opacity-95 md:bottom-2 md:right-3">
        <Benny mood={move.bennyMood} />
      </div>

      <div className="flex items-center gap-2">
        {move.live && (
          <span className="relative inline-flex h-2 w-2" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-tomato/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tomato" />
          </span>
        )}
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-ink/55">
          {move.eyebrow.replace(/^§\s*/, "")}
        </p>
        {move.reward && (
          <span className="ml-auto ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink/[0.06] px-3 py-1 text-[12px] font-semibold tabular-nums text-ink/80">
            +{formatReward(move.reward)}
          </span>
        )}
      </div>

      <h2 className="font-display mt-3 max-w-[18ch] text-[clamp(1.65rem,3vw,2.25rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
        {move.title}
      </h2>
      {move.body && (
        <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink/70">
          {move.body}
        </p>
      )}

      <div className="mt-6 pr-28 md:pr-32">
        {external ? (
          <a
            href={move.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill inline-flex whitespace-nowrap bg-tomato text-cream hover:bg-tomato-deep"
            style={{ ["--button-radius" as never]: "9999px" }}
          >
            <span className="whitespace-nowrap">{move.cta}</span>
            <ExternalLink className="h-4 w-4" strokeWidth={2} />
          </a>
        ) : (
          <Link
            to={move.href}
            className="btn-pill inline-flex whitespace-nowrap bg-tomato text-cream hover:bg-tomato-deep"
            style={{ ["--button-radius" as never]: "9999px" }}
          >
            <span className="whitespace-nowrap">{move.cta}</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        )}
      </div>
    </Window>
  );
};

export default NextMovePanel;
