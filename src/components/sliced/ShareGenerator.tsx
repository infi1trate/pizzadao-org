import { useState } from "react";
import { Share2, Download } from "lucide-react";

const FORMATS = [
  { id: "square", label: "Square", w: 320, h: 320 },
  { id: "story", label: "Story", w: 220, h: 380 },
  { id: "landscape", label: "Landscape", w: 380, h: 220 },
] as const;

const COPY = [
  "I witnessed the world's biggest pizza party.",
  "PizzaDAO fed the planet.",
  "My city joined Pizza Party Sliced 2026.",
];

const ShareGenerator = () => {
  const [format, setFormat] = useState<(typeof FORMATS)[number]["id"]>("square");
  const [copyIdx, setCopyIdx] = useState(0);
  const [city, setCity] = useState("Your City");

  const f = FORMATS.find((x) => x.id === format)!;

  return (
    <section id="share" className="relative bg-ink text-cream">
      <div className="container py-24 md:py-36">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <div className="overline text-butter">§ 09 · Share card</div>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[0.92]">
              Take the planet with you.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-snug text-cream/75">
              Build a card. Post the receipt. Brag responsibly. Square for the
              grid, story for the vertical, landscape for the group chat.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <div className="overline text-cream/55">Format</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FORMATS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormat(opt.id)}
                      className={`btn-pill text-xs ${
                        format === opt.id
                          ? "bg-butter text-ink"
                          : "border border-cream/30 text-cream hover:bg-cream/10"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="overline text-cream/55">Headline</div>
                <div className="mt-3 flex flex-col gap-2">
                  {COPY.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCopyIdx(i)}
                      className={`ui rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        copyIdx === i
                          ? "border-butter bg-butter/10 text-butter"
                          : "border-cream/20 text-cream/85 hover:border-cream/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="overline block text-cream/55" htmlFor="card-city">
                  Your city
                </label>
                <input
                  id="card-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="ui mt-3 w-full rounded-full border border-cream/30 bg-transparent px-5 py-3 text-sm font-medium focus:border-butter focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="btn-pill-lg bg-butter text-ink hover:bg-cream"
                  onClick={() => alert("Card download coming soon — wired to share API on launch.")}
                >
                  <Download className="h-4 w-4" />
                  Download card
                </button>
                <button
                  type="button"
                  className="btn-pill-lg border border-cream/40 text-cream hover:bg-cream hover:text-ink"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Pizza Party Sliced 2026",
                        text: COPY[copyIdx],
                        url: window.location.href,
                      }).catch(() => {});
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Live preview */}
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center justify-center rounded-3xl border border-cream/15 bg-cream/[0.04] p-10">
              <div
                className="relative overflow-hidden rounded-2xl bg-tomato text-cream shadow-[0_30px_80px_-30px_hsl(var(--tomato)/0.7)] transition-all"
                style={{ width: f.w, height: f.h }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(hsl(var(--ink)) 0.8px, transparent 1.2px)",
                    backgroundSize: "8px 8px",
                  }}
                />
                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <div className="ui text-[9px] font-bold uppercase tracking-[0.28em] text-butter">
                      PizzaDAO · Sliced 2026
                    </div>
                    <div className="ui rounded-full border border-cream/50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.22em]">
                      № {(copyIdx + 1).toString().padStart(2, "0")}
                    </div>
                  </div>

                  <div>
                    <div className="font-display text-2xl font-black leading-[0.95] md:text-3xl">
                      {COPY[copyIdx]}
                    </div>
                    <div className="ui mt-3 text-[10px] font-bold uppercase tracking-[0.28em] text-butter">
                      {city} · 2026
                    </div>
                  </div>

                  <div className="ui flex items-end justify-between text-[9px] font-bold uppercase tracking-[0.22em] text-cream/85">
                    <span>460+ cities</span>
                    <span>pizzadao.org</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareGenerator;
