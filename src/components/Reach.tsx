import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import citiesData from "@/data/pizzadao-cities.json";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type City = {
  name: string;
  description?: string;
  coords: [number, number];
};

const CITIES = citiesData as City[];

const METRICS = [
  { label: "Cities Activated", value: `${CITIES.length}+`, sub: "across 6 continents" },
  { label: "Dollars Donated", value: "$1M+", sub: "to local pizzerias" },
  { label: "Servings Shared", value: "20K+", sub: "free slices, no strings" },
];

const Reach = () => {
  const [active, setActive] = useState<City | null>(null);

  const featured = useMemo(
    () =>
      CITIES.filter((c) =>
        ["New York", "London", "Berlin", "Lagos", "Tokyo", "Mumbai",
         "São Paulo", "Buenos Aires", "Mexico City", "Sydney",
         "Bangkok", "Istanbul", "Nairobi", "Toronto"].includes(c.name)
      ).slice(0, 14),
    []
  );

  return (
    <section id="reach" className="relative bg-cream pt-20 md:pt-32">
      {/* Soft warmth wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, hsl(var(--butter) / 0.18), transparent 70%)",
        }}
      />

      <div className="container relative">
        <div className="border-t-2 border-ink pt-8 md:pt-10">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-7">
              <p className="overline text-tomato">A global table</p>
              <h2 className="font-display mt-4 text-display-1 font-extrabold leading-[0.88]">
                Where we've
                <br />
                shown up.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-8">
              <p className="text-base leading-relaxed text-ink/75 md:text-lg">
                Each marker is a real city, a real table, and a real chapter
                bringing people together over a slice. {CITIES.length} cities
                and counting.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics ledger, light, breathable */}
        <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-ink/15 bg-cream/70 shadow-[var(--shadow-soft)] backdrop-blur-sm md:mt-16 md:grid-cols-3">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`relative px-6 py-10 md:px-8 md:py-12 ${
                i > 0 ? "border-t border-ink/15 md:border-l md:border-t-0" : ""
              }`}
            >
              <div className="ui text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                {m.label}
              </div>
              <div className="font-display mt-8 text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.88] md:mt-10">
                {m.value}
              </div>
              <div className="mt-5 text-base leading-snug text-ink/65">
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map, bright editorial atlas band */}
      <div className="relative mt-16 md:mt-24">
        {/* Warm yellow wash backdrop */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--butter) / 0.22) 0%, hsl(var(--cream)) 60%, hsl(var(--cream)) 100%)",
          }}
        />
        <div className="container relative py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <p className="overline text-tomato">Atlas</p>
              <h3 className="font-display mt-4 text-display-2 font-extrabold leading-[0.92] text-ink">
                A growing
                <br />
                global table.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-ink/70">
                A live snapshot of the chapter network. Hover a city to meet
                the people behind the slice, or imagine the one near you.
              </p>

              {/* Active city panel, bright card */}
              <div className="mt-8 rounded-2xl border border-ink/15 bg-cream p-6 shadow-[var(--shadow-soft)]">
                {active ? (
                  <div className="fade-up">
                    <div className="overline text-tomato">Selected chapter</div>
                    <div className="font-display mt-2 text-3xl font-extrabold text-ink md:text-4xl">
                      {active.name}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      Local hosts organizing events and meetups as part of the global PizzaDAO network.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="overline text-tomato">Your city next?</div>
                    <div className="font-display mt-2 text-2xl font-extrabold leading-tight text-ink md:text-3xl">
                      Somewhere near you,
                      <br />
                      pizza is already
                      <br />
                      bringing people together.
                    </div>
                    <div className="mt-3 text-sm text-ink/60">
                      Hover a marker to meet a chapter, or start one.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-12 md:col-span-8">
              <figure className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[var(--shadow-lifted)]">
                {/* soft warm tint behind landmasses */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 50% 40%, hsl(var(--butter) / 0.10), transparent 70%)",
                  }}
                />
                <ComposableMap
                  projectionConfig={{ scale: 155 }}
                  width={900}
                  height={460}
                  style={{ width: "100%", height: "auto", display: "block", position: "relative" }}
                >
                  <ZoomableGroup zoom={1} center={[10, 15]} maxZoom={4}>
                    <Geographies geography={GEO_URL}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                              default: {
                                fill: "hsl(44 30% 92%)",
                                stroke: "hsl(0 0% 8% / 0.18)",
                                strokeWidth: 0.5,
                                outline: "none",
                              },
                              hover: { fill: "hsl(46 80% 86%)", outline: "none" },
                              pressed: { fill: "hsl(46 80% 86%)", outline: "none" },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    {CITIES.map((city) => {
                      const isActive = active?.name === city.name;
                      return (
                        <Marker
                          key={`${city.name}-${city.coords[0]}-${city.coords[1]}`}
                          coordinates={city.coords}
                          onMouseEnter={() => setActive(city)}
                          onMouseLeave={() => setActive(null)}
                          onClick={() => setActive(city)}
                          style={{
                            default: { cursor: "pointer" },
                            hover: { cursor: "pointer" },
                            pressed: { cursor: "pointer" },
                          }}
                        >
                          {isActive && (
                            <circle
                              r={10}
                              fill="hsl(0 93% 60%)"
                              fillOpacity={0.18}
                            />
                          )}
                          <circle
                            r={isActive ? 4.2 : 2.6}
                            fill="hsl(0 93% 60%)"
                            fillOpacity={isActive ? 1 : 0.9}
                            stroke="hsl(44 80% 99%)"
                            strokeWidth={0.8}
                            style={{ transition: "r 200ms ease" }}
                          />
                        </Marker>
                      );
                    })}
                  </ZoomableGroup>
                </ComposableMap>

                <figcaption className="ui pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  <span>PizzaDAO Atlas, 2021–present</span>
                  <span>{CITIES.length} cities · live data</span>
                </figcaption>
              </figure>

              {/* City pills, chapter invitations */}
              <ul className="mt-6 flex flex-wrap gap-2">
                {featured.map((c) => {
                  const isActive = active?.name === c.name;
                  return (
                    <li key={c.name}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(c)}
                        onMouseLeave={() => setActive(null)}
                        onClick={() => setActive(c)}
                        className={`ui rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                          isActive
                            ? "border-tomato bg-tomato text-cream"
                            : "border-ink/15 bg-white text-ink/75 hover:border-tomato hover:text-tomato"
                        }`}
                      >
                        {c.name}
                      </button>
                    </li>
                  );
                })}
                <li className="self-center">
                  <span className="ui px-2 text-[11px] uppercase tracking-wider text-ink/45">
                    + {CITIES.length - featured.length} more
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reach;
