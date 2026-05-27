import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Clock, Upload } from "lucide-react";
import { toast } from "sonner";
import Window from "../components/Window";
import StatusPill from "./StatusPill";
import {
  ME,
  getBounty,
  timeAgo,
  timeRemaining,
  type Bounty,
  type BountyStatus,
} from "./bountiesData";

/**
 * /dashboard/bounties/:id — single bounty.
 *
 * Full description, requirements, deliverable, comments thread, and the
 * action flow. Open → "Claim it" → confirm → status flips to In progress
 * for this member. In progress → submit work via link input → toast
 * "Sent to admin review" (the actual review queue is out of scope here).
 */
const BountyDetailPage = () => {
  const { id = "" } = useParams<{ id: string }>();
  const initial = useMemo(() => getBounty(id), [id]);

  // local state mirrors what a backend would persist, so the flow demo'd
  // here can be wired in one place later.
  const [status, setStatus] = useState<BountyStatus>(
    initial?.status ?? "open",
  );
  const [claimedBy, setClaimedBy] = useState<{
    name: string;
    avatar: string;
  } | null>(
    initial?.claimedByName
      ? { name: initial.claimedByName, avatar: initial.claimedByAvatar ?? "🍕" }
      : null,
  );
  const [confirming, setConfirming] = useState(false);
  const [submission, setSubmission] = useState("");

  if (!initial) {
    return (
      <section className="animate-fade-in pb-28 md:pb-0">
        <Back />
        <Window label="Bounty" sticker="🎯" tone="paper" className="mt-6">
          <p className="text-[14.5px] text-ink/65">
            That bounty isn&rsquo;t open anymore.
          </p>
        </Window>
      </section>
    );
  }

  const isMine = claimedBy?.name === ME.name;
  const claim = () => {
    setStatus("in-progress");
    setClaimedBy({ name: ME.name, avatar: ME.avatar });
    setConfirming(false);
    toast.success(`Claimed: ${initial.title}.`, {
      description: "Submit your work when you're ready.",
    });
  };
  const submit = () => {
    if (!submission.trim()) {
      toast.error("Add a link or short note before submitting.");
      return;
    }
    toast.success("Sent to admin review.", {
      description: "You'll be paid out once it's approved.",
    });
    setSubmission("");
  };

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <Back />

      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <BountyHero bounty={initial} status={status} />

          <Window
            label="Description"
            sticker="✶"
            bodyClassName="p-5 md:p-6"
          >
            <div className="space-y-4 text-[15px] leading-relaxed text-ink/80">
              {initial.description.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 border-t border-ink/[0.08] pt-5">
              <p className="ui text-[11px] uppercase tracking-[0.18em] text-ink/45">
                § Requirements
              </p>
              <ul className="mt-2 space-y-1.5">
                {initial.requirements.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-[14.5px] text-ink/80"
                  >
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-tomato"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 border-t border-ink/[0.08] pt-5">
              <p className="ui text-[11px] uppercase tracking-[0.18em] text-ink/45">
                § Deliverable
              </p>
              <p className="mt-2 text-[14.5px] text-ink/80">
                {initial.deliverable}
              </p>
            </div>
          </Window>

          <Comments bounty={initial} />
        </div>

        {/* Side rail: action panel */}
        <div className="space-y-6">
          <Window
            label="Action"
            sticker="🎯"
            tone={status === "open" ? "butter" : "cream"}
            bodyClassName="p-5"
          >
            {status === "open" && !confirming && (
              <>
                <p className="text-[14px] text-ink/75">
                  First member to finish gets the {initial.payoutPep} $PEP.
                </p>
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="ui mt-4 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-tomato px-4 py-2.5 text-[13.5px] font-semibold text-cream hover:bg-tomato-deep"
                >
                  <span className="whitespace-nowrap">Claim it</span>
                </button>
              </>
            )}

            {status === "open" && confirming && (
              <>
                <p className="font-display text-[1.05rem] font-bold leading-snug">
                  Claim this bounty?
                </p>
                <p className="mt-2 text-[13.5px] text-ink/70">
                  It moves to In progress under your name. Submit your work
                  when you&rsquo;re ready.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={claim}
                    className="ui inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-tomato px-3 py-2 text-[13px] font-semibold text-cream hover:bg-tomato-deep"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    <span className="whitespace-nowrap">Yes, claim it</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    className="ui inline-flex items-center justify-center whitespace-nowrap rounded-full bg-paper px-3 py-2 text-[13px] font-semibold text-ink/70 ring-1 ring-ink/10 hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {status === "in-progress" && isMine && (
              <>
                <p className="ui text-[11px] uppercase tracking-[0.18em] text-ink/50">
                  § Your claim
                </p>
                <p className="mt-2 text-[14px] text-ink/80">
                  Drop a link to your work below. Goes straight to admin
                  review.
                </p>
                <input
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  placeholder="https://figma.com/... or a short note"
                  className="ui mt-3 w-full rounded-xl bg-cream px-3 py-2 text-[13.5px] text-ink ring-1 ring-ink/15 placeholder:text-ink/35 focus:outline-none focus:ring-ink/40"
                />
                <button
                  type="button"
                  onClick={submit}
                  className="ui mt-3 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-cream hover:bg-ink-soft"
                >
                  <Upload className="h-3.5 w-3.5" strokeWidth={2} />
                  <span className="whitespace-nowrap">Submit work</span>
                </button>
              </>
            )}

            {status === "in-progress" && !isMine && claimedBy && (
              <>
                <p className="ui text-[11px] uppercase tracking-[0.18em] text-ink/50">
                  § Claimed
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-[14px] text-ink/80">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cream text-[14px] ring-1 ring-ink/10">
                    {claimedBy.avatar}
                  </span>
                  <span className="font-semibold">{claimedBy.name}</span>
                  is on it.
                </p>
                <p className="mt-3 text-[13.5px] text-ink/60">
                  Updates will appear in the comments below.
                </p>
              </>
            )}

            {status === "completed" && (
              <>
                <p className="ui text-[11px] uppercase tracking-[0.18em] text-ink/50">
                  § Done & paid
                </p>
                <p className="mt-2 text-[14px] text-ink/80">
                  {claimedBy?.name} delivered and was paid{" "}
                  {initial.payoutPep} $PEP.
                </p>
                {initial.workUrl && (
                  <a
                    href={initial.workUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui mt-3 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold text-cream hover:bg-ink-soft"
                  >
                    <span className="whitespace-nowrap">View the work</span>
                  </a>
                )}
              </>
            )}
          </Window>

          <Window label="Posted by" sticker="·" tone="paper" bodyClassName="p-4">
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-[18px] ring-1 ring-ink/10">
                {initial.posterAvatar}
              </span>
              <div>
                <p className="text-[14px] font-semibold text-ink">
                  {initial.posterName}
                </p>
                <p className="ui text-[11px] uppercase tracking-[0.16em] text-ink/45">
                  {timeAgo(initial.postedAt)}
                </p>
              </div>
            </div>
          </Window>
        </div>
      </div>
    </section>
  );
};

const Back = () => (
  <Link
    to="/dashboard/bounties"
    className="ui inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink"
  >
    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
    Back to bounties
  </Link>
);

const BountyHero = ({
  bounty,
  status,
}: {
  bounty: Bounty;
  status: BountyStatus;
}) => (
  <Window
    label={bounty.crew ? `${bounty.crew} crew` : "Open to all"}
    sticker="🎯"
    bodyClassName="p-5 md:p-6"
  >
    <div className="flex flex-wrap items-start gap-4">
      <StatusPill status={status} />
      {bounty.tags.map((t) => (
        <span
          key={t}
          className="ui inline-flex items-center rounded-full bg-paper px-2 py-0.5 text-[11px] text-ink/65 ring-1 ring-ink/10"
        >
          {t}
        </span>
      ))}
    </div>
    <h1 className="font-display mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1.04] tracking-tight">
      {bounty.title}
    </h1>
    <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
      <span className="inline-flex items-baseline gap-1">
        <span className="font-display text-[2.25rem] font-extrabold leading-none tracking-tight text-tomato">
          {bounty.payoutPep}
        </span>
        <span className="ui text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">
          $PEP
        </span>
      </span>
      {bounty.deadlineAt && (
        <span className="ui inline-flex items-center gap-1 text-[12.5px] uppercase tracking-[0.16em] text-ink/55">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          {timeRemaining(bounty.deadlineAt)}
        </span>
      )}
    </div>
  </Window>
);

const Comments = ({ bounty }: { bounty: Bounty }) => {
  const [draft, setDraft] = useState("");
  return (
    <Window
      label={`Comments (${bounty.comments.length})`}
      sticker="💬"
      bodyClassName="p-5 md:p-6"
    >
      {bounty.comments.length === 0 ? (
        <p className="text-[14px] text-ink/60">
          No comments yet. Be the first to ask a question.
        </p>
      ) : (
        <ul className="space-y-4">
          {bounty.comments.map((c) => (
            <li key={c.id} className="flex items-start gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-[15px] ring-1 ring-ink/10">
                {c.authorAvatar}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px]">
                  <span className="font-semibold text-ink">
                    {c.authorName}
                  </span>{" "}
                  <span className="ui text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
                    {timeAgo(c.ts)}
                  </span>
                </p>
                <p className="mt-1 text-[14px] leading-snug text-ink/80">
                  {c.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 border-t border-ink/[0.08] pt-4">
        <textarea
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a comment…"
          className="ui w-full resize-none rounded-xl bg-cream px-3 py-2 text-[13.5px] text-ink ring-1 ring-ink/10 placeholder:text-ink/35 focus:outline-none focus:ring-ink/30"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (!draft.trim()) return;
              toast.success("Comment posted.");
              setDraft("");
            }}
            className="ui inline-flex items-center whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-[12.5px] font-semibold text-cream hover:bg-ink-soft"
          >
            <span className="whitespace-nowrap">Post</span>
          </button>
        </div>
      </div>
    </Window>
  );
};

export default BountyDetailPage;
