// Curated PizzaDAO event photography sourced from the public Pizza Day
// archive: https://github.com/PizzaDAO/dow-pizza-party/tree/main/public/photos
// Hotlinked via raw.githubusercontent.com — the same source the
// Global Pizza Party 2026 gallery uses.

export interface PizzaPhoto {
  src: string;
  city: string;
  country: string;
  flag: string;
  year: number;
  /** Optional editorial caption — only some frames get one. */
  note?: string;
}

const PHOTO_BASE =
  "https://raw.githubusercontent.com/PizzaDAO/dow-pizza-party/main/public/photos";

const photo = (
  slug: string,
  file: string,
  meta: Omit<PizzaPhoto, "src">,
): PizzaPhoto => ({
  src: `${PHOTO_BASE}/${slug}/2025/${file}`,
  ...meta,
});

/**
 * Curated archival selection — favors crowd scenes, tables, street
 * gatherings, and night shots across regions. Order is editorial, not
 * alphabetical. Used by the About page Archive wall and hero photos.
 */
export const ARCHIVE: PizzaPhoto[] = [
  // Africa — strong turnout, outdoor scenes
  photo("lagos",         "01.jpg",  { city: "Lagos",          country: "Nigeria",      flag: "🇳🇬", year: 2025, note: "First party in Lagos" }),
  photo("nairobi",       "01.jpg",  { city: "Nairobi",        country: "Kenya",        flag: "🇰🇪", year: 2025, note: "Under open skies" }),
  photo("kaduna",        "03.jpg",  { city: "Kaduna",         country: "Nigeria",      flag: "🇳🇬", year: 2025 }),
  photo("akwa-ibom",     "07.jpg",  { city: "Akwa Ibom",      country: "Nigeria",      flag: "🇳🇬", year: 2025 }),
  photo("anambra",       "05.jpg",  { city: "Anambra",        country: "Nigeria",      flag: "🇳🇬", year: 2025 }),
  photo("cape-town",     "01.jpg",  { city: "Cape Town",      country: "South Africa", flag: "🇿🇦", year: 2025, note: "Table Mountain views" }),
  photo("kampala",       "02.jpg",  { city: "Kampala",        country: "Uganda",       flag: "🇺🇬", year: 2025 }),
  photo("kara",          "03.jpg",  { city: "Kara",           country: "Togo",         flag: "🇹🇬", year: 2025 }),
  photo("mwanza",        "01.jpg",  { city: "Mwanza",         country: "Tanzania",     flag: "🇹🇿", year: 2025 }),
  photo("ouagadougou",   "02.jpg",  { city: "Ouagadougou",    country: "Burkina Faso", flag: "🇧🇫", year: 2025 }),
  photo("johannesburg",  "02.jpg",  { city: "Johannesburg",   country: "South Africa", flag: "🇿🇦", year: 2025 }),
  photo("calavi",        "03.png",  { city: "Calavi",         country: "Benin",        flag: "🇧🇯", year: 2025 }),
  photo("harare",        "02.jpg",  { city: "Harare",         country: "Zimbabwe",     flag: "🇿🇼", year: 2025 }),

  // Americas — large urban gatherings
  photo("new-york-city", "01.png",  { city: "New York",       country: "USA",          flag: "🇺🇸", year: 2025, note: "Brooklyn rooftop" }),
  photo("buenos-aires",  "03.jpg",  { city: "Buenos Aires",   country: "Argentina",    flag: "🇦🇷", year: 2025, note: "Tango and margherita" }),
  photo("detroit",       "04.jpg",  { city: "Detroit",        country: "USA",          flag: "🇺🇸", year: 2025 }),
  photo("chicago",       "02.jpg",  { city: "Chicago",        country: "USA",          flag: "🇺🇸", year: 2025 }),
  photo("austin",        "05.jpg",  { city: "Austin",         country: "USA",          flag: "🇺🇸", year: 2025 }),
  photo("bogota",        "03.jpg",  { city: "Bogotá",         country: "Colombia",     flag: "🇨🇴", year: 2025, note: "Andean altitude bites" }),
  photo("gualeguaychu-entre-rios", "05.jpg", { city: "Gualeguaychú", country: "Argentina", flag: "🇦🇷", year: 2025 }),
  photo("los-angeles",   "04.jpg",  { city: "Los Angeles",    country: "USA",          flag: "🇺🇸", year: 2025 }),
  photo("rio-de-janeiro","02.jpg",  { city: "Rio de Janeiro", country: "Brazil",       flag: "🇧🇷", year: 2025, note: "Carioca celebrations" }),
  photo("medellin",      "01.jpg",  { city: "Medellín",       country: "Colombia",     flag: "🇨🇴", year: 2025 }),
  photo("halifax",       "03.jpg",  { city: "Halifax",        country: "Canada",       flag: "🇨🇦", year: 2025 }),
  photo("quito",         "02.jpg",  { city: "Quito",          country: "Ecuador",      flag: "🇪🇨", year: 2025 }),
  photo("philadelphia",  "02.jpg",  { city: "Philadelphia",   country: "USA",          flag: "🇺🇸", year: 2025 }),
  photo("guatemala-city","02.jpg",  { city: "Guatemala City", country: "Guatemala",    flag: "🇬🇹", year: 2025 }),
  photo("montreal",      "02.jpg",  { city: "Montreal",       country: "Canada",       flag: "🇨🇦", year: 2025, note: "Mile End vibes" }),

  // Asia — varied scale & light
  photo("bangkok",       "01.jpg",  { city: "Bangkok",        country: "Thailand",     flag: "🇹🇭", year: 2025, note: "Streetside pies" }),
  photo("bangalore",     "01.jpg",  { city: "Bangalore",      country: "India",        flag: "🇮🇳", year: 2025 }),
  photo("chandigarh",    "03.jpg",  { city: "Chandigarh",     country: "India",        flag: "🇮🇳", year: 2025 }),
  photo("beijing",       "01.jpg",  { city: "Beijing",        country: "China",        flag: "🇨🇳", year: 2025 }),
  photo("ahmedabad",     "01.jpg",  { city: "Ahmedabad",      country: "India",        flag: "🇮🇳", year: 2025 }),
];

/** Find a single photo by city name (case-insensitive). */
export const findPhoto = (city: string): PizzaPhoto | undefined =>
  ARCHIVE.find((p) => p.city.toLowerCase() === city.toLowerCase());
