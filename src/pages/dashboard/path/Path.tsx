import { useState } from "react";
import { Check, Lock, ArrowRight, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEVELS, type Level, type Mission, type MissionStatus } from "./levels";
import { usePath } from "./usePath";
import ConceptExplainer from "../explainers/ConceptExplainer";

/**
 * The Path — vertical leveling trail (Lv.1 → Lv.10).
 * Separate system from onboarding. Frame: growth, not setup.
 *
 * Node states:
 *  - done    : filled disc, quiet green check
 *  - current : single glowing butter disc, expandable to reveal missions
 *  - locked  : muted, name + reward visible as aspiration
 *
 * Mission states (member-facing only — no admin review controls here):
 *  - open      → "Submit evidence" CTA (the only loud element)
 *  - pending   → "Pending review" chip
 *  - approved  → green check + "+N $PEP earned"
 */

const formatPep = (n: number) => n.toLocaleString("en-US");

const StatusChip = ({ status, reward }: { status: MissionStatus; reward?: number }) => {
  if (status === "approved") {
    return (
      <span className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[hsl(140_45%_92%)] px-2.5 py-1 text-[11px] font-semibold text-[hsl(140_45%_28%)]">
        <Check className="h-3 w-3" strokeWidth={2.6} />
        Approved{reward ? ` · +${formatPep(reward)} $PEP` : ""}
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink/[0.06] px-2.5 py-1 text-[11px] font-semibold text-ink/65">
        <Hourglass className="h-3 w-3" strokeWidth={2} />
        Pending review
      </span>
    );
  }
  return null;
};

type MissionRowProps = {
  mission: Mission;
  status: MissionStatus;
  reward?: number;
  isPrimary: boolean;
  onSubmit: (id: string) => void;
};

