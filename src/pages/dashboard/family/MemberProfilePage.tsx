import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import { toast } from "sonner";
import Window from "../components/Window";
import {
  crewEmoji,
  formatJoined,
  getMember,
  getMembers,
  type Member,
} from "./familyData";

/**
 * /dashboard/family/:id — public read-only member profile.
 *
 * Hero with big name + Benny avatar + level pill, then city/crews/joined
 * meta, vouches received (people who vouch for them, prominent) and
 * vouches given (smaller, less prominent), achievements ribbon, recent
 * activity, and the primary "Vouch" + lightweight "Send a 🍕" CTAs.
 */
const MemberProfilePage = () => {
  const { id = "" } = useParams<{ id: string }>();
  const member = useMemo(() => getMember(id), [id]);
  const everyone = useMemo(getMembers, []);
  const [vouched, setVouched] = useState(false);

  if (!member) {
    return (
      <section className="animate-fade-in pb-28 md:pb-0">
        <Link
          to="/dashboard/family"
          className="ui inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Back to the family
        </Link>
        <Window label="Member" sticker="🍕" tone="paper" className="mt-6">
          <p className="text-[14.5px] text-ink/65">
            That member isn&rsquo;t in the family directory.
          </p>
        </Window>
      </section>
    );
  }

  const resolve = (mid: string) => everyone.find((x) => x.id === mid);
  const vouchedBy = member.vouchedBy.map(resolve).filter(Boolean) as Member[];
  const vouchedGiven = member.vouchedGiven
    .map(resolve)
    .filter(Boolean) as Member[];

  const onVouch = () => {
    if (vouched) return;
    setVouched(true);
    toast.success(`Vouch sent to ${member.mafiaName}.`);
  };
  const onSendPizza = () =>
    toast.success(`🍕 sent to ${member.mafiaName}.`);

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <Link
        to="/dashboard/family"
        className="ui inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to the family
      </Link>

      {/* Hero */}
      <Window
        label="Member profile"
        sticker="🍕"
        bodyClassName="p-5 md:p-7"
        className="mt-4"
      >
        <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-end md:gap-7 md:text-left">
          <div className="relative shrink-0">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full bg-tomato/15 blur-xl"
            />
            <div className="relative inline-flex h-32 w-32 items-center justify-center rounded-full bg-cream text-[56px] ring-2 ring-ink/12 shadow-[inset_0_-8px_22px_hsl(30_20%_12%/0.08),0_8px_22px_hsl(30_20%_12%/0.18)]">
              {member.avatarEmoji}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
              § {member.level}
            </p>
            <h1 className="font-display mt-2 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[0.96] tracking-tight">
              {member.mafiaName}
            </h1>
            <p className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[14px] text-ink/70 md:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                {member.city}
              </span>
              <span className="text-ink/20">·</span>
              <span>Joined {formatJoined(member.joinedAt)}</span>
            </p>

            {member.crews.length > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 md:justify-start">
                {member.crews.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-[12px] text-ink/75 ring-1 ring-ink/10"
                  >
                    <span aria-hidden>{crewEmoji(c)}</span>
                    {c} crew
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              <button
                type="button"
                onClick={onVouch}
                disabled={vouched}
                className={
                  "ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors " +
                  (vouched
                    ? "bg-ink/[0.07] text-ink/55"
                    : "bg-tomato text-cream hover:bg-tomato-deep")
                }
              >
                {vouched ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                    <span className="whitespace-nowrap">Vouched</span>
                  </>
                ) : (
                  <span className="whitespace-nowrap">
                    Vouch for this member
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={onSendPizza}
                className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-cream hover:bg-ink-soft"
              >
                <span className="whitespace-nowrap">Send a 🍕</span>
              </button>
            </div>
          </div>
        </div>
      </Window>

      {/* Two-column body */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* Achievements */}
          <Window label="Achievements" sticker="🏅" bodyClassName="p-4 md:p-5">
            {member.achievements.length === 0 ? (
              <p className="text-[14px] text-ink/60">
                Just joined. Watch this space.
              </p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {member.achievements.map((a) => (
                  <li
                    key={a.id}
                    className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-[12.5px] text-ink/80 ring-1 ring-ink/10"
                  >
                    <span aria-hidden>{a.emoji}</span>
                    {a.label}
                  </li>
                ))}
              </ul>
            )}
          </Window>

          {/* Recent activity */}
          <Window label="Recent activity" sticker="✶" bodyClassName="p-4 md:p-5">
            {member.recent.length === 0 ? (
              <p className="text-[14px] text-ink/60">
                Nothing yet. The kitchen is quiet on this one.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {member.recent.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-ink/[0.03]"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-tomato"
                    />
                    <p className="text-[14px] leading-snug text-ink/85">
                      {r.text}
                    </p>
                    <span className="ui ml-auto text-[10.5px] uppercase tracking-[0.18em] text-ink/40">
                      {r.whenAgo}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Window>
        </div>

        <div className="space-y-6">
          {/* Vouches received — prominent */}
          <Window
            label={`Vouched by ${vouchedBy.length}`}
            sticker="🤝"
            bodyClassName="p-4 md:p-5"
          >
            {vouchedBy.length === 0 ? (
              <p className="text-[14px] text-ink/60">
                No one has vouched yet. Be the first.
              </p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {vouchedBy.map((v) => (
                  <li key={v.id}>
                    <Link
                      to={`/dashboard/family/${v.id}`}
                      title={v.mafiaName}
                      className="group inline-flex items-center gap-2 rounded-full bg-paper px-1 py-1 pr-3 ring-1 ring-ink/10 hover:bg-cream"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cream text-[14px] ring-1 ring-ink/10">
                        {v.avatarEmoji}
                      </span>
                      <span className="text-[12.5px] font-medium text-ink/80 group-hover:text-ink">
                        {v.mafiaName}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Window>

          {/* Vouches given — quieter */}
          <Window
            label={`Vouches given (${vouchedGiven.length})`}
            sticker="·"
            tone="paper"
            bodyClassName="p-4 md:p-5"
          >
            {vouchedGiven.length === 0 ? (
              <p className="text-[13px] text-ink/55">
                Hasn&rsquo;t vouched for anyone yet.
              </p>
            ) : (
              <ul className="flex flex-wrap gap-1.5">
                {vouchedGiven.map((v) => (
                  <li key={v.id}>
                    <Link
                      to={`/dashboard/family/${v.id}`}
                      title={v.mafiaName}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cream text-[13px] ring-1 ring-ink/10 hover:ring-ink/30"
                    >
                      {v.avatarEmoji}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Window>
        </div>
      </div>
    </section>
  );
};

export default MemberProfilePage;
