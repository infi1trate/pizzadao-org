import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Window from "../components/Window";

/**
 * "The family is cooking" — right half of the home split hero.
 *
 * Top ~5 items of the family activity feed, with a quiet "see all" link to
 * the full feed page (built later). Window-chrome panel, peer-weight with
 * the Next Move card. No metrics, no dashboards — this is social pulse.
 *
 * Data is placeholder for now; swap to a real feed when activity events
 * land. Items are deliberately small, frequent, and human.
 */

type FeedItem = {
  who: string;
  avatar: string;      // emoji sticker for now
  verb: string;        // sentence-case verb
  what: string;        // short object phrase
  whereHref?: string;  // optional link target
  whereLabel?: string; // optional inline link label
  whenAgo: string;     // "2m" | "1h"
  tone?: "default" | "celebrate"; // celebrate = pinned butter row
};

const FEED: FeedItem[] = [
  { who: "Mira",      avatar: "🎨", verb: "claimed",  what: "the Mexico City poster bounty",       whenAgo: "2m" },
  { who: "Naveen",    avatar: "👋", verb: "joined",   what: "the family",                          whenAgo: "14m", tone: "celebrate" },
  { who: "Ivy",       avatar: "📸", verb: "posted",   what: "a recap from Lagos",                  whereHref: "https://discord.gg/pizzadao", whereLabel: "in #show-and-tell", whenAgo: "38m" },
  { who: "Theo",      avatar: "🎤", verb: "is hosting", what: "Creative crew call",                whereLabel: "today at 6pm CET", whenAgo: "1h" },
  { who: "The kitchen", avatar: "🍕", verb: "fed",    what: "1,204 slices this week",             whenAgo: "today" },
];

const Row = ({ item }: { item: FeedItem }) => {
  const celebrate = item.tone === "celebrate";
  return (
    <li
      className={
        "group relative flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors " +
        (celebrate
          ? "bg-butter/55"
          : "hover:bg-ink/[0.035]")
      }
    >
      <span
        aria-hidden
        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream ring-1 ring-ink/10 shadow-[0_1px_2px_hsl(30_25%_12%/0.08)] text-[15px]"
      >
        {item.avatar}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14.5px] leading-snug text-ink/85">
          <span className="font-semibold text-ink">{item.who}</span>{" "}
          <span className="text-ink/70">{item.verb}</span>{" "}
          <span className="text-ink">{item.what}</span>
          {item.whereLabel && (
            <>
              {" "}
              {item.whereHref ? (
                <a
                  href={item.whereHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/65 underline decoration-ink/20 underline-offset-2 hover:text-ink hover:decoration-ink/50"
                >
                  {item.whereLabel}
                </a>
              ) : (
                <span className="text-ink/55">{item.whereLabel}</span>
              )}
            </>
          )}
        </p>
        <p className="ui mt-1 text-[11px] uppercase tracking-[0.18em] text-ink/40">
          {item.whenAgo}
        </p>
      </div>
    </li>
  );
};

const FamilyFeed = () => {
  return (
    <Window label="The family is cooking" sticker="✶" bodyClassName="p-3 md:p-4">
      <ul className="flex flex-col gap-0.5">
        {FEED.map((item, i) => (
          <Row key={i} item={item} />
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between px-3 pb-1 pt-3">
        <span className="ui text-[11px] uppercase tracking-[0.18em] text-ink/45">
          Live across the family
        </span>
        <Link
          to="/dashboard/family"
          className="ui inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-ink/75 hover:text-ink"
        >
          <span className="whitespace-nowrap">See all</span>
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </div>
    </Window>
  );
};

export default FamilyFeed;
