## Scope

Four focused fixes on `/partners`. No new features, no backend.

---

### 1. Globe annotations → white speech bubbles

`src/components/PartnersGlobe.tsx` currently renders annotations as Rock Salt handwritten text (lines 231–264). Replace with small, white, rounded speech-bubble labels:

- Drop the `Rock Salt` font; switch to the project UI sans (matches our `.ui` class — small caps off, sentence case, ~2.1px in viewBox units).
- Each annotation becomes a `<g>` with:
  - A rounded `<rect>` filled `hsl(var(--cream))` (near-white) with very soft shadow (`filter: drop-shadow(0 0.3px 0.6px rgba(0,0,0,0.25))`) and 0.08 ink stroke at 25% opacity.
  - A tiny pointer triangle from the bubble toward the city dot.
  - The text inside, ink-colored, no rotation.
- Bubble width measured from text length (approx via `text.length * 1.05px + 2.4px` padding); height fixed (~3.2px).
- Keep the existing breathing/visibility math so bubbles still fade in/out gracefully near the limb and stagger as the globe rotates.
- Pointer + bubble offset uses existing `dx/dy/anchor` so positions stay art-directed.

### 2. Restore lost city dots on the globe

`PartnersGlobe.tsx` line 215 currently does `if (p.tier === 0) return null;`, which **drops ~329 of the 421 cities** in `pizzadao-cities.json`. Only anchors (12) + MID-tier (hash%5, ~80) render. The reference project (Global Pizza Party 2026) lists ~445 cities — our 421-entry dataset is intact, the globe is just hiding them.

Fix: render tier 0 as a faint floor layer.

- Tier 0: `r = 0.28`, opacity `0.32 * (0.4 + 0.6 * vis)`, ink color.
- Tier 1 (MID): unchanged — `r = 0.55`, opacity `~0.6`.
- Tier 2 (ANCHORS): unchanged — `r = 1.05`, opacity `~0.92`.

Net effect: all 421 chapters become visible as a quiet constellation, anchors still dominate the hierarchy.

### 3. Hero ↔ "Why brands partner" breathing room

`Sponsorship.tsx` line 92 opens with `pt-7 md:pt-9` (very tight). Increase to `pt-16 md:pt-24` and keep the existing soft tonal bridge so the join still feels intentional, not abrupt. The hero's own `paper-soft` section already has bottom padding via its content; we only widen the gap on the Sponsorship side so nothing else shifts.

### 4. Collaborator logos — smaller & uniform

Target: average logo size ≈ current PayPal × 0.8.

In `src/pages/PartnersPage.tsx`:

- Shrink container from `h-14 md:h-16` to `h-9 md:h-11`.
- Tighten per-logo `scale` values so they cluster around `1.0` instead of swinging 0.78–1.40:

  ```text
  PayPal           1.00
  Coinbase         0.95   (pure wordmark)
  Ledger           0.85   (bracketed wordmark, wide)
  Brave            1.00   (icon + word)
  OpenSea          1.00   (icon + word)
  Polygon          1.00   (icon + word)
  ENS              0.95   (icon + word)
  Stand With Crypto 1.10  (stacked 3-line block; still needs a small bump)
  ```

- Reduce row gap slightly (`gap-y-12 → gap-y-10`) so the smaller logos don't float in too much vertical air.
- Keep the mask-based monochrome / colour-on-hover behavior unchanged.

---

## Files touched

- `src/components/PartnersGlobe.tsx` — speech-bubble annotations + restore tier-0 dots
- `src/components/Sponsorship.tsx` — top padding
- `src/pages/PartnersPage.tsx` — logo container height, scale map, row gap

No data files, no new assets, no routing or analytics changes.