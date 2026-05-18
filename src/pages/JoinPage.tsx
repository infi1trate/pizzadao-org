import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Join from "@/components/Join";

const STEPS = [
  {
    n: "01",
    k: "Sign up",
    v: "Drop your name, email, and city. Takes 30 seconds. No fees, no tracking, no credit card.",
  },
  {
    n: "02",
    k: "Get pointed",
    v: "We connect you to your nearest chapter and send the next dispatch with what's coming up locally.",
  },
  {
    n: "03",
    k: "Show up",
    v: "Volunteer at a party, host an event, ship a project. Membership compounds with participation.",
  },
];

const FAQ = [
  {
    q: "Is membership free?",
    a: "Yes. PizzaDAO has no membership fee. The work is funded by sponsors, grants, and a treasury managed transparently by the council.",
  },
  {
    q: "What does 'host a city' actually mean?",
    a: "You become the local lead for PizzaDAO in your city, running events, recruiting volunteers, and coordinating with the global calendar. We provide the playbook, funding, and creative.",
  },
  {
    q: "Do I need to know about crypto?",
    a: "No. PizzaDAO is a community organization. Most members are organizers, hospitality professionals, artists, and neighbors. Crypto literacy is welcome but never required.",
  },
  {
    q: "What's expected of me as a member?",
    a: "Nothing mandatory. Show up to one event a year, contribute when you can, and treat the community like an institution worth protecting. That's the whole rulebook.",
  },
];

const JoinPage = () => {
  useEffect(() => {
    document.title = "Join, PizzaDAO";
  }, []);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteNav solid />

      <PageHero
        section="§ C, Membership"
        title="Three ways"
        italic="to belong."
        lede="The Pizza Mafia is a global community of organizers, operators, artists, and neighbors. Membership is free. Participation is the only currency."
        meta={[
          { k: "Members", v: "3,000+" },
          { k: "Chapters", v: "60+" },
          { k: "Cities", v: "420+" },
          { k: "Joining cost", v: "$0" },
        ]}
      />

      {/* How it works */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          <div className="border-t-2 border-ink pt-8">
            <p className="overline text-tomato">How it works</p>
            <h2 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92]">
              From signup
              <br />
              <span className="italic font-serif font-normal text-ink/80">
                to chapter, in three steps.
              </span>
            </h2>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="bg-cream p-6 md:p-8">
                <div className="font-display text-6xl font-extrabold leading-none text-tomato md:text-7xl">
                  {s.n}
                </div>
                <h3 className="font-display mt-5 text-2xl font-extrabold leading-tight md:text-3xl">
                  {s.k}
                </h3>
                <p className="font-serif mt-3 text-base leading-relaxed text-ink/75">
                  {s.v}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reuse homepage Join (paths + form + closing seal) */}
      <Join />

      {/* FAQ */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container">
          <div className="border-t-2 border-ink pt-8">
            <p className="overline text-tomato">Frequently asked</p>
            <h2 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92]">
              The fine print.
            </h2>
          </div>

          <dl className="mt-10 border-t border-ink/20">
            {FAQ.map((item, i) => (
              <div
                key={item.q}
                className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-ink/20 py-7 md:py-9"
              >
                <span className="ui col-span-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-tomato md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="font-display col-span-10 text-2xl font-extrabold leading-tight md:col-span-5 md:text-3xl">
                  {item.q}
                </dt>
                <dd className="font-serif col-span-12 text-base leading-relaxed text-ink/75 md:col-span-6 md:text-lg">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default JoinPage;
