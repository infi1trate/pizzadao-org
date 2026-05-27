import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronLeft, Lock, Send, Sparkles } from "lucide-react";
import Window from "../components/Window";
import { LEVELS, type Mission, type MissionStatus } from "./levels";
import { usePath } from "./usePath";

/**
 * /dashboard/path — "Your path from Pizza Trainee to Made Mafia."
 *
 * A vertical trail of 10 level nodes:
 *   • completed → quiet green, checked
 *   • current   → ONE node glowing butter, missions expand inline
 *   • future    → muted, locked, name + $PEP reward visible as aspiration
 *
 * Each mission is its own Window sub-card with: title, description, status
 * badge (Open / Pending / Approved), evidence input, and a tomato "Submit
 * evidence" CTA. When every mission in the current level becomes Approved,
 * a subtle "Level complete! +X $PEP earned" banner appears at the top of
 * the node, then the next node lights up.
 *
 * No admin review controls — members only. For demo, a discreet
 * "(mark approved)" link sits next to the Pending badge so reviewers can
 * preview the celebration path before the real review queue ships.
 */

const fmt = (n: number) => n.toLocaleString("en-US");

/* ─────────────────────── Benny — peeks behind the trail ─────────────────────── */
const BennyPeek = () => (
  <svg viewBox="0 0 120 110" className="h-20 w-20 md:h-24 md:w-24" aria-hidden>
    <path d="M10 92 L60 4 L110 92 Z" fill="hsl(var(--butter))" />
    <path
      d="M14 90 Q 35 78, 50 92 Q 65 78, 78 92 Q 92 80, 106 90 L110 92 L10 92 Z"
      fill="hsl(45 95% 75%)"
    />
    <circle cx="48" cy="60" r="6.5" fill="hsl(var(--tomato))" />
    <circle cx="74" cy="68" r="5.5" fill="hsl(var(--tomato))" />
    <circle cx="60" cy="40" r="4.5" fill="hsl(var(--tomato))" />
    <circle cx="45" cy="52" r="2.4" fill="hsl(var(--ink))" />
    <circle cx="60" cy="34" r="2.4" fill="hsl(var(--ink))" />
    <circle cx="73" cy="58" r="2.4" fill="hsl(var(--ink))" />
    <path d="M50 76 Q 60 84, 70 76" stroke="hsl(var(--ink))" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </svg>
);

/* ─────────────────────────────── Trail node ─────────────────────────────── */
type NodeState = "done" | "current" | "future";

const TrailNode = ({ n, state }: { n: number; state: NodeState }) => {
  if (state === "done") {
    return (
      <span
        aria-hidden
        className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(140_45%_42%)] text-cream shadow-[0_1px_2px_hsl(140_45%_15%/0.25),0_8px_18px_-12px_hsl(140_45%_15%/0.45)] ring-4 ring-cream"
      >
        <Check className="h-5 w-5" strokeWidth={2.5} />
      </span>
    );
  }
  if (state === "current") {
    return (
      <span
        aria-hidden
        className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-butter text-ink font-display text-[18px] font-extrabold shadow-[0_0_0_4px_hsl(46_100%_88%),0_2px_4px_hsl(30_25%_12%/0.1),0_14px_28px_-14px_hsl(40_90%_45%/0.55)] ring-4 ring-cream"
      >
        <span className="absolute inset-0 rounded-full bg-butter animate-ping opacity-40" />
        <span className="relative">{n}</span>
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(44_25%_88%)] text-ink/45 ring-4 ring-cream"
    >
      <Lock className="h-4 w-4" strokeWidth={2} />
    </span>
  );
};

/* ─────────────────────────────── Status badge ─────────────────────────────── */
const StatusBadge = ({ status }: { status: MissionStatus }) => {
  if (status === "approved") {
    return (
      <span className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[hsl(140_45%_42%)]/12 px-2.5 py-1 text-[11px] font-semibold text-[hsl(140_45%_30%)]">
        <Check className="h-3 w-3" strokeWidth={2.6} />
        Approved
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-butter/70 px-2.5 py-1 text-[11px] font-semibold text-ink/75">
        <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-ink/40" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink/70" />
        </span>
        Pending review
      </span>
    );
  }
  return (
    <span className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[hsl(var(--rule-warm))]/70 bg-cream px-2.5 py-1 text-[11px] font-semibold text-ink/60">
      Open
    </span>
  );
};

