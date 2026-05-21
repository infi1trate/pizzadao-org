# PostHog analytics — event reference and dashboard recipes

This file documents how PostHog is wired into pizzadao.org so anyone on the
team can reproduce dashboards, A/B tests, or new instrumentation without
re-reading the code.

## Setup

The PostHog project key is a **publishable** client key (`phc_…`) and is
safe to ship in the bundle. It's read from Vite env vars:

```
# .env
VITE_PUBLIC_POSTHOG_KEY=phc_xxx
VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com    # or https://eu.i.posthog.com
# Optional — enables posthog.debug() locally:
VITE_PUBLIC_POSTHOG_DEBUG=1
```

If the key is missing the SDK is a silent no-op — the site still works in
development.

Source files:

- `src/lib/analytics/config.ts` — env-var loading + sampling config
- `src/lib/analytics/posthog.ts` — init, track, identify, attribution
- `src/lib/analytics/events.ts` — typed event-name constants
- `src/lib/analytics/PostHogProvider.tsx` — mounts SDK, fires SPA `$pageview`
- `src/lib/analytics/useTrackOutbound.ts` — helper for outbound link clicks

The provider lives inside `<BrowserRouter>` in `src/App.tsx`.

## Identity model

- Anonymous visitors get PostHog's cookie distinct_id.
- After a contact-form submit or newsletter subscribe we call
  `identifyByEmail(email, props)`, which uses a SHA-256 hash of the email
  as the stable id and stores the raw email as a person property.
- The password gate registers `gate_unlocked: true` as a super-property so
  every later event can be filtered to insiders vs. public visitors.
- First-touch and last-touch UTM + referrer are captured automatically.

## Event reference

Domains: `comms.*`, `sales.*`, `ux.*`, `ui.*`, `mafia.*`, `community.*`, `transmission.*`.

| Event | Trigger | Key properties |
|---|---|---|
| `$pageview` | every SPA route change | `path`, `gate_unlocked` |
| `comms.outbound_link_clicked` | external link clicked | `href`, `host`, `label`, `location`, `surface` |
| `comms.newsletter_subscribed` | Journal subscribe success | `source`, `already` |
| `comms.newsletter_submit_failed` | invalid email or network error | `source`, `reason` |
| `sales.contact_form_viewed` | `/contact` mounted | `page` |
| `sales.contact_form_started` | first character typed | `first_field` |
| `sales.contact_intent_selected` | intent chip toggled | `intent`, `selected`, `intents_count` |
| `sales.contact_form_submitted` | submit success | `intents`, `intents_count`, `has_org`, `message_length` |
| `sales.contact_form_failed` | validation or submit error | `reason`, `fields` or `message` |
| `sales.partners_cta_clicked` | Partners page inquiry submit | `position`, `action` |
| `sales.figma_kit_opened` | `UseInFigma` pill clicked | `href`, `label`, `source` |
| `sales.brand_asset_downloaded` | brand-kit / Brand.md downloads | `asset`, `surface` |
| `ux.gate_viewed` | password gate first render | `path` |
| `ux.gate_submitted` | gate unlocked | `success`, `attempts`, `path` |
| `ux.gate_failed` | wrong password | `attempts`, `path` |
| `ux.404_hit` | NotFound mounted | `from_path`, `referrer` |
| `ui.nav_link_clicked` | SiteNav internal nav | `label`, `to`, `surface` |
| `mafia.started` | `/get-your-mafia-name` opened | — |
| `mafia.intent_clicked` | "Get your mafia name" CTAs across the site | `label`, `surface` |
| `mafia.movie_picked` | film selected | `movie_id`, `movie_title`, `custom` |
| `mafia.topping_picked` | topping selected | `topping` |
| `mafia.names_generated` | generation success | `count`, `movie`, `topping` |
| `mafia.name_regenerated` | re-roll (2nd+ generate) | `attempt`, `movie`, `topping` |
| `mafia.name_claimed` | claim insert success | `name`, `movie`, `topping`, `edited`, `generate_attempts` |
| `mafia.generate_failed` | edge function error | `reason`, `movie`, `topping` |
| `mafia.avatar_started` | avatar generation begins | `mafia_name`, `movie`, `topping`, `redraw` |
| `mafia.avatar_generated` | avatar returned | `mafia_name`, `movie`, `topping`, `latency_ms`, `redraw` |
| `mafia.avatar_failed` | edge function or empty image | `mafia_name`, `movie`, `topping`, `reason` |
| `mafia.avatar_redrawn` | "Re-draw portrait" tapped | `mafia_name`, `movie`, `topping` |
| `mafia.avatar_downloaded` | "Download avatar" tapped | `mafia_name`, `movie`, `topping` |
| `community.build_viewed` | build deep-dive opened | `name`, `index`, `featured` |
| `community.build_embed_opened` | embedded site modal opened (e.g. Arcade, rsv.pizza) | `name`, `url` |
| `community.gallery_opened` | photo gallery lightbox opened | `index`, `source` |
| `community.gallery_navigated` | thumbnail clicked inside lightbox | `from`, `to` |
| `community.calendar_opened` | "View full calendar" tapped | `surface` |
| `transmission.cta_clicked` | hero / closing CTA | `cta`, `position` |
| `transmission.roll_name_clicked` | hero "get your mafia name" | `name` |

