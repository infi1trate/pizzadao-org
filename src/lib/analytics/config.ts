/**
 * PostHog configuration.
 *
 * PostHog's project API key (phc_…) is a *publishable* client key — safe to
 * ship in the bundle. Two ways to provide it:
 *
 *   1. Add to `.env` (preferred):
 *        VITE_PUBLIC_POSTHOG_KEY=phc_xxx
 *        VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com   (or https://eu.i.posthog.com)
 *
 *   2. Or hardcode below.
 *
 * If neither is set, analytics is a silent no-op — the site still works.
 */

export const POSTHOG_KEY: string =
  (import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined) ??
  "phc_uyECptFtHGgkh2TQojmCGnapnicPg9Q8o7zgSpcNFL8i";

export const POSTHOG_HOST: string =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) ??
  "https://us.i.posthog.com";

/** Routes that get 100% session-replay sampling (the rest get the global rate). */
export const HIGH_INTENT_PATHS = [
  "/contact",
  "/get-your-mafia-name",
  "/partners",
  "/community",
];

/** Global session-replay sampling rate (0–1). High-intent paths always record. */
export const REPLAY_GLOBAL_SAMPLE = 0.1;

/** Force-enable in dev with VITE_PUBLIC_POSTHOG_DEBUG=1 */
export const POSTHOG_DEBUG: boolean =
  (import.meta.env.VITE_PUBLIC_POSTHOG_DEBUG as string | undefined) === "1";
