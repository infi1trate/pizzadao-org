import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Sparkles, Pizza, Wrench, Palette, Users, Code2, MapPin, CalendarDays } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Footer from "@/components/Footer";
import community from "@/assets/community.jpg";
import hackathon from "@/assets/hackathon.jpg";
import party from "@/assets/timeline-party.jpg";
import hands from "@/assets/hands-pizza.jpg";
import pizzeria from "@/assets/pizzeria.jpg";
import slice from "@/assets/slice.jpg";

const WAYS_IN = [
  {
    icon: Pizza,
    tag: "Host",
    title: "Host local pizza parties",
    note: "Pick a date, pick a pizzeria, we wire the budget and the playbook. You bring the neighborhood.",
    looksLike: "A packed pizzeria on a Saturday, your neighbors meeting for the first time.",
    youDo: "Pick the date, pick the spot, send the invites. We handle budget and logistics.",
    whyEnjoy: "You become the reason people in your city know each other.",
  },
  {
    icon: Wrench,
    tag: "Build",
    title: "Build tools + projects",
    note: "RSVP systems, photo dumps, on-chain receipts, chapter dashboards. Open repos, real users, shipped fast.",
    looksLike: "Open repos used by 60+ chapters within weeks of shipping.",
    youDo: "Pick up an issue, ship a feature, support a chapter that needs it.",
    whyEnjoy: "Your code shows up at parties on the other side of the world.",
  },
  {
    icon: Palette,
    tag: "Create",
    title: "Create art + culture",
    note: "Posters, zines, mixtapes, merch, films. Every chapter ships its own visual language.",
    looksLike: "Posters on walls, zines on tables, mixtapes playing through the speakers.",
    youDo: "Make the work. Submit to the pool. Watch chapters print and remix it.",
    whyEnjoy: "Your art lives in real rooms, not just on feeds.",
  },
  {
    icon: Users,
    tag: "Gather",
    title: "Run meetups + gatherings",
    note: "Long tables, slice clubs, coworking nights. Recurring rituals that hold a city together.",
    looksLike: "A long table that fills up every week, no agenda, no slides.",
    youDo: "Hold the date, hold the room, keep showing up.",
    whyEnjoy: "Strangers become regulars. Regulars become friends.",
  },
  {
    icon: Code2,
    tag: "Organize",
    title: "Organize hackathons",
    note: "Weekend builds with pizzaiolos, designers, and devs in the same room. Prizes paid in slices and grants.",
    looksLike: "Devs, designers and pizzaiolos in the same room for 72 hours.",
    youDo: "Set the prompt, find the venue, line up the pizza, judge the demos.",
    whyEnjoy: "You ship more in one weekend than most teams ship in a quarter.",
  },
  {
    icon: MapPin,
    tag: "Grow",
    title: "Grow chapters",
    note: "Open a city. Onboard organizers. Hand off the keys. New chapters launched by members, not HQ.",
    looksLike: "A new pin on the map, started by people who used to just attend.",
    youDo: "Open a city, onboard the next organizers, then hand them the keys.",
    whyEnjoy: "You leave a chapter behind that outlives your involvement.",
  },
];

const VOICES = [
  {
    name: "Margherita Ciro",
    city: "Naples",
    quote:
      "I came for the pizza. I stayed because nobody asked me what I did for a living.",
  },
  {
    name: "Capo Crust",
    city: "Brooklyn",
    quote:
      "We threw a party for 600 people in a parking lot. Nobody fought. Two people got engaged.",
  },
  {
    name: "Don Mami",
    city: "Mexico City",
    quote:
      "PizzaDAO is the only group chat I haven't muted in three years.",
  },
  {
    name: "Sister Marinara",
    city: "Lagos",
    quote:
      "Our chapter started with four friends and a folding table. Now it's the block's calendar.",
  },
];

const RITUALS = [
  { k: "Mon", v: "Open call, anyone can pitch a project." },
  { k: "Wed", v: "Chapter sync, 60+ cities, one shared notebook." },
  { k: "Fri", v: "Field reports drop in #journal." },
  { k: "Sun", v: "Slice club, long table, no agenda." },
];

const BUILDS = [
  {
    type: "Hackathon",
    name: "Slice Hack '25",
    img: hackathon,
    what: "A 72-hour, multi-city build sprint. One brief, one weekend, every chapter shipping in parallel.",
    who: "Led by Tokyo + Brooklyn chapters, 240 builders across 14 cities.",
    outcome: "31 projects shipped. 9 funded with chapter grants. 4 still in production today.",
  },
  {
    type: "Tool",
    name: "Open RSVP",
    img: null,
    what: "A no-account RSVP system built specifically for chapter parties — no logins, no marketing list.",
    who: "Built by @lina.eth and 6 contributors over three working weekends.",
    outcome: "Used by 60+ chapters. 40k RSVPs and counting. Forked into 3 sibling tools.",
  },
  {
    type: "Experiment",
    name: "On-chain receipts",
    img: null,
    what: "Every party logs an on-chain proof of attendance. Members collect them, sponsors verify them.",
    who: "Prototyped at Slice Hack '24 by a five-person crew from CDMX, Berlin, and Lagos.",
    outcome: "12,000+ receipts minted. Now the default check-in for chapter events.",
  },
  {
    type: "Partner build",
    name: "Poster Pool Vol. III",
    img: party,
    what: "Open-call poster series, co-funded with a print partner. Free for any chapter to use.",
    who: "Curated by @capo.crust with 84 submissions from 23 countries.",
    outcome: "Printed and shipped to every active chapter. Three designers picked up paid commissions.",
  },
  {
    type: "Tool",
    name: "Chapter Atlas",
    img: pizzeria,
    what: "Live map of every active chapter, organizer, and upcoming event. Open data, public API.",
    who: "Maintained by the Atlas working group — 4 contributors on rotation.",
    outcome: "Now the canonical source. Used by sponsors, journalists, and new organizers opening cities.",
  },
];

const ROLES = [
  {
    code: "R.01",
    name: "Host",
    desc: "You open the door. You pick the date, the pizzeria, the playlist. You make strangers feel like neighbors.",
    cta: "Host a party",
    href: "/join",
  },
  {
    code: "R.02",
    name: "Builder",
    desc: "You ship the tools the chapters run on. RSVP, receipts, dashboards, anything that removes friction.",
    cta: "Pick up an issue",
    href: "/join",
  },
  {
    code: "R.03",
    name: "Creative",
    desc: "You make the work look like itself. Posters, zines, films, mixtapes, merch. Visual language for a movement.",
    cta: "Submit to the pool",
    href: "/join",
  },
  {
    code: "R.04",
    name: "Connector",
    desc: "You introduce people. You bring the pizzaiolo to the dev, the artist to the organizer. You hold the room.",
    cta: "Open a chapter",
    href: "/join",
  },
  {
    code: "R.05",
    name: "Supporter",
    desc: "You back the work, with funding, with reach, with hands. You don't need a stage. You move things forward.",
    cta: "Sponsor a chapter",
    href: "/partners",
  },
];

