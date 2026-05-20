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

const ACTIVATIONS = [
  {
    tag: "Annual",
    partner: "Bitcoin Pizza Day, 2024",
    headline: "300 cities. One weekend. One ribbon.",
    note: "Co-branded activation across the global chapter network, local execution, unified creative.",
  },
  {
    tag: "Limited Run",
    partner: "Independent Pizzeria Fund",
    headline: "$250K routed to neighborhood operators.",
    note: "Sponsor-funded grants distributed through verified PizzaDAO chapters in 14 countries.",
  },
  {
    tag: "Cultural",
    partner: "Art × Hospitality Residency",
    headline: "12 artists. 6 cities. One menu.",
    note: "A traveling residency that placed commissioned work inside partner pizzerias for a season.",
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
          {/* Offset Rock Salt annotation — restrained, single instance */}
          <span
            aria-hidden
            className="handwritten absolute -top-4 right-2 -rotate-[6deg] text-tomato text-[13px] md:text-sm"
          >
            ↳ community-led, global IRL
          </span>
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-5">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-tomato">§ 06, Why it works</p>
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
        <div className="mt-6 border-2 border-ink bg-cream shadow-[0_24px_60px_-30px_hsl(var(--ink)/0.35)] md:mt-8">
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
            <p className="handwritten mt-4 -rotate-[1.5deg] text-tomato text-[13px]">
              ↳ no two briefs alike
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
                        {i === 0 && (
                          <span className="handwritten mt-1.5 block -rotate-[2deg] text-[11px] text-tomato/80 md:absolute md:right-0 md:top-0 md:mt-0">
                            trusted globally
                          </span>
                        )}
                        {i === 2 && (
                          <span className="handwritten mt-1.5 block rotate-[1deg] text-[11px] text-tomato/80 md:absolute md:right-0 md:top-0 md:mt-0">
                            community-first
                          </span>
                        )}
                        {i === 3 && (
                          <span className="handwritten mt-1.5 block -rotate-[1deg] text-[11px] text-tomato/80 md:absolute md:right-0 md:top-0 md:mt-0">
                            IRL attention
                          </span>
                        )}
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
                <p className="overline text-tomato">§ 07, Possibilities</p>
                <h3 className="font-display mt-4 text-display-2 font-extrabold leading-[0.88] tracking-[-0.02em] md:mt-5">
                  What we build
                  <br />
                  <span className="italic font-serif font-normal text-ink/55">together.</span>
                </h3>
              </div>

              <div className="col-span-12 md:col-span-4 md:pl-10 md:pb-3">
                <p className="font-serif text-[15.5px] leading-[1.65] text-ink/70 md:text-[15px]">
                  Five formats we know how to run, and a hundred more we'd love to invent with you.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {[
              {
                k: "Global Moments",
                v: "Large-scale activations across hundreds of cities, built to create shared global experiences.",
                note: "500+ cities, one weekend",
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
                className="group paper-soft relative flex flex-col overflow-hidden bg-cream p-6 transition-all duration-500 ease-out hover:-translate-y-[3px] hover:bg-cream-warm hover:shadow-[0_30px_70px_-40px_hsl(var(--ink)/0.35),0_8px_24px_-16px_hsl(var(--ink)/0.18)] md:p-8"
              >
                {/* Hairline frame — single top rule, no boxed border */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/15" />

                <div className="flex items-start justify-between">
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

                <h4 className="font-display mt-7 text-2xl font-extrabold leading-[1.05] tracking-[-0.015em] transition-colors duration-500 group-hover:text-tomato md:mt-8 md:text-[1.75rem]">
                  {b.k}
                </h4>

                <p className="font-serif mt-5 text-[14.5px] leading-[1.65] text-ink/70 md:text-[15px]">
                  {b.v}
                </p>

                {/* Handwritten annotation — reveals on hover */}
                <p className="handwritten mt-6 -rotate-[1.5deg] text-tomato text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-90">
                  ↳ {b.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>


      {/* What we've built */}
      <div className="container mt-16 md:mt-20">
        <div className="relative border-t-2 border-ink pt-6 md:pt-8">
          <span aria-hidden className="ui absolute -top-2.5 right-2 bg-butter/30 px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
            Selected, 2021–2025
          </span>
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-5">
            <div className="col-span-12 md:col-span-8">
              <p className="overline text-tomato">§ 08, Proof</p>
              <h3 className="font-display mt-3 text-display-2 font-extrabold leading-[0.92] tracking-[0.005em]">
                What we've
                <br />
                <span className="text-ink-soft">built.</span>
              </h3>
            </div>
            <div className="col-span-12 md:col-span-4 md:pl-8">
              <p className="text-base leading-relaxed text-ink/70 md:text-lg">
                A few programs we're proud of. Each one community-led, partner-supported, and built to last beyond the launch.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3">

          {[
            {
              partner: "Bitcoin Pizza Day",
              headline: "300 cities. One day. One shared moment.",
              points: [
                "Global activation across 100+ countries",
                "20K+ attendees",
                "Earned media + community reach",
              ],
            },
            {
              partner: "Independent Pizzeria Fund",
              headline: "$250K routed directly to neighborhood operators.",
              points: [
                "Direct economic impact",
                "Community trust",
                "Local distribution",
              ],
            },
            {
              partner: "Arts Residency",
              headline: "12 artists. 6 cities. One network.",
              points: [
                "Cultural programming",
                "Creator-led engagement",
                "Long-tail content",
              ],
            },
          ].map((c) => (
            <article
              key={c.partner}
              className="rounded-2xl bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_hsl(var(--ink)/0.3)] md:p-8"
            >
              <div className="ui text-[11px] font-semibold uppercase tracking-[0.18em] text-tomato">
                {c.partner}
              </div>
              <h4 className="font-display mt-3 text-2xl font-extrabold leading-tight md:text-3xl">
                {c.headline}
              </h4>
              <ul className="mt-4 space-y-1.5">

                {c.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tomato" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {/* CTA band, warm butter */}
      <div className="mt-14 bg-butter pb-14 md:mt-20 md:pb-20">
        <div className="container pt-12 md:pt-16">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-8">
              <p className="overline text-tomato">Bespoke programs</p>
              <h3 className="font-display mt-3 text-display-2 font-extrabold leading-[0.95]">
                Let's build something
                <br />
                <span className="text-tomato">people actually show up to.</span>
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
                Tell us what you're trying to do. We'll help shape it into something worth showing up for.
              </p>
            </div>

            <div className="col-span-12 flex flex-col gap-3 md:col-span-4 md:items-end">
              <a
                href="mailto:partnerships@pizzadao.org"
                className="btn-pill-lg bg-tomato text-cream shadow-[0_14px_40px_-16px_hsl(var(--tomato)/0.7)] hover:bg-ink"
              >
                Start a partnership brief →
              </a>
              <a
                href="#"
                className="btn-pill-lg border border-ink/60 text-ink hover:bg-ink hover:text-cream"
              >
                Download partner deck
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsorship;
