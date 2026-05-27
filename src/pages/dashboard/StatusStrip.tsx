import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ambient dashboard status strip — Duolingo-style.
 * Slim, sticky, quiet. Never dominates. Hidden for pre-onboarding members.
 *
 * Three quick reads, left → right:
 *   • Level + thin XP-to-next bar       → opens Missions / Path
 *   • $PEP balance with pepperoni mark  → opens PEP explainer / Shop
 *   • Streak (small, last)              → ambient only
 */

export type MemberStatus = {
  level: number;
  levelLabel: string;        // e.g. "Pizza Trainee"
  xp: number;
  xpToNext: number;
  pep: number;
  streakDays: number;
  alert?: boolean;           // if true, allow tomato to surface (live moment)
};

type Props = {
  status: MemberStatus | null; // null = pre-onboarding → render nothing
};

const formatPep = (n: number) => n.toLocaleString("en-US");

const PepperoniMark = ({ className }: { className?: string }) => (
  // Small pepperoni disc — warm tomato fill, faint spots. Decorative.
  <svg viewBox="0 0 20 20" aria-hidden className={className}>
    <circle cx="10" cy="10" r="9" fill="hsl(var(--tomato))" />
    <circle cx="10" cy="10" r="9" fill="none" stroke="hsl(var(--tomato-deep))" strokeOpacity="0.5" strokeWidth="0.6" />
    <circle cx="6.5" cy="7.5" r="1.1" fill="hsl(var(--tomato-deep))" opacity="0.55" />
    <circle cx="13" cy="9" r="0.9" fill="hsl(var(--tomato-deep))" opacity="0.55" />
    <circle cx="8.5" cy="13" r="1" fill="hsl(var(--tomato-deep))" opacity="0.55" />
    <circle cx="13" cy="13.5" r="0.7" fill="hsl(var(--tomato-deep))" opacity="0.55" />
  </svg>
);

const StatusStrip = ({ status }: Props) => {
  const navigate = useNavigate();
  if (!status) return null;

  const pct = Math.max(0, Math.min(100, (status.xp / status.xpToNext) * 100));
  const accent = status.alert ? "hsl(var(--tomato))" : "hsl(var(--ink))";

  return (
    <div
      className="sticky top-[57px] z-20 border-b border-[hsl(var(--rule-warm))]/40 bg-cream/90 backdrop-blur-md"
      role="region"
      aria-label="Member status"
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-5 py-2 md:gap-5 md:px-8">
        {/* Level + XP — primary tap target */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/path")}
          className="group flex min-w-0 flex-1 items-center gap-3 rounded-full px-2 py-1 text-left transition-colors hover:bg-ink/[0.04]"
          aria-label={`Level ${status.level} ${status.levelLabel}, ${status.xp} of ${status.xpToNext} XP. Open path.`}
        >
          <span className="ui inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-cream">
            Lv.{status.level}
          </span>
          <span className="min-w-0 flex-1">
            <span className="ui block truncate text-[13px] font-medium text-ink/80 group-hover:text-ink">
              {status.levelLabel}
            </span>
            <span
              className="mt-1 block h-[3px] w-full overflow-hidden rounded-full bg-ink/10"
              aria-hidden
            >
              <span
                className="block h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.24,1)]"
                style={{ width: `${pct}%`, background: accent }}
              />
            </span>
          </span>
          <span className="ui hidden shrink-0 whitespace-nowrap text-[11px] tabular-nums text-ink/50 sm:inline">
            {status.xp}/{status.xpToNext}
          </span>
        </button>

        {/* Divider */}
        <span aria-hidden className="hidden h-6 w-px bg-[hsl(var(--rule-warm))]/60 sm:block" />

        {/* $PEP balance */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/pep")}
          className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[hsl(var(--rule-warm))]/60 bg-cream px-3 py-1.5 transition-colors hover:border-ink/30 hover:bg-butter/30"
          aria-label={`${formatPep(status.pep)} PEP balance. Open shop.`}
        >
          <PepperoniMark className="h-[18px] w-[18px]" />
          <span className="ui text-[13px] font-semibold tabular-nums text-ink">
            {formatPep(status.pep)}
          </span>
          <span className="ui text-[11px] font-medium text-ink/50">$PEP</span>
        </button>

        {/* Streak — quiet, ambient */}
        <div
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5",
            status.streakDays >= 3 ? "bg-butter/40" : "bg-ink/[0.04]",
          )}
          title={`${status.streakDays}-day streak`}
        >
          <Flame
            className={cn(
              "h-[14px] w-[14px]",
              status.streakDays >= 3 ? "text-tomato" : "text-ink/50",
            )}
            strokeWidth={1.8}
          />
          <span className="ui text-[12px] font-semibold tabular-nums text-ink/75">
            {status.streakDays}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusStrip;
