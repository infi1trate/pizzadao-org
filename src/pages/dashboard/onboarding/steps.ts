export type StepId =
  | "claim-name"
  | "join-family"
  | "find-crew"
  | "get-vouched"
  | "first-slice";

export type OnboardingStep = {
  id: StepId;
  title: string;
  // What we ask them to do, in one breath.
  prompt: string;
  // The single action label on the active step (kept short, no wrapping).
  cta: string;
  // One line of lore that arrives only after completion.
  lore: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "claim-name",
    title: "Claim your name",
    prompt: "Confirm your Mafia name, pick your city, choose a Benny.",
    cta: "Claim it",
    lore: "Your name is how the family knows you. Wear it well.",
  },
  {
    id: "join-family",
    title: "Join the family",
    prompt: "Hop into Discord. We'll hand you a seat at the table.",
    cta: "Open Discord",
    lore: "Discord is the kitchen. Most of the cooking happens there.",
  },
  {
    id: "find-crew",
    title: "Find your crew",
    prompt: "Pick at least one crew: Design, Art, Creative, Tech, more.",
    cta: "Pick a crew",
    lore: "Your crew is your people inside the family.",
  },
  {
    id: "get-vouched",
    title: "Get vouched",
    prompt: "Connect X so the community can vouch for you.",
    cta: "Connect X",
    lore: "A vouch from one of us is worth more than any badge.",
  },
  {
    id: "first-slice",
    title: "Earn your first slice",
    prompt: "Follow @RarePizzas and @Pizza_DAO, or say hi on a call.",
    cta: "I did it",
    lore: "You're made. The rest of the family is waiting on the other side.",
  },
];
