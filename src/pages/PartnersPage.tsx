import { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Sponsorship from "@/components/Sponsorship";


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

      {/* Logo wall — quiet, curated cream band */}
      <section className="paper-soft paper-drift relative overflow-hidden bg-cream-warm py-32 md:py-44">
        {/* Faint horizontal texture band — barely-there warmth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[55%] -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--butter) / 0.18), transparent 70%)",
          }}
        />
        <div className="container relative">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <div className="flex items-baseline gap-4">
              <p className="overline text-ink/50">§ B.01 — Selected collaborators</p>
              <span className="handwritten -rotate-[1.5deg] text-ink/55 text-sm md:text-base">
                friends of the kitchen
              </span>
            </div>
            <p className="ui hidden text-[9.5px] font-medium uppercase tracking-[0.24em] text-ink/35 md:block">
              Programme partners, 2020–2025
            </p>
          </div>
          <div className="mt-20 grid grid-cols-2 items-center gap-x-20 gap-y-20 sm:grid-cols-3 md:mt-28 md:grid-cols-5 md:gap-x-24 md:gap-y-24">
            {PARTNERS.slice(0, 5).map((p, i) => (
              <div
                key={p.name}
                className="group flex flex-col items-center justify-center text-center animate-fade-in"
                style={{ animationDelay: `${i * 90}ms`, animationFillMode: "both" }}
              >
                <div className="font-display text-lg font-semibold tracking-[0.01em] text-ink/45 transition-colors duration-700 ease-out group-hover:text-ink md:text-xl">
                  {p.name}
                </div>
                <div className="ui mt-3 text-[9px] font-medium uppercase tracking-[0.26em] text-ink/30 transition-colors duration-700 group-hover:text-ink/55">
                  {p.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* Inquiry — warm close, hospitality cues */}
      <section className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-ink py-32 text-cream md:py-44">
        {/* Warm hospitality wash — soft ember toward the upper-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[720px] w-[720px] rounded-full opacity-[0.16] blur-[140px]"
          style={{ background: "hsl(var(--tomato))" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-0 h-[540px] w-[540px] rounded-full opacity-[0.10] blur-[140px]"
          style={{ background: "hsl(var(--butter))" }}
        />
        {/* Understated tablecloth detail — a single short tape, not a band */}
        <div className="checker-tape-sm absolute left-0 top-0 h-[5px] w-32 opacity-50 md:w-48" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-px bg-cream/10" aria-hidden />

        <div className="container relative">
          <div className="grid grid-cols-12 gap-x-8 gap-y-16 md:gap-x-20">
            <div className="col-span-12 md:col-span-5">
              <p className="overline text-butter">§ B.02 — Inquiry</p>
              <h2 className="font-display mt-7 text-display-2 font-extrabold leading-[0.88] tracking-[-0.025em]">
                Tell us
                <br />
                what
                <br />
                <span className="italic font-serif font-normal text-butter">
                  you're trying
                </span>
                <br />
                <span className="italic font-serif font-normal text-butter">
                  to do.
                </span>
              </h2>
              <p className="font-serif mt-10 max-w-[34ch] text-[15.5px] leading-[1.65] text-cream/70 md:text-base">
                We come back with a brief, a city list, and a number, usually
                within a week. No deck required to start the conversation.
              </p>
              <p className="ui mt-10 text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/40">
                Or email partnerships@pizzadao.org directly
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-7 md:pl-6"
            >
              {submitted ? (
                <div className="col-span-2">
                  <div className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-butter">
                    ● Received
                  </div>
                  <p className="font-display mt-4 text-2xl font-extrabold leading-tight md:text-3xl">
                    Thanks. A partnership lead will be in touch within 5 business days.
                  </p>
                </div>
              ) : (
                <>
                  <div className="col-span-2 md:col-span-1">
                    <label className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/50">
                      Brand
                    </label>
                    <input
                      type="text"
                      required
                      className="ui mt-3 w-full border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-sm text-cream placeholder:text-cream/30 transition-colors focus:border-butter focus:outline-none"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/50">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      className="ui mt-3 w-full border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-sm text-cream placeholder:text-cream/30 transition-colors focus:border-butter focus:outline-none"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/50">
                      Work email
                    </label>
                    <input
                      type="email"
                      required
                      className="ui mt-3 w-full border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-sm text-cream placeholder:text-cream/30 transition-colors focus:border-butter focus:outline-none"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/50">
                      Tell us the brief (1–3 sentences)
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="ui mt-3 w-full border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-sm text-cream placeholder:text-cream/30 transition-colors focus:border-butter focus:outline-none"
                      placeholder="What you're trying to achieve, where, by when."
                    />
                  </div>
                  <div className="relative col-span-2 mt-4 flex flex-col-reverse items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
                    <p className="handwritten -rotate-[1.5deg] text-butter text-sm md:text-base">
                      ↳ let's cook
                    </p>
                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center gap-3 bg-tomato px-8 py-5 text-sm font-semibold tracking-[0.04em] text-cream shadow-[0_18px_44px_-22px_hsl(var(--tomato)/0.7),0_4px_12px_-6px_hsl(0_0%_0%/0.4)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:bg-butter hover:text-ink hover:shadow-[0_28px_60px_-22px_hsl(var(--butter)/0.55),0_6px_16px_-6px_hsl(0_0%_0%/0.5)]"
                    >
                      <span>Request a partnership brief</span>
                      <span aria-hidden className="transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
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
