import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import hands from "@/assets/hands-pizza.jpg";
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

      <PageHero
        section="§ A, About PizzaDAO"
        title="An institution built on a slice"
        lede="PizzaDAO is a global community that organizes around one simple idea, share pizza with strangers. It began as a small experiment on the internet and turned into something people now show up for in real life."
      />

      <PageHero
        section="§ A, About PizzaDAO"
        title="An institution built on a slice"
        accentWord="slice"
        note="started online, became real"
        lede="PizzaDAO is a global community that organizes around one simple idea, share pizza with strangers. It began as a small experiment on the internet and turned into something people now show up for in real life."
        tapedImage={{
          src: founding,
          alt: "Friends gathered around laptops and pizza, late night",
          caption: "started online, 2021",
        }}
      />

      {/* Checker tape divider — pizzeria nod, used once at the top */}
      <div className="container mt-10 md:mt-14">
        <div className="checker-tape h-2 w-full opacity-80" aria-hidden />
      </div>

      {/* Where it started */}
      <section className="bg-cream pt-20 md:pt-28">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-tomato">§ A.01, Origin</p>
              <h2 className="font-display mt-5 text-display-2 font-extrabold leading-[0.92]">
                Where it started
              </h2>
              <div className="font-serif mt-8 max-w-[58ch] space-y-5 text-lg leading-relaxed text-ink/85 md:text-xl">
                <p>
                  A few of us were talking online during the pandemic about
                  how disconnected everything felt. There were communities
                  everywhere, but most of them stopped at the screen.
                </p>
                <p>
                  We wanted to try something physical. So we started sending
                  pizza to people we had never met, no application, no real
                  structure, just a wallet and a willingness to participate.
                </p>
                <p>
                  It worked better than expected. People didn't just accept
                  the pizza, they shared it, posted it, invited others, and
                  started organizing locally.
                </p>
                <p className="text-ink">
                  That was the moment it became clear this could turn into
                  something larger.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-8 md:pt-20">
              <figure className="taped relative -rotate-[1.4deg] bg-cream-warm p-3 pb-5 shadow-[0_28px_60px_-30px_hsl(0_0%_0%/0.4),0_6px_18px_-8px_hsl(0_0%_0%/0.18)] transition-transform duration-700 hover:rotate-0 md:-ml-6">
                <div className="paper-soft">
                  <img
                    src={founding}
                    alt="Late-night gathering of friends huddled around laptops and pizza"
                    loading="lazy"
                    width={1080}
                    height={1350}
                    className="grain photo-hover block aspect-[4/5] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-3 px-1">
                  <span className="handwritten text-ink/85 text-[0.95rem] leading-tight">
                    late night planning call
                  </span>
                  <span className="ui text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                    2021
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Interlude — quiet field note, breathing room */}
      <aside className="bg-cream py-10 md:py-14" aria-hidden>
        <div className="container">
          <div className="flex items-center gap-6">
            <span className="h-px flex-1 bg-ink/15" />
            <span className="handwritten -rotate-1 text-tomato text-base md:text-lg">
              funded by internet strangers
            </span>
            <span className="checker-tape h-2 w-20 opacity-80" />
          </div>
        </div>
      </aside>

      {/* Mission */}
      <section className="bg-cream pb-20 pt-6 md:pb-28 md:pt-10">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-tomato">Mission</p>
              <h2 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92]">
                Why we exist.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:pl-8">
              <p className="font-serif text-lg leading-relaxed text-ink/85 md:text-xl">
                We turn the most universal meal in the world into a recurring
                excuse for people to show up for each other, across borders,
                across politics, across screens.
              </p>
              <blockquote className="paper-soft paper-drift mt-10 rounded-md border-l-[3px] border-tomato bg-cream-warm/60 py-7 pl-6 pr-5 md:pl-8">
                <p className="font-serif text-xl italic leading-snug text-ink md:text-[1.65rem]">
                  “Pizza is the most democratic food on Earth. We just made it
                  organized.”
                </p>
                <span className="margin-note mt-4 block">— marker in the margin</span>
              </blockquote>
              <p className="font-serif mt-8 text-base leading-relaxed text-ink/70">
                Every dollar we raise funds a local pizzeria, a community party,
                or an artist commissioned to document the work. Nothing leaves
                the network. The flywheel is the point.
              </p>
            </div>
          </div>
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
                <span className="handwritten ml-3 align-middle text-base text-tomato md:text-lg">
                  ↘ our high holiday
                </span>
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
              <div className="relative">
                {/* back layer — a second photo peeking out, like a stack */}
                <div
                  aria-hidden
                  className="absolute -left-3 -top-4 hidden h-[88%] w-[78%] -rotate-[3deg] bg-cream-warm p-2 shadow-[0_18px_40px_-22px_hsl(0_0%_0%/0.35)] md:block"
                >
                  <div className="paper-soft h-full w-full">
                    <img
                      src={founding}
                      alt=""
                      aria-hidden
                      className="grain h-full w-full object-cover opacity-95"
                    />
                  </div>
                </div>

                <figure className="relative rotate-[1.4deg] bg-cream-warm p-3 pb-5 shadow-[0_32px_70px_-30px_hsl(0_0%_0%/0.45),0_6px_18px_-8px_hsl(0_0%_0%/0.18)] transition-transform duration-700 hover:rotate-0 md:ml-10 md:-mr-6">
                  {/* Photo index strip — archival sleeve */}
                  <span className="ui absolute -top-3 left-3 inline-flex items-center gap-1.5 bg-ink px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-cream">
                    <span className="inline-block h-1 w-1 rounded-full bg-tomato" />
                    Fig. A.2 / 087
                  </span>
                  <div className="paper-soft">
                    <img
                      src={party}
                      alt="Crowded outdoor pizza street party at dusk"
                      loading="lazy"
                      width={1920}
                      height={1080}
                      className="grain photo-hover block aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-3 px-1">
                    <span className="handwritten text-ink/85 text-[0.95rem] leading-tight">
                      first time meeting in person
                    </span>
                    <span className="ui text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                      Bangkok, 2023
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interlude — full-bleed stamped band, hits hard */}
      <section className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-ink py-12 text-cream md:py-16">
        <div className="checker-tape-sm absolute inset-x-0 top-0 h-[6px] opacity-60" aria-hidden />
        <div className="checker-tape-sm absolute inset-x-0 bottom-0 h-[6px] opacity-60" aria-hidden />
        <div className="container">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-[clamp(2.25rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.02em]">
              May 22, <span className="text-butter">everywhere</span>.
            </p>
            <div className="flex items-center gap-5">
              <span className="handwritten marker-bleed-butter -rotate-2 text-butter text-base md:text-lg">
                ↘ same day, 420+ cities
              </span>
              <span className="stamp">Annual ritual</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it runs */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-7">
              <div className="flex items-baseline gap-3">
                <p className="overline text-tomato">§ A.04, Structure</p>
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                  · field notes
                </span>
              </div>
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

      {/* What we've done — archival outcomes, not KPIs */}
      <section className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-ink py-20 text-cream md:py-28">
        <div className="checker-tape-sm absolute inset-x-0 top-0 h-[6px] opacity-70" aria-hidden />

        {/* Scattered city ledger — faint marks of where this has happened */}
        <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
          {[
            { c: "Jakarta",    t: "8%",  l: "6%",  r: "-7deg",  s: 0.85 },
            { c: "São Paulo",  t: "14%", l: "78%", r: "4deg",   s: 1.05 },
            { c: "Brooklyn",   t: "24%", l: "42%", r: "-3deg",  s: 0.95 },
            { c: "Nairobi",    t: "32%", l: "12%", r: "6deg",   s: 1 },
            { c: "Lagos",      t: "40%", l: "88%", r: "-5deg",  s: 0.9 },
            { c: "Berlin",     t: "48%", l: "30%", r: "2deg",   s: 1.1 },
            { c: "Buenos Aires", t: "55%", l: "62%", r: "-4deg", s: 0.95 },
            { c: "Bangkok",    t: "62%", l: "8%",  r: "5deg",   s: 1 },
            { c: "Mexico City", t: "68%", l: "82%", r: "-2deg", s: 0.9 },
            { c: "Lisbon",     t: "74%", l: "36%", r: "3deg",   s: 1.05 },
            { c: "Mumbai",     t: "82%", l: "70%", r: "-6deg",  s: 0.95 },
            { c: "Istanbul",   t: "88%", l: "18%", r: "4deg",   s: 1 },
            { c: "Seoul",      t: "20%", l: "92%", r: "-3deg",  s: 0.85 },
            { c: "Cape Town",  t: "92%", l: "52%", r: "5deg",   s: 0.95 },
          ].map((x) => (
            <span
              key={x.c}
              className="font-display absolute text-cream/[0.07] font-extrabold"
              style={{
                top: x.t,
                left: x.l,
                transform: `translate(-50%, -50%) rotate(${x.r}) scale(${x.s})`,
                fontSize: "clamp(1rem, 2.4vw, 1.75rem)",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {x.c}
            </span>
          ))}
        </div>

        <div className="container relative">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-butter">§ A.05, Outcomes</p>
              <h2 className="font-display mt-5 text-display-2 font-extrabold leading-[0.92]">
                What we've done
                <span className="handwritten marker-bleed-butter ml-3 align-middle text-base text-butter md:text-lg">
                  ↘ measured in slices
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pt-4">
              <p className="font-serif text-lg leading-relaxed text-cream/80">
                Over the last few years PizzaDAO has funded and supported
                events across the world.
              </p>
              <p className="handwritten mt-4 -rotate-1 text-butter/90 text-sm md:text-base">
                — entry, year four logbook
              </p>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-y-12 border-t border-cream/20 pt-12 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:pt-14">
            {[
              { k: "Cities activated",     v: "420+", n: "ran out of boxes in 14",  t: "2021 → 2025" },
              { k: "Funding distributed",  v: "$1M+", n: "every dollar back to local",  t: "from internet strangers" },
              { k: "Participants",         v: "20K+", n: "most stayed past midnight", t: "May 22, everywhere" },
              { k: "Return rate",          v: "92%",  n: "came back next year",      t: "and brought a friend" },
            ].map((s) => (
              <div key={s.k} className="relative pr-4">
                <div className="font-display text-5xl font-extrabold leading-none md:text-[3.75rem]">
                  {s.v}
                </div>
                <div className="ui mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                  {s.k}
                </div>
                <p className="handwritten mt-3 -rotate-[1.5deg] text-butter/90 text-[0.92rem] leading-snug">
                  {s.n}
                </p>
                <p className="ui mt-2 text-[10px] uppercase tracking-[0.18em] text-cream/35">
                  {s.t}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-6 border-t border-cream/20 pt-10 md:mt-20">
            <div className="col-span-12 max-w-[58ch] md:col-span-8">
              <p className="font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
                The numbers matter, but only to show that this works at scale.
              </p>
              <p className="font-serif mt-4 text-lg leading-relaxed text-cream md:text-xl">
                The real outcome is simpler, people meet, eat together, and
                come back the next year.
              </p>
            </div>
            <div className="col-span-12 flex flex-col items-start gap-3 md:col-span-4 md:items-end md:text-right">
              <span className="handwritten -rotate-2 text-tomato text-base md:text-lg">
                2am planning call
              </span>
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
                Discord, Apr 14 · 03:12 UTC
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interlude — quiet handwritten transition, deep breath */}
      <aside className="bg-cream py-14 md:py-20" aria-hidden>
        <div className="container">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="handwritten -rotate-[2deg] text-tomato text-2xl md:text-[2rem] leading-tight">
              people kept showing up.
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              field note, year three
            </span>
          </div>
        </div>
      </aside>

      {/* Why pizza — visual pause, oversized statement */}
      <section className="paper-soft paper-drift relative overflow-hidden bg-cream py-28 md:py-40">
        {/* Checker edge details — top-left and bottom-right corners */}
        <div className="checker-tape absolute left-0 top-0 h-2 w-32 opacity-80 md:w-48" aria-hidden />
        <div className="checker-tape absolute bottom-0 right-0 h-2 w-32 opacity-80 md:w-48" aria-hidden />

        {/* Faint floating crumbs / ambient marks */}
        <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
          <span className="absolute left-[8%] top-[18%] text-tomato/15 text-4xl">•</span>
          <span className="absolute left-[88%] top-[24%] text-tomato/10 text-2xl">·</span>
          <span className="absolute left-[14%] top-[72%] text-tomato/15 text-3xl">·</span>
          <span className="absolute left-[82%] top-[78%] text-tomato/15 text-5xl">•</span>
          <span className="absolute left-[50%] top-[8%] text-ink/10 text-xl">·</span>
          <span className="absolute left-[28%] top-[44%] text-ink/[0.06] text-6xl">·</span>
          <span className="absolute left-[70%] top-[58%] text-ink/[0.06] text-7xl">·</span>
        </div>

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="overline text-tomato">§ A.06, Why pizza</p>

            <span className="handwritten mt-6 inline-block -rotate-2 text-tomato text-base md:text-lg">
              ↘ the honest answer
            </span>

            <h2 className="font-display mt-4 font-extrabold leading-[0.86] tracking-[-0.02em] text-[clamp(2.75rem,9.5vw,8rem)]">
              Pizza is{" "}
              <span className="underline-scribble text-ink">easy</span>{" "}
              to organize around.
            </h2>

            <div className="mx-auto mt-12 max-w-[44ch] space-y-5 text-lg leading-relaxed text-ink/80 md:text-xl">
              <p>
                It is familiar, shareable, and doesn't need explanation. You
                can walk into almost any city in the world and figure out how
                to make it happen.
              </p>
              <p className="font-serif italic text-ink">
                That makes it a good starting point for something bigger.
              </p>
            </div>

            <div className="mx-auto mt-12 flex max-w-md items-center gap-4">
              <span className="h-px flex-1 bg-ink/20" />
              <span className="handwritten -rotate-1 text-ink/55 text-sm">
                end of side note
              </span>
              <span className="h-px flex-1 bg-ink/20" />
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
                  className="paper-soft font-display flex aspect-[3/2] items-center justify-center bg-cream-warm px-4 text-center text-base font-extrabold tracking-tight text-ink/75 transition-colors hover:text-tomato md:text-lg"
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
          <div className="checker-tape mb-10 h-[6px] w-24 opacity-80" aria-hidden />
          <div className="flex items-start justify-between gap-6 border-t-2 border-ink pt-8">
            <div>
              <p className="overline text-tomato">Press</p>
              <h2 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92]">
                On the record.
                <span className="handwritten ml-3 align-middle text-base text-tomato md:text-lg">
                  ↘ in their words
                </span>
              </h2>
            </div>
            <span className="stamp stamp-ink mt-2 hidden md:inline-flex">
              GPP archive · 04
            </span>
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

      {/* Soft landing — documentary credits, poster composition */}
      <section className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-tomato py-28 text-cream md:py-36">
        {/* Faint checker pattern hidden in background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage:
              "linear-gradient(45deg, hsl(var(--ink)) 25%, transparent 25%, transparent 75%, hsl(var(--ink)) 75%), linear-gradient(45deg, hsl(var(--ink)) 25%, transparent 25%, transparent 75%, hsl(var(--ink)) 75%)",
            backgroundSize: "44px 44px",
            backgroundPosition: "0 0, 22px 22px",
          }}
        />

        {/* Top + bottom checker tapes */}
        <div className="checker-tape-sm absolute inset-x-0 top-0 h-[6px] opacity-70" aria-hidden />
        <div className="checker-tape-sm absolute inset-x-0 bottom-0 h-[6px] opacity-70" aria-hidden />

        {/* Drifting city names — credits roll */}
        <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
          {[
            { c: "Jakarta",      t: "10%", l: "8%",  r: "-6deg",  s: 1 },
            { c: "São Paulo",    t: "16%", l: "76%", r: "5deg",   s: 1.1 },
            { c: "Brooklyn",     t: "28%", l: "38%", r: "-2deg",  s: 1 },
            { c: "Nairobi",      t: "36%", l: "84%", r: "4deg",   s: 0.95 },
            { c: "Berlin",       t: "44%", l: "12%", r: "-5deg",  s: 1.05 },
            { c: "Bangkok",      t: "56%", l: "64%", r: "3deg",   s: 1 },
            { c: "Mexico City",  t: "64%", l: "20%", r: "-3deg",  s: 1 },
            { c: "Lisbon",       t: "72%", l: "82%", r: "5deg",   s: 0.9 },
            { c: "Istanbul",     t: "82%", l: "30%", r: "-4deg",  s: 1.05 },
            { c: "Cape Town",    t: "90%", l: "70%", r: "2deg",   s: 0.95 },
          ].map((x) => (
            <span
              key={x.c}
              className="font-display absolute text-cream/[0.12] font-extrabold"
              style={{
                top: x.t,
                left: x.l,
                transform: `translate(-50%, -50%) rotate(${x.r}) scale(${x.s})`,
                fontSize: "clamp(0.95rem, 2vw, 1.5rem)",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {x.c}
            </span>
          ))}
        </div>

        <div className="container relative">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-baseline gap-4">
              <p className="overline text-butter">§ A.08, Take part</p>
              <span className="handwritten -rotate-2 text-butter/90 text-sm md:text-base">
                ↘ end of file
              </span>
            </div>

            <h2 className="font-display mt-6 text-display-1 font-extrabold leading-[0.88] tracking-[-0.02em]">
              If you have ever shown up to something like this, you{" "}
              <span className="underline-scribble text-cream">understand</span>{" "}
              it immediately.
            </h2>

            <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12 md:col-span-8">
                <p className="font-serif text-xl leading-relaxed text-cream/90 md:text-2xl">
                  If you haven't, May 22 is a good place to start.
                </p>
                <p className="handwritten marker-bleed-butter mt-6 inline-block -rotate-[1.5deg] text-butter text-lg md:text-xl">
                  see you on May 22 ↗
                </p>
              </div>

              {/* Stamp block — archival closing mark */}
              <div className="col-span-12 flex flex-col items-start gap-3 md:col-span-4 md:items-end md:text-right">
                <span className="stamp" style={{ borderColor: "hsl(var(--butter))", color: "hsl(var(--butter))" }}>
                  Vol. 04 · ongoing
                </span>
                <span className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                  PizzaDAO field archive
                </span>
                <span className="handwritten -rotate-1 text-cream/80 text-sm">
                  thanks for reading.
                </span>
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-3 sm:flex-row md:mt-16">
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

            {/* Hand-drawn closing rule */}
            <div className="mt-14 flex items-center gap-4">
              <span className="h-px flex-1 bg-cream/25" />
              <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/55">
                fin.
              </span>
              <span className="h-px flex-1 bg-cream/25" />
            </div>
          </div>
        </div>
      </section>

      <img
        src={hands}
        alt=""
        aria-hidden
        className="hidden"
      />
      <Footer />
    </main>
  );
};

export default About;
