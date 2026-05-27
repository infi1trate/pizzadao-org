import { Heart, MessageCircle, MoreHorizontal, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  type FeedEntry,
  type XEntry,
  type DiscordEntry,
  type MomentEntry,
  type Engagement,
  timeAgo,
  compactCount,
} from "./feedData";

/**
 * A single feed card. Light window chrome — title bar with source label
 * + three-dot menu, then content. Each card type renders its own body,
 * but the chrome and the engagement-loop CTA are shared.
 *
 * The cards intentionally stay small. Density > grandeur.
 */

const XLogo = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 1200 1227" aria-hidden className={className} fill="currentColor">
    <path d="M714 519 1160 0H1054L667 450 358 0H0l468 681L0 1227h106l409-476 327 476h358L714 519Zm-145 169-47-68L144 79h163l305 437 47 68 396 567H891L569 688Z" />
  </svg>
);

const DiscordLogo = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a13.21 13.21 0 0 0-.617 1.25 18.4 18.4 0 0 0-5.487 0A12.4 12.4 0 0 0 9.83 3a19.74 19.74 0 0 0-3.762 1.37C2.5 9.546 1.54 14.6 2.02 19.58a19.92 19.92 0 0 0 5.99 3.02c.486-.66.92-1.36 1.292-2.1a12.9 12.9 0 0 1-2.04-.97c.171-.126.339-.258.5-.39 3.95 1.82 8.22 1.82 12.12 0 .164.132.331.264.501.39-.65.385-1.337.71-2.043.973.374.74.808 1.44 1.292 2.1a19.86 19.86 0 0 0 5.992-3.03c.561-5.78-.96-10.79-4.31-15.21ZM9.68 16.49c-1.18 0-2.16-1.09-2.16-2.43 0-1.34.95-2.43 2.16-2.43 1.21 0 2.18 1.1 2.16 2.43 0 1.34-.95 2.43-2.16 2.43Zm4.64 0c-1.18 0-2.16-1.09-2.16-2.43 0-1.34.95-2.43 2.16-2.43 1.21 0 2.18 1.1 2.16 2.43 0 1.34-.95 2.43-2.16 2.43Z" />
  </svg>
);

const BennyPepperoni = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className}>
    <circle cx="12" cy="12" r="10" fill="hsl(var(--tomato))" />
    <circle cx="8" cy="9" r="1.4" fill="hsl(var(--tomato-deep))" />
    <circle cx="15" cy="8" r="1.1" fill="hsl(var(--tomato-deep))" />
    <circle cx="14" cy="15" r="1.6" fill="hsl(var(--tomato-deep))" />
    <circle cx="8.5" cy="15" r="1.2" fill="hsl(var(--tomato-deep))" />
  </svg>
);

type Props = { entry: FeedEntry };

