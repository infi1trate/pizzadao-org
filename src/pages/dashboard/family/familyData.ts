/**
 * Family directory data — /dashboard/family.
 *
 * Placeholder member roster. Structure matches what we'll eventually
 * read from the `members` table + their vouches + achievements. Swap
 * `getMembers()` for a real fetch when the backend lands.
 *
 * Levels are the same 10-step path used by /dashboard/path. Crews
 * mirror the existing crew set (Design, Art, Creative, Tech, Events,
 * Comms, Bizdev).
 */

export const CREWS = [
  "Design",
  "Art",
  "Creative",
  "Tech",
  "Events",
  "Comms",
  "Bizdev",
] as const;
export type Crew = (typeof CREWS)[number];

export const LEVELS = [
  "Pizza Trainee",
  "Noob",
  "Hustler",
  "Sauce Boss",
  "Capo di Crust",
  "Street Muscle",
  "Made",
  "Underboss",
  "Consigliere",
  "Don of Dough",
] as const;
export type Level = (typeof LEVELS)[number];

export interface Achievement {
  id: string;
  label: string;     // "Hosted Lagos meetup"
  emoji: string;
}

export interface Vouch {
  fromMemberId: string;
  ts: string;        // ISO
}

export interface ActivityItem {
  id: string;
  text: string;
  whenAgo: string;
}

export interface Member {
  id: string;
  mafiaName: string;
  avatarEmoji: string;     // Benny variant placeholder
  city: string;
  joinedAt: string;        // ISO
  level: Level;
  crews: Crew[];
  vouchedBy: string[];     // member ids
  vouchedGiven: string[];  // member ids
  achievements: Achievement[];
  recent: ActivityItem[];
  lastActiveAt: string;    // ISO
}

const a = (d: number) => new Date(Date.now() - d * 86_400_000).toISOString();

