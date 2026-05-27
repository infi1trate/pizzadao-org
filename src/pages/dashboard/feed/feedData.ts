/**
 * "The family is cooking" — the live social pulse feed.
 *
 * Three sources interleaved chronologically (newest first):
 *   - "x"      — X / Twitter posts mentioning @Pizza_DAO, @RarePizzas,
 *                #PizzaDAO, #GlobalPizzaParty
 *   - "discord"— activity from #show-and-tell, #intros, #wins
 *   - "moment" — internal member moments (vouches, level-ups, bounty drops,
 *                new members)
 *
 * For now this file ships realistic placeholder data. Swapping to live
 * data is intentionally one line: replace `getFeed()` with a fetch that
 * returns the same `FeedEntry[]` shape.
 *
 * Backend, eventually:
 *   - X        — server-side search via X API, cached 5–15 min
 *   - Discord  — Discord bot subscribed to the three channels
 *   - moments  — emitted from existing internal events
 */

export type FeedSource = "x" | "discord" | "moment";

export type MomentKind = "vouch" | "levelup" | "bounty" | "welcome";

export type Engagement =
  | { kind: "vouch-back"; target: string }                 // member moment
  | { kind: "send-pizza"; target: string }                 // member moment
  | { kind: "reply-on-x"; tweetId: string; template: string }; // x post

export interface FeedEntryBase {
  id: string;
  source: FeedSource;
  ts: string;          // ISO timestamp, used for sort + "Xm ago"
  href?: string;       // tap-through link (X tweet, Discord deep link)
  engage?: Engagement;
}

export interface XEntry extends FeedEntryBase {
  source: "x";
  handle: string;          // "@piecaketrue"
  displayName: string;
  avatarEmoji: string;     // emoji placeholder until real avatars
  text: string;
  likes: number;
  replies: number;
  tweetId: string;
}

export interface DiscordEntry extends FeedEntryBase {
  source: "discord";
  mafiaName: string;       // "Cheese Lucas"
  avatarEmoji: string;
  channel: "show-and-tell" | "intros" | "wins";
  excerpt: string;
}

export interface MomentEntry extends FeedEntryBase {
  source: "moment";
  kind: MomentKind;
  text: string;            // pre-rendered sentence ("X just got vouched by Y")
  subject?: string;        // member this moment is about (for engage CTAs)
}

export type FeedEntry = XEntry | DiscordEntry | MomentEntry;

// ----------------------------------------------------------------------------
// Placeholder data. Times are computed at module load so "ago" stays fresh.

const minutesAgo = (m: number) =>
  new Date(Date.now() - m * 60_000).toISOString();
const hoursAgo = (h: number) => minutesAgo(h * 60);

