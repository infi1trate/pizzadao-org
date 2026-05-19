## Calendar section tweaks

In `src/pages/CommunityPage.tsx` → `ThisWeekSection`:

1. **Filter out empty days.** In the weekly list (`week.map(...)`), only render days that have at least one event (`d.events.length > 0`). Removes the "—" placeholder rows so the card only shows real upcoming events.
2. **Rename the card heading.** Replace "The shared / calendar." with "Upcoming / community events." (keeps the two-line display rhythm).
3. **Empty-state fallback.** If the filtered list is empty (no events in the next 7 days), show a single line: "No community events in the next 7 days. Check the full calendar." — preserves layout without faking content.

No layout, spacing, color, or container changes. The right-side featured events column and the "View full calendar" modal stay as-is.