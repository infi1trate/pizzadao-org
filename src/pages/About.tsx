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

// Small documentary polaroids — pinned to the origin column for warmth.
const ORIGIN_POLAROIDS = [
  { src: findPhoto("Manila")?.src ?? findPhoto("Bangkok")?.src ?? community, city: "Manila", note: "first run, 2021", tilt: "-rotate-[3deg]", offset: "translate-y-0" },
  { src: findPhoto("Brooklyn")?.src ?? findPhoto("New York")?.src ?? party,  city: "Brooklyn", note: "rooftop, may 22",  tilt: "rotate-[2.2deg]",  offset: "translate-y-4" },
  { src: findPhoto("Lagos")?.src ?? findPhoto("Nairobi")?.src ?? timeline2010, city: "Lagos",  note: "boxes & friends", tilt: "-rotate-[1.4deg]", offset: "translate-y-2" },
];

// Contact-strip — three faces of one global night, end of the Ritual section.
const RITUAL_STRIP = [
  { src: findPhoto("Buenos Aires")?.src ?? party,    city: "Buenos Aires", stamp: "22.05 · 23:14" },
  { src: findPhoto("Nairobi")?.src ?? community,     city: "Nairobi",      stamp: "22.05 · 19:02" },
  { src: findPhoto("Detroit")?.src ?? timeline2010,  city: "Detroit",      stamp: "22.05 · 21:47" },
  { src: findPhoto("Bangkok")?.src ?? party,         city: "Bangkok",      stamp: "23.05 · 01:30" },
];

