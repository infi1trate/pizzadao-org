import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Window from "../components/Window";
import PulseBar from "../feed/PulseBar";
import FeedItemCard from "../feed/FeedItemCard";
import { getFeed } from "../feed/feedData";

/**
 * "The family is cooking" — right half of the home split hero.
 *
 * Top ~5 entries of the live pulse feed. The compact version of what
 * lives in full at /dashboard/feed. Three sources interleaved
 * chronologically: X posts, Discord activity, member moments.
 *
 * Pulse bar pinned above the list; a quiet live dot in the window
 * sticker slot to communicate "this is real-time" even when polling.
 */
const FamilyFeed = () => {
  const entries = getFeed().slice(0, 5);

  return (
    <Window
      label="The family is cooking"
      sticker={<LiveDot />}
      bodyClassName="p-3 md:p-4"
    >
      <PulseBar compact />

      <ul className="mt-3 flex flex-col gap-2.5">
        {entries.map((e) => (
          <li key={e.id}>
            <FeedItemCard entry={e} />
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between px-1 pt-2">
        <span className="ui text-[11px] uppercase tracking-[0.18em] text-ink/45">
          Live across the family
        </span>
        <Link
          to="/dashboard/feed"
          className="ui inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-ink/75 hover:text-ink"
        >
          <span className="whitespace-nowrap">See all</span>
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </div>
    </Window>
  );
};

const LiveDot = () => (
  <span className="relative inline-flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
  </span>
);

export default FamilyFeed;
