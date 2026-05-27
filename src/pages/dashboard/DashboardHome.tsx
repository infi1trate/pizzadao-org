import MakingMemberCard from "./onboarding/MakingMemberCard";
import MadeCelebration from "./onboarding/MadeCelebration";
import { useOnboarding } from "./onboarding/useOnboarding";
import NextMovePanel from "./home/NextMovePanel";
import FamilyFeed from "./home/FamilyFeed";
import WeekStrip from "./home/WeekStrip";
import FridayRecap from "./home/FridayRecap";
import NukeAccount from "./NukeAccount";
import Window from "./components/Window";
import FeedItemCard from "./feed/FeedItemCard";
import { getFeed } from "./feed/feedData";

/**
 * Dashboard Home — "the kitchen".
 *
 * Three states:
 *   1. New member (5-step onboarding not yet complete) — sheltered
 *      antechamber: full-width onboarding card + a tiny faded teaser of
 *      "The family is cooking" so they can see what's behind the door.
 *      Everything else (status strip, Your Week, Friday recap, full feed)
 *      stays hidden.
 *   2. One-time "you're made" celebration after 5/5 completes.
 *   3. Returning member — the actual kitchen:
 *        Split hero: [Your next move] | [The family is cooking]
 *        Your week, Friday recap (Fridays only).
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
    return <NewMemberHome />;
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

/* ------------------------------------------------------------------------ */
/* New member — sheltered antechamber                                       */
/* ------------------------------------------------------------------------ */

const NewMemberHome = () => {
  const teaser = getFeed().slice(0, 3);

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      {/* Full-width onboarding card */}
      <Window
        label="Becoming a made member"
        sticker="🍕"
        bodyClassName="p-6 md:p-8"
      >
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
          § A note from Benny
        </p>
        <h1 className="font-display mt-3 text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold leading-[0.96] tracking-[-0.015em] text-ink">
          Welcome to{" "}
          <span className="handwritten text-tomato">the family</span>.
          <br />
          Let&rsquo;s get you made.
        </h1>
        <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-ink/65">
          Five quick things, then the kitchen opens up.
        </p>
        <div className="mt-8">
          <MakingMemberCard />
        </div>
      </Window>

      {/* Teaser: tiny, faded glimpse of the live feed */}
      <Window
        label="A taste of what's cooking"
        sticker="👀"
        tone="paper"
        bodyClassName="p-3 md:p-4"
        className="mt-6"
      >
        <p className="ui mb-3 px-1 text-[11px] uppercase tracking-[0.18em] text-ink/45">
          Unlocks once you&rsquo;re made
        </p>
        <ul
          className="flex flex-col gap-2.5 opacity-60 pointer-events-none select-none"
          aria-hidden
        >
          {teaser.map((e) => (
            <li key={e.id}>
              <FeedItemCard entry={e} />
            </li>
          ))}
        </ul>
      </Window>

      <NukeAccount />
    </section>
  );
};

export default DashboardHome;
