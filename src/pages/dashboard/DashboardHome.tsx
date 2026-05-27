import MakingMemberCard from "./onboarding/MakingMemberCard";
import MadeCelebration from "./onboarding/MadeCelebration";
import { useOnboarding } from "./onboarding/useOnboarding";
import NextMoveCard from "./NextMoveCard";
import { useNextMove } from "./useNextMove";

/**
 * Dashboard Home — three states:
 *   1. Onboarding (5/5 not yet complete)     → greeting + MakingMemberCard
 *   2. The "You're made" moment (once)        → MadeCelebration
 *   3. Returning made member                  → full dashboard (filled next prompt)
 *
 * The status strip and the rest of the feature set stay hidden until state 3.
 */
const DashboardHome = () => {
  const { done, showCelebration, finishCelebration } = useOnboarding();

  // State 2 — one-time celebration. Card transforms in place; the surrounding
  // page chrome stays put so the moment feels grounded, not modal.
  if (showCelebration) {
    return (
      <section className="pb-28 md:pb-0">
        <MadeCelebration onEnter={finishCelebration} />
      </section>
    );
  }

  // State 1 — new member, still walking the 5 steps.
  if (!done) {
    return (
      <section className="pb-28 md:pb-0">
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
          § A note from Benny
        </p>
        <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.94] tracking-tight">
          Welcome to{" "}
          <span className="handwritten text-tomato">the family</span>.
          <br />
          Let&rsquo;s get you made.
        </h1>
        <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink/70">
          Five quick things, then the rest of the kitchen opens up.
        </p>

        <div className="mt-10">
          <MakingMemberCard />
        </div>
      </section>
    );
  }

  // State 3 — returning member home. Placeholder until the next prompt.
  return (
    <section className="pb-28 md:pb-0">
      <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
        § Members
      </p>
      <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.92] tracking-tight">
        Welcome back to{" "}
        <span className="handwritten text-tomato">the family</span>.
      </h1>
      <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink/70">
        Your single next move lands here.
      </p>
    </section>
  );
};

export default DashboardHome;
