/**
 * PartnersGlobe — editorial, ambient globe used in the Partners hero.
 *
 * Purpose: signal global reach and city density without behaving like an
 * interactive widget. No hover, no click, no tooltips. Slow rotation only.
 */
const PULSES = [
  { top: "30%", left: "28%", delay: "0s" },   // North America
  { top: "38%", left: "48%", delay: "1.2s" }, // Europe
  { top: "55%", left: "44%", delay: "2.4s" }, // Africa
  { top: "42%", left: "70%", delay: "0.6s" }, // Asia
  { top: "70%", left: "78%", delay: "1.8s" }, // Oceania
  { top: "68%", left: "32%", delay: "3.0s" }, // South America
];

const PartnersGlobe = () => {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px]"
      aria-hidden="true"
    >
      {/* Outer ambient warmth */}
      <div
        className="absolute inset-[-12%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--tomato) / 0.10), transparent 65%)",
        }}
      />

      {/* Sphere */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, hsl(var(--cream)) 0%, hsl(44 40% 92%) 45%, hsl(36 20% 78%) 100%)",
          boxShadow:
            "inset -28px -36px 64px -24px hsl(0 0% 0% / 0.18), inset 18px 22px 48px -20px hsl(var(--cream) / 0.9), 0 30px 80px -30px hsl(0 0% 0% / 0.35)",
        }}
      >
        {/* Rotating longitudinal dot field — simulates earth rotation */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--ink) / 0.32) 1px, transparent 1.4px)",
            backgroundSize: "12px 12px",
            backgroundPosition: "0 0",
            maskImage:
              "radial-gradient(circle at 50% 50%, #000 58%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, #000 58%, transparent 72%)",
            animation: "globeSpin 90s linear infinite",
          }}
        />

        {/* Secondary slower layer for depth */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--ink) / 0.22) 0.8px, transparent 1.2px)",
            backgroundSize: "9px 9px",
            backgroundPosition: "4px 4px",
            maskImage:
              "radial-gradient(circle at 50% 50%, #000 50%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, #000 50%, transparent 78%)",
            animation: "globeSpin 140s linear infinite reverse",
          }}
        />

        {/* Soft terminator / shading */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 75%, hsl(0 0% 0% / 0.18), transparent 55%)",
          }}
        />

        {/* Highlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 28% 22%, hsl(var(--cream) / 0.55), transparent 38%)",
          }}
        />
      </div>

      {/* Pulse dots — major regions */}
      {PULSES.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{ top: p.top, left: p.left, transform: "translate(-50%, -50%)" }}
        >
          <span className="relative block h-2 w-2">
            <span
              className="absolute inset-0 rounded-full bg-tomato"
              style={{ boxShadow: "0 0 0 1.5px hsl(var(--cream))" }}
            />
            <span
              className="absolute inset-0 rounded-full bg-tomato/60"
              style={{
                animation: "globePulse 3.2s ease-out infinite",
                animationDelay: p.delay,
              }}
            />
          </span>
        </span>
      ))}

      {/* Equator hairline */}
      <div
        className="pointer-events-none absolute left-[7%] right-[7%] top-1/2 h-px"
        style={{ background: "hsl(var(--ink) / 0.08)" }}
      />

      <style>{`
        @keyframes globeSpin {
          0%   { background-position: 0 0; }
          100% { background-position: 720px 0; }
        }
        @keyframes globePulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          80%  { transform: scale(3.6); opacity: 0;   }
          100% { transform: scale(3.6); opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] [style*="globeSpin"],
          [aria-hidden="true"] [style*="globePulse"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnersGlobe;
