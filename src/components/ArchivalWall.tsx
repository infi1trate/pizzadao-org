import { useEffect, useMemo, useRef, useState } from "react";
import { ARCHIVE, type PizzaPhoto } from "@/lib/pizzadaoPhotos";

type Slot = {
  col: string;
  span: string;
  row: string;
  aspect: string;
  drift?: number;
  tone?: "warm" | "cool" | "mono" | "natural" | "night";
  /** Vertical offset in px - used to break the grid and create overlap. */
  offset?: number;
  /** Stacking order - higher = pulled in front of overlapping neighbors. */
  z?: number;
  /** Subtle rotation in degrees - adds documentary unevenness. */
  tilt?: number;
};

// Curated, cinematic slot composition. Fewer frames, stronger focal
// hierarchy, more breathing room. Big anchors carry weight; a few
// intimate verticals break the rhythm. Offsets are restrained so the
// wall reads as an art-directed archive - never a collage.
const SLOTS: Slot[] = [
  // ── ACT I - Arrival. One cinematic anchor + one intimate vertical.
  { col: "md:col-start-1",  span: "md:col-span-8",  row: "md:row-span-4", aspect: "aspect-[16/10]", drift: 0.05, tone: "warm",    z: 2 },
  { col: "md:col-start-9",  span: "md:col-span-4",  row: "md:row-span-4", aspect: "aspect-[3/4]",   drift: 0.08, tone: "night",   offset: 28, z: 3, tilt: -0.4 },

  // ── ACT II - Faces. Three verticals, evenly weighted, quietly aligned.
  { col: "md:col-start-1",  span: "md:col-span-4",  row: "md:row-span-3", aspect: "aspect-[3/4]",   drift: 0.04, tone: "natural", offset: 36, z: 2 },
  { col: "md:col-start-5",  span: "md:col-span-4",  row: "md:row-span-3", aspect: "aspect-[3/4]",   drift: 0.06, tone: "mono",    offset: -10, z: 3 },
  { col: "md:col-start-9",  span: "md:col-span-4",  row: "md:row-span-3", aspect: "aspect-[3/4]",   drift: 0.05, tone: "warm",    offset: 44, z: 2, tilt: 0.5 },

  // ── ACT III - Cinematic breath. One full-bleed horizon.
  { col: "md:col-start-1",  span: "md:col-span-12", row: "md:row-span-3", aspect: "aspect-[21/9]",  drift: 0.06, tone: "warm",    z: 2 },

  // ── ACT IV - Closing. Tall anchor, wide companion, one quiet detail.
  { col: "md:col-start-1",  span: "md:col-span-5",  row: "md:row-span-4", aspect: "aspect-[4/5]",   drift: 0.04, tone: "night",   offset: 24, z: 3 },
  { col: "md:col-start-6",  span: "md:col-span-7",  row: "md:row-span-3", aspect: "aspect-[16/9]",  drift: 0.07, tone: "natural", z: 2 },
  { col: "md:col-start-6",  span: "md:col-span-4",  row: "md:row-span-2", aspect: "aspect-[4/3]",   drift: 0.03, tone: "cool",    offset: 30, z: 3, tilt: -0.4 },
  { col: "md:col-start-10", span: "md:col-span-3",  row: "md:row-span-2", aspect: "aspect-[3/4]",   drift: 0.06, tone: "mono",    offset: 50, z: 2, tilt: 0.5 },
];