const PLACEHOLDER: FeedEntry[] = [
  {
    id: "m-1",
    source: "moment",
    kind: "vouch",
    subject: "Cheese Lucas",
    text: "Cheese Lucas just got vouched by Don Pizza Czech.",
    ts: minutesAgo(2),
    engage: { kind: "vouch-back", target: "Cheese Lucas" },
  } as MomentEntry,
  {
    id: "x-1",
    source: "x",
    handle: "@piecaketrue",
    displayName: "Pie Cake",
    avatarEmoji: "🥧",
    text:
      "Just walked into a @Pizza_DAO meetup in Lisbon and got handed a slice within 12 seconds. New world record? #PizzaDAO",
    likes: 184,
    replies: 22,
    tweetId: "1791000000000000001",
    href: "https://x.com/piecaketrue/status/1791000000000000001",
    ts: minutesAgo(6),
    engage: {
      kind: "reply-on-x",
      tweetId: "1791000000000000001",
      template: "Welcome to the family 🍕 — which city are you in next?",
    },
  } as XEntry,
  {
    id: "d-1",
    source: "discord",
    mafiaName: "Pepperoni Provolone",
    avatarEmoji: "🧀",
    channel: "show-and-tell",
    excerpt:
      "Lagos recap thread is up — 312 slices, 4 ovens, one almost-fire. Photos inside 🔥",
    href: "https://discord.com/channels/0/0/0",
    ts: minutesAgo(14),
  } as DiscordEntry,
  {
    id: "m-2",
    source: "moment",
    kind: "levelup",
    subject: "Pineapple Liotta Jr.",
    text: "Pineapple Liotta Jr. hit Level 4 — Sauce Boss.",
    ts: minutesAgo(28),
    engage: { kind: "send-pizza", target: "Pineapple Liotta Jr." },
  } as MomentEntry,
  {
    id: "x-2",
    source: "x",
    handle: "@RarePizzas",
    displayName: "Rare Pizzas",
    avatarEmoji: "🍕",
    text:
      "GM family. 47 cities confirmed for the next #GlobalPizzaParty. If your city isn't on the list yet, the door is still open.",
    likes: 612,
    replies: 88,
    tweetId: "1791000000000000002",
    href: "https://x.com/RarePizzas/status/1791000000000000002",
    ts: minutesAgo(42),
    engage: {
      kind: "reply-on-x",
      tweetId: "1791000000000000002",
      template: "Counting us in 🍕",
    },
  } as XEntry,
  {
    id: "m-3",
    source: "moment",
    kind: "bounty",
    text: "New Design bounty just dropped — 50 $PEP.",
    ts: hoursAgo(1),
  } as MomentEntry,
  {
    id: "d-2",
    source: "discord",
    mafiaName: "Turkey Sausage",
    avatarEmoji: "🦃",
    channel: "intros",
    excerpt:
      "Hi family — joining from Istanbul. Run a small bakery, want to host my first party in the spring 👋",
    href: "https://discord.com/channels/0/0/0",
    ts: hoursAgo(1.5),
  } as DiscordEntry,
  {
    id: "m-4",
    source: "moment",
    kind: "welcome",
    subject: "Turkey Sausage",
    text: "Turkey Sausage welcomed to the family.",
    ts: hoursAgo(1.6),
    engage: { kind: "vouch-back", target: "Turkey Sausage" },
  } as MomentEntry,
  {
    id: "x-3",
    source: "x",
    handle: "@dough_general",
    displayName: "Dough General",
    avatarEmoji: "🫓",
    text:
      "Hot take: the @Pizza_DAO community is the most low-ego corner of crypto. Just people feeding people.",
    likes: 421,
    replies: 39,
    tweetId: "1791000000000000003",
    href: "https://x.com/dough_general/status/1791000000000000003",
    ts: hoursAgo(2),
  } as XEntry,
  {
    id: "d-3",
    source: "discord",
    mafiaName: "Anchovy Capone",
    avatarEmoji: "🐟",
    channel: "wins",
    excerpt:
      "Sponsorship locked in for Mexico City — local mill is donating 40kg of flour. Let's go.",
    href: "https://discord.com/channels/0/0/0",
    ts: hoursAgo(3),
  } as DiscordEntry,
  {
    id: "x-4",
    source: "x",
    handle: "@mira_makes",
    displayName: "Mira",
    avatarEmoji: "🎨",
    text:
      "Finally shipped the #PizzaDAO Mexico City poster. Riso print drops this weekend. 🍕🇲🇽",
    likes: 96,
    replies: 14,
    tweetId: "1791000000000000004",
    href: "https://x.com/mira_makes/status/1791000000000000004",
    ts: hoursAgo(4),
  } as XEntry,
  {
    id: "m-5",
    source: "moment",
    kind: "levelup",
    subject: "Burrata Bonanno",
    text: "Burrata Bonanno hit Level 6 — Capo di Crust.",
    ts: hoursAgo(5),
    engage: { kind: "send-pizza", target: "Burrata Bonanno" },
  } as MomentEntry,
  {
    id: "d-4",
    source: "discord",
    mafiaName: "Calzone Corleone",
    avatarEmoji: "📸",
    channel: "show-and-tell",
    excerpt:
      "Some shots from the Berlin party — full set in the drive folder. Tag yourselves.",
    href: "https://discord.com/channels/0/0/0",
    ts: hoursAgo(7),
  } as DiscordEntry,
  {
    id: "x-5",
    source: "x",
    handle: "@slicewire",
    displayName: "Slice Wire",
    avatarEmoji: "📰",
    text:
      "Covering #PizzaDAO for a piece on crypto-native mutual aid. DMs open if you've hosted a party.",
    likes: 58,
    replies: 11,
    tweetId: "1791000000000000005",
    href: "https://x.com/slicewire/status/1791000000000000005",
    ts: hoursAgo(9),
  } as XEntry,
];

/** Replace this with a real fetch when the backend lands. Same return type. */
export function getFeed(): FeedEntry[] {
  return [...PLACEHOLDER].sort(
    (a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime(),
  );
}

// ----------------------------------------------------------------------------
// Pulse bar — JoinHive-style live counts above the feed.

export interface PulseStat {
  icon: string;
  label: string;
  live?: boolean; // true for the realtime presence stat
}

export function getPulseStats(): PulseStat[] {
  return [
    { icon: "🟢", label: "12 cooking in Discord right now", live: true },
    { icon: "🍕", label: "47 posts about us this week" },
    { icon: "👋", label: "3 new members today" },
  ];
}

// ----------------------------------------------------------------------------
// Format helpers.

export function timeAgo(iso: string): string {
  const diffMin = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 60_000),
  );
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m`;
  const h = Math.floor(diffMin / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export function compactCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 10_000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return Math.round(n / 1000) + "k";
}
