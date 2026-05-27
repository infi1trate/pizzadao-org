import { useCallback, useEffect, useState } from "react";
import { ONBOARDING_STEPS, type StepId } from "./steps";

const KEY = "pd-onboarding-v1";
const CELEBRATED_KEY = "pd-celebrated";
const BONUS_KEY = "pd-welcome-bonus";
export const WELCOME_BONUS_PEP = 69;

type State = { completed: StepId[] };

const read = (): State => {
  if (typeof window === "undefined") return { completed: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [] };
    const parsed = JSON.parse(raw) as State;
    return { completed: Array.isArray(parsed.completed) ? parsed.completed : [] };
  } catch {
    return { completed: [] };
  }
};

const readFlag = (k: string) =>
  typeof window !== "undefined" && localStorage.getItem(k) === "1";

/**
 * New-member onboarding state. Local-only for now; swap to backend once auth
 * and member profiles land.
 *
 * Lifecycle:
 *   incomplete → done (5/5)
 *      ↓ first time `done` is observed
 *      celebration fires once (gated by `pd-celebrated`)
 *      welcome bonus of 69 $PEP is granted once (gated by `pd-welcome-bonus`)
 *      `pd-made` flag flips → status strip + returning-member dashboard unlock
 */
export const useOnboarding = () => {
  const [state, setState] = useState<State>(() => read());
  const [celebrated, setCelebrated] = useState<boolean>(() =>
    readFlag(CELEBRATED_KEY),
  );

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const completeStep = useCallback((id: StepId) => {
    setState((prev) =>
      prev.completed.includes(id)
        ? prev
        : { completed: [...prev.completed, id] },
    );
  }, []);

  const finishCelebration = useCallback(() => {
    // Grant the one-time welcome bonus (initiation, not wage).
    if (!readFlag(BONUS_KEY)) {
      localStorage.setItem(BONUS_KEY, "1");
      localStorage.setItem("pd-pep", String(WELCOME_BONUS_PEP));
    }
    localStorage.setItem(CELEBRATED_KEY, "1");
    localStorage.setItem("pd-made", "1");
    setCelebrated(true);
  }, []);

  const reset = useCallback(() => {
    setState({ completed: [] });
    localStorage.removeItem("pd-made");
    localStorage.removeItem(CELEBRATED_KEY);
    localStorage.removeItem(BONUS_KEY);
    localStorage.removeItem("pd-pep");
    setCelebrated(false);
  }, []);

  const isComplete = (id: StepId) => state.completed.includes(id);
  const activeStep = ONBOARDING_STEPS.find((s) => !isComplete(s.id)) ?? null;
  const done = state.completed.length === ONBOARDING_STEPS.length;

  return {
    completedCount: state.completed.length,
    total: ONBOARDING_STEPS.length,
    isComplete,
    activeStep,
    done,
    celebrated,
    showCelebration: done && !celebrated,
    completeStep,
    finishCelebration,
    reset,
  };
};
