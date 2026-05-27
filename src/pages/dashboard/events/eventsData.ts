/**
 * Events data for /dashboard/events.
 *
 * TWO upstream sources, intentionally kept separate so each can be swapped
 * to a real fetch independently:
 *
 *   - getDiscordEvents()  → Discord scheduled events API
 *                           https://discord.com/developers/docs/resources/guild-scheduled-event
 *   - getPizzaDAOEvents() → existing PizzaDAO events source / Google Calendar
 *                           (already wired through supabase fn `get-calendar-events`
 *                            for the home WeekStrip)
 *
 * Both are normalized into the same `DashboardEvent` shape so the page,
 * filters, calendar grid, and ICS exporter don't care where an event
 * came from.
 */

export type EventSource = "discord" | "pizzadao";

export type EventCategory =
  | "community-call"
  | "bitcoin-pizza-day"
  | "city-meetup"
  | "crew";

export type RSVPStatus = "going" | "maybe" | "not-yet";

export interface DashboardEvent {
  id: string;
  source: EventSource;
  category: EventCategory;
  title: string;
  host: string;             // crew name or city host
  /** "Creative", "Tech" etc., or null for community-wide */
  crew: string | null;
  start: string;            // ISO
  end: string;              // ISO
  location: string;         // city OR url
  description: string;
  attendees: number;
  attendeeAvatars: string[]; // emoji placeholders
  special?: boolean;        // true → Benny shows up on detail
}

// ---------------------------------------------------------------------------
// Placeholder generators. Times computed at module load so cards stay fresh.