const MEMBERS: Member[] = [
  {
    id: "m-don-pizza-czech",
    mafiaName: "Don Pizza Czech",
    avatarEmoji: "🍕",
    city: "Prague",
    joinedAt: a(820),
    level: "Don of Dough",
    crews: ["Events", "Bizdev"],
    vouchedBy: ["m-mira", "m-naveen", "m-ivy", "m-theo", "m-burrata", "m-anchovy"],
    vouchedGiven: ["m-cheese-lucas", "m-turkey", "m-pepperoni"],
    achievements: [
      { id: "a1", label: "Hosted 12 city meetups", emoji: "🌍" },
      { id: "a2", label: "Bitcoin Pizza Day 2024 host", emoji: "🪩" },
      { id: "a3", label: "Founding member", emoji: "🏛️" },
    ],
    recent: [
      { id: "r1", text: "Vouched for Cheese Lucas",            whenAgo: "2m" },
      { id: "r2", text: "Hosted Prague slice night (78 going)", whenAgo: "2d" },
    ],
    lastActiveAt: a(0.01),
  },
  {
    id: "m-mira",
    mafiaName: "Mira Mortadella",
    avatarEmoji: "🎨",
    city: "Mexico City",
    joinedAt: a(220),
    level: "Capo di Crust",
    crews: ["Creative", "Design", "Art"],
    vouchedBy: ["m-don-pizza-czech", "m-ivy", "m-theo", "m-burrata"],
    vouchedGiven: ["m-naveen", "m-pepperoni"],
    achievements: [
      { id: "a1", label: "Mexico City poster series", emoji: "🖼️" },
      { id: "a2", label: "Reached Capo di Crust",     emoji: "⭐" },
    ],
    recent: [
      { id: "r1", text: "Claimed the Mexico City poster bounty", whenAgo: "2m" },
      { id: "r2", text: "Shared a Riso print mockup in #show-and-tell", whenAgo: "1d" },
    ],
    lastActiveAt: a(0.02),
  },
  {
    id: "m-naveen",
    mafiaName: "Naveen Napoli",
    avatarEmoji: "👋",
    city: "Bangalore",
    joinedAt: a(7),
    level: "Noob",
    crews: ["Tech"],
    vouchedBy: ["m-don-pizza-czech"],
    vouchedGiven: [],
    achievements: [{ id: "a1", label: "Joined the family", emoji: "👋" }],
    recent: [{ id: "r1", text: "Joined the family", whenAgo: "14m" }],
    lastActiveAt: a(0.04),
  },
  {
    id: "m-ivy",
    mafiaName: "Ivy Calzone",
    avatarEmoji: "📸",
    city: "Lagos",
    joinedAt: a(340),
    level: "Sauce Boss",
    crews: ["Comms", "Creative"],
    vouchedBy: ["m-don-pizza-czech", "m-mira", "m-theo"],
    vouchedGiven: ["m-pepperoni", "m-anchovy"],
    achievements: [
      { id: "a1", label: "Lagos recap published",        emoji: "📰" },
      { id: "a2", label: "Reached Sauce Boss",           emoji: "⭐" },
    ],
    recent: [
      { id: "r1", text: "Posted Lagos recap in #show-and-tell", whenAgo: "38m" },
    ],
    lastActiveAt: a(0.1),
  },
  {
    id: "m-theo",
    mafiaName: "Theo Tartufo",
    avatarEmoji: "🎤",
    city: "Berlin",
    joinedAt: a(480),
    level: "Capo di Crust",
    crews: ["Creative"],
    vouchedBy: ["m-don-pizza-czech", "m-mira", "m-ivy", "m-burrata"],
    vouchedGiven: ["m-mira", "m-ivy"],
    achievements: [
      { id: "a1", label: "Hosts Creative crew weekly", emoji: "🛠️" },
      { id: "a2", label: "Berlin meetup organizer",    emoji: "🌍" },
    ],
    recent: [
      { id: "r1", text: "Hosting Creative crew call today at 6pm CET", whenAgo: "1h" },
    ],
    lastActiveAt: a(0.2),
  },
  {
    id: "m-cheese-lucas",
    mafiaName: "Cheese Lucas",
    avatarEmoji: "🧀",
    city: "São Paulo",
    joinedAt: a(45),
    level: "Hustler",
    crews: ["Bizdev"],
    vouchedBy: ["m-don-pizza-czech"],
    vouchedGiven: [],
    achievements: [{ id: "a1", label: "First bounty completed", emoji: "🎯" }],
    recent: [
      { id: "r1", text: "Got vouched by Don Pizza Czech", whenAgo: "2m" },
    ],
    lastActiveAt: a(0.3),
  },
  {
    id: "m-pineapple",
    mafiaName: "Pineapple Liotta Jr.",
    avatarEmoji: "🍍",
    city: "Manila",
    joinedAt: a(160),
    level: "Sauce Boss",
    crews: ["Events"],
    vouchedBy: ["m-ivy", "m-theo"],
    vouchedGiven: ["m-cheese-lucas"],
    achievements: [
      { id: "a1", label: "Reached Sauce Boss", emoji: "⭐" },
      { id: "a2", label: "Hosted Manila slice night", emoji: "🌍" },
    ],
    recent: [
      { id: "r1", text: "Hit Level 4 — Sauce Boss", whenAgo: "28m" },
    ],
    lastActiveAt: a(0.5),
  },
  {
    id: "m-pepperoni",
    mafiaName: "Pepperoni Provolone",
    avatarEmoji: "🌶️",
    city: "Lagos",
    joinedAt: a(95),
    level: "Hustler",
    crews: ["Comms", "Events"],
    vouchedBy: ["m-ivy", "m-mira"],
    vouchedGiven: [],
    achievements: [{ id: "a1", label: "Lagos co-host", emoji: "🌍" }],
    recent: [
      { id: "r1", text: "Posted Lagos thread (312 slices)", whenAgo: "14m" },
    ],
    lastActiveAt: a(0.6),
  },
  {
    id: "m-burrata",
    mafiaName: "Burrata Bonanno",
    avatarEmoji: "🧈",
    city: "Naples",
    joinedAt: a(300),
    level: "Street Muscle",
    crews: ["Events", "Bizdev"],
    vouchedBy: ["m-don-pizza-czech", "m-theo", "m-mira"],
    vouchedGiven: ["m-anchovy"],
    achievements: [
      { id: "a1", label: "Reached Capo di Crust",   emoji: "⭐" },
      { id: "a2", label: "Naples original",          emoji: "🇮🇹" },
    ],
    recent: [
      { id: "r1", text: "Hit Level 6 — Capo di Crust", whenAgo: "5h" },
    ],
    lastActiveAt: a(0.8),
  },
  {
    id: "m-anchovy",
    mafiaName: "Anchovy Capone",
    avatarEmoji: "🐟",
    city: "Mexico City",
    joinedAt: a(210),
    level: "Sauce Boss",
    crews: ["Bizdev"],
    vouchedBy: ["m-burrata", "m-ivy"],
    vouchedGiven: ["m-don-pizza-czech"],
    achievements: [
      { id: "a1", label: "Mexico City sponsorship lead", emoji: "🤝" },
    ],
    recent: [
      { id: "r1", text: "Locked sponsorship for Mexico City (40kg flour)", whenAgo: "3h" },
    ],
    lastActiveAt: a(1.1),
  },
  {
    id: "m-turkey",
    mafiaName: "Turkey Sausage",
    avatarEmoji: "🦃",
    city: "Istanbul",
    joinedAt: a(2),
    level: "Pizza Trainee",
    crews: ["Events"],
    vouchedBy: [],
    vouchedGiven: [],
    achievements: [],
    recent: [{ id: "r1", text: "Welcomed to the family", whenAgo: "1h" }],
    lastActiveAt: a(1.6),
  },
  {
    id: "m-calzone-corleone",
    mafiaName: "Calzone Corleone",
    avatarEmoji: "📷",
    city: "Berlin",
    joinedAt: a(180),
    level: "Hustler",
    crews: ["Creative", "Art"],
    vouchedBy: ["m-theo"],
    vouchedGiven: [],
    achievements: [{ id: "a1", label: "Berlin photographer", emoji: "📸" }],
    recent: [
      { id: "r1", text: "Posted Berlin party set in #show-and-tell", whenAgo: "7h" },
    ],
    lastActiveAt: a(1.8),
  },
];

