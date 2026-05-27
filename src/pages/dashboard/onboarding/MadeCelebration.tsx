import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { WELCOME_BONUS_PEP } from "./useOnboarding";

/**
 * "You're made" celebration. Fires exactly once.
 *
 * - Replaces the onboarding card in-place (the surface morphs, doesn't disappear).
 * - Tasteful confetti: warm butter + tomato dots, plus a few hand-drawn marks.
 *   No emoji rain, no neon, no sparkle SVGs.
 * - Reveals the 69 $PEP welcome bonus with a single line of context.
 * - Single CTA: enter the kitchen → unlocks the returning-member dashboard.
 */

type Props = { onEnter: () => void };

type Piece = {
  left: number;       // 0–100 (%)
  delay: number;      // s
  duration: number;   // s
  rotate: number;     // deg
  size: number;       // px
  color: "butter" | "tomato" | "ink";
  shape: "dot" | "pep";
};

const makePieces = (n: number): Piece[] =>
  Array.from({ length: n }, (_, i) => {
    // Deterministic-ish for SSR safety, but varied enough to feel scattered.
    const r = (k: number) => {
      const x = Math.sin((i + 1) * 9.13 + k * 2.7) * 10000;
      return x - Math.floor(x);
    };
    const colorRoll = r(1);
    return {
      left: r(2) * 100,
      delay: r(3) * 0.6,
      duration: 2.2 + r(4) * 1.6,
      rotate: (r(5) - 0.5) * 540,
      size: 6 + Math.floor(r(6) * 10),
      color: colorRoll < 0.55 ? "butter" : colorRoll < 0.9 ? "tomato" : "ink",
      shape: r(7) < 0.18 ? "pep" : "dot",
    };
  });

const Confetti = () => {
  const pieces = useMemo(() => makePieces(56), []);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {pieces.map((p, i) => {
        const bg =
          p.color === "butter"
            ? "hsl(var(--butter))"
            : p.color === "tomato"
              ? "hsl(var(--tomato))"
              : "hsl(var(--ink))";
        return (
          <span
            key={i}
            className="absolute top-[-12%] block"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.shape === "pep" ? p.size : p.size * 0.55,
              background: bg,
              borderRadius: p.shape === "pep" ? "9999px" : "2px",
              opacity: 0.9,
              animation: `pdFall ${p.duration}s cubic-bezier(0.22, 0.61, 0.24, 1) ${p.delay}s forwards`,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes pdFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.95; }
          100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pdBennyPop {
          0%   { transform: scale(0.6) rotate(-8deg); opacity: 0; }
          60%  { transform: scale(1.08) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes pdBonusPop {
          0%   { transform: translateY(14px) scale(0.92); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const BennyBig = () => (
  // Stylized three-eyed pizza slice — warm, friendly, big.
  <svg
    viewBox="0 0 120 110"
    className="h-28 w-28 md:h-32 md:w-32"
    style={{ animation: "pdBennyPop 0.7s cubic-bezier(0.22, 0.61, 0.24, 1) both" }}
    aria-hidden
  >
    {/* Crust */}
    <path d="M10 92 L60 4 L110 92 Z" fill="hsl(var(--butter))" />
    {/* Cheese drip */}
    <path
      d="M14 90 Q 35 78, 50 92 Q 65 78, 78 92 Q 92 80, 106 90 L110 92 L10 92 Z"
      fill="hsl(45 95% 75%)"
    />
    {/* Pepperoni */}
    <circle cx="48" cy="60" r="7" fill="hsl(var(--tomato))" />
    <circle cx="74" cy="68" r="6" fill="hsl(var(--tomato))" />
    <circle cx="60" cy="40" r="5" fill="hsl(var(--tomato))" />
    {/* Eyes — three, of course */}
    <circle cx="45" cy="52" r="2.4" fill="hsl(var(--ink))" />
    <circle cx="60" cy="34" r="2.4" fill="hsl(var(--ink))" />
    <circle cx="73" cy="58" r="2.4" fill="hsl(var(--ink))" />
    {/* Smile */}
    <path
      d="M50 76 Q 60 84, 70 76"
      stroke="hsl(var(--ink))"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const PepperoniMark = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden>
    <circle cx="10" cy="10" r="9" fill="hsl(var(--tomato))" />
    <circle cx="6.5" cy="7.5" r="1.1" fill="hsl(var(--tomato-deep))" opacity="0.6" />
    <circle cx="13" cy="9" r="0.9" fill="hsl(var(--tomato-deep))" opacity="0.6" />
    <circle cx="8.5" cy="13" r="1" fill="hsl(var(--tomato-deep))" opacity="0.6" />
    <circle cx="13" cy="13.5" r="0.7" fill="hsl(var(--tomato-deep))" opacity="0.6" />
  </svg>
);

const MadeCelebration = ({ onEnter }: Props) => {
  const [pepShown, setPepShown] = useState(0);

  // Count the 69 $PEP up over ~900ms after the bonus pops in.
  useEffect(() => {
    const start = performance.now();
    const startDelay = 700;
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - start - startDelay;
      if (elapsed <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(1, elapsed / dur);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setPepShown(Math.round(WELCOME_BONUS_PEP * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-[28px] bg-butter/70 p-6 text-center shadow-[0_1px_2px_hsl(30_20%_12%/0.05),0_18px_48px_-24px_hsl(30_20%_12%/0.22)] md:p-12"
      role="status"
      aria-live="polite"
    >
      <Confetti />

      <div className="relative flex flex-col items-center">
        <BennyBig />

        <p className="ui mt-6 text-[11px] uppercase tracking-[0.22em] text-ink/55">
          § Made member
        </p>

        <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[0.96] tracking-tight">
          You&rsquo;re <span className="handwritten text-tomato">in</span>.
        </h2>

        <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink/75">
          The family knows your name. Benny&rsquo;s already saved you a slice.
        </p>

        {/* Welcome bonus — first contact with $PEP */}
        <div
          className="mt-7 inline-flex items-center gap-3 rounded-full bg-cream px-5 py-3 ring-1 ring-ink/10"
          style={{
            animation:
              "pdBonusPop 0.55s cubic-bezier(0.22, 0.61, 0.24, 1) 0.55s both",
          }}
        >
          <PepperoniMark size={22} />
          <span className="ui text-[20px] font-extrabold tabular-nums text-ink">
            +{pepShown.toLocaleString("en-US")}
          </span>
          <span className="ui text-[12px] font-semibold text-ink/55">$PEP</span>
        </div>

        <p className="mt-4 max-w-[38ch] text-[13px] leading-snug text-ink/65">
          That&rsquo;s $PEP — pepperoni. You earned it. Spend it in the shop,
          or stack it.
        </p>

        <button
          type="button"
          onClick={onEnter}
          className="btn-pill-lg mt-8 inline-flex whitespace-nowrap bg-ink text-cream hover:bg-tomato"
          style={{ ["--button-radius" as never]: "9999px" }}
        >
          <span className="whitespace-nowrap">Enter the kitchen</span>
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default MadeCelebration;
