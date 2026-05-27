export type MissionStatus = "open" | "pending" | "approved";

export type Mission = {
  id: string;
  title: string;
  description: string;
  // What we ask the member to submit as evidence (kept short).
  evidencePrompt: string;
};

export type Level = {
  n: number;
  name: string;
  reward: number; // $PEP granted on level completion
  // 1–3 missions per level. All must be approved to advance.
  missions: Mission[];
};

/**
 * The Path — Lv.1 → Lv.10.
 * Names extend the established ladder; member-facing copy only (no admin lore).
 */
export const LEVELS: Level[] = [
  {
    n: 1,
    name: "Pizza Trainee",
    reward: 69,
    missions: [
      {
        id: "l1-intro",
        title: "Introduce yourself",
        description:
          "Drop a one-line hello in #intros. Tell us your city and your slice.",
        evidencePrompt: "Paste the link to your intro message.",
      },
    ],
  },
  {
    n: 2,
    name: "Pizza Noob",
    reward: 420,
    missions: [
      {
        id: "l2-show",
        title: "Share something you made",
        description:
          "A sketch, a tweet, a slice of code. Anything you're proud of.",
        evidencePrompt: "Link to the post or file.",
      },
      {
        id: "l2-react",
        title: "React to three crew posts",
        description: "Show up for someone else's work.",
        evidencePrompt: "Tell us whose work you backed.",
      },
    ],
  },
  {
    n: 3,
    name: "Slice Hustler",
    reward: 1337,
    missions: [
      {
        id: "l3-call",
        title: "Show up to a crew call",
        description: "Any crew, any call. Audio on is bonus, not required.",
        evidencePrompt: "Which call did you join?",
      },
    ],
  },
  {
    n: 4,
    name: "Sauce Boss",
    reward: 3141,
    missions: [
      {
        id: "l4-bounty",
        title: "Finish a bounty",
        description: "Pick one from the board. Doesn't matter how small.",
        evidencePrompt: "Link to your delivered work.",
      },
    ],
  },
  {
    n: 5,
    name: "Cheese Capo",
    reward: 4269,
    missions: [
      {
        id: "l5-party",
        title: "Help a party",
        description:
          "Pitch in on a Global Pizza Party — design, host, sponsor, anything.",
        evidencePrompt: "Which city? What did you do?",
      },
    ],
  },
  {
    n: 6,
    name: "Street Muscle",
    reward: 6942,
    missions: [
      {
        id: "l6-recruit",
        title: "Bring someone in",
        description: "A friend, a follower, a stranger with good taste.",
        evidencePrompt: "Who joined because of you?",
      },
      {
        id: "l6-three-bounties",
        title: "Finish three bounties",
        description: "Range matters. Try something outside your crew.",
        evidencePrompt: "List the bounties.",
      },
    ],
  },
  {
    n: 7,
    name: "Made Mafia",
    reward: 31415,
    missions: [
      {
        id: "l7-lead",
        title: "Lead a crew call",
        description: "Run the agenda. Hold the room. Pass the mic.",
        evidencePrompt: "Which call did you lead?",
      },
    ],
  },
  {
    n: 8,
    name: "Underboss",
    reward: 69420,
    missions: [
      {
        id: "l8-host",
        title: "Host a Global Pizza Party",
        description: "Your city. Your call. We've got your back.",
        evidencePrompt: "City and date.",
      },
    ],
  },
  {
    n: 9,
    name: "Consigliere",
    reward: 100000,
    missions: [
      {
        id: "l9-mentor",
        title: "Mentor three new members through onboarding",
        description: "Walk them from trainee to made.",
        evidencePrompt: "Who did you bring up?",
      },
    ],
  },
  {
    n: 10,
    name: "Don of Dough",
    reward: 250000,
    missions: [
      {
        id: "l10-legacy",
        title: "Ship something the family will remember",
        description:
          "A film, a feast, a city-wide moment. You'll know it when it's right.",
        evidencePrompt: "Tell us what you built.",
      },
    ],
  },
];
