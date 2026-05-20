
# PostHog tracking plan for pizzadao.org

## Goal

Instrument the site so you can answer four kinds of questions:

1. **Comms** — which channels, copy, and pages drive engaged visitors?
2. **Sales / partnerships** — who is filling the contact and partner forms, and where do they come from?
3. **UX** — where do visitors drop off, scroll-bounce, or get stuck behind the password gate?
4. **UI** — which CTAs, sections, and components are actually used vs. ignored?

Right now ~98% of traffic lands on `/pre-launch` and bounces at ~84%. PostHog will give you the *why*.

---

## 1. Setup (what gets installed)

### Package

- `posthog-js` (client-side SDK; works with React/Vite SPA).

### Configuration

PostHog's **project API key** (`phc_…`) is a *publishable* key — safe to ship in the bundle. We will read it from:

- `VITE_PUBLIC_POSTHOG_KEY`
- `VITE_PUBLIC_POSTHOG_HOST` (defaults to `https://us.i.posthog.com`, or `https://eu.i.posthog.com` for EU)

You will paste these into Lovable's secrets so they're injected as runtime env vars. No backend / edge function needed.

### Files added

```
src/lib/analytics/
  posthog.ts          // init + typed wrapper (track, identify, reset)
  events.ts           // single source of truth for event names + payload types
  PostHogProvider.tsx // mounts SDK, captures SPA pageviews + leave events
  usePageView.ts      // hook for manual page-view augmentation
  useTrack.ts         // typed helper for components
```

### Wiring

- `App.tsx` wraps `<BrowserRouter>` in `<PostHogProvider>` so route changes fire `$pageview` / `$pageleave` with normalized path, referrer, UTM, and a `section` tag.
- Disabled automatically in dev unless `VITE_PUBLIC_POSTHOG_DEBUG=1`.
- `Do Not Track` and EU visitors get cookieless mode (`persistence: 'memory'`) until consent — keeps the site privacy-friendly without a banner.

### Built-in PostHog features enabled

- **Autocapture** — every click/input on tagged elements, no code per button.
- **Session replay** — sampled 10% globally, 100% on `/contact`, `/join`, `/partners`, `/get-your-mafia-name` (high-intent flows). Masks all form inputs by default; email fields explicitly masked.
- **Heatmaps + scroll depth** — on for all pages.
- **Web vitals** (LCP, CLS, INP) — on, so UI regressions show up next to behaviour.
- **Surveys + feature flags** — enabled so you can A/B test copy without redeploys.

---

## 2. Identity model

The site has no auth, but we still want stable identity:

- **Anonymous visitor** → `distinct_id` from PostHog cookie.
- **After contact / join / mafia-name submit** → `posthog.identify(email_or_handle_hash, { email, name, organization, intents, source_page })`. We hash email client-side (SHA-256) for the distinct_id so PII isn't the primary key, but keep `email` as a person property for lookups.
- **Password gate unlock** → `posthog.register({ gate_unlocked: true })` so all later events are filterable by gated vs. public.
- **UTM + referrer** captured as super-properties on first touch and as last-touch on every session.

---

## 3. Event taxonomy

All event names live in `src/lib/analytics/events.ts` as a typed enum. Naming convention: `domain.object_action` (lowercase, snake-ish).

### 3.1 Comms & acquisition

| Event | Properties | Why |
|---|---|---|
| `$pageview` (auto) | path, title, referrer, utm_*, gate_unlocked | Baseline traffic |
| `comms.outbound_link_clicked` | href, host, location (nav/footer/body), label | See which off-site links pull weight (luma, github, telegram, discord) |
| `comms.share_clicked` | network, page | Track if/where social shares happen |
| `comms.newsletter_subscribed` | source (`journal`, `footer`, `transmission`), email_hash | Conversion from each surface |
| `comms.newsletter_submit_failed` | source, reason | Form friction |

### 3.2 Sales & partnerships

| Event | Properties | Why |
|---|---|---|
| `sales.contact_form_viewed` | page | Funnel top |
| `sales.contact_form_started` | first_field | Engagement |
| `sales.contact_intent_selected` | intent, intents_count | Which partnership types resonate |
| `sales.contact_form_submitted` | intents[], has_org, message_length | Conversion |
| `sales.contact_form_failed` | reason | Bug / validation drop-off |
| `sales.partners_cta_clicked` | cta_label, position | Which partner CTAs work |
| `sales.join_intent_clicked` | role (chapter_host, sponsor, etc.) | Join funnel split |
| `sales.figma_kit_opened` | asset | Designer/brand pull-through |
| `sales.brand_asset_downloaded` | asset_id, format (png/svg/ai/pdf) | Brand-system value |

### 3.3 UX & funnel

