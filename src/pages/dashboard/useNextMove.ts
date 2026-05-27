import { ONBOARDING_STEPS } from "./onboarding/steps";

/**
 * Smart "Do this next" picker.
 *
 * Fixed priority order (first match wins):
 *   1. Live or imminent (≤2h) event/crew call the member is signed up for
 *   2. Any incomplete onboarding step  (edge case for returning users)
 *   3. The last mission needed to reach the next level
 *   4. A fresh unclaimed bounty matching one of the member's crews
 *   5. Fallback — warm Benny nudge
 *
 * Backing data sources don't exist yet; this hook reads from a single dev
 * scratchpad in localStorage so we can preview each state:
 *
 *   localStorage.setItem("pd-next-move-demo", "event"   | "onboarding" |
 *                                              "mission" | "bounty"     | "nudge")
 *
 * Swap each branch for real data fetches when the underlying systems land.
 */

export type NextMoveKind =
  | "event"
  | "onboarding"
  | "mission"
  | "bounty"
  | "nudge";

export type NextMove = {
  kind: NextMoveKind;
  eyebrow: string;       // tiny editorial label (≤11px, may be uppercase)
  title: string;         // sentence-case headline
  body?: string;         // optional one-liner under the headline
  cta: string;           // single primary action
  href: string;          // route or external link
  // Optional reward chip (e.g. "1,337 $PEP")
  reward?: { amount: number; unit: "$PEP" };
  // Benny reaction tone — drives the mascot's expression.
  bennyMood: "curious" | "hyped" | "warm" | "wink";
  // Live signal — surfaces tomato only when truly time-sensitive.
  live?: boolean;
};

const formatPep = (n: number) => n.toLocaleString("en-US");

export const useNextMove = (): NextMove => {
  const demo =
    typeof window !== "undefined"
      ? (localStorage.getItem("pd-next-move-demo") as NextMoveKind | null)
      : null;

  // 1. LIVE / IMMINENT EVENT — highest priority, time pressure earns the tomato.
  if (demo === "event") {
    return {
      kind: "event",
      eyebrow: "§ Starting soon",
      title: "Creative crew call starts in 90 min.",
      body: "Show up, say hi, leave with a name to know.",
      cta: "Jump in",
      href: "/dashboard/events",
      bennyMood: "hyped",
      live: true,
    };
  }

  // 2. UNFINISHED ONBOARDING — rare for returning members, but possible.
  if (demo === "onboarding") {
    const step = ONBOARDING_STEPS[2]; // pretend "find your crew" is open
    return {
      kind: "onboarding",
      eyebrow: "§ Finish what you started",
      title: step.title + ".",
      body: step.prompt,
      cta: step.cta,
      href: "/dashboard",
      bennyMood: "warm",
    };
  }

  // 3. MISSION TO NEXT LEVEL.
  if (demo === "mission") {
    return {
      kind: "mission",
      eyebrow: "§ One left",
      title: "One mission left to hit Level 3.",
      body: "Drop a piece of work in #show-and-tell.",
      cta: "Finish it",
      href: "/dashboard/path",
      reward: { amount: 1337, unit: "$PEP" },
      bennyMood: "curious",
    };
  }

  // 4. FRESH BOUNTY FOR ONE OF THE MEMBER'S CREWS.
  if (demo === "bounty") {
    return {
      kind: "bounty",
      eyebrow: "§ New for your crew",
      title: "New Design bounty just dropped.",
      body: "Poster for the Mexico City party. Closes Friday.",
      cta: "Claim it",
      href: "/dashboard/bounties",
      reward: { amount: 50, unit: "$PEP" },
      bennyMood: "hyped",
    };
  }

  // 5. FALLBACK — warm Benny nudge. Default state, no $PEP, no urgency.
  return {
    kind: "nudge",
    eyebrow: "§ A note from Benny",
    title: "Quiet day in the family.",
    body: "Say hi in #show-and-tell? Someone's always cooking.",
    cta: "Open Discord",
    href: "https://discord.gg/pizzadao",
    bennyMood: "wink",
  };
};

export const formatReward = (r: NonNullable<NextMove["reward"]>) =>
  `${formatPep(r.amount)} ${r.unit}`;