const FeedItemCard = ({ entry }: Props) => {
  const meta = getSourceMeta(entry);

  const open = () => {
    if (entry.href) window.open(entry.href, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="group relative rounded-2xl bg-cream ring-1 ring-ink/10 shadow-[0_1px_2px_hsl(30_20%_12%/0.04),0_6px_18px_-12px_hsl(30_20%_12%/0.18)] transition-all hover:-translate-y-px hover:shadow-[0_2px_4px_hsl(30_20%_12%/0.05),0_14px_32px_-18px_hsl(30_20%_12%/0.22)]">
      {/* light window chrome — title bar only */}
      <header className="flex items-center gap-2 border-b border-ink/[0.07] px-3 py-1.5">
        <span className="inline-flex h-4 w-4 items-center justify-center text-ink/70">
          {meta.icon}
        </span>
        <span className="ui text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
          {meta.label}
        </span>
        <span className="ui ml-auto text-[10.5px] uppercase tracking-[0.18em] text-ink/40">
          {timeAgo(entry.ts)}
        </span>
        <button
          type="button"
          aria-label="More"
          className="ml-1 -mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-ink/40 hover:bg-ink/[0.05] hover:text-ink/70"
        >
          <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </header>

      <div className="px-3 py-3">
        {entry.source === "x" && <XBody e={entry} onOpen={open} />}
        {entry.source === "discord" && <DiscordBody e={entry} onOpen={open} />}
        {entry.source === "moment" && <MomentBody e={entry} />}

        {entry.engage && <EngageCta engage={entry.engage} />}
      </div>
    </article>
  );
};

function getSourceMeta(entry: FeedEntry) {
  if (entry.source === "x")
    return { icon: <XLogo />, label: "X / @" + entry.handle.replace(/^@/, "") };
  if (entry.source === "discord")
    return {
      icon: <DiscordLogo className="h-3.5 w-3.5 text-[#5865F2]" />,
      label: `Discord · #${entry.channel}`,
    };
  return { icon: <BennyPepperoni />, label: "Family moment" };
}

// ---------- per-source bodies ----------

const Avatar = ({ emoji }: { emoji: string }) => (
  <span
    aria-hidden
    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper ring-1 ring-ink/10 text-[15px]"
  >
    {emoji}
  </span>
);

const XBody = ({ e, onOpen }: { e: XEntry; onOpen: () => void }) => (
  <button
    type="button"
    onClick={onOpen}
    className="flex w-full items-start gap-3 text-left"
  >
    <Avatar emoji={e.avatarEmoji} />
    <div className="min-w-0 flex-1">
      <p className="text-[13.5px] leading-snug">
        <span className="font-semibold text-ink">{e.displayName}</span>{" "}
        <span className="text-ink/45">{e.handle}</span>
      </p>
      <p className="mt-1 line-clamp-3 text-[14px] leading-snug text-ink/85">
        {e.text}
      </p>
      <p className="mt-2 flex items-center gap-3 text-[12px] text-ink/55">
        <span className="inline-flex items-center gap-1">
          <Heart className="h-3 w-3" strokeWidth={2} /> {compactCount(e.likes)}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle className="h-3 w-3" strokeWidth={2} />{" "}
          {compactCount(e.replies)}
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
          Open on X <ExternalLink className="h-3 w-3" strokeWidth={2} />
        </span>
      </p>
    </div>
  </button>
);

const DiscordBody = ({
  e,
  onOpen,
}: {
  e: DiscordEntry;
  onOpen: () => void;
}) => (
  <button
    type="button"
    onClick={onOpen}
    className="flex w-full items-start gap-3 text-left"
  >
    <Avatar emoji={e.avatarEmoji} />
    <div className="min-w-0 flex-1">
      <p className="text-[13.5px] leading-snug">
        <span className="font-semibold text-ink">{e.mafiaName}</span>{" "}
        <span className="text-ink/45">in #{e.channel}</span>
      </p>
      <p className="mt-1 line-clamp-3 text-[14px] leading-snug text-ink/85">
        {e.excerpt}
      </p>
    </div>
  </button>
);

const MomentBody = ({ e }: { e: MomentEntry }) => (
  <div className="flex items-start gap-3">
    <Avatar emoji={kindEmoji(e.kind)} />
    <p className="text-[14px] leading-snug text-ink/90">{e.text}</p>
  </div>
);

function kindEmoji(k: MomentEntry["kind"]) {
  switch (k) {
    case "vouch":
      return "🤝";
    case "levelup":
      return "⭐";
    case "bounty":
      return "🎯";
    case "welcome":
      return "👋";
  }
}

// ---------- engagement loops ----------

const EngageCta = ({ engage }: { engage: Engagement }) => {
  const onClick = () => {
    if (engage.kind === "vouch-back") {
      toast.success(`Vouch sent to ${engage.target}.`);
      return;
    }
    if (engage.kind === "send-pizza") {
      toast.success(`🍕 sent to ${engage.target}.`);
      return;
    }
    if (engage.kind === "reply-on-x") {
      const url = `https://x.com/intent/tweet?in_reply_to=${
        engage.tweetId
      }&text=${encodeURIComponent(engage.template)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const label =
    engage.kind === "vouch-back"
      ? "Vouch them back"
      : engage.kind === "send-pizza"
        ? "Send a 🍕"
        : "Reply on X";

  return (
    <div className="mt-3 flex">
      <button
        type="button"
        onClick={onClick}
        className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11.5px] font-semibold text-cream shadow-sm transition-transform hover:-translate-y-px hover:bg-ink-soft"
      >
        {label}
      </button>
    </div>
  );
};

export default FeedItemCard;
