import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ArchivalWall from "@/components/ArchivalWall";
import { findPhoto } from "@/lib/pizzadaoPhotos";
import timeline2010 from "@/assets/timeline-2010.jpg";
import party from "@/assets/timeline-party.jpg";
import community from "@/assets/community.jpg";

// Real PizzaDAO archive photos for the hero scenes — with local fallbacks
// in case the remote CDN is ever unreachable.
const HERO_PHOTO   = findPhoto("Lagos")?.src       ?? party;
const RITUAL_PHOTO = findPhoto("Buenos Aires")?.src ?? timeline2010;
const FIELD_PHOTO  = findPhoto("Cape Town")?.src   ?? community;


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
    <div className="flex items-center justify-between border-t border-ink/15 pb-10 pt-6">
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
          <div className="mt-8 border-t border-ink/15" />
        </div>

        {/* Immersive composition — image + embedded headline */}
        <div className="relative mt-12 md:mt-16">
          <figure className="relative">
            <div className="grain relative overflow-hidden bg-ink">
              <img
                src={HERO_PHOTO}
                alt="Volunteers carrying pizza boxes through a crowded street gathering, strangers meeting around shared tables"
                loading="eager"
                decoding="async"
                width={2400}
                height={1500}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = party; }}
                style={{ objectPosition: "50% 42%" }}
                className="block aspect-[4/5] w-full object-cover sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[21/9]"
              />

              {/* Bottom-weighted cinematic gradient — anchors the headline, keeps midtones */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(0 0% 0% / 0.18) 0%, transparent 28%, transparent 50%, hsl(0 0% 0% / 0.55) 88%, hsl(0 0% 0% / 0.70) 100%)",
                }}
              />

              {/* Soft analog vignette — pulls the eye toward the human moment */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 48%, transparent 42%, hsl(0 0% 0% / 0.45) 100%)",
                }}
              />

              {/* Restrained film grain over the photograph */}
              <div
                aria-hidden
                className="paper-soft pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              />

              {/* Embedded headline — sits inside the scene, with room to breathe */}
              <div className="absolute inset-0 flex items-end">
                <div className="container w-full pb-12 sm:pb-20 md:pb-28 lg:pb-32">
                  <h1 className="font-display max-w-[15ch] font-extrabold leading-[0.82] tracking-[-0.028em] text-cream text-[clamp(2.6rem,10vw,9.5rem)] md:leading-[0.78]"
                      style={{ textShadow: "0 2px 36px hsl(0 0% 0% / 0.55)" }}>
                    An institution built on a{" "}
                    <span className="italic text-butter">slice</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Single quiet figure caption */}
            <figcaption className="container mt-4">
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                Fig. I.01 — A chapter, mid-service · one night, many cities
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
                  The internet had plenty of rooms. What it didn't have was a
                  table.
                </p>
                <p>
                  In 2021, a few people in a Discord server tried ordering
                  pizza for strangers in other cities, just to see who would
                  come.
                </p>
                <p>
                  Nobody knew if it would work. Spreadsheets at 2am. Delivery
                  apps failing on foreign addresses. Organizers texting, "are you
                  actually going?" Most had never been in the same room.
                </p>
                <p>
                  Then someone opened a door and people were outside. Six
                  people and a box. Or a sidewalk spilling over. No permits. No
                  plan B.
                </p>
                <p className="text-ink">
                  The uncertainty was the point.
                </p>
              </div>
            </div>
          </div>

          {/* Manifesto quote — foundational poster moment */}
          <div className="mt-32 pb-32 md:mt-48 md:pb-48">
            <blockquote className="mx-auto max-w-[18ch]">
              <p className="font-display font-extrabold text-ink text-[clamp(3.5rem,11vw,11rem)] leading-[0.92] tracking-[-0.035em]">
                Pizza is the most democratic food on Earth.
              </p>
              <footer className="mt-10 ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
                — Founding principle
              </footer>
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
          <div className="flex items-center justify-between border-t border-cream/15 pb-10 pt-6">
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

          <figure className="relative z-10 mt-10 md:mt-20">
            <div className="relative overflow-hidden bg-ink">
              <img
                src={RITUAL_PHOTO}
                alt="Archival reference to a Bitcoin Pizza Day gathering"
                loading="lazy"
                decoding="async"
                width={2400}
                height={1400}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = timeline2010; }}
                className="grain block aspect-[21/12] w-full object-cover opacity-80"
                style={{ objectPosition: "50% 45%" }}
              />
              {/* Deep cinematic vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 55%, transparent 25%, hsl(0 0% 0% / 0.75) 95%)",
                }}
              />
              {/* Bottom-anchored darkness for typography readability */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, hsl(0 0% 0% / 0.55) 70%, hsl(0 0% 0% / 0.85) 100%)",
                }}
              />
              {/* Extra film grain pass */}
              <div aria-hidden="true" className="paper-soft-dark pointer-events-none absolute inset-0 opacity-60" />
              {/* Title embedded into the frame */}
              <div className="absolute inset-x-0 bottom-0">
                <div className="container pb-12 md:pb-20">
                  <h2
                    className="font-display max-w-[14ch] text-[clamp(2.8rem,9vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.03em] text-cream"
                    style={{ textShadow: "0 2px 40px hsl(0 0% 0% / 0.7)" }}
                  >
                    May 22 became
                    <br />
                    <span className="italic text-butter">a ritual.</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="container">
              <figcaption className="mt-4 flex items-baseline justify-end">
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/40">
                  Fig. II.01 — 22 · 05 · 2010
                </span>
              </figcaption>
            </div>
          </figure>


          {/* Long-form ritual narrative */}
          <div className="container">
            <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-40">
              <div className="col-span-12 md:col-span-12">
                <h3 className="font-display mx-auto max-w-[18ch] text-center text-[clamp(2.8rem,8.5vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.03em]">
                  Every May 22,
                  <br />
                  somewhere,
                  <br />
                  <span className="handwritten text-butter text-[1.05em]">a door opens.</span>
                </h3>
              </div>
              <div className="col-span-12 mt-12 md:col-span-7 md:col-start-4 md:mt-20">
                <div className="font-serif space-y-6 text-lg leading-[1.75] text-cream/85 md:text-xl">
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
          The cleanest section on the page. A structural breath.
          No image. No decoration. Just calm editorial clarity.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft relative overflow-hidden bg-cream py-24 md:py-36">
        <div className="container">
          {/* Archival band */}
          <div className="flex items-center justify-between border-t border-ink/10 pb-10 pt-6">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-tomato">
              Act III — How It Runs
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
              Lightweight by design
            </span>
          </div>

          {/* Title + intro — airy, calm */}
          <div className="grid grid-cols-12 gap-x-8 gap-y-8 pb-16 md:pb-24">
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

          {/* 3-column ledger — calm, structural, no borders */}
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-14 md:gap-y-0">
            {ROLES.map((r) => (
              <article key={r.name} className="py-2 md:py-4">
                <h3 className="font-display text-[1.65rem] font-extrabold leading-[0.95] md:text-[1.75rem]">
                  {r.name}
                </h3>
                <p className="font-serif mt-4 max-w-[32ch] text-base leading-[1.7] text-ink/70">
                  {r.note}
                </p>
              </article>
            ))}
          </div>

          {/* Single quiet principle — centered, restrained */}
          <div className="mt-20 max-w-[46ch] md:mt-28">
            <p className="font-serif text-base leading-[1.7] text-ink/60 md:text-lg">
              No one is in charge. Everyone shows up. That is the only
              operating principle that has stayed the same since the first
              pizza went out.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          THESIS — SOCIAL INFRASTRUCTURE
          A quick, definitive interruption. 5 seconds to absorb.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft relative overflow-hidden bg-cream py-20 md:py-28">
        <div className="container relative">
          <blockquote className="mx-auto max-w-[18ch] text-center">
            <p className="font-display font-extrabold text-ink text-[clamp(2.8rem,9vw,8rem)] leading-[0.9] tracking-[-0.035em]">
              Pizza is{" "}
              <span className="italic text-tomato">social</span>{" "}
              infrastructure.
            </p>
            <footer className="mt-8 font-serif text-base leading-[1.6] text-ink/60 md:text-lg">
              Familiar, affordable, understood almost anywhere.
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          ACT IV — GLOBAL SCALE
          The signature globe moment.
         ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-28 md:py-40 text-cream">
        {/* Deep paper-dark wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, hsl(225 30% 12%) 0%, hsl(230 40% 6%) 55%, hsl(0 0% 0%) 100%)",
          }}
        />
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.22]"
        />

        <div className="container relative">
          {/* Archival header — minimal chrome */}
          <div className="flex items-center justify-between border-t border-cream/15 pb-16 pt-6 md:pb-24">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-tomato">
              Act IV — The Archive
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/40">
              Global Pizza Party · 2021 → 2024
            </span>
          </div>

          {/* Headline — left-aligned, large, breathing */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-20 md:pb-28">
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-display text-[clamp(2.6rem,8.5vw,7rem)] font-extrabold leading-[0.86] tracking-[-0.028em]">
                People kept
                <br />
                <span className="italic font-serif font-normal text-cream/80">
                  showing up.
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:pt-6">
              <p className="font-serif max-w-[36ch] text-lg leading-[1.65] text-cream/70 md:text-xl">
                Year after year, cities around the world kept gathering around
                the same simple idea.
              </p>
              <p className="ui mt-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/35">
                Selected frames · 17 cities · 4 years
              </p>
            </div>
          </div>

          {/* The wall */}
          <ArchivalWall />

          {/* Closing field note */}
          <div className="mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t border-cream/15 pt-6 md:mt-28">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/40">
              Field archive · ongoing
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/30">
              Hover for city &amp; year
            </span>
          </div>
        </div>
      </section>


      {/* ────────────────────────────────────────────────────────────
          ACT V — THE MEMORY
          Press · reflection · emotional close.
         ──────────────────────────────────────────────────────────── */}
      <section className="paper-soft relative overflow-hidden bg-cream pt-24 md:pt-32">
        <div className="container">
          <div className="flex items-center justify-between border-t border-ink/15 pb-12 pt-6">
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

          {/* Restrained outlet list — one type treatment, generous spacing */}
          <div className="mt-28 md:mt-40">
            <div className="flex items-baseline justify-between border-t border-ink/15 pt-6">
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/45">
                Further coverage
              </p>
              <p className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/30">
                {String(PRESS.length - 1).padStart(2, "0")} clippings
              </p>
            </div>

            <ul className="mt-4 divide-y divide-ink/10">
              {PRESS.slice(1).map((p) => (
                <li key={p.outlet}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-10 md:py-12"
                  >
                    {/* Outlet — single small label, one weight */}
                    <div className="col-span-12 md:col-span-3">
                      <span className="font-display text-sm font-extrabold tracking-tight text-ink transition-colors group-hover:text-tomato">
                        {p.outlet}
                      </span>
                    </div>

                    {/* Quoted line — the only emphasized type in the row */}
                    <p className="font-serif col-span-12 text-lg leading-[1.45] text-ink/80 md:col-span-8 md:text-xl">
                      {p.line.replace(/^[“"]|[”"]$/g, "")}
                    </p>

                    {/* Arrow — quiet hover affordance */}
                    <div className="col-span-12 hidden md:col-span-1 md:flex md:justify-end">
                      <span className="text-ink/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tomato">
                        ↗
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>




        </div>

        {/* Final close — documentary ending */}
        <div className="relative overflow-hidden bg-[hsl(0_78%_54%)] py-36 md:py-52">
          {/* L1 — coarse paper tooth: low frequency, multiply for darker fibres */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='480'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.012 0.018' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.15  0 0 0 0 0.02  0 0 0 0 0.02  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23p)'/></svg>")`,
              backgroundSize: "480px 480px",
            }}
            aria-hidden="true"
          />
          {/* L2 — high-frequency contrasty grain: pulled up for tactile bite */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.88  0 0 0 0 0.72  0 0 0 1.2 -0.1'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`,
              backgroundSize: "260px 260px",
            }}
            aria-hidden="true"
          />
          {/* L3 — bright warm grain pass: highlights, screen blend for sparkle */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-screen"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='h'><feTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.92  0 0 0 0 0.78  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23h)'/></svg>")`,
            }}
            aria-hidden="true"
          />
          {/* L4 — ink dispersion blobs: uneven pigment pooling, like screenprint */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{
              background: `
                radial-gradient(38% 28% at 14% 22%, hsl(0 80% 32% / 0.38), transparent 70%),
                radial-gradient(42% 32% at 86% 78%, hsl(0 80% 28% / 0.42), transparent 72%),
                radial-gradient(30% 24% at 72% 18%, hsl(0 75% 36% / 0.22), transparent 70%),
                radial-gradient(34% 26% at 22% 84%, hsl(0 75% 34% / 0.28), transparent 72%)`,
            }}
            aria-hidden="true"
          />
          {/* L5 — warm highlight wash: where the squeegee lifted */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background: `radial-gradient(60% 45% at 30% 18%, hsl(44 90% 96% / 0.10), transparent 60%), radial-gradient(50% 40% at 78% 88%, hsl(20 90% 88% / 0.06), transparent 60%)`,
            }}
            aria-hidden="true"
          />
          {/* L6 — faint misregistration streak: subtle squeegee pass */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
            style={{
              backgroundImage: `repeating-linear-gradient(180deg, hsl(0 80% 28% / 0.5) 0px, transparent 1.5px, transparent 6px)`,
            }}
            aria-hidden="true"
          />
          {/* L7 — soft edge vignette: pulls focus, suggests paper edge */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{
              background: `radial-gradient(120% 95% at 50% 50%, transparent 55%, hsl(0 80% 22% / 0.32) 100%)`,
            }}
            aria-hidden="true"
          />
          {/* Top checkered tape — kept, softer */}
          <div
            className="checker-tape absolute left-0 right-0 top-0 h-[3px] opacity-[0.14]"
            aria-hidden="true"
          />


          <div className="container relative">
            <div className="mx-auto max-w-[72ch]">
              {/* Small emotional annotation — Rock Salt, once only */}
              <p className="handwritten mb-12 text-base text-[hsl(44_80%_92%_/0.75)] md:text-lg">
                People kept showing up.
              </p>

              <h2 className="font-display text-[clamp(2.4rem,7.5vw,6.2rem)] font-extrabold leading-[0.88] tracking-[-0.02em] text-cream">
                If you have ever shown up to something like this, you understand it immediately.
              </h2>

              <p className="font-serif mt-10 max-w-[48ch] text-lg leading-[1.55] text-[hsl(44_80%_92%_/0.72)] md:text-xl">
                If you haven't, May 22 is a good place to start.
              </p>

              <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row">
                <a
                  href="/community"
                  className="ui inline-flex items-center justify-center rounded-full bg-cream px-10 py-4 text-xs font-semibold tracking-[0.22em] text-ink transition-colors hover:bg-[hsl(44_80%_99%)]"
                >
                  Find a city →
                </a>
                <a
                  href="/get-your-mafia-name"
                  className="ui inline-flex items-center justify-center rounded-full border border-[hsl(44_80%_92%_/0.35)] px-10 py-4 text-xs font-semibold tracking-[0.22em] text-[hsl(44_80%_92%_/0.85)] transition-colors hover:border-[hsl(44_80%_92%_/0.6)] hover:text-cream"
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
