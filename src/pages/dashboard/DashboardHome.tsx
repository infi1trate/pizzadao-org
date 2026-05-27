import MakingMemberCard from "./onboarding/MakingMemberCard";
import MadeCelebration from "./onboarding/MadeCelebration";
import { useOnboarding } from "./onboarding/useOnboarding";
import NextMovePanel from "./home/NextMovePanel";
import FamilyFeed from "./home/FamilyFeed";
import WeekStrip from "./home/WeekStrip";
import FridayRecap from "./home/FridayRecap";
import NukeAccount from "./NukeAccount";

/**
 * Dashboard Home — "the kitchen".
 *
 * Three states:
 *   1. New member (5-step onboarding not yet complete) — warm greeting + the
 *      MakingMemberCard. Nothing else competes.
 *   2. One-time "you're made" celebration after 5/5 completes.
 *   3. Returning member — the actual kitchen:
 *        Split hero: [Your next move] | [The family is cooking]   (equal peers)
 *        Your week  (next 2-3 events as a window-chrome shelf)
 *        Friday recap  (Fridays only)
 *
 * Removed from this page (intentionally):
 *   - The Path / Levels grid → /dashboard/path
 *   - The "Destinations" tile grid → replaced by top nav
 *   - "A note from Benny" as its own section → Benny lives inside the hero card
 */
const DashboardHome = () => {
  const { done, showCelebration, finishCelebration } = useOnboarding();

  if (showCelebration) {
    return (
      <section className="pb-28 md:pb-0">
        <MadeCelebration onEnter={finishCelebration} />
      </section>
    );
  }

  if (!done) {
    return (
      <section className="animate-fade-in pb-28 md:pb-0">
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
        <NukeAccount />
      </section>
    );
  }

  // Returning-member "kitchen"
  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      {/* Split hero — equal peers. Grid keeps both panels the same height. */}
      <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-7">
        <NextMovePanel />
        <FamilyFeed />
      </div>

      <WeekStrip />
      <FridayRecap />

      <NukeAccount />
    </section>
  );
};

export default DashboardHome;