const day = (offset: number, h: number, m = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const plusHours = (iso: string, h: number) =>
  new Date(new Date(iso).getTime() + h * 3600_000).toISOString();

/** PLACEHOLDER → swap with Discord scheduled events API */
export function getDiscordEvents(): DashboardEvent[] {
  return [
    {
      id: "d-creative-1",
      source: "discord",
      category: "crew",
      title: "Creative crew weekly",
      host: "Theo",
      crew: "Creative",
      start: day(0, 18),
      end: day(0, 19),
      location: "https://discord.gg/pizzadao",
      description:
        "Weekly sync for the Creative crew. Poster reviews, brand house-keeping, and what's shipping next.",
      attendees: 14,
      attendeeAvatars: ["🎨", "📸", "✍️", "🎤"],
    },
    {
      id: "d-comms-1",
      source: "discord",
      category: "crew",
      title: "Comms crew open hours",
      host: "Ivy",
      crew: "Comms",
      start: day(1, 15),
      end: day(1, 16),
      location: "https://discord.gg/pizzadao",
      description:
        "Drop in, get feedback on copy, or just listen. Open to anyone writing on behalf of the family.",
      attendees: 9,
      attendeeAvatars: ["✍️", "📰", "📣"],
    },
    {
      id: "d-tech-1",
      source: "discord",
      category: "crew",
      title: "Tech crew standup",
      host: "Naveen",
      crew: "Tech",
      start: day(2, 17),
      end: day(2, 17, 45),
      location: "https://discord.gg/pizzadao",
      description: "Fast 45 minutes. What you shipped, what's blocked, what's next.",
      attendees: 11,
      attendeeAvatars: ["💻", "🛠️", "⚙️"],
    },
    {
      id: "d-allhands-1",
      source: "discord",
      category: "community-call",
      title: "Family all-hands",
      host: "PizzaDAO",
      crew: null,
      start: day(4, 17),
      end: day(4, 18, 30),
      location: "https://discord.gg/pizzadao",
      description:
        "Monthly family-wide call. Wins from every city, what's coming, and Q&A with the core crew.",
      attendees: 142,
      attendeeAvatars: ["🍕", "🎉", "🤝", "🌍", "👋"],
    },
  ];
}

/** PLACEHOLDER → swap with PizzaDAO events source / Google Calendar */
export function getPizzaDAOEvents(): DashboardEvent[] {
  return [
    {
      id: "p-mxcity",
      source: "pizzadao",
      category: "city-meetup",
      title: "Mexico City meetup",
      host: "Don Pizza Czech",
      crew: null,
      start: day(3, 19),
      end: day(3, 22),
      location: "Mexico City, Roma Norte",
      description:
        "Hang out, eat slices, meet the local Mexico City mafia. Bring a friend, bring a stranger.",
      attendees: 48,
      attendeeAvatars: ["🇲🇽", "🍕", "👋", "🎉"],
    },
    {
      id: "p-lagos",
      source: "pizzadao",
      category: "city-meetup",
      title: "Lagos slice night",
      host: "Pepperoni Provolone",
      crew: null,
      start: day(6, 18),
      end: day(6, 21),
      location: "Lagos, Lekki Phase 1",
      description:
        "First slice night in Lagos. Local oven, local crew, hosted by the Lagos chapter.",
      attendees: 31,
      attendeeAvatars: ["🇳🇬", "🔥", "🍕"],
    },
    {
      id: "p-bpd",
      source: "pizzadao",
      category: "bitcoin-pizza-day",
      title: "Bitcoin Pizza Day — Global",
      host: "PizzaDAO",
      crew: null,
      start: day(14, 12),
      end: day(14, 23, 59),
      location: "Worldwide",
      description:
        "The one we live for. 50+ cities, one weekend, free pizza for everyone. Pick a city, pick a shift, show up.",
      attendees: 1284,
      attendeeAvatars: ["🍕", "🌍", "🎉", "🤝", "🪩"],
      special: true,
    },
    {
      id: "p-istanbul",
      source: "pizzadao",
      category: "city-meetup",
      title: "Istanbul intro coffee",
      host: "Turkey Sausage",
      crew: null,
      start: day(8, 11),
      end: day(8, 12, 30),
      location: "Istanbul, Karaköy",
      description: "Low-key meetup. Coffee, intro to the family, plan a spring party.",
      attendees: 7,
      attendeeAvatars: ["🇹🇷", "☕", "👋"],
    },
    {
      id: "p-monthly-call",
      source: "pizzadao",
      category: "community-call",
      title: "Hosts council",
      host: "PizzaDAO",
      crew: null,
      start: day(10, 16),
      end: day(10, 17),
      location: "https://meet.google.com/abc-defg-hij",
      description: "Hosts from every active city compare notes on what's working.",
      attendees: 38,
      attendeeAvatars: ["🍕", "📅", "🌍"],
    },
  ];
}

/** Merged + sorted feed for the page. */
export function getAllEvents(): DashboardEvent[] {
  return [...getDiscordEvents(), ...getPizzaDAOEvents()].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
}

// ---------------------------------------------------------------------------
// Filters

export type FilterKey =
  | "all"
  | "my-crews"
  | "community-call"
  | "bitcoin-pizza-day"
  | "city-meetup";

export const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all",                label: "All" },
  { key: "my-crews",           label: "My crews" },
  { key: "community-call",     label: "Community calls" },
  { key: "bitcoin-pizza-day",  label: "Bitcoin Pizza Day" },
  { key: "city-meetup",        label: "City meetups" },
];

/** PLACEHOLDER — replace with the signed-in member's crews. */
export const MY_CREWS = ["Creative"];

export function applyFilter(
  evs: DashboardEvent[],
  key: FilterKey,
): DashboardEvent[] {
  if (key === "all") return evs;
  if (key === "my-crews")
    return evs.filter((e) => e.crew && MY_CREWS.includes(e.crew));
  return evs.filter((e) => e.category === key);
}

// ---------------------------------------------------------------------------
// ICS export (Add to calendar)

const pad = (n: number) => String(n).padStart(2, "0");
const toICSDate = (iso: string) => {
  const d = new Date(iso);
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  );
};

export function downloadIcs(ev: DashboardEvent) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PizzaDAO//Dashboard//EN",
    "BEGIN:VEVENT",
    `UID:${ev.id}@pizzadao`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(ev.start)}`,
    `DTEND:${toICSDate(ev.end)}`,
    `SUMMARY:${ev.title.replace(/\n/g, " ")}`,
    `LOCATION:${ev.location.replace(/\n/g, " ")}`,
    `DESCRIPTION:${ev.description.replace(/\n/g, " \\n ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function shareToX(ev: DashboardEvent) {
  const text = `Joining "${ev.title}" with the @Pizza_DAO family 🍕`;
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
