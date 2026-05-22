import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ArchivalWall from "@/components/ArchivalWall";
import { findPhoto } from "@/lib/pizzadaoPhotos";
import timeline2010 from "@/assets/timeline-2010.jpg";
import party from "@/assets/timeline-party.jpg";
import community from "@/assets/community.jpg";
import revealPhoto from "@/assets/timeline-founding.jpg";

// Real PizzaDAO archive photos for the hero scenes — with local fallbacks
// in case the remote CDN is ever unreachable.
const HERO_PHOTO   = findPhoto("Lagos")?.src       ?? party;
const RITUAL_PHOTO = findPhoto("Buenos Aires")?.src ?? timeline2010;

// Contact-strip — three faces of one global night, end of the Ritual section.
const RITUAL_STRIP = [
  { src: findPhoto("Buenos Aires")?.src ?? party,    city: "Buenos Aires", stamp: "22.05 · 23:14" },
  { src: findPhoto("Nairobi")?.src ?? community,     city: "Nairobi",      stamp: "22.05 · 19:02" },
  { src: findPhoto("Detroit")?.src ?? timeline2010,  city: "Detroit",      stamp: "22.05 · 21:47" },
  { src: findPhoto("Bangkok")?.src ?? party,         city: "Bangkok",      stamp: "23.05 · 01:30" },
];

const THESIS_PHOTO = findPhoto("Rio de Janeiro")?.src ?? findPhoto("Medellín")?.src ?? community;


// ── Press archive ─────────────────────────────────────────────
// Featured: the VICE documentary. Below: the publications that
// went on the record. Treated as evidence, not marketing.
const VICE_VIDEO_ID = "t_Vaxas1u88";
const VICE_VIDEO_HREF = `https://www.youtube.com/watch?v=${VICE_VIDEO_ID}`;
const VICE_POSTER = `https://img.youtube.com/vi/${VICE_VIDEO_ID}/maxresdefault.jpg`;

type PressEntry = {
  outlet: string;
  headline: string;
  date: string;
  href?: string;
};

