import { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import Sponsorship from "@/components/Sponsorship";
import PartnersGlobe from "@/components/PartnersGlobe";
import PartnerActivations from "@/components/PartnerActivations";
import RegistrationMarks from "@/components/RegistrationMarks";
import { track } from "@/lib/analytics/posthog";
import { EVT } from "@/lib/analytics/events";


import paypalLogo from "@/assets/partners/paypal.png";
import ledgerLogo from "@/assets/partners/ledger.png";
import standWithCryptoLogo from "@/assets/partners/stand-with-crypto.png";
import braveLogo from "@/assets/partners/brave.png";
import openseaLogo from "@/assets/partners/opensea.png";
import baseLogo from "@/assets/partners/base.png";
import polygonLogo from "@/assets/partners/polygon.png";
import ensLogo from "@/assets/partners/ens.png";


const PARTNERS = [
  { name: "PayPal", color: "#003087", logo: paypalLogo },
  { name: "Ledger", color: "#000000", logo: ledgerLogo },
  { name: "Stand With Crypto", color: "#0052FF", logo: standWithCryptoLogo },
  { name: "Brave", color: "#FB542B", logo: braveLogo },
  { name: "OpenSea", color: "#2081E2", logo: openseaLogo },
  { name: "Base", color: "#0052FF", logo: baseLogo },
  { name: "Polygon", color: "#8247E5", logo: polygonLogo },
  { name: "ENS", color: "#5298FF", logo: ensLogo },
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
      <section className="paper-soft relative overflow-hidden bg-cream pt-10 md:pt-14">
        {/* Atmospheric warmth — cream → warm gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(44 70% 96%) 55%, hsl(40 55% 93%) 100%)",
          }}
        />
        {/* Editorial crop marks — printer's register, art-directed corners */}
        <RegistrationMarks tone="ink" opacity={0.18} inset={22} size={14} folio="§ B.01" />
        {/* Subtle checker corners — brand signature, intentional rhythm */}
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
            <div className="relative mt-7 border-t border-ink/15 pt-4 md:mt-9 md:pt-5">
              {/* Asymmetric IRL stamp — offset into the margin */}
              <span
                aria-hidden
                className="handwritten absolute -top-3 right-0 -rotate-[8deg] text-[13px] text-tomato md:right-2"
              >
                ↘ measured IRL
              </span>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4 md:gap-x-12">
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
          </div>
        </div>
      </section>



      {/* Reuse homepage Sponsorship section for value props + CTA */}
      <Sponsorship />

      {/* Case studies consolidated into Sponsorship "What we've built" */}

      {/* Logo wall — premium social proof, gallery-like */}
      <section className="paper-soft paper-drift relative overflow-hidden bg-cream py-10 md:py-14">
        {/* Soft tonal wash — warm editorial depth (keeps the section reading as paper) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(44 60% 97%) 0%, hsl(var(--cream)) 40%, hsl(44 55% 96%) 100%)",
          }}
        />
        {/* Section seam hairlines — tighter editorial join */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/10" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
        {/* Editorial corner registration — folio in lower right */}
        <RegistrationMarks
          tone="ink"
          opacity={0.14}
          inset={20}
          size={12}
          corners={["tl", "tr", "br"]}
          folio="§ B.02"
        />

        <div className="container relative">
          {/* Editorial heading — minimal, confident */}
          <div className="relative max-w-2xl">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold leading-[1] tracking-[-0.02em] text-ink">
              Selected collaborators
            </h2>
            <p className="font-serif mt-3 text-[15.5px] leading-[1.55] text-ink/60 md:text-[16px]">
              Organizations we've collaborated with across culture, technology, and community.
            </p>
          </div>

          {/* Thin editorial rule */}
          <div className="mt-7 h-px bg-ink/10 md:mt-8" />

          {/* Logo grid — gallery spacing, monochrome default */}
          <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-12 md:mt-12 md:grid-cols-4 md:gap-x-14 md:gap-y-14">
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className="group flex items-center justify-center animate-fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
              >
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-auto max-w-[80%] object-contain opacity-60 grayscale transition duration-700 ease-out [mix-blend-mode:multiply] group-hover:opacity-100 group-hover:grayscale-0 md:h-10"
                />
              </div>
            ))}
          </div>

          {/* Subtle editorial footer mark */}
          <div className="mt-10 flex items-center gap-3 md:mt-12">
            <div className="h-px flex-1 bg-ink/8" />
            <span className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-ink/30">
              Trusted globally
            </span>
            <div className="h-px flex-1 bg-ink/8" />
          </div>
        </div>
      </section>



      {/* Activation gallery — field photography from partner moments */}
      <PartnerActivations />

      {/* Inquiry — warm close, hospitality cues */}
      <section className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-ink py-14 text-cream md:py-16">
        {/* Single directional warm wash — anchored to where the headline sits,
            so the warmth reads as light on a page, not as a floating blob. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 18% 35%, hsl(var(--tomato) / 0.10) 0%, transparent 60%)",
          }}
        />
        {/* Diagonal paper-fold crease — soft, intentional, runs through the gutter */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(112deg, transparent 47%, hsl(var(--cream) / 0.05) 49.5%, transparent 52%)",
          }}
        />
        {/* Brand signature tape — single, deliberate */}
        <div className="checker-tape-sm absolute left-0 top-0 h-[4px] w-24 opacity-35 md:w-40" aria-hidden />
        {/* Editorial registration marks — cream on ink, two corners only */}
        <RegistrationMarks
          tone="cream"
          opacity={0.18}
          inset={20}
          size={12}
          corners={["tr", "bl"]}
          folio="§ B.03"
        />
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
                track(EVT.PARTNERS_CTA_CLICKED, { position: "inquiry_form", action: "submit" });
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
