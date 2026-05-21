# Mafia Name — Ceremony + Avatar Refactor

Refocus `/get-your-mafia-name` from an editorial identity microsite into a playful, tactile **mafia alias generator**. The user is **claiming a name**, not discovering themselves. Keep the strong bones (oversized inputs, deliberation animation, asymmetric name hierarchy) and dial up warmth, humor, paper texture, and mob-notebook personality. Add a generated cartoon mafia **avatar** as the centerpiece of a dossier-style final card.

---

## 1. Hero refactor

- Headline: **"Claim your mafia name."**
- Subhead: **"Choose a film. Choose a topping. The family handles the rest."**
- Strip philosophical/abstract copy. Direct, confident, memorable.

## 2. Inputs — tighten copy, keep oversized fields

- Film placeholder → **"What's your mafia movie?"**
- Topping placeholder → **"What's your topping?"**
- Keep oversized rounded inputs, contextual drawers, progressive reveal.
- After film select: compact **dossier summary** — `TITLE · YEAR · COUNTRY` + a 2–4 word tone tag (e.g. "Quiet power.", "Operatic.").
- Topping chips: **+15–20% size**, warmer shadows, faint checker-cloth texture behind the drawer, slightly imperfect grid rhythm. Bigger ingredient glyphs.

## 3. Deliberation animation — keep, add mob-notebook overlays

Keep the cycling/blur/flicker. Layer in scribbled annotations using **Rock Salt** font (annotations only — never primary UI):
- crossed-out candidate names
- margin notes: "nah", "too obvious", "watch this guy", "capo material", "this one?"
- flickering aliases

## 4. Name reveal — less gallery, more archive

- Keep 1 dominant + 2 alternates, asymmetric.
- Reduce big empty spacing; introduce **card overlap, paper layering, tape/paperclip energy**.
- Hover/select: paper lift, warm shadow, red underline, small **APPROVED** stamp drops, Rock Salt margin scribble appears ("this guy", "made", "earner").
- No checkbox/SaaS hover states.

## 5. Selection dock

Restyle the floating dock as a **mafia paperwork tray**: warmer light, deeper shadow, subtle grain + paper texture, embossed feel. Same functions (edit, copy, claim).

## 6. Avatar system (NEW)

Generate a cartoon mafia avatar tied to the chosen movie + topping + name. Style reference: the uploaded turkey/cookie-eyepatch portraits — rubber-hose cartoon, thick outlines, circular frame, warm muted palette, mischievous, pizza details (sausage cigar, pizza-slice eyepatch, pizza lapel pin, feathered fedora, gold chain, marinara stain).

**Implementation:**
- New edge function `generate-mafia-avatar` calling Lovable AI image model `google/gemini-2.5-flash-image` (Nano Banana) with a style-locked prompt that interpolates topping motif, film tone, and name.
- Returns a base64 PNG; cached per `(film, topping, name)` to avoid regenerating.
- Displayed on the final card; downloadable as PNG; "regenerate" action available.

## 7. Final card — PizzaDAO Family Paperwork

Transform the claim card into a dossier artifact:
- Layered textured paper, subtle folds/stains, taped-photo avatar, paperclip, red **APPROVED** ink stamp, embossed PizzaDAO seal.
- Contents: avatar, claimed name, optional alias, handwritten annotations (Rock Salt), family registry no., movie + topping references, initiation status, share/download/claim-again actions.
- Microcopy: **YOU'VE BEEN MADE.**, **FAMILY RECORD**, **STATUS: MADE**, **ARCHIVE NO. 02491**, signed "— Benny".

## 8. Ceremony finale

Keep seal stamp + spotlight. Enhance: stronger vignette, warmer ambient shadow, drifting dust/grain, slight paper shake on stamp impact. Feel: "You've officially been made."

---

## Technical section

**Files**
- `src/pages/MafiaNamePage.tsx` — copy, layout, drawer styling, dock, name cards, integration of avatar + dossier card.
- `src/index.css` — add Rock Salt font import (annotations only), paper/checker-cloth textures, stamp/paper-lift keyframes, vignette utility.
- `tailwind.config.ts` — add `font-handwritten` family mapped to Rock Salt; add new shadow/animation tokens.
- `src/components/mafia/Dossier.tsx` (new) — final paperwork card.
- `src/components/mafia/MafiaAvatar.tsx` (new) — avatar frame + loading/regenerate states.
- `supabase/functions/generate-mafia-avatar/index.ts` (new) — calls Lovable AI Gateway image model, returns `{ image: "data:image/png;base64,..." }`. Handles 429/402.
- `supabase/config.toml` — register the new function (no JWT verify; matches existing pattern).

**Avatar prompt template (locked style)**
> Vintage rubber-hose cartoon mafia portrait, circular crop on cream background with dark navy border ring, thick black outlines, warm muted palette, expressive mischievous face, pinstripe suit + fedora, subtle pizza references ({TOPPING_MOTIF}), {FILM_TONE} mood, no text, no logos, flat shading, 1024×1024.

`TOPPING_MOTIF` and `FILM_TONE` derived from selected topping/film tags.

**State**
- Persist last claimed `{ name, film, topping, avatarUrl, archiveNo }` in `localStorage` so refresh keeps the dossier.
- `archiveNo` deterministic hash of name (already in code).

**No DB schema changes.** Existing `mafia_name_claims` table continues to store the claim.

**Out of scope:** changing the films dataset, topping list, navigation, or other pages.
