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

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="paper-soft relative bg-cream pt-10 md:pt-14">
        <div className="container flex items-center justify-between pb-8">
          <p className="overline text-tomato">About PizzaDAO</p>
          <span className="ui hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40 md:inline">
            Est. 2021 · Ongoing
          </span>
        </div>

        <figure className="container">
          <div className="grain relative overflow-hidden rounded-sm bg-ink">
            <img
              src={HERO_PHOTO}
              alt="Volunteers carrying pizza boxes through a crowded street gathering"
              loading="eager"
              decoding="async"
              width={2400}
              height={1500}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = party; }}
              style={{ objectPosition: "50% 38%" }}
              className="block aspect-[4/5] w-full object-cover sm:aspect-[3/2] md:aspect-[16/10] lg:aspect-[2/1]"
            />

            {/* Single deeper gradient — readable type, calm midtones */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(0 0% 0% / 0.32) 0%, hsl(0 0% 0% / 0.10) 32%, hsl(0 0% 0% / 0.15) 55%, hsl(0 0% 0% / 0.72) 100%)",
              }}
            />

            {/* Headline embedded in scene with generous breathing room */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-6 pb-10 sm:px-10 sm:pb-14 md:px-16 md:pb-20 lg:px-24 lg:pb-24">
                <h1
                  className="font-display max-w-[16ch] font-extrabold leading-[0.86] tracking-[-0.025em] text-cream text-[clamp(2.25rem,7vw,6.5rem)]"
                  style={{ textShadow: "0 2px 28px hsl(0 0% 0% / 0.55)" }}
                >
                  An institution built on a{" "}
                  <span className="italic text-butter">slice</span>.
                </h1>
              </div>
            </div>
          </div>
          <figcaption className="ui mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            A chapter, mid-service · one night, many cities
          </figcaption>
        </figure>
      </section>

      {/* ── ORIGIN ───────────────────────────────────────────────── */}
      <section className="bg-cream py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-8 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <p className="overline text-tomato">How it started</p>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[0.95]">
                A Discord server, a holiday, and a hunch.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <p className="font-serif text-xl leading-[1.55] text-ink md:text-2xl">
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
      <section className="relative bg-ink text-cream">
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

          {/* Quiet emotional accent — short, supportive, not informational */}
          <div className="mt-28 flex justify-center md:mt-40">
            <p className="handwritten -rotate-[1.5deg] text-butter text-[clamp(2rem,5vw,3.5rem)] leading-tight">
              Every May 22, a door opens.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT RUNS ──────────────────────────────────────────── */}
      <section className="bg-cream py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-8 gap-y-8">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-tomato">How it runs</p>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[0.95]">
                Lightweight by design.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <div className="font-serif max-w-[58ch] space-y-5 text-lg leading-[1.75] text-ink/80">
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

          <div className="mt-20 grid grid-cols-1 gap-y-10 md:mt-28 md:grid-cols-3 md:gap-x-12 md:gap-y-0">
            {ROLES.map((r) => (
              <article key={r.name}>
                <h3 className="font-display text-2xl font-extrabold leading-tight">
                  {r.name}
                </h3>
                <p className="font-serif mt-3 max-w-[34ch] text-base leading-[1.7] text-ink/70">
                  {r.note}
                </p>
              </article>
            ))}
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
          <div className="grid grid-cols-12 gap-x-8 gap-y-8">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-tomato">On the record</p>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[0.95]">
                Press and coverage.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="font-serif max-w-[54ch] text-lg leading-[1.7] text-ink/75">
                As PizzaDAO grew, journalists, filmmakers, and publishers
                started documenting what was happening.
              </p>
            </div>
          </div>

          <ul className="mt-16 divide-y divide-ink/10 border-t border-ink/15 md:mt-20">
            {PRESS.map((p) => (
              <li key={p.outlet}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-8 md:py-10"
                >
                  <div className="col-span-12 md:col-span-3">
                    <span className="font-display text-sm font-extrabold tracking-tight text-ink transition-colors group-hover:text-tomato">
                      {p.outlet}
                    </span>
                  </div>
                  <p className="font-serif col-span-12 text-lg leading-[1.5] text-ink/80 md:col-span-8 md:text-xl">
                    {p.line.replace(/^[“"]|[”"]$/g, "")}
                  </p>
                  <div className="col-span-12 hidden md:col-span-1 md:flex md:justify-end">
                    <span className="text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tomato">
                      ↗
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CLOSE ────────────────────────────────────────────────── */}
      <section className="relative bg-ink py-28 text-cream md:py-40">
        <div className="container">
          <div className="max-w-[64ch]">
            <p className="handwritten mb-8 text-base text-butter md:text-lg">
              People kept showing up.
            </p>
            <h2 className="font-display text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold leading-[0.92] tracking-[-0.02em] text-cream">
              If you have ever shown up to something like this, you understand it
              immediately. If you haven't, May 22 is a good place to start.
            </h2>

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row">
              <a
                href="/community"
                className="btn-pill bg-cream text-ink hover:bg-butter"
              >
                Find a city →
              </a>
              <a
                href="/get-your-mafia-name"
                className="btn-pill border border-cream/35 text-cream hover:border-cream/70"
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
