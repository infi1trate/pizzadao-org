import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import CinematicGlobe from "@/components/CinematicGlobe";

const FloatingBox = ({ left, delay, size = 56, rotate = -8 }: { left: string; delay: string; size?: number; rotate?: number }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute"
    style={{
      left,
      top: "-10%",
      width: size,
      height: size * 0.75,
      transform: `rotate(${rotate}deg)`,
      animation: `slicedDrift 22s linear infinite`,
      animationDelay: delay,
      opacity: 0.55,
    }}
  >
    <div
      className="h-full w-full rounded-[6px] border border-cream/20"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--tomato)) 0%, hsl(var(--tomato-deep)) 100%)",
        boxShadow: "inset 0 -8px 0 hsl(0 0% 0% / 0.25)",
      }}
    >
      <div className="ui mt-1 text-center text-[7px] font-bold uppercase tracking-[0.22em] text-cream/85">
        Pizza
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      {/* Atmospheric backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, hsl(var(--tomato) / 0.22), transparent 60%), radial-gradient(50% 40% at 85% 90%, hsl(220 80% 50% / 0.18), transparent 60%)",
        }}
      />
      {/* Faint stars */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--cream)) 0.6px, transparent 0.9px)",
          backgroundSize: "120px 120px",
          maskImage: "linear-gradient(180deg, #000 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 80%)",
        }}
      />

      {/* Drifting pizza boxes */}
      <FloatingBox left="6%" delay="0s" size={64} rotate={-14} />
      <FloatingBox left="22%" delay="6s" size={48} rotate={9} />
      <FloatingBox left="38%" delay="12s" size={72} rotate={-4} />
      <FloatingBox left="70%" delay="3s" size={52} rotate={11} />
      <FloatingBox left="86%" delay="9s" size={60} rotate={-7} />

      <div className="container relative pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-16">
          <div className="col-span-12 md:col-span-7">
            <div className="overline text-tomato">§ 2026 Recap · Worldwide Edition</div>
            <h1 className="font-display mt-5 text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.86]">
              The world<br />got sliced.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-snug text-cream/85 md:text-xl">
              A worldwide recap of the biggest pizza party on Earth — every city,
              every oven, every parachute tap.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#metrics"
                className="btn-pill-lg group bg-tomato text-cream hover:bg-tomato-deep"
              >
                Explore the recap
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#local"
                className="btn-pill-lg group border border-cream/40 text-cream hover:bg-cream hover:text-ink"
              >
                <MapPin className="h-4 w-4" />
                Find your city
              </a>
              <a
                href="/community#join"
                className="btn-pill-lg group bg-butter text-ink hover:bg-cream"
              >
                Become a host
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="ui mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/55">
              <span>Pizza Party Sliced</span>
              <span className="text-tomato">· 2026 edition</span>
              <span>· 460+ cities</span>
              <span>· 100+ countries</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:pt-4">
            <div className="relative">
              <CinematicGlobe />
              {/* Sticker overlay */}
              <div
                className="absolute -right-2 top-2 -rotate-6 rounded-full border-2 border-butter bg-ink/70 px-3 py-1 backdrop-blur"
                aria-hidden
              >
                <span className="ui text-[10px] font-bold uppercase tracking-[0.22em] text-butter">
                  Live signal · 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slicedDrift {
          0%   { transform: translateY(-20vh) rotate(var(--r, 0deg)); }
          100% { transform: translateY(120vh) rotate(var(--r, 0deg)); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="slicedDrift"] { animation: none !important; opacity: 0.15 !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
