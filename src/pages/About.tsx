import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import party from "@/assets/timeline-party.jpg";
import founding from "@/assets/timeline-founding.jpg";
import timeline2010 from "@/assets/timeline-2010.jpg";


const ROLES = [
  { name: "Chapter leads", note: "Organize local events and shape the city experience." },
  { name: "Contributors", note: "Help with design, logistics, partnerships, content, and operations." },
  { name: "Participants", note: "Show up, bring friends, share pizza, and keep the ritual alive." },
];

const PRESS: Array<{ outlet: string; line: string; href: string; kind?: "video" }> = [
  {
    outlet: "CoinDesk",
    line: "“The world's largest Bitcoin Pizza Day celebration.”",
    href: "https://www.coindesk.com/business/2021/05/21/pizzadao-celebrates-bitcoin-pizza-day-with-1m-slice-giveaway",
  },
  {
    outlet: "Pizza Today",
    line: "“20,000 people. 400+ cities. One giant global pizza party.”",
    href: "https://pizzatoday.com/news/20000-to-eat-free-pizza-on-may-22-for-bitcoin-pizza-day/149236/",
  },
  {
    outlet: "Yahoo Finance",
    line: "“PizzaDAO brought free pizza to more than 100 cities worldwide.”",
    href: "https://finance.yahoo.com/news/pizzadao-celebrates-third-annual-global-211500135.html",
  },
  {
    outlet: "Vice",
    line: "“PizzaDAO has a better PR strategy than most countries.”",
    href: "https://www.youtube.com/watch?v=mGlfFjcZFRE",
    kind: "video",
  },
  {
    outlet: "Social Media Examiner",
    line: "“How to build a DAO people actually care about.”",
    href: "https://www.socialmediaexaminer.com/how-to-build-a-dao-the-pizzadao-story/",
  },
  {
    outlet: "The Spoon",
    line: "“Using NFT pizza art to fund a real-world global pizza party.”",
    href: "https://thespoon.tech/the-creators-behind-rare-pizzas-want-to-use-pizza-art-nfts-to-fund-a-global-real-world-pizza-party/",
  },
];

