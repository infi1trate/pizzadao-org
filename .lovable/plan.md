## What's changed since analytics was last updated

1. **`/join` page was removed.** The Join CTA now jumps straight to `/get-your-mafia-name`. `HIGH_INTENT_PATHS` already dropped `/join`, but `docs/analytics.md` and the unused `JOIN_INTENT_CLICKED` event still reference it.
2. **Mafia name flow gained AI avatar generation** (`generate-mafia-avatar` edge function) — currently no events for portrait started / succeeded / failed / re-drawn / downloaded.
3. **Community page** ships interactive surfaces with zero tracking: builds carousel, embedded site viewer (rsv.pizza etc.), photo gallery lightbox, calendar opener, easter-egg "secret pineapple" card.
4. **Brand System page** has many outbound links (Figma, Google Fonts, GitHub brand-kit, Telegram) and no `useTrackOutbound` calls — even though `FIGMA_OPENED` / `BRAND_ASSET_DOWNLOADED` events are already defined.
5. **SiteNav** outbound to `app.pizzadao.org` is untracked; `NAV_CLICKED` is defined but unused.
6. **Partners page** never fires `PARTNERS_CTA_CLICKED` even though the docs' "Partner funnel" depends on it.

## Plan

### 1. Event catalog (`src/lib/analytics/events.ts`)

Add:
- `MAFIA_AVATAR_STARTED` = `mafia.avatar_started`
- `MAFIA_AVATAR_GENERATED` = `mafia.avatar_generated` (props: `latency_ms`, `attempt`)
- `MAFIA_AVATAR_FAILED` = `mafia.avatar_failed` (props: `reason`)
- `MAFIA_AVATAR_REDRAW` = `mafia.avatar_redrawn` (props: `attempt`)
- `MAFIA_AVATAR_DOWNLOADED` = `mafia.avatar_downloaded`
- `COMMUNITY_BUILD_VIEWED` = `community.build_viewed` (props: `name`, `index`, `featured`)
- `COMMUNITY_BUILD_EMBED_OPENED` = `community.build_embed_opened` (props: `name`, `url`)
- `COMMUNITY_GALLERY_OPENED` = `community.gallery_opened` (props: `index`, `source`)
- `COMMUNITY_GALLERY_NAVIGATED` = `community.gallery_navigated` (props: `from`, `to`)
- `COMMUNITY_CALENDAR_OPENED` = `community.calendar_opened` (props: `surface`)
- `COMMUNITY_EASTER_EGG` = `community.easter_egg_clicked` (props: `id: "secret_pineapple"`)

Rename / repurpose:
- `JOIN_INTENT_CLICKED` (`sales.join_intent_clicked`) → `MAFIA_INTENT_CLICKED` (`mafia.intent_clicked`) for "Get your mafia name" CTAs scattered across About / Community / Partners / Home, since that is now the join surface.

Remove (truly unused, not on any dashboard):
- `THEME_INTERACTED`, `SHARE_CLICKED` — keep only if we plan to use them; otherwise drop to keep the catalog honest.

### 2. Instrument the new surfaces

- **`src/pages/MafiaNamePage.tsx`** — wrap the `supabase.functions.invoke("generate-mafia-avatar", …)` call: fire `MAFIA_AVATAR_STARTED` before, `MAFIA_AVATAR_GENERATED` on success (with `performance.now()` delta), `MAFIA_AVATAR_FAILED` on error. Fire `MAFIA_AVATAR_REDRAW` from the "Re-draw portrait" button and `MAFIA_AVATAR_DOWNLOADED` from the Download avatar button. Include `mafia_name`, `movie`, `topping` in props for funnel breakdowns.
- **`src/pages/CommunityPage.tsx`** — fire `COMMUNITY_BUILD_VIEWED` from `setActiveBuild`, `COMMUNITY_BUILD_EMBED_OPENED` from `setEmbedSite`, `COMMUNITY_GALLERY_OPENED` from `openAt`, `COMMUNITY_GALLERY_NAVIGATED` from `setGalleryIndex`, `COMMUNITY_CALENDAR_OPENED` from `onOpenCalendar` (pass `surface: "hero" | "footer"` based on which CTA fires), and `COMMUNITY_EASTER_EGG` if the secret-pineapple card is clickable.
- **`src/pages/BrandSystemPage.tsx`** — pull in `useTrackOutbound("brand_system")` and attach `onClick={trackOutbound(label, href, { kind })}` to the brand-kit, GitHub, Figma, Google Fonts, and Telegram anchors. Also call `track(EVT.FIGMA_OPENED, { source })` from each `UseInFigma` instance and `track(EVT.BRAND_ASSET_DOWNLOADED, { asset })` from the molto-benny / logo download links.
- **`src/components/SiteNav.tsx`** — `useTrackOutbound("site_nav")` on the `app.pizzadao.org` anchor; fire `NAV_CLICKED` with `{ label, to }` on the internal nav `<Link>`s for top-of-funnel navigation insight.
- **`src/pages/PartnersPage.tsx`** — fire `PARTNERS_CTA_CLICKED` from the primary CTAs (the "Become a partner" / "Talk to us" buttons) with `{ position }`.

### 3. Session replay & high-intent paths (`src/lib/analytics/config.ts`)

- Confirmed `/join` is already gone from `HIGH_INTENT_PATHS`.
- Add `/community` so we record the new interactive surface for the first wave of users (it's where embeds, gallery, and calendar live). Keep `/contact`, `/get-your-mafia-name`, `/partners`.

### 4. Docs (`docs/analytics.md`)

- Drop the `/join` reference in the "Session replay" section; add `/community`.
- Replace the row for `sales.join_intent_clicked` with `mafia.intent_clicked` and explain where it fires.
- Add rows for every new mafia avatar + community event.
- Add a new "Community engagement" dashboard recipe (build views → embed opens → gallery opens → calendar opens) and an "Avatar funnel" sub-step under the existing Mafia funnel: `mafia.names_generated → mafia.avatar_started → mafia.avatar_generated → mafia.avatar_downloaded`, with `mafia.avatar_failed` as the drop-off cohort.
- Update the Brand-system engagement dashboard with the now-wired `sales.figma_kit_opened` and `sales.brand_asset_downloaded`.
- Note the catalog cleanup (renames / removals) so anyone with an old PostHog insight knows to rebind.

### Out of scope

- No changes to the PostHog SDK config beyond `HIGH_INTENT_PATHS`.
- No changes to identity / attribution logic.
- No changes to copy or layout — purely instrumentation.

### Files touched

- `src/lib/analytics/events.ts`
- `src/lib/analytics/config.ts`
- `src/pages/MafiaNamePage.tsx`
- `src/pages/CommunityPage.tsx`
- `src/pages/BrandSystemPage.tsx`
- `src/pages/PartnersPage.tsx`
- `src/components/SiteNav.tsx`
- `docs/analytics.md`
