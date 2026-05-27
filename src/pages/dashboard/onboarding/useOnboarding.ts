import { useCallback, useEffect, useState } from "react";
import { ONBOARDING_STEPS, type StepId } from "./steps";

const KEY = "pd-onboarding-v1";

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

/**
 * New-member onboarding state. Local-only for now; swap to backend once auth
 * and member profiles land. The "made member" moment fires when all 5 steps
 * are complete — at which point we also flip the legacy `pd-made` flag so the
 * status strip and the rest of the dashboard surface.
 */
export const useOnboarding = () => {
  const [state, setState] = useState<State>(() => read());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
    if (state.completed.length === ONBOARDING_STEPS.length) {
      localStorage.setItem("pd-made", "1");
    }
  }, [state]);

  const completeStep = useCallback((id: StepId) => {
    setState((prev) =>
      prev.completed.includes(id)
        ? prev
        : { completed: [...prev.completed, id] },
    );
  }, []);

  const reset = useCallback(() => {
    setState({ completed: [] });
    localStorage.removeItem("pd-made");
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
    completeStep,
    reset,
  };
};
