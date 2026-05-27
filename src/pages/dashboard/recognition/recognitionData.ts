/**
 * Recognition data — /dashboard/recognition.
 *
 * Combines existing family roster (vouches given/received) with
 * placeholder achievement + "wall of made" data. Swap CURRENT_MEMBER_ID
 * and getRecentlyMade() for real backend reads when available.
 */

import { getMember, getMembers, type Member } from "../family/familyData";

/** Treat Mira Mortadella as the signed-in member for placeholders. */
export const CURRENT_MEMBER_ID = "m-mira";

export const getCurrentMember = (): Member | undefined =>
  getMember(CURRENT_MEMBER_ID);

export interface VouchEntry {
  member: Member;
  date: string; // ISO
  note?: string;
}

const NOTES_FROM: Record<string, string> = {
  "m-don-pizza-czech":
    "Mira ran the Mexico City poster series solo. The family is louder because of her.",
  "m-ivy": "Best collaborator I've had on a recap. Generous with credit.",
  "m-theo": "She shows up. Every Creative call, every time.",
};
const NOTES_TO: Record<string, string> = {
  "m-naveen": "First week and already shipping. Watch this one.",
  "m-pepperoni": "Lagos thread was a masterclass. Made.",
};

const daysAgo = (n: number) =>
  new Date(Date.now() - n * 86_400_000).toISOString();

export function getVouchesReceived(): VouchEntry[] {
  const me = getCurrentMember();
  if (!me) return [];
  return me.vouchedBy
    .map((id, i) => {
      const m = getMember(id);
      if (!m) return null;
      return {
        member: m,
        date: daysAgo(14 + i * 11),
        note: NOTES_FROM[id],
      } satisfies VouchEntry;
    })
    .filter(Boolean) as VouchEntry[];
}

export function getVouchesGiven(): VouchEntry[] {
  const me = getCurrentMember();
  if (!me) return [];
  return me.vouchedGiven
    .map((id, i) => {
      const m = getMember(id);
      if (!m) return null;
      return {
        member: m,
        date: daysAgo(6 + i * 9),
        note: NOTES_TO[id],
      } satisfies VouchEntry;
    })
    .filter(Boolean) as VouchEntry[];
}

// ---------------------------------------------------------------------------
// Achievements

export interface Badge {
  id: string;
  label: string;
  emoji: string;
  earnedAt: string; // ISO
  story: string;
  rare?: boolean;
}

const ME_BADGES: Badge[] = [
  {
    id: "b-made",
    label: "Made Mafia",
    emoji: "🍕",
    earnedAt: daysAgo(118),
    story:
      "Hit Level 7 after the Mexico City poster series shipped. Three Capos vouched within the hour.",
    rare: true,
  },
  {
    id: "b-capo",
    label: "Capo di Crust",
    emoji: "⭐",
    earnedAt: daysAgo(42),
    story: "Reached Level 6 — running the Creative crew weekly.",
  },
  {
    id: "b-bpd24",
    label: "Bitcoin Pizza Day 2024",
    emoji: "🪩",
    earnedAt: daysAgo(360),
    story:
      "Co-hosted the Mexico City BPD party — 142 slices served, three new members made on the spot.",
    rare: true,
  },
  {
    id: "b-poster",
    label: "Poster Series",
    emoji: "🖼️",
    earnedAt: daysAgo(60),
    story:
      "Designed and shipped the Mexico City poster series. Now the template used by 6 other cities.",
  },
  {
    id: "b-first-bounty",
    label: "First Bounty",
    emoji: "🎯",
    earnedAt: daysAgo(180),
    story: "Claimed and shipped your first paid bounty. The flywheel started here.",
  },
  {
    id: "b-streak-30",
    label: "30-Day Streak",
    emoji: "🔥",
    earnedAt: daysAgo(75),
    story: "Showed up in the Family Cooking feed every day for a month straight.",
  },
  {
    id: "b-vouched-3",
    label: "Vouched 3 Members",
    emoji: "🤝",
    earnedAt: daysAgo(28),
    story: "Vouched for three members. Naveen, Pepperoni, and one more on the way.",
  },
  {
    id: "b-show-tell",
    label: "Show & Tell Hero",
    emoji: "📣",
    earnedAt: daysAgo(12),
    story: "Top-reacted post in #show-and-tell — Riso print mockup. The family loved it.",
  },
];

export const getBadges = (): Badge[] => ME_BADGES;

// ---------------------------------------------------------------------------
// Wall of Made — members who recently hit Level 7

export interface MadeEntry {
  member: Member;
  madeAt: string; // ISO
  vouchedBy: Member[];
}

export function getWallOfMade(): MadeEntry[] {
  const all = getMembers();
  // Hand-curated: pick members at Made-or-above + synthesize for warmth.
  const candidates = [
    "m-burrata",
    "m-pineapple",
    "m-ivy",
    "m-theo",
    "m-mira",
    "m-don-pizza-czech",
    "m-anchovy",
  ];
  return candidates
    .map((id, i) => {
      const m = all.find((x) => x.id === id);
      if (!m) return null;
      const vouchedBy = m.vouchedBy
        .slice(0, 3)
        .map((vid) => all.find((x) => x.id === vid))
        .filter(Boolean) as Member[];
      return {
        member: m,
        madeAt: daysAgo(2 + i * 5),
        vouchedBy,
      } satisfies MadeEntry;
    })
    .filter(Boolean) as MadeEntry[];
}

export function formatVouchDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
