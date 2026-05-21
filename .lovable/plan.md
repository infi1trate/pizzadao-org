# Source the Archive from real PizzaDAO photos

## What I found

The **Global Pizza Party 2026** project doesn't bundle photos — its gallery streams them straight from a public PizzaDAO GitHub repo:

```
https://raw.githubusercontent.com/PizzaDAO/dow-pizza-party/main/public/photos/{slug}/2025/{filename}
```

The list of cities + filenames lives in `src/data/cityManifest.ts` (~200 cities across Americas / Europe / Asia / Africa / Oceania / Middle East), with curated captions and "featured" highlights in `src/lib/galleryData.ts`. This is real, documentary event photography — exactly the brief.

Because the URLs are public, we don't need the Drive connector, an upload, or any backend. We can hotlink the same images.

## Plan

### 1. Port the photo manifest into this project
- Copy `src/data/cityManifest.ts` and `src/lib/galleryData.ts` from the GPP 2026 project into this one (light trim — drop the `highlight` field if unused here).
- Keep the same `PHOTO_BASE` URL so we reuse the public CDN.

### 2. Rebuild the Act IV archival wall to draw from the manifest
In `src/components/ArchivalWall.tsx`:
- Replace the hand-authored `FRAMES` array with a curated draw from `getGalleryFeed()`.
- Curate, don't dump: pick ~18–22 photos spread across regions, preferring cities with multiple frames (better odds of crowd/table/night shots). Deterministic selection so the layout is stable across renders.
- Map each pick onto the existing asymmetric slot system (col-start / col-span / row-span / aspect / parallax drift / tone). Same cinematic grid, real photos.
- Hover caption now reads from real data: `city`, `country` + flag, optional editorial `caption`.
- Add lightweight `onError` fallback: if a remote image 404s, hide the frame so we never show a broken tile.

### 3. Replace remaining placeholder photography across the About page
The About page currently reuses a handful of local stock-ish JPGs (`party.jpg`, `community.jpg`, `timeline-2010.jpg`, etc.) in three other spots:

| Section | Current image | Swap to |
|---|---|---|
| Act I — The Spark (hero) | `party.jpg` | A strong crowd shot from the manifest (e.g. Lagos / NYC / Buenos Aires) |
| Act II — The Ritual (May 22 cinematic) | `timeline-2010.jpg` | A night-scene party photo (Tokyo / Berlin / Seoul) |
| Act III — How it runs (field-note fragment) | `community.jpg` | A quieter, documentary-feel shot (Naples / Lisbon / Cape Town) |

Each swap keeps the existing layout, treatments, and alt text patterns — only `src` changes, plus an `onError` fallback to the original local asset so nothing breaks if the remote URL ever moves.

### 4. Keep the editorial tone intact
- No new sections, no logo wall, no captions added beyond what already exists.
- Same tone treatments (warm/cool/mono), same grain, same hover-only caption reveal.
- Headline + supporting copy in Act IV stay as written ("People kept showing up.").

## Technical notes

- Remote images are hotlinked from `raw.githubusercontent.com`. That's how GPP 2026 ships today; no CORS/CDN issues for `<img>` tags.
- Add `loading="lazy"` and `decoding="async"` on all wall frames (already done for the wall; will extend to the new swaps).
- Deterministic curation uses a seeded picker keyed off the manifest order so SSR/CSR render the same frames every time.
- No new dependencies. No schema or backend changes.

## Out of scope

- A full `/gallery` route — this plan only touches the About page.
- Pulling the Drive folder you originally referenced. (Still possible later if you connect Google Drive; the public GitHub repo gives us better coverage for now.)
