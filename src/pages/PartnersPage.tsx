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

      {/* Logo wall — butter brand band */}
      <section className="paper-soft paper-drift relative overflow-hidden bg-butter py-28 md:py-36">
        <Parallax intensity={40} className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cream/40 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-tomato/10 blur-3xl" />
        </Parallax>
        <div className="container relative">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="overline text-ink/55">§ B.01 — Selected collaborators</p>
            <p className="ui hidden text-[9.5px] font-medium uppercase tracking-[0.24em] text-ink/40 md:block">
              Programme partners, 2020–2025
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-x-14 gap-y-16 border-t border-ink/15 pt-14 sm:grid-cols-3 lg:grid-cols-6 md:mt-20 md:gap-x-16">
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center justify-center opacity-55 transition-[opacity,transform] duration-700 ease-out hover:-translate-y-[2px] hover:opacity-100 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
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
      <section className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-ink py-28 text-cream md:py-36">
        <div className="absolute inset-x-0 top-0 h-px bg-cream/15" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-px bg-cream/10" aria-hidden />
        <div className="container relative">
          <div className="grid grid-cols-12 gap-x-8 gap-y-14 md:gap-x-16">
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
              <p className="font-serif mt-10 max-w-[34ch] text-[15px] leading-[1.65] text-cream/65 md:text-base">
                We come back with a brief, a city list, and a number, usually
                within a week. No deck required to start the conversation.
              </p>
              <p className="ui mt-8 text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/40">
                Or email partnerships@pizzadao.org directly
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="col-span-12 grid grid-cols-2 gap-5 md:col-span-7 md:pl-4"
            >
              {submitted ? (
                <div className="col-span-2">
                  <div className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-butter">
                    ● Received
                  </div>
                  <p className="font-display mt-3 text-2xl font-extrabold leading-tight md:text-3xl">
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
