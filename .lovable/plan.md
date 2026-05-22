## Where to put it

The strongest spot is right **after the Ritual section's closing line** ("Every May 22, a door opens.") and **before "How It Runs"** — a small editorial breath between the ritual and the operations chapters. Treating it as a single tilted polaroid "field dispatch" makes it feel like marginalia from the archive, not another data point in the contact sheet.

Why not the Field Contact Sheet itself: that strip is a tight 4-up grid representing one global night across continents. Slotting a 5th tile would break its rhythm and dilute its meaning. A standalone aside lets the volcano photo land as a punchline rather than just another city.

Why not the Archive Wall: the wall is the emotional crescendo at the end. Dropping a punchline there flattens it.

## The aside

A small, off-grid polaroid moment — taped, slightly rotated, with a Rock Salt handwritten caption. Reads like a journal entry someone left between chapters.

```text
                    ┌──────────────────┐
                    │                  │
                    │   [volcano       │
                    │    pizza photo]  │
                    │                  │
                    │                  │
                    └──────────────────┘
                       Pacaya · 2024
              "We've even served pizza
                    on a volcano."
```

Visual treatment:
- Cream polaroid frame matching the Archive wall polaroids (consistency).
- Rotated ~2°, taped corner, taking ~38% width on desktop, full-width on mobile.
- Caption uses the existing `handwritten` (Rock Salt) class — short, warm, single line. Dateline below in the tiny ui overline style ("Field dispatch · Pacaya volcano, Guatemala · 2024").
- Sits inside a narrow container with generous vertical space (mt-20 md:mt-28) so it reads as a deliberate pause, not decoration.

## Implementation steps

1. Copy `user-uploads://4.jpeg` to `src/assets/volcano-pizza.jpg`.
2. In `src/pages/About.tsx`, import the asset alongside the other hero/ritual images.
3. Insert a new block immediately after the "Every May 22, a door opens." line (around line 383) and before the closing `</section>` of the Ritual section — a centered figure with the polaroid styling, handwritten caption, and small dateline overline.
4. Keep tone consistent with the rest of the page: no exclamation marks beyond the handwritten quote, no badges, no extra microcopy.

## Out of scope

- No new section header, no new section divider.
- No changes to the Field Contact Sheet grid.
- No changes to the Archive wall.
