/**
 * Bounties data for /dashboard/bounties.
 *
 * Placeholder roster. Structured to match the eventual `bounties` +
 * `bounty_claims` + `bounty_comments` tables. Swap `getBounties()` for
 * a real fetch when the backend lands.
 *
 * Status lifecycle:
 *   open       → no claim yet, anyone can grab it
 *   in-progress → a member has claimed it, submitting work
 *   completed   → work submitted + approved, paid out
 */

import { CREWS, type Crew } from "../family/familyData";

export type BountyStatus = "open" | "in-progress" | "completed";

export interface BountyComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  ts: string;
}

export interface Bounty {
  id: string;
  title: string;
  summary: string;          // 1-line list view
  description: string;      // detail view, multi-paragraph
  requirements: string[];
  deliverable: string;      // "Link to Figma file" / "PR url" / "Photo"
  payoutPep: number;
  tags: string[];           // skills
  crew: Crew | null;
  status: BountyStatus;
  postedAt: string;         // ISO
  deadlineAt: string | null;
  posterName: string;
  posterAvatar: string;
  claimedByName?: string;
  claimedByAvatar?: string;
  claimedAt?: string;
  completedAt?: string;
  workUrl?: string;
  comments: BountyComment[];
}

const a = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();
const f = (h: number) => new Date(Date.now() + h * 3600_000).toISOString();

const BOUNTIES: Bounty[] = [
  {
    id: "b-mxcity-poster",
    title: "Mexico City meetup poster",
    summary:
      "Single Riso-ready poster for the Mexico City slice night, in the PizzaDAO brand.",
    description:
      "We need one print-ready poster for the Mexico City meetup on May 18. Riso-friendly (max 3 colors), A3, vertical. Should feel like the PizzaDAO family — warm, a little weird, cartoony but editorial.\n\nDeliver source file + PNG export. Style reference: the Lisbon and Berlin posters in the brand folder.",
    requirements: [
      "Source file (Figma or Illustrator)",
      "Print-ready PNG, 300dpi, A3 vertical",
      "Max 3 colors, Riso-friendly palette",
    ],
    deliverable: "Figma link or zipped source + PNG",
    payoutPep: 80,
    tags: ["Poster", "Riso", "Illustration"],
    crew: "Design",
    status: "open",
    postedAt: a(6),
    deadlineAt: f(72),
    posterName: "Don Pizza Czech",
    posterAvatar: "🍕",
    comments: [
      {
        id: "c1",
        authorName: "Mira Mortadella",
        authorAvatar: "🎨",
        text: "Eyeing this one — anyone else thinking about it?",
        ts: a(3),
      },
    ],
  },
  {
    id: "b-discord-bot",
    title: "Discord welcome bot v2",
    summary: "Rewrite the family welcome bot to use slash commands.",
    description:
      "The current welcome bot still uses prefix commands. Migrate it to discord.js v14 with slash commands, keep the welcome flow identical, add a /pizza command that pings a random member.\n\nRepo + write access provided after you claim.",
    requirements: [
      "discord.js v14",
      "Identical welcome flow",
      "New /pizza command",
      "Tests for the welcome handler",
    ],
    deliverable: "GitHub PR url",
    payoutPep: 220,
    tags: ["TypeScript", "discord.js"],
    crew: "Tech",
    status: "in-progress",
    postedAt: a(28),
    deadlineAt: f(120),
    posterName: "Naveen Napoli",
    posterAvatar: "👋",
    claimedByName: "Calzone Corleone",
    claimedByAvatar: "📷",
    claimedAt: a(12),
    comments: [
      {
        id: "c1",
        authorName: "Calzone Corleone",
        authorAvatar: "📷",
        text: "Claimed. Will have a draft PR by EOW.",
        ts: a(12),
      },
    ],
  },
  {
    id: "b-lagos-recap",
    title: "Lagos slice night recap thread",
    summary: "Write the X recap thread for the Lagos meetup.",
    description:
      "Drop a 6–8 tweet thread covering the Lagos slice night — vibes, numbers, a few shoutouts. Photos provided. Tone: warm, low-ego, family.",
    requirements: [
      "6–8 tweets",
      "Use the provided photos",
      "Tag @Pizza_DAO and #GlobalPizzaParty",
    ],
    deliverable: "Draft in Google Doc + final X thread url",
    payoutPep: 60,
    tags: ["Writing", "Social"],
    crew: "Comms",
    status: "completed",
    postedAt: a(96),
    deadlineAt: null,
    posterName: "Ivy Calzone",
    posterAvatar: "📸",
    claimedByName: "Pepperoni Provolone",
    claimedByAvatar: "🌶️",
    claimedAt: a(72),
    completedAt: a(20),
    workUrl: "https://x.com/Pizza_DAO/status/1791000000000000999",
    comments: [
      {
        id: "c1",
        authorName: "Ivy Calzone",
        authorAvatar: "📸",
        text: "Perfect. Paid out, thread is live.",
        ts: a(18),
      },
    ],
  },
  {
    id: "b-bpd-hosts",
    title: "Bitcoin Pizza Day host kit",
    summary:
      "Package the BPD host kit — checklist PDF, brand assets, social pack.",
    description:
      "Compile the Bitcoin Pizza Day host kit into a single drop-in folder. PDF host checklist, brand assets (logos + fonts + 3 poster templates), and a social pack (X + Instagram).\n\nReference the previous year's kit, but cleaner.",
    requirements: [
      "PDF host checklist (1-2 pages)",
      "Brand asset folder",
      "Social pack: 6 X images + 6 IG images",
    ],
    deliverable: "Shared Drive folder",
    payoutPep: 180,
    tags: ["Design", "Ops", "Brand"],
    crew: "Design",
    status: "open",
    postedAt: a(40),
    deadlineAt: f(216),
    posterName: "Theo Tartufo",
    posterAvatar: "🎤",
    comments: [],
  },
  {
    id: "b-istanbul-intro",
    title: "Istanbul intro coffee — host on the ground",
    summary: "Host a small intro coffee for new Istanbul members.",
    description:
      "Pick a café, post the time in #intros, host a 90-minute intro coffee. Bring a couple of slices if you can. Report back with a 3-line debrief + a photo.",
    requirements: [
      "Pick a café in Istanbul",
      "Post 48h in advance",
      "Debrief + photo afterward",
    ],
    deliverable: "Debrief in #show-and-tell",
    payoutPep: 40,
    tags: ["Hosting", "City"],
    crew: "Events",
    status: "open",
    postedAt: a(2),
    deadlineAt: f(168),
    posterName: "Turkey Sausage",
    posterAvatar: "🦃",
    comments: [],
  },
  {
    id: "b-sponsor-deck",
    title: "Local sponsor outreach deck",
    summary:
      "One-page outreach deck cities can send to local sponsors for BPD.",
    description:
      "Cities keep rewriting the same sponsorship pitch. Standardize it: one page, swappable city name, clear ask. PDF + editable source.",
    requirements: [
      "1 page",
      "Editable source (Figma)",
      "Swappable city name + photo",
    ],
    deliverable: "Figma + PDF",
    payoutPep: 120,
    tags: ["Design", "Bizdev"],
    crew: "Bizdev",
    status: "in-progress",
    postedAt: a(54),
    deadlineAt: f(96),
    posterName: "Anchovy Capone",
    posterAvatar: "🐟",
    claimedByName: "Mira Mortadella",
    claimedByAvatar: "🎨",
    claimedAt: a(20),
    comments: [],
  },
];

