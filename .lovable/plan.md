## What I found

I searched the entire codebase for the word "role" (and "roles") and there are no instances of it being used to describe new, potential, or existing PizzaDAO members.

The only places "role" appears are:

1. **Partners section** (`src/components/Partners.tsx`) — describes companies, not members:
   - BASF — Materials
   - PRIVY — Identity
   - SUPERCHILD — Creative
   - MRBEAST — Distribution

2. **HTML accessibility attributes** (`role="button"`, `role="dialog"`, `role="alert"`, etc.) in UI primitives. These are required for screen readers and are not user-visible copy.

Member-facing pages (Hero, Mafia, Join, CommunityPage, ContactPage, About) already use the desired vocabulary: **members**, **volunteers**, **Pizza Mafia**, **organizers**, **chapters**, **the family**, **the crew**.

## Proposed next step

Since there's nothing to rewrite, I'd like to confirm one of the following before changing anything:

- **Option A — Treat as a guideline only.** Save a project memory rule: "Never refer to PizzaDAO members as having a 'role'. Use members, volunteers, or Pizza Mafia." This protects future copy from regressing.
- **Option B — You're seeing it somewhere I'm not.** Point me to the page/section (screenshot or URL) and I'll rewrite just that spot.
- **Option C — Include the Partners labels too.** Rename the Partners "role" field (Materials / Identity / Creative / Distribution) to something like "Focus" or "Contribution" — even though it describes companies, not members.

Which would you like?
