/**
 * PartnersGlobe — editorial, ambient globe used in the Partners hero.
 *
 * Purpose: signal global reach and city density without behaving like an
 * interactive widget. No hover, no click, no tooltips. Slow rotation only.
 *
 * City dots are sourced from the same PizzaDAO city manifest used by the
 * Global Pizza Party globe (lng/lat), projected orthographically onto the
 * front hemisphere with a slow continuous yaw so the planet feels alive.
 */
import { useEffect, useRef, useState } from "react";
import citiesData from "@/data/pizzadao-cities.json";

type City = { name: string; coords: [number, number] };
const CITIES: City[] = (citiesData as Array<{ name: string; coords: unknown }>)
  .filter((c) => Array.isArray(c.coords) && (c.coords as number[]).length === 2)
  .map((c) => ({ name: c.name, coords: c.coords as [number, number] }));

// A handful of marquee chapters get the pulsing tomato ring treatment.
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
]);

const DEG = Math.PI / 180;

const PartnersGlobe = () => {
  const [yaw, setYaw] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      // ~90s per full revolution
      setYaw(((t - start) / 90000) * 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Orthographic projection onto front hemisphere (slight tilt for life).
  const TILT = -18; // degrees, north tilted away
  const tiltRad = TILT * DEG;
  const sinT = Math.sin(tiltRad);
  const cosT = Math.cos(tiltRad);

  const projected = CITIES.map((c, i) => {
    const [lng, lat] = c.coords;
    const phi = lat * DEG;
    const theta = (lng + yaw) * DEG;
    const x = Math.cos(phi) * Math.sin(theta);
    const y0 = Math.sin(phi);
    const z0 = Math.cos(phi) * Math.cos(theta);
    // Apply tilt around x-axis
    const y = y0 * cosT - z0 * sinT;
    const z = y0 * sinT + z0 * cosT;
    return { i, name: c.name, x, y, z };
  });

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

        {/* City dots — PizzaDAO chapters, sourced from cityManifest */}
        {projected.map((p) => {
          if (p.z <= 0.02) return null; // back hemisphere, hide
          // Project to 0..100% on the disc (radius = 50%)
          const left = 50 + p.x * 48;
          const top = 50 - p.y * 48;
          // Depth fade — dots near the limb are dimmer/smaller
          const depth = Math.max(0, Math.min(1, p.z));
          const opacity = 0.25 + depth * 0.55;
          const size = 1.3 + depth * 1.2; // px
          const pulse = PULSE_NAMES.has(p.name);
          return (
            <span
              key={p.i}
              className="absolute rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                transform: "translate(-50%, -50%)",
                background: pulse
                  ? "hsl(var(--tomato))"
                  : "hsl(var(--ink))",
                opacity: pulse ? Math.max(opacity, 0.7) : opacity,
                boxShadow: pulse
                  ? "0 0 0 1px hsl(var(--cream)), 0 0 6px 1px hsl(var(--tomato) / 0.55)"
                  : undefined,
              }}
            />
          );
        })}

        {/* Pulse halos for marquee chapters */}
        {projected.map((p) => {
          if (p.z <= 0.05) return null;
          if (!PULSE_NAMES.has(p.name)) return null;
          const left = 50 + p.x * 48;
          const top = 50 - p.y * 48;
          return (
            <span
              key={`pulse-${p.i}`}
              className="absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="relative block h-2 w-2">
                <span
                  className="absolute inset-0 rounded-full bg-tomato/60"
                  style={{
                    animation: "globePulse 3.2s ease-out infinite",
                    animationDelay: `${(p.i % 6) * 0.45}s`,
                  }}
                />
              </span>
            </span>
          );
        })}
      </div>

      {/* Equator hairline */}
      <div
        className="pointer-events-none absolute left-[7%] right-[7%] top-1/2 h-px"
        style={{ background: "hsl(var(--ink) / 0.08)" }}
      />

      <style>{`
        @keyframes globePulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          80%  { transform: scale(3.6); opacity: 0;   }
          100% { transform: scale(3.6); opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] [style*="globePulse"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnersGlobe;
