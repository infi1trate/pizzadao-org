import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, MapPin, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import Window from "../components/Window";
import {
  CREWS,
  LEVELS,
  SORTS,
  EMPTY_FILTERS,
  FAMILY_META,
  applyFilters,
  crewEmoji,
  getCities,
  getMembers,
  type Crew,
  type FilterState,
  type Level,
  type Member,
  type SortKey,
} from "./familyData";

/**
 * /dashboard/family — public member directory.
 *
 * Trading-card grid of every made member. Filter by city / crew / level,
 * sort by activity / vouches / newest / highest. Tap a card → profile
 * (see MemberProfilePage). Vouching is a front-end CTA for now and
 * surfaces a toast; the real action lands when the backend is wired.
 */
const FamilyPage = () => {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [vouched, setVouched] = useState<Set<string>>(new Set());

  const cities = useMemo(getCities, []);
  const members = useMemo(
    () => applyFilters(getMembers(), filters),
    [filters],
  );

  const toggleVouch = (id: string, name: string) => {
    setVouched((cur) => {
      const next = new Set(cur);
      if (next.has(id)) return cur;
      next.add(id);
      toast.success(`Vouch sent to ${name}.`);
      return next;
    });
  };

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <header className="max-w-[60ch]">
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
          § Family
        </p>
        <h1 className="font-display mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.94] tracking-tight">
          The <span className="handwritten text-tomato">family</span>.
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
          Everyone who&rsquo;s been made. Find your people.
        </p>
        <p className="ui mt-4 inline-flex items-center gap-2 text-[12.5px] uppercase tracking-[0.16em] text-ink/55">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {FAMILY_META.totalMembers.toLocaleString()} made members in{" "}
          {FAMILY_META.totalCities} cities
        </p>
      </header>

      <Filters
        filters={filters}
        cities={cities}
        onChange={setFilters}
      />

      <p className="ui mt-4 text-[11.5px] uppercase tracking-[0.18em] text-ink/45">
        {members.length} member{members.length === 1 ? "" : "s"} shown
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <TradingCard
            key={m.id}
            member={m}
            hasVouched={vouched.has(m.id)}
            onVouch={() => toggleVouch(m.id, m.mafiaName)}
          />
        ))}
      </div>

      {members.length === 0 && (
        <Window label="Family" sticker="🍕" tone="paper" className="mt-6">
          <p className="text-[14.5px] text-ink/65">
            No members match these filters yet. Try widening the search.
          </p>
        </Window>
      )}
    </section>
  );
};

// ---------------------------------------------------------------------------

const Filters = ({
  filters,
  cities,
  onChange,
}: {
  filters: FilterState;
  cities: string[];
  onChange: (f: FilterState) => void;
}) => {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <PillToggle
        on={
          !filters.city && !filters.crew && !filters.level
        }
        onClick={() =>
          onChange({ ...filters, city: null, crew: null, level: null })
        }
      >
        All members
      </PillToggle>

      <Select<string>
        label="By city"
        value={filters.city}
        options={cities.map((c) => ({ value: c, label: c }))}
        onChange={(v) => onChange({ ...filters, city: v })}
      />

      <Select<Crew>
        label="By crew"
        value={filters.crew}
        options={CREWS.map((c) => ({ value: c, label: c }))}
        onChange={(v) => onChange({ ...filters, crew: v })}
      />

      <Select<Level>
        label="By level"
        value={filters.level}
        options={LEVELS.map((l) => ({ value: l, label: l }))}
        onChange={(v) => onChange({ ...filters, level: v })}
      />

      <span className="ml-auto inline-flex items-center gap-1">
        <span className="ui text-[11px] uppercase tracking-[0.18em] text-ink/45">
          Sort
        </span>
        <Select<SortKey>
          label="Recently active"
          value={filters.sort}
          options={SORTS.map((s) => ({ value: s.key, label: s.label }))}
          onChange={(v) =>
            onChange({ ...filters, sort: (v ?? "active") as SortKey })
          }
          clearable={false}
        />
      </span>
    </div>
  );
};

