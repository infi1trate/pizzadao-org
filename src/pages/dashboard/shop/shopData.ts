/**
 * Shop catalog for /dashboard/shop.
 *
 * Placeholder items. Structured to map cleanly onto a future
 * `shop_items` + `shop_redemptions` table pair. Swap `getItems()`
 * for a real fetch when the backend lands.
 *
 * Categories:
 *   pizza   — real-world: gift cards, free slice redemptions
 *   drops   — NFTs (Pizza Sticks etc.)
 *   perks   — event access, merch, member unlocks
 *
 * Any item can also be flagged `limited` (time-bounded). The "Limited"
 * tab is a cross-category view of `limited === true`.
 */

export type ShopCategory = "pizza" | "drops" | "perks";

export type RedemptionKind = "code" | "shipping" | "mint" | "calendar";

export interface ShopItem {
  id: string;
  name: string;
  blurb: string;          // one-line list view
  description: string;    // detail view
  pricePep: number;
  category: ShopCategory;
  /** null = unlimited. number = current stock. 0 = sold out. */
  stock: number | null;
  limited?: boolean;
  endsAt?: string;        // ISO, only on limited items
  /** Solid gradient pair drives the hero block until real images land. */
  hero: { from: string; to: string; sticker: string };
  redemption: {
    kind: RedemptionKind;
    /** Plain English instructions shown post-purchase. */
    instructions: string;
  };
}

const f = (h: number) => new Date(Date.now() + h * 3600_000).toISOString();

