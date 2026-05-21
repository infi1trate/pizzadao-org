/**
 * PartnersGlobe — premium global systems visualization for the Partners hero.
 *
 * Editorial register: Monocle infographic / Apple systems diagram.
 * Not interactive. Slow rotation. No tooltips, no clicks.
 *
 * Layers (back to front):
 *   1. Ambient warmth halo
 *   2. Matte sphere with soft directional shading
 *   3. SVG: graticule (parallels static, meridians rotating)
 *   4. SVG: continental silhouettes (soft blurred ellipses)
 *   5. SVG: faint network arcs between marquee chapters
 *   6. SVG: city dots in 3-tier hierarchy
 *   7. SVG: single quiet pulse on marquee dots
 */
import { useEffect, useMemo, useRef, useState } from "react";
import citiesData from "@/data/pizzadao-cities.json";

type City = { name: string; coords: [number, number] };

const CITIES: City[] = (citiesData as Array<{ name: string; coords: unknown }>)
  .filter((c) => Array.isArray(c.coords) && (c.coords as number[]).length === 2)
  .map((c) => ({ name: c.name, coords: c.coords as [number, number] }));

const MARQUEE = new Set([
  "New York", "London", "Lagos", "Tokyo",
  "São Paulo", "Sao Paulo", "Sydney", "Mumbai", "Mexico City",
]);

// Deterministic mid-tier selection (~10% of remaining cities)
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
const MID = new Set(
  CITIES.filter((c) => !MARQUEE.has(c.name) && hash(c.name) % 9 === 0).map((c) => c.name),
);

// Connection arcs — implied coordinated infrastructure
const ARC_PAIRS: Array<[string, string]> = [
  ["New York", "London"],
  ["London", "Lagos"],
  ["Tokyo", "Sydney"],
  ["Mumbai", "Tokyo"],
  ["New York", "Mexico City"],
  ["Lagos", "São Paulo"],
  ["London", "Mumbai"],
];

// Continent silhouette anchors (lng, lat, rx, ry) — soft tonal regions
const CONTINENTS: Array<{ lng: number; lat: number; rx: number; ry: number }> = [
  { lng: -100, lat: 45, rx: 22, ry: 16 }, // North America
  { lng: -60, lat: -15, rx: 12, ry: 18 }, // South America
  { lng: 15, lat: 50, rx: 14, ry: 10 },   // Europe
  { lng: 20, lat: 5, rx: 14, ry: 20 },    // Africa
  { lng: 90, lat: 38, rx: 26, ry: 16 },   // Asia
  { lng: 135, lat: -25, rx: 12, ry: 8 },  // Australia
];

const DEG = Math.PI / 180;
const TILT = -18 * DEG;
const sinT = Math.sin(TILT);
const cosT = Math.cos(TILT);

const VB = 100;
const CX = 50;
const CY = 50;
const R = 48;

function project(lng: number, lat: number, yawDeg: number) {
  const phi = lat * DEG;
  const theta = (lng + yawDeg) * DEG;
  const x = Math.cos(phi) * Math.sin(theta);
  const y0 = Math.sin(phi);
  const z0 = Math.cos(phi) * Math.cos(theta);
  const y = y0 * cosT - z0 * sinT;
  const z = y0 * sinT + z0 * cosT;
  return { px: CX + x * R, py: CY - y * R, z };
}

// Sample a path along constant-latitude parallel (yaw-invariant)
function parallelPath(lat: number): string {
  const steps = 96;
  let d = "";
  let started = false;
  for (let i = 0; i <= steps; i++) {
    const lng = -180 + (360 * i) / steps;
    const p = project(lng, lat, 0);
    if (p.z > 0.001) {
      d += `${started ? "L" : "M"}${p.px.toFixed(2)} ${p.py.toFixed(2)}`;
      started = true;
    } else {
      started = false;
    }
  }
  return d;
}

