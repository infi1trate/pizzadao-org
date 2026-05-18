import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import logoDark from "@/assets/logo-dark.svg";

/**
 * /transmission — standalone editorial placeholder.
 * Cream paper, vibrant red, butter accents. Movement identity, not app UI.
 */

const MAFIA_NAMES = [
  "Tony Pepperoni",
  "Don Margherita",
  "Garlic Knuckles",
  "The Mozzarella Kid",
  "Big Cheese Benny",
  "Vinny No Crust",
  "Sal Calabrese",
  "Nina Napoletana",
  "The Sicilian Whisper",
  "Carmine Crustelli",
  "Lou Diavola",
  "Sugo the Silent",
];

const QUOTES = [
  "The party continues.",
  "Still feeding the people.",
  "Open internet, open ovens.",
  "Show up. Share a slice.",
];

const REELS = [
  {
    src: "https://www.dropbox.com/scl/fi/c2zu0k44nsh753zaaseri/Video-Apr-26-2023-1-18-01-AM.mov?rlkey=bqnbkqjqxdm2nze2xeqgdcjnx&raw=1",
    poster: "/media/wen-pizza-nyc-poster.jpg",
    caption: "Wen pizza, New York City",
  },
];

const STILLS = [
  { src: "/media/community-amsterdam.jpg", caption: "Amsterdam" },
  { src: "/media/community-prayagraj-poster.jpg", caption: "Prayagraj" },
  { src: "/media/community-yerevan-poster.jpg", caption: "Yerevan" },
];

