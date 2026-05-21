import { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import Sponsorship from "@/components/Sponsorship";
import PartnersGlobe from "@/components/PartnersGlobe";



const PARTNERS = [
  { name: "PayPal", color: "#003087" },
  { name: "Ledger", color: "#000000" },
  { name: "Stand With Crypto", color: "#0052FF" },
  { name: "Brave", color: "#FB542B" },
  { name: "OpenSea", color: "#2081E2" },
  { name: "Base", color: "#0052FF" },
  { name: "Polygon", color: "#8247E5" },
  { name: "ENS", color: "#5298FF" },
];


const PartnersPage = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Partners, PizzaDAO";
  }, []);

  return (
    <main className="grain min-h-screen bg-cream text-ink">
      <SiteNav solid />

      {/* Editorial hero — global cultural initiative */}
      <section className="paper-soft paper-drift relative overflow-hidden bg-cream pt-10 md:pt-14">
        {/* Atmospheric warmth — cream → warm gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(44 70% 96%) 55%, hsl(40 55% 93%) 100%)",
          }}
        />
        {/* Hero ambient glows */}
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute -right-32 -top-32 h-[640px] w-[640px] rounded-full opacity-[0.09] blur-[120px]"
          style={{ background: "hsl(var(--tomato))" }}
        />
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full opacity-[0.10] blur-[140px]"
          style={{ background: "hsl(var(--butter))", animationDelay: "-4s" }}
        />
        {/* Subtle checker corners — top-right + bottom-left only */}
        <div
          aria-hidden
          className="checker-tape pointer-events-none absolute right-0 top-0 h-[5px] w-32 opacity-30 md:w-48"
        />
        <div
          aria-hidden
          className="checker-tape pointer-events-none absolute bottom-0 left-0 h-[5px] w-32 opacity-25 md:w-48"
        />

        <div className="container relative">
          {/* Archival ref */}
          <div className="flex items-center justify-between pb-3">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              GPP archive · vol. 04
            </span>
            <span className="ui flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-tomato" />
              Ongoing, est. 2021
            </span>
          </div>

          <div className="border-t border-ink/40 pt-6 md:pt-8">
            <div className="grid grid-cols-12 items-center gap-x-8 gap-y-6 md:gap-x-12">
              {/* Left: headline mass + lede */}
              <div className="col-span-12 md:col-span-7 animate-fade-in">
                <p className="overline text-tomato">§ B, Partnership</p>
                <h1 className="font-display mt-3 font-extrabold leading-[0.84] tracking-[-0.025em] text-[clamp(3.25rem,9vw,8.5rem)] md:leading-[0.8]">
                  Where brands meet{" "}
                  <span className="relative inline-block">
                    <span
                      className="handwritten inline-block text-tomato-deep"
                      style={{
                        transform: "rotate(-1.5deg)",
                        fontSize: "0.62em",
                        lineHeight: 1,
                        verticalAlign: "0.18em",
                        letterSpacing: "-0.005em",
                      }}
                    >
                      real-world
                    </span>
                  </span>{" "}
                  <span className="text-ink">attention.</span>
                </h1>

                <p className="font-serif mt-5 max-w-[44ch] text-[17.5px] leading-[1.55] text-ink/75 md:text-[19px] md:leading-[1.5]">
                  PizzaDAO builds global, community-driven activations that turn
                  brands into experiences people actually show up for.
                </p>
                <p className="ui mt-3 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                  Trusted globally · since 2020
                </p>
              </div>

              {/* Right: ambient globe */}
              <div className="col-span-12 md:col-span-5 animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "both" }}>
                <PartnersGlobe />
                <p className="ui mt-3 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-ink/40">
                  Fig. i — Active chapters, 6 continents
                </p>
              </div>
            </div>

            {/* Proof strip — editorial footer rail */}
            <div className="relative mt-10 border-t border-ink/15 pt-5 md:mt-12 md:pt-6">
              {/* Asymmetric IRL stamp — offset into the margin */}
              <span
                aria-hidden
                className="handwritten absolute -top-3 right-0 -rotate-[8deg] text-[13px] text-tomato md:right-2"
              >
                ↘ measured IRL
              </span>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 md:gap-x-12">
                {[
                  { k: "Cities", v: "500+" },
                  { k: "Countries", v: "100+" },
                  { k: "Attendees", v: "20,000+" },
                  { k: "Years running", v: "6" },
                ].map((m) => (
                  <div key={m.k} className="flex flex-col gap-1.5">
                    <dd className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.02em] md:text-[2.5rem]">
                      {m.v}
                    </dd>
                    <dt className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-ink/45">
                      {m.k}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="h-4 md:h-6" />
          </div>
        </div>
      </section>



      {/* Reuse homepage Sponsorship section for value props + CTA */}
      <Sponsorship />

      {/* Case studies consolidated into Sponsorship "What we've built" */}

      {/* Logo wall — premium social proof, gallery-like */}
      <section className="paper-soft paper-drift relative overflow-hidden bg-cream py-12 md:py-14">
        {/* Warm grain overlay */}
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.32]" />
        {/* Faint gradient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(44 60% 97%) 40%, hsl(var(--cream)) 100%)",
          }}
        />
        {/* Section seam hairlines — tighter editorial join */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/10" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />

        <div className="container relative">
          {/* Editorial heading — minimal, confident */}
          <div className="relative flex items-baseline justify-between gap-x-6">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold leading-[1] tracking-[-0.02em] text-ink">
              Selected collaborators
            </h2>
            <span
              aria-hidden
              className="ui hidden text-[10px] font-medium uppercase tracking-[0.24em] text-ink/30 md:block"
            >
              Trusted globally
            </span>
            {/* Asymmetric handwritten annotation */}
            <span
              aria-hidden
              className="handwritten absolute -top-5 left-[42%] -rotate-[4deg] text-[12px] text-tomato/80 md:left-[36%]"
            >
              ↘ a partial list
            </span>
          </div>

          {/* Thin editorial rule */}
          <div className="mt-5 h-px bg-ink/10 md:mt-6" />

          {/* Logo grid — gallery spacing, monochrome default */}
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-10 md:grid-cols-4 md:gap-x-12 md:gap-y-10">
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className="group flex items-center justify-center animate-fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
              >
                <span
                  className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-semibold tracking-[-0.01em] text-ink/25 transition-all duration-700 ease-out group-hover:text-[color:var(--brand)] md:text-[clamp(1.2rem,1.8vw,1.65rem)]"
                  style={{ "--brand": p.color } as React.CSSProperties}
                >
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Inquiry — warm close, hospitality cues */}
      <section className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-ink py-16 text-cream md:py-20">
        {/* Atmospheric warm glow — soft ember drift */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "hsl(var(--tomato))" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full opacity-[0.10] blur-[100px]"
          style={{ background: "hsl(var(--butter))" }}
        />
        {/* Soft gradient drift — restrained warmth wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, hsl(var(--tomato) / 0.06) 0%, transparent 55%)",
          }}
        />
        {/* Faint tablecloth texture — single short tape */}
        <div className="checker-tape-sm absolute left-0 top-0 h-[4px] w-24 opacity-35 md:w-40" aria-hidden />
        {/* Soft grain overlay */}
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.12]" />
        {/* Bottom hairline */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-cream/8" aria-hidden />

        <div className="container relative">
          <div className="grid grid-cols-12 gap-x-8 gap-y-8 md:gap-x-14 md:gap-y-0">
            {/* Left: headline + copy, tightly grouped */}
            <div className="col-span-12 md:col-span-5 lg:col-span-5">
              <p className="overline text-butter">§ B.02 — Inquiry</p>
              <h2 className="font-display mt-4 text-display-2 font-extrabold leading-[0.88] tracking-[-0.025em]">
                Tell us
                <br />
                what you're
                <br />
                <span
                  className="handwritten inline-block text-butter"
                  style={{
                    transform: "rotate(-2deg)",
                    fontSize: "0.78em",
                    verticalAlign: "0.1em",
                  }}
                >
                  trying to do.
                </span>
              </h2>
              <p className="font-serif mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-cream/65 md:text-base">
                We come back with a brief, a city list, and a number, usually within a week. No deck required.
              </p>
              <p className="ui mt-5 text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/35">
                Or email partnerships@pizzadao.org directly
              </p>

              {/* Handwritten hospitality phrase */}
              <p className="handwritten mt-5 -rotate-[1.5deg] text-butter/80 text-[14px]">
                ↳ start with an idea
              </p>
            </div>

            {/* Right: form, tighter and aligned */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="col-span-12 grid grid-cols-2 gap-x-5 gap-y-6 md:col-span-7 md:pl-8 lg:pl-12"
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
                    <label className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/45">
                      Brand
                    </label>
                    <input
                      type="text"
                      required
                      className="ui mt-2.5 w-full border-0 border-b border-cream/20 bg-transparent px-0 py-2.5 text-sm text-cream placeholder:text-cream/25 transition-colors focus:border-butter focus:outline-none"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/45">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      className="ui mt-2.5 w-full border-0 border-b border-cream/20 bg-transparent px-0 py-2.5 text-sm text-cream placeholder:text-cream/25 transition-colors focus:border-butter focus:outline-none"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/45">
                      Work email
                    </label>
                    <input
                      type="email"
                      required
                      className="ui mt-2.5 w-full border-0 border-b border-cream/20 bg-transparent px-0 py-2.5 text-sm text-cream placeholder:text-cream/25 transition-colors focus:border-butter focus:outline-none"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/45">
                      Tell us the brief (1–3 sentences)
                    </label>
                    <textarea
                      required
                      rows={3}
                      className="ui mt-2.5 w-full border-0 border-b border-cream/20 bg-transparent px-0 py-2.5 text-sm text-cream placeholder:text-cream/25 transition-colors focus:border-butter focus:outline-none"
                      placeholder="What you're trying to achieve, where, by when."
                    />
                  </div>
                  <div className="relative col-span-2 mt-2 flex flex-col-reverse items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-tomato px-7 py-4 text-sm font-semibold tracking-[0.03em] text-cream shadow-[0_10px_28px_-10px_hsl(var(--tomato)/0.6),0_3px_8px_-4px_hsl(0_0%_0%/0.3)] transition-all duration-500 ease-out hover:-translate-y-[3px] hover:bg-butter hover:text-ink hover:shadow-[0_18px_48px_-14px_hsl(var(--butter)/0.5),0_6px_14px_-6px_hsl(0_0%_0%/0.35)] md:px-9 md:py-5"
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
