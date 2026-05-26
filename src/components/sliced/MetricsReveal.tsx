import { HEADLINE_METRICS } from "./data";
import { useCountUp, useReveal } from "./useReveal";

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 10_000) return `${(n / 1000).toFixed(0)}K`;
  if (n >= 1000) return n.toLocaleString();
  return n.toString();
}

const MetricCard = ({
  value,
  suffix,
  label,
  style,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  style: string;
  index: number;
}) => {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const n = useCountUp(value, shown, 1400 + index * 120);

  const skin: Record<string, string> = {
    receipt:
      "bg-cream text-ink border border-foreground/15 shadow-[0_2px_0_hsl(var(--ink)/0.06)]",
    sticker:
      "bg-tomato text-cream rounded-[28px] -rotate-2",
    stamp:
      "bg-ink text-cream border-2 border-butter rotate-1",
    "pizza-box":
      "bg-butter text-ink border-2 border-ink rounded-[10px]",
  };

  return (
    <div
      ref={ref}
      className={`relative flex min-h-[220px] flex-col justify-between p-7 transition-all duration-700 ${skin[style] ?? skin.receipt} ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="ui text-[10px] font-bold uppercase tracking-[0.28em] opacity-70">
        № {String(index + 1).padStart(2, "0")} · 2026
      </div>
      <div>
        <div className="font-display text-[clamp(3rem,7vw,5.5rem)] font-black leading-[0.86]">
          {formatNumber(n)}
          <span className="text-tomato">{suffix}</span>
        </div>
        <div className="ui mt-2 text-sm font-semibold tracking-wide">{label}</div>
      </div>
      {style === "receipt" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3"
          style={{
            background:
              "repeating-linear-gradient(90deg, hsl(var(--ink)) 0 4px, transparent 4px 8px)",
            maskImage: "linear-gradient(180deg, transparent, #000)",
          }}
        />
      )}
    </div>
  );
};

const MetricsReveal = () => {
  return (
    <section id="metrics" className="relative bg-cream text-ink halftone-soft">
      <div className="container py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="overline text-tomato">§ 02 · Global impact</div>
          <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] font-black leading-[0.92]">
            One year. <span className="text-tomato">A planet of slices.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-snug text-ink/70">
            Numbers don&apos;t do a worldwide ritual justice — but they help.
            Scroll through what 2026 actually looked like in receipts, stamps,
            stickers, and pizza-box print.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HEADLINE_METRICS.map((m, i) => (
            <MetricCard key={m.label} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsReveal;
