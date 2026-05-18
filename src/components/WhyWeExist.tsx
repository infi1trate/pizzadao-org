import hands from "@/assets/hands-pizza.jpg";
import slice from "@/assets/slice.jpg";

const WhyWeExist = () => {
  return (
    <section id="why" className="relative bg-cream py-20 md:py-32">
      <div className="container">
        {/* Section masthead */}
        <div className="grid grid-cols-12 items-end gap-x-6 border-b-2 border-ink pb-6">
          <div className="col-span-12 md:col-span-6">
            <p className="overline text-tomato">§ 01, Why We Exist</p>
            <h2 className="font-display mt-3 text-display-1 font-extrabold leading-[0.9]">
              A movement,
              <br />
              <span className="text-foreground/35">disguised as</span>
              <br />
              a <span className="text-tomato">slice.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="ui text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
              A Manifesto, in three movements
            </p>
            <p className="font-serif mt-4 text-lg leading-relaxed text-foreground/85">
              We did not set out to build an institution. We set out to throw
              a party. Five years later, hundreds of cities, thousands of
              members, a network of independent pizzerias, the party never
              stopped, and the institution arrived on its own.
            </p>
          </div>
        </div>

        {/* Movement I, Pull quote spread */}
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-28">
          <div className="col-span-12 md:col-span-2">
            <div className="font-display text-[7rem] font-black leading-none text-tomato md:text-[9rem]">
              I.
            </div>
            <p className="overline mt-2 text-foreground/60">The Premise</p>
          </div>

          <blockquote className="col-span-12 md:col-span-10">
            <p className="font-display text-display-1 font-extrabold leading-[0.92]">
              “Pizza is the most
              <span className="text-tomato"> democratic </span>
              food on Earth.
              <br />
              <span className="text-foreground/40">
                We just made it organized.”
              </span>
            </p>
            <footer className="ui mt-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-foreground/60">
              <span className="h-px w-10 bg-foreground/40" />
              A Founding Member · PizzaDAO
            </footer>
          </blockquote>
        </div>

        {/* Movement II, Photo + manifesto column */}
        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-32">
          <figure className="col-span-12 md:col-span-7">
            <img
              src={hands}
              alt="Hands of many people from above reaching toward a shared pizza on a wooden table"
              className="aspect-[4/5] w-full object-cover md:aspect-[5/6]"
              loading="lazy"
              width={1080}
              height={1350}
            />
            <figcaption className="ui mt-3 text-[11px] uppercase tracking-[0.22em] text-foreground/60">
              Fig. 02, A round table. A round pie. A round of strangers.
            </figcaption>
          </figure>

          <div className="col-span-12 md:col-span-5 md:pl-8 md:pt-6">
            <div className="font-display text-[7rem] font-black leading-none text-tomato md:text-[9rem]">
              II.
            </div>
            <p className="overline mt-2 text-foreground/60">The Practice</p>

            <p className="font-display mt-8 text-headline font-extrabold leading-[1.02]">
              We show up. We feed people. We leave the place louder than we
              found it.
            </p>
            <p className="font-serif mt-6 text-base leading-relaxed text-foreground/80">
              From Lagos to Lima, from Brooklyn to Bangkok, every dollar
              routes through neighborhood pizzerias. Every party is open to
              the public. Every slice is free. The only ticket is showing up.
            </p>

            <ul className="ui mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {[
                ["Open", "Anyone can throw a party."],
                ["Local", "Funds route through neighborhood pizzerias."],
                ["Loud", "Art, humor, and culture as civic glue."],
              ].map(([k, v]) => (
                <li key={k} className="flex items-baseline justify-between py-3">
                  <span className="font-display text-2xl font-bold tracking-tight text-tomato">
                    {k}
                  </span>
                  <span className="ml-6 max-w-[18rem] text-right text-sm text-foreground/75">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Movement III, Closing manifesto */}
        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-32">
          <div className="col-span-12 md:col-span-5">
            <div className="font-display text-[7rem] font-black leading-none text-tomato md:text-[9rem]">
              III.
            </div>
            <p className="overline mt-2 text-foreground/60">The Promise</p>
            <figure className="mt-8">
              <img
                src={slice}
                alt="A single hot slice of pizza, lit dramatically"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
                width={900}
                height={1125}
              />
            </figure>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-10">
            <p className="font-display text-display-2 font-extrabold leading-[0.96]">
              We are building the
              <span className="text-tomato"> largest, kindest, </span>
              and least serious institution on the internet, and we are
              doing it
              <span className="bg-butter px-2 text-ink"> one slice at a time.</span>
            </p>

            <div className="mt-10">
              <p className="font-serif text-base leading-relaxed text-foreground/80 md:text-lg">
                We work with artists, neighborhood operators, and humanitarian
                partners to put pizza where it's needed, celebrations, public
                squares, disaster zones, and quiet Tuesdays alike. A worldwide
                cast of operators who believe a free slice can start a
                friendship, a movement, or a Tuesday worth remembering.
              </p>
            </div>

            <a
              href="#join"
              className="ui mt-10 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold tracking-wider transition-all hover:gap-3 hover:border-tomato hover:text-tomato"
            >
              Join the Pizza Mafia →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeExist;
