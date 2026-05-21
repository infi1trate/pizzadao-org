import { useEffect, useRef, useState } from "react";

import party from "@/assets/party.jpg";
import community from "@/assets/community.jpg";
import handsPizza from "@/assets/hands-pizza.jpg";
import heroCrowd from "@/assets/hero-crowd.jpg";
import hackathon from "@/assets/hackathon.jpg";
import wildEvent from "@/assets/wild-event.jpg";
import timelineParty from "@/assets/timeline-party.jpg";
import timelinePresent from "@/assets/timeline-present.jpg";
import timelineFounding from "@/assets/timeline-founding.jpg";
import slice from "@/assets/slice.jpg";
import pizzeria from "@/assets/pizzeria.jpg";
import joinHero from "@/assets/join-hero.jpg";
import journalLead from "@/assets/journal-lead.jpg";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";

type Frame = {
  src: string;
  city: string;
  year: string;
  note?: string;
  /** col-start (1–12) on md+ */
  col: string;
  /** col-span on md+ */
  span: string;
  /** row-span — controls density rhythm */
  row: string;
  /** aspect ratio class */
  aspect: string;
  /** parallax speed (0 = none, 0.04 = subtle) */
  drift?: number;
  /** subtle tone treatment */
  tone?: "warm" | "cool" | "mono" | "natural";
  /** small vertical offset (px) at md+ */
  offset?: number;
};

// A curated, asymmetric wall. Variation comes from spans, aspect ratios,
// vertical offsets, and parallax drift — never from random rotation.
const FRAMES: Frame[] = [
  { src: heroCrowd,        city: "Brooklyn",     year: "2022", note: "Year 02 · block takeover", col: "md:col-start-1",  span: "md:col-span-7", row: "md:row-span-2", aspect: "aspect-[4/5]",  drift: 0.06, tone: "natural" },
  { src: community,        city: "Lagos",        year: "2023", note: "Year 03",                  col: "md:col-start-8",  span: "md:col-span-5", row: "md:row-span-1", aspect: "aspect-[4/3]",  drift: 0.02, tone: "warm",   offset: 40 },
  { src: handsPizza,       city: "Mexico City",  year: "2023",                                    col: "md:col-start-8",  span: "md:col-span-5", row: "md:row-span-1", aspect: "aspect-[5/4]",  drift: 0.10, tone: "warm" },

  { src: party,            city: "Buenos Aires", year: "2022", note: "Crowd, mid-service",        col: "md:col-start-1",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[3/4]",  drift: 0.04, tone: "cool",   offset: 80 },
  { src: wildEvent,        city: "Tokyo",        year: "2024",                                    col: "md:col-start-5",  span: "md:col-span-8", row: "md:row-span-2", aspect: "aspect-[16/9]", drift: 0.08, tone: "natural" },

  { src: pizzeria,         city: "Naples",       year: "2023",                                    col: "md:col-start-1",  span: "md:col-span-5", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.03, tone: "warm" },
  { src: timelineParty,    city: "Berlin",       year: "2022",                                    col: "md:col-start-6",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",  drift: 0.07, tone: "mono",   offset: 30 },
  { src: hackathon,        city: "Lisbon",       year: "2024", note: "Year 04",                   col: "md:col-start-9",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.05, tone: "natural" },

  { src: slice,            city: "Istanbul",     year: "2023",                                    col: "md:col-start-1",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[1/1]",  drift: 0.02, tone: "warm",   offset: 60 },
  { src: timelinePresent,  city: "São Paulo",    year: "2024",                                    col: "md:col-start-4",  span: "md:col-span-6", row: "md:row-span-2", aspect: "aspect-[3/2]",  drift: 0.09, tone: "natural" },
  { src: journal1,         city: "Nairobi",      year: "2023",                                    col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",  drift: 0.04, tone: "cool",   offset: 20 },

  { src: journalLead,      city: "Manila",       year: "2024",                                    col: "md:col-start-1",  span: "md:col-span-6", row: "md:row-span-1", aspect: "aspect-[3/2]",  drift: 0.06, tone: "natural" },
  { src: timelineFounding, city: "Reykjavík",    year: "2022", note: "All night",                 col: "md:col-start-7",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.03, tone: "mono",   offset: 50 },
  { src: joinHero,         city: "Mumbai",       year: "2024",                                    col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",  drift: 0.08, tone: "warm" },

  { src: journal2,         city: "Detroit",      year: "2023",                                    col: "md:col-start-1",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/3]",  drift: 0.05, tone: "natural", offset: 40 },
  { src: journal3,         city: "Bogotá",       year: "2023",                                    col: "md:col-start-5",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.07, tone: "warm" },
  { src: heroCrowd,        city: "Bangkok",      year: "2024", note: "Year 04 · street gathering", col: "md:col-start-9",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/3]",  drift: 0.04, tone: "cool" },
];

const toneClass = (t?: Frame["tone"]) => {
  switch (t) {
    case "warm":
      return "[filter:saturate(0.92)_contrast(1.05)_sepia(0.08)]";
    case "cool":
      return "[filter:saturate(0.85)_contrast(1.05)_hue-rotate(-6deg)]";
    case "mono":
      return "[filter:grayscale(0.85)_contrast(1.05)]";
    default:
      return "[filter:saturate(0.95)_contrast(1.03)]";
  }
};

const ArchivalFrame = ({ frame, index }: { frame: Frame; index: number }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    if (!frame.drift) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // -1 .. 1 as it traverses the viewport
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        setDrift(progress * (frame.drift ?? 0) * 80);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [frame.drift]);

  return (
    <figure
      ref={ref}
      className={`group relative col-span-12 ${frame.col} ${frame.span} ${frame.row}`}
      style={{
        transform: `translateY(${(frame.offset ?? 0) + drift}px)`,
        willChange: "transform",
      }}
    >
      <div className={`relative overflow-hidden bg-ink ${frame.aspect}`}>
        <img
          src={frame.src}
          alt={`${frame.city}, ${frame.year} — PizzaDAO gathering`}
          loading={index < 3 ? "eager" : "lazy"}
          className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02] ${toneClass(frame.tone)}`}
        />
        {/* Archival paper grain over photo */}
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay"
        />
        {/* Soft analog vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, transparent 55%, hsl(0 0% 0% / 0.45) 100%)",
          }}
        />
        {/* Hover gradient + caption */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to top, hsl(0 0% 0% / 0.78), transparent)",
          }}
        />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-display text-base font-extrabold tracking-tight text-cream md:text-lg">
              {frame.city}
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/70">
              {frame.year}
            </span>
          </div>
          {frame.note && (
            <p className="font-serif mt-1 text-[11px] leading-snug text-cream/70 md:text-xs">
              {frame.note}
            </p>
          )}
        </figcaption>
      </div>
    </figure>
  );
};

const ArchivalWall = () => {
  return (
    <div
      className="grid grid-cols-2 gap-3 md:auto-rows-[110px] md:grid-cols-12 md:gap-5 lg:auto-rows-[140px]"
    >
      {FRAMES.map((f, i) => (
        <ArchivalFrame key={`${f.city}-${i}`} frame={f} index={i} />
      ))}
    </div>
  );
};

export default ArchivalWall;
