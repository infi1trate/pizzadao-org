import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import PartnersGlobe from "@/components/PartnersGlobe";
import timeline2010 from "@/assets/timeline-2010.jpg";
import party from "@/assets/timeline-party.jpg";

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

type ActProps = {
  number: string;
  title: string;
  subtitle?: string;
};

const ActOpener = ({ number, title, subtitle }: ActProps) => (
  <div className="container">
    <div className="flex items-center justify-between border-t border-ink/20 pb-10 pt-6">
      <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/50">
        Act {number}
      </span>
      <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/35">
        PizzaDAO · A retrospective
      </span>
    </div>
    <div className="grid grid-cols-12 items-end gap-x-8 gap-y-6 pb-16 md:pb-24">
      <h2 className="font-display col-span-12 text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.86] tracking-[-0.025em] md:col-span-8">
        {title}
      </h2>
      {subtitle && (
        <p className="font-serif col-span-12 text-lg leading-[1.55] text-ink/65 md:col-span-4 md:text-[1.05rem]">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const About = () => {
  useEffect(() => {
    document.title = "About, PizzaDAO";
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-cream text-ink">
      <SiteNav solid />

      {/* ────────────────────────────────────────────────────────────
          ACT I — THE SPARK
          One cinematic scene. Image and headline interlocked.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft relative overflow-hidden bg-cream">
        {/* Top archival bar */}
        <div className="container relative z-10 pt-10 md:pt-14">
          <div className="flex items-center justify-between">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-tomato">
              Act I — The Spark
            </span>
            <span className="ui flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-tomato" />
              Est. 2021 · Ongoing
            </span>
          </div>
          <div className="mt-8 border-t border-ink/30" />
        </div>

        {/* Immersive composition — image + embedded headline */}
        <div className="relative mt-10 md:mt-14">
          {/* Documentary image, oversized and full-bleed-ish */}
          <figure className="relative">
            <div className="grain relative overflow-hidden bg-ink">
              <img
                src={party}
                alt="Volunteers carrying pizza boxes through a crowded street gathering, strangers meeting around shared tables"
                loading="eager"
                width={2400}
                height={1500}
                className="block aspect-[4/5] w-full object-cover sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[2/1]"
              />
              {/* Soft analog vignette — pulls eye to center, grounds the type */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 55%, transparent 35%, hsl(0 0% 0% / 0.55) 95%)",
                }}
              />
              {/* Warm cinematic wash from the top */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(0 0% 0% / 0.35), transparent)",
                }}
              />
              {/* Paper grain over photo */}
              <div
                aria-hidden
                className="paper-soft pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
              />

              {/* Embedded headline — sits inside the scene */}
              <div className="absolute inset-0 flex items-end">
                <div className="container w-full pb-10 sm:pb-16 md:pb-20 lg:pb-24">
                  <h1 className="font-display max-w-[16ch] font-extrabold leading-[0.82] tracking-[-0.028em] text-cream text-[clamp(2.6rem,10vw,9.5rem)] md:leading-[0.78]"
                      style={{ textShadow: "0 2px 30px hsl(0 0% 0% / 0.45)" }}>
                    An institution built on a{" "}
                    <span className="italic text-butter">slice</span>
                  </h1>
                </div>
              </div>

              {/* Tiny handwritten annotation — single, restrained */}
              <span
                className="handwritten absolute right-5 top-5 -rotate-2 text-cream/90 text-sm md:right-10 md:top-10 md:text-base"
                style={{ textShadow: "0 1px 12px hsl(0 0% 0% / 0.6)" }}
              >
                ↳ started online, became real
              </span>
            </div>

            {/* Quiet figure caption */}
            <figcaption className="container mt-4 flex items-baseline justify-between gap-3">
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                Fig. I.01 — A chapter, mid-service
              </span>
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/35">
                One night · many cities
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Origin body — story, not specs */}
        <div className="container">
          <div className="mt-28 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-36">
            <div className="col-span-12 md:col-span-4">
              <p className="overline text-tomato">Why it started</p>
              <h3 className="font-display mt-5 text-display-2 font-extrabold leading-[0.9]">
                The internet needed a table.
              </h3>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <div className="font-serif max-w-[60ch] space-y-5 text-lg leading-[1.7] text-ink/85 md:text-xl">
                <p>
                  During the pandemic, online communities were everywhere, but
                  most of them stopped at the screen.
                </p>
                <p>
                  PizzaDAO started with the opposite instinct: take something
                  familiar, easy to share, and deeply human — then use the
                  internet to coordinate it across the real world.
                </p>
                <p>
                  At first, it was loose and strange. A few people, a few
                  wallets, a few pizzas sent across borders.
                </p>
                <p className="text-ink">Then people started showing up.</p>
              </div>
            </div>
          </div>

          {/* Pull quote that closes the act */}
          <div className="mt-24 grid grid-cols-12 gap-x-6 pb-28 md:mt-32 md:pb-36">
            <blockquote className="col-span-12 border-l-[3px] border-tomato py-2 pl-6 md:col-span-10 md:col-start-2 md:pl-10">
              <p className="font-display text-display-2 font-extrabold leading-[0.96] tracking-[-0.02em]">
                “Pizza is the most democratic food on Earth.
                <span className="text-ink/55"> We just made it organized.”</span>
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          ACT II — THE RITUAL
          May 22 · Bitcoin Pizza Day · the annual global gathering.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft paper-soft-dark relative overflow-hidden bg-ink py-24 text-cream md:py-32">
        <div className="relative">
          <div className="container">
            <div className="flex items-center justify-between border-t border-cream/20 pb-12 pt-6">
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-butter">
                Act II — The Ritual
              </span>
              <span className="stamp text-butter">May 22</span>
            </div>

            <div className="grid grid-cols-12 items-end gap-x-8 gap-y-8 pb-20 md:pb-24">
              <h2 className="font-display col-span-12 text-[clamp(2.6rem,9vw,7rem)] font-extrabold leading-[0.84] tracking-[-0.025em] md:col-span-9">
                A transaction
                <br />
                <span className="text-cream/55">became a dinner.</span>
              </h2>
              <p className="font-serif col-span-12 text-lg leading-[1.6] text-cream/70 md:col-span-3">
                A date in internet history, rewritten every year as something
                you can actually attend.
              </p>
            </div>
          </div>

          {/* Full-bleed documentary image */}
          <figure className="relative">
            <div className="overflow-hidden bg-ink">
              <img
                src={timeline2010}
                alt="Archival reference to the 2010 Bitcoin pizza transaction"
                loading="lazy"
                width={1920}
                height={760}
                className="grain block aspect-[21/8] w-full object-cover opacity-90"
              />
            </div>
            <div className="container">
              <figcaption className="mt-4 flex items-baseline justify-between gap-3">
                <span className="handwritten -rotate-1 text-butter text-sm md:text-base">
                  internet history, made physical
                </span>
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/45">
                  Fig. II.01 — May 22, 2010
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Long-form ritual narrative */}
          <div className="container">
            <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-32">
              <div className="col-span-12 md:col-span-5">
                <p className="overline text-butter">The annual gathering</p>
                <h3 className="font-display mt-5 text-display-2 font-extrabold leading-[0.9]">
                  Every May 22, somewhere, a door opens.
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <div className="font-serif max-w-[60ch] space-y-5 text-lg leading-[1.7] text-cream/85 md:text-xl">
                  <p>
                    On May 22, 2010, two pizzas were bought for 10,000 BTC.
                    The story became part of internet history because it
                    proved something abstract could become real.
                  </p>
                  <p>
                    Years later, PizzaDAO turned that memory into a recurring
                    global ritual. Every May 22, local organizers bring people
                    together in their own cities.
                  </p>
                  <p>
                    Some events are polished. Some are chaotic. Some are small.
                    Some take over entire blocks.
                  </p>
                  <p className="text-cream">That range is what makes it work.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          ACT III — HOW IT ACTUALLY WORKS
          Chapter leads · contributors · participants. Clean and structured.
         ──────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-24 md:py-32">
        <ActOpener
          number="III"
          title="How it actually works."
          subtitle="Light by design. A small group coordinates the calendar; the rest happens in cities, on the ground, by people who decide to show up."
        />

        <div className="container">
          {/* 3-column ledger — restrained, structural */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {ROLES.map((r, i) => (
              <article
                key={r.name}
                className="border-t border-ink/25 py-10 md:py-12 md:pr-10 md:[&:not(:first-child)]:pl-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-ink/15"
              >
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-tomato">
                  Role {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-5 text-3xl font-extrabold leading-[0.95] md:text-[2rem]">
                  {r.name}
                </h3>
                <p className="font-serif mt-4 text-base leading-[1.7] text-ink/75">
                  {r.note}
                </p>
              </article>
            ))}
          </div>

          {/* Quiet structural note */}
          <p className="font-serif mt-16 max-w-[58ch] text-lg leading-[1.7] text-ink/65 md:mt-20">
            There is no headquarters. There is a calendar, a shared standard,
            and a network of people who keep choosing to make the date real
            wherever they live.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          ACT IV — GLOBAL SCALE
          The signature globe moment.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft relative overflow-hidden bg-cream-warm py-28 md:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, hsl(var(--tomato)) 0%, transparent 60%)",
          }}
        />

        <div className="container relative">
          <div className="flex items-center justify-between border-t border-ink/20 pb-12 pt-6">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-tomato">
              Act IV — Global Scale
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
              420+ cities · 6 continents · 1 night
            </span>
          </div>

          <div className="grid grid-cols-12 items-center gap-x-10 gap-y-16">
            <div className="col-span-12 md:col-span-5">
              <h2 className="font-display text-[clamp(2.6rem,7.5vw,5.5rem)] font-extrabold leading-[0.86] tracking-[-0.02em]">
                One night.
                <br />
                <span className="text-ink/55">Everywhere at once.</span>
              </h2>
              <p className="font-serif mt-8 max-w-[42ch] text-lg leading-[1.7] text-ink/75 md:text-xl">
                Every city brings its own version of the same idea. The
                footprint isn't a map of branches — it's the shape of a
                ritual the internet learned to carry across borders.
              </p>
              <p className="handwritten mt-8 -rotate-1 text-base text-tomato">
                ↳ one weekend, every continent
              </p>
            </div>

            <div className="col-span-12 md:col-span-7">
              <PartnersGlobe />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px border-t border-ink/15 pt-10 md:grid-cols-4">
            {[
              { k: "Cities", v: "420+" },
              { k: "Funding", v: "$1M+" },
              { k: "Attendees", v: "20K+" },
              { k: "Return rate", v: "92%" },
            ].map((s) => (
              <div key={s.k} className="px-2 md:px-6 md:first:pl-0">
                <div className="font-display text-4xl font-extrabold leading-none tracking-[-0.02em] md:text-[3rem]">
                  {s.v}
                </div>
                <div className="ui mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          ACT V — THE MEMORY
          Press · reflection · emotional close.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft relative overflow-hidden bg-cream pt-24 md:pt-32">
        <div className="container">
          <div className="flex items-center justify-between border-t border-ink/20 pb-12 pt-6">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-tomato">
              Act V — The Memory
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
              On the record · 2021—
            </span>
          </div>

          {/* Featured press quote */}
          <figure className="border-l-2 border-tomato/50 pl-6 md:pl-10">
            <blockquote className="font-display max-w-[22ch] text-[clamp(2.2rem,6.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink">
              The world's largest Bitcoin Pizza Day celebration.
            </blockquote>
            <figcaption className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-sm font-extrabold tracking-tight text-ink/90">
                CoinDesk
              </span>
              <a
                href={PRESS[0].href}
                target="_blank"
                rel="noreferrer"
                className="ui inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40 transition-colors hover:text-tomato"
              >
                Read article <span>↗</span>
              </a>
            </figcaption>
          </figure>

          {/* Selected coverage — quiet list */}
          <ul className="mt-20 border-t border-ink/15 md:mt-24">
            {PRESS.slice(1).map((p, i) => (
              <li key={p.outlet} className="group border-b border-ink/10">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-6 transition-colors duration-300 md:py-7 ${
                    p.kind === "video" ? "hover:bg-butter/15" : "hover:bg-ink/[0.03]"
                  }`}
                >
                  <span className="ui col-span-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/30 md:col-span-1">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <span className="font-display col-span-10 flex items-center gap-2 text-base font-extrabold tracking-tight transition-colors group-hover:text-tomato md:col-span-3 md:text-lg">
                    {p.outlet}
                    {p.kind === "video" && (
                      <span className="ui inline-flex items-center gap-1 rounded-full border border-ink/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-ink/50">
                        ▶ Video
                      </span>
                    )}
                  </span>
                  <p className="font-serif col-span-12 pl-8 text-base italic leading-snug text-ink/65 md:col-span-7 md:pl-0 md:text-lg">
                    {p.line}
                  </p>
                  <span className="ui col-span-12 flex items-center justify-end gap-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/0 transition-all duration-300 group-hover:text-ink/50 md:col-span-1">
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Reflection — quiet bridge before the close */}
          <div className="mt-28 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-36">
            <div className="col-span-12 md:col-span-2">
              <p className="overline text-tomato">Reflection</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="font-display text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.015em] text-ink/90">
                It was never really about the pizza.
                <span className="text-ink/45"> It was about the table — and the
                fact that the internet finally figured out how to set one.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Emotional close — poster moment */}
        <div className="paper-soft-dark relative mt-28 overflow-hidden bg-tomato py-32 text-cream md:mt-36 md:py-40">
          <div className="checker-tape absolute left-0 right-0 top-0 h-[5px] opacity-25" aria-hidden="true" />
          <div className="checker-tape absolute bottom-0 left-0 right-0 h-[5px] opacity-25" aria-hidden="true" />

          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center">
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/55">
                Closing
              </p>

              <h2 className="font-display mt-10 text-[clamp(2.6rem,8vw,6rem)] font-extrabold leading-[0.88] tracking-[-0.02em]">
                If you've ever shown up to something like this, you already
                understand it.
              </h2>

              <p className="handwritten mt-10 rotate-1 text-xl text-butter/95 md:text-2xl">
                see you on may 22
              </p>

              <p className="font-serif mx-auto mt-8 max-w-[44ch] text-xl leading-[1.6] text-cream/80 md:text-2xl">
                If you haven't, May 22 is a good place to start.
              </p>

              <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/community"
                  className="ui inline-flex items-center justify-center bg-cream px-9 py-4 text-xs font-semibold tracking-[0.22em] text-ink transition-colors hover:bg-butter"
                >
                  Find a city →
                </a>
                <a
                  href="/join"
                  className="ui inline-flex items-center justify-center border border-cream/40 px-9 py-4 text-xs font-semibold tracking-[0.22em] text-cream transition-colors hover:border-butter hover:text-butter"
                >
                  Host an event
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
