import { useState } from "react";
import lead from "@/assets/journal-lead.png";
import j1 from "@/assets/journal-1.jpg";
import jAi from "@/assets/journal-ai-community.png";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SECONDARY = [
  {
    kicker: "Essay",
    title: "Pizza is infrastructure: a love letter to neighborhood economies.",
    author: "M. Calderón",
    meta: "12 min read",
    img: j1,
    href: "#",
  },
  {
    kicker: "Field Notes",
    title: "How PizzaDAO leverages AI: community to code.",
    author: "Enzo Pepperoni",
    meta: "Dispatch · 8 min",
    img: jAi,
    href: "https://pizzadao.org/articles/how-pizzadao-leverages-ai-community-to-code",
  },
];

const PRESS = [
  "The New York Times", "Wired", "Bloomberg", "Vice", "The Verge",
  "Eater", "Bon Appétit", "TechCrunch", "Forbes",
];

const Journal = () => {
  return (
    <section id="journal" className="bg-cream pt-20 md:pt-32">
      {/* Masthead */}
      <div className="container">
        <div className="border-t-2 border-ink pt-8 md:pt-10">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-tomato">§ 09, The Journal</p>
              <h2 className="font-display mt-4 text-display-1 font-extrabold leading-[0.88]">
                A living
                <br />
                <span className="text-ink/70">publication.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-8">
              <p className="text-base leading-relaxed text-ink/75 md:text-lg">
                Field reports, essays, and quiet research from the edges of
                the pizza world. Curated, not constant.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a href="#" className="btn-pill bg-ink text-cream hover:bg-tomato">
                  Read latest issue
                </a>
                <a href="#" className="btn-pill border border-ink text-ink hover:border-tomato hover:text-tomato">
                  Subscribe on Substack
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lead story, editorial cover */}
      <div className="container mt-16 md:mt-24">
        <div className="border-t-2 border-ink pt-6">
          <div className="flex items-center justify-between">
            <p className="overline text-tomato">Cover Story · Vol. V</p>
            <span className="ui text-[10px] uppercase tracking-[0.18em] text-ink/45">
              The lead
            </span>
          </div>
        </div>

        <article className="mt-8 md:mt-10">
          <a
            href="https://brandonwtf.substack.com/p/the-room-about-nothing"
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <figure className="grain relative overflow-hidden rounded-2xl">
              <img
                src={lead}
                alt="Pizza party gathering, lit warmly, strangers becoming neighbors"
                loading="lazy"
                width={1920}
                height={1080}
                className="block aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] md:aspect-[21/9]"
              />
              <span className="ui absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-butter px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
                ● Lead Story
              </span>
              <figcaption className="ui pointer-events-none absolute bottom-4 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-cream/85 mix-blend-difference">
                <span>Fig. 09, Origin Story</span>
                <span>Substack · Brandon Forant</span>
              </figcaption>
            </figure>

            <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-10">
              <div className="col-span-12 md:col-span-8">
                <h3 className="font-display text-[clamp(2.25rem,5.5vw,4.75rem)] font-extrabold leading-[0.92] tracking-[-0.01em] group-hover:text-tomato">
                  The Room about Nothing: how strangers in a Clubhouse drop-in
                  decided to feed the world pizza.
                </h3>
              </div>
              <div className="col-span-12 md:col-span-4 md:pl-6 md:pt-2">
                <p className="text-base leading-relaxed text-ink/75 md:text-lg">
                  On community, purpose, and what happens when an improbable
                  idea, born deep in pandemic isolation, turns into a global
                  network feeding tens of thousands on Bitcoin Pizza Day.
                </p>
                <div className="ui mt-6 flex items-center justify-between border-t border-ink/15 pt-4 text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  <span>By Brandon Forant</span>
                  <span>12 min read</span>
                </div>
              </div>
            </div>
          </a>
        </article>
      </div>

      {/* Two supporting stories */}
      <div className="container mt-20 md:mt-28">
        <div className="border-t-2 border-ink pt-6">
          <p className="overline text-tomato">In this issue</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {SECONDARY.map((s, i) => (
            <a key={s.title} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined} className="group flex flex-col">
              <figure className="grain relative overflow-hidden rounded-2xl">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={1280}
                  height={1080}
                  className="block aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="ui absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
              </figure>
              <p className="overline mt-5 text-tomato">{s.kicker}</p>
              <h4 className="font-display mt-3 text-2xl font-extrabold leading-[1.05] transition-colors group-hover:text-tomato md:text-[1.75rem]">
                {s.title}
              </h4>
              <div className="ui mt-4 flex items-center justify-between border-t border-ink/15 pt-3 text-[10px] uppercase tracking-[0.18em] text-ink/55">
                <span>{s.author}</span>
                <span>{s.meta}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Substack subscribe band */}
      <div className="mt-20 bg-cream pb-20 md:mt-28 md:pb-32">
        <div className="container border-t border-ink/15 pt-16 md:pt-20">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-tomato">The newsletter</p>
              <h3 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92]">
                One issue.
                <br />
                <span className="text-ink/65">Every Sunday.</span>
              </h3>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
                A weekly dispatch, the best new writing, dispatches from
                chapters, and one thing about pizza you didn't know yesterday.
                Free. No tracking.
              </p>
            </div>
            <form
              className="col-span-12 md:col-span-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="journal-email">Email</label>
                <input
                  id="journal-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="ui w-full rounded-full border border-ink bg-cream px-5 py-3.5 text-base text-ink placeholder:text-ink/40 focus:border-tomato focus:outline-none sm:text-sm"
                />
                <button
                  type="submit"
                  className="btn-pill-lg bg-ink text-cream hover:bg-tomato"
                >
                  Subscribe →
                </button>
              </div>
              <p className="ui mt-3 text-[10px] uppercase tracking-[0.18em] text-ink/50">
                Powered by Substack · 12,000+ readers
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journal;
