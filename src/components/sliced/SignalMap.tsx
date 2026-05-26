import { useEffect, useMemo, useRef, useState } from "react";
import { SIGNAL_CITIES } from "./data";

const DEG = Math.PI / 180;

const SignalMap = () => {
  const [yaw, setYaw] = useState(20);
  const [hover, setHover] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      setYaw(20 + ((t - start) / 180000) * 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const TILT = -18;
  const tiltRad = TILT * DEG;
  const sinT = Math.sin(tiltRad);
  const cosT = Math.cos(tiltRad);

  const projected = useMemo(
    () =>
      SIGNAL_CITIES.map((c, i) => {
        const phi = c.lat * DEG;
        const theta = (c.lng + yaw) * DEG;
        const x = Math.cos(phi) * Math.sin(theta);
        const y0 = Math.sin(phi);
        const z0 = Math.cos(phi) * Math.cos(theta);
        const y = y0 * cosT - z0 * sinT;
        const z = y0 * sinT + z0 * cosT;
        return { ...c, i, x, y, z };
      }),
    [yaw, cosT, sinT],
  );

  const hoverCity = hover ? SIGNAL_CITIES.find((c) => c.name === hover) : null;

  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 20% 20%, hsl(var(--tomato) / 0.16), transparent 60%), radial-gradient(50% 50% at 80% 80%, hsl(46 100% 55% / 0.10), transparent 60%)",
        }}
      />
      <div className="container relative py-24 md:py-36">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-4">
            <div className="overline text-butter">§ 03 · The pizza signal</div>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,5vw,4.5rem)] font-black leading-[0.92]">
              Every dot is a city that ate together.
            </h2>
            <p className="mt-6 text-base leading-snug text-cream/75 md:text-lg">
              Watch the signal travel. Hover any pulse to see who showed up, how
              many came, and what their city said about it.
            </p>

            <div className="mt-10 space-y-3">
              {SIGNAL_CITIES.slice(0, 6).map((c) => (
                <button
                  key={c.name}
                  onMouseEnter={() => setHover(c.name)}
                  onFocus={() => setHover(c.name)}
                  onMouseLeave={() => setHover(null)}
                  onBlur={() => setHover(null)}
                  className={`ui flex w-full items-center justify-between gap-3 border-b border-cream/15 py-2 text-left text-sm transition-colors ${
                    hover === c.name ? "text-tomato" : "text-cream/80 hover:text-cream"
                  }`}
                >
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-cream/50">{c.attendees.toLocaleString()} attendees</span>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="relative mx-auto aspect-square w-full max-w-[640px]">
              {/* Sphere */}
              <div
                className="absolute inset-0 overflow-hidden rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 26%, hsl(220 30% 16%) 0%, hsl(225 45% 8%) 55%, hsl(230 60% 3%) 100%)",
                  boxShadow:
                    "inset -40px -50px 90px -30px hsl(0 0% 0% / 0.85), 0 50px 120px -40px hsl(var(--tomato) / 0.35)",
                }}
              >
                {/* Cheese-melt heatmap */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(20% 18% at 30% 38%, hsl(var(--butter) / 0.25), transparent 70%), radial-gradient(18% 14% at 70% 60%, hsl(var(--tomato) / 0.22), transparent 70%)",
                  }}
                />
                {/* Graticule */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, hsl(var(--cream)) 0 1px, transparent 1px 36px), repeating-linear-gradient(90deg, hsl(var(--cream)) 0 1px, transparent 1px 36px)",
                    maskImage: "radial-gradient(circle, #000 55%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 75%)",
                  }}
                />

                {projected.map((p) => {
                  if (p.z <= 0.02) return null;
                  const left = 50 + p.x * 46;
                  const top = 50 - p.y * 46;
                  const depth = Math.max(0, Math.min(1, p.z));
                  const size = 4 + depth * 4;
                  return (
                    <span
                      key={p.i}
                      onMouseEnter={() => setHover(p.name)}
                      onMouseLeave={() => setHover(null)}
                      className="absolute cursor-pointer"
                      style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        width: size,
                        height: size,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "hsl(var(--butter))",
                          boxShadow:
                            "0 0 8px 2px hsl(var(--tomato) / 0.8), 0 0 18px 4px hsl(var(--butter) / 0.45)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "hsl(var(--tomato) / 0.5)",
                          animation: "signalPulse 4s ease-out infinite",
                          animationDelay: `${(p.i % 6) * 0.55}s`,
                        }}
                      />
                    </span>
                  );
                })}
              </div>

              {/* Hover card */}
              {hoverCity && (
                <div className="ui absolute -bottom-4 left-1/2 w-[min(360px,90%)] -translate-x-1/2 rounded-xl border border-cream/15 bg-ink/85 p-4 text-cream backdrop-blur-md">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-base font-bold tracking-tight">{hoverCity.name}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-butter">
                      {hoverCity.attendees.toLocaleString()} attendees
                    </div>
                  </div>
                  <p className="mt-2 text-sm italic text-cream/80">&ldquo;{hoverCity.quote}&rdquo;</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes signalPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          80%  { transform: scale(6);   opacity: 0;   }
          100% { transform: scale(6);   opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="signalPulse"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default SignalMap;
