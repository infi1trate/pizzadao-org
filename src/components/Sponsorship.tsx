import { MapPin, Sparkles, Waves, Radio, LayoutGrid } from "lucide-react";

const VALUE_PROPS = [
  {
    n: "01",
    k: "Trusted Local Distribution",
    v: "Hundreds of pizzerias in real neighborhoods. Your brand shows up where people already gather.",
    icon: MapPin,
  },
  {
    n: "02",
    k: "Founder + Builder Access",
    v: "Direct lines to founders, developers, and operators shaping what's next.",
    icon: Sparkles,
  },
  {
    n: "03",
    k: "Cultural Relevance",
    v: "Programs that feel native. Built with communities, not around them.",
    icon: Waves,
  },
  {
    n: "04",
    k: "Earned Media",
    v: "Moments people talk about. Content that spreads because it deserves to.",
    icon: Radio,
  },
  {
    n: "05",
    k: "Global Activation, No Ops",
    v: "We coordinate the logistics and playbook. You provide the brief.",
    icon: LayoutGrid,
  },
];

const PROOF: { k: string; v: string; sub?: string; num?: number; prefix?: string; suffix?: string }[] = [
  { k: "City network", v: "500+", sub: "independently organized", num: 500, suffix: "+" },
  { k: "Countries", v: "100+", sub: "active chapters", num: 100, suffix: "+" },
  { k: "Annual attendance", v: "20,000+", sub: "real-world participants", num: 20000, suffix: "+" },
  { k: "Repeat collaborators", v: "60+", sub: "brands, year over year", num: 60, suffix: "+" },
];


import { useEffect, useRef, useState } from "react";

const CountUp = ({ value, suffix = "", fallback }: { value?: number; suffix?: string; fallback: string }) => {
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (value === undefined) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setStarted(true);
            const duration = 1400;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, started]);

  if (value === undefined) return <span ref={ref}>{fallback}</span>;
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
};

