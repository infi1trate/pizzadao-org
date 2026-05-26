import { Download } from "lucide-react";
import { PARTNERS } from "./data";

const PartnerImpact = () => {
  return (
    <section className="relative bg-cream text-ink">
      <div className="container py-24 md:py-36">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="overline text-tomato">§ 07 · Hosts &amp; partners</div>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[0.92]">
              The people who made the planet eat.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-snug text-ink/70">
              Hosts, volunteers, pizza shops, and partners — each one a load-bearing
              wall under the world&apos;s biggest table.
            </p>
            <a
              href="/partners"
              className="btn-pill mt-8 bg-ink text-cream hover:bg-tomato"
            >
              See the full roster
            </a>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { stat: "214", label: "people fed", note: "by your event alone" },
                { stat: "4m 12s", label: "fastest RSVP sellout", note: "Tokyo, you menace" },
                { stat: "30+", label: "cities activated", note: "by Stand With Crypto" },
                { stat: "1,240", label: "local organizers", note: "on the ground worldwide" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-foreground/15 bg-cream p-6 print-noise"
                >
                  <div className="font-display text-4xl font-black leading-none">{s.stat}</div>
                  <div className="ui mt-2 text-sm font-semibold text-ink/80">{s.label}</div>
                  <div className="ui mt-1 text-[11px] uppercase tracking-[0.22em] text-ink/50">
                    {s.note}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border-2 border-ink bg-ink p-7 text-cream">
              <div className="ui text-[10px] font-bold uppercase tracking-[0.28em] text-butter">
                Partner activations · 2026
              </div>
              <ul className="mt-5 divide-y divide-cream/15">
                {PARTNERS.map((p) => (
                  <li key={p.name} className="flex items-center justify-between py-3">
                    <span className="font-display text-xl font-black">{p.name}</span>
                    <span className="ui text-sm text-cream/75">{p.impact}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#share"
                className="btn-pill mt-6 bg-butter text-ink hover:bg-cream"
              >
                <Download className="h-4 w-4" />
                Download share card
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerImpact;
