import { useState } from "react";
import { ChevronDown, Gamepad2, Trophy } from "lucide-react";
import Window from "../components/Window";
import { useMemberStatus } from "../useMemberStatus";
import {
  ARCADE_URL,
  getLeaderboardToday,
  getWeeklyStats,
  HOW_IT_WORKS,
} from "./arcadeData";

/**
 * /dashboard/arcade — the arcade cabinet room.
 *
 * A frame around an iframe when the arcade is live, or a friendly placeholder
 * when it is not. Below the game: today's leaderboard and weekly stats.
 * Benny pumps his fist next to the cabinet.
 */
const ArcadePage = () => {
  const status = useMemberStatus();
  const mafiaName = useMafiaName();
  const [howOpen, setHowOpen] = useState(false);

  const leaderboard = getLeaderboardToday();
  const weekly = getWeeklyStats();

  const arcadeUrl = ARCADE_URL
    ? `${ARCADE_URL}?player=${encodeURIComponent(mafiaName)}`
    : null;

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[60ch]">
          <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
            § Arcade
          </p>
          <h1 className="font-display mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.94] tracking-tight">
            <span className="handwritten text-tomato">Arcade</span>.
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
            Play. Earn $PEP. Top the leaderboard.
          </p>
        </div>
      </header>

      {/* How it works — expandable */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setHowOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-3 rounded-2xl bg-paper px-5 py-3.5 text-left ring-1 ring-ink/10 transition-colors hover:bg-cream"
        >
          <span className="inline-flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-ink/60" strokeWidth={2} />
            <span className="ui text-[13px] font-semibold text-ink/80">
              How it works
            </span>
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-ink/50 transition-transform ${howOpen ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </button>

        {howOpen && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-cream p-4 ring-1 ring-ink/10"
              >
                <span className="ui inline-flex h-6 w-6 items-center justify-center rounded-full bg-butter text-[11px] font-bold text-ink">
                  {i + 1}
                </span>
                <h4 className="font-display mt-2 text-[14px] font-bold tracking-tight text-ink">
                  {item.title}
                </h4>
                <p className="mt-1 text-[13px] leading-snug text-ink/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game cabinet — iframe or placeholder */}
      <div className="mt-8">
        {arcadeUrl ? (
          <Window
            label="Cabinet"
            sticker="🎮"
            tone="ink"
            bodyClassName="p-0 overflow-hidden"
          >
            <iframe
              src={arcadeUrl}
              title="PizzaDAO Arcade"
              className="block aspect-[16/10] w-full rounded-b-[20px] border-0 bg-ink"
              allow="fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </Window>
        ) : (
          <Window
            label="Coming soon"
            sticker="🎮"
            tone="butter"
            bodyClassName="p-0 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center md:flex-row md:gap-8 md:py-16 md:text-left">
              <BennyCalibrating />
              <div>
                <h3 className="font-display text-[1.5rem] font-bold tracking-tight text-ink">
                  Benny is calibrating the machines.
                </h3>
                <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-ink/70">
                  The arcade cabinet is being wired up. When it goes live you
                  will play, earn $PEP, and fight for the top spot — all without
                  leaving the kitchen.
                </p>
                <p className="ui mt-3 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                  Check back soon, capo.
                </p>
              </div>
            </div>
          </Window>
        )}
      </div>

      {/* Below the cabinet */}
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_280px]">
        {/* Leaderboard */}
        <Window
          label="Today's high scores"
          sticker="🏆"
          tone="cream"
          bodyClassName="p-4 md:p-5"
        >
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-butter-dark" strokeWidth={2} />
            <span className="ui text-[11px] uppercase tracking-[0.18em] text-ink/50">
              Top 10 · resets at midnight UTC
            </span>
          </div>

          <ul className="mt-4 space-y-2">
            {leaderboard.map((entry) => (
              <li
                key={entry.rank}
                className="flex items-center gap-3 rounded-xl bg-paper px-3 py-2.5 ring-1 ring-ink/10"
              >
                <span
                  className={`ui flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    entry.rank === 1
                      ? "bg-butter text-ink"
                      : entry.rank === 2
                        ? "bg-cream text-ink/80 ring-1 ring-ink/10"
                        : entry.rank === 3
                          ? "bg-cream text-ink/70 ring-1 ring-ink/10"
                          : "bg-transparent text-ink/40"
                  }`}
                >
                  {entry.rank}
                </span>

                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-[16px] ring-1 ring-ink/10"
                >
                  {entry.avatar}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-ink">
                    {entry.mafiaName}
                  </p>
                  <p className="ui text-[11px] uppercase tracking-[0.14em] text-ink/50">
                    {entry.game}
                  </p>
                </div>

                <span className="ui shrink-0 whitespace-nowrap text-[13px] font-bold tabular-nums text-ink">
                  {entry.score.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </Window>

        {/* Weekly stats */}
        <div className="flex flex-col gap-4">
          <Window
            label="This week"
            sticker="📊"
            tone="butter"
            bodyClassName="p-4 md:p-5"
          >
            <div className="space-y-4">
              <StatRow
                label="$PEP earned"
                value={`${weekly.pepEarned.toLocaleString()}`}
                accent="tomato"
              />
              <StatRow
                label="Games played"
                value={`${weekly.gamesPlayed}`}
                accent="ink"
              />
              <StatRow
                label="Best score"
                value={`${weekly.bestScore.toLocaleString()}`}
                accent="ink"
              />
              <StatRow
                label="Your rank"
                value={`#${weekly.rank}`}
                accent="tomato"
              />
            </div>
          </Window>

          {/* Benny pumping fist */}
          <div className="flex items-center justify-center rounded-2xl bg-cream px-4 py-6 ring-1 ring-ink/10">
            <BennyFist />
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */

const useMafiaName = (): string => {
  if (typeof window === "undefined") return "Guest";
  // If the member claimed a mafia name, localStorage may hold it.
  // Fallback to a friendly default.
  return localStorage.getItem("pd-mafia-name") ?? "Guest";
};

/* -------------------------------------------------------------------------- */

const StatRow = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "tomato" | "ink";
}) => (
  <div className="flex items-baseline justify-between gap-3">
    <span className="text-[13.5px] text-ink/70">{label}</span>
    <span
      className={`font-display text-[1.25rem] font-extrabold leading-none tracking-tight ${
        accent === "tomato" ? "text-tomato" : "text-ink"
      }`}
    >
      {value}
    </span>
  </div>
);

/* -------------------------------------------------------------------------- */

const BennyCalibrating = () => (
  <svg viewBox="0 0 160 160" aria-hidden className="h-32 w-32 shrink-0 md:h-36 md:w-36">
    {/* slice body */}
    <path
      d="M80 22 L140 138 L20 138 Z"
      fill="hsl(var(--butter))"
      stroke="hsl(var(--ink))"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* crust */}
    <path
      d="M20 138 L140 138"
      stroke="hsl(var(--ink))"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* pepperonis */}
    <circle cx="70" cy="88" r="9" fill="hsl(var(--tomato))" />
    <circle cx="98" cy="104" r="7" fill="hsl(var(--tomato))" />
    <circle cx="80" cy="64" r="6" fill="hsl(var(--tomato))" />
    <circle cx="56" cy="108" r="5" fill="hsl(var(--tomato))" />
    {/* eyes — focused/working */}
    <circle cx="64" cy="104" r="2.6" fill="hsl(var(--ink))" />
    <circle cx="96" cy="104" r="2.6" fill="hsl(var(--ink))" />
    {/* concentrating mouth */}
    <path
      d="M72 120 Q80 116 88 120"
      stroke="hsl(var(--ink))"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* wrench arm */}
    <path
      d="M34 118 L18 108 L14 114 L22 120"
      stroke="hsl(var(--ink))"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="12" y="102" width="8" height="4" rx="1" fill="hsl(var(--ink))" transform="rotate(-30 16 104)" />
    {/* thinking bubble */}
    <ellipse cx="130" cy="48" rx="22" ry="14" fill="hsl(var(--cream))" stroke="hsl(var(--ink))" strokeWidth="2" />
    <text x="130" y="52" textAnchor="middle" fontSize="11" fill="hsl(var(--ink))" fontFamily="sans-serif" fontWeight="bold">⚙️</text>
    <circle cx="116" cy="66" r="2.5" fill="hsl(var(--cream))" stroke="hsl(var(--ink))" strokeWidth="1.5" />
    <circle cx="110" cy="74" r="1.5" fill="hsl(var(--cream))" stroke="hsl(var(--ink))" strokeWidth="1.5" />
  </svg>
);

/* -------------------------------------------------------------------------- */

const BennyFist = () => (
  <svg viewBox="0 0 140 140" aria-hidden className="h-24 w-24">
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
    {/* excited eyes */}
    <circle cx="58" cy="88" r="3" fill="hsl(var(--ink))" />
    <circle cx="82" cy="88" r="3" fill="hsl(var(--ink))" />
    {/* big grin */}
    <path
      d="M56 102 Q70 118 84 102"
      stroke="hsl(var(--ink))"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* pumping fist arm */}
    <path
      d="M110 100 L128 72 L118 68 L108 90"
      stroke="hsl(var(--ink))"
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="126" cy="64" r="9" fill="hsl(var(--cream))" stroke="hsl(var(--ink))" strokeWidth="2.5" />
    {/* fist lines */}
    <path d="M120 60 L126 58" stroke="hsl(var(--ink))" strokeWidth="2" strokeLinecap="round" />
    <path d="M122 64 L128 62" stroke="hsl(var(--ink))" strokeWidth="2" strokeLinecap="round" />
    {/* sparkles */}
    <path d="M132 46 L134 52 L140 54 L134 56 L132 62 L130 56 L124 54 L130 52 Z" fill="hsl(var(--butter))" stroke="hsl(var(--ink))" strokeWidth="1.2" />
    <path d="M32 38 L34 42 L38 43 L34 44 L32 48 L30 44 L26 43 L30 42 Z" fill="hsl(var(--butter))" stroke="hsl(var(--ink))" strokeWidth="1.2" />
  </svg>
);

export default ArcadePage;
