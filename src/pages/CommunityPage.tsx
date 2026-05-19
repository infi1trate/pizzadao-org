import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Sparkles, Pizza, Wrench, Palette, Users, Code2, MapPin, CalendarDays, X } from "lucide-react";
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
    title: "Throw a pizza party",
    one: "Pick a date. Pick a pizzeria. We back it.",
    more: "Budget, playbook, and chapter support handled. You bring the neighborhood.",
  },
  {
    icon: Wrench,
    tag: "Build",
    title: "Ship tools + projects",
    one: "Open repos, real users, shipped fast.",
    more: "RSVP systems, on-chain receipts, chapter dashboards. Pick up an issue or pitch your own.",
  },
  {
    icon: Palette,
    tag: "Create",
    title: "Make the art + culture",
    one: "Posters, zines, mixtapes, films, merch.",
    more: "Every chapter ships its own visual language. Submit to the pool, watch it travel.",
  },
  {
    icon: Users,
    tag: "Gather",
    title: "Hold the room",
    one: "Long tables, slice clubs, coworking nights.",
    more: "Recurring rituals that turn strangers into regulars and regulars into friends.",
  },
  {
    icon: Code2,
    tag: "Experiment",
    title: "Run a hackathon",
    one: "Devs, designers and pizzaiolos, one weekend.",
    more: "Set the prompt, line up the pizza, judge the demos. Prizes paid in slices and grants.",
  },
  {
    icon: MapPin,
    tag: "Grow",
    title: "Open a city",
    one: "Start a chapter where there isn't one yet.",
    more: "Onboard the next organizers, then hand them the keys. New chapters launched by members, not HQ.",
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
    name: "PizzaDAO Arcade",
    tag: "Experiment",
    mission: "Community-built pizza games and arcade cabinet experiments.",
    context: "A roving cabinet, an open game jam, and a growing library of pizza-themed games made by members. Hardware, code, and pixel art, shipped together.",
    detail: "Started as a one-night build at a chapter meetup and grew into an ongoing collaboration between hardware tinkerers, indie devs, and visual artists. The cabinet travels to events; the game catalog is open for any chapter to install or remix.",
    img: hackathon,
  },
  {
    name: "HourPay",
    tag: "Public good",
    mission: "Streaming payroll for hospitality workers — paid by the hour, not the pay cycle.",
    context: "A working experiment aimed at reducing reliance on payday loans for restaurant and pizzeria staff. Wages stream in real time as the shift happens.",
    detail: "Built by member-operators who watched their own teams struggle between paydays. Currently in pilot with a small group of independent pizzerias, with the goal of making predatory short-term lending unnecessary for the people who keep kitchens running.",
    img: pizzeria,
  },
  {
    name: "Secret Pineapple",
    tag: "Hackathon winner",
    mission: "Cryptographically anonymized, itemized receipts.",
    context: "A hackathon-winning prototype exploring how to prove what was purchased without revealing who bought it — useful for sponsorships, reimbursements, and public-goods accounting.",
    detail: "Born at a PizzaDAO hackathon, now an active research thread. Combines zero-knowledge proofs with itemized receipt schemas so chapters can transparently report spending without doxxing members or vendors.",
    img: null,
  },
  {
    name: "Plan.xyz · rsv.pizza",
    tag: "Infrastructure",
    mission: "Event infrastructure built for global, decentralized gatherings.",
    context: "Tested live during Global Pizza Party 2026 across ~30k attendees worldwide. Open RSVPs, chapter dashboards, and proof-of-attendance in one stack.",
    detail: "Stress-tested across hundreds of simultaneous parties in dozens of cities. Now the default RSVP and check-in layer for chapter events, with public APIs so any community — pizza or otherwise — can use it.",
    img: party,
  },
];