const PillToggle = ({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={
      "ui inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors " +
      (on
        ? "bg-ink text-cream"
        : "bg-paper text-ink/65 ring-1 ring-ink/10 hover:bg-cream hover:text-ink")
    }
  >
    {children}
  </button>
);

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  clearable = true,
}: {
  label: string;
  value: T | null;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T | null) => void;
  clearable?: boolean;
}) {
  const active = value !== null;
  const display =
    options.find((o) => o.value === value)?.label ?? label;
  return (
    <label
      className={
        "relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors " +
        (active
          ? "bg-butter text-ink ring-1 ring-ink/15"
          : "bg-paper text-ink/65 ring-1 ring-ink/10 hover:text-ink")
      }
    >
      <span className="ui whitespace-nowrap">{display}</span>
      <ChevronDown className="h-3.5 w-3.5 opacity-70" strokeWidth={2} />
      <select
        aria-label={label}
        value={value ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          onChange((v === "" ? null : (v as T)));
        }}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {clearable && <option value="">{label}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// ---------------------------------------------------------------------------

const TradingCard = ({
  member,
  hasVouched,
  onVouch,
}: {
  member: Member;
  hasVouched: boolean;
  onVouch: () => void;
}) => {
  return (
    <article className="trading-card group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-cream ring-1 ring-ink/12 shadow-[0_1px_2px_hsl(30_20%_12%/0.06),0_18px_44px_-22px_hsl(30_20%_12%/0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_4px_hsl(30_20%_12%/0.08),0_28px_60px_-22px_hsl(30_20%_12%/0.38)]">
      {/* mini chrome */}
      <header className="flex items-center gap-2 border-b border-ink/[0.08] bg-paper/60 px-3 py-1.5">
        <span className="ui text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
          § Member
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-butter/70 px-2 py-0.5 text-[10.5px] font-semibold text-ink/85 ring-1 ring-ink/10">
          {member.level}
        </span>
      </header>

      <Link
        to={`/dashboard/family/${member.id}`}
        className="flex flex-1 flex-col px-4 pb-4 pt-5"
      >
        {/* avatar disc — Benny placeholder */}
        <div className="relative mx-auto">
          <div
            aria-hidden
            className="absolute -inset-2 rounded-full bg-tomato/15 blur-md transition-opacity group-hover:opacity-80"
          />
          <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-cream text-[36px] ring-2 ring-ink/12 shadow-[inset_0_-6px_18px_hsl(30_20%_12%/0.08),0_4px_10px_hsl(30_20%_12%/0.12)]">
            {member.avatarEmoji}
          </div>
        </div>

        <h3 className="font-display mt-4 text-center text-[1.25rem] font-extrabold leading-tight tracking-tight">
          {member.mafiaName}
        </h3>

        <p className="mt-1 inline-flex items-center justify-center gap-1 self-center text-[12.5px] text-ink/65">
          <MapPin className="h-3 w-3" strokeWidth={2} />
          {member.city}
        </p>

        {member.crews.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
            {member.crews.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-[11px] text-ink/70 ring-1 ring-ink/10"
                title={`${c} crew`}
              >
                <span aria-hidden>{crewEmoji(c)}</span>
                {c}
              </span>
            ))}
          </div>
        )}

        <p className="ui mt-4 text-center text-[11px] uppercase tracking-[0.18em] text-ink/45">
          {member.vouchedBy.length} vouch
          {member.vouchedBy.length === 1 ? "" : "es"}
        </p>
      </Link>

      <div className="border-t border-ink/[0.08] bg-paper/40 px-3 py-2.5">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (!hasVouched) onVouch();
          }}
          disabled={hasVouched}
          className={
            "ui inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors " +
            (hasVouched
              ? "bg-ink/[0.07] text-ink/55"
              : "bg-tomato text-cream hover:bg-tomato-deep")
          }
        >
          {hasVouched ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span className="whitespace-nowrap">Vouched</span>
            </>
          ) : (
            <span className="whitespace-nowrap">Vouch</span>
          )}
        </button>
      </div>
    </article>
  );
};

export default FamilyPage;
