/**
 * PartnersGlobe — premium global systems visualization for the Partners hero.
 *
 * Editorial register: Monocle infographic / Apple systems diagram.
 * Not interactive. Slow rotation. No tooltips, no clicks.
 *
 * Layers (back to front):
 *   1. Ambient warmth halo
 *   2. Matte sphere with soft directional shading
 *   3. SVG: graticule (d3.geoGraticule10, rotating with yaw)
 *   4. SVG: real continent silhouettes (world-atlas land-110m via d3-geo)
 *   5. SVG: faint great-circle network arcs between marquee chapters
 *   6. SVG: city dots in 3-tier hierarchy
 *   7. SVG: single quiet pulse on marquee dots
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import landTopo from "world-atlas/land-110m.json";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, MultiPolygon } from "geojson";
import citiesData from "@/data/pizzadao-cities.json";

type City = { name: string; coords: [number, number] };

const CITIES: City[] = (citiesData as Array<{ name: string; coords: unknown }>)
  .filter((c) => Array.isArray(c.coords) && (c.coords as number[]).length === 2)
  .map((c) => ({ name: c.name, coords: c.coords as [number, number] }));

// Anchor cities — intentional, not data-dense. These are the only larger dots.
const ANCHORS = new Set([
  "New York", "London", "Lagos", "Tokyo",
  "São Paulo", "Sao Paulo", "Sydney", "Mumbai", "Mexico City",
  "Milan", "Berlin", "Istanbul",
]);

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
// A sparser secondary tier — small ink dots, intentional clusters only.
const MID = new Set(
  CITIES.filter((c) => !ANCHORS.has(c.name) && hash(c.name) % 5 === 0).map((c) => c.name),
);

// Hand-annotated whispers near specific cities. Sentence case, never shouty.
type Annotation = { city: string; text: string; dx: number; dy: number; anchor?: "start" | "end" };
const ANNOTATIONS: Annotation[] = [
  { city: "Milan",       text: "ciao from milan",     dx:  3, dy: -2 },
  { city: "Mexico City", text: "hola from cdmx",      dx: -3, dy:  3, anchor: "end" },
  { city: "Tokyo",       text: "gm from tokyo",       dx:  3, dy: -2 },
  { city: "New York",    text: "irl > ads",           dx: -3, dy: -2, anchor: "end" },
  { city: "Lagos",       text: "shared slices",       dx:  3, dy:  3 },
  { city: "London",      text: "one bite at a time",  dx:  3, dy: -2 },
  { city: "São Paulo",   text: "pizza the planet",    dx: -3, dy:  3, anchor: "end" },
  { city: "Mumbai",      text: "community first",     dx:  3, dy: -2 },
  { city: "Berlin",      text: "geteilte stücke",     dx:  3, dy: -2 },
  { city: "Istanbul",    text: "selam, dilim hazır",  dx: -3, dy:  3, anchor: "end" },
];

const VB = 100;
const CX = 50;
const CY = 50;
const R = 48;
const TILT = -18; // degrees, applied as projection rotate Y

// Decode the world-atlas land topology once.
const LAND_FEATURE = feature(
  landTopo as unknown as Topology,
  (landTopo as unknown as Topology).objects.land as GeometryCollection,
) as unknown as Feature<MultiPolygon>;

const GRATICULE = geoGraticule10();

const PartnersGlobe = () => {
  const [yaw, setYaw] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      // ~140s per revolution
      setYaw(((t - start) / 140000) * 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Projection rebuilt per frame (cheap)
  const { landPath, graticulePath, arcs, projected } = useMemo(() => {
    const projection = geoOrthographic()
      .scale(R)
      .translate([CX, CY])
      .clipAngle(90)
      .rotate([yaw, TILT, 0]);
    const path = geoPath(projection);

    const landPath = path(LAND_FEATURE) ?? "";
    const graticulePath = path(GRATICULE) ?? "";

    const arcs = ARC_PAIRS.flatMap(([an, bn]) => {
      const a = CITIES.find((c) => c.name === an);
      const b = CITIES.find((c) => c.name === bn);
      if (!a || !b) return [];
      const d = path({
        type: "LineString",
        coordinates: [a.coords, b.coords],
      });
      if (!d) return [];
      return [{ id: `${an}-${bn}`, d }];
    });

    const projected = CITIES.flatMap((c, i) => {
      // `projection(point)` still returns coordinates for cities on the far
      // side of an orthographic globe. Those backside points read as a second
      // dot layer moving against the planet, so use the same clipped path pass
      // as continents/graticule before rendering any city marker.
      const visiblePoint = path({
        type: "Point",
        coordinates: c.coords,
      });
      if (!visiblePoint) return [];

      const p = projection(c.coords);
      if (!p) return [];
      const tier = MARQUEE.has(c.name) ? 2 : MID.has(c.name) ? 1 : 0;
      return [{ i, name: c.name, px: p[0], py: p[1], tier }];
    });

    return { landPath, graticulePath, arcs, projected };
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
            <clipPath id="sphereClip">
              <circle cx={CX} cy={CY} r={R} />
            </clipPath>
          </defs>

          <g clipPath="url(#sphereClip)">
            {/* Graticule — hairline, rotates with globe */}
            <path
              d={graticulePath}
              fill="none"
              stroke="hsl(28 20% 25% / 0.08)"
              strokeWidth="0.18"
            />

            {/* Continental silhouettes — soft warm ink, multiply blend */}
            <g style={{ mixBlendMode: "multiply" }}>
              <path
                d={landPath}
                fill="hsl(28 28% 20%)"
                fillOpacity="0.22"
                stroke="hsl(28 28% 15%)"
                strokeOpacity="0.28"
                strokeWidth="0.18"
                strokeLinejoin="round"
              />
            </g>

            {/* Network arcs — faint coordination layer */}
            <g
              fill="none"
              stroke="hsl(var(--tomato))"
              strokeWidth="0.32"
              strokeLinecap="round"
              opacity="0.42"
            >
              {arcs.map((a) => (
                <path key={a.id} d={a.d} />
              ))}
            </g>

            {/* City dots — 3-tier hierarchy */}
            <g>
              {projected.map((p) => {
                if (p.tier === 0) {
                  return (
                    <circle
                      key={p.i}
                      cx={p.px}
                      cy={p.py}
                      r={0.5}
                      fill="hsl(var(--ink))"
                      opacity={0.5}
                    />
                  );
                }
                if (p.tier === 1) {
                  return (
                    <circle
                      key={p.i}
                      cx={p.px}
                      cy={p.py}
                      r={0.9}
                      fill="hsl(var(--ink))"
                      opacity={0.75}
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
