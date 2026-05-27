import MakingMemberCard from "./onboarding/MakingMemberCard";
import { useOnboarding } from "./onboarding/useOnboarding";

/**
 * Dashboard Home.
 *
 * New members (onboarding incomplete) see ONLY:
 *   1. A warm Benny greeting
 *   2. The "Becoming a Made Member" card
 *
 * Status strip, leaderboard, $PEP, bounties, shop, missions L2+, vouches-given
 * are all hidden until the family has "made" them. Understanding accrues
 * through doing — never a wall of explanatory text.
 */
const DashboardHome = () => {
  const { done } = useOnboarding();

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

  // Made-member home — placeholder until the next prompt fills it in.
  return (
    <section className="pb-28 md:pb-0">
      <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
        § Members
      </p>
      <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.92] tracking-tight">
        You&rsquo;re <span className="handwritten text-tomato">in</span>.
      </h1>
      <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink/70">
        Your single next move lands here.
      </p>
    </section>
  );
};

export default DashboardHome;
