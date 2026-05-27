import { RotateCcw } from "lucide-react";

/**
 * Quiet developer reset. Clears all local dashboard state and reloads so
 * the page renders as a fresh member. Bottom-of-page, muted styling — must
 * never compete with the primary action hierarchy.
 */

const KEYS = [
  "pd-onboarding-v1",
  "pd-celebrated",
  "pd-welcome-bonus",
  "pd-made",
  "pd-pep",
  "pd-path-v1",
  "pd-next-move-demo",
];

const NukeAccount = () => {
  const handleNuke = () => {
    if (
      !window.confirm(
        "Reset everything? This clears your progress and reloads the page.",
      )
    ) {
      return;
    }
    KEYS.forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <div className="mt-16 flex justify-center">
      <button
        type="button"
        onClick={handleNuke}
        className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[hsl(var(--rule-warm))]/50 bg-cream px-3.5 py-1.5 text-[12px] font-medium text-ink/45 transition-colors hover:border-ink/20 hover:text-ink/75"
      >
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
        Start over
      </button>
    </div>
  );
};

export default NukeAccount;
