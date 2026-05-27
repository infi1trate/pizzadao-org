Add a developer-friendly reset button at the bottom of `/dashboard` that clears all local onboarding, path, and demo state and reloads the page.

## Scope

1. **New component:** `src/pages/dashboard/NukeAccount.tsx`
   - Collects every dashboard `localStorage` key (`pd-onboarding-v1`, `pd-celebrated`, `pd-welcome-bonus`, `pd-made`, `pd-pep`, `pd-path-v1`, `pd-next-move-demo`).
   - One-click confirmation → clears keys → `window.location.reload()`.
   - Styled very quietly: small pill, muted ink, border, no shadow. Bottom-center of the page. Must not compete with the primary action hierarchy.

2. **Integrate into `DashboardHome.tsx`**
   - Render `<NukeAccount />` at the bottom of the **new-member state** (after `MakingMemberCard`) and the **returning-member state** (after `<Destinations />`).
   - Skip the one-time celebration state.

## Files changed
- `src/pages/dashboard/NukeAccount.tsx` (new)
- `src/pages/dashboard/DashboardHome.tsx` (add `<NukeAccount />` in two places)