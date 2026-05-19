# Newsletter Email Intake

## Copy updates (`src/components/Journal.tsx`)

The current band says:
- Heading: "One issue. / Every Sunday."
- Body: "A weekly dispatch…"
- Footer note: "Powered by Substack · 12,000+ readers"

Replace with cadence-neutral copy (keeping the same editorial tone, layout, type sizes, and pill styles — no design changes):

- Heading: "One issue. / When it's ready."
- Body: "An occasional dispatch — the best new writing, dispatches from chapters, and one thing about pizza you didn't know yesterday. No schedule. No tracking. Unsubscribe anytime."
- Footer note: "Join 12,000+ readers · Unsubscribe anytime"

## Backend

### Database
New table `newsletter_subscribers`:
- `email` (text, unique, required)
- `source` (text, default `'journal'`) — so we can track intake points later
- `status` (text, default `'subscribed'`)
- standard `id`, `created_at`

RLS:
- Public INSERT allowed with validation (trimmed email, length ≤ 320, basic format).
- No SELECT/UPDATE/DELETE for anon/authenticated (service role only).
- Unique constraint on `lower(email)` to dedupe.

### Edge function `subscribe-newsletter`
- Public (`verify_jwt = false`), CORS enabled.
- Validates email (zod-style manual check, ≤320 chars).
- Inserts via service role; on unique violation, returns `{ ok: true, already: true }` so the UI shows a friendly "already subscribed" state instead of an error.
- Returns `{ ok: true }` on success.
- No email sending in this step — purely intake. (Can layer Lovable Emails confirmation later if desired.)

### Frontend wiring (`src/components/Journal.tsx`)
- Convert the form to a controlled component with local `email`, `status` (`idle | loading | success | error | already`) state.
- On submit: call `supabase.functions.invoke('subscribe-newsletter', { body: { email } })`.
- Use existing `useToast` for feedback; also swap the submit button label/state inline:
  - idle: "Subscribe →"
  - loading: "Subscribing…" (disabled)
  - success: "Subscribed ✓" then reset after a few seconds
  - already: toast "You're already on the list."
- Preserve all existing classes, layout, spacing, and the `btn-pill-lg bg-ink text-cream hover:bg-tomato` styling.

## Technical notes
- Files touched: `src/components/Journal.tsx`, new `supabase/functions/subscribe-newsletter/index.ts`, `supabase/config.toml` (register function with `verify_jwt = false`), one migration for the table + RLS + unique index.
- No changes to design tokens, layout, or any other component.
- Follows existing pattern from `submit-contact` edge function for consistency.

## Out of scope
- Sending a welcome/confirmation email (can add later via Lovable Emails if you want double opt-in).
- Admin dashboard to view subscribers (queryable via backend for now).
