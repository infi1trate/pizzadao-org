/**
 * CinematicGlobe - dark, atmospheric, slow.
 *
 * A quieter cousin of PartnersGlobe used as the signature visual moment
 * of the About page. No dashboards, no tooltips by default - just a
 * planet breathing in the dark with soft pulses where chapters gather.
 * Hovering a marquee city reveals a faint label, nothing more.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import citiesData from "@/data/pizzadao-cities.json";

type City = { name: string; coords: [number, number] };
const CITIES: City[] = (citiesData as Array<{ name: string; coords: unknown }>)
  .filter((c) => Array.isArray(c.coords) && (c.coords as number[]).length === 2)
  .map((c) => ({ name: c.name, coords: c.coords as [number, number] }));

const PULSE_NAMES = new Set([
  "New York",
  "London",
  "Lagos",
  "Tokyo",
  "São Paulo",
  "Sao Paulo",
  "Sydney",
  "Mumbai",
  "Mexico City",
  "Berlin",
  "Buenos Aires",
  "Istanbul",
]);

const DEG = Math.PI / 180;

const CinematicGlobe = () => {
  const [yaw, setYaw] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      // ~150s per full revolution - slower, more cinematic
      setYaw(((t - start) / 150000) * 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const TILT = -20;
  const tiltRad = TILT * DEG;
  const sinT = Math.sin(tiltRad);
  const cosT = Math.cos(tiltRad);

  const projected = useMemo(
    () =>
      CITIES.map((c, i) => {
        const [lng, lat] = c.coords;
        const phi = lat * DEG;
        const theta = (lng + yaw) * DEG;
        const x = Math.cos(phi) * Math.sin(theta);
        const y0 = Math.sin(phi);
        const z0 = Math.cos(phi) * Math.cos(theta);
        const y = y0 * cosT - z0 * sinT;
        const z = y0 * sinT + z0 * cosT;
        return { i, name: c.name, x, y, z };
      }),
    [yaw, cosT, sinT],
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[760px]">
      {/* Outer atmospheric bloom */}
      <div
        aria-hidden
        className="absolute inset-[-22%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--tomato) / 0.18), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[-8%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, hsl(220 80% 60% / 0.14), transparent 65%)",
        }}
      />

      {/* Sphere - deep, oceanic, lit from upper left */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 28%, hsl(220 35% 18%) 0%, hsl(225 45% 9%) 55%, hsl(230 60% 4%) 100%)",
          boxShadow:
            "inset -40px -50px 90px -30px hsl(0 0% 0% / 0.85), inset 22px 26px 60px -22px hsl(220 60% 50% / 0.18), 0 50px 120px -40px hsl(0 0% 0% / 0.75)",
        }}
      >
        {/* Terminator */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 75% 78%, hsl(0 0% 0% / 0.55), transparent 55%)",
          }}
        />
        {/* Specular */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 28% 22%, hsl(220 80% 80% / 0.22), transparent 38%)",
          }}
        />
        {/* Faint graticule */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, hsl(var(--cream)) 0 1px, transparent 1px 36px), repeating-linear-gradient(90deg, hsl(var(--cream)) 0 1px, transparent 1px 36px)",
            maskImage: "radial-gradient(circle, #000 55%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle, #000 55%, transparent 75%)",
          }}
        />

        {/* City dots */}
        {projected.map((p) => {
          if (p.z <= 0.02) return null;
          const left = 50 + p.x * 48;
          const top = 50 - p.y * 48;
          const depth = Math.max(0, Math.min(1, p.z));
          const isPulse = PULSE_NAMES.has(p.name);
          const opacity = isPulse
            ? Math.max(0.85, depth * 0.95 + 0.1)
            : 0.18 + depth * 0.42;
          const size = isPulse ? 2.6 + depth * 1.4 : 1.1 + depth * 1.1;
          return (
            <span
              key={p.i}
              onMouseEnter={isPulse ? () => setHover(p.name) : undefined}
              onMouseLeave={isPulse ? () => setHover(null) : undefined}
              className="absolute rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                transform: "translate(-50%, -50%)",
                background: isPulse
                  ? "hsl(var(--butter))"
                  : "hsl(var(--cream))",
                opacity,
                boxShadow: isPulse
                  ? "0 0 6px 1px hsl(var(--tomato) / 0.7), 0 0 14px 2px hsl(var(--butter) / 0.35)"
                  : undefined,
                cursor: isPulse ? "default" : undefined,
              }}
            />
          );
        })}

        {/* Slow soft pulses for marquee chapters */}
        {projected.map((p) => {
          if (p.z <= 0.05) return null;
          if (!PULSE_NAMES.has(p.name)) return null;
          const left = 50 + p.x * 48;
          const top = 50 - p.y * 48;
          return (
            <span
              key={`pulse-${p.i}`}
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="relative block h-2 w-2">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "hsl(var(--tomato) / 0.45)",
                    animation: "cineGlobePulse 5.5s ease-out infinite",
                    animationDelay: `${(p.i % 8) * 0.7}s`,
                  }}
                />
              </span>
            </span>
          );
        })}

        {/* Hover label - single, restrained */}
        {hover &&
          projected
            .filter((p) => p.name === hover && p.z > 0.05)
            .slice(0, 1)
            .map((p) => {
              const left = 50 + p.x * 48;
              const top = 50 - p.y * 48;
              return (
                <span
                  key={`lbl-${p.i}`}
                  className="ui pointer-events-none absolute whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/85"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: "translate(10px, -50%)",
                    textShadow: "0 1px 8px hsl(0 0% 0% / 0.8)",
                  }}
                >
                  {p.name}
                </span>
              );
            })}
      </div>

      {/* Equator hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] right-[6%] top-1/2 h-px"
        style={{ background: "hsl(var(--cream) / 0.06)" }}
      />

      <style>{`
        @keyframes cineGlobePulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          80%  { transform: scale(5);   opacity: 0;    }
          100% { transform: scale(5);   opacity: 0;    }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="cineGlobePulse"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default CinematicGlobe;
