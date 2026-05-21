import { useEffect, useRef, useState } from "react";
import { ARCHIVE, type PizzaPhoto } from "@/lib/pizzadaoPhotos";

type Slot = {
  col: string;   // md col-start
  span: string;  // md col-span
  row: string;   // md row-span
  aspect: string;
  drift?: number;   // parallax intensity (0 = none)
  tone?: "warm" | "cool" | "mono" | "natural";
  offset?: number;  // baseline vertical offset (px)
};

// 22 hand-tuned slots driving the wall's rhythm.
// Variation comes from spans, aspect, vertical offset, and parallax —
// never random rotation. Length must be ≤ ARCHIVE.length.
const SLOTS: Slot[] = [
  { col: "md:col-start-1",  span: "md:col-span-7", row: "md:row-span-2", aspect: "aspect-[4/5]",  drift: 0.06, tone: "natural" },
  { col: "md:col-start-8",  span: "md:col-span-5", row: "md:row-span-1", aspect: "aspect-[4/3]",  drift: 0.02, tone: "warm",    offset: 40 },
  { col: "md:col-start-8",  span: "md:col-span-5", row: "md:row-span-1", aspect: "aspect-[5/4]",  drift: 0.10, tone: "warm" },

  { col: "md:col-start-1",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[3/4]",  drift: 0.04, tone: "cool",    offset: 80 },
  { col: "md:col-start-5",  span: "md:col-span-8", row: "md:row-span-2", aspect: "aspect-[16/9]", drift: 0.08, tone: "natural" },

  { col: "md:col-start-1",  span: "md:col-span-5", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.03, tone: "warm" },
  { col: "md:col-start-6",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",  drift: 0.07, tone: "mono",    offset: 30 },
  { col: "md:col-start-9",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.05, tone: "natural" },

  { col: "md:col-start-1",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[1/1]",  drift: 0.02, tone: "warm",    offset: 60 },
  { col: "md:col-start-4",  span: "md:col-span-6", row: "md:row-span-2", aspect: "aspect-[3/2]",  drift: 0.09, tone: "natural" },
  { col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",  drift: 0.04, tone: "cool",    offset: 20 },

  { col: "md:col-start-1",  span: "md:col-span-6", row: "md:row-span-1", aspect: "aspect-[3/2]",  drift: 0.06, tone: "natural" },
  { col: "md:col-start-7",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.03, tone: "mono",    offset: 50 },
  { col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",  drift: 0.08, tone: "warm" },

  { col: "md:col-start-1",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/3]",  drift: 0.05, tone: "natural", offset: 40 },
  { col: "md:col-start-5",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.07, tone: "warm" },
  { col: "md:col-start-9",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/3]",  drift: 0.04, tone: "cool" },

  { col: "md:col-start-1",  span: "md:col-span-5", row: "md:row-span-1", aspect: "aspect-[3/2]",  drift: 0.06, tone: "natural", offset: 70 },
  { col: "md:col-start-6",  span: "md:col-span-4", row: "md:row-span-2", aspect: "aspect-[3/4]",  drift: 0.03, tone: "warm" },
  { col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[1/1]",  drift: 0.05, tone: "mono",    offset: 30 },

  { col: "md:col-start-1",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[4/5]",  drift: 0.04, tone: "natural" },
  { col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[4/3]",  drift: 0.06, tone: "warm",    offset: 50 },
];

const toneClass = (t?: Slot["tone"]) => {
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

interface FrameProps {
  photo: PizzaPhoto;
  slot: Slot;
  index: number;
}

const ArchivalFrame = ({ photo, slot, index }: FrameProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [drift, setDrift] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!slot.drift) return;
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
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        setDrift(progress * (slot.drift ?? 0) * 80);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slot.drift]);

  if (failed) return null;

  return (
    <figure
      ref={ref}
      className={`group relative col-span-12 ${slot.col} ${slot.span} ${slot.row}`}
      style={{
        transform: `translateY(${(slot.offset ?? 0) + drift}px)`,
        willChange: "transform",
      }}
    >
      <div className={`relative overflow-hidden bg-ink ${slot.aspect}`}>
        <img
          src={photo.src}
          alt={`${photo.city}, ${photo.country} — PizzaDAO gathering`}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02] ${toneClass(slot.tone)}`}
        />
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, transparent 55%, hsl(0 0% 0% / 0.45) 100%)",
          }}
        />
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
              <span aria-hidden className="mr-1.5">{photo.flag}</span>
              {photo.city}
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/70">
              {photo.year}
            </span>
          </div>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/55">
              {photo.country}
            </span>
            {photo.note && (
              <span className="font-serif text-[11px] italic leading-snug text-cream/65 md:text-xs">
                {photo.note}
              </span>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  );
};

const ArchivalWall = () => {
  // Deterministic pairing: slot[i] gets ARCHIVE[i]. The ARCHIVE order is
  // already editorially sequenced (Africa → Americas → Asia) for rhythm.
  const frames = SLOTS.map((slot, i) => ({ slot, photo: ARCHIVE[i] }))
    .filter((f) => Boolean(f.photo));

  return (
    <div className="grid grid-cols-2 gap-3 md:auto-rows-[110px] md:grid-cols-12 md:gap-5 lg:auto-rows-[140px]">
      {frames.map(({ slot, photo }, i) => (
        <ArchivalFrame key={`${photo.city}-${i}`} photo={photo} slot={slot} index={i} />
      ))}
    </div>
  );
};

export default ArchivalWall;