const toneClass = (t?: Slot["tone"]) => {
  switch (t) {
    case "warm":
      return "[filter:saturate(0.90)_contrast(1.08)_sepia(0.10)_brightness(0.96)]";
    case "cool":
      return "[filter:saturate(0.82)_contrast(1.08)_hue-rotate(-8deg)_brightness(0.94)]";
    case "mono":
      return "[filter:grayscale(0.92)_contrast(1.10)_brightness(0.95)]";
    case "night":
      return "[filter:saturate(0.75)_contrast(1.18)_brightness(0.82)_hue-rotate(-4deg)]";
    default:
      return "[filter:saturate(0.94)_contrast(1.06)_brightness(0.97)]";
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
 * cross-fades on top of the outgoing one - never a hard cut.
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
    const t1 = window.setTimeout(() => setFading(true), 30);
    const t2 = window.setTimeout(() => {
      setCurrent(photo);
      setIncoming(null);
      setFading(false);
    }, 1800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [photo, current.src]);

  const filter = toneClass(slot.tone);
  const tilt = slot.tilt ?? 0;

  return (
    <figure
      ref={ref}
      className={`group relative col-span-12 ${slot.col} ${slot.span} ${slot.row}`}
      style={{
        transform: `translateY(${(slot.offset ?? 0) + drift}px) rotate(${tilt}deg)`,
        willChange: "transform",
        zIndex: slot.z ?? 1,
      }}
    >
      <div
        className="relative flex h-full w-full flex-col bg-cream-warm p-2 pb-10 md:p-2.5 md:pb-12"
        style={{
          boxShadow:
            "0 1px 0 hsl(0 0% 0% / 0.10), 0 18px 40px -22px hsl(0 0% 0% / 0.55), 0 32px 80px -40px hsl(0 0% 0% / 0.45)",
        }}
      >
      <div
        className={`relative overflow-hidden bg-ink ${slot.aspect}`}
      >

        <img
          key={current.src}
          src={current.src}
          alt={`${current.city}, ${current.country} - PizzaDAO gathering`}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025] ${filter}`}
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
              transition: "opacity 1600ms ease-in-out",
            }}
          />
        )}
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-overlay"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, transparent 48%, hsl(0 0% 0% / 0.55) 100%)",
          }}
        />
        {/* Subtle warm/cool wash to deepen the documentary tone */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.35]"
          style={{
            background:
              slot.tone === "night"
                ? "linear-gradient(180deg, hsl(220 30% 8% / 0.55), hsl(0 0% 0% / 0.15))"
                : slot.tone === "cool"
                ? "linear-gradient(180deg, hsl(210 30% 12% / 0.30), transparent)"
                : "linear-gradient(180deg, hsl(20 40% 10% / 0.25), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to top, hsl(0 0% 0% / 0.82), transparent)",
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
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-2 px-3 pb-2.5 md:px-4 md:pb-3">
        <span className="handwritten text-ink/80 text-[0.95rem] leading-none md:text-base">
          <span aria-hidden className="mr-1">{current.flag}</span>
          {current.city}
        </span>
        <span className="ui text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/45">
          {current.year}
        </span>
      </figcaption>
      </div>
    </figure>
  );
};

const ArchivalWall = () => {
  // Shuffle the full archive once on mount so every visit cuts the
  // same global ritual differently.
  const initialDeck = useMemo(() => shuffle(ARCHIVE), []);
  const [photos, setPhotos] = useState<PizzaPhoto[]>(() =>
    initialDeck.slice(0, SLOTS.length),
  );

  // Subtle living-archive rotation. Two frames cycle every ~5s,
  // staggered so the wall is always quietly evolving without ever
  // calling attention to itself. Respects prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (ARCHIVE.length <= SLOTS.length) return;

    let lastSlot = -1;
    const swapOne = () => {
      setPhotos((prev) => {
        const visibleSrcs = new Set(prev.map((p) => p.src));
        const pool = ARCHIVE.filter((p) => !visibleSrcs.has(p.src));
        if (!pool.length) return prev;
        const next = pool[Math.floor(Math.random() * pool.length)];
        // Avoid hitting the same slot twice in a row.
        let slotIndex = Math.floor(Math.random() * prev.length);
        if (slotIndex === lastSlot) {
          slotIndex = (slotIndex + 1) % prev.length;
        }
        lastSlot = slotIndex;
        const updated = prev.slice();
        updated[slotIndex] = next;
        return updated;
      });
    };

    const id = window.setInterval(swapOne, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2.5 md:auto-rows-[86px] md:grid-cols-12 md:gap-3.5 lg:auto-rows-[108px]">
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