const CommunityPage = () => {
  const [calOpen, setCalOpen] = useState(false);
  useEffect(() => {
    document.title = "Community, PizzaDAO";
  }, []);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteNav solid />

      {/* HERO, participatory, image-led */}
      <HeroSection />

      {/* ONBOARDING STRIP, three steps */}
      <section className="bg-cream py-12 md:py-16">
        <div className="container">
          <div className="flex items-baseline justify-between gap-6">
            <p className="overline text-tomato">Get started</p>
            <p className="ui hidden text-[10px] uppercase tracking-[0.22em] text-ink/45 md:block">
              Three steps · no application
            </p>
          </div>

          <ol className="mt-6 grid grid-cols-1 items-stretch gap-3 md:mt-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-0">
            {[
              { n: "01", title: "Join a city", desc: "Find your local chapter and say hi.", href: "/join" },
              { n: "02", title: "Show up to something", desc: "A long table, a hack night, a slice club.", href: "#ways-in" },
              { n: "03", title: "Start something", desc: "Host a party. Ship a tool. Open a chapter.", href: "/join" },
            ].flatMap((s, i, arr) => {
              const items = [
                <li key={s.n}>
                  <a
                    href={s.href}
                    className="group flex h-full flex-col rounded-2xl bg-cream-warm p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-butter hover:shadow-[0_18px_40px_-22px_hsl(var(--ink)/0.35)] md:p-7"
                  >
                    <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
                      <span className="tabular-nums">Step {s.n}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="font-display mt-4 text-2xl font-extrabold leading-[1] md:text-[26px]">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{s.desc}</p>
                  </a>
                </li>,
              ];
              if (i < arr.length - 1) {
                items.push(
                  <li key={`sep-${i}`} aria-hidden className="hidden items-center justify-center px-2 text-ink/30 md:flex">
                    <span className="ui text-2xl leading-none">→</span>
                  </li>,
                );
              }
              return items;
            })}
          </ol>
        </div>
      </section>

      {/* MANIFESTO STRIP, high contrast slab */}
      <section className="bg-ink py-16 text-cream md:py-24">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-butter">Manifesto</p>
              <h2 className="font-display mt-5 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.88] tracking-[-0.01em]">
                Show up.
                <br />
                <span className="text-tomato">Make something.</span>
                <br />
                Feed someone.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
                There is no application form. No tier system. No premium tier.
                The Mafia is whoever decides to do the work this week. Some
                members ship code. Some ship pizza. Most do both.
              </p>
              <ul className="mt-10 space-y-4 border-t border-cream/20 pt-8">
                {[
                  "Anyone can propose a project.",
                  "Anyone can run a chapter.",
                  "Money flows to whoever does the work.",
                  "Credit goes to the city, not the founder.",
                ].map((r, i) => (
                  <li
                    key={r}
                    className="flex items-baseline gap-5 border-b border-cream/15 pb-4"
                  >
                    <span className="ui w-8 text-[11px] tabular-nums text-butter">
                      0{i + 1}
                    </span>
                    <span className="font-display text-xl font-extrabold leading-snug md:text-2xl">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER, liveness band between sections */}
      <div className="overflow-hidden border-y-2 border-ink bg-tomato py-3 text-cream">
        <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
              {[
                "60+ chapters",
                "3,000+ members",
                "12 events this week",
                "47 open projects",
                "No fees",
                "No tiers",
                "Anyone can host",
                "Money flows to the work",
                "Credit to the city",
              ].map((t) => (
                <span
                  key={`${k}-${t}`}
                  className="ui flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.22em]"
                >
                  {t}
                  <span className="text-butter">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WAYS IN, participatory grid */}
      <section id="ways-in" className="bg-cream py-16 md:py-24">
        <div className="container">
          <div className="border-t-2 border-ink pt-8 md:pt-10">
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <div className="col-span-12 md:col-span-7">
                <p className="overline text-tomato">§ C.01, What members actually do</p>
                <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                  Six things.
                  <br />
                  Start with one.
                </h2>
              </div>
              <div className="col-span-12 md:col-span-5 md:pl-8">
                <p className="text-base leading-relaxed text-ink/75 md:text-lg">
                  No ambiguity. No tier system. No application form. These are
                  the six things members are doing right now, in cities all over
                  the world. Pick the one you can start this week.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border-2 border-ink bg-ink/15 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {WAYS_IN.map((w, i) => {
              const Icon = w.icon;
              return (
                <article
                  key={w.title}
                  className="group relative flex flex-col bg-cream p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-butter hover:shadow-[0_24px_60px_-20px_hsl(var(--ink)/0.35)] md:p-10"
                >
                  <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/55">
                    <span className="rounded-full bg-tomato px-2.5 py-1 text-cream">
                      {w.tag}
                    </span>
                    <span className="tabular-nums">
                      {String(i + 1).padStart(2, "0")} / 06
                    </span>
                  </div>
                  <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-butter transition-colors group-hover:bg-cream">
                    <Icon className="h-6 w-6 text-ink" strokeWidth={2.25} />
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-extrabold leading-[1] md:text-[28px]">
                    {w.title}
                  </h3>

                  <dl className="mt-7 flex-1 space-y-5">
                    {[
                      { k: "What it looks like", v: w.looksLike },
                      { k: "What you actually do", v: w.youDo },
                      { k: "Why people enjoy it", v: w.whyEnjoy },
                    ].map((row) => (
                      <div key={row.k}>
                        <dt className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                          {row.k}
                        </dt>
                        <dd className="mt-1.5 text-[15px] leading-relaxed text-ink/80">
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-9 flex items-center justify-end border-t border-ink/15 pt-5">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROLES, choose your role in the system */}
      <section className="bg-ink py-16 text-cream md:py-24">
        <div className="container">
          <div className="border-t-2 border-cream/25 pt-8 md:pt-10">
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <div className="col-span-12 md:col-span-8">
                <p className="overline text-butter">§ C.02, Ways to show up</p>
                <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                  Pick your role.
                  <br />
                  <span className="text-butter">Wear it loud.</span>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:pl-8">
                <p className="text-base leading-relaxed text-cream/80 md:text-lg">
                  Every working chapter has all five. You don't have to be all
                  of them. You just have to be one, for now.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-14 -mx-5 md:-mx-8 lg:-mx-10">
            <div
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 md:gap-6 md:scroll-px-8 md:px-8 lg:scroll-px-10 lg:px-10"
              style={{ scrollbarWidth: "thin" }}
            >
              {/* Role card — large */}
              <article className="group relative flex w-[78%] shrink-0 snap-start flex-col justify-between rounded-3xl bg-tomato p-7 text-cream transition-all duration-300 hover:brightness-110 sm:w-[440px] md:p-9 lg:w-[520px]">
                <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/70">
                  <span>Role · {ROLES[0].code}</span>
                  <span>01 / 09</span>
                </div>
                <h3 className="font-display mt-8 text-[clamp(2.75rem,4vw,3.75rem)] font-extrabold leading-[0.9] tracking-[-0.01em]">
                  {ROLES[0].name}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-cream/90 md:text-lg">{ROLES[0].desc}</p>
                <a href={ROLES[0].href} className="mt-10 inline-flex items-center justify-between gap-3 border-t border-cream/30 pt-4">
                  <span className="font-display text-base font-extrabold text-butter">{ROLES[0].cta}</span>
                  <ArrowUpRight className="h-5 w-5 text-butter" />
                </a>
              </article>

              {/* Photo card */}
              <figure className="group relative flex w-[68%] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink transition-all duration-300 hover:brightness-110 sm:w-[340px] lg:w-[400px]">
                <img src={hands} alt="Hands sharing pizza at a Lagos open kitchen" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <figcaption className="ui absolute bottom-0 left-0 right-0 flex items-center justify-between bg-ink/80 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-cream backdrop-blur-sm">
                  <span>Lagos · open kitchen</span>
                  <span className="text-butter">●</span>
                </figcaption>
              </figure>

              {/* Quote card */}
              <article className="group relative flex w-[80%] shrink-0 snap-start flex-col justify-between rounded-3xl bg-butter p-7 text-ink transition-all duration-300 hover:brightness-105 sm:w-[420px] md:p-9 lg:w-[480px]">
                <Sparkles className="h-6 w-6 text-tomato" />
                <blockquote className="font-display mt-6 text-[clamp(1.6rem,2.4vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.005em]">
                  “{VOICES[1].quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-baseline justify-between border-t border-ink/20 pt-4">
                  <div>
                    <div className="font-display text-lg font-extrabold">{VOICES[1].name}</div>
                    <div className="ui mt-1 text-[10px] uppercase tracking-[0.2em] text-ink/55">Chapter · {VOICES[1].city}</div>
                  </div>
                </figcaption>
              </article>

              {/* Role card */}
              <article className="group relative flex w-[72%] shrink-0 snap-start flex-col justify-between rounded-3xl bg-ink p-7 text-cream transition-all duration-300 hover:brightness-110 sm:w-[380px] md:p-9 lg:w-[440px]">
                <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-butter">
                  <span>Role · {ROLES[1].code}</span>
                  <span className="text-cream/45">04 / 09</span>
                </div>
                <h3 className="font-display mt-8 text-[clamp(2.5rem,3.4vw,3.25rem)] font-extrabold leading-[0.9] tracking-[-0.01em]">{ROLES[1].name}</h3>
                <p className="mt-5 text-base leading-relaxed text-cream/85">{ROLES[1].desc}</p>
                <a href={ROLES[1].href} className="mt-10 inline-flex items-center justify-between gap-3 border-t border-cream/20 pt-4">
                  <span className="font-display text-base font-extrabold text-butter">{ROLES[1].cta}</span>
                  <ArrowUpRight className="h-5 w-5 text-butter" />
                </a>
              </article>

              {/* Screenshot / chat card */}
              <article className="group relative flex w-[74%] shrink-0 snap-start flex-col justify-between rounded-3xl border border-ink/15 bg-cream p-6 text-ink shadow-[0_22px_60px_-30px_hsl(var(--ink)/0.4)] transition-all duration-300 hover:brightness-105 sm:w-[360px] md:p-7 lg:w-[420px]">
                <div className="ui flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
                  <span>#chapters · today</span>
                  <span className="rounded-full bg-tomato px-2 py-0.5 text-cream">live</span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl rounded-bl-sm bg-cream-warm border border-ink/10 px-4 py-3 text-sm leading-snug">
                    <div className="ui text-[9px] uppercase tracking-[0.2em] text-ink/50">@lina.eth · Berlin</div>
                    <div className="mt-1.5">long table at Hermannplatz friday. 40 chairs, BYO wine 🍷</div>
                  </div>
                  <div className="rounded-2xl rounded-bl-sm bg-butter/60 px-4 py-3 text-sm leading-snug">
                    <div className="ui text-[9px] uppercase tracking-[0.2em] text-ink/50">@capo.crust · Brooklyn</div>
                    <div className="mt-1.5">stealing this. doing one in Bushwick saturday 🍕</div>
                  </div>
                  <div className="rounded-2xl rounded-bl-sm bg-cream-warm border border-ink/10 px-4 py-3 text-sm leading-snug">
                    <div className="ui text-[9px] uppercase tracking-[0.2em] text-ink/50">@donmami · CDMX</div>
                    <div className="mt-1.5">domingo, Roma Norte. ya tenemos 60 personas 👀</div>
                  </div>
                </div>
              </article>

              {/* Role card */}
              <article className="group relative flex w-[72%] shrink-0 snap-start flex-col justify-between rounded-3xl bg-ink p-7 text-cream transition-all duration-300 hover:brightness-110 sm:w-[380px] md:p-9 lg:w-[440px]">
                <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-butter">
                  <span>Role · {ROLES[2].code}</span>
                  <span className="text-cream/45">06 / 09</span>
                </div>
                <h3 className="font-display mt-8 text-[clamp(2.5rem,3.4vw,3.25rem)] font-extrabold leading-[0.9] tracking-[-0.01em]">{ROLES[2].name}</h3>
                <p className="mt-5 text-base leading-relaxed text-cream/85">{ROLES[2].desc}</p>
                <a href={ROLES[2].href} className="mt-10 inline-flex items-center justify-between gap-3 border-t border-cream/20 pt-4">
                  <span className="font-display text-base font-extrabold text-butter">{ROLES[2].cta}</span>
                  <ArrowUpRight className="h-5 w-5 text-butter" />
                </a>
              </article>

              {/* Photo card — landscape large */}
              <figure className="group relative flex w-[88%] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink transition-all duration-300 hover:brightness-110 sm:w-[520px] lg:w-[620px]">
                <img src={party} alt="Berlin long-table dinner stretching down the street at dusk" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <figcaption className="ui absolute bottom-0 left-0 right-0 flex items-center justify-between bg-ink/80 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-cream backdrop-blur-sm">
                  <span>Berlin · long table, vol. 47</span>
                  <span className="text-butter">●</span>
                </figcaption>
              </figure>

              {/* Role card */}
              <article className="group relative flex w-[72%] shrink-0 snap-start flex-col justify-between rounded-3xl bg-tomato/95 p-7 text-cream transition-all duration-300 hover:brightness-110 sm:w-[380px] md:p-9 lg:w-[440px]">
                <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/80">
                  <span>Role · {ROLES[3].code}</span>
                  <span>08 / 09</span>
                </div>
                <h3 className="font-display mt-8 text-[clamp(2.5rem,3.4vw,3.25rem)] font-extrabold leading-[0.9] tracking-[-0.01em]">{ROLES[3].name}</h3>
                <p className="mt-5 text-base leading-relaxed text-cream/90">{ROLES[3].desc}</p>
                <a href={ROLES[3].href} className="mt-10 inline-flex items-center justify-between gap-3 border-t border-cream/30 pt-4">
                  <span className="font-display text-base font-extrabold text-butter">{ROLES[3].cta}</span>
                  <ArrowUpRight className="h-5 w-5 text-butter" />
                </a>
              </article>

              {/* Role card */}
              <article className="group relative flex w-[72%] shrink-0 snap-start flex-col justify-between rounded-3xl bg-ink p-7 text-cream transition-all duration-300 hover:brightness-110 sm:w-[380px] md:p-9 lg:w-[440px]">
                <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-butter">
                  <span>Role · {ROLES[4].code}</span>
                  <span className="text-cream/45">09 / 09</span>
                </div>
                <h3 className="font-display mt-8 text-[clamp(2.5rem,3.4vw,3.25rem)] font-extrabold leading-[0.9] tracking-[-0.01em]">{ROLES[4].name}</h3>
                <p className="mt-5 text-base leading-relaxed text-cream/85">{ROLES[4].desc}</p>
                <a href={ROLES[4].href} className="mt-10 inline-flex items-center justify-between gap-3 border-t border-cream/20 pt-4">
                  <span className="font-display text-base font-extrabold text-butter">{ROLES[4].cta}</span>
                  <ArrowUpRight className="h-5 w-5 text-butter" />
                </a>
              </article>

              {/* trailing spacer for nicer snap end */}
              <div className="w-2 shrink-0" aria-hidden />
            </div>
            <p className="ui mt-2 px-5 text-[10px] uppercase tracking-[0.22em] text-cream/45 md:px-8 lg:px-10">Drag · scroll · keep going →</p>
          </div>
        </div>
      </section>

      {/* THIS WEEK, stylized weekly calendar + featured events */}
      <ThisWeekSection onOpenCalendar={() => setCalOpen(true)} />

      <Dialog open={calOpen} onOpenChange={setCalOpen}>
        <DialogContent className="max-w-4xl bg-cream p-0">
          <DialogHeader className="border-b border-ink/15 px-6 py-4">
            <DialogTitle className="font-display text-2xl font-extrabold">Full PizzaDAO calendar</DialogTitle>
          </DialogHeader>
          <div className="aspect-[4/3] w-full">
            <iframe
              title="PizzaDAO Google Calendar"
              src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=UTC"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* VOICES, magazine pull-quotes on butter */}
      <section className="bg-butter py-16 text-ink md:py-24">
        <div className="container">
          <div className="border-t-2 border-ink pt-8 md:pt-10">
            <p className="overline text-tomato">§ C.03, Voices from the floor</p>
            <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
              Unedited.
              <br />
              From members.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
            {VOICES.map((v, i) => (
              <figure
                key={v.name}
                className="relative flex flex-col justify-between rounded-2xl border-2 border-ink bg-cream p-6 md:p-8"
              >
                <Sparkles className="absolute right-6 top-6 h-5 w-5 text-tomato" />
                <blockquote className="font-display text-2xl font-extrabold leading-[1.05] tracking-[-0.005em] md:text-3xl">
                  “{v.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-baseline justify-between border-t border-ink/15 pt-4">
                  <div>
                    <div className="font-display text-lg font-extrabold leading-tight">
                      {v.name}
                    </div>
                    <div className="ui mt-1 text-[10px] uppercase tracking-[0.2em] text-ink/55">
                      Chapter · {v.city}
                    </div>
                  </div>
                  <span className="ui text-[10px] tabular-nums text-ink/40">
                    Vol. {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE PULSE, slim auto-scrolling activity feed */}
      <div className="border-y border-ink/10 bg-cream-warm">
        <div className="flex items-center gap-4 overflow-hidden py-3">
          <span className="ui ml-5 hidden shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-tomato md:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tomato opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tomato" />
            </span>
            Live · right now
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
              {(() => {
                const PULSE = [
                  "Someone in Lisbon just hosted a pizza night",
                  "3 new members joined in Tokyo",
                  "Hackathon project shipped in NYC",
                  "Long table forming in Berlin · Friday",
                  "Open RSVP crossed 40k tonight",
                  "New chapter opened in Nairobi",
                  "Slice club, vol. 47 confirmed in Lisbon",
                  "On-chain receipt minted in CDMX",
                  "Poster Pool submission from Buenos Aires",
                  "Chapter sync starting in 12 minutes",
                ];
                const loop = [...PULSE, ...PULSE];
                return loop.map((t, i) => (
                  <span key={i} className="ui flex items-center gap-10 text-[12px] text-ink/75">
                    {t}
                    <span className="text-tomato/50" aria-hidden>●</span>
                  </span>
                ));
              })()}
            </div>
            {/* edge fades */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-cream-warm to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-cream-warm to-transparent" />
          </div>
        </div>
      </div>

      {/* THE WORKSHOP, builder-focused outputs */}
      <section className="relative bg-ink py-16 text-cream md:py-24">
        <div className="container">
          <div className="border-t-2 border-cream/25 pt-8 md:pt-10">
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <div className="col-span-12 md:col-span-8">
                <p className="overline text-butter">§ C.05, The workshop</p>
                <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                  This isn't just a community.
                  <br />
                  <span className="text-butter">It's a workshop.</span>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:pl-8">
                <p className="text-base leading-relaxed text-cream/80 md:text-lg">
                  Members don't just show up — they prototype, ship, and remix
                  in the open. Hackathons, tools, experiments, and partner
                  builds, made together and given back to the network.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
            {BUILDS.map((b, i) => (
              <article
                key={b.name}
                className={`group relative flex flex-col overflow-hidden rounded-2xl bg-cream text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_hsl(var(--tomato)/0.45)] ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                {b.img ? (
                  <div className={`relative overflow-hidden bg-ink ${i === 0 ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
                    <img
                      src={b.img}
                      alt={b.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                ) : (
                  <div className={`flex items-end justify-between bg-ink p-7 text-cream ${i === 0 ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
                    <span className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[0.9] text-butter">
                      {b.name}
                    </span>
                    <span className="ui text-[10px] uppercase tracking-[0.22em] text-cream/55">
                      In the workshop
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/55">
                    <span className="rounded-full bg-tomato px-2.5 py-1 text-cream">
                      {b.type}
                    </span>
                    <span className="tabular-nums">
                      {String(i + 1).padStart(2, "0")} / 0{BUILDS.length}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-extrabold leading-[1.05] md:text-[28px]">
                    {b.name}
                  </h3>

                  <dl className="mt-5 flex-1 space-y-4">
                    {[
                      { k: "What it is", v: b.what },
                      { k: "Who made it", v: b.who },
                      { k: "What came out of it", v: b.outcome },
                    ].map((row) => (
                      <div key={row.k}>
                        <dt className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                          {row.k}
                        </dt>
                        <dd className="mt-1.5 text-[15px] leading-relaxed text-ink/80">
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-7 flex items-center justify-end border-t border-ink/15 pt-4">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RAW STRIP, behind-the-scenes scrolling images */}
      <section className="bg-cream py-12 md:py-16">
        <div className="container">
          <div className="flex items-baseline justify-between gap-6">
            <p className="overline text-tomato">From the camera roll</p>
            <p className="ui hidden text-[10px] uppercase tracking-[0.22em] text-ink/45 md:block">
              Unedited · last 30 days
            </p>
          </div>
        </div>

        <div className="mt-6 -mx-5 md:mt-8 md:-mx-8 lg:-mx-10">
          <div className="flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:gap-5 md:px-8 lg:px-10">
            {[
              { img: hands,     cap: "Lagos · open kitchen, 22:14",      ratio: "4/5",   rot: -1.2, w: "w-[60%] sm:w-[280px] md:w-[320px]" },
              { img: party,     cap: "Berlin · long table, vol. 47",      ratio: "16/10", rot: 0.8,  w: "w-[78%] sm:w-[420px] md:w-[480px]" },
              { img: hackathon, cap: "Tokyo · slice hack, demo night",   ratio: "1/1",   rot: -0.6, w: "w-[60%] sm:w-[300px] md:w-[340px]" },
              { img: slice,     cap: "Lisbon · sunday slice club",        ratio: "5/4",  rot: 1.4,  w: "w-[68%] sm:w-[360px] md:w-[400px]" },
              { img: pizzeria,  cap: "Naples · the oven, 03:00",          ratio: "3/4",   rot: -1.8, w: "w-[58%] sm:w-[270px] md:w-[300px]" },
              { img: community, cap: "CDMX · sunday block party",         ratio: "16/10", rot: 0.6,  w: "w-[78%] sm:w-[440px] md:w-[500px]" },
            ].map((p, i) => (
              <figure
                key={i}
                className={`group shrink-0 snap-start ${p.w}`}
                style={{ transform: `rotate(${p.rot}deg)` }}
              >
                <div
                  className="relative overflow-hidden rounded-xl bg-ink shadow-[0_18px_40px_-22px_hsl(var(--ink)/0.4)] transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:shadow-[0_24px_55px_-20px_hsl(var(--tomato)/0.4)]"
                  style={{ aspectRatio: p.ratio }}
                >
                  <img
                    src={p.img}
                    alt={p.cap}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: i % 2 === 0 ? "30% 40%" : "65% 55%" }}
                  />
                </div>
                <figcaption className="ui mt-2 text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  {p.cap}
                </figcaption>
              </figure>
            ))}
            <div className="w-2 shrink-0" aria-hidden />
          </div>
        </div>
      </section>

      {/* CONTACT SHEET, image wall, slightly chaotic but structured */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container">
          <div className="border-t-2 border-ink pt-8 md:pt-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="overline text-tomato">§ C.06, Contact sheet</p>
                <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                  This week,
                  <br />
                  somewhere on Earth.
                </h2>
              </div>
              <span className="ui hidden text-[10px] uppercase tracking-[0.22em] text-ink/55 md:block">
                Roll 014 · 6 frames
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-6 grid-rows-2 gap-3 md:mt-14 md:gap-4">
            <Frame img={community} caption="Lisbon · Block party" span="col-span-6 md:col-span-3 md:row-span-2 aspect-[4/3] md:aspect-auto" />
            <Frame img={party} caption="Berlin · Long table" span="col-span-3 md:col-span-2 aspect-square" />
            <Frame img={hackathon} caption="Tokyo · Build night" span="col-span-3 md:col-span-1 aspect-square" />
            <Frame img={hands} caption="Lagos · Open kitchen" span="col-span-2 aspect-square" />
            <Frame img={pizzeria} caption="Mexico City · Pop-up" span="col-span-2 aspect-square" />
            <Frame img={slice} caption="Brooklyn · Slice drop" span="col-span-2 aspect-square" />
          </div>
        </div>
      </section>

      {/* WEEKLY RHYTHM, structured ledger */}
      <section className="bg-ink py-16 text-cream md:py-24">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-butter">§ C.07, Weekly rhythm</p>
              <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                The week,
                <br />
                <span className="text-butter">on repeat.</span>
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/80 md:text-lg">
                Most of the work happens in public. These are the four moments
                you can count on every week, in every timezone.
              </p>
            </div>
            <div className="col-span-12 md:col-span-7 md:pl-8">
              <ul className="border-t border-cream/20">
                {RITUALS.map((r, i) => (
                  <li
                    key={r.k}
                    className="grid grid-cols-12 items-baseline gap-x-6 border-b border-cream/15 py-6 md:py-8"
                  >
                    <span className="ui col-span-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-butter md:col-span-2">
                      {r.k}
                    </span>
                    <span className="font-display col-span-9 text-xl font-extrabold leading-snug md:col-span-9 md:text-2xl">
                      {r.v}
                    </span>
                    <span className="ui col-span-1 text-right text-[10px] tabular-nums text-cream/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN CALLS, participatory needs */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container">
          <div className="border-t-2 border-ink pt-8 md:pt-10">
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <div className="col-span-12 lg:col-span-5">
                <p className="overline text-tomato">§ C.07b, Open calls</p>
                <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                  Open calls.
                </h2>
                <p className="ui mt-4 text-sm italic text-ink/55 md:text-base">
                  Choose your role. Or invent a new one.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-6">
                <p className="text-left text-base leading-[1.6] text-ink/75 md:text-lg">
                  PizzaDAO grows through people who start things.
                  <br />
                  Some arrive with expertise. Others with curiosity.
                  <br />
                  We build together.
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10 md:mt-16">
            {[
              {
                tags: ["Global", "BD", "Partnerships"],
                title: "Superconnectors & partnership leads",
                note: "Connect brands, communities, and ideas. Help grow the PizzaDAO network through partnerships, introductions, and cultural collaborations.",
              },
              {
                tags: ["Pizza", "Operations", "Hospitality"],
                title: "Pizzaiolos, operators & pizza builders",
                note: "Run a shop? Obsessed with dough, systems, or hospitality? Bring the challenges. We'll bring builders and experimentation.",
              },
              {
                tags: ["Remote", "AI", "Product"],
                title: "AI-native builders, engineers & designers",
                note: "Help build world-class AI tools and digital experiences for pizza shops, communities, and small businesses.",
              },
              {
                tags: ["Media", "Creator", "Culture"],
                title: "Creators, streamers & storytellers",
                note: "Help expand the reach and mythology of PizzaDAO through content, media, internet culture, and emerging platforms.",
              },
              {
                tags: ["Events", "Community", "IRL"],
                title: "Community organizers & event architects",
                note: "Create unforgettable pizza experiences. Meetups, hackathons, dinners, workshops, art shows, and everything in between.",
              },
            ].map((c, i) => (
              <li key={c.title}>
                <a
                  href="/join"
                  className="group block px-3 py-6 transition-colors hover:bg-butter/30 md:px-4 md:py-7 lg:py-6"
                >
                  {/* Mobile: stacked editorial block */}
                  <div className="flex flex-col gap-3 md:hidden">
                    <div className="flex items-start justify-between gap-4">
                      <span className="ui text-[10px] font-semibold tabular-nums uppercase tracking-[0.22em] text-ink/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-tomato" />
                    </div>
                    <h3 className="font-display text-left text-xl font-extrabold leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-left text-[15px] leading-[1.65] text-ink/70">
                      {c.note}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="ui rounded-full border border-ink/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/65"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tablet: 2-col layout */}
                  <div className="hidden md:grid md:grid-cols-12 md:items-start md:gap-x-6 lg:hidden">
                    <div className="col-span-5 flex items-start gap-4">
                      <span className="ui shrink-0 pt-1 text-[10px] font-semibold tabular-nums uppercase tracking-[0.22em] text-ink/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-left text-xl font-extrabold leading-snug md:text-2xl">
                        {c.title}
                      </h3>
                    </div>
                    <div className="col-span-7 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <p className="flex-1 text-left text-[15px] leading-[1.65] text-ink/70">
                          {c.note}
                        </p>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-tomato" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            className="ui rounded-full border border-ink/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/65"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop: 12-col grid */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-6">
                    <span className="ui col-span-1 text-[10px] font-semibold tabular-nums uppercase tracking-[0.22em] text-ink/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display col-span-4 text-left text-xl font-extrabold leading-snug lg:text-2xl">
                      {c.title}
                    </h3>
                    <p className="col-span-4 text-left text-[15px] leading-[1.6] text-ink/70">
                      {c.note}
                    </p>
                    <div className="col-span-2 flex flex-wrap items-center gap-1.5">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="ui rounded-full border border-ink/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/65"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="col-span-1 h-5 w-5 justify-self-end text-ink/50 transition-transform group-hover:translate-x-1 group-hover:text-tomato" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* JOIN, identity onboarding, four steps */}
      <section className="bg-butter py-16 text-ink md:py-24">
        <div className="container">
          <div className="border-t-2 border-ink pt-8 md:pt-10">
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <div className="col-span-12 md:col-span-8">
                <p className="overline text-tomato">§ C.08, Initiation</p>
                <h2 className="font-display mt-5 text-[clamp(2.75rem,7vw,5.75rem)] font-extrabold leading-[0.88] tracking-[-0.01em]">
                  Pick your name.
                  <br />
                  <span className="italic font-normal">Earn your slice.</span>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:pl-8">
                <p className="text-base leading-relaxed text-ink/75 md:text-lg">
                  Joining the Pizza Mafia takes about ten minutes. You don't
                  fill out a form. You pick an alias, walk into the room, and
                  start.
                </p>
              </div>
            </div>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border-2 border-ink bg-ink md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Forge your name",
                desc: "Don Pepperoni. Sister Marinara. Capo Crust. Pick the alias you want the Mafia to know you by.",
                cta: "Generate a name",
                href: "/join",
              },
              {
                step: "02",
                title: "Walk into Discord",
                desc: "One link. No application. The room is already loud and someone will say hi within an hour.",
                cta: "Open the door",
                href: "/join",
              },
              {
                step: "03",
                title: "Claim your role",
                desc: "Host, Builder, Creative, Connector, Supporter. Pick one. You can stack more later, most members do.",
                cta: "Pick a role",
                href: "/join",
              },
              {
                step: "04",
                title: "Start building",
                desc: "Throw a party. Ship a tool. Make a poster. The work begins the day you show up, not when you're 'ready.'",
                cta: "See open projects",
                href: "/join",
              },
            ].map((s) => (
              <li
                key={s.step}
                className="group relative flex flex-col bg-cream p-7 transition-colors hover:bg-butter md:p-9"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[clamp(3.5rem,5vw,5.5rem)] font-extrabold leading-none text-tomato">
                    {s.step}
                  </span>
                  <span className="ui text-[10px] uppercase tracking-[0.22em] text-ink/45">
                    Step {s.step} / 04
                  </span>
                </div>
                <h3 className="font-display mt-6 text-2xl font-extrabold leading-[1.05] md:text-[26px]">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink/75">
                  {s.desc}
                </p>
                <a
                  href={s.href}
                  className="mt-8 inline-flex items-center justify-between gap-3 border-t border-ink/15 pt-4"
                >
                  <span className="font-display text-base font-extrabold tracking-tight text-ink">
                    {s.cta}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-ink bg-ink p-6 text-cream md:mt-12 md:flex-row md:items-center md:p-8">
            <div className="flex-1">
              <p className="overline text-butter">House rules</p>
              <p className="font-display mt-3 text-xl font-extrabold leading-snug md:text-2xl">
                No fees. No tiers. No gatekeepers. The only requirement is that
                you show up and do something.
              </p>
            </div>
            <a
              href="/join"
              className="btn-pill-lg bg-tomato text-cream hover:bg-cream hover:text-ink"
            >
              Start initiation →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tomato py-16 text-cream md:py-24">
        <div className="container">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-8">
              <p className="overline text-butter">Next</p>
              <h2 className="font-display mt-4 text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.88]">
                Don't apply.
                <br />
                <span className="italic font-normal">Just start.</span>
              </h2>
              <RotatingPrompt />
            </div>
            <div className="col-span-12 flex flex-col gap-3 md:col-span-4 md:items-end">
              <a
                href="/join"
                className="btn-pill-lg bg-ink text-cream hover:bg-cream hover:text-ink"
              >
                Join the Mafia →
              </a>
              <a
                href="/#journal"
                className="btn-pill-lg border-2 border-cream/50 text-cream hover:border-butter hover:text-butter"
              >
                Read field reports
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const ROTATING_PROMPTS = [
  "Start a chapter.",
  "Host a night.",
  "Build something weird.",
];

const RotatingPrompt = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROTATING_PROMPTS.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="font-display mt-6 h-8 text-2xl font-extrabold leading-none text-butter md:h-10 md:text-3xl"
      aria-live="polite"
    >
      <span
        key={i}
        className="inline-block animate-fade-in"
      >
        → {ROTATING_PROMPTS[i]}
      </span>
    </div>
  );
};

const Frame = ({
  img,
  caption,
  span,
}: {
  img: string;
  caption: string;
  span: string;
}) => (
  <figure className={`group relative overflow-hidden rounded-2xl border-2 border-ink bg-ink ${span}`}>
    <img
      src={img}
      alt={caption}
      loading="lazy"
      className="grain absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
    <figcaption className="ui absolute bottom-0 left-0 right-0 flex items-center justify-between bg-ink/85 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-cream">
      <span>{caption}</span>
      <span className="text-butter">●</span>
    </figcaption>
  </figure>
);

const HeroFrame = Frame;

type HeroTile = {
  img?: string;
  video?: string;
  poster?: string;
  caption: string;
};

const HERO_IMAGES: HeroTile[] = [
  { img: "/media/nyc-rp-teaser-poster.jpg", caption: "New York City · RP Reveal" },
  {
    video: "https://www.dropbox.com/scl/fi/c2zu0k44nsh753zaaseri/Video-Apr-26-2023-1-18-01-AM.mov?rlkey=bqnbkqjqxdm2nze2xeqgdcjnx&raw=1",
    poster: "/media/wen-pizza-nyc-poster.jpg",
    caption: "New York City · Wen Pizza",
  },
  { img: "/media/community-yerevan-poster.jpg", caption: "Yerevan · long table" },
  { img: "/media/community-prayagraj-poster.jpg", caption: "Prayagraj · slice drop" },
  { img: "/media/community-amsterdam.jpg", caption: "Amsterdam · the whole crew" },
  { img: "/media/community-melbourne.jpg", caption: "Melbourne · panel night" },
  { img: "/media/community-japan.jpg", caption: "Japan · pie in progress" },
  { img: "/media/community-quito.jpg", caption: "Quito · Global Pizza Party" },
  { img: "/media/community-pizza-robots.jpg", caption: "NYC · Pizza Robots" },
];

// Layout for collage tiles, percentages relative to collage box
const TILE_LAYOUTS = [
  { top: "4%",  left: "2%",  w: "34%", aspect: "4/5",  rot: -4, z: 2, delay: 80 },
  { top: "0%",  left: "36%", w: "32%", aspect: "1/1",  rot: 2,  z: 4, delay: 220 },
  { top: "8%",  left: "68%", w: "30%", aspect: "4/5",  rot: 3,  z: 3, delay: 360 },
  { top: "55%", left: "12%", w: "30%", aspect: "5/4",  rot: -2, z: 5, delay: 500 },
  { top: "52%", left: "52%", w: "36%", aspect: "16/10",rot: 4,  z: 3, delay: 640 },
];

const HeroSection = () => {
  // Slight randomization per refresh
  const tiles = useMemo(() => {
    const imgs = [...HERO_IMAGES].sort(() => Math.random() - 0.5);
    return TILE_LAYOUTS.map((layout, i) => ({ ...layout, ...imgs[i % imgs.length] }));
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream pt-24 md:pt-32">
      {/* Warm radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 65% 35%, hsl(var(--butter) / 0.55), transparent 70%), radial-gradient(45% 40% at 25% 70%, hsl(var(--tomato) / 0.18), transparent 75%)",
        }}
      />
      {/* Film grain overlay */}
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="container relative">
        <div className="border-t-2 border-ink pt-8 md:pt-10">
          <div className="flex items-center justify-between gap-6">
            <p className="overline text-tomato">§ C, Community</p>
            <p className="ui hidden text-[10px] uppercase tracking-[0.22em] text-ink/55 md:block">
              Volume 04 · The Pizza Mafia
            </p>
          </div>

          <div className="mt-8 grid grid-cols-12 items-end gap-x-6 gap-y-10 md:mt-12">
            <div className="col-span-12 md:col-span-8">
              <h1 className="font-display text-[clamp(3rem,9.5vw,8.25rem)] font-extrabold leading-[0.84] tracking-[-0.015em]">
                The Pizza Mafia
                <br />
                is built{" "}
                <span className="italic font-normal text-tomato">by you.</span>
              </h1>
              <p className="font-display mt-6 max-w-2xl text-xl font-medium leading-snug text-ink/75 md:text-2xl">
                Some people show up for pizza. Some stay and build something bigger.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:pl-8">
              <p className="text-lg leading-relaxed text-ink/80 md:text-xl">
                People don't just join PizzaDAO. They host. Build. Create.
                Feed. Organize. Show up.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col">
                <a href="/join" className="btn-pill-lg bg-tomato text-cream hover:bg-ink">
                  Join the Pizza Mafia →
                </a>
                <a href="#ways-in" className="btn-pill-lg border-2 border-ink/20 text-ink hover:border-ink">
                  See how people show up
                </a>
              </div>
            </div>
          </div>

          {/* Organic collage */}
          <div className="relative mt-14 h-[480px] w-full md:mt-20 md:h-[620px]">
            {tiles.map((t, i) => (
              <figure
                key={i}
                className="group absolute opacity-0 transition-all duration-500 ease-out hover:z-50 hover:!rotate-0 hover:scale-[1.04]"
                style={{
                  top: t.top,
                  left: t.left,
                  width: t.w,
                  zIndex: t.z,
                  transform: `rotate(${t.rot}deg)`,
                  animation: `fadeUp 0.9s cubic-bezier(0.2,0.7,0.2,1) ${t.delay}ms forwards`,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-[0_22px_60px_-20px_hsl(var(--ink)/0.35)] transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-20px_hsl(var(--tomato)/0.45)]"
                  style={{ aspectRatio: t.aspect }}
                >
                  {t.video ? (
                    <video
                      src={t.video}
                      poster={t.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={t.caption}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={t.img}
                      alt={t.caption}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                  <figcaption className="ui absolute bottom-0 left-0 right-0 flex items-center justify-between bg-ink/75 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
                    <span>{t.caption}</span>
                    <span className="text-butter">●</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          {/* Live ticker / proof of participation */}
          <dl className="relative mt-10 grid grid-cols-2 gap-y-6 border-y-2 border-ink py-6 md:mt-14 md:grid-cols-4">
            {[
              { k: "Active members", v: "3,000+" },
              { k: "Chapters", v: "60+" },
              { k: "Open projects", v: "47" },
              { k: "This week", v: "12 events" },
            ].map((m) => (
              <div key={m.k} className="px-1">
                <dt className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                  {m.k}
                </dt>
                <dd className="font-display mt-2 text-3xl font-extrabold leading-none md:text-4xl">
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

const WEEK_DAYS = [
  { d: "Mon", date: 6, active: true,  label: "Open call" },
  { d: "Tue", date: 7, active: false, label: "" },
  { d: "Wed", date: 8, active: true,  label: "Chapter sync" },
  { d: "Thu", date: 9, active: false, label: "" },
  { d: "Fri", date: 10, active: true, label: "Field reports" },
  { d: "Sat", date: 11, active: false, label: "" },
  { d: "Sun", date: 12, active: true, label: "Slice club" },
];

const FEATURED_EVENTS = [
  {
    day: "Wed · 6:30 PM",
    title: "Chapter sync",
    city: "Worldwide · Discord",
    desc: "60+ cities, one shared notebook. Pitch a project, find collaborators, claim a prize.",
  },
  {
    day: "Fri · 8:00 PM",
    title: "Field reports drop",
    city: "Berlin · #journal",
    desc: "Photo dumps, write-ups, and receipts from this week's parties — straight into the chapter feed.",
  },
  {
    day: "Sun · 1:00 PM",
    title: "Slice club, vol. 47",
    city: "Lisbon · Praça das Flores",
    desc: "Long table, no agenda, no headcount. Bring a friend, bring a bottle, sit anywhere.",
  },
];

const ThisWeekSection = ({ onOpenCalendar }: { onOpenCalendar: () => void }) => (
  <section className="relative overflow-hidden bg-cream py-16 md:py-24">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(50% 60% at 15% 0%, hsl(var(--butter) / 0.45), transparent 70%)",
      }}
    />
    <div className="grain pointer-events-none absolute inset-0" aria-hidden />

    <div className="container relative">
      <div className="border-t-2 border-ink pt-8 md:pt-10">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <p className="overline text-tomato">§ C.04, This week in PizzaDAO</p>
            <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
              This week
              <br />
              <span className="text-tomato">in PizzaDAO.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:pl-8">
            <p className="text-base leading-relaxed text-ink/75 md:text-lg">
              Open calls, chapter syncs, long tables. The shared rhythm
              that holds the Mafia together — pinned for the next seven days.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16 md:gap-8">
        {/* Calendar — printed poster aesthetic */}
        <div className="col-span-12 md:col-span-5">
          <div
            className="relative rounded-2xl bg-cream-warm p-6 shadow-[0_24px_60px_-30px_hsl(var(--ink)/0.35)] md:p-8"
            style={{ transform: "rotate(-0.6deg)" }}
          >
            <div className="flex items-baseline justify-between">
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
                Week 19 · May
              </p>
              <p className="ui text-[10px] tabular-nums text-ink/40">06 — 12</p>
            </div>
            <h3 className="font-display mt-3 text-3xl font-extrabold leading-[0.95] md:text-4xl">
              The shared
              <br />
              calendar.
            </h3>

            <ul className="mt-7 space-y-2">
              {WEEK_DAYS.map((d) => (
                <li
                  key={d.d}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                    d.active
                      ? "bg-butter shadow-[0_8px_24px_-12px_hsl(var(--butter)/0.9)]"
                      : "bg-cream"
                  }`}
                >
                  <div className="ui w-12 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                    {d.d}
                  </div>
                  <div className="font-display w-8 text-2xl font-extrabold tabular-nums leading-none">
                    {d.date}
                  </div>
                  <div className="flex-1 text-sm leading-snug text-ink/85">
                    {d.label || <span className="text-ink/30">—</span>}
                  </div>
                  {d.active && (
                    <span className="h-2 w-2 rounded-full bg-tomato" aria-hidden />
                  )}
                </li>
              ))}
            </ul>

            <button
              onClick={onOpenCalendar}
              className="ui mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70 hover:text-tomato"
            >
              <CalendarDays className="h-4 w-4" />
              View full calendar →
            </button>
          </div>
        </div>

        {/* Featured events */}
        <div className="col-span-12 md:col-span-7">
          <div className="space-y-5">
            {FEATURED_EVENTS.map((ev, i) => (
              <article
                key={ev.title}
                className="group relative rounded-2xl bg-cream-warm p-6 shadow-[0_18px_40px_-24px_hsl(var(--ink)/0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_hsl(var(--tomato)/0.35)] md:p-8"
                style={{ transform: `rotate(${(i % 2 === 0 ? 0.4 : -0.5)}deg)` }}
              >
                <div className="flex items-baseline justify-between">
                  <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-tomato">
                    {ev.day}
                  </p>
                  <p className="ui text-[10px] tabular-nums text-ink/40">
                    Event {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="font-display mt-4 text-[clamp(1.75rem,2.4vw,2.25rem)] font-extrabold leading-[1] tracking-[-0.005em]">
                  {ev.title}
                </h3>
                <p className="ui mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  {ev.city}
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink/80">
                  {ev.desc}
                </p>
                <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tomato" />
              </article>
            ))}

            <button
              onClick={onOpenCalendar}
              className="btn-pill-lg w-full bg-ink text-cream hover:bg-tomato"
            >
              View full calendar
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CommunityPage;
