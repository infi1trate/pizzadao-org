import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ONBOARDING_STEPS, type OnboardingStep, type StepId } from "./steps";
import { useOnboarding } from "./useOnboarding";

/**
 * "Becoming a Made Member" card.
 * - One step active at a time; the rest stay quiet.
 * - Tapping the active step expands its single-action flow inline.
 * - On completion, a small Benny reaction surfaces and one line of lore
 *   for that step is permanently revealed.
 *
 * This is account setup — kept visually distinct from missions/bounties:
 * no XP, no $PEP, no level pill, no leaderboard. Cream + butter only.
 */

const ProgressRing = ({ value, total }: { value: number; total: number }) => {
  const size = 64;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = total === 0 ? 0 : value / total;

  return (
    <div className="relative" aria-hidden>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--ink) / 0.10)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--ink))"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{
            transition:
              "stroke-dashoffset 0.7s cubic-bezier(0.22, 0.61, 0.24, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="ui text-[14px] font-bold tabular-nums text-ink">
          {value}
          <span className="text-ink/40">/{total}</span>
        </span>
      </div>
    </div>
  );
};

type StepRowProps = {
  step: OnboardingStep;
  index: number;
  state: "done" | "active" | "queued";
  onComplete: (id: StepId) => void;
};

const StepRow = ({ step, index, state, onComplete }: StepRowProps) => {
  const [reacting, setReacting] = useState(false);
  const number = index + 1;

  const handleComplete = () => {
    setReacting(true);
    // Tiny tactile beat before the row settles into its "done" state.
    setTimeout(() => onComplete(step.id), 420);
  };

  if (state === "queued") {
    return (
      <li className="flex items-center gap-4 py-4 opacity-45">
        <span className="ui flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--rule-warm))] text-[12px] font-semibold text-ink/55">
          {number}
        </span>
        <span className="ui text-[15px] font-medium text-ink/70">
          {step.title}
        </span>
      </li>
    );
  }

  if (state === "done") {
    return (
      <li className="flex items-start gap-4 py-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
          <Check className="h-4 w-4" strokeWidth={2.4} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="ui block text-[15px] font-medium text-ink/65 line-through decoration-ink/20">
            {step.title}
          </span>
          <span className="mt-1 block text-[13px] italic leading-snug text-ink/55">
            {step.lore}
          </span>
        </span>
      </li>
    );
  }

  // Active — the single lit-up step.
  return (
    <li className="-mx-4 rounded-2xl bg-cream px-4 py-5 ring-1 ring-ink/10 md:-mx-6 md:px-6">
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "ui flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-butter text-[12px] font-bold text-ink transition-transform",
            reacting && "scale-110",
          )}
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[20px] font-extrabold leading-tight tracking-tight text-ink">
            {step.title}
          </h3>
          <p className="mt-1.5 text-[14px] leading-snug text-ink/70">
            {step.prompt}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleComplete}
              disabled={reacting}
              className="btn-pill inline-flex whitespace-nowrap bg-ink text-cream hover:bg-tomato disabled:opacity-70"
              style={{ ["--button-radius" as never]: "9999px" }}
            >
              <span className="whitespace-nowrap">{step.cta}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>

            {reacting && (
              <span
                className="handwritten text-[15px] text-tomato"
                aria-live="polite"
              >
                nice — that&rsquo;s one.
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

const MakingMemberCard = () => {
  const { completedCount, total, isComplete, activeStep, completeStep } =
    useOnboarding();

  return (
    <div className="rounded-[28px] bg-butter/55 p-6 shadow-[0_1px_2px_hsl(30_20%_12%/0.05),0_18px_48px_-24px_hsl(30_20%_12%/0.22)] md:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="ui text-[11px] uppercase tracking-[0.22em] text-ink/55">
            § Getting started
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.02] tracking-tight">
            Becoming a made member
          </h2>
          <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-ink/70">
            Five small steps. You only ever do one at a time.
          </p>
        </div>
        <ProgressRing value={completedCount} total={total} />
      </div>

      <ul className="mt-6 divide-y divide-[hsl(var(--rule-warm))]/40">
        {ONBOARDING_STEPS.map((step, i) => {
          const state: StepRowProps["state"] = isComplete(step.id)
            ? "done"
            : activeStep?.id === step.id
              ? "active"
              : "queued";
          return (
            <StepRow
              key={step.id}
              step={step}
              index={i}
              state={state}
              onComplete={completeStep}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MakingMemberCard;
