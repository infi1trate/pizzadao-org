import { useState } from "react";
import { X } from "lucide-react";
import { PHOTO_WALL } from "./data";

const toneBg: Record<string, string> = {
  tomato: "bg-tomato",
  butter: "bg-butter",
  ink: "bg-ink",
  cream: "bg-cream",
};
const toneText: Record<string, string> = {
  tomato: "text-cream",
  butter: "text-ink",
  ink: "text-cream",
  cream: "text-ink",
};

const Polaroid = ({
  city,
  tone,
  rotate,
  onOpen,
}: {
  city: string;
  tone: string;
  rotate: number;
  onOpen: () => void;
}) => (
  <button
    type="button"
    onClick={onOpen}
    className="group relative block w-full text-left transition-transform allow-touch-hover hover:-translate-y-1 hover:rotate-0"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {/* Tape */}
    <div
      aria-hidden
      className="absolute -top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 -rotate-3 bg-cream/70"
      style={{ boxShadow: "0 1px 4px hsl(0 0% 0% / 0.15)" }}
    />
    <div className="rounded-sm bg-cream p-2 pb-10 shadow-[0_12px_30px_-12px_hsl(0_0%_0%/0.35)]">
      <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-sm ${toneBg[tone]} ${toneText[tone]}`}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--ink)) 1px, transparent 1.4px)",
            backgroundSize: "8px 8px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl font-black opacity-80">{city.split(" ")[0]}</span>
        </div>
        {/* Corner stamp */}
        <div className="absolute right-2 top-2 rounded-sm border border-current/40 px-1.5 py-0.5">
          <span className="ui text-[8px] font-bold uppercase tracking-[0.22em]">2026</span>
        </div>
      </div>
      <div className="handwritten mt-2 px-1 text-center text-sm text-ink/80">{city}</div>
    </div>
  </button>
);

const PhotoWall = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="relative bg-cream text-ink">
      <div className="container py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="overline text-tomato">§ 06 · The collage wall</div>
          <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] font-black leading-[0.92]">
            Proof, in <span className="underline-scribble">polaroids.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-snug text-ink/70">
            Slightly crooked. Slightly greasy. Entirely real. A wall of moments
            from rooms where strangers became regulars.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {PHOTO_WALL.map((p) => (
            <Polaroid
              key={p.id}
              city={p.city}
              tone={p.tone}
              rotate={p.rotate}
              onOpen={() => setOpen(p.city)}
            />
          ))}
        </div>
      </div>

      {/* Lightweight fullscreen modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-6 animate-in fade-in"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${open} photo`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(null);
            }}
            className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink hover:bg-butter"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="max-w-2xl">
            <div className="rounded-sm bg-cream p-4 pb-14 shadow-2xl">
              <div className="relative aspect-[4/5] w-[min(80vw,520px)] overflow-hidden rounded-sm bg-tomato text-cream">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl font-black opacity-85">{open}</span>
                </div>
              </div>
              <div className="handwritten mt-3 text-center text-lg text-ink/80">
                {open} · 2026
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoWall;