export function getBounties(): Bounty[] {
  return BOUNTIES;
}
export function getBounty(id: string): Bounty | undefined {
  return BOUNTIES.find((b) => b.id === id);
}

// ---------------------------------------------------------------------------
// "Logged-in" member (placeholder so the My claims filter has something to do)

export const ME = {
  name: "Mira Mortadella",
  avatar: "🎨",
};

// ---------------------------------------------------------------------------
// Filters & sorts

export type BountyFilterKey =
  | "all"
  | "open"
  | "in-progress"
  | "completed"
  | "mine";

export const BOUNTY_FILTERS: Array<{ key: BountyFilterKey; label: string }> = [
  { key: "all",         label: "All" },
  { key: "open",        label: "Open" },
  { key: "in-progress", label: "In progress" },
  { key: "completed",   label: "Completed" },
  { key: "mine",        label: "My claims" },
];

export type BountySortKey = "newest" | "payout" | "closing";

export const BOUNTY_SORTS: Array<{ key: BountySortKey; label: string }> = [
  { key: "newest",  label: "Newest" },
  { key: "payout",  label: "Highest payout" },
  { key: "closing", label: "Closing soon" },
];

export function applyBountyFilters(
  bounties: Bounty[],
  filter: BountyFilterKey,
  sort: BountySortKey,
): Bounty[] {
  let out = bounties;
  if (filter === "open") out = out.filter((b) => b.status === "open");
  else if (filter === "in-progress")
    out = out.filter((b) => b.status === "in-progress");
  else if (filter === "completed")
    out = out.filter((b) => b.status === "completed");
  else if (filter === "mine")
    out = out.filter((b) => b.claimedByName === ME.name);

  out = [...out];
  switch (sort) {
    case "newest":
      out.sort(
        (x, y) =>
          new Date(y.postedAt).getTime() - new Date(x.postedAt).getTime(),
      );
      break;
    case "payout":
      out.sort((x, y) => y.payoutPep - x.payoutPep);
      break;
    case "closing":
      out.sort((x, y) => {
        const xd = x.deadlineAt ? new Date(x.deadlineAt).getTime() : Infinity;
        const yd = y.deadlineAt ? new Date(y.deadlineAt).getTime() : Infinity;
        return xd - yd;
      });
      break;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Format helpers

export function timeAgo(iso: string): string {
  const m = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60_000));
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function timeRemaining(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "Closed";
  const h = Math.floor(ms / 3600_000);
  if (h < 24) return `${h}h left`;
  const d = Math.floor(h / 24);
  return `${d}d left`;
}

export const STATUS_LABEL: Record<BountyStatus, string> = {
  open: "Open",
  "in-progress": "In progress",
  completed: "Completed",
};

// re-export so the page doesn't need a second import
export { CREWS, type Crew };