All events live in `src/lib/analytics/events.ts` as the `EVT` const — add new
ones there first, then reference them from components.

## Session replay

- Global sample rate: **10%** (set in `config.ts`).
- High-intent routes (`/contact`, `/community`, `/partners`,
  `/get-your-mafia-name`) force-record every session via
  `posthog.startSessionRecording()` after route change.
- All `<input>` and `<textarea>` content is masked (`maskAllInputs: true`).
  Anything tagged `data-ph-mask` is also masked in non-input nodes.

## Dashboards to build in PostHog

Recreate these in the PostHog UI (Insights → New). Names below match the
event reference.

### 1. Acquisition
- Trend of `$pageview` broken down by `properties.$initial_referring_domain`,
  `properties.utm_source`, `properties.$device_type`, `properties.country`.
- Add a filter `gate_unlocked = true` to see insider activity only.

### 2. Pre-launch funnel (the most important one today — 98% of traffic)
Steps:
1. `$pageview` where `path = /pre-launch`
2. `transmission.roll_name_clicked` OR `transmission.cta_clicked`
3. `comms.newsletter_subscribed` (when added on `/pre-launch`)
4. `comms.outbound_link_clicked` with `surface = hero_cta` or `closing_cta`

Goal: turn the 84% bounce into measurable conversion.

### 3. Contact funnel
Steps: `sales.contact_form_viewed` → `sales.contact_form_started` →
`sales.contact_intent_selected` → `sales.contact_form_submitted`.

Breakdown by `device_type` and `last_touch.referrer_host`.

### 4. Partner funnel
Steps: `$pageview /partners` → `sales.partners_cta_clicked` OR
`sales.figma_kit_opened` OR `sales.brand_asset_downloaded` →
`sales.contact_form_submitted` with `intents` containing "Partnership".

### 5. Brand-system engagement
- Top `ui.copy_token` values
- Top `sales.brand_asset_downloaded` values
- `ux.section_viewed` dwell distribution per section

### 6. UX health
- `ux.404_hit` trend grouped by `from_path`
- Autocaptured rage clicks (Insight type: "Lifecycle" or Web analytics)
- Web vitals (Insights → Web Vitals): LCP / CLS / INP by page

### 7. Mafia name funnel
Steps: `mafia.intent_clicked` (any CTA) → `mafia.started` →
`mafia.movie_picked` → `mafia.topping_picked` → `mafia.names_generated` →
`mafia.name_claimed`.

Breakdowns:
- `surface` on `mafia.intent_clicked` (site_nav, community, partners…) to see
  which CTA actually drives the flow now that `/join` is gone
- `topping` to see which toppings drive claim rate
- Distribution of `generate_attempts` on `mafia.name_claimed`

### 7b. Avatar sub-funnel
Steps: `mafia.name_claimed` → `mafia.avatar_started` →
`mafia.avatar_generated` → `mafia.avatar_downloaded`.

- `mafia.avatar_failed` is the drop-off cohort (break down by `reason`).
- `mafia.avatar_redrawn` count per claimed name = how picky users are.
- p50/p95 of `latency_ms` on `mafia.avatar_generated` = edge function health.

### 8. Community engagement (new)
Steps: `$pageview /community` → `community.build_viewed` OR
`community.build_embed_opened` → `community.gallery_opened` →
`community.calendar_opened`.

Breakdowns: `name` on builds, `source` on gallery opens (header vs tile vs
mobile_cta), `surface` on calendar opens.

### 9. Geo / device split
- `$pageview` totals + conversion rate per `country` and `$device_type`.

## Catalog cleanup (May 2026)

- Removed: `sales.join_intent_clicked` (`/join` page no longer exists),
  `comms.share_clicked`, `ui.theme_section_interacted` — never wired.
- Added the mafia avatar events and the entire `community.*` namespace.
- The "Join" CTAs across the site now emit `mafia.intent_clicked`. Rebind
  any saved PostHog insights that referenced `sales.join_intent_clicked`.


## A/B testing (when ready)

PostHog feature flags are enabled. Typical pattern:

```ts
import posthog from "posthog-js";
const variant = posthog.getFeatureFlag("pre-launch-hero");
```

Use this to swap headline copy, CTA labels, or whole section orderings
without redeploying.

## Adding a new event

1. Add the name to `EVT` in `src/lib/analytics/events.ts`.
2. Call `track(EVT.MY_NEW_EVENT, { …props })` from the component.
3. Update the event reference table above.
4. (Optional) Build the dashboard insight in PostHog.
