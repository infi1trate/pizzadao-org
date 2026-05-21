# About page — accuracy + storytelling pass

Use Brandon Forant's "The Room About Nothing" as the source of truth and correct the inaccuracies woven into the current `/about` page. No new sections. Copy-and-detail surgery only.

## What's wrong today

- **Origin medium**: page says "Discord server" + "Discord · #pizza-day". The actual origin was a **Clubhouse** room called **"The Room About Nothing"**. Discord came weeks later (the 1,700-member channel that formed once the idea took off).
- **Missing the actual mechanism**: nothing about **RarePizzas** (10,000 algorithmically generated pizza NFTs built from 300+ artists' submitted toppings, Chainlink VRF, all assets CC-licensed) — which is *how* the first party got funded ($1.3M raised, $500K in 5 hours on Pi Day).
- **Missing the people**: no Snax (founder, "fearless leader in a fishing vest"), no Shrimp (Anthony Shafer, Hollywood SFX artist who built the generator), no Benny the mascot, no NFTNYC reveal moment, no Pizza Mafia naming convention (topping = name).
- **Stale numbers**: page claims "420+ cities / 60+ countries". Article's 2025 figures are **400+ cities, 6 continents, 65+ countries, 20,000+ fed, 500+ independent pizzerias, $1M+ pizza**. (Article also references "75 countries" elsewhere — flagged below.)
- **Fabricated captions**: polaroid notes like "Manila — first run, 2021" and "Brooklyn — rooftop, may 22" are invented detail. The first party did happen May 22, 2021 but specific city attributions need to be true or removed.

## Section-by-section changes

### Hero (unchanged structurally)
Keep current image + composition. No copy change needed — "An institution built on a slice." still works.

### § 01 — Origin (the "Discord server, holiday, hunch" block)
- Replace the archive slip metadata:
  - "§ 01 — Origin · 2020–2021" stays
  - **"Discord · #pizza-day"** → **"Clubhouse · The Room About Nothing"**
- Replace headline `A Discord server, a holiday, and a hunch.` → **`A Clubhouse room, a holiday, and a hunch.`**
- Rewrite the prose to align with the article. Proposed lead:
  > PizzaDAO started in 2021 inside a Clubhouse room called *The Room About Nothing* — strangers behind 8-bit avatars, trying to throw a party in cities they'd never been to, for people they'd never met.
- Body paragraphs: keep the voice, but swap the Discord references for Clubhouse, and add one paragraph naming the **RarePizzas** funding mechanism — 10,000 NFTs from 300 artists, Chainlink VRF, $1.3M raised — without turning it into a tech essay.
- Polaroid captions: replace invented locations with truthful ones the article supports. Suggested set:
  - "Clubhouse · 1am" (anonymous, no photo would exist — drop this slot OR use a screenshot-style placeholder)
  - "NFTNYC · the reveal" — the first time the team met in person
  - "May 22, 2021 · first party"
  - **Recommend**: drop the polaroid trio to a **duo** (NFTNYC reveal + May 22 first party) since we don't have a real Clubhouse artifact.

### § 02 — Founding principle poster ("democratic food")
No copy change. The aphorism is editorial, not factual.

### Ritual section (May 22)
- Tighten the body so the dateline is accurate. Bitcoin Pizza Day is **May 22, 2010** ✅ (already correct).
- Add one line acknowledging the recurring ritual started in **2021**, not just "years later".
- Contact-sheet city stamps: keep — these are atmospheric, not historical claims.

### § 03 — How it runs ("A small core, a global cast")
- Update numbers ledger to match the 2025 figures from the article:
  - **400+ cities** (was 420+)
  - **65+ countries** (was 60+) — or use **6 continents** as the second metric
  - **$1M+ funded** ✅ keep
  - **Since 2021** ✅ keep
- Optionally add a fifth/replacement metric: **20,000+ people fed** or **500+ pizzerias**.
- Body copy is good — no rewrite needed.

### § 04 — Thesis ("social infrastructure")
No factual change. Keep poster treatment.

### Press section
Keep — these are real outlet quotes.

### Closing red CTA
No change.

## New material to optionally weave in (no new sections)

If the user wants more warmth/personality, these can land as **one-line annotations** inside existing sections — not as new blocks:

- **Snax** — name-drop once in the Origin prose ("an admin named Snax…") to give the founder a face.
- **Benny** — one handwritten margin note near the closing CTA: *"Benny has been on every table, in every city."*
- **Pizza Mafia names** — already linked from `/get-your-mafia-name`, but a one-liner in the Origin section explaining the naming convention (your topping = your name) would land well.

## Open question for the user

1. **Name names?** The article publicly credits Snax (founder), Shrimp (Anthony Shafer), and Brandon Forant (author/CD). Want them named on the page, or keep the voice collective/anonymous?
2. **Which number for "countries"?** Article says **65 countries** (2024 figure) but elsewhere mentions **75 countries** in the closing reflection. Pick one — recommend **65+** as the more recent, concrete figure.
3. **RarePizzas depth** — name-drop only (one sentence), short paragraph, or its own micro-moment? Recommend **one sentence** to stay restrained.

## Technical notes

- All edits land in `src/pages/About.tsx`.
- `ORIGIN_POLAROIDS` array (top of file) needs its caption strings rewritten; if reducing to a duo, drop the third entry and update the layout (`w-[36%]` → `w-[48%]`).
- Numbers `dl` array in How-it-runs section: swap the 4 `{ k, v }` entries.
- No new components, no new assets needed.