// Sample meridian for given lng (uses yaw)
function meridianPath(lng: number, yaw: number): string {
  const steps = 64;
  let d = "";
  let started = false;
  for (let i = 0; i <= steps; i++) {
    const lat = -90 + (180 * i) / steps;
    const p = project(lng, lat, yaw);
    if (p.z > 0.001) {
      d += `${started ? "L" : "M"}${p.px.toFixed(2)} ${p.py.toFixed(2)}`;
      started = true;
    } else {
      started = false;
    }
  }
  return d;
}

// Great-circle sampled path between two coords; emits only front-hemisphere segments
function arcPath(a: City, b: City, yaw: number): string {
  const steps = 48;
  const [aLng, aLat] = a.coords;
  const [bLng, bLat] = b.coords;
  const ax = Math.cos(aLat * DEG) * Math.cos(aLng * DEG);
  const ay = Math.cos(aLat * DEG) * Math.sin(aLng * DEG);
  const az = Math.sin(aLat * DEG);
  const bx = Math.cos(bLat * DEG) * Math.cos(bLng * DEG);
  const by = Math.cos(bLat * DEG) * Math.sin(bLng * DEG);
  const bz = Math.sin(bLat * DEG);
  const dot = Math.max(-1, Math.min(1, ax * bx + ay * by + az * bz));
  const omega = Math.acos(dot);
  if (omega < 0.001) return "";
  const sinOm = Math.sin(omega);
  let d = "";
  let started = false;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const k1 = Math.sin((1 - t) * omega) / sinOm;
    const k2 = Math.sin(t * omega) / sinOm;
    const x = k1 * ax + k2 * bx;
    const y = k1 * ay + k2 * by;
    const z = k1 * az + k2 * bz;
    // Convert back to lng/lat then project (so yaw + tilt apply uniformly)
    const lat = Math.asin(z) / DEG;
    const lng = Math.atan2(y, x) / DEG;
    const p = project(lng, lat, yaw);
    if (p.z > 0.02) {
      d += `${started ? "L" : "M"}${p.px.toFixed(2)} ${p.py.toFixed(2)}`;
      started = true;
    } else {
      started = false;
    }
  }
  return d;
}