const PRESS_ARCHIVE: PressEntry[] = [
  {
    outlet: "Archiv3",
    headline: "PizzaDAO's 4th annual global pizza party was an international celebration of community.",
    date: "2024",
    href: "https://archiv3.xyz/articles/pizzadaos-4th-annual-global-pizza-party-was-an-international-celebration-of-community",
  },
  {
    outlet: "Forbes Japan",
    headline: "ビットコイン・ピザデー、世界中の都市で広がる「分散型」祝祭の現場。",
    date: "2024",
    href: "https://forbesjapan.com/articles/detail/65832",
  },
  {
    outlet: "Wired",
    headline: "On the strange, sincere ritual of celebrating crypto's first transaction with free pizza.",
    date: "2023",
  },
  {
    outlet: "Bloomberg",
    headline: "How a decentralised collective turned Bitcoin Pizza Day into a global gathering.",
    date: "2023",
  },
  {
    outlet: "The New York Times",
    headline: "A pizza, a transaction, and an internet community that refuses to let the moment go.",
    date: "2022",
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
              Clubhouse · The Room About Nothing
            </span>
          </div>

          <div className="grid grid-cols-12 gap-x-8 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <p className="overline text-tomato">How it started</p>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[0.94] tracking-[-0.02em]">
                A Clubhouse room, a holiday, and a hunch.
              </h2>

              {/* Single archival polaroid — the reveal */}
              <figure className="relative mt-14 hidden w-full origin-top -rotate-[1.2deg] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:block">
                <div className="grain relative overflow-hidden bg-cream p-3 pb-10 shadow-[0_14px_36px_-14px_hsl(0_0%_0%/0.38),0_3px_8px_-3px_hsl(0_0%_0%/0.22)]">
                  <div className="aspect-[4/5] overflow-hidden bg-ink">
                    <img
                      src={revealPhoto}
                      alt="Late-night gathering of the first PizzaDAO members, huddled around laptops and pizza"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover [filter:saturate(0.88)_contrast(1.06)_sepia(0.08)]"
                    />
                  </div>
                  <figcaption className="handwritten absolute inset-x-3 bottom-2.5 text-center text-sm leading-tight text-ink/70">
                    The founding · late 2021
                  </figcaption>
                </div>
                {/* paper tape */}
                <span
                  aria-hidden
                  className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-3deg] bg-butter/70 opacity-80 shadow-sm"
                  style={{ clipPath: "polygon(4% 0,96% 0,100% 100%,0 100%)" }}
                />
              </figure>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              {/* Tiny dateline — restrained archival cue */}
              <p className="ui mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                <span aria-hidden className="h-px w-8 bg-ink/30" />
                Filed · Spring 2021
              </p>
              <p className="font-serif text-xl leading-[1.5] text-ink md:text-[1.6rem] md:leading-[1.45]">
                PizzaDAO started in 2021 inside a Clubhouse room called
                <em> The Room About Nothing</em> — strangers behind 8-bit
                avatars, trying to throw a party in cities they'd never been
                to, for people they'd never met.
              </p>
              <div className="font-serif mt-10 max-w-[62ch] space-y-5 text-lg leading-[1.75] text-ink/85">
                <p>
                  It was the second year of the pandemic. Everyone had been
                  inside for too long. Most of us had only ever known each
                  other as voices on a 1am audio call, talking about a
                  fifteen-year-old story: the guy who paid 10,000 BTC for two
                  pizzas, on May 22, 2010.
                </p>
                <p>
                  An admin named Snax kept saying — with absolute, slightly
                  unreasonable certainty — that we should use digital art to
                  buy real pizza for strangers, in every city we could reach.
                  A few weeks later we were actually doing it. Three hundred
                  artists contributed pizza toppings. A Hollywood effects
                  artist helped wire them into ten thousand algorithmically
                  generated NFTs, randomness verified on-chain. On Pi Day
                  2021, reservations opened. Five hours later, half a million
                  dollars had come in. The project — RarePizzas — would
                  eventually raise around $1.3M, all of it pointed at pizza.
                </p>
                <p>
                  Then May 22 came. People walked outside. Strangers
                  introduced themselves. Photos started coming in from Lagos,
                  Seoul, Manila, Brooklyn — pizza boxes on sidewalks, kids
                  dancing in the street, organizers grinning at their phones
                  because the thing they'd been typing about for months had
                  a face now.
                </p>
                <p>
                  We finally met each other in person later that year, at
                  NFTNYC. Most of us had never seen the faces behind the
                  voices we'd been building with for nine months. Someone
                  brought Benny, the mascot. He's been on every table since.
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

      {/* ── POSTER QUOTE — "democratic food" ─────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(var(--tomato))] py-32 text-cream md:py-44">
        {/* paper tooth + grain bite + pigment pooling */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='480'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.012 0.018' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.02  0 0 0 0 0.02  0 0 0 0.95 0'/></filter><rect width='100%' height='100%' filter='url(%23p)'/></svg>")`,
            backgroundSize: "480px 480px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.88  0 0 0 0 0.72  0 0 0 1.2 -0.1'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`,
            backgroundSize: "260px 260px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(42% 32% at 14% 22%, hsl(0 80% 28% / 0.42), transparent 70%), radial-gradient(46% 34% at 86% 78%, hsl(0 80% 24% / 0.46), transparent 72%)",
          }}
        />
        {/* checker tape — top & bottom */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[10px] opacity-[0.85]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, hsl(44 90% 92%) 0 16px, hsl(0 0% 8%) 16px 32px)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[10px] opacity-[0.85]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, hsl(44 90% 92%) 0 16px, hsl(0 0% 8%) 16px 32px)",
          }}
        />
        {/* paper-edge vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(120% 95% at 50% 50%, transparent 55%, hsl(0 80% 18% / 0.35) 100%)",
          }}
        />

        <div className="container relative">
          {/* tiny corner stamp */}
          <div className="mb-10 flex items-baseline justify-between md:mb-14">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/70">
              § 02 — Founding principle
            </span>
            <span className="ui hidden rotate-[1.5deg] border border-cream/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/75 md:inline-block">
              Stamped · 22.05
            </span>
          </div>

          <blockquote className="relative">
            <p
              className="font-display font-extrabold leading-[0.86] tracking-[-0.035em] text-cream text-[clamp(3rem,11vw,10rem)]"
              style={{ textShadow: "0 2px 24px hsl(0 0% 0% / 0.35)" }}
            >
              Pizza is the most{" "}
              <span
                className="italic text-butter"
                style={{ textShadow: "0 2px 18px hsl(0 0% 0% / 0.45)" }}
              >
                democratic
              </span>{" "}
              food on{" "}
              <span className="relative inline-block">
                Earth
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[0.18em] -rotate-[1deg]"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, hsl(44 90% 92% / 0.95) 0 10px, transparent 10px 18px)",
                  }}
                />
              </span>
              .
            </p>
          </blockquote>

          <div className="mt-10 flex items-center justify-between gap-6 md:mt-14">
            <p className="handwritten max-w-[20ch] -rotate-[1.5deg] text-butter text-2xl md:text-3xl">
              (yes, really — try it.)
            </p>
            <span className="ui hidden items-baseline gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/65 md:flex">
              <span className="h-px w-10 bg-cream/40" />
              From the field manual
            </span>
          </div>
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
              { k: "Cities", v: "400+" },
              { k: "Countries", v: "65+" },
              { k: "People fed", v: "20,000+" },
              { k: "Pizzerias", v: "500+" },
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


      {/* ── THESIS — "social infrastructure" ─────────────────────── */}
      <section className="relative overflow-hidden bg-cream py-32 md:py-44">
        {/* warm cream wash + grain — atmosphere, not decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 60% at 20% 30%, hsl(40 90% 70% / 0.20), transparent 70%), radial-gradient(60% 50% at 88% 80%, hsl(14 80% 60% / 0.10), transparent 70%)",
          }}
        />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply" />

        <div className="container relative">
          <div className="mb-10 flex items-baseline justify-between md:mb-14">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
              § 04 — Why it works
            </span>
            <span className="ui hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/35 md:inline">
              Manifesto · plate 04
            </span>
          </div>

          <div className="relative">
            {/* Photo-filled "infrastructure" — image-fragment inside type */}
            <h2 className="font-display font-extrabold leading-[0.84] tracking-[-0.035em] text-ink text-[clamp(3rem,12vw,11rem)]">
              Pizza is{" "}
              <span
                className="italic"
                style={{ color: "hsl(var(--tomato))" }}
              >
                social
              </span>
              <br className="hidden sm:block" />{" "}
              <span
                className="relative inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `url(${THESIS_PHOTO})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                  WebkitTextStroke: "1px hsl(var(--ink) / 0.15)",
                  filter: "saturate(0.95) contrast(1.06)",
                }}
              >
                infrastructure
              </span>
              <span style={{ color: "hsl(var(--ink))" }}>.</span>
            </h2>

            {/* Pinned thumb that ALSO labels the photo word — playful pointer */}
            <figure className="pointer-events-none absolute right-2 -top-6 hidden w-[150px] -rotate-[6deg] md:block lg:right-6 lg:-top-10 lg:w-[180px]">
              <div className="grain relative overflow-hidden bg-cream p-2 pb-7 shadow-[0_14px_30px_-12px_hsl(0_0%_0%/0.4)]">
                <div className="aspect-square overflow-hidden bg-ink">
                  <img
                    src={THESIS_PHOTO}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover [filter:saturate(0.95)_contrast(1.06)_sepia(0.05)]"
                  />
                </div>
                <figcaption className="handwritten absolute inset-x-2 bottom-0.5 text-center text-[11px] text-ink/70">
                  ↓ this word, ↑ this scene
                </figcaption>
              </div>
              <span
                aria-hidden
                className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[3deg] bg-butter/80 shadow-sm"
                style={{ clipPath: "polygon(4% 0,96% 0,100% 100%,0 100%)" }}
              />
            </figure>
          </div>

          {/* Subtitle row + checker accent + handwritten kicker */}
          <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-8 md:mt-16">
            <p className="font-serif col-span-12 max-w-[44ch] text-lg leading-[1.55] text-ink/70 md:col-span-7 md:text-2xl md:leading-[1.4]">
              Familiar, affordable, understood almost anywhere.
            </p>
            <div className="col-span-12 flex items-center gap-4 md:col-span-5 md:justify-end">
              <span
                aria-hidden
                className="h-[10px] w-32 opacity-90"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, hsl(var(--tomato)) 0 12px, hsl(var(--ink)) 12px 24px)",
                }}
              />
              <p className="handwritten -rotate-[2deg] text-tomato text-2xl md:text-3xl">
                a great equalizer.
              </p>
            </div>
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

      {/* ── PRESS — media evidence archive ─────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        />

        <div className="container relative">
          {/* Archive header */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-cream/15 pb-5">
            <p className="overline text-tomato">The record</p>
            <p className="ui text-[10px] font-semibold tracking-[0.28em] text-cream/45">
              § Media archive · 2021—2024
            </p>
          </div>

          {/* Section lede */}
          <div className="mt-10 grid grid-cols-12 gap-x-8 gap-y-6">
            <h2 className="font-display col-span-12 text-[clamp(2rem,4.6vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.015em] text-cream md:col-span-7">
              The year people realised it was real.
            </h2>
            <p className="font-serif col-span-12 max-w-[40ch] text-base leading-[1.65] text-cream/65 md:col-span-4 md:col-start-9 md:text-lg">
              Cameras arrived. Reporters showed up to kitchens at midnight.
              What started as a single transaction kept showing up in the
              record — in print, on tape, on the news.
            </p>
          </div>

          {/* ── FEATURED: VICE documentary ──────────────────────── */}
          <figure className="mt-16 md:mt-20">
            <a
              href={VICE_VIDEO_HREF}
              target="_blank"
              rel="noreferrer"
              className="group block"
              aria-label="Watch the VICE documentary on PizzaDAO"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink">
                <img
                  src={VICE_POSTER}
                  alt="VICE documentary still — PizzaDAO, the global Bitcoin Pizza Day"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.85)_contrast(1.08)] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.015]"
                />
                {/* Letterbox bars — documentary framing */}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[6%] bg-ink" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-ink" />
                {/* Vignette */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 55%, transparent 50%, hsl(0 0% 0% / 0.55) 100%)",
                  }}
                />
                {/* Grain */}
                <div
                  aria-hidden
                  className="grain pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-overlay"
                />
                {/* Play mark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-cream/70 bg-ink/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:border-cream group-hover:bg-tomato/70 md:h-24 md:w-24">
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-cream md:h-8 md:w-8" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                {/* Corner stamps */}
                <div className="absolute left-4 top-4 flex items-center gap-2 md:left-6 md:top-6">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-tomato" />
                  <span className="ui text-[10px] font-semibold tracking-[0.32em] text-cream/85">
                    REC · VICE
                  </span>
                </div>
                <div className="absolute bottom-6 right-4 md:bottom-8 md:right-6">
                  <span className="ui text-[10px] font-semibold tracking-[0.28em] text-cream/75">
                    Documentary · 16:24
                  </span>
                </div>
              </div>
            </a>
            <figcaption className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <span className="font-display text-lg font-extrabold tracking-tight text-cream md:text-xl">
                VICE — Inside PizzaDAO's global Bitcoin Pizza Day
              </span>
              <span className="ui text-[10px] font-semibold tracking-[0.24em] text-cream/45">
                youtube.com/watch ↗
              </span>
            </figcaption>
          </figure>

          {/* ── PULL QUOTE ──────────────────────────────────────── */}
          <figure className="mt-24 grid grid-cols-12 gap-x-8 md:mt-32">
            <div aria-hidden className="col-span-12 mb-6 h-px bg-cream/15 md:col-span-12" />
            <blockquote className="font-display col-span-12 text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-cream md:col-span-10">
              <span className="text-tomato">“</span>An international celebration of community.<span className="text-tomato">”</span>
            </blockquote>
            <figcaption className="ui col-span-12 mt-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.28em] text-cream/55">
              <span className="h-px w-8 bg-cream/35" />
              Archiv3 · 2024
            </figcaption>
          </figure>

          {/* ── ARTICLE STRIPS ──────────────────────────────────── */}
          <div className="mt-24 md:mt-32">
            <div className="flex items-baseline justify-between border-t border-cream/20 pt-5">
              <span className="ui text-[10px] font-semibold tracking-[0.28em] text-cream/55">
                Filed coverage
              </span>
              <span className="ui text-[10px] font-semibold tracking-[0.28em] text-cream/35">
                {String(PRESS_ARCHIVE.length).padStart(2, "0")} entries
              </span>
            </div>

            <ul className="divide-y divide-cream/10">
              {PRESS_ARCHIVE.map((p, i) => {
                const Tag = p.href ? "a" : "div";
                const interactive = !!p.href;
                return (
                  <li key={p.outlet}>
                    <Tag
                      {...(p.href
                        ? { href: p.href, target: "_blank", rel: "noreferrer" }
                        : {})}
                      className={`grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-7 md:py-9 ${
                        interactive ? "group" : ""
                      }`}
                    >
                      <span className="ui col-span-2 text-[10px] font-semibold tracking-[0.28em] text-cream/35 md:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display col-span-10 text-base font-extrabold tracking-tight text-cream transition-colors group-hover:text-tomato md:col-span-3 md:text-lg">
                        {p.outlet}
                      </span>
                      <p className="font-serif col-span-12 text-base leading-[1.55] text-cream/75 md:col-span-6 md:text-lg">
                        {p.headline}
                      </p>
                      <span className="ui col-span-12 flex items-center justify-between text-[10px] font-semibold tracking-[0.24em] text-cream/40 md:col-span-2 md:justify-end md:gap-3">
                        <span>{p.date}</span>
                        {interactive ? (
                          <span className="text-cream/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tomato">
                            ↗
                          </span>
                        ) : (
                          <span className="text-cream/25">on file</span>
                        )}
                      </span>
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>




      {/* ── CLOSE — printed poster ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(var(--tomato))] py-36 text-cream md:py-56">
        {/* Paper tooth — soft, low-frequency fibres */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='520' height='520'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.012 0.018' numOctaves='2' seed='9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.02  0 0 0 0 0.02  0 0 0 0.85 0'/></filter><rect width='100%' height='100%' filter='url(%23p)'/></svg>")`,
            backgroundSize: "520px 520px",
          }}
        />
        {/* Fine ink grain — single restrained layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.9  0 0 0 0 0.74  0 0 0 1.1 -0.05'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`,
            backgroundSize: "300px 300px",
          }}
        />
        {/* Soft paper-edge vignette — gentle, not heavy */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(130% 100% at 50% 50%, transparent 62%, hsl(0 80% 22% / 0.22) 100%)",
          }}
        />

        <div className="container relative">
          <div className="max-w-[64ch]">
            <p className="handwritten mb-10 text-base text-[hsl(44_80%_92%_/0.85)] md:text-lg">
              People kept showing up.
            </p>
            <h2 className="font-display text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-cream">
              If you have ever shown up to something like this, you understand
              it immediately. If you haven't, May 22 is a good place to start.
            </h2>

            <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row">
              <a
                href="/community"
                className="btn-pill bg-cream text-ink hover:bg-butter whitespace-nowrap"
              >
                Find a city →
              </a>
              <a
                href="/get-your-mafia-name"
                className="btn-pill border border-[hsl(44_80%_92%_/0.4)] text-cream hover:border-[hsl(44_80%_92%_/0.7)] whitespace-nowrap"
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