const ITEMS: ShopItem[] = [
  // ── Pizza ──────────────────────────────────────────────────────────────
  {
    id: "i-slice-redeem",
    name: "Free slice at a meetup",
    blurb: "Walk into any PizzaDAO meetup, hand over the code, eat.",
    description:
      "Redeemable at any active PizzaDAO meetup. Show the code to the host, eat the slice. Good for one slice per code.",
    pricePep: 20,
    category: "pizza",
    stock: null,
    hero: { from: "#FFD23F", to: "#F4A93A", sticker: "🍕" },
    redemption: {
      kind: "code",
      instructions:
        "Your one-time slice code is below. Show it to the host at the meetup.",
    },
  },
  {
    id: "i-pizzahut-gc",
    name: "Pizza Hut gift card — $20",
    blurb: "Delivered as a code to your email. Good worldwide where available.",
    description:
      "A $20 Pizza Hut gift card. Code is emailed once the redemption is processed (within 24h). Country availability varies.",
    pricePep: 280,
    category: "pizza",
    stock: 14,
    hero: { from: "#F83A3A", to: "#A41212", sticker: "🎟️" },
    redemption: {
      kind: "code",
      instructions:
        "The gift-card code is delivered to your email within 24 hours.",
    },
  },
  {
    id: "i-local-slice",
    name: "Slice on the house — your city",
    blurb: "Hosts cover one slice at your next city meetup.",
    description:
      "The local host of your city will cover one slice for you at the next meetup. Show your member profile at the door.",
    pricePep: 35,
    category: "pizza",
    stock: 22,
    hero: { from: "#FFE9B0", to: "#F8C26B", sticker: "🧀" },
    redemption: {
      kind: "code",
      instructions: "Show this confirmation at the next meetup in your city.",
    },
  },

  // ── Drops ──────────────────────────────────────────────────────────────
  {
    id: "i-pizza-sticks",
    name: "Pizza Sticks — Origin",
    blurb: "First-edition Pizza Sticks NFT. Holders get the OG ring.",
    description:
      "The original Pizza Sticks. Minted on Base. Holders get the Origin ring on their profile and early access to future drops.",
    pricePep: 1200,
    category: "drops",
    stock: 3,
    limited: true,
    endsAt: f(72),
    hero: { from: "#1f1f2e", to: "#3a2a55", sticker: "🪩" },
    redemption: {
      kind: "mint",
      instructions:
        "A mint link will appear here. Connect your wallet to claim the NFT — gas covered.",
    },
  },
  {
    id: "i-bpd-poster",
    name: "Bitcoin Pizza Day 2026 poster",
    blurb: "Signed Riso print, 50 copies, shipped worldwide.",
    description:
      "Limited Riso print celebrating Bitcoin Pizza Day 2026. Signed and numbered, 50 copies total. Ships worldwide in a tube.",
    pricePep: 480,
    category: "drops",
    stock: 47,
    limited: true,
    endsAt: f(216),
    hero: { from: "#F83A3A", to: "#FFD23F", sticker: "🖼️" },
    redemption: {
      kind: "shipping",
      instructions:
        "We'll ask for a shipping address on the next screen. Prints ship within 2 weeks.",
    },
  },
  {
    id: "i-cheese-card",
    name: "Cheese trading card pack",
    blurb: "Pack of 5 random family trading cards. Holographics happen.",
    description:
      "5 random member trading cards from the Pizza Mafia set. Foil, holo, and gold versions exist. No duplicates within a single pack.",
    pricePep: 90,
    category: "drops",
    stock: 120,
    hero: { from: "#0c2340", to: "#5cbdb9", sticker: "🎴" },
    redemption: {
      kind: "mint",
      instructions: "Your pack is added to your wallet on Base.",
    },
  },

  // ── Perks ──────────────────────────────────────────────────────────────
  {
    id: "i-bpd-frontrow",
    name: "Bitcoin Pizza Day — front-of-line",
    blurb: "Skip the line at any BPD city. Doors open early for you.",
    description:
      "Get front-of-line access at any Bitcoin Pizza Day city. Hosts will be notified you're coming. Includes a printed badge.",
    pricePep: 220,
    category: "perks",
    stock: 80,
    limited: true,
    endsAt: f(312),
    hero: { from: "#F4A93A", to: "#F83A3A", sticker: "🎫" },
    redemption: {
      kind: "calendar",
      instructions: "Pick the BPD city you're attending on the next screen.",
    },
  },
  {
    id: "i-crew-merch",
    name: "Crew tee — pick your crew",
    blurb: "Heavyweight tee with your crew badge. Ships in 3 weeks.",
    description:
      "Heavyweight cotton tee, screen-printed with your crew badge (Design, Art, Creative, Tech, Events, Comms, Bizdev). Pick size and crew on the next screen.",
    pricePep: 350,
    category: "perks",
    stock: 60,
    hero: { from: "#2d2d2d", to: "#0d0d0d", sticker: "👕" },
    redemption: {
      kind: "shipping",
      instructions: "We'll ask for size, crew, and shipping address.",
    },
  },
  {
    id: "i-handwritten-thanks",
    name: "Handwritten thank-you from Benny",
    blurb: "A real, hand-addressed postcard from PizzaDAO HQ.",
    description:
      "A real postcard, hand-addressed and signed, shipped from PizzaDAO HQ. Includes a small surprise.",
    pricePep: 60,
    category: "perks",
    stock: 200,
    hero: { from: "#FBF7EC", to: "#E8C5A6", sticker: "✉️" },
    redemption: {
      kind: "shipping",
      instructions: "We'll ask for a shipping address. Postcards ship monthly.",
    },
  },
  {
    id: "i-sold-out",
    name: "Founders ring (sold out)",
    blurb: "The first 25 sold out in 19 minutes. More next year.",
    description:
      "First 25 Founders rings, sold out. Listed here for the record — a new edition opens next year.",
    pricePep: 2200,
    category: "perks",
    stock: 0,
    limited: true,
    endsAt: f(-1),
    hero: { from: "#c9a84c", to: "#6b4d12", sticker: "💍" },
    redemption: {
      kind: "shipping",
      instructions: "Sold out.",
    },
  },
];

export function getItems(): ShopItem[] {
  return ITEMS;
}
export function getItem(id: string): ShopItem | undefined {
  return ITEMS.find((i) => i.id === id);
}

// ---------------------------------------------------------------------------
// "Logged-in" balance (placeholder)

export const ME_BALANCE = 480;

// ---------------------------------------------------------------------------
// Tabs

export type CategoryTab = "all" | ShopCategory | "limited";

export const CATEGORY_TABS: Array<{ key: CategoryTab; label: string }> = [
  { key: "all",     label: "All" },
  { key: "pizza",   label: "Pizza" },
  { key: "drops",   label: "Drops" },
  { key: "perks",   label: "Perks" },
  { key: "limited", label: "Limited" },
];

export function filterByTab(items: ShopItem[], tab: CategoryTab): ShopItem[] {
  if (tab === "all") return items;
  if (tab === "limited") return items.filter((i) => i.limited);
  return items.filter((i) => i.category === tab);
}

// ---------------------------------------------------------------------------

export function stockLabel(item: ShopItem): string {
  if (item.stock === null) return "Unlimited";
  if (item.stock === 0) return "Sold out";
  if (item.stock <= 5) return `${item.stock} left`;
  return `${item.stock} in stock`;
}

export function endsInLabel(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "Ended";
  const h = Math.floor(ms / 3600_000);
  if (h < 24) return `Ends in ${h}h`;
  const d = Math.floor(h / 24);
  return `Ends in ${d}d`;
}
