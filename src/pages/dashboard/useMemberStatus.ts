import type { MemberStatus } from "./StatusStrip";

/**
 * Placeholder member-status hook.
 * Returns `null` for brand-new members who have NOT completed the "You're made"
 * onboarding — the status strip stays hidden until then.
 *
 * Wire this to real member data once auth/onboarding lands. For now we read a
 * single localStorage flag so the strip can be previewed in dev.
 *   localStorage.setItem("pd-made", "1")  → show strip
 *   localStorage.removeItem("pd-made")    → hide strip (pre-onboarding)
 */
export const useMemberStatus = (): MemberStatus | null => {
  const made =
    typeof window !== "undefined" && localStorage.getItem("pd-made") === "1";
  if (!made) return null;

  return {
    level: 1,
    levelLabel: "Pizza Trainee",
    xp: 120,
    xpToNext: 400,
    pep: 47593,
    streakDays: 4,
  };
};
