import { useCallback, useEffect, useState } from "react";
import { LEVELS, type MissionStatus } from "./levels";

const KEY = "pd-path-v1";

type State = {
  // missionId → status
  missions: Record<string, MissionStatus>;
};

const read = (): State => {
  if (typeof window === "undefined") return { missions: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { missions: {} };
    const parsed = JSON.parse(raw) as State;
    return { missions: parsed.missions ?? {} };
  } catch {
    return { missions: {} };
  }
};

/**
 * Path state — tracks per-mission status and derives the current level.
 * Local-only scaffolding; swap to backend once missions/reviews exist.
 *
 * A level is "complete" when every one of its missions is approved.
 * The current level is the lowest level that is not yet complete.
 */
export const usePath = () => {
  const [state, setState] = useState<State>(() => read());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const setMission = useCallback((id: string, status: MissionStatus) => {
    setState((prev) => ({
      missions: { ...prev.missions, [id]: status },
    }));
  }, []);

  const missionStatus = (id: string): MissionStatus =>
    state.missions[id] ?? "open";

  const levelComplete = (lvlIndex: number) =>
    LEVELS[lvlIndex].missions.every((m) => missionStatus(m.id) === "approved");

  const currentLevelIndex = (() => {
    const idx = LEVELS.findIndex((_, i) => !levelComplete(i));
    return idx === -1 ? LEVELS.length - 1 : idx;
  })();

  return {
    levels: LEVELS,
    currentLevelIndex,
    levelComplete,
    missionStatus,
    setMission,
  };
};