const Transmission = () => {
  const [mafiaIdx, setMafiaIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [reelIdx, setReelIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reel = REELS[reelIdx];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [reelIdx]);

  useEffect(() => {
    const t = setInterval(
      () => setMafiaIdx((i) => (i + 1) % MAFIA_NAMES.length),
      2200,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setQuoteIdx((i) => (i + 1) % QUOTES.length),
      6500,
    );
    return () => clearInterval(t);
  }, []);

  const rollName = () => {
    setRevealed(MAFIA_NAMES[Math.floor(Math.random() * MAFIA_NAMES.length)]);
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="relative min-h-[100svh] bg-cream text-ink grain">
      {/* Soft tonal field, never competes with content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60svh] opacity-60"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 0%, hsl(46 100% 62% / 0.25), transparent 60%), radial-gradient(70% 60% at 95% 10%, hsl(0 93% 60% / 0.10), transparent 65%)",
        }}
      />

      {/* Local keyframes — restrained */}
      <style>{`
        @keyframes softFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .soft-fade { animation: softFade 0.9s cubic-bezier(0.2,0.7,0.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .soft-fade, .marquee-track { animation: none !important; }
        }
      `}</style>

      {/* Nav — quiet, editorial */}
      <header className="relative z-20">
        <div className="container flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-3" aria-label="PizzaDAO home">
            <img src={logoDark} alt="PizzaDAO" className="h-6 w-auto md:h-7" />
          </Link>
          <nav className="flex items-center gap-6 md:gap-8">
            <a
              href="https://discord.pizzadao.xyz/"
              target="_blank"
              rel="noreferrer"
              className="ui text-sm text-ink/80 transition-colors hover:text-tomato"
            >
              Discord
            </a>
            <a
              href="https://x.com/pizza_dao"
              target="_blank"
              rel="noreferrer"
              className="ui text-sm text-ink/80 transition-colors hover:text-tomato"
            >
              X
            </a>
          </nav>
        </div>
      </header>

      {/* HERO — editorial, asymmetric */}
      <section className="relative z-10">
        <div className="container grid grid-cols-12 gap-x-6 gap-y-12 pb-20 pt-8 md:gap-y-16 md:pb-28 md:pt-12">
          {/* Headline + supporting column */}
          <div className="col-span-12 md:col-span-8">
            
            <h1 className="font-display mt-6 text-[clamp(3rem,10vw,9rem)] font-black leading-[0.86] tracking-[-0.015em] soft-fade">
              Pizza is
              <br />
              <span className="text-tomato">tech, too.</span>
            </h1>
          </div>

          <div className="col-span-12 md:col-span-4 md:pt-10">
            <p className="text-lg leading-relaxed text-ink/80 md:text-[19px]">
              Global pizza parties. Open internet culture. Creative chaos.
              We&rsquo;re rebuilding PizzaDAO from the oven up.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://discord.pizzadao.xyz/"
                target="_blank"
                rel="noreferrer"
                className="btn-pill-lg group bg-ink text-cream shadow-[0_8px_24px_-12px_hsl(0_0%_4%/0.4)] hover:bg-tomato"
              >
                Join the Discord
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button
                onClick={rollName}
                className="btn-pill-lg group border border-ink/20 bg-transparent text-ink hover:border-tomato hover:text-tomato"
              >
                {revealed ? `You are: ${revealed}` : "Get your mafia name"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>

            <p
              key={mafiaIdx}
              className="ui mt-5 text-[12px] text-ink/55 soft-fade"
            >
              Next on deck:{" "}
              <span className="text-ink/85">{MAFIA_NAMES[mafiaIdx]}</span>
            </p>
          </div>

          {/* Editorial media frame — big, cinematic, no HUD */}
          <figure className="col-span-12">
            <div className="relative overflow-hidden rounded-3xl bg-ink/5">
              <div className="relative aspect-[16/10] md:aspect-[21/9]">
                <video
                  ref={videoRef}
                  key={reel.src}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={reel.src}
                  poster={reel.poster}
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  onEnded={() => setReelIdx((i) => (i + 1) % REELS.length)}
                />
                {/* Soft inner edge, no scanlines, no rec indicators */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
              </div>
            </div>
            <figcaption className="ui mt-4 flex flex-col items-start justify-between gap-1.5 text-[11px] uppercase tracking-[0.22em] text-ink/65 md:flex-row md:items-center">
              <span>Fig. 01, {reel.caption}</span>
              <span className="text-ink/45">500+ cities · 100+ countries · one slice at a time</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Photography strip — humanity */}
      <section className="relative z-10">
        <div className="container py-20 md:py-28">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-4">
              
              <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[0.92] tracking-[-0.01em]">
                A global movement
                <br />
                <span className="text-tomato">built around pizza.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-ink/75">
                From Amsterdam to Prayagraj, Yerevan to New York &mdash;
                PizzaDAO shows up where the people are.
              </p>
            </div>

            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {STILLS.map((s, i) => (
                  <figure
                    key={s.src}
                    className={
                      i === 0
                        ? "col-span-2 row-span-2"
                        : "col-span-1"
                    }
                  >
                    <div className="overflow-hidden rounded-2xl bg-ink/5">
                      <img
                        src={s.src}
                        alt={`PizzaDAO community, ${s.caption}`}
                        loading="lazy"
                        className={`block w-full object-cover transition-transform duration-700 hover:scale-[1.02] ${
                          i === 0 ? "aspect-[4/5]" : "aspect-square"
                        }`}
                      />
                    </div>
                    <figcaption className="ui mt-2 text-[11px] uppercase tracking-[0.22em] text-ink/55">
                      {s.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing — butter band, calm anticipation */}
      <section className="relative z-10 bg-butter text-ink">
        <div className="container grid grid-cols-12 gap-x-6 gap-y-8 py-20 md:py-24">
          <div className="col-span-12 md:col-span-7">
            <p className="overline text-ink/60">§ 04 · What&rsquo;s next</p>
            <h2 className="font-display mt-5 text-[clamp(2.25rem,5vw,4rem)] font-black leading-[0.92] tracking-[-0.01em]">
              The full site is being
              <br />
              cooked.
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/80">
              In the meantime, find us in the Discord. The party continues.
            </p>
          </div>
          <div className="col-span-12 flex items-end md:col-span-5 md:justify-end">
            <a
              href="https://discord.pizzadao.xyz/"
              target="_blank"
              rel="noreferrer"
              className="btn-pill-lg group bg-ink text-cream hover:bg-tomato"
            >
              Step inside
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-ink/10">
        <div className="container flex flex-col items-start justify-between gap-3 py-8 text-ink/60 sm:flex-row sm:items-center">
          <span className="ui text-[11px] uppercase tracking-[0.22em]">
            © {year} PizzaDAO · More soon
          </span>
          <div className="ui flex items-center gap-6 text-[11px] uppercase tracking-[0.22em]">
            <a
              href="https://discord.pizzadao.xyz/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-tomato"
            >
              Discord
            </a>
            <a
              href="https://x.com/pizza_dao"
              target="_blank"
              rel="noreferrer"
              className="hover:text-tomato"
            >
              X
            </a>
            <span>Global Pizza Party</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Transmission;
