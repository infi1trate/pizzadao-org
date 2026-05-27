/**
 * ConceptExplainer — a tiny "?" affordance that opens a one-card explainer
 * in Benny's voice. Used contextually at the first appearance of each of
 * the four core concepts: $PEP, Levels, Bounties, Vouches.
 *
 * Rules:
 *  - Quiet by default. Never blocks the primary action.
 *  - One-liner + one "how it works" line + one example. Then dismiss.
 *  - No glossary page; no dumping all four on the dashboard.
 */

import { HelpCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ConceptKey = "pep" | "levels" | "bounties" | "vouches";

type Concept = {
  verb: string;          // EARN / GROW / CLAIM / TRUST
  title: string;         // e.g. "$PEP"
  oneLiner: string;      // the pinned one-liner
  how: string;           // one short "how it works" line
  example: string;       // one example
};

const CONCEPTS: Record<ConceptKey, Concept> = {
  pep: {
    verb: "Earn",
    title: "$PEP",
    oneLiner: "Pepperoni you earn for showing up. Spend it in the shop.",
    how: "Finish a mission, claim a bounty, or get vouched in — $PEP lands in your wallet.",
    example: "Ship a poster for a Party? +50 $PEP. Trade it for a slice, an NFT, or just stack it.",
  },
  levels: {
    verb: "Grow",
    title: "Levels & missions",
    oneLiner: "Your path from Pizza Trainee to Made Mafia.",
    how: "One level lights up at a time. Finish its mission, get the reward, the next one opens.",
    example: "Lv.2 asks you to introduce yourself in #show-and-tell. That's it — you're moving.",
  },
  bounties: {
    verb: "Claim",
    title: "Bounties",
    oneLiner: "Open jobs anyone can grab. First to finish gets paid.",
    how: "Browse the board, claim one that fits, submit your work. Approved = $PEP in your wallet.",
    example: "“Design a flyer for Global Pizza Party — 1,337 $PEP.” You claim it, you ship it, you eat.",
  },
  vouches: {
    verb: "Trust",
    title: "Vouches",
    oneLiner: "Who in the family vouches for you. Your reputation, made visible.",
    how: "Members vouch for people they've worked with. The more vouches, the more trusted the name.",
    example: "Three Capos vouched for you on the Tech crew? That opens doors no badge ever could.",
  },
};

type Props = {
  concept: ConceptKey;
  /** Optional aria label override. Defaults to "What's $PEP?" style. */
  label?: string;
  /** Visual size of the trigger dot. Defaults to "sm". */
  size?: "sm" | "md";
  className?: string;
};

const ConceptExplainer = ({ concept, label, size = "sm", className }: Props) => {
  const c = CONCEPTS[concept];
  const dot =
    size === "md"
      ? "h-6 w-6"
      : "h-[18px] w-[18px]";
  const icon = size === "md" ? "h-4 w-4" : "h-3 w-3";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label ?? `What is ${c.title}?`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-ink/55 transition-colors hover:bg-ink/[0.12] hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
            dot,
            className,
          )}
        >
          <HelpCircle className={icon} strokeWidth={2.2} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        className="w-[300px] rounded-2xl border border-[hsl(var(--rule-warm))]/60 bg-cream p-0 shadow-[var(--shadow-soft)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-tomato">
            {c.verb}
          </p>
          <h3 className="font-display mt-1 text-[18px] font-extrabold leading-tight tracking-tight text-ink">
            {c.title}
          </h3>
          <p className="mt-2 text-[13.5px] leading-snug text-ink">
            {c.oneLiner}
          </p>
          <p className="mt-3 text-[12.5px] leading-snug text-ink/70">
            <span className="ui font-semibold text-ink/55">How it works · </span>
            {c.how}
          </p>
          <p className="mt-2 text-[12.5px] italic leading-snug text-ink/65">
            {c.example}
          </p>
          <p className="handwritten mt-3 text-[14px] text-ink/45">— Benny</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ConceptExplainer;
