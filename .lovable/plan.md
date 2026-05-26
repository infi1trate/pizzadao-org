## Remove /pizza-party-sliced page

Delete the entire Pizza Party Sliced recap page and its related components.

### Files to delete
- `src/pages/PizzaPartySliced.tsx`
- `src/components/sliced/AwardsSection.tsx`
- `src/components/sliced/BonusGameRecap.tsx`
- `src/components/sliced/HeroSection.tsx`
- `src/components/sliced/LocalSlice.tsx`
- `src/components/sliced/MetricsReveal.tsx`
- `src/components/sliced/PartnerImpact.tsx`
- `src/components/sliced/PhotoWall.tsx`
- `src/components/sliced/ShareGenerator.tsx`
- `src/components/sliced/SignalMap.tsx`
- `src/components/sliced/data.ts`
- `src/components/sliced/useReveal.ts`

### Files to edit
- `src/App.tsx` — remove `import PizzaPartySliced` and the `/pizza-party-sliced` route

### Verification
- Confirm no other references to `pizza-party-sliced` exist in the codebase
- Build passes after removal