/* ─────────────────────────────── Mission card ─────────────────────────────── */
const MissionCard = ({
  mission,
  status,
  onSubmit,
  onApproveDemo,
}: {
  mission: Mission;
  status: MissionStatus;
  onSubmit: (evidence: string) => void;
  onApproveDemo: () => void;
}) => {
  const [evidence, setEvidence] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidence.trim() || status !== "open") return;
    onSubmit(evidence.trim());
  };

  return (
    <Window
      label={`Mission · Lv.${mission.id.match(/^l(\d+)/)?.[1] ?? ""}`}
      sticker="✶"
      tone={status === "approved" ? "paper" : "cream"}
      className="mt-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(1.05rem,1.6vw,1.25rem)] font-extrabold leading-tight tracking-tight text-ink">
            {mission.title}
          </h3>
          <p className="mt-1.5 max-w-[52ch] text-[14px] leading-relaxed text-ink/70">
            {mission.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <StatusBadge status={status} />
          {status === "pending" && (
            <button
              type="button"
              onClick={onApproveDemo}
              className="ui text-[10.5px] font-medium text-ink/40 underline decoration-ink/20 underline-offset-2 hover:text-ink/70"
            >
              (mark approved)
            </button>
          )}
        </div>
      </div>

      {status === "open" && (
        <form onSubmit={submit} className="mt-5">
          <label className="ui block text-[11px] uppercase tracking-[0.18em] text-ink/45">
            {mission.evidencePrompt}
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="Paste a link or write a few words"
              className="ui min-w-0 flex-1 rounded-full border border-[hsl(var(--rule-warm))]/70 bg-cream px-4 py-2.5 text-[14px] text-ink placeholder:text-ink/35 focus:border-ink/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!evidence.trim()}
              className="btn-pill inline-flex shrink-0 whitespace-nowrap bg-tomato text-cream hover:bg-tomato-deep disabled:bg-ink/15 disabled:text-ink/40 disabled:cursor-not-allowed"
              style={{ ["--button-radius" as never]: "9999px" }}
            >
              <Send className="h-4 w-4" strokeWidth={2} />
              <span className="whitespace-nowrap">Submit evidence</span>
            </button>
          </div>
        </form>
      )}

      {status === "pending" && (
        <p className="mt-4 text-[13.5px] leading-relaxed text-ink/55">
          A reviewer will pick this up soon. You&rsquo;ll see it light up here when it&rsquo;s approved.
        </p>
      )}
      {status === "approved" && (
        <p className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium text-[hsl(140_45%_30%)]">
          <Check className="h-4 w-4" strokeWidth={2.5} />
          Done. Nice work.
        </p>
      )}
    </Window>
  );
};

