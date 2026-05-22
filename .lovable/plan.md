## Benny Pop-Up — Playful Site-Wide Easter Egg

Benny (the pizza mascot from the uploaded image) will occasionally rise up from inside random photo containers, peek/wave, then duck back down. It's a delightful sighting, never disruptive, and never in conversion or task flows.

### Asset
- The uploaded `bennytop.png` is **already pre-cropped to just the top half of Benny** (head, eyes, waving hand, pizza box). Save it as `src/assets/benny-peek.png` and use it as-is — no overflow clipping trick needed. He literally is the "peek".
- Because the sprite's natural bottom edge is his torso/box, we anchor him to the **bottom of the container** and animate `translateY` from `100%` (fully hidden below) to `0%` (resting on the container floor with his head poking up). Ducking returns him to `100%`.

### New component: `src/components/BennyPeek.tsx`
A self-mounting controller that:
1. On mount, scans the DOM for opted-in photo containers (`[data-benny="true"]`).
2. Filters to those currently in the viewport (IntersectionObserver).
3. Every 18–35s (randomized), picks one eligible container at random and triggers a pop:
   - Slide up via Framer Motion: `y: 100% → 0%` with spring `stiffness: 180, damping: 18`.
   - Hold ~1.6s with a tiny idle bob (`y: [0, -4, 0]` ×2) and a single wave (rotate ±6°).
   - Duck back: `y: 0% → 100%`, spring `stiffness: 220, damping: 22`.
4. Renders Benny via a React portal into the chosen container as an absolutely-positioned `<img>`:
   - `position: absolute; left/right: random third; bottom: 0; pointer-events: auto;`
   - Height capped at ~55% of container height, min 120px, max 280px.
   - Ensures container has `position: relative` and `overflow: hidden` (added inline if missing — most already do).
5. Behavior rules:
   - Respects `prefers-reduced-motion` → renders nothing.
   - Pauses when `document.hidden`.
   - Only one Benny on screen at a time.
   - Session cap: max 6 appearances per page visit; min 8s between appearances.
   - Skips containers smaller than 160×160px.
   - Click on Benny = he ducks immediately (no nav, no modal, no sound).
6. Mounted once globally in `src/App.tsx` inside `<BrowserRouter>`; internally short-circuits on excluded routes via `useLocation()`.

### Excluded routes (critical paths)
- `/get-your-mafia-name`
- `/contact`
- `/partners`
- `/privacy`, `/terms`
- Defensive pattern guard for future `/checkout`-like paths

### Opt-in photo containers (add `data-benny="true"`)
Non-critical, image-driven surfaces only:
- `src/components/Hero.tsx`
- `src/components/Impact.tsx`
- `src/components/MomentReel.tsx`
- `src/components/Journal.tsx`
- `src/components/ArchivalWall.tsx`
- `src/components/Work.tsx`
- `src/components/PartnerActivations.tsx`
- `src/pages/About.tsx`
- `src/pages/CommunityPage.tsx`
- `src/pages/BrandSystemPage.tsx`
- `src/components/PageHero.tsx`

We will NOT tag containers inside MafiaNamePage, ContactPage, PartnersPage form area, or Footer.

### Accessibility
- `aria-hidden="true"` on the sprite (decorative).
- Reduced-motion → fully disabled.
- No layout shift: portal child is absolutely positioned.

### Files to add / edit
- ADD `src/assets/benny-peek.png` (copied from upload — already top-cropped)
- ADD `src/components/BennyPeek.tsx`
- EDIT `src/App.tsx` — mount `<BennyPeek />` once globally
- EDIT the component files listed above — add `data-benny="true"` to existing photo wrappers; ensure `relative overflow-hidden` is present (most already have it)

### Out of scope
- No sound, no analytics events, no new routes, no copy changes, no redesign of any container.
