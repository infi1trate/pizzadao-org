import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import party from "@/assets/timeline-party.jpg";
import founding from "@/assets/timeline-founding.jpg";


const ROLES = [
  { name: "Chapter leads", note: "Organize their own city, venue, pizza, people, vibe." },
  { name: "Contributors", note: "Step in wherever they see a gap, design, ops, code, comms." },
  { name: "Participants", note: "Show up, share a slice, bring a friend, take part." },
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


      {/* Bitcoin Pizza Day */}
      <section className="bg-cream-warm py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-6">
              <p className="overline text-tomato">§ A.03, May 22</p>
              <h2 className="font-display mt-5 text-display-2 font-extrabold leading-[0.92]">
                Bitcoin Pizza Day
              </h2>
              <div className="font-serif mt-8 max-w-[58ch] space-y-5 text-lg leading-relaxed text-ink/85 md:text-xl">
                <p>
                  Every year on May 22, people in crypto remember the first
                  real-world Bitcoin transaction, two pizzas for 10,000 BTC.
                </p>
                <p>
                  We decided to mark that day by doing the same thing
                  everywhere at once. The first Global Pizza Party was small
                  and loosely organized, a handful of cities and a lot of
                  guesswork. The next year it doubled, then doubled again.
                </p>
                <p>
                  Now it happens across hundreds of cities at the same time.
                  Local organizers coordinate events, order pizza, and bring
                  people together in their own way.
                </p>
                <p className="text-ink">
                  No two cities look the same, that is part of the point.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:pl-8">
              <figure className="relative bg-cream-warm p-3 pb-5 shadow-[0_32px_70px_-30px_hsl(0_0%_0%/0.45),0_6px_18px_-8px_hsl(0_0%_0%/0.18)]">
                <div className="paper-soft">
                  <img
                    src={party}
                    alt="Crowded outdoor pizza street party at dusk"
                    loading="lazy"
                    width={1920}
                    height={1080}
                    className="grain block aspect-[4/5] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-3 px-1">
                  <span className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                    First time meeting in person
                  </span>
                  <span className="ui text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                    Bangkok, 2023
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* How it runs */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-tomato">§ A.04, Structure</p>
              <h2 className="font-display mt-5 text-display-2 font-extrabold leading-[0.92]">
                How it runs
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="font-serif max-w-[58ch] space-y-5 text-lg leading-relaxed text-ink/85 md:text-xl">
                <p>
                  There is no central office. A small group helps coordinate
                  funding and timing, everything else is handled by people
                  on the ground.
                </p>
                <p>
                  Chapter leads organize their cities. Contributors help
                  wherever they see a gap. Most people just show up and take
                  part.
                </p>
                <p className="text-ink">
                  It stays flexible on purpose, the structure is light so it
                  can adapt to different places and cultures.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 border-t border-ink/20 md:grid-cols-3 md:border-t-0">
            {ROLES.map((r, i) => (
              <article
                key={r.name}
                className="border-b border-ink/20 py-6 md:border-b-0 md:border-t md:border-ink/20 md:py-8 md:pr-8 md:[&:not(:first-child)]:pl-8 md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-ink/20"
              >
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-2xl font-extrabold leading-tight md:text-3xl">
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

      {/* What we've done — quiet outcomes ledger */}
      <section className="paper-soft paper-soft-dark relative overflow-hidden bg-ink py-20 text-cream md:py-28">
        <div className="container relative">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-butter">§ A.05, Outcomes</p>
              <h2 className="font-display mt-5 text-display-2 font-extrabold leading-[0.92]">
                What we've done
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pt-4">
              <p className="font-serif text-lg leading-relaxed text-cream/80">
                Over the last few years PizzaDAO has funded and supported
                events across the world.
              </p>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-y-12 border-t border-cream/20 pt-12 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:pt-14">
            {[
              { k: "Cities activated",    v: "420+", t: "2021 → 2025" },
              { k: "Funding distributed", v: "$1M+", t: "to local pizzerias" },
              { k: "Participants",        v: "20K+", t: "May 22, everywhere" },
              { k: "Return rate",         v: "92%",  t: "year over year" },
            ].map((s) => (
              <div key={s.k} className="relative pr-4">
                <div className="font-display text-5xl font-extrabold leading-none md:text-[3.75rem]">
                  {s.v}
                </div>
                <div className="ui mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                  {s.k}
                </div>
                <p className="ui mt-2 text-[10px] uppercase tracking-[0.18em] text-cream/35">
                  {s.t}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-16 max-w-[58ch] border-t border-cream/20 pt-10 md:mt-20">
            <p className="font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              The numbers matter, but only to show that this works at scale.
            </p>
            <p className="font-serif mt-4 text-lg leading-relaxed text-cream md:text-xl">
              The real outcome is simpler, people meet, eat together, and
              come back the next year.
            </p>
          </div>
        </div>
      </section>

      {/* Why pizza — visual pause */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <p className="overline text-tomato">§ A.06, Why pizza</p>
            <h2 className="font-display mt-6 font-extrabold leading-[0.88] tracking-[-0.02em] text-[clamp(2.5rem,8vw,6.5rem)]">
              Pizza is{" "}
              <span className="underline-scribble text-ink">easy</span>{" "}
              to organize around.
            </h2>
            <div className="mt-10 max-w-[58ch] space-y-5 font-serif text-lg leading-relaxed text-ink/80 md:text-xl">
              <p>
                It is familiar, shareable, and doesn't need explanation. You
                can walk into almost any city in the world and figure out how
                to make it happen.
              </p>
              <p className="italic text-ink">
                That makes it a good starting point for something bigger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What this is becoming */}
      <section className="bg-cream-warm py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-tomato">§ A.07, Forward</p>
              <h2 className="font-display mt-5 text-display-2 font-extrabold leading-[0.92]">
                What this is becoming
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:pl-8">
              <div className="font-serif max-w-[58ch] space-y-5 text-lg leading-relaxed text-ink/85 md:text-xl">
                <p>
                  PizzaDAO is turning into a network that can activate in the
                  real world quickly. When a city opts in, something happens
                  there, not a campaign, not a post, an actual gathering.
                </p>
                <p>
                  That has started to attract partners, brands, builders,
                  and communities that want to show up in a way that feels
                  real.
                </p>
                <p className="text-ink">
                  We work with them case by case. The goal is always the
                  same, keep the experience intact and useful for the
                  people attending.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-ink/20 pt-8 md:mt-20">
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
