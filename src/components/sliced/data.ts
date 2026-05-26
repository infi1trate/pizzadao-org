/**
 * Mock data for the Pizza Party Sliced 2026 recap.
 * Replace with real RSV.Pizza / PostHog / photo repo feeds when ready.
 */

export const HEADLINE_METRICS = [
  { value: 460, suffix: "+", label: "Cities", style: "receipt" },
  { value: 100, suffix: "+", label: "Countries", style: "stamp" },
  { value: 50000, suffix: "+", label: "Attendees", style: "pizza-box" },
  { value: 128000, suffix: "", label: "Slices served", style: "sticker" },
  { value: 1240, suffix: "", label: "Local organizers", style: "receipt" },
  { value: 12_400_000, suffix: "", label: "Social impressions", style: "stamp" },
] as const;

export const SIGNAL_CITIES = [
  { name: "Brooklyn", lat: 40.65, lng: -73.95, attendees: 1840, quote: "Brooklyn showed up hungry." },
  { name: "Lagos", lat: 6.45, lng: 3.4, attendees: 980, quote: "Lagos brought a whole street." },
  { name: "Tokyo", lat: 35.68, lng: 139.69, attendees: 620, quote: "Tokyo went quiet, then went hard." },
  { name: "Buenos Aires", lat: -34.6, lng: -58.38, attendees: 1110, quote: "Asado energy, pizza format." },
  { name: "Berlin", lat: 52.52, lng: 13.4, attendees: 720, quote: "Techno, but make it dough." },
  { name: "Mumbai", lat: 19.07, lng: 72.87, attendees: 1340, quote: "Spice levels: yes." },
  { name: "Mexico City", lat: 19.43, lng: -99.13, attendees: 1520, quote: "CDMX never sleeps. Neither did the oven." },
  { name: "Istanbul", lat: 41.01, lng: 28.97, attendees: 880, quote: "Two continents, one slice." },
  { name: "Sydney", lat: -33.86, lng: 151.21, attendees: 540, quote: "Started the day. Finished the year." },
  { name: "São Paulo", lat: -23.55, lng: -46.63, attendees: 1690, quote: "Loudest table on the planet." },
  { name: "London", lat: 51.5, lng: -0.12, attendees: 1230, quote: "Queued politely. Ate aggressively." },
  { name: "Nairobi", lat: -1.29, lng: 36.82, attendees: 410, quote: "Sunset slice, no notes." },
] as const;

export const GAME_STATS = [
  { game: "Pizza Blast", taps: 412_000, sessions: 38_200, blurb: "Pizza Blast dominated the planet." },
  { game: "Sky Drop", taps: 287_500, sessions: 22_900, blurb: "41,000+ parachute taps in a single day." },
  { game: "Stack Party", taps: 198_300, sessions: 17_400, blurb: "Towers fell. Glory rose." },
  { game: "Bonus Rounds", taps: 64_800, sessions: 1_020, blurb: "1,000+ bonus rounds launched." },
] as const;

export const PHOTO_WALL = [
  { id: 1, city: "Brooklyn", tone: "tomato", rotate: -4 },
  { id: 2, city: "Lagos", tone: "butter", rotate: 3 },
  { id: 3, city: "Tokyo", tone: "ink", rotate: -2 },
  { id: 4, city: "Buenos Aires", tone: "tomato", rotate: 5 },
  { id: 5, city: "Berlin", tone: "cream", rotate: -3 },
  { id: 6, city: "Mumbai", tone: "butter", rotate: 2 },
  { id: 7, city: "Mexico City", tone: "tomato", rotate: -5 },
  { id: 8, city: "Istanbul", tone: "ink", rotate: 4 },
  { id: 9, city: "Sydney", tone: "cream", rotate: -1 },
  { id: 10, city: "São Paulo", tone: "butter", rotate: 6 },
  { id: 11, city: "London", tone: "tomato", rotate: -6 },
  { id: 12, city: "Nairobi", tone: "ink", rotate: 1 },
] as const;

export const PARTNERS = [
  { name: "Stand With Crypto", impact: "activated 30+ cities" },
  { name: "Ledger", impact: "secured the dough" },
  { name: "BASF", impact: "the materials underneath it all" },
  { name: "PRIVY", impact: "identity, on the house" },
] as const;

export const AWARDS = [
  { title: "Most Unhinged Pizza Density", winner: "Brooklyn, NY", note: "11.4 slices per square meter." },
  { title: "Fastest RSVP Sellout", winner: "Tokyo, JP", note: "Sold out in 4m 12s." },
  { title: "Most Remote Slice", winner: "Tromsø, NO", note: "69°N. Yes, really." },
  { title: "Biggest Table Energy", winner: "São Paulo, BR", note: "320 seats, one conversation." },
  { title: "Most Chronically Online Pizza Party", winner: "Berlin, DE", note: "9 group chats, one oven." },
  { title: "Strongest Garlic Knot Aura", winner: "Mumbai, IN", note: "Detectable from low orbit." },
] as const;