| Event | Properties | Why |
|---|---|---|
| `ux.gate_viewed` | path | How many hit the password wall |
| `ux.gate_submitted` | success | Conversion of insiders |
| `ux.gate_failed` | attempts | Friction / wrong-link guard |
| `ux.scroll_depth` | path, percent (25/50/75/100) | Where people stop reading |
| `ux.section_viewed` | section_id, page, dwell_ms | Real engagement per section (IntersectionObserver, ≥50% visible, ≥1s) |
| `ux.section_dwell` | section_id, dwell_ms | Time per section on long pages (brand system) |
| `ux.video_played` / `ux.video_completed` | src, duration | MomentReel & hero media |
| `ux.cta_viewed` | cta_id, page | CTA visibility vs. clicks |
| `ux.cta_clicked` | cta_id, page, position | Click-through |
| `ux.404_hit` | from_path | Broken-link discovery |
| `ux.rage_click` (auto) | element | Frustration signal |
| `ux.dead_click` (auto) | element | Element looks clickable but isn't |

### 3.4 UI & component-level

Used to decide what to redesign:

| Event | Properties |
|---|---|
| `ui.nav_link_clicked` | label, surface (top/footer/section) |
| `ui.tab_changed` | component (voice/typography/etc.), tab_value |
| `ui.accordion_toggled` | component, item, open |
| `ui.copy_token` | token, palette (color hex copy) |
| `ui.figma_link_opened` | section |
| `ui.theme_section_interacted` | section_id, action |
| `ui.mafia_name_generated` | topping, movie_id |
| `ui.mafia_name_claimed` | name, has_handle |

### 3.5 Page-specific funnels

- **`/pre-launch`** — `transmission.viewed`, `transmission.cta_clicked` (per CTA), `transmission.newsletter_submitted`, `transmission.scroll_to_bottom`.
- **`/get-your-mafia-name`** — `mafia.started`, `mafia.topping_picked`, `mafia.movie_picked`, `mafia.name_regenerated`, `mafia.name_claimed`, `mafia.share_clicked`.
- **`/contact`** — full funnel above.
- **`/brand-system`** — section dwell + downloads + figma opens. This is where you'll learn what designers actually use.

---

## 4. Dashboards you'll get day-one (configured in PostHog UI, not in code)

I'll document these in a `docs/analytics.md` so you can recreate them or hand to a teammate:

1. **Acquisition** — pageviews by source / UTM / country / device, split by `gate_unlocked`.
2. **Pre-launch funnel** — `$pageview /pre-launch` → scroll 50% → CTA click → newsletter submit. Today this is the #1 page; we need its real conversion rate.
3. **Contact funnel** — viewed → started → intent_selected → submitted, with drop-off and median time per step.
4. **Partner funnel** — partners page view → figma_kit_opened / brand_asset_downloaded / contact_form_submitted with intent=partnership.
5. **Brand system engagement** — section dwell heatmap, top asset downloads, copy_token leaders.
6. **UX health** — bounce by page, rage clicks, dead clicks, 404s, web vitals trend.
7. **Mafia name funnel** — started → claimed, with regeneration count distribution.
8. **Geo / device breakdown** — desktop vs mobile conversion gap (currently 526 vs 419 visits, conversion unknown).

---

## 5. Privacy & compliance

- All form inputs masked in session replay (`data-ph-no-capture` on PII fields, `maskAllInputs: true`).
- Email used as person property only after explicit submit; otherwise hashed.
- IP geo kept, raw IP discarded (PostHog setting).
- Honors `navigator.doNotTrack`.
- Legal pages (`/privacy`, `/terms`) already exist — I'll add a one-line analytics disclosure to `/privacy`.

---

## 6. What I need from you before building

1. **PostHog project API key** (`phc_…`) and region (US or EU cloud). I'll request it via the secrets tool as `VITE_PUBLIC_POSTHOG_KEY` and `VITE_PUBLIC_POSTHOG_HOST` once you approve this plan.
2. Confirm session-replay sampling rate (default proposed: 10% global, 100% high-intent).
3. Confirm you want surveys + feature flags enabled (no extra cost on free tier; lets us A/B test pre-launch copy).

---

## 7. Out of scope (for this pass)

- Server-side event capture from Supabase edge functions (can add later for form submits we want guaranteed even if the browser drops).
- Reverse ETL to a warehouse.
- Cookie consent banner (current setup is cookieless until identify; we can add a banner if you want full cookie mode for cross-session stitching).

---

## 8. Technical implementation summary

```text
1. bun add posthog-js
2. Add VITE_PUBLIC_POSTHOG_KEY + VITE_PUBLIC_POSTHOG_HOST via secrets tool
3. Create src/lib/analytics/{posthog.ts, events.ts, PostHogProvider.tsx, useTrack.ts}
4. Wrap App in <PostHogProvider> inside BrowserRouter so useLocation works
5. Add SPA pageview listener (router location change → posthog.capture('$pageview'))
6. Add IntersectionObserver-based section_viewed hook, used on long pages
7. Instrument:
   - PasswordGate (gate events + register gate_unlocked)
   - ContactPage form (funnel events + identify on submit)
   - JoinPage / PartnersPage CTAs
   - MafiaNamePage flow
   - BrandSystemPage downloads, figma opens, copy_token, tabs
   - Footer + nav outbound links
   - Newsletter forms (Journal, Footer, Transmission)
8. Update /privacy with analytics disclosure
9. Write docs/analytics.md (event reference + dashboard recipes)
```

No database migrations, no edge functions — purely frontend. After implementation we'll smoke-test in the PostHog Live Events view.
