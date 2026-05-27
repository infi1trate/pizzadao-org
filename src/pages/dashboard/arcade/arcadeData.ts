/**
 * Arcade — game embed, leaderboard, weekly earnings.
 */

export interface LeaderboardEntry {
  rank: number;
  mafiaName: string;
  avatar: string;
  score: number;
  game: string;
  date: string; // ISO, e.g. "2026-05-27"
}

export interface WeeklyStats {
  pepEarned: number;
  gamesPlayed: number;
  bestScore: number;
  rank: number;
}

export const ARCADE_URL: string | null = null; // Set when the arcade deploys.

/** Placeholder leaderboard — swap for live API when ready. */
export function getLeaderboardToday(): LeaderboardEntry[] {
  return [
    { rank: 1, mafiaName: "Don Pepperoni", avatar: "🍕", score: 12847, game: "Slice Stack", date: "2026-05-27" },
    { rank: 2, mafiaName: "The Anchovy", avatar: "🐟", score: 11203, game: "Slice Stack", date: "2026-05-27" },
    { rank: 3, mafiaName: "Hot Honey", avatar: "🍯", score: 9850, game: "Dough Dodge", date: "2026-05-27" },
    { rank: 4, mafiaName: "Sicilian Ghost", avatar: "👻", score: 9120, game: "Slice Stack", date: "2026-05-27" },
    { rank: 5, mafiaName: "Ricotta Jones", avatar: "🧀", score: 8745, game: "Oven Rush", date: "2026-05-27" },
    { rank: 6, mafiaName: "Truffle Mack", avatar: "🍄", score: 8210, game: "Slice Stack", date: "2026-05-27" },
    { rank: 7, mafiaName: "Jalapeño Jack", avatar: "🌶️", score: 7800, game: "Dough Dodge", date: "2026-05-27" },
    { rank: 8, mafiaName: "Basil Face", avatar: "🌿", score: 7432, game: "Oven Rush", date: "2026-05-27" },
    { rank: 9, mafiaName: "Meatball Tony", avatar: "🧆", score: 6900, game: "Slice Stack", date: "2026-05-27" },
    { rank: 10, mafiaName: "Oregano Sal", avatar: "🫚", score: 6540, game: "Dough Dodge", date: "2026-05-27" },
  ];
}

/** Placeholder weekly stats — swap for live API when ready. */
export function getWeeklyStats(): WeeklyStats {
  return {
    pepEarned: 420,
    gamesPlayed: 34,
    bestScore: 9850,
    rank: 3,
  };
}

/** How scoring translates to $PEP. */
export const HOW_IT_WORKS = [
  {
    title: "Play any arcade game",
    body: "Every game in the cabinet is free to play. Pick one and start slicing.",
  },
  {
    title: "Beat the daily threshold",
    body: "Cross the daily score floor and you automatically earn $PEP. Higher scores = more pepperoni.",
  },
  {
    title: "Top the board",
    body: "Finish in the top 3 for the day and get a bonus payout. The #1 spot gets a crown.",
  },
  {
    title: "$PEP lands instantly",
    body: "Your balance updates the moment a run ends. No waiting, no forms.",
  },
];
