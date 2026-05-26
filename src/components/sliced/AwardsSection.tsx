import { AWARDS } from "./data";

const Badge = ({ index }: { index: number }) => {
  const palette = [
    { bg: "hsl(var(--tomato))", fg: "hsl(var(--cream))" },
    { bg: "hsl(var(--butter))", fg: "hsl(var(--ink))" },
    { bg: "hsl(var(--ink))", fg: "hsl(var(--butter))" },
  ][index % 3];
  return (
    <div
      aria-hidden
      className="relative h-24 w-24 shrink-0"
      style={{ animation: "awardSpin 22s linear infinite" }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path
            id={`circ-${index}`}
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            fill="none"
          />
        </defs>
        <circle cx="50" cy="50" r="44" fill={palette.bg} />
        <circle cx="50" cy="50" r="28" fill={palette.fg} opacity="0.12" />
        <text fill={palette.fg} fontSize="8" fontWeight="800" letterSpacing="2">
          <textPath href={`#circ-${index}`}>
            PIZZADAO · SLICED · 2026 · PIZZADAO · SLICED · 2026 ·
          </textPath>
        </text>
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fill={palette.fg}
        >
          ★
        </text>
      </svg>
      <style>{`
        @keyframes awardSpin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="awardSpin"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

const AwardsSection = () => {
  return (
    <section className="relative bg-tomato text-cream">
      <div className="container py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="overline text-butter">§ 08 · Absurd awards</div>
          <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] font-black leading-[0.92]">
            The 2026 superlatives nobody asked for.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-snug text-cream/85">
            Every category is real. Every winner earned it. None of these belong
            in a press release. All of them belong here.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {AWARDS.map((a, i) => (
            <div
              key={a.title}
              className="flex items-center gap-5 rounded-2xl border border-cream/20 bg-ink/35 p-6 backdrop-blur-sm transition-transform hover:-translate-y-1"
            >
              <Badge index={i} />
              <div className="min-w-0">
                <div className="ui text-[10px] font-bold uppercase tracking-[0.28em] text-butter">
                  Award №{String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display mt-1 text-2xl font-black leading-tight">
                  {a.title}
                </div>
                <div className="ui mt-2 text-sm font-semibold text-cream/90">
                  Winner: {a.winner}
                </div>
                <div className="ui mt-1 text-xs text-cream/70">{a.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