const About = () => {
  useEffect(() => {
    document.title = "About, PizzaDAO";
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-cream text-ink">
      <SiteNav solid />

      {/* Unified opening — hero + origin + mission as one editorial unit */}
      <section className="paper-soft relative overflow-hidden bg-cream pt-16 md:pt-24">
        <div className="container">
          <div className="flex items-center justify-between pb-3">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              § A, About PizzaDAO
            </span>
            <span className="ui flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-tomato" />
              Ongoing, est. 2021
            </span>
          </div>

          {/* Hero headline + intro */}
          <div className="border-t border-ink/40 pt-10 md:pt-14">
            <div className="grid grid-cols-12 items-end gap-x-8 gap-y-10 md:gap-x-12">
              <div className="col-span-12 md:col-span-8">
                <h1 className="font-display font-extrabold leading-[0.82] tracking-[-0.025em] text-mega md:leading-[0.78] md:text-[clamp(4rem,13vw,13rem)]">
                  An institution built on a{" "}
                  <span className="underline-scribble text-ink">slice</span>
                </h1>
              </div>
              <div className="col-span-12 md:col-span-4 md:pb-3">
                <div className="font-serif space-y-4 text-[15.5px] leading-[1.65] text-ink/75 md:text-[15px]">
                  <p>
                    PizzaDAO began as a simple internet experiment: send
                    pizza to people we had never met and see what happened.
                  </p>
                  <p>
                    What happened was bigger than the pizza. People shared
                    it, gathered around it, invited others in, and turned a
                    small act of coordination into something physical.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Single documentary image */}
          <figure className="mt-16 md:mt-20">
            <div className="paper-soft overflow-hidden bg-cream-warm">
              <img
                src={founding}
                alt="Late-night gathering of friends huddled around laptops and pizza"
                loading="eager"
                width={1920}
                height={1080}
                className="grain block aspect-[16/9] w-full object-cover md:aspect-[21/9]"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-3">
              <span className="handwritten -rotate-1 text-tomato text-sm md:text-base">
                started online, became real
              </span>
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                Fig. A.01 — 2021
              </span>
            </figcaption>
          </figure>

          {/* Where it started — story body */}
          <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-28">
            <div className="col-span-12 md:col-span-4">
              <p className="overline text-tomato">§ A.01, Origin</p>
              <h2 className="font-display mt-5 text-display-2 font-extrabold leading-[0.92]">
                Where it started
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <div className="font-serif max-w-[58ch] space-y-5 text-lg leading-relaxed text-ink/85 md:text-xl">
                <p>
                  During the pandemic, online communities were everywhere,
                  but most of them stopped at the screen.
                </p>
                <p>
                  PizzaDAO started with the opposite instinct. Take something
                  familiar, easy to share, and deeply human, then use the
                  internet to coordinate it across the real world.
                </p>
                <p>
                  At first, it was loose and strange. A few people, a few
                  wallets, a few pizzas sent across borders.
                </p>
                <p className="text-ink">
                  Then people started showing up.
                </p>
              </div>
            </div>
          </div>

          {/* Pull quote — closes the opening unit */}
          <div className="mt-20 grid grid-cols-12 gap-x-6 md:mt-28">
            <blockquote className="col-span-12 border-l-[3px] border-tomato py-2 pl-6 md:col-span-10 md:col-start-2 md:pl-10">
              <p className="font-display text-display-2 font-extrabold leading-[0.96] tracking-[-0.02em]">
                “Pizza is the most democratic food on Earth.
                <span className="text-ink/55"> We just made it organized.”</span>
              </p>
            </blockquote>
          </div>

          {/* Bottom spacer ends the unified opening */}
          <div className="pb-24 md:pb-32" />
        </div>
      </section>


      {/* Bitcoin Pizza Day — bridge between internet history and ritual */}
      <section className="relative bg-cream py-20 md:py-28">
        <div className="container">
          {/* Section header + stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/40 pt-8 pb-6">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              § A.02, Ritual
            </span>
            <span className="stamp text-tomato">May 22</span>
          </div>

          {/* Archival image — full width, documentary feel */}
          <figure className="relative">
            <div className="paper-soft overflow-hidden bg-cream-warm">
              <img
                src={timeline2010}
                alt="Archival reference to the 2010 Bitcoin pizza transaction"
                loading="lazy"
                width={1920}
                height={1080}
                className="grain block aspect-[21/9] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="handwritten -rotate-1 text-tomato text-sm md:text-base">
                internet history, made physical
              </span>
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                Fig. A.02 — 2010
              </span>
            </figcaption>
          </figure>

          {/* Title + body — editorial, measured */}
          <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-20">
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-display text-display-1 font-extrabold leading-[0.88] tracking-[-0.02em]">
                May 22 became a ritual
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pt-2">
              <p className="font-serif text-lg leading-relaxed text-ink/80 md:text-xl">
                What started as a single transaction turned into a global
                gathering. The date matters because the story matters.
              </p>
            </div>
          </div>

          <div className="font-serif mt-14 max-w-[64ch] space-y-5 text-lg leading-relaxed text-ink/85 md:mt-16 md:text-xl">
            <p>
              On May 22, 2010, two pizzas were bought for 10,000 BTC.
            </p>
            <p>
              The story became part of internet history because it proved
              something abstract could become real. A transaction became
              dinner. Code became a table.
            </p>
            <p>
              Years later, PizzaDAO turned that memory into a recurring
              global ritual.
            </p>
            <p>
              Every May 22, local organizers bring people together in their
              own cities. Some events are polished. Some are chaotic. Some
              are small. Some take over entire blocks.
            </p>
            <p className="text-ink">
              That range is what makes it work.
            </p>
          </div>
        </div>
      </section>

      {/* How it runs */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          {/* Section header */}
          <div className="flex items-center justify-between border-t border-ink/40 pt-8">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              § A.03, Structure
            </span>
            <span className="handwritten -rotate-2 text-tomato text-sm">
              light by design
            </span>
          </div>

          {/* Title + body */}
          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-14">
            <div className="col-span-12 md:col-span-5">
              <h2 className="font-display text-display-1 font-extrabold leading-[0.88] tracking-[-0.02em]">
                How it runs
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <div className="font-serif space-y-5 text-lg leading-relaxed text-ink/85 md:text-xl">
                <p>
                  PizzaDAO stays light on purpose.
                </p>
                <p>
                  A small group helps coordinate timing, funding, and shared
                  standards. Everything else happens through local organizers,
                  contributors, and people who decide to show up.
                </p>
                <p className="text-ink">
                  That structure lets each city feel different while still
                  being part of the same global ritual.
                </p>
              </div>
            </div>
          </div>

          {/* 3-column model — clean ledger with tactile borders */}
          <div className="mt-16 grid grid-cols-1 md:mt-20 md:grid-cols-3">
            {ROLES.map((r, i) => (
              <article
                key={r.name}
                className="border-t border-ink/20 py-8 md:py-10 md:pr-10 md:[&:not(:first-child)]:pl-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-ink/20"
              >
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-2xl font-extrabold leading-tight md:text-[1.75rem]">
                  {r.name}
                </h3>
                <p className="font-serif mt-3 text-base leading-relaxed text-ink/75">
                  {r.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What we've done — compressed proof-of-work */}
      <section className="paper-soft paper-soft-dark relative overflow-hidden bg-ink py-20 text-cream md:py-28">
        <div className="container relative">
          {/* Section header */}
          <div className="flex items-center justify-between border-b border-cream/20 pb-6">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/45">
              § A.04, Proof of work
            </span>
            <span className="handwritten -rotate-2 text-butter text-sm">
              still going
            </span>
          </div>

          {/* Title + intro */}
          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-14">
            <div className="col-span-12 md:col-span-6">
              <h2 className="font-display text-display-1 font-extrabold leading-[0.88] tracking-[-0.02em]">
                What we've done
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="font-serif text-lg leading-relaxed text-cream/80 md:text-xl">
                PizzaDAO has funded and supported real-world gatherings across
                the globe.
              </p>
            </div>
          </div>

          {/* Metrics ledger — single horizontal rule through all four */}
          <div className="relative mt-16 md:mt-20">
            {/* Thin ledger line */}
            <div className="absolute left-0 right-0 top-[3.75rem] hidden h-px bg-cream/15 md:block" />
            <dl className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-y-0">
              {[
                { k: "Cities", v: "420+", t: "activated globally" },
                { k: "Funding", v: "$1M+", t: "pizza & event support" },
                { k: "Attendees", v: "20K+", t: "across all events" },
                { k: "Return rate", v: "92%", t: "organizers come back" },
              ].map((s) => (
                <div key={s.k} className="relative md:px-6 md:first:pl-0 md:last:pr-0">
                  <div className="font-display text-5xl font-extrabold leading-none md:text-[3.5rem]">
                    {s.v}
                  </div>
                  <div className="ui mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                    {s.k}
                  </div>
                  <p className="ui mt-1 text-[10px] uppercase tracking-[0.18em] text-cream/35">
                    {s.t}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          {/* Supporting copy */}
          <div className="mt-16 max-w-[58ch] border-t border-cream/20 pt-10 md:mt-20">
            <p className="font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              The numbers matter because they show the system works.
            </p>
            <p className="font-serif mt-4 text-lg leading-relaxed text-cream md:text-xl">
              The more important proof is that people keep coming back.
            </p>
          </div>
        </div>
      </section>

      {/* Why pizza — poster thesis */}
      <section className="relative overflow-hidden bg-cream py-24 md:py-36">
        {/* Single subtle checkered edge at top — sparingly */}
        <div className="checker-tape absolute left-0 right-0 top-0 h-[6px] opacity-60" aria-hidden="true" />

        <div className="container relative">
          <div className="mx-auto max-w-5xl text-center">
            <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              § A.05, Thesis
            </p>

            <h2 className="font-display mt-8 text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[0.86] tracking-[-0.025em]">
              Pizza is social{" "}
              <span className="text-tomato">infrastructure.</span>
            </h2>

            <div className="font-serif mx-auto mt-12 max-w-[52ch] space-y-5 text-lg leading-relaxed text-ink/80 md:mt-14 md:text-xl">
              <p>
                It is familiar, affordable, easy to share, and understood
                almost anywhere.
              </p>
              <p>
                That makes it unusually useful for bringing strangers
                together without needing much explanation.
              </p>
            </div>

            <span className="handwritten mt-10 inline-block -rotate-2 text-tomato text-base md:mt-12 md:text-lg">
              the simplest table in the world
            </span>
          </div>
        </div>
      </section>

      {/* What this is becoming */}
      <section className="bg-cream-warm py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <p className="ui border-t border-ink/40 pt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                § A.06, Forward
              </p>
              <h2 className="font-display mt-5 text-display-2 font-extrabold leading-[0.92]">
                What this is becoming
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:pl-8">
              <div className="font-serif max-w-[58ch] space-y-5 text-lg leading-relaxed text-ink/85 md:text-xl">
                <p className="text-ink">
                  PizzaDAO is becoming a global coordination layer for
                  real-world culture.
                </p>
                <p>
                  The Global Pizza Party is the clearest expression of it,
                  but the larger idea is broader: help people organize
                  meaningful gatherings through the internet without
                  flattening what makes each place different.
                </p>
                <p>
                  That means more local chapters, better tools for
                  organizers, stronger partnerships, and more reasons for
                  people to gather beyond May 22.
                </p>
              </div>
            </div>
          </div>

          {/* (Global Footprint moved to its own section below) */}

          <div className="mt-16 border-t border-ink/20 pt-8">
            <p className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
              Selected partners
            </p>
            <div className="mt-6 grid grid-cols-2 gap-px bg-ink/15 sm:grid-cols-3 md:grid-cols-6">
              {[
                "Bitcoin Magazine",
                "Ethereum Foundation",
                "Gitcoin",
                "Optimism",
                "Zora",
                "Farcaster",
              ].map((p) => (
                <div
                  key={p}
                  className="font-display flex aspect-[3/2] items-center justify-center bg-cream-warm px-4 text-center text-base font-extrabold tracking-tight text-ink/75 transition-colors hover:text-tomato md:text-lg"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Footprint — the wow moment */}
      <section className="paper-soft relative overflow-hidden bg-cream py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-tomato">
                § A.07, Global footprint
              </p>
              <h2 className="font-display mt-5 text-display-1 font-extrabold leading-[0.9]">
                A ritual with a<br />
                global footprint.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-8">
              <p className="font-serif max-w-[42ch] text-lg leading-relaxed text-ink/75 md:text-xl">
                Every city brings its own version of the same idea.
              </p>
              <p className="handwritten mt-4 -rotate-1 text-base text-tomato">
                one night, everywhere
              </p>
            </div>
          </div>

          <figure className="relative mt-14 md:mt-20">
            <div className="relative w-full overflow-hidden border border-ink/15 bg-cream-warm">
              <svg
                viewBox="0 0 800 400"
                className="block h-auto w-full"
                role="img"
                aria-label="World map showing PizzaDAO chapter cities across six continents"
              >
                <defs>
                  <pattern
                    id="footprint-dots"
                    width="7"
                    height="7"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1" className="fill-ink/25" />
                  </pattern>
                  <clipPath id="continents">
                    {/* North America */}
                    <path d="M110 85 Q190 60 270 95 Q305 150 250 210 Q170 220 115 175 Q95 130 110 85 Z" />
                    {/* Central + South America */}
                    <path d="M240 215 Q295 215 310 255 Q320 320 275 365 Q235 360 230 305 Q225 260 240 215 Z" />
                    {/* Europe */}
                    <path d="M380 95 Q445 80 460 115 Q450 150 405 155 Q370 145 375 115 Z" />
                    {/* Africa */}
                    <path d="M395 155 Q460 155 470 220 Q455 295 410 305 Q375 270 380 215 Q380 180 395 155 Z" />
                    {/* Middle East / Asia */}
                    <path d="M460 105 Q610 80 730 120 Q720 200 600 210 Q510 195 470 160 Q455 135 460 105 Z" />
                    {/* India */}
                    <path d="M560 180 Q595 180 600 215 Q585 245 565 240 Q545 215 560 180 Z" />
                    {/* SE Asia */}
                    <path d="M640 215 Q695 215 705 245 Q680 260 645 250 Q625 235 640 215 Z" />
                    {/* Australia */}
                    <path d="M660 270 Q735 260 745 300 Q705 325 665 310 Q645 290 660 270 Z" />
                  </clipPath>
                </defs>

                {/* Equator + meridian, faintly */}
                <line x1="0" y1="200" x2="800" y2="200" className="stroke-ink/10" strokeDasharray="2 6" />
                <line x1="400" y1="0" x2="400" y2="400" className="stroke-ink/10" strokeDasharray="2 6" />

                {/* Continent dots */}
                <rect
                  x="0"
                  y="0"
                  width="800"
                  height="400"
                  fill="url(#footprint-dots)"
                  clipPath="url(#continents)"
                />

                {/* Subtle arcs from a few origin cities */}
                <g className="stroke-tomato/35" fill="none" strokeWidth="1">
                  <path d="M236 145 Q330 70 400 118" />
                  <path d="M400 118 Q540 60 710 138" />
                  <path d="M236 145 Q260 240 296 268" />
                  <path d="M710 138 Q740 220 738 295" />
                  <path d="M408 220 Q560 240 738 295" />
                </g>

                {/* City pins */}
                {[
                  { name: "New York", x: 236, y: 145, anchor: "end", dx: -8, dy: 4 },
                  { name: "São Paulo", x: 296, y: 268, anchor: "end", dx: -8, dy: 4 },
                  { name: "London", x: 400, y: 118, anchor: "start", dx: 8, dy: -6 },
                  { name: "Lagos", x: 408, y: 220, anchor: "start", dx: 8, dy: 4 },
                  { name: "Tokyo", x: 710, y: 138, anchor: "end", dx: -8, dy: -6 },
                  { name: "Sydney", x: 738, y: 295, anchor: "end", dx: -8, dy: 14 },
                ].map((c, i) => (
                  <g key={c.name}>
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="10"
                      className="fill-tomato/25 animate-pulse"
                      style={{ animationDelay: `${i * 0.6}s`, animationDuration: "3s" }}
                    />
                    <circle cx={c.x} cy={c.y} r="3.5" className="fill-tomato" />
                    <text
                      x={c.x + c.dx}
                      y={c.y + c.dy}
                      textAnchor={c.anchor as "start" | "end"}
                      className="fill-ink/80 font-display"
                      style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.02em" }}
                    >
                      {c.name}
                    </text>
                  </g>
                ))}

                {/* Quiet dots — many more cities, unnamed */}
                {[
                  [150, 130], [180, 160], [210, 180], [260, 175], [285, 195],
                  [255, 235], [275, 295], [310, 325], [385, 130], [420, 140],
                  [435, 100], [445, 175], [430, 210], [415, 255], [395, 285],
                  [490, 130], [520, 155], [550, 145], [580, 175], [610, 165],
                  [640, 150], [675, 165], [665, 235], [690, 245], [720, 180],
                  [690, 295], [705, 280], [718, 310],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="2" className="fill-tomato/70" />
                ))}
              </svg>
            </div>

            <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                Fig. 01 — Chapter cities, May 22 (selected)
              </p>
              <p className="font-serif text-sm text-ink/55">
                420+ cities · 6 continents · 1 night
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Press — editorial archive */}
      <section className="paper-soft relative overflow-hidden bg-cream py-20 md:py-28">
        <div className="container">
          {/* Section header */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/40 pt-8">
            <div>
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-tomato">
                § A.08, Press archive
              </p>
              <h2 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92]">
                On the record.
              </h2>
            </div>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              Est. 2021 · Selected
            </span>
          </div>

          {/* Intro */}
          <p className="font-serif mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/70 md:text-xl">
            Others have covered PizzaDAO as it grew from a strange internet experiment into a global food event.
          </p>

          {/* Featured quote */}
          <figure className="relative mt-14 border-l-2 border-tomato/40 pl-6 md:mt-20 md:pl-10">
            <blockquote className="font-display max-w-[50ch] text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-ink md:text-[2.2rem]">
              {PRESS[0].line.replace(/["/]/g, '')}
            </blockquote>
            <figcaption className="mt-6 flex items-baseline gap-4">
              <span className="font-display text-sm font-extrabold tracking-tight text-ink/90">
                {PRESS[0].outlet}
              </span>
              <a
                href={PRESS[0].href}
                target="_blank"
                rel="noreferrer"
                className="ui inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40 transition-colors hover:text-tomato"
              >
                Read article
                <span className="inline-block">↗</span>
              </a>
            </figcaption>
          </figure>

          {/* Remaining coverage — clean editorial list */}
          <div className="mt-16 md:mt-20">
            <div className="border-t border-ink/15 pt-4">
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                Selected coverage
              </p>
            </div>
            <ul className="mt-6">
              {PRESS.slice(1).map((p, i) => (
                <li key={p.outlet} className="group border-b border-ink/10">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-5 transition-colors duration-300 md:py-6 ${
                      p.kind === "video" ? "hover:bg-butter/15" : "hover:bg-ink/[0.03]"
                    }`}
                  >
                    <span className="ui col-span-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/30 md:col-span-1">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="font-display col-span-10 flex items-center gap-2 text-base font-extrabold tracking-tight transition-colors group-hover:text-tomato md:col-span-3 md:text-lg">
                      {p.outlet}
                      {p.kind === "video" && (
                        <span className="ui inline-flex items-center gap-1 rounded-full border border-ink/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                          ▶ Video
                        </span>
                      )}
                    </span>
                    <p className="font-serif col-span-12 pl-8 text-base italic leading-snug text-ink/65 md:col-span-7 md:pl-0 md:text-lg">
                      {p.line}
                    </p>
                    <span className="ui col-span-12 flex items-center justify-end gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/0 transition-all duration-300 group-hover:text-ink/50 md:col-span-1">
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing — final poster moment */}
      <section className="paper-soft paper-soft-dark relative overflow-hidden bg-tomato py-28 text-cream md:py-36">
        {/* Subtle checkered edge — top */}
        <div className="checker-tape absolute left-0 right-0 top-0 h-[5px] opacity-25" aria-hidden="true" />
        {/* Subtle checkered edge — bottom */}
        <div className="checker-tape absolute bottom-0 left-0 right-0 h-[5px] opacity-25" aria-hidden="true" />

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/50">
              § A.09, Take part
            </p>

            <h2 className="font-display mt-8 text-display-1 font-extrabold leading-[0.9] tracking-[-0.02em]">
              If you have ever shown up to something like this, you understand it immediately.
            </h2>

            <p className="handwritten mt-8 rotate-1 text-xl text-butter/90">
              see you on may 22
            </p>

            <p className="font-serif mx-auto mt-8 max-w-[48ch] text-xl leading-relaxed text-cream/80 md:text-2xl">
              If you haven't, May 22 is a good place to start.
            </p>

            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/community"
                className="ui inline-flex items-center justify-center bg-cream px-8 py-4 text-xs font-semibold tracking-[0.18em] text-ink transition-colors hover:bg-butter"
              >
                Find a city →
              </a>
              <a
                href="/join"
                className="ui inline-flex items-center justify-center border border-cream/40 px-8 py-4 text-xs font-semibold tracking-[0.18em] text-cream transition-colors hover:border-butter hover:text-butter"
              >
                Host an event
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
