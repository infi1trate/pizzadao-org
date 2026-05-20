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
      {/* Checkered divider */}
      <div className="checker-tape h-[5px] w-full" />
      <section className="relative bg-cream py-20 md:py-28">
        <div className="container">
          {/* Section header + stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              § A.03, Ritual
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
                Fig. A.03 — 2010
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
      {/* Checkered divider */}
      <div className="checker-tape h-[5px] w-full" />

      {/* How it runs */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          {/* Section header */}
          <div className="flex items-center justify-between border-t border-ink/40 pt-8">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              § A.04, Structure
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
              § A.05, Proof of work
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
        {/* Subtle checkered edge at top */}
        <div className="checker-tape absolute left-0 right-0 top-0 h-[6px]" />

        <div className="container relative">
          <div className="mx-auto max-w-5xl text-center">
            <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              § A.06, Thesis
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

        {/* Subtle checkered edge at bottom */}
        <div className="checker-tape absolute bottom-0 left-0 right-0 h-[6px]" />
      </section>

      {/* What this is becoming */}
      <section className="bg-cream-warm py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <p className="ui border-t border-ink/40 pt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                § A.07, Forward
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

          {/* Globe / scale bridge */}
          <div className="mt-16 border-t border-ink/20 pt-10 md:mt-20">
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <div className="col-span-12 md:col-span-5">
                <p className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                  Global footprint
                </p>
                <p className="font-serif mt-3 text-base leading-relaxed text-ink/70">
                  Six continents. Hundreds of cities. One shared night.
                </p>
              </div>
              <div className="col-span-12 md:col-span-7 md:pl-8">
                <div className="relative aspect-[16/7] w-full overflow-hidden rounded-sm border border-ink/15 bg-cream">
                  <svg
                    viewBox="0 0 800 350"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern id="globe-dots" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="1.2" cy="1.2" r="1.2" className="fill-ink/20" />
                      </pattern>
                    </defs>
                    <ellipse cx="400" cy="175" rx="360" ry="150" fill="url(#globe-dots)" />
                    {[
                      [165, 130], [205, 150], [240, 120], [280, 145],
                      [310, 170], [340, 140], [380, 160], [420, 130],
                      [455, 175], [490, 150], [525, 135], [560, 165],
                      [595, 145], [630, 180], [220, 200], [300, 220],
                      [400, 230], [500, 215], [580, 235], [350, 110],
                    ].map(([cx, cy], i) => (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r={i % 4 === 0 ? 4 : 2.5}
                        className="fill-tomato"
                      />
                    ))}
                  </svg>
                  <span className="handwritten absolute bottom-3 right-4 -rotate-2 text-sm text-tomato">
                    one night, everywhere
                  </span>
                </div>
              </div>
            </div>
          </div>

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

      {/* Press */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          <div className="border-t-2 border-ink pt-8">
            <p className="overline text-tomato">§ A.08, Press</p>
            <h2 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92]">
              On the record.
            </h2>
          </div>
          <ul className="mt-12 border-t border-ink/15">
            {PRESS.map((p, i) => (
              <li key={p.outlet} className="border-b border-ink/15">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 px-2 py-7 transition-colors duration-300 md:py-9 ${
                    p.kind === "video" ? "hover:bg-butter/25" : "hover:bg-ink/[0.04]"
                  }`}
                >
                  <span className="ui col-span-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display col-span-10 flex items-center gap-2 text-xl font-extrabold tracking-tight transition-colors group-hover:text-tomato md:col-span-3 md:text-[1.6rem]">
                    {p.outlet}
                    {p.kind === "video" && (
                      <span className="ui inline-flex items-center gap-1 rounded-full border border-ink/25 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                        ▶ Video
                      </span>
                    )}
                  </span>
                  <p className="font-serif col-span-12 text-base italic leading-snug text-ink/70 md:col-span-7 md:text-lg">
                    {p.line}
                  </p>
                  <span className="ui col-span-12 flex items-center justify-end gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/0 transition-all duration-300 group-hover:text-ink/60 md:col-span-1">
                    Read <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing — restrained, mission-driven */}
      <section className="paper-soft paper-soft-dark relative overflow-hidden bg-tomato py-24 text-cream md:py-32">
        <div className="container relative">
          <div className="mx-auto max-w-4xl">
            <p className="overline text-butter">§ A.09, Take part</p>
            <h2 className="font-display mt-6 text-display-1 font-extrabold leading-[0.9] tracking-[-0.02em]">
              If you have ever shown up to something like this, you
              understand it immediately.
            </h2>
            <p className="font-serif mt-10 max-w-[58ch] text-xl leading-relaxed text-cream/90 md:text-2xl">
              If you haven't, May 22 is a good place to start.
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <a
                href="/community"
                className="ui inline-flex items-center justify-center bg-ink px-7 py-4 text-xs font-semibold tracking-[0.18em] text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                Find a city →
              </a>
              <a
                href="/join"
                className="ui inline-flex items-center justify-center border border-cream/50 px-7 py-4 text-xs font-semibold tracking-[0.18em] text-cream transition-colors hover:border-butter hover:text-butter"
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