const PartnersGlobe = () => {
  const [yaw, setYaw] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      // Slower ambient — ~140s per revolution
      setYaw(((t - start) / 140000) * 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Static parallels — computed once
  const parallels = useMemo(
    () => [-60, -30, 0, 30, 60].map((lat) => ({ lat, d: parallelPath(lat) })),
    [],
  );

  // Meridians every 30° — recompute on yaw
  const meridians = useMemo(
    () => [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180].map((lng) => ({
      lng,
      d: meridianPath(lng, yaw),
    })),
    [yaw],
  );

  // Continents projected
  const continents = useMemo(
    () =>
      CONTINENTS.map((c, i) => {
        const p = project(c.lng, c.lat, yaw);
        return { ...c, ...p, i };
      }).filter((c) => c.z > 0.05),
    [yaw],
  );

  // Cities projected & tiered
  const projected = useMemo(
    () =>
      CITIES.map((c, i) => {
        const p = project(c.coords[0], c.coords[1], yaw);
        const tier = MARQUEE.has(c.name) ? 2 : MID.has(c.name) ? 1 : 0;
        return { i, name: c.name, ...p, tier };
      }).filter((p) => p.z > 0.02),
    [yaw],
  );

  // Arcs
  const arcs = useMemo(() => {
    return ARC_PAIRS.flatMap(([an, bn]) => {
      const a = CITIES.find((c) => c.name === an);
      const b = CITIES.find((c) => c.name === bn);
      if (!a || !b) return [];
      const d = arcPath(a, b, yaw);
      if (!d) return [];
      return [{ id: `${an}-${bn}`, d }];
    });
  }, [yaw]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px]"
      aria-hidden="true"
    >
      {/* Outer ambient warmth */}
      <div
        className="absolute inset-[-12%] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--tomato) / 0.09), transparent 65%)",
        }}
      />

      {/* Matte sphere */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 30%, hsl(44 45% 96%) 0%, hsl(40 30% 90%) 50%, hsl(32 18% 76%) 100%)",
          boxShadow:
            "inset -22px -30px 60px -22px hsl(28 30% 18% / 0.22), inset 16px 18px 42px -18px hsl(var(--cream) / 0.85), 0 28px 70px -28px hsl(0 0% 0% / 0.32)",
        }}
      >
        {/* Directional shading — soft terminator toward lower-right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 72% 76%, hsl(28 25% 12% / 0.18), transparent 58%)",
          }}
        />
        {/* Specular highlight — soft matte, no gloss */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 24%, hsl(var(--cream) / 0.5), transparent 42%)",
          }}
        />

        {/* Vector overlay — graticule, continents, arcs, dots */}
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="continentTint" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(28 25% 38%)" stopOpacity="0.22" />
              <stop offset="60%" stopColor="hsl(28 25% 38%)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(28 25% 38%)" stopOpacity="0" />
            </radialGradient>
            <clipPath id="sphereClip">
              <circle cx={CX} cy={CY} r={R} />
            </clipPath>
          </defs>

          <g clipPath="url(#sphereClip)">
            {/* Continental silhouettes — soft tonal regions */}
            <g style={{ mixBlendMode: "multiply" }}>
              {continents.map((c) => {
                const depth = Math.max(0.2, Math.min(1, c.z));
                return (
                  <ellipse
                    key={c.i}
                    cx={c.px}
                    cy={c.py}
                    rx={c.rx * depth * 0.9}
                    ry={c.ry * depth * 0.9}
                    fill="url(#continentTint)"
                    opacity={0.55 + depth * 0.35}
                  />
                );
              })}
            </g>

            {/* Graticule — parallels (static) */}
            <g
              fill="none"
              stroke="hsl(28 20% 25% / 0.09)"
              strokeWidth="0.18"
            >
              {parallels.map((p) => (
                <path key={`par-${p.lat}`} d={p.d} />
              ))}
            </g>

            {/* Graticule — meridians (rotating) */}
            <g
              fill="none"
              stroke="hsl(28 20% 25% / 0.07)"
              strokeWidth="0.18"
            >
              {meridians.map((m) => (
                <path key={`mer-${m.lng}`} d={m.d} />
              ))}
            </g>

            {/* Network arcs — faint coordination layer */}
            <g
              fill="none"
              stroke="hsl(var(--tomato))"
              strokeWidth="0.22"
              strokeLinecap="round"
              opacity="0.32"
            >
              {arcs.map((a) => (
                <path key={a.id} d={a.d} />
              ))}
            </g>

            {/* City dots — 3-tier hierarchy */}
            <g>
              {projected.map((p) => {
                const depth = Math.max(0, Math.min(1, p.z));
                if (p.tier === 0) {
                  return (
                    <circle
                      key={p.i}
                      cx={p.px}
                      cy={p.py}
                      r={0.45}
                      fill="hsl(var(--ink))"
                      opacity={0.22 + depth * 0.32}
                    />
                  );
                }
                if (p.tier === 1) {
                  return (
                    <circle
                      key={p.i}
                      cx={p.px}
                      cy={p.py}
                      r={0.85}
                      fill="hsl(var(--ink))"
                      opacity={0.55 + depth * 0.35}
                    />
                  );
                }
                // tier 2 — marquee
                return (
                  <g key={p.i}>
                    <circle
                      cx={p.px}
                      cy={p.py}
                      r={2.4}
                      fill="hsl(var(--tomato) / 0.18)"
                    >
                      <animate
                        attributeName="r"
                        values="1.6;3.4;1.6"
                        dur="4.2s"
                        begin={`${(p.i % 5) * 0.6}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.45;0;0.45"
                        dur="4.2s"
                        begin={`${(p.i % 5) * 0.6}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx={p.px}
                      cy={p.py}
                      r={1.3}
                      fill="hsl(var(--tomato))"
                      stroke="hsl(var(--cream))"
                      strokeWidth="0.35"
                    />
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PartnersGlobe;
