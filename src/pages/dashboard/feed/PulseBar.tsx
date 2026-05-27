import { getPulseStats } from "./feedData";

/**
 * Compact JoinHive-style strip above the feed. Live counts that make
 * the section feel alive without being noisy. The first stat carries
 * a quiet pulse dot.
 */
const PulseBar = ({ compact = false }: { compact?: boolean }) => {
  const stats = getPulseStats();
  return (
    <div
      className={
        "flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-2xl bg-paper/70 px-3 py-2 ring-1 ring-ink/[0.07] " +
        (compact ? "text-[12px]" : "text-[12.5px]")
      }
    >
      {stats.map((s, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-ink/80"
        >
          {s.live ? (
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          ) : (
            <span aria-hidden>{s.icon}</span>
          )}
          <span>{s.label}</span>
        </span>
      ))}
    </div>
  );
};

export default PulseBar;