const MissionRow = ({ mission, status, reward, isPrimary, onSubmit }: MissionRowProps) => {
  const [evidence, setEvidence] = useState("");

  return (
    <div
      className={cn(
        "rounded-2xl px-4 py-4 md:px-5",
        status === "approved"
          ? "bg-cream/60"
          : status === "pending"
            ? "bg-cream"
            : "bg-cream ring-1 ring-ink/10",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4
            className={cn(
              "font-display text-[18px] font-extrabold leading-tight tracking-tight",
              status === "approved" ? "text-ink/65 line-through decoration-ink/20" : "text-ink",
            )}
          >
            {mission.title}
          </h4>
          <p className="mt-1 text-[13px] leading-snug text-ink/65">
            {mission.description}
          </p>
        </div>
        <StatusChip status={status} reward={reward} />
      </div>

      {status === "open" && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder={mission.evidencePrompt}
            className="ui min-w-0 flex-1 rounded-full border border-[hsl(var(--rule-warm))]/60 bg-cream px-4 py-2.5 text-[13px] text-ink placeholder:text-ink/40 focus:border-ink/30 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onSubmit(mission.id)}
            disabled={!evidence.trim()}
            className={cn(
              "btn-pill inline-flex whitespace-nowrap disabled:opacity-50",
              // Path lives below the hero in the hierarchy — keep the only red
              // for the "Do this next" CTA. Path's primary action is ink.
              isPrimary
                ? "bg-ink text-cream hover:bg-ink/85"
                : "bg-ink/[0.08] text-ink hover:bg-ink/[0.14]",
            )}
            style={{ ["--button-radius" as never]: "9999px" }}
          >
            <span className="whitespace-nowrap">Submit evidence</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
};

type NodeProps = {
  level: Level;
  state: "done" | "current" | "locked";
  expanded: boolean;
  onToggle: () => void;
  primaryMissionId: string | null;
  missionStatus: (id: string) => MissionStatus;
  onSubmitMission: (id: string) => void;
  isLast: boolean;
};

const LevelNode = ({
  level,
  state,
  expanded,
  onToggle,
  primaryMissionId,
  missionStatus,
  onSubmitMission,
  isLast,
}: NodeProps) => {
  const disc =
    state === "done"
      ? "bg-[hsl(140_45%_45%)] text-cream"
      : state === "current"
        ? "bg-butter text-ink ring-4 ring-butter/40"
        : "bg-ink/[0.06] text-ink/45";

  return (
    <li className="relative pl-16 md:pl-20">
      {/* Trail line */}
      {!isLast && (
        <span
          aria-hidden
          className={cn(
            "absolute left-[27px] top-14 h-[calc(100%-2.5rem)] w-px md:left-[35px]",
            state === "done" ? "bg-[hsl(140_45%_45%)]/40" : "bg-[hsl(var(--rule-warm))]/60",
          )}
        />
      )}

      {/* Disc */}
      <span
        className={cn(
          "absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_1px_2px_hsl(30_20%_12%/0.06)] md:h-[70px] md:w-[70px]",
          disc,
        )}
        aria-hidden
      >
        {state === "done" ? (
          <Check className="h-6 w-6" strokeWidth={2.6} />
        ) : state === "locked" ? (
          <Lock className="h-5 w-5" strokeWidth={2} />
        ) : (
          <span className="font-display text-[20px] font-extrabold">
            {level.n}
          </span>
        )}
      </span>

      {/* Header row — clickable when current */}
      <button
        type="button"
        onClick={state === "current" ? onToggle : undefined}
        disabled={state !== "current"}
        className={cn(
          "block w-full text-left",
          state === "current" && "group",
        )}
      >
        <p
          className={cn(
            "ui text-[11px] uppercase tracking-[0.22em]",
            state === "current" ? "text-tomato" : "text-ink/45",
          )}
        >
          § Level {level.n}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3
            className={cn(
              "font-display text-[clamp(1.25rem,2.4vw,1.625rem)] font-extrabold leading-tight tracking-tight",
              state === "locked" ? "text-ink/55" : "text-ink",
            )}
          >
            {level.name}
          </h3>
          <span
            className={cn(
              "ui text-[13px] font-semibold tabular-nums",
              state === "current" ? "text-ink/80" : "text-ink/50",
            )}
          >
            {formatPep(level.reward)} $PEP
          </span>
        </div>
      </button>

      {/* Missions — only when current and expanded */}
      {state === "current" && expanded && (
        <div className="mt-4 space-y-3 pb-10">
          {level.missions.map((m) => (
            <MissionRow
              key={m.id}
              mission={m}
              status={missionStatus(m.id)}
              reward={
                level.missions.length === 1 ? level.reward : undefined
              }
              isPrimary={primaryMissionId === m.id}
              onSubmit={onSubmitMission}
            />
          ))}
        </div>
      )}

      {/* Spacer when current is collapsed or for done/locked rows */}
      {!(state === "current" && expanded) && <div className="pb-8 md:pb-10" />}
    </li>
  );
};

const Path = () => {
  const { currentLevelIndex, levelComplete, missionStatus, setMission } = usePath();
  const [expanded, setExpanded] = useState(true);

  // The "primary" mission inside the current level is the first one still open —
  // that's the one node lit up Duolingo-style.
  const currentLevel = LEVELS[currentLevelIndex];
  const primaryMissionId =
    currentLevel.missions.find((m) => missionStatus(m.id) === "open")?.id ?? null;

  const handleSubmit = (missionId: string) => {
    setMission(missionId, "pending");
    // Simulate review approval. Replace with real flow when reviews land.
    setTimeout(() => setMission(missionId, "approved"), 1400);
  };

  return (
    <section className="mt-12">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <p className="ui text-[11px] uppercase tracking-[0.22em] text-ink/55">
            § The Path
          </p>
          <ConceptExplainer concept="levels" />
        </div>
        <h2 className="font-display mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1] tracking-tight">
          Your path from{" "}
          <span className="handwritten text-tomato">Pizza Trainee</span> to{" "}
          <span className="handwritten text-tomato">Made Mafia</span>.
        </h2>
        <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-ink/65">
          Ten levels. One node lit up at a time. Move at your own pace —
          there&rsquo;s no clock.
        </p>
      </header>

      <ol className="relative">
        {LEVELS.map((level, i) => {
          const state: "done" | "current" | "locked" = levelComplete(i)
            ? "done"
            : i === currentLevelIndex
              ? "current"
              : "locked";
          return (
            <LevelNode
              key={level.n}
              level={level}
              state={state}
              expanded={expanded && state === "current"}
              onToggle={() => setExpanded((v) => !v)}
              primaryMissionId={primaryMissionId}
              missionStatus={missionStatus}
              onSubmitMission={handleSubmit}
              isLast={i === LEVELS.length - 1}
            />
          );
        })}
      </ol>
    </section>
  );
};

export default Path;
