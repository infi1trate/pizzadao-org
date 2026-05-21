import joinHero from "@/assets/join-hero.jpg";
import { ArrowUpRight } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Pick your Mafia name",
    body: "Every member goes by an alias. Pseudonym, partial truth, gentle inside joke, you choose.",
    bg: "bg-butter text-ink",
  },
  {
    n: "02",
    title: "Join Discord",
    body: "Hundreds of channels, dozens of chapters, one always-on conversation.",
    bg: "bg-cream text-ink",
  },
  {
    n: "03",
    title: "Receive your role",
    body: "A mod assigns your role based on your city, your skills, or just the vibes.",
    bg: "bg-ink text-cream",
  },
  {
    n: "04",
    title: "Start building",
    body: "Throw a party. Help a chapter. Show up. The work is the welcome.",
    bg: "bg-cream text-ink",
  },
];

const Join = () => {
  const handleGetStarted = () => {
    // Intent: trigger onboarding modal (modal implementation pending)
    window.dispatchEvent(new CustomEvent("open-onboarding"));
  };

  return (
    <section id="join" className="relative overflow-hidden bg-tomato text-cream">
      {/* Hero band */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={joinHero}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-tomato/60 via-tomato/85 to-tomato" />
          <div className="absolute inset-0 grain" />
        </div>

        <div className="container relative pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-8">
              <p className="overline text-cream/70">§ 10, The Invitation</p>
              <h2 className="font-display mt-5 text-mega font-extrabold leading-[0.88]">
                Become
                <br />
                Pizza Mafia.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:pl-8">
              <p className="text-xl leading-snug text-cream md:text-2xl">
                Identity, not membership.
              </p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-cream/85">
                Four steps. No fees, no forms, no gatekeeping.
              </p>
              <button
                type="button"
                onClick={handleGetStarted}
                className="btn-pill-lg group mt-8 bg-cream text-ink hover:bg-butter"
              >
                Get started
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Four steps */}
      <div className="relative bg-tomato">
        <div className="container pb-20 md:pb-28">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <article
                key={s.n}
                className={`flex flex-col rounded-2xl p-6 md:p-7 ${s.bg}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-4xl font-extrabold leading-none">
                    {s.n}
                  </span>
                  <span className="ui text-[10px] font-semibold uppercase tracking-[0.18em] opacity-60">
                    Step
                  </span>
                </div>
                <h4 className="font-display mt-6 text-2xl font-extrabold leading-tight md:text-[1.625rem]">
                  {s.title}
                </h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed opacity-85">
                  {s.body}
                </p>
              </article>
            ))}
          </div>

          {/* Closing line */}
          <div className="mt-16 rounded-2xl border border-cream/40 py-12 text-center md:mt-20 md:py-16">
            <p className="font-display text-display-2 font-extrabold leading-[0.96]">
              Pull up a chair.
              <br />
              <span className="text-butter">The pizza's hot.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Closing seal */}
      <div className="border-t border-cream/30 bg-ink py-10 text-cream">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:gap-4 md:text-left">
            <div className="font-display order-1 text-3xl font-extrabold md:order-2">
              <span className="text-tomato">Pizza</span> the{" "}
              <span className="text-butter">Planet.</span>
            </div>
            <div className="ui order-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55 md:order-1">
              PizzaDAO · Est. 2021 · 6 continents
            </div>
            <div className="ui order-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/55">
              One slice at a time.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
