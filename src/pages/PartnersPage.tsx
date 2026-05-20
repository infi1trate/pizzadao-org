import { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Sponsorship from "@/components/Sponsorship";
import Parallax from "@/components/Parallax";

const PARTNERS = [
  { name: "BASF", role: "Materials" },
  { name: "PRIVY", role: "Identity" },
  { name: "SUPERCHILD", role: "Creative" },
  { name: "MRBEAST", role: "Distribution" },
  { name: "OPTIMISM", role: "Infrastructure" },
  { name: "FARCASTER", role: "Social" },
];


const PartnersPage = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Partners, PizzaDAO";
  }, []);

  return (
    <main className="grain min-h-screen bg-cream text-ink">
      <SiteNav solid />

      <PageHero
        section="§ B, Partnership"
        title="Where brands meet"
        italic="real-world attention."
        accentWord="real-world"
        note="trusted globally · since 2020"
        lede="PizzaDAO builds global, community-driven activations that turn brands into experiences people actually show up for."
        meta={[
          { k: "Cities Activated", v: "500+" },
          { k: "Countries", v: "100+" },
          { k: "Attendees (2025)", v: "20,000+" },
          { k: "Years Running", v: "6" },
        ]}
      />

      {/* Reuse homepage Sponsorship section for value props + CTA */}
      <Sponsorship />

      {/* Case studies consolidated into Sponsorship "What we've built" */}

      {/* Imperfect divider between Sponsorship and logo wall */}
      <div className="bg-cream" aria-hidden>
        <div className="container flex items-center gap-4 py-4">
          <span className="h-px flex-1 bg-ink/15" />
          <span className="checker-tape h-[6px] w-20 opacity-75" />
          <span className="h-px flex-1 bg-ink/15" />
        </div>
      </div>

      {/* Logo wall — butter brand band */}
      <section className="paper-soft paper-drift relative overflow-hidden bg-butter py-20 md:py-24">
        {/* Corner checker tape accents */}
        <div className="checker-tape absolute left-0 top-0 h-[6px] w-28 opacity-80 md:w-40" aria-hidden />
        <div className="checker-tape absolute bottom-0 right-0 h-[6px] w-28 opacity-80 md:w-40" aria-hidden />

        <Parallax intensity={60} className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cream/40 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-tomato/15 blur-3xl" />
        </Parallax>
        <div className="container relative">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/30 pt-6">
            <p className="overline text-ink/60">Selected collaborators</p>
            <span className="handwritten -rotate-[2deg] text-ink/70 text-sm md:text-base">
              IRL &gt; ads ↗
            </span>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-14 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center justify-center opacity-60 grayscale transition-all duration-500 hover:-translate-y-1 hover:opacity-100 hover:grayscale-0 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="bg-ink py-20 text-cream md:py-28">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-5">
              <div className="flex items-baseline gap-3">
                <p className="overline text-butter">Inquiry</p>
                <span className="handwritten -rotate-[1.5deg] text-butter/90 text-[0.78rem] md:text-sm leading-none">
                  community first
                </span>
              </div>
              <h2 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92]">
                Tell us what
                <br />
                <span className="italic font-serif font-normal text-butter">
                  you're trying to do.
                </span>
              </h2>
              <p className="font-serif mt-6 text-base leading-relaxed text-cream/75 md:text-lg">
                We come back with a brief, a city list, and a number, usually
                within a week. No deck required to start the conversation.
              </p>
              <p className="handwritten mt-5 -rotate-1 text-tomato text-sm md:text-base">
                ↘ real world, real people
              </p>
              <p className="ui mt-5 text-[10px] uppercase tracking-[0.18em] text-cream/50">
                Or email partnerships@pizzadao.org directly
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="col-span-12 grid grid-cols-2 gap-4 border border-cream/20 bg-cream/[0.03] p-6 md:col-span-7 md:p-8"
            >
              {submitted ? (
                <div className="col-span-2">
                  <div className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-butter">
                    ● Received
                  </div>
                  <p className="font-display mt-3 text-2xl font-extrabold leading-tight md:text-3xl">
                    Thanks. A partnership lead will be in touch within 5 business days.
                  </p>
                </div>
              ) : (
                <>
                  <div className="col-span-2 md:col-span-1">
                    <label className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                      Brand
                    </label>
                    <input
                      type="text"
                      required
                      className="ui mt-2 w-full border border-cream/30 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-butter focus:outline-none"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      className="ui mt-2 w-full border border-cream/30 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-butter focus:outline-none"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                      Work email
                    </label>
                    <input
                      type="email"
                      required
                      className="ui mt-2 w-full border border-cream/30 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-butter focus:outline-none"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                      Tell us the brief (1–3 sentences)
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="ui mt-2 w-full border border-cream/30 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-butter focus:outline-none"
                      placeholder="What you're trying to achieve, where, by when."
                    />
                  </div>
                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="ui w-full bg-tomato px-5 py-4 text-xs font-semibold tracking-[0.18em] text-cream transition-colors hover:bg-butter hover:text-ink"
                    >
                      Request a partnership brief →
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PartnersPage;
