import party from "@/assets/party.jpg";

const Impact = () => {
  return (
    <section className="bg-ink py-20 text-cream md:py-32">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="relative col-span-12 overflow-hidden md:col-span-5" data-benny="true">
            <img
              src={party}
              alt="Public pizza party at night with neon lighting"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              width={1200}
              height={900}
            />
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <p className="overline text-butter">§ 02, Global Impact</p>
            <h2 className="font-display mt-4 text-display-1 font-extrabold">
              Global
              <br />
              <span className="text-tomato">Impact.</span>
            </h2>
            <p className="font-serif mt-8 text-lg leading-relaxed text-cream/85">
              From Lagos to Lima, from Brooklyn to Bangkok, PizzaDAO has
              transformed a simple ritual into a global movement of generosity
              and connection. We funnel resources, attention, and hands-on help
              to the people serving their neighborhoods.
            </p>
            <p className="font-serif mt-5 text-base leading-relaxed text-cream/65">
              Along the way, PizzaDAO has supported hundreds of local
              pizzerias, fed tens of thousands of strangers, and built a
              creative network unlike anything else in the world.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-y-8 border-t border-cream/20 pt-8 sm:grid-cols-4">
              {[
                { k: "Cities", v: "420" },
                { k: "Donated", v: "$1m+" },
                { k: "Servings", v: "20k+" },
                { k: "Partners", v: "60+" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="ui text-xs tracking-wider text-cream/60">{s.k}</div>
                  <div className="font-display text-4xl font-extrabold md:text-5xl">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