/* ─────────────────────────────── Level node ─────────────────────────────── */
const LevelNode = ({
  level,
  state,
  missionStatus,
  setMission,
  justCompleted,
}: {
  level: typeof LEVELS[number];
  state: NodeState;
  missionStatus: (id: string) => MissionStatus;
  setMission: (id: string, status: MissionStatus) => void;
  justCompleted: boolean;
}) => {
  const isMadeMafia = level.name === "Made Mafia";

  const meta = (
    <div className="min-w-0 flex-1">
      <p className="ui text-[11px] uppercase tracking-[0.22em] text-ink/45">
        Level {level.n}
        {isMadeMafia && (
          <span className="ml-2 inline-flex items-center gap-1 text-tomato">
            <Sparkles className="h-3 w-3" strokeWidth={2} /> the goal
          </span>
        )}
      </p>
      <h2 className="font-display mt-1 text-[clamp(1.25rem,2.2vw,1.625rem)] font-extrabold leading-tight tracking-tight text-ink">
        {level.name}
      </h2>
      <p className="ui mt-1 text-[12.5px] font-medium tabular-nums text-ink/55">
        +{fmt(level.reward)} $PEP
      </p>
    </div>
  );

  return (
    <li className="relative flex items-start gap-4 md:gap-6">
      <TrailNode n={level.n} state={state} />

      <div className="min-w-0 flex-1 pb-10">
        {state === "current" ? (
          <Window
            label={`Now — Level ${level.n}`}
            sticker="🍕"
            tone="butter"
            className="relative"
          >
            {justCompleted && (
              <div className="mb-4 flex items-center gap-2 rounded-2xl bg-[hsl(140_45%_42%)]/10 px-4 py-2.5 text-[13.5px] font-medium text-[hsl(140_45%_28%)]">
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                Level complete! +{fmt(level.reward)} $PEP earned.
              </div>
            )}
            {meta}
            <div className="mt-2">
              {level.missions.map((m) => (
                <MissionCard
                  key={m.id}
                  mission={m}
                  status={missionStatus(m.id)}
                  onSubmit={() => setMission(m.id, "pending")}
                  onApproveDemo={() => setMission(m.id, "approved")}
                />
              ))}
            </div>
          </Window>
        ) : state === "done" ? (
          <Window label={`Level ${level.n} · complete`} sticker="✓" tone="paper">
            <div className="flex items-center justify-between gap-3">
              {meta}
              <span className="ui inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[hsl(140_45%_42%)]/12 px-3 py-1 text-[12px] font-semibold text-[hsl(140_45%_30%)]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                Earned
              </span>
            </div>
          </Window>
        ) : (
          // Future — quiet, locked
          <div className="rounded-[24px] border border-dashed border-[hsl(var(--rule-warm))]/60 bg-cream/40 px-5 py-4 md:px-6 md:py-5">
            <div className="flex items-center justify-between gap-3">
              {meta}
              <span className="ui inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink/[0.05] px-3 py-1 text-[11.5px] font-medium text-ink/45">
                <Lock className="h-3 w-3" strokeWidth={2} />
                Locked
              </span>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

/* ─────────────────────────────── Page ─────────────────────────────── */
const PathPage = () => {
  const { levels, currentLevelIndex, levelComplete, missionStatus, setMission } = usePath();

  // Track whether the current level just became complete this session, so we
  // can show the "Level complete!" banner once before the trail re-shifts.
  const [justCompletedAt, setJustCompletedAt] = useState<number | null>(null);
  const isCurrentDone = useMemo(
    () => levelComplete(currentLevelIndex),
    [currentLevelIndex, levelComplete],
  );
  useEffect(() => {
    if (isCurrentDone) {
      setJustCompletedAt(currentLevelIndex);
      const t = setTimeout(() => setJustCompletedAt(null), 4200);
      return () => clearTimeout(t);
    }
  }, [isCurrentDone, currentLevelIndex]);

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      {/* Breadcrumb back to home */}
      <Link
        to="/dashboard"
        className="ui inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink/55 hover:text-ink"
      >
        <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
        <span>Back to the kitchen</span>
      </Link>

      {/* Frame */}
      <div className="relative mt-4">
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
          § The path
        </p>
        <h1 className="font-display mt-3 max-w-[20ch] text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[0.96] tracking-tight">
          Your path from Pizza Trainee to{" "}
          <span className="handwritten text-tomato">Made Mafia</span>.
        </h1>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink/70">
          Ten levels. One node lit up at a time. Move at your own pace — there&rsquo;s no clock.
        </p>

        {/* Benny peek — sits in the margin, behind the trail at the top */}
        <div className="pointer-events-none absolute -right-2 -top-2 hidden md:block">
          <BennyPeek />
        </div>
      </div>

      {/* The trail — one big window-chrome container holding the vertical list */}
      <Window
        label="Your path"
        sticker="🛤"
        className="mt-10"
        bodyClassName="relative"
      >
        {/* Vertical guideline connecting all nodes */}
        <span
          aria-hidden
          className="absolute left-[42px] top-6 bottom-6 w-px bg-gradient-to-b from-[hsl(140_45%_42%)]/40 via-[hsl(var(--rule-warm))] to-[hsl(var(--rule-warm))]/40 md:left-[46px]"
        />
        <ol className="relative flex flex-col">
          {levels.map((lvl, i) => {
            const state: NodeState =
              levelComplete(i)
                ? "done"
                : i === currentLevelIndex
                ? "current"
                : "future";
            return (
              <LevelNode
                key={lvl.n}
                level={lvl}
                state={state}
                missionStatus={missionStatus}
                setMission={setMission}
                justCompleted={state === "current" && justCompletedAt === i}
              />
            );
          })}
        </ol>
      </Window>
    </section>
  );
};

export default PathPage;