const CommunityPage = () => {
  const [calOpen, setCalOpen] = useState(false);
  const [activeBuild, setActiveBuild] = useState<number | null>(null);
  useEffect(() => {
    document.title = "Community, PizzaDAO";
  }, []);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteNav solid />

      {/* HERO, participatory, image-led */}
      <HeroSection />


      {/* MANIFESTO STRIP, high contrast slab */}
      <section className="bg-ink py-16 text-cream md:py-24">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-butter">Manifesto</p>
              <h2 className="font-display mt-5 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.88] tracking-[-0.01em]">
                A community
                <br />
                that <span className="handwritten relative inline-block text-tomato text-[1.05em] leading-[0.75] -mr-1 translate-y-[0.08em] -rotate-[4deg] align-baseline">actually</span>
                <br />
                does stuff.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
                A DAO is a group of people coordinating around shared ownership,
                creativity, and action — without waiting for permission. PizzaDAO
                pools resources from its members and partners, then funds
                experiments, events, tools, and public goods proposed by the
                community itself. The "work" is whatever members decide to build
                together this week.
              </p>
              <ul className="mt-10 space-y-4 border-t border-cream/20 pt-8">
                {[
                  "Anyone can propose an experiment.",
                  "Anyone can open a chapter in their city.",
                  "Funding follows ideas the community backs.",
                  "Tools, art, and events stay open and remixable.",
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
                "Events every week",
                "Open experiments",
                "No fees",
                "No tiers",
                "Anyone can host",
                "Anyone can propose",
                "Funding follows ideas",
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

      {/* WAYS TO PARTICIPATE, participatory grid */}
      <section id="ways-in" className="bg-cream py-16 md:py-24">
        <div className="container">
          <div className="border-t-2 border-ink pt-8 md:pt-10">
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <div className="col-span-12 md:col-span-7">
                <p className="overline text-tomato">§ C.01, Ways to participate</p>
                <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                  Find your lane.
                  <br />
                  <span className="handwritten text-tomato text-[0.55em] align-middle">show up</span> however fits.
                </h2>
              </div>
              <div className="col-span-12 md:col-span-5 md:pl-8">
                <p className="text-base leading-relaxed text-ink/75 md:text-lg">
                  No application form. No tier system. Pick a lane that fits the
                  time and energy you have this week. Most members end up doing
                  more than one.
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
                  className="group relative flex flex-col bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-butter hover:shadow-[0_24px_60px_-20px_hsl(var(--ink)/0.35)] md:p-9"
                >
                  <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/55">
                    <span className="rounded-full bg-tomato px-2.5 py-1 text-cream">
                      {w.tag}
                    </span>
                    <span className="tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-butter transition-colors group-hover:bg-cream">
                    <Icon className="h-5 w-5 text-ink" strokeWidth={2.25} />
                  </div>
                  <h3 className="font-display mt-5 text-[22px] font-extrabold leading-[1.05] md:text-2xl">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-snug text-ink/75">
                    {w.one}
                  </p>

                  {/* Hover reveal */}
                  <div className="mt-4 max-h-0 overflow-hidden text-[14px] leading-relaxed text-ink/70 opacity-0 transition-all duration-300 group-hover:max-h-32 group-hover:opacity-100">
                    {w.more}
                  </div>

                  <div className="mt-6 flex items-center justify-end border-t border-ink/15 pt-4">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </article>
              );
            })}
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
              src="https://calendar.google.com/calendar/embed?src=lolibebt0pv7da9lv35dviqasg%40group.calendar.google.com&ctz=UTC"
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
                <p className="overline text-butter">§ C.05, In the workshop</p>
                <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                  Real projects.
                  <br />
                  <span className="text-butter handwritten text-[0.55em] align-middle">made by members.</span>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:pl-8">
                <p className="text-base leading-relaxed text-cream/80 md:text-lg">
                  A working sample of what the community is building together —
                  arcade hardware, payroll tools for hospitality workers,
                  cryptography experiments, and the event infrastructure that
                  ran Global Pizza Party 2026.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
            {BUILDS.map((b, i) => (
              <article
                key={b.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-cream text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_hsl(var(--tomato)/0.45)]"
              >
                {b.img ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <img
                      src={b.img}
                      alt={b.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="ui absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
                      {b.tag}
                    </span>
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/10] items-end justify-between bg-ink p-7 text-cream">
                    <span className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[0.9] text-butter">
                      {b.name}
                    </span>
                    <span className="ui absolute left-4 top-4 rounded-full bg-butter px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
                      {b.tag}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <div className="ui flex items-baseline justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">
                    <span className="tabular-nums">
                      Project {String(i + 1).padStart(2, "0")} / 0{BUILDS.length}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-2xl font-extrabold leading-[1.05] md:text-[28px]">
                    {b.name}
                  </h3>
                  <p className="font-display mt-3 text-[17px] font-medium leading-snug text-ink/85">
                    {b.mission}
                  </p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">
                    {b.context}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveBuild(i)}
                    className="mt-6 flex items-center justify-between gap-3 border-t border-ink/15 pt-4 text-left"
                  >
                    <span className="ui text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70 group-hover:text-tomato">
                      Read more
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Project deep-dive modal */}
      <Dialog open={activeBuild !== null} onOpenChange={(o) => !o && setActiveBuild(null)}>
        <DialogContent className="max-w-2xl bg-cream p-0">
          {activeBuild !== null && (
            <>
              {BUILDS[activeBuild].img && (
                <div className="aspect-[16/9] overflow-hidden bg-ink">
                  <img
                    src={BUILDS[activeBuild].img as string}
                    alt={BUILDS[activeBuild].name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-tomato">
                  {BUILDS[activeBuild].tag}
                </p>
                <DialogHeader>
                  <DialogTitle className="font-display mt-2 text-3xl font-extrabold leading-[1.05] md:text-4xl">
                    {BUILDS[activeBuild].name}
                  </DialogTitle>
                </DialogHeader>
                <p className="font-display mt-4 text-lg font-medium leading-snug text-ink/85">
                  {BUILDS[activeBuild].mission}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
                  {BUILDS[activeBuild].context}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                  {BUILDS[activeBuild].detail}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* COMMUNITY GALLERY, masonry strip */}
      <section className="bg-cream py-12 md:py-16">
        <div className="container">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="overline text-tomato">§ C.06, From the camera roll</p>
              <h2 className="font-display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[0.95]">
                The community,
                <br />
                <span className="handwritten text-tomato text-[0.6em]">unedited.</span>
              </h2>
            </div>
            <a
              href="#"
              className="ui hidden shrink-0 items-center gap-2 border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/80 transition-colors hover:border-tomato hover:text-tomato md:inline-flex"
            >
              Open community gallery
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Masonry strip — varied crops, slight stagger */}
        <div className="container mt-8 md:mt-10">
          <div className="columns-2 gap-3 md:columns-4 md:gap-4">
            {[
              { img: hands,     cap: "Lagos · open kitchen",    ratio: "4/5",   rot: -1.2 },
              { img: party,     cap: "Berlin · long table",     ratio: "3/4",   rot: 0.8 },
              { img: hackathon, cap: "Tokyo · demo night",      ratio: "1/1",   rot: -0.6 },
              { img: slice,     cap: "Lisbon · slice club",     ratio: "5/4",   rot: 1.4 },
              { img: pizzeria,  cap: "Naples · the oven, 03:00", ratio: "3/4",  rot: -1.8 },
              { img: community, cap: "CDMX · block party",      ratio: "4/5",   rot: 0.6 },
              { img: party,     cap: "Quito · global party",    ratio: "1/1",   rot: -1.0 },
              { img: hackathon, cap: "Amsterdam · the crew",    ratio: "4/5",   rot: 1.1 },
            ].map((p, i) => (
              <figure
                key={i}
                className="group mb-3 break-inside-avoid md:mb-4"
                style={{ transform: `rotate(${p.rot}deg)` }}
              >
                <div
                  className="relative overflow-hidden rounded-xl bg-ink shadow-[0_14px_36px_-22px_hsl(var(--ink)/0.4)] transition-all duration-500 group-hover:z-10 group-hover:scale-[1.06] group-hover:rotate-0 group-hover:shadow-[0_24px_55px_-20px_hsl(var(--tomato)/0.4)]"
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
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            <a
              href="#"
              className="ui inline-flex items-center gap-2 border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/80"
            >
              Open community gallery
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>




      {/* OPEN CALLS, participatory needs */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container">
          <div className="border-t-2 border-ink pt-8 md:pt-10">
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <div className="col-span-12 lg:col-span-5">
                <p className="overline text-tomato">§ C.07, Come help shape it</p>
                <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.9]">
                  Open calls.
                </h2>
                <p className="ui mt-4 text-sm italic text-ink/55 md:text-base">
                  Bring what you have. We'll figure out the rest together.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-6">
                <p className="text-left text-base leading-[1.6] text-ink/75 md:text-lg">
                  PizzaDAO grows through people who start things.
                  <br />
                  Some arrive with expertise. Some with curiosity.
                  <br />
                  Both end up shaping what we build next.
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10 md:mt-16">
            {[
              {
                tags: ["Global", "BD", "Partnerships"],
                title: "Superconnectors & partnership leads",
                note: "Come help bridge brands, communities, and ideas. Grow the network through partnerships, introductions, and cultural collaborations.",
              },
              {
                tags: ["Pizza", "Operations", "Hospitality"],
                title: "Pizzaiolos, operators & pizza builders",
                note: "Running a shop or obsessed with dough and hospitality? Come share the real problems — we'll bring builders and experimentation alongside you.",
              },
              {
                tags: ["Remote", "AI", "Product"],
                title: "AI-native builders, engineers & designers",
                note: "Come help shape tools and digital experiences for pizza shops, communities, and small businesses worldwide.",
              },
              {
                tags: ["Media", "Creator", "Culture"],
                title: "Creators, streamers & storytellers",
                note: "Come help carry the story further. Content, media, internet culture, and emerging platforms welcome.",
              },
              {
                tags: ["Events", "Community", "IRL"],
                title: "Community organizers & event architects",
                note: "Come help host the kinds of pizza experiences worth remembering. Meetups, hackathons, dinners, workshops, art shows — all of it.",
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

      {/* START SOMEWHERE — lightweight onboarding strip */}
      <section className="bg-cream py-12 md:py-16">
        <div className="container">
          <div className="rounded-2xl border-2 border-ink bg-cream-warm p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="overline text-tomato">§ C.09, First step</p>
                <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.95]">
                  Start <span className="handwritten text-tomato text-[0.7em] align-middle">somewhere.</span>
                </h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink/70">
                  Three low-friction ways in. Pick the one you can do today.
                </p>
              </div>
              <span className="ui hidden text-[10px] uppercase tracking-[0.22em] text-ink/45 md:block">
                Pick one · do it today
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
              {[
                { n: "01", title: "Join Discord", note: "Open the door. Say hi.", href: "/join" },
                { n: "02", title: "Attend an event", note: "Show up to one nearby.", href: "#ways-in" },
                { n: "03", title: "Start a project", note: "Pitch the experiment.", href: "/join" },
              ].map((s) => (
                <a
                  key={s.n}
                  href={s.href}
                  className="group flex items-center justify-between gap-4 rounded-xl border-2 border-ink bg-cream p-5 transition-all hover:-translate-y-0.5 hover:bg-butter"
                >
                  <div>
                    <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                      {s.n}
                    </p>
                    <p className="font-display mt-1 text-xl font-extrabold leading-tight">
                      {s.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-ink/65">
                      {s.note}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
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
  {
    video: "https://www.dropbox.com/scl/fi/wfok0d7b9qn1xnj7ren78/NYC-RP-Reveal-Teaser_v.4.mov?rlkey=kuy6lxzvgpffq66wfvyeo5ied&raw=1",
    poster: "/media/nyc-rp-teaser-poster.jpg",
    caption: "New York City · RP Reveal",
  },
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

// Layout for collage tiles, percentages relative to collage box.
// Intentionally imperfect overlap. Two tiles allowed to break the row.
const TILE_LAYOUTS = [
  { top: "2%",  left: "-2%",  w: "34%", aspect: "4/5",   rot: -5,  z: 2, delay: 80 },   // breaks left edge
  { top: "0%",  left: "34%",  w: "32%", aspect: "1/1",   rot: 2.5, z: 4, delay: 220 },
  { top: "10%", left: "70%",  w: "32%", aspect: "4/5",   rot: 4,   z: 3, delay: 360 },  // breaks right edge
  { top: "56%", left: "10%",  w: "30%", aspect: "5/4",   rot: -3,  z: 5, delay: 500 },
  { top: "50%", left: "48%",  w: "38%", aspect: "16/10", rot: 5,   z: 3, delay: 640 },
];

const HeroSection = () => {
  // Slight randomization per refresh
  const tiles = useMemo(() => {
    const imgs = [...HERO_IMAGES].sort(() => Math.random() - 0.5);
    return TILE_LAYOUTS.map((layout, i) => ({ ...layout, ...imgs[i % imgs.length] }));
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream pt-24 md:pt-32">
      {/* Warm radial gradient — slightly stronger for warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 60% at 65% 30%, hsl(var(--butter) / 0.7), transparent 72%), radial-gradient(50% 45% at 20% 75%, hsl(var(--tomato) / 0.22), transparent 78%)",
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
              <p className="handwritten mb-4 text-[15px] text-tomato md:text-base">
                ↘ this part is important
              </p>
              <h1 className="font-display text-[clamp(3rem,9.5vw,8.25rem)] font-extrabold leading-[0.84] tracking-[-0.015em]">
                The Pizza Mafia
                <br />
                is built{" "}
                <span className="handwritten relative inline-block text-tomato text-[0.95em] leading-[0.8] -ml-1 -mr-2 translate-y-[0.05em] -rotate-[3deg] align-baseline">by you.</span>
              </h1>
              <p className="font-display mt-6 max-w-2xl text-xl font-medium leading-snug text-ink/75 md:text-2xl">
                Some people show up for pizza. Some stay and build something bigger.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:pl-8">
              <p className="text-lg leading-relaxed text-ink/80 md:text-xl">
                People don't just join PizzaDAO. They host. Build. Create.
                Feed. Organize. <span className="handwritten text-tomato">show up.</span>
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
              { k: "Open experiments", v: "Always" },
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

type CalEvent = {
  start: string;
  end: string | null;
  title: string;
  location: string;
  description: string;
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalEvent[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    import("@/integrations/supabase/client").then(({ supabase }) => {
      supabase.functions
        .invoke("get-calendar-events")
        .then(({ data, error }) => {
          if (!alive) return;
          if (error || !data?.events) setEvents([]);
          else setEvents(data.events as CalEvent[]);
        })
        .catch(() => alive && setEvents([]))
        .finally(() => alive && setLoading(false));
    });
    return () => {
      alive = false;
    };
  }, []);
  return { events: events ?? [], loading };
};

const buildWeek = (events: CalEvent[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    const dayEvents = events.filter((e) => {
      const s = new Date(e.start);
      return s >= d && s < next;
    });
    return {
      d: DAY_LABELS[d.getDay()],
      date: d.getDate(),
      events: dayEvents,
    };
  });
};

const formatDayTime = (iso: string) => {
  const d = new Date(iso);
  const day = DAY_LABELS[d.getDay()];
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${day} · ${time}`;
};

const ThisWeekSection = ({ onOpenCalendar }: { onOpenCalendar: () => void }) => {
  const { events, loading } = useCalendarEvents();
  const week = useMemo(() => buildWeek(events), [events]);
  const featured = events.slice(0, 3);

  const today = new Date();
  const monthLabel = today.toLocaleDateString([], { month: "short" });
  const weekStart = today.getDate();
  const weekEndDate = new Date(today);
  weekEndDate.setDate(today.getDate() + 6);
  const weekEnd = weekEndDate.getDate();

  return (
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
                  Next 7 days · {monthLabel}
                </p>
                <p className="ui text-[10px] tabular-nums text-ink/40">
                  {String(weekStart).padStart(2, "0")} — {String(weekEnd).padStart(2, "0")}
                </p>
              </div>
              <h3 className="font-display mt-3 text-3xl font-extrabold leading-[0.95] md:text-4xl">
                Upcoming
                <br />
                community events.
              </h3>

              {loading ? (
                <p className="ui mt-7 text-sm text-ink/55">Loading community calendar…</p>
              ) : (() => {
                const activeDays = week.filter((d) => d.events.length > 0);
                if (activeDays.length === 0) {
                  return (
                    <p className="ui mt-7 text-sm text-ink/55">
                      No community events in the next 7 days. Check the full calendar.
                    </p>
                  );
                }
                return (
                  <ul className="mt-7 space-y-2">
                    {activeDays.map((d, idx) => {
                      const first = d.events[0];
                      const more = d.events.length - 1;
                      return (
                        <li
                          key={`${d.d}-${idx}`}
                          className="flex items-center gap-4 rounded-xl bg-butter px-4 py-3 shadow-[0_8px_24px_-12px_hsl(var(--butter)/0.9)] transition-all"
                        >
                          <div className="ui w-12 shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                            {d.d}
                          </div>
                          <div className="font-display w-8 shrink-0 text-2xl font-extrabold tabular-nums leading-none">
                            {d.date}
                          </div>
                          <div className="min-w-0 flex-1 text-sm leading-snug text-ink/85">
                            <span className="block truncate">
                              {first.title}
                              {more > 0 && (
                                <span className="ml-2 text-[11px] text-ink/55">+{more} more</span>
                              )}
                            </span>
                          </div>
                          <span className="h-2 w-2 shrink-0 rounded-full bg-tomato" aria-hidden />
                        </li>
                      );
                    })}
                  </ul>
                );
              })()}


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
              {loading ? (
                <div className="rounded-2xl bg-cream-warm p-8 text-ink/55">
                  Loading community calendar…
                </div>
              ) : featured.length === 0 ? (
                <div className="rounded-2xl bg-cream-warm p-8 text-ink/70">
                  No upcoming events yet. Check the full calendar.
                </div>
              ) : (
                featured.map((ev, i) => (
                  <article
                    key={`${ev.start}-${ev.title}`}
                    className="group relative rounded-2xl bg-cream-warm p-6 shadow-[0_18px_40px_-24px_hsl(var(--ink)/0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_hsl(var(--tomato)/0.35)] md:p-8"
                    style={{ transform: `rotate(${(i % 2 === 0 ? 0.4 : -0.5)}deg)` }}
                  >
                    <div className="flex items-baseline justify-between">
                      <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-tomato">
                        {formatDayTime(ev.start)}
                      </p>
                      <p className="ui text-[10px] tabular-nums text-ink/40">
                        Event {String(i + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <h3 className="font-display mt-4 break-words text-[clamp(1.5rem,2.4vw,2.25rem)] font-extrabold leading-[1.05] tracking-[-0.005em]">
                      {ev.title}
                    </h3>
                    <p className="ui mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/55">
                      {ev.location?.trim() || "Location TBD"}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-ink/80">
                      {ev.description?.trim()
                        ? ev.description.trim().slice(0, 180) +
                          (ev.description.trim().length > 180 ? "…" : "")
                        : "Details coming soon."}
                    </p>
                    <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tomato" />
                  </article>
                ))
              )}

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
};


export default CommunityPage;
