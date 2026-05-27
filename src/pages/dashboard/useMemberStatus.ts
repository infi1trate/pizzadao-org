import type { MemberStatus } from "./StatusStrip";

/**
 * Placeholder member-status hook.
 * Returns `null` until the "You're made" moment has fired — at which point the
 * status strip and the rest of the returning-member dashboard surface.
 *
 * PEP balance is read from `pd-pep`, which the celebration step seeds with the
 * one-time welcome bonus (69 $PEP). Wire to real member data once auth lands.
 */
export const useMemberStatus = (): MemberStatus | null => {
  if (typeof window === "undefined") return null;
  const made = localStorage.getItem("pd-made") === "1";
  if (!made) return null;

  const pep = Number(localStorage.getItem("pd-pep") ?? "0") || 0;

  return {
    level: 1,
    levelLabel: "Pizza Trainee",
    xp: 0,
    xpToNext: 400,
    pep,
    streakDays: 1,
  };
};
