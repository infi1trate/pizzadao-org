import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Window from "../components/Window";
import PulseBar from "./PulseBar";
import FeedItemCard from "./FeedItemCard";
import { getFeed } from "./feedData";

/**
 * /dashboard/feed — the full "family is cooking" pulse.
 *
 * Same data + components as the home-page split-hero version, but
 * expanded: full feed, no truncation of count, pulse bar pinned at top.
 */
const FeedPage = () => {
  const entries = getFeed();

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <Link
        to="/dashboard"
        className="ui inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to the kitchen
      </Link>

      <header className="mt-4 max-w-[60ch]">
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
          § The family is cooking
        </p>
        <h1 className="font-display mt-2 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[0.96] tracking-tight">
          Every voice in the kitchen,{" "}
          <span className="handwritten text-tomato">all at once</span>.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
          Posts about us on X, threads from Discord, and the small moments
          that happen between members. Newest on top.
        </p>
      </header>

      <div className="mt-6">
        <PulseBar />
      </div>

      <Window
        label="Live feed"
        sticker={<LiveDot />}
        bodyClassName="p-3 md:p-4"
        className="mt-4"
      >
        <ul className="flex flex-col gap-3">
          {entries.map((e) => (
            <li key={e.id}>
              <FeedItemCard entry={e} />
            </li>
          ))}
        </ul>
      </Window>
    </section>
  );
};

const LiveDot = () => (
  <span className="relative inline-flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
  </span>
);

export default FeedPage;
