import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import CinematicGlobe from "@/components/CinematicGlobe";
import timeline2010 from "@/assets/timeline-2010.jpg";
import party from "@/assets/timeline-party.jpg";
import community from "@/assets/community.jpg";

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

        {/* Origin body — vivid, historical, emotionally specific */}
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
                  During the pandemic, online communities exploded, but most of
                  them still ended at the screen.
                </p>
                <p>
                  PizzaDAO started with a simple experiment: send pizza to
                  people we had never met and see what happened.
                </p>
                <p>
                  At first, it was small and disorganized. Late night Discord
                  calls. People coordinating deliveries across borders.
                  Organizers wondering if anyone would actually show up.
                </p>
                <p>
                  Then people kept showing up. Some cities had twenty people.
                  Some took over entire blocks. Most organizers had never met
                  in person before.
                </p>
                <p className="text-ink">
                  That uncertainty became part of the culture.
                </p>
              </div>
            </div>
          </div>

          {/* One pull quote that closes the act */}
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
        {/* Archive timestamp band */}
        <div className="container">
          <div className="flex items-center justify-between border-t border-cream/20 pb-10 pt-6">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-butter">
              Act II — The Ritual
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/45">
              Archive · 05 · 22 · 2010 → ongoing
            </span>
          </div>
        </div>

        {/* Oversized MAY 22 + cinematic image composition */}
        <div className="relative">
          {/* Oversized typographic marker */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 select-none overflow-hidden"
          >
            <div className="font-display whitespace-nowrap text-center text-[clamp(7rem,28vw,22rem)] font-extrabold leading-[0.78] tracking-[-0.04em] text-butter/[0.10]">
              MAY 22
            </div>
          </div>

          {/* Full-bleed documentary image */}
          <figure className="relative z-10 mt-8 md:mt-16">
            <div className="relative overflow-hidden bg-ink">
              <img
                src={timeline2010}
                alt="Archival reference to the 2010 Bitcoin pizza transaction"
                loading="lazy"
                width={2400}
                height={1200}
                className="grain block aspect-[21/10] w-full object-cover opacity-90"
              />
              {/* Cinematic vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 60%, transparent 35%, hsl(0 0% 0% / 0.55) 95%)",
                }}
              />
              {/* Title embedded into the frame */}
              <div className="absolute inset-x-0 bottom-0">
                <div className="container pb-8 md:pb-14">
                  <h2
                    className="font-display max-w-[16ch] text-[clamp(2.4rem,7.5vw,6rem)] font-extrabold leading-[0.86] tracking-[-0.025em] text-cream"
                    style={{ textShadow: "0 2px 28px hsl(0 0% 0% / 0.55)" }}
                  >
                    May 22 became
                    <br />
                    <span className="italic text-butter">a ritual.</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="container">
              <figcaption className="mt-4 flex items-baseline justify-between gap-3">
                <span className="handwritten -rotate-1 text-butter text-sm md:text-base">
                  ↳ a transaction became dinner
                </span>
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/45">
                  Fig. II.01 — 22 · 05 · 2010
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Thin checkered divider */}
          <div className="container mt-20 md:mt-28">
            <div
              aria-hidden="true"
              className="h-2 w-full opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, hsl(var(--butter)) 25%, transparent 25%, transparent 75%, hsl(var(--butter)) 75%), linear-gradient(45deg, hsl(var(--butter)) 25%, transparent 25%, transparent 75%, hsl(var(--butter)) 75%)",
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 4px 4px",
              }}
            />
          </div>

          {/* Long-form ritual narrative */}
          <div className="container">
            <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-24">
              <div className="col-span-12 md:col-span-5">
                <p className="overline text-butter">The annual gathering</p>
                <h3 className="font-display mt-5 text-display-2 font-extrabold leading-[0.9]">
                  Every May 22,
                  <br />
                  somewhere,
                  <br />
                  <span className="italic text-cream/70">a door opens.</span>
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <div className="font-serif max-w-[58ch] space-y-5 text-lg leading-[1.7] text-cream/85 md:text-xl">
                  <p>
                    On May 22, 2010, two pizzas were bought for 10,000 BTC.
                    The story became symbolic because it proved something
                    abstract could become real.
                  </p>
                  <p className="text-cream">
                    A transaction became dinner. Code became a table.
                  </p>
                  <p>
                    Years later, PizzaDAO turned that moment into a recurring
                    global ritual. Every May 22, organizers across the world
                    gather people together in their own cities.
                  </p>
                  <p>
                    Some events are massive. Some are improvised. Some run
                    out of boxes. Some last all night.
                  </p>
                  <p className="text-cream">People keep coming back anyway.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ────────────────────────────────────────────────────────────
          ACT III — HOW IT RUNS
          A clean breath. Calm, structured, credible. Intentionally light.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft relative overflow-hidden bg-cream py-24 md:py-32">
        <div className="container">
          {/* Archival band */}
          <div className="flex items-center justify-between border-t border-ink/20 pb-10 pt-6">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-tomato">
              Act III — How It Runs
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
              Lightweight by design
            </span>
          </div>

          {/* Title + intro */}
          <div className="grid grid-cols-12 gap-x-8 gap-y-8 pb-20 md:pb-28">
            <div className="col-span-12 md:col-span-5">
              <h2 className="font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-[0.86] tracking-[-0.025em]">
                How it runs
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <div className="font-serif max-w-[52ch] space-y-5 text-lg leading-[1.7] text-ink/80 md:text-xl">
                <p>
                  PizzaDAO stays intentionally lightweight.
                </p>
                <p>
                  A small group helps coordinate funding, timing, and shared
                  standards. Everything else happens through local organizers,
                  contributors, and people who decide to show up.
                </p>
                <p className="text-ink">
                  That structure lets every city feel different while still
                  participating in the same global ritual.
                </p>
              </div>
            </div>
          </div>

          {/* 3-column ledger — calm, structural, tactile */}
          <div className="grid grid-cols-1 border-t border-ink/15 md:grid-cols-3">
            {ROLES.map((r, i) => (
              <article
                key={r.name}
                className="border-b border-ink/10 py-10 md:border-b-0 md:border-l md:border-ink/10 md:py-12 md:px-10 md:first:border-l-0 md:first:pl-0"
              >
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-5 text-[1.65rem] font-extrabold leading-[0.95] md:text-[1.75rem]">
                  {r.name}
                </h3>
                <p className="font-serif mt-4 max-w-[32ch] text-base leading-[1.7] text-ink/70">
                  {r.note}
                </p>
              </article>
            ))}
          </div>

          {/* Documentary fragment + human detail */}
          <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-8 md:mt-24">
            {/* Small image fragment */}
            <div className="col-span-12 md:col-span-4">
              <figure className="crop-marks relative">
                <div className="grain relative overflow-hidden bg-ink">
                  <img
                    src={community}
                    alt="Hands reaching for pizza slices at a community gathering"
                    loading="lazy"
                    className="block aspect-[4/3] w-full object-cover"
                  />
                </div>
                <figcaption className="ui mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/35">
                  Fig. III.01 — Field note
                </figcaption>
              </figure>
            </div>

            {/* Human detail */}
            <div className="col-span-12 flex items-end md:col-span-7 md:col-start-6">
              <div className="border-l border-ink/15 pl-6 md:pl-10">
                <p className="handwritten -rotate-1 text-base text-ink/70 md:text-lg">
                  ↳ no one is in charge. everyone shows up.
                </p>
                <p className="font-serif mt-6 max-w-[40ch] text-base leading-[1.7] text-ink/55">
                  That is the only operating principle that has stayed the same
                  since the first pizza went out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          TRANSITION — SOCIAL INFRASTRUCTURE
          A bold editorial interruption. Definitive. Memorable. Grounded.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft relative overflow-hidden bg-cream py-32 md:py-48">
        {/* Subtle checkered tape — thin, top edge only */}
        <div
          aria-hidden="true"
          className="checker-tape absolute left-0 right-0 top-0 h-[4px] opacity-[0.18]"
        />

        <div className="container relative">
          {/* Overline */}
          <p className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/40">
            Why this works
          </p>

          {/* Massive primary statement */}
          <div className="mt-8 md:mt-12">
            <h2 className="font-display max-w-[14ch] text-[clamp(3.2rem,12vw,10rem)] font-extrabold leading-[0.82] tracking-[-0.035em]">
              Pizza is{" "}
              <span className="text-tomato">social</span>{" "}
              infrastructure.
            </h2>
          </div>

          {/* Supporting copy — narrow, calm */}
          <div className="mt-16 grid grid-cols-12 gap-x-6 md:mt-24">
            <div className="col-span-12 md:col-span-5 md:col-start-1">
              <div className="font-serif max-w-[48ch] space-y-5 text-lg leading-[1.75] text-ink/70 md:text-xl">
                <p>
                  It is familiar, affordable, easy to share, and understood
                  almost anywhere.
                </p>
                <p>
                  That makes it unusually effective at bringing strangers
                  together without needing much explanation.
                </p>
              </div>
            </div>

            {/* Tiny handwritten note — single, restrained */}
            <div className="col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
              <p className="handwritten -rotate-1 text-base text-ink/60 md:text-lg">
                ↳ the simplest table in the world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          ACT IV — GLOBAL SCALE
          The signature globe moment.
         ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-32 md:py-48 text-cream">
        {/* Deep space wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, hsl(225 50% 10%) 0%, hsl(230 60% 4%) 55%, hsl(0 0% 0%) 100%)",
          }}
        />
        {/* Faint global light pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 12% 22%, hsl(var(--cream)) 50%, transparent 51%), radial-gradient(1px 1px at 78% 68%, hsl(var(--cream)) 50%, transparent 51%), radial-gradient(1px 1px at 34% 80%, hsl(var(--cream)) 50%, transparent 51%), radial-gradient(1px 1px at 88% 14%, hsl(var(--cream)) 50%, transparent 51%), radial-gradient(1px 1px at 56% 38%, hsl(var(--cream)) 50%, transparent 51%)",
          }}
        />
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.18]"
        />

        <div className="container relative">
          {/* Archival header — minimal chrome */}
          <div className="flex items-center justify-between border-t border-cream/15 pb-20 pt-6 md:pb-28">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.32em] text-tomato">
              Act IV — Global Scale
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/40">
              Archive · transmissions · 2021 →
            </span>
          </div>

          {/* Headline — quiet, centered, breathing */}
          <div className="mx-auto max-w-[22ch] text-center">
            <h2 className="font-display text-[clamp(2.6rem,7.2vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.02em]">
              A ritual with a
              <br />
              <span className="italic font-serif font-normal text-cream/75">
                global footprint.
              </span>
            </h2>
          </div>

          {/* The globe — the moment */}
          <div className="relative mt-20 md:mt-28">
            {/* Faint archival photo wisps flanking the globe */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block"
              style={{ width: "16%" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden opacity-[0.18]">
                <img
                  src={party}
                  alt=""
                  className="h-full w-full object-cover grayscale"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(230 60% 4%) 0%, transparent 60%, hsl(230 60% 4%) 100%)",
                  }}
                />
              </div>
              <div className="ui mt-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-cream/35">
                Fig. IV.01 — Brooklyn, 2022
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
              style={{ width: "16%" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden opacity-[0.18]">
                <img
                  src={community}
                  alt=""
                  className="h-full w-full object-cover grayscale"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(-90deg, hsl(230 60% 4%) 0%, transparent 60%, hsl(230 60% 4%) 100%)",
                  }}
                />
              </div>
              <div className="ui mt-3 text-right text-[9px] font-semibold uppercase tracking-[0.28em] text-cream/35">
                Fig. IV.02 — Lagos, 2023
              </div>
            </div>

            <CinematicGlobe />
          </div>

          {/* Supporting copy — minimal, centered, late */}
          <div className="mx-auto mt-20 max-w-[44ch] text-center md:mt-28">
            <p className="font-serif text-lg leading-[1.75] text-cream/70 md:text-xl">
              Every city brings its own version of the same idea.
            </p>
            <p className="ui mt-10 text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/35">
              2021 — 2024 · 6 continents
            </p>
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

          {/* Section title + intro */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 pb-16 md:pb-24">
            <div className="col-span-12 md:col-span-5">
              <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.92] tracking-[-0.02em]">
                On the record
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="font-serif text-lg leading-[1.7] text-ink/75 md:text-xl">
                As PizzaDAO grew, journalists, filmmakers, and publishers
                started documenting what was happening.
              </p>
              <p className="ui mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/35">
                Selected clippings · {PRESS.length} entries
              </p>
            </div>
          </div>

          {/* Oversized featured quote — the headline of the archive */}
          <figure className="relative border-t border-ink/15 pt-16 md:pt-24">
            <span
              aria-hidden
              className="font-display absolute -top-2 left-0 select-none text-[8rem] leading-none text-tomato/15 md:text-[14rem]"
            >
              “
            </span>
            <blockquote className="font-display ml-2 max-w-[20ch] text-[clamp(2.4rem,7.5vw,5.4rem)] font-extrabold leading-[1.0] tracking-[-0.02em] text-ink md:ml-10">
              The world's largest Bitcoin Pizza Day celebration.
            </blockquote>
            <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-ink/15 pt-6 md:ml-10">
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/40">
                Filed under
              </span>
              <span className="font-display text-base font-extrabold tracking-tight text-ink">
                CoinDesk
              </span>
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/35">
                · Business desk · 2021
              </span>
              <a
                href={PRESS[0].href}
                target="_blank"
                rel="noreferrer"
                className="ui ml-auto inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45 transition-colors hover:text-tomato"
              >
                Read clipping <span>↗</span>
              </a>
            </figcaption>
          </figure>

          {/* Editorial clippings — varied, archival, never a logo wall */}
          <div className="mt-24 md:mt-32">
            <div className="flex items-baseline justify-between border-t border-ink/15 pt-6">
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                Further coverage
              </p>
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/30">
                §
              </p>
            </div>

            <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-16 md:gap-y-20">
              {PRESS.slice(1).map((p, i) => {
                // Asymmetric editorial rhythm: alternate wide/narrow columns
                const layouts = [
                  "md:col-span-7",
                  "md:col-span-5",
                  "md:col-span-6 md:col-start-4",
                  "md:col-span-7",
                  "md:col-span-5",
                ];
                const span = layouts[i % layouts.length];
                const indent = i % 3 === 0 ? "md:ml-6" : "";
                return (
                  <a
                    key={p.outlet}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group col-span-12 ${span} ${indent} block`}
                  >
                    {/* Clipping masthead */}
                    <div className="flex items-baseline gap-3 border-b border-ink/15 pb-3">
                      <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/30">
                        Clip · {String(i + 2).padStart(2, "0")}
                      </span>
                      <span className="font-display text-sm font-extrabold tracking-tight text-ink transition-colors group-hover:text-tomato md:text-base">
                        {p.outlet}
                      </span>
                      {p.kind === "video" && (
                        <span className="ui text-[9px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                          · Broadcast
                        </span>
                      )}
                      <span className="ml-auto text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tomato">
                        ↗
                      </span>
                    </div>

                    {/* Excerpt — feels like a column of body type */}
                    <p className="font-serif mt-5 text-lg leading-[1.55] text-ink/80 md:text-xl md:leading-[1.5]">
                      <span
                        aria-hidden
                        className="text-tomato/60"
                      >
                        “
                      </span>
                      {p.line.replace(/^[“"]|[”"]$/g, "")}
                      <span
                        aria-hidden
                        className="text-tomato/60"
                      >
                        ”
                      </span>
                    </p>

                    {/* Faint editorial trailing line */}
                    <p className="ui mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/35">
                      — {p.outlet}
                      {p.kind === "video" ? " · video transcript" : " · article"}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>



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
