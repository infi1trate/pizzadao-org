# Replace text wordmarks with real logos — `/partners` "Selected collaborators"

Treatment: **monochrome by default (grayscale + 60% opacity), full color on hover.**

## Steps

1. Copy the 8 uploaded screenshots into `src/assets/partners/`:
   - `paypal.png`, `ledger.png`, `stand-with-crypto.png`, `brave.png`, `opensea.png`, `base.png`, `polygon.png`, `ens.png`
2. Edit `src/pages/PartnersPage.tsx`:
   - Import the 8 logo files.
   - Add a `logo` field to each entry in the `PARTNERS` array.
   - Replace the text `<span>` inside the logo grid (lines 215–220) with an `<img>`:
     - `h-8 md:h-10 w-auto object-contain`
     - `mix-blend-multiply grayscale opacity-60 transition duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100`
     - `alt={`${p.name} logo`}`
   - Loosen vertical rhythm slightly: `gap-y-12 md:gap-y-14`.

White areas of each logo blend invisibly into the cream paper background via `mix-blend-multiply` — no AI background removal needed, no logo distortion.

No other sections, components, or assets change.
