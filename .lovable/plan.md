## Goal

The Partners-page globe currently uses six soft-blurred ellipses as stand-ins for continents — landmasses are illegible. Upgrade to a real orthographic projection with actual continent silhouettes, keeping the editorial, paper-toned register intact.

## Approach

1. Add lightweight geo deps:
   - `d3-geo` (orthographic projection + path generator)
   - `world-atlas` (TopoJSON of world land — `land-110m.json`, ~80 KB)
   - `topojson-client` (decode TopoJSON to GeoJSON)
   Pinned to React 18-safe versions.

2. Rewrite `src/components/PartnersGlobe.tsx`:
   - Replace the hand-rolled `project()` helper with `d3.geoOrthographic()` configured to the same tilt (−18°) and the existing rotating yaw.
   - Use `d3.geoPath(projection)` to generate the SVG `d` strings for:
     - Land silhouettes (from world-atlas land-110m, merged feature)
     - Graticule (`d3.geoGraticule10()`) — replaces the manual parallels/meridians
     - The marquee arcs (`{ type: "LineString", coordinates: [a, b] }`)
   - City dots: project each city's `[lng, lat]` with the projection; visibility via the orthographic clipping (filter where the back of the sphere returns null).
   - Keep all existing visual layers:
     - Cream paper sphere with directional shading + soft specular
     - Tomato ambient halo
     - 3-tier dot hierarchy (small ink dots, medium ink dots, marquee tomato pulses)
     - Tomato connection arcs
   - Land fill: warm ink tint at low opacity, layered with `mix-blend-mode: multiply` so it sits on the paper sphere without flattening it. One subtle inner edge stroke at very low opacity to give the coastline a hint of definition without becoming a hard map.

3. Performance:
   - Memoize the GeoJSON land feature once on mount.
   - Recompute path strings per yaw frame (cheap — d3-geo is fast for 110m land).
   - Honor `prefers-reduced-motion` as today.

4. No layout/sizing changes — same square container, same max width, same aspect.

## Visual register

- Paper sphere: unchanged
- Continents: single warm ink tone (`hsl(28 25% 22%)`) at ~18–22% opacity via multiply blend — silhouettes read clearly but stay quiet
- Graticule: existing hairline opacity, now from `geoGraticule10` so it aligns perfectly with the projection
- Cities: unchanged (ink tiers + tomato marquee pulses)
- Arcs: unchanged tomato hairlines, now great-circle accurate via d3-geo

## Files

- `package.json` — add `d3-geo@^3`, `topojson-client@^3`, `world-atlas@^4` and their `@types/*`
- `src/components/PartnersGlobe.tsx` — rewrite render + projection internals; keep the public component API (no props), so `PartnersPage.tsx` stays untouched

## Out of scope

- No changes to `CinematicGlobe` (homepage) — different register, different rules.
- No interactivity (still ambient, non-clickable).
- No copy or layout changes on the Partners page.