const Sponsorship = () => {
  return (
    <section
      id="partner-with-us"
      className="relative overflow-hidden bg-butter/25 pt-10 text-ink md:pt-14"
    >
      {/* Faint geographic mesh — barely visible cartographic texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--ink) / 0.10) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink) / 0.10) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--ink) / 0.55) 1px, transparent 1.4px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(ellipse at 70% 60%, #000 0%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 60%, #000 0%, transparent 60%)",
        }}
      />

      {/* Masthead */}
      <div className="container relative">
        <div className="relative border-t-2 border-ink pt-6 md:pt-7">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-5">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-tomato">Why it works</p>
              <h2 className="font-display mt-3 text-display-1 font-extrabold leading-[0.9] tracking-[0.005em] text-ink">
                Why brands
                <br />
                <span className="text-ink-soft">partner with PizzaDAO.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-8">
              <p className="text-lg leading-[1.45] text-ink/85 md:text-xl">
                Trust, coordinated globally. Built city by city, by the people who already live there.
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink/65">
                PizzaDAO is a 500-city network of independently organized
                chapters. Brands plug into a real, repeating, IRL community —
                not a list, not a mailshot, not a pop-up.
              </p>
            </div>
          </div>
        </div>

        {/* Proof ledger — operational credibility, no soft percentages */}
        <div className="mt-6 rounded-2xl border border-ink/15 bg-cream shadow-[var(--shadow-lifted)] md:mt-8">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {PROOF.map((p, i) => (
              <div
                key={p.k}
                className={`px-5 py-6 md:px-7 md:py-8 ${
                  i > 0 ? "md:border-l md:border-ink/15" : ""
                } ${i === 1 ? "border-l border-ink/15" : ""} ${
                  i >= 2 ? "border-t border-ink/15 md:border-t-0" : ""
                }`}
              >
                <dt className="ui text-[10px] font-semibold uppercase tracking-[0.2em] text-tomato">
                  {p.k}
                </dt>
                <dd className="font-display mt-2 text-[clamp(2.5rem,6.2vw,5rem)] font-extrabold leading-[0.82] tracking-[-0.015em] text-ink">
                  <CountUp value={p.num} suffix={p.suffix} fallback={p.v} />
                </dd>
                {p.sub && (
                  <p className="ui mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/55">
                    {p.sub}
                  </p>
                )}
              </div>
            ))}
          </dl>
        </div>

        {/* Trust rail — small operational signals beneath the ledger */}
        <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium text-ink/55">
          <li className="ui uppercase tracking-[0.18em]">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-[1px] rounded-full bg-tomato align-middle" />
            Annual Global Pizza Party · 5 years running
          </li>
          <li className="ui uppercase tracking-[0.18em]">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-[1px] rounded-full bg-tomato align-middle" />
            6 continents · 100+ countries
          </li>
          <li className="ui uppercase tracking-[0.18em]">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-[1px] rounded-full bg-tomato align-middle" />
            Locally organized, globally coordinated
          </li>
        </ul>
      </div>



      {/* Value props — refined capabilities overview */}
      <div className="container mt-10 md:mt-14">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-4">
            <p className="overline text-tomato">What you receive</p>
            <h3 className="font-display mt-2 text-display-2 font-extrabold leading-[0.95] tracking-[0.005em] text-ink">
              Five things
              <br />
              <span className="text-ink-soft">we deliver.</span>
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
              Bespoke programs built on these foundations.
            </p>
          </div>

          <ol className="col-span-12 md:col-span-8 md:pl-6">
            <div className="border-t border-ink/10">
              {VALUE_PROPS.map((vp, i) => {
                const Icon = vp.icon;
                return (
                  <li
                    key={vp.n}
                    className="group relative border-b border-ink/10 py-5 md:py-6"
                  >
                    <div className="grid grid-cols-12 items-start gap-x-4 gap-y-2">
                      <div className="col-span-12 md:col-span-5">
                        <div className="flex items-center gap-2.5">
                          <Icon size={15} strokeWidth={1.25} className="shrink-0 text-ink/20" />
                          <h4 className="font-display text-[1.4rem] font-extrabold leading-[1.05] tracking-[-0.01em] md:text-[1.6rem]">
                            {vp.k}
                          </h4>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-7 md:relative md:pl-2">
                        <p className="text-[14px] leading-[1.55] text-ink/70 md:text-[15px]">
                          {vp.v}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
          </ol>
        </div>
      </div>

      {/* What we build together */}
      <div className="paper-soft paper-drift mt-16 bg-cream-warm py-16 md:mt-24 md:py-20">
        <div className="container">
          <div className="relative border-t border-ink/40 pt-8 md:pt-10">
            {/* IRL stamp, asymmetric overhang */}
            <span aria-hidden className="ui absolute -top-3 left-4 bg-cream-warm px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-tomato">
              IRL ·  built in cities
            </span>
            <div className="grid grid-cols-12 items-end gap-x-8 gap-y-6 md:gap-x-12">
              <div className="col-span-12 md:col-span-8">
                <p className="overline text-tomato">Possibilities</p>
                <h3 className="font-display mt-4 text-display-2 font-extrabold leading-[0.88] tracking-[-0.02em] md:mt-5">
                  What we build
                  <br />
                  <span className="handwritten text-ink/55 text-[1.05em]">together.</span>
                </h3>
              </div>

              <div className="col-span-12 md:col-span-4 md:pl-10 md:pb-3">
                <p className="font-serif text-[15.5px] leading-[1.65] text-ink/70 md:text-[15px]">
                  Five formats we know how to run, and a hundred more we'd love to invent with you.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-7 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {[
              {
                k: "Global Moments",
                v: "Large-scale activations across hundreds of cities, built to create shared global experiences.",
                note: "500+ cities, one weekend",
                accent: "global",
                stamp: "WORLDWIDE",
                tilt: "-rotate-[1.2deg]",
                motif: (
                  <svg viewBox="0 0 200 120" className="absolute -right-6 -top-4 h-28 w-44 text-ink/[0.07]" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <ellipse cx="100" cy="60" rx="80" ry="40" />
                    <ellipse cx="100" cy="60" rx="60" ry="40" />
                    <ellipse cx="100" cy="60" rx="40" ry="40" />
                    <ellipse cx="100" cy="60" rx="20" ry="40" />
                    <path d="M20 60h160M30 35h140M30 85h140" />
                  </svg>
                ),
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9" />
                    <ellipse cx="12" cy="12" rx="4" ry="9" />
                    <path d="M3 12h18M5 7h14M5 17h14" />
                  </svg>
                ),
              },
              {
                k: "Local Takeovers",
                v: "City-by-city brand presence through trusted neighborhood pizzerias.",
                note: "on the corner you already know",
                accent: "local energy",
                stamp: "NEIGHBORHOOD",
                tilt: "rotate-[1.6deg]",
                motif: (
                  <svg viewBox="0 0 200 120" className="absolute -right-4 -top-6 h-28 w-40 text-ink/[0.08]" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <path d="M10 90 L60 40 L100 70 L150 30 L190 80" />
                    <circle cx="60" cy="40" r="3" />
                    <circle cx="100" cy="70" r="3" />
                    <circle cx="150" cy="30" r="3" />
                    <path d="M60 40 L60 95M100 70 L100 95M150 30 L150 95" strokeDasharray="2 3" />
                  </svg>
                ),
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
                    <circle cx="12" cy="9" r="2.4" />
                  </svg>
                ),
              },
              {
                k: "Builder Collaborations",
                v: "Hackathons, product integrations, and experimental launches with founders and developers.",
                note: "shipped in a weekend",
                accent: "experimental",
                stamp: "FIELD KIT",
                tilt: "-rotate-[2deg]",
                motif: (
                  <svg viewBox="0 0 200 120" className="absolute -right-8 -top-4 h-28 w-44 text-ink/[0.07]" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <path d="M10 60 L60 60 L70 40 L130 40 L140 60 L190 60" />
                    <path d="M10 60 L60 60 L70 80 L130 80 L140 60" />
                    <circle cx="100" cy="60" r="14" />
                    <path d="M100 46 L100 74M86 60 L114 60" />
                  </svg>
                ),
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.5l1.8 5.6 5.7.3-4.6 3.6 1.7 5.7L12 14.6l-4.6 3.1 1.7-5.7-4.6-3.6 5.7-.3z" />
                  </svg>
                ),
              },
              {
                k: "Cultural Programming",
                v: "Artist residencies, food and culture crossovers, and community-led events.",
                note: "vol. 04 · ongoing",
                accent: "community-led",
                stamp: "ARCHIVE",
                tilt: "rotate-[1.2deg]",
                motif: (
                  <svg viewBox="0 0 200 120" className="absolute -right-4 -top-6 h-28 w-44 text-ink/[0.07]" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <rect x="30" y="20" width="60" height="80" />
                    <rect x="110" y="20" width="60" height="80" />
                    <path d="M40 35h40M40 50h40M40 65h30M120 35h40M120 50h40M120 65h25" />
                  </svg>
                ),
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
                    <rect x="7" y="7" width="10" height="10" rx="0.5" />
                    <path d="M9.5 12h5M12 9.5v5" />
                  </svg>
                ),
              },
              {
                k: "Experimental Activations",
                v: "NFC pizza boxes, AR experiences, AI-generated menus, and unexpected formats.",
                note: "tap the box, see what happens",
                accent: "IRL",
                stamp: "PROTOTYPE",
                tilt: "-rotate-[1.4deg]",
                motif: (
                  <svg viewBox="0 0 200 120" className="absolute -right-6 -top-6 h-28 w-44 text-ink/[0.07]" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <circle cx="100" cy="60" r="50" />
                    <circle cx="100" cy="60" r="35" />
                    <circle cx="100" cy="60" r="20" />
                    <path d="M100 10v100M50 60h100M65 25l70 70M135 25l-70 70" strokeDasharray="2 4" />
                  </svg>
                ),
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 20L12 4l9 16z" />
                    <circle cx="9.5" cy="15.5" r="0.9" fill="currentColor" stroke="none" />
                    <circle cx="14" cy="14" r="0.9" fill="currentColor" stroke="none" />
                    <circle cx="12" cy="11" r="0.9" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
            ].map((b, i) => (
              <article
                key={b.k}
                className="group paper-soft paper-drift relative flex flex-col overflow-hidden rounded-[14px] bg-cream p-7 shadow-[0_2px_0_hsl(var(--ink)/0.06),0_18px_40px_-30px_hsl(var(--ink)/0.25)] ring-1 ring-ink/10 transition-all duration-500 ease-out hover:-translate-y-[5px] hover:rotate-[-0.2deg] hover:bg-cream-warm hover:shadow-[0_40px_90px_-40px_hsl(var(--ink)/0.4),0_10px_30px_-18px_hsl(var(--ink)/0.22)] hover:ring-tomato/25 md:p-9"
                style={{
                  borderTopLeftRadius: i % 2 === 0 ? "18px" : "12px",
                  borderBottomRightRadius: i % 2 === 0 ? "12px" : "18px",
                }}
              >
                {/* Decorative motif fragment */}
                {b.motif}

                {/* Corner stamp */}
                <span
                  aria-hidden
                  className={`ui absolute right-4 top-4 ${b.tilt} rounded-full border border-ink/25 px-2 py-[3px] text-[8.5px] font-semibold uppercase tracking-[0.22em] text-ink/45 transition-colors duration-500 group-hover:border-tomato/40 group-hover:text-tomato`}
                >
                  {b.stamp}
                </span>

                <div className="relative flex items-start justify-between">
                  <span className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-ink/45">
                    Fig. {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-7 w-7 text-ink/35 transition-colors duration-500 group-hover:text-tomato"
                  >
                    {b.icon}
                  </span>
                </div>

                <h4 className="font-display relative mt-10 text-[1.85rem] font-extrabold leading-[1.02] tracking-[-0.018em] transition-colors duration-500 group-hover:text-tomato md:mt-12 md:text-[2.05rem]">
                  {b.k}
                </h4>

                {/* Imperfect underline */}
                <svg aria-hidden viewBox="0 0 120 6" className="mt-3 h-[6px] w-20 text-ink/30 transition-colors duration-500 group-hover:text-tomato" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M2 3 Q 30 1 60 3 T 118 3" />
                </svg>

                <p className="font-serif mt-5 text-[15px] leading-[1.7] text-ink/75 md:text-[15.5px]">
                  {b.v}
                </p>


                {/* Annotation reveal on hover */}
                <p className="ui mt-3 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-ink/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span aria-hidden className="inline-block h-px w-6 bg-tomato" />
                  ↳ {b.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>


      {/* CTA band — warm, intentional, emotionally persuasive */}
      <div className="relative mt-6 overflow-hidden bg-butter pb-10 md:mt-8 md:pb-14">
        {/* Warm gradient wash — richer at center, softer at edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 60%, hsl(44 95% 72% / 0.55) 0%, transparent 60%)",
          }}
        />
        {/* Secondary warm accent — toward upper-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-[320px] w-[320px] rounded-full opacity-[0.14] blur-[90px]"
          style={{ background: "hsl(var(--tomato))" }}
        />
        {/* Faint pizza-box checkered reference — top-right edge only, very subtle */}
        <div
          aria-hidden
          className="checker-tape pointer-events-none absolute right-0 top-0 h-[4px] w-20 opacity-20 md:w-32"
        />
        {/* Subtle grain */}
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.25]" />

        <div className="container relative">
          {/* Tighter, more editorial composition */}
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-5 md:gap-x-10">
            {/* Left: headline + copy, tightly grouped */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8">
              <p className="overline text-tomato">Bespoke programs</p>
              <h3 className="font-display mt-2 text-display-2 font-extrabold leading-[0.92] tracking-[-0.02em]">
                Let's build something
                <br />
                people actually{" "}
                <span
                  className="handwritten inline-block text-tomato"
                  style={{
                    transform: "rotate(-2.5deg)",
                    fontSize: "0.72em",
                    verticalAlign: "0.14em",
                  }}
                >
                  show up
                </span>
                {" "}to.
              </h3>
              <p className="mt-3 max-w-lg text-[15px] leading-[1.55] text-ink/70 md:text-base">
                Tell us what you're trying to do. We'll shape it into something worth showing up for.
              </p>
            </div>

            {/* Right: buttons, aligned with baseline of headline */}
            <div className="col-span-12 flex flex-col gap-3 md:col-span-5 lg:col-span-4 md:items-end md:pb-1">
              <a
                href="mailto:partnerships@pizzadao.org"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-tomato px-7 py-4 text-sm font-semibold tracking-[0.03em] text-cream shadow-[0_10px_30px_-12px_hsl(var(--tomato)/0.5),0_3px_8px_-4px_hsl(0_0%_0%/0.25)] transition-all duration-500 ease-out hover:-translate-y-[3px] hover:bg-tomato-deep hover:shadow-[0_20px_48px_-16px_hsl(var(--tomato)/0.65),0_6px_16px_-6px_hsl(0_0%_0%/0.3)] md:px-9 md:py-5"
              >
                <span>Start a partnership brief</span>
                <span aria-hidden className="transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full border border-ink/50 bg-cream/40 px-7 py-4 text-sm font-semibold tracking-[0.03em] text-ink backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-[3px] hover:border-ink hover:bg-cream hover:shadow-[0_14px_36px_-14px_hsl(var(--ink)/0.2)] md:px-9 md:py-5"
              >
                <span>Download partner deck</span>
                <span aria-hidden className="transition-transform duration-500 ease-out group-hover:translate-x-1">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsorship;
