/**
 * Destinations — four quiet navigation tiles near the bottom of the dashboard.
 * These are places members CAN go, not things that should shout on the home screen.
 * Equal, quiet weight. None of these competes with the hero or the Path.
 */

import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, ShieldCheck, ShoppingBag, Users } from "lucide-react";

const tiles = [
  {
    label: "Bounties",
    line: "Open jobs anyone can claim. First to finish gets paid.",
    href: "/dashboard/bounties",
    icon: Briefcase,
  },
  {
    label: "Vouches",
    line: "Who in the family vouches for you. Your reputation, made visible.",
    href: "/dashboard/vouches",
    icon: ShieldCheck,
  },
  {
    label: "Shop",
    line: "Spend your $PEP on pizza, NFTs, and perks.",
    href: "/dashboard/shop",
    icon: ShoppingBag,
  },
  {
    label: "Crews",
    line: "Your people inside the family.",
    href: "/dashboard/crews",
    icon: Users,
  },
];

const Destinations = () => {
  return (
    <section className="mt-20">
      <p className="ui text-[11px] uppercase tracking-[0.22em] text-ink/55">
        § Destinations
      </p>
      <h2 className="font-display mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1] tracking-tight">
        More inside the family.
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.label}
              to={t.href}
              className="group relative flex flex-col justify-between rounded-3xl bg-cream p-5 ring-1 ring-ink/[0.06] transition-all duration-[var(--dur-fast)] hover:shadow-[var(--shadow-soft)] md:p-6"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Icon
                    className="h-4 w-4 text-ink/40 transition-colors group-hover:text-ink/70"
                    strokeWidth={2}
                  />
                  <span className="ui text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/55 transition-colors group-hover:text-ink/80">
                    {t.label}
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/65">
                  {t.line}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-ink/50 transition-colors group-hover:text-ink/80">
                <span className="whitespace-nowrap">Go to {t.label.toLowerCase()}</span>
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Destinations;