export function getMembers(): Member[] {
  return MEMBERS;
}
export function getMember(id: string): Member | undefined {
  return MEMBERS.find((m) => m.id === id);
}

// ---------------------------------------------------------------------------
// Public meta (real-feeling placeholder)

export const FAMILY_META = {
  totalMembers: 612,
  totalCities: 38,
};

// ---------------------------------------------------------------------------
// Filters & sorting

export type SortKey = "active" | "vouched" | "newest" | "level";

export const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: "active",  label: "Recently active" },
  { key: "vouched", label: "Most vouched" },
  { key: "newest",  label: "Newest" },
  { key: "level",   label: "Highest level" },
];

export interface FilterState {
  city: string | null;     // null = all
  crew: Crew | null;
  level: Level | null;
  sort: SortKey;
}

export const EMPTY_FILTERS: FilterState = {
  city: null,
  crew: null,
  level: null,
  sort: "active",
};

export function getCities(): string[] {
  return Array.from(new Set(MEMBERS.map((m) => m.city))).sort();
}

const levelRank = (l: Level) => LEVELS.indexOf(l);

export function applyFilters(members: Member[], f: FilterState): Member[] {
  let out = members;
  if (f.city) out = out.filter((m) => m.city === f.city);
  if (f.crew) out = out.filter((m) => m.crews.includes(f.crew!));
  if (f.level) out = out.filter((m) => m.level === f.level);

  out = [...out];
  switch (f.sort) {
    case "active":
      out.sort(
        (x, y) =>
          new Date(y.lastActiveAt).getTime() -
          new Date(x.lastActiveAt).getTime(),
      );
      break;
    case "vouched":
      out.sort((x, y) => y.vouchedBy.length - x.vouchedBy.length);
      break;
    case "newest":
      out.sort(
        (x, y) =>
          new Date(y.joinedAt).getTime() - new Date(x.joinedAt).getTime(),
      );
      break;
    case "level":
      out.sort((x, y) => levelRank(y.level) - levelRank(x.level));
      break;
  }
  return out;
}

const CREW_EMOJI: Record<Crew, string> = {
  Design:   "✏️",
  Art:      "🎨",
  Creative: "🎬",
  Tech:     "💻",
  Events:   "🎉",
  Comms:    "📣",
  Bizdev:   "🤝",
};
export const crewEmoji = (c: Crew) => CREW_EMOJI[c];

export function formatJoined(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}
