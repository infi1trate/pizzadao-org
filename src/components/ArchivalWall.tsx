import { useEffect, useMemo, useRef, useState } from "react";
import { ARCHIVE, type PizzaPhoto } from "@/lib/pizzadaoPhotos";

type Slot = {
  col: string;
  span: string;
  row: string;
  aspect: string;
  drift?: number;
  tone?: "warm" | "cool" | "mono" | "natural";
  offset?: number;
};

// Hand-tuned slots driving the wall's rhythm. Variation comes from
// span, aspect, vertical offset, tone, and parallax. Photos rotate
// over time through this fixed structural skeleton.
const SLOTS: Slot[] = [
  { col: "md:col-start-1",  span: "md:col-span-8", row: "md:row-span-3", aspect: "aspect-[16/10]", drift: 0.05, tone: "natural" },
  { col: "md:col-start-9",  span: "md:col-span-4", row: "md:row-span-2", aspect: "aspect-[3/4]",   drift: 0.09, tone: "warm",    offset: 60 },
  { col: "md:col-start-9",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[5/4]",   drift: 0.03, tone: "mono",    offset: 100 },

  { col: "md:col-start-1",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",   drift: 0.06, tone: "cool",    offset: 110 },
  { col: "md:col-start-4",  span: "md:col-span-5", row: "md:row-span-2", aspect: "aspect-[5/6]",   drift: 0.04, tone: "warm" },
  { col: "md:col-start-9",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/3]",   drift: 0.08, tone: "natural", offset: 40 },

  { col: "md:col-start-1",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[1/1]",   drift: 0.02, tone: "mono",    offset: 80 },
  { col: "md:col-start-9",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",   drift: 0.05, tone: "natural", offset: 30 },

  { col: "md:col-start-2",  span: "md:col-span-10", row: "md:row-span-2", aspect: "aspect-[21/9]", drift: 0.07, tone: "warm" },

  { col: "md:col-start-1",  span: "md:col-span-4", row: "md:row-span-2", aspect: "aspect-[3/4]",   drift: 0.03, tone: "natural", offset: 50 },
  { col: "md:col-start-5",  span: "md:col-span-4", row: "md:row-span-2", aspect: "aspect-[3/4]",   drift: 0.06, tone: "mono",    offset: 20 },
  { col: "md:col-start-9",  span: "md:col-span-4", row: "md:row-span-2", aspect: "aspect-[3/4]",   drift: 0.04, tone: "warm",    offset: 70 },

  { col: "md:col-start-1",  span: "md:col-span-7", row: "md:row-span-1", aspect: "aspect-[2/1]",   drift: 0.05, tone: "cool" },
  { col: "md:col-start-9",  span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[1/1]",   drift: 0.08, tone: "natural", offset: 60 },

  { col: "md:col-start-1",  span: "md:col-span-5", row: "md:row-span-2", aspect: "aspect-[4/5]",   drift: 0.04, tone: "cool",    offset: 30 },
  { col: "md:col-start-6",  span: "md:col-span-7", row: "md:row-span-1", aspect: "aspect-[16/9]",  drift: 0.07, tone: "natural" },
  { col: "md:col-start-6",  span: "md:col-span-4", row: "md:row-span-1", aspect: "aspect-[4/3]",   drift: 0.03, tone: "warm",    offset: 20 },
  { col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",   drift: 0.06, tone: "mono",    offset: 50 },

  { col: "md:col-start-1",  span: "md:col-span-9", row: "md:row-span-2", aspect: "aspect-[21/10]", drift: 0.06, tone: "warm" },
  { col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[1/1]",   drift: 0.04, tone: "mono",    offset: 100 },
  { col: "md:col-start-10", span: "md:col-span-3", row: "md:row-span-1", aspect: "aspect-[3/4]",   drift: 0.05, tone: "natural", offset: 140 },
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

const shuffle = <T,>(arr: T[]): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

interface FrameProps {
  photo: PizzaPhoto;
  slot: Slot;
  index: number;
}

/**
 * A single archival frame. When `photo` changes, the incoming image
 * cross-fades on top of the outgoing one — never a hard cut.
 */
const ArchivalFrame = ({ photo, slot, index }: FrameProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [drift, setDrift] = useState(0);
  const [current, setCurrent] = useState(photo);
  const [incoming, setIncoming] = useState<PizzaPhoto | null>(null);
  const [fading, setFading] = useState(false);

  // Parallax drift on scroll
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

  // Cross-fade when the incoming photo prop changes
  useEffect(() => {
    if (photo.src === current.src) return;
    setIncoming(photo);
    // next frame: trigger opacity transition
    const t1 = window.setTimeout(() => setFading(true), 30);
    // after fade duration, promote incoming to current
    const t2 = window.setTimeout(() => {
      setCurrent(photo);
      setIncoming(null);
      setFading(false);
    }, 1400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [photo, current.src]);

  const filter = toneClass(slot.tone);

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
          key={current.src}
          src={current.src}
          alt={`${current.city}, ${current.country} — PizzaDAO gathering`}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02] ${filter}`}
        />
        {incoming && (
          <img
            key={incoming.src}
            src={incoming.src}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover ${filter}`}
            style={{
              opacity: fading ? 1 : 0,
              transition: "opacity 1200ms ease-in-out",
            }}
          />
        )}
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
              <span aria-hidden className="mr-1.5">{current.flag}</span>
              {current.city}
            </span>
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/70">
              {current.year}
            </span>
          </div>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/55">
              {current.country}
            </span>
            {current.note && (
              <span className="font-serif text-[11px] italic leading-snug text-cream/65 md:text-xs">
                {current.note}
              </span>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  );
};

const ArchivalWall = () => {
  // Shuffle the entire archive once on mount so every visit feels like
  // a different cut of the same global ritual.
  const initialDeck = useMemo(() => shuffle(ARCHIVE), []);
  const [photos, setPhotos] = useState<PizzaPhoto[]>(() =>
    initialDeck.slice(0, SLOTS.length),
  );

  // Subtle living-archive rotation: every ~7s, swap one frame with a
  // photo not currently visible. Respects prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (ARCHIVE.length <= SLOTS.length) return; // nothing left to cycle in

    const id = window.setInterval(() => {
      setPhotos((prev) => {
        const visibleSrcs = new Set(prev.map((p) => p.src));
        const pool = ARCHIVE.filter((p) => !visibleSrcs.has(p.src));
        if (!pool.length) return prev;
        const next = pool[Math.floor(Math.random() * pool.length)];
        const slotIndex = Math.floor(Math.random() * prev.length);
        const updated = prev.slice();
        updated[slotIndex] = next;
        return updated;
      });
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 md:auto-rows-[110px] md:grid-cols-12 md:gap-5 lg:auto-rows-[140px]">
      {SLOTS.map((slot, i) => {
        const photo = photos[i];
        if (!photo) return null;
        return (
          <ArchivalFrame
            key={i}
            slot={slot}
            index={i}
            photo={photo}
          />
        );
      })}
    </div>
  );
};

export default ArchivalWall;
