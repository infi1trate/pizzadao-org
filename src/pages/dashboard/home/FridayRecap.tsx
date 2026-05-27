import { Share2 } from "lucide-react";
import Window from "../components/Window";

/**
 * Friday Recap — a shareable weekly summary of the family's activity.
 * Renders ONLY on Fridays. Game-like big numbers (Crextio treatment),
 * one tomato CTA to share to X.
 *
 * Numbers are placeholder for now; swap to the real weekly aggregator
 * when it lands.
 */

const isFriday = () => new Date().getDay() === 5;

type Stat = { value: string; label: string; tone?: "butter" | "tomato" | "ink" };

const STATS: Stat[] = [
  { value: "47",      label: "cities fed",        tone: "tomato" },
  { value: "312",     label: "posts in the family", tone: "ink" },
  { value: "19",      label: "new members",       tone: "butter" },
  { value: "1,204",   label: "slices",            tone: "ink" },
];

const StatBlock = ({ stat }: { stat: Stat }) => {
  const bg =
    stat.tone === "butter"
      ? "bg-butter/70"
      : stat.tone === "tomato"
      ? "bg-tomato text-cream"
      : "bg-ink text-cream";
  return (
    <div
      className={`flex flex-col justify-between rounded-[22px] p-5 shadow-[0_1px_2px_hsl(30_25%_12%/0.06),0_10px_24px_-18px_hsl(30_25%_12%/0.18)] ${bg}`}
    >
      <span className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[0.95] tracking-tight tabular-nums">
        {stat.value}
      </span>
      <span className="ui mt-3 text-[12px] font-medium leading-snug opacity-80">
        {stat.label}
      </span>
    </div>
  );
};

const FridayRecap = () => {
  if (!isFriday()) return null;

  const shareText = encodeURIComponent(
    "this week the family fed 47 cities, posted 312 times, and welcomed 19 new members 🍕\n\n@PizzaDAO",
  );
  const shareUrl = `https://x.com/intent/post?text=${shareText}`;

  return (
    <section className="mt-10">
      <Window label="Friday recap" sticker="🎬" tone="butter">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="ui text-[11px] uppercase tracking-[0.22em] text-ink/55">
              The week, in slices
            </p>
            <h2 className="font-display mt-2 max-w-[20ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1] tracking-tight">
              The family showed up{" "}
              <span className="handwritten text-tomato">again</span>.
            </h2>
          </div>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill inline-flex whitespace-nowrap bg-tomato text-cream hover:bg-tomato-deep"
            style={{ ["--button-radius" as never]: "9999px" }}
          >
            <Share2 className="h-4 w-4" strokeWidth={2} />
            <span className="whitespace-nowrap">Share the week</span>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STATS.map((s, i) => (
            <StatBlock key={i} stat={s} />
          ))}
        </div>
      </Window>
    </section>
  );
};

export default FridayRecap;