const THESIS_PHOTO = findPhoto("Rio de Janeiro")?.src ?? findPhoto("Medellín")?.src ?? community;


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

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <figure className="relative">
          <div className="grain relative overflow-hidden bg-ink">
            <img
              src={HERO_PHOTO}
              alt="Volunteers carrying pizza boxes through a crowded street gathering"
              loading="eager"
              decoding="async"
              width={2400}
              height={1500}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = party; }}
              style={{ objectPosition: "50% 42%" }}
              className="block h-[88svh] min-h-[560px] w-full object-cover md:h-[100svh] md:min-h-[720px]"
            />

            {/* Warm tomato/butter atmospheric tint — pushes color into the scene */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "radial-gradient(70% 60% at 20% 30%, hsl(14 80% 50% / 0.35), transparent 70%), radial-gradient(60% 55% at 85% 80%, hsl(40 90% 60% / 0.22), transparent 70%)",
              }}
            />

            {/* Cinematic dual gradient — sky bloom + bottom anchor for type */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(0 0% 0% / 0.55) 0%, hsl(0 0% 0% / 0.05) 22%, transparent 45%, hsl(0 0% 0% / 0.25) 65%, hsl(0 0% 0% / 0.88) 100%)",
              }}
            />

            {/* Side vignette — pulls eye into the crowd */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(140% 90% at 50% 55%, transparent 55%, hsl(0 0% 0% / 0.55) 100%)",
              }}
            />

            {/* High-frequency grain — analog bite */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.92  0 0 0 0 0.78  0 0 0 1.1 -0.05'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
                backgroundSize: "240px 240px",
              }}
            />

            {/* Top micro-labels — sit over the scene under SiteNav */}
            <div className="absolute inset-x-0 top-0 z-10 px-6 pt-24 sm:px-10 md:px-16 md:pt-28 lg:px-20">
              <div className="flex items-baseline justify-between">
                <p className="overline text-butter [text-shadow:0_1px_8px_hsl(0_0%_0%/0.6)]">
                  About PizzaDAO
                </p>
                <span className="ui hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75 md:inline [text-shadow:0_1px_8px_hsl(0_0%_0%/0.6)]">
                  Est. 2021 · Ongoing
                </span>
              </div>
            </div>

            {/* Headline anchored to the bottom — embedded in the scene */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-20 md:px-16 md:pb-24 lg:px-20 lg:pb-28">
              <h1
                className="font-display max-w-[18ch] font-extrabold leading-[0.84] tracking-[-0.03em] text-cream text-[clamp(2.75rem,9vw,8.5rem)] animate-fade-in"
                style={{ textShadow: "0 4px 40px hsl(0 0% 0% / 0.7), 0 1px 2px hsl(0 0% 0% / 0.5)" }}
              >
                An institution built on a{" "}
                <span className="italic text-butter">slice</span>.
              </h1>

              <div className="mt-8 flex items-baseline gap-4 md:mt-10">
                <span aria-hidden className="h-px w-12 bg-butter/70" />
                <figcaption className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">
                  A chapter, mid-service · one night, many cities
                </figcaption>
              </div>
            </div>
          </div>
        </figure>
      </section>

      {/* ── ORIGIN ───────────────────────────────────────────────── */}
      <section className="bg-cream py-24 md:py-36">
        <div className="container">
          {/* Tiny archive slip — field-note framing */}
          <div className="mb-10 flex items-baseline justify-between border-t border-ink/15 pt-5 md:mb-14">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
              § 01 — Origin · 2020–2021
            </span>
            <span className="ui hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/35 md:inline">
              Discord · #pizza-day
            </span>
          </div>

          <div className="grid grid-cols-12 gap-x-8 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <p className="overline text-tomato">How it started</p>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[0.94] tracking-[-0.02em]">
                A Discord server, a holiday, and a hunch.
              </h2>

              {/* Pinned polaroid trio — tactile field-archive warmth */}
              <div className="mt-14 hidden md:flex md:items-start md:gap-3">
                {ORIGIN_POLAROIDS.map((p, i) => (
                  <figure
                    key={p.city}
                    className={`relative ${p.tilt} ${p.offset} w-[36%] origin-top transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]`}
                    style={{ zIndex: 10 - i }}
                  >
                    <div className="grain relative overflow-hidden bg-cream p-2 pb-8 shadow-[0_8px_20px_-10px_hsl(0_0%_0%/0.35),0_2px_5px_-2px_hsl(0_0%_0%/0.2)]">
                      <div className="aspect-square overflow-hidden bg-ink">
                        <img
                          src={p.src}
                          alt={`${p.city} — early PizzaDAO gathering`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover [filter:saturate(0.92)_contrast(1.04)_sepia(0.06)]"
                        />
                      </div>
                      <figcaption className="handwritten absolute inset-x-2 bottom-1 text-center text-xs leading-tight text-ink/70">
                        {p.city} · {p.note}
                      </figcaption>
                    </div>
                    {/* paper tape */}
                    <span
                      aria-hidden
                      className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-4deg] bg-butter/70 opacity-80 shadow-sm"
                      style={{ clipPath: "polygon(4% 0,96% 0,100% 100%,0 100%)" }}
                    />
                  </figure>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              {/* Tiny dateline — restrained archival cue */}
              <p className="ui mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                <span aria-hidden className="h-px w-8 bg-ink/30" />
                Filed · Spring 2021
              </p>
              <p className="font-serif text-xl leading-[1.5] text-ink md:text-[1.6rem] md:leading-[1.45]">
                PizzaDAO started in 2021 as a small group of people on the
                internet, trying to throw a party in cities they'd never been to,
                for people they'd never met.
              </p>
              <div className="font-serif mt-10 max-w-[62ch] space-y-5 text-lg leading-[1.75] text-ink/85">
                <p>
                  It was the second year of the pandemic. Everyone had been
                  inside for too long. Most of us had only ever known each other
                  as usernames in a Discord server, talking about a fifteen-year-old
                  story: the guy who paid 10,000 BTC for two pizzas, on May 22,
                  2010.
                </p>
                <p>
                  Someone joked we should buy pizza for strangers on that day,
                  in every city we could reach. A few weeks later we were
                  actually trying to do it. Spreadsheets at 2am. Telegram
                  threads in four languages. Delivery apps that refused foreign
                  cards. Organizers in cities we'd never visited, texting "I
                  think I found a pizzeria, but they only take cash."
                </p>
                <p>
                  We had no idea if anyone would actually show up. Most of the
                  organizers had never met each other in person. Some had
                  never met anyone from the internet, period.
                </p>
                <p>
                  Then May 22 came. People walked outside. Strangers introduced
                  themselves. Photos started coming in from Lagos, Buenos Aires,
                  Manila, Brooklyn — pizza boxes on sidewalks, people eating
                  on curbs, organizers grinning at their phones because the
                  thing they'd been typing about for months had a face now.
                </p>
                <p className="text-ink">
                  That was the moment the internet became a room you could
                  walk into.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTER QUOTE ─────────────────────────────────────────── */}
      <section className="bg-cream py-28 md:py-40">
        <div className="container">
          <figure className="mx-auto max-w-[68rem]">
            <blockquote>
              <p className="font-display text-ink font-extrabold leading-[0.95] tracking-[-0.025em] text-[clamp(2.5rem,7.5vw,6.5rem)]">
                Pizza is the most{" "}
                <span className="text-tomato">democratic</span> food on Earth.
              </p>
            </blockquote>
            <figcaption className="ui mt-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
              <span className="h-px w-10 bg-ink/40" />
              A founding principle
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── RITUAL ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-cream">
        {/* warm atmospheric wash — tomato/butter glow on deep ink */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 18% 28%, hsl(14 75% 38% / 0.22), transparent 70%), radial-gradient(55% 45% at 88% 78%, hsl(40 85% 55% / 0.10), transparent 70%)",
          }}
        />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" />
        {/* Full-bleed cinematic photograph */}
        <figure className="relative">
          <div className="grain relative overflow-hidden bg-ink">
            <img
              src={RITUAL_PHOTO}
              alt="Archival reference to a Bitcoin Pizza Day gathering"
              loading="lazy"
              decoding="async"
              width={2400}
              height={1400}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = timeline2010; }}
              className="block aspect-[4/5] w-full object-cover opacity-90 sm:aspect-[3/2] md:aspect-[21/9]"
              style={{ objectPosition: "50% 45%" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(0 0% 0% / 0.55) 0%, hsl(0 0% 0% / 0.20) 35%, hsl(0 0% 0% / 0.35) 65%, hsl(0 0% 0% / 0.85) 100%)",
              }}
            />
          </div>
        </figure>

        <div className="container py-28 md:py-40">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-butter">May 22 · Bitcoin Pizza Day</p>
              <h2 className="font-display mt-5 text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[0.92]">
                A transaction became a ritual.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <div className="font-serif max-w-[60ch] space-y-5 text-lg leading-[1.75] text-cream/85">
                <p>
                  On May 22, 2010, two pizzas were bought for 10,000 BTC. The
                  story became symbolic because it proved that something
                  abstract could become real. A transaction became dinner.
                </p>
                <p>
                  Years later, PizzaDAO turned that moment into a recurring
                  global ritual. Every May 22, organizers across the world
                  gather people together in their own cities.
                </p>
                <p>
                  Some events are massive. Some are improvised. Some run out
                  of boxes. Some last all night.
                </p>
                <p className="text-cream">People keep coming back anyway.</p>
              </div>
            </div>
          </div>

          {/* Contact-sheet strip — four faces of one global night */}
          <div className="mt-24 md:mt-32">
            <div className="mb-5 flex items-baseline justify-between">
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/45">
                Field contact sheet · May 22
              </span>
              <span className="ui hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/30 md:inline">
                Roll 03 / 12
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
              {RITUAL_STRIP.map((p, i) => (
                <figure
                  key={p.city}
                  className="group relative overflow-hidden bg-ink ring-1 ring-cream/10"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={p.src}
                      alt={`${p.city}, May 22`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-90 transition-all duration-700 [filter:saturate(0.85)_contrast(1.08)_sepia(0.08)] group-hover:scale-[1.04] group-hover:opacity-100"
                    />
                  </div>
                  <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.75) 0%, transparent 45%)" }}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between px-3 pb-2.5">
                    <span className="font-display text-xs font-extrabold tracking-tight text-cream">{p.city}</span>
                    <span className="ui text-[9px] font-semibold uppercase tracking-[0.22em] text-cream/65">{p.stamp}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Quiet emotional accent — short, supportive, not informational */}
          <div className="mt-20 flex justify-center md:mt-28">
            <p className="handwritten -rotate-[1.5deg] text-butter text-[clamp(2rem,5vw,3.5rem)] leading-tight">
              Every May 22, a door opens.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT RUNS ──────────────────────────────────────────── */}
      <section className="bg-cream py-24 md:py-36">
        <div className="container">
          <div className="flex items-baseline justify-between border-t border-ink/15 pb-14 pt-5 md:pb-20">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
              § 03 — Operating notes
            </span>
            <span className="ui hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/35 md:inline">
              Lightweight by design
            </span>
          </div>

          <div className="grid grid-cols-12 gap-x-8 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-tomato">How it runs</p>
              <h2 className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.92] tracking-[-0.02em]">
                A small core, a global cast.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <div className="font-serif max-w-[58ch] space-y-5 text-lg leading-[1.7] text-ink/80 md:text-xl md:leading-[1.6]">
                <p>
                  A surprisingly small number of people help coordinate the
                  infrastructure behind PizzaDAO each year.
                </p>
                <p>
                  Everything else happens because local organizers,
                  contributors, and strangers decide to participate.
                </p>
                <p className="text-ink">That's what makes it work.</p>
              </div>
            </div>
          </div>

          {/* Four numbers — emotionally restrained, editorial */}
          <dl className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 border-y border-ink/15 py-14 md:mt-32 md:grid-cols-4 md:gap-x-12 md:py-16">
            {[
              { k: "Cities", v: "420+" },
              { k: "Countries", v: "60+" },
              { k: "Funded", v: "$1M+" },
              { k: "Since", v: "2021" },
            ].map((m) => (
              <div key={m.k}>
                <dt className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                  {m.k}
                </dt>
                <dd className="font-display mt-4 text-[clamp(2.5rem,4.5vw,3.75rem)] font-extrabold leading-[0.92] tracking-[-0.025em]">
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="handwritten mt-4 rotate-[-1.2deg] text-right text-tomato text-xl md:text-2xl">
            …and counting →
          </p>
        </div>
      </section>


      {/* ── THESIS ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream py-28 md:py-40">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-8 gap-y-10 items-center">
            <div className="col-span-12 md:col-span-8">
              <p className="font-display text-ink font-extrabold leading-[0.95] tracking-[-0.025em] text-[clamp(2.5rem,8vw,7rem)]">
                Pizza is{" "}
                <span className="text-tomato">social infrastructure</span>.
              </p>
              <p className="font-serif mt-8 max-w-[44ch] text-lg leading-[1.55] text-ink/60 md:text-xl">
                Familiar, affordable, understood almost anywhere.
              </p>
            </div>

            {/* Pinned thesis polaroid — humanizes the abstract claim */}
            <figure className="relative col-span-12 md:col-span-4 md:col-start-9 mx-auto md:mx-0 w-[70%] sm:w-[55%] md:w-full max-w-[280px] -rotate-[3.5deg] transition-transform duration-500 hover:rotate-0">
              <div className="grain relative overflow-hidden bg-cream p-2.5 pb-10 shadow-[0_18px_40px_-18px_hsl(0_0%_0%/0.45),0_4px_10px_-4px_hsl(0_0%_0%/0.25)]">
                <div className="aspect-[4/5] overflow-hidden bg-ink">
                  <img
                    src={THESIS_PHOTO}
                    alt="People sharing pizza on a city street"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover [filter:saturate(0.95)_contrast(1.06)_sepia(0.05)]"
                  />
                </div>
                <figcaption className="handwritten absolute inset-x-2 bottom-1 text-center text-sm text-ink/75">
                  strangers, 11 minutes later
                </figcaption>
              </div>
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[3deg] bg-tomato/60 shadow-sm"
                style={{ clipPath: "polygon(4% 0,96% 0,100% 100%,0 100%)" }}
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ── GLOBAL SCALE ─────────────────────────────────────────── */}
      <section className="relative bg-ink py-24 text-cream md:py-32">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-8 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-tomato">The archive</p>
              <h2 className="font-display mt-5 text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[0.92]">
                People kept showing up.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <p className="font-serif max-w-[36ch] text-lg leading-[1.7] text-cream/75">
                Year after year, cities around the world kept gathering around
                the same simple idea.
              </p>
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <ArchivalWall />
          </div>
        </div>
      </section>

      {/* ── PRESS ────────────────────────────────────────────────── */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container">
          <p className="overline text-tomato">On the record</p>

          {/* One dominant featured quote */}
          <figure className="mt-8 max-w-[26ch]">
            <blockquote className="font-display text-ink font-extrabold leading-[0.98] tracking-[-0.02em] text-[clamp(2.25rem,5.5vw,4.25rem)]">
              The world's largest Bitcoin Pizza Day celebration.
            </blockquote>
            <figcaption className="ui mt-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
              <span className="h-px w-8 bg-ink/40" />
              CoinDesk · 2021
            </figcaption>
          </figure>

          {/* Clean stacked press list — single hierarchy */}
          <div className="mt-20 md:mt-28">
            <div className="flex items-baseline justify-between border-t border-ink/20 pt-5">
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/45">
                Further coverage
              </span>
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/35">
                {String(PRESS.length - 1).padStart(2, "0")} clippings
              </span>
            </div>

            <ul className="divide-y divide-ink/10">
              {PRESS.slice(1).map((p) => (
                <li key={p.outlet}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 py-7 md:py-8"
                  >
                    <span className="font-display col-span-12 text-sm font-extrabold tracking-tight text-ink transition-colors group-hover:text-tomato md:col-span-3">
                      {p.outlet}
                    </span>
                    <p className="font-serif col-span-12 text-base leading-[1.55] text-ink/75 md:col-span-8 md:text-lg">
                      {p.line.replace(/^[“"]|[”"]$/g, "")}
                    </p>
                    <span className="hidden text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tomato md:col-span-1 md:flex md:justify-end">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* ── CLOSE — printed poster ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(var(--tomato))] py-32 text-cream md:py-48">
        {/* L1 — coarse paper tooth: low frequency fibres, multiply for darker grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.38] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='520' height='520'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.011 0.017' numOctaves='2' seed='9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.02  0 0 0 0 0.02  0 0 0 0.95 0'/></filter><rect width='100%' height='100%' filter='url(%23p)'/></svg>")`,
            backgroundSize: "520px 520px",
          }}
        />
        {/* L2 — high-frequency grain bite */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.88  0 0 0 0 0.72  0 0 0 1.25 -0.1'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`,
            backgroundSize: "280px 280px",
          }}
        />
        {/* L3 — warm screen-blend grain highlights, gives sparkle */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='340' height='340'><filter id='h'><feTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.92  0 0 0 0 0.78  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23h)'/></svg>")`,
            backgroundSize: "340px 340px",
          }}
        />
        {/* L4 — pigment pooling: uneven ink dispersion, screenprint-style blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background: `
              radial-gradient(40% 30% at 12% 20%, hsl(0 80% 30% / 0.42), transparent 70%),
              radial-gradient(44% 34% at 88% 76%, hsl(0 80% 26% / 0.46), transparent 72%),
              radial-gradient(32% 24% at 70% 16%, hsl(0 75% 34% / 0.24), transparent 70%),
              radial-gradient(36% 28% at 20% 82%, hsl(0 75% 32% / 0.30), transparent 72%)`,
          }}
        />
        {/* L5 — squeegee lift: warm cream wash where ink thinned */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background: `radial-gradient(60% 45% at 28% 16%, hsl(44 90% 96% / 0.11), transparent 60%), radial-gradient(52% 40% at 80% 86%, hsl(20 90% 88% / 0.07), transparent 60%)`,
          }}
        />
        {/* L6 — squeegee streak: faint vertical misregistration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
          style={{
            backgroundImage: `repeating-linear-gradient(180deg, hsl(0 80% 26% / 0.5) 0px, transparent 1.5px, transparent 7px)`,
          }}
        />
        {/* L7 — paper-edge vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background: `radial-gradient(120% 95% at 50% 50%, transparent 55%, hsl(0 80% 20% / 0.35) 100%)`,
          }}
        />
        {/* L8 — torn-tape edge: hairline checker strip across the top */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] opacity-[0.18]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, hsl(44 80% 92%) 0 8px, hsl(0 0% 8%) 8px 16px)",
          }}
        />

        <div className="container relative">
          <div className="max-w-[64ch]">
            <p className="handwritten mb-10 text-base text-[hsl(44_80%_92%_/0.85)] md:text-lg">
              People kept showing up.
            </p>
            <h2 className="font-display text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold leading-[0.92] tracking-[-0.02em] text-cream">
              If you have ever shown up to something like this, you understand
              it immediately. If you haven't, May 22 is a good place to start.
            </h2>

            <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row">
              <a
                href="/community"
                className="btn-pill bg-cream text-ink hover:bg-butter"
              >
                Find a city →
              </a>
              <a
                href="/get-your-mafia-name"
                className="btn-pill border border-[hsl(44_80%_92%_/0.4)] text-cream hover:border-[hsl(44_80%_92%_/0.7)]"
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
