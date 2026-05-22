import img01 from "@/assets/partners/activation-01.png";
import img02 from "@/assets/partners/activation-02.png";
import img03 from "@/assets/partners/activation-03.png";
import img04 from "@/assets/partners/activation-04.png";
import img05 from "@/assets/partners/activation-05.png";
import img06 from "@/assets/partners/activation-06.png";
import img07 from "@/assets/partners/activation-07.png";

type Frame = {
  src: string;
  alt: string;
  caption: string;
  ref: string;
  /** Tailwind col/row span classes for md+ */
  span: string;
  /** Aspect ratio fallback for the image element */
  aspect: string;
  /** Subtle rotation for tactile feel */
  rotate?: string;
};

const FRAMES: Frame[] = [
  {
    src: img03,
    alt: "Crowd photo from a Stand With Crypto x PizzaDAO activation, with cosplay and pizza-pixel glasses.",
    caption: "Stand With Crypto · activation night",
    ref: "PL.03",
    span: "md:col-span-7 md:row-span-2",
    aspect: "aspect-[16/10]",
    rotate: "md:-rotate-[0.4deg]",
  },
  {
    src: img04,
    alt: "Guests sharing pizza at a pink-themed brand activation with multiple sponsor logos along the bottom.",
    caption: "Pink Beach · brand activation",
    ref: "PL.04",
    span: "md:col-span-5",
    aspect: "aspect-[4/3]",
    rotate: "md:rotate-[0.5deg]",
  },
  {
    src: img02,
    alt: "Person wearing pixel-style red glasses biting a slice of pepperoni pizza in low light.",
    caption: "Slice / night",
    ref: "PL.02",
    span: "md:col-span-5",
    aspect: "aspect-[3/2]",
    rotate: "md:-rotate-[0.6deg]",
  },
  {
    src: img01,
    alt: "Group of PizzaDAO members holding decorated pizzas and a tower of pizza boxes outside a red storefront.",
    caption: "Local chapter · pizza-box tower",
    ref: "PL.01",
    span: "md:col-span-7 md:row-span-2",
    aspect: "aspect-[3/2]",
    rotate: "md:rotate-[0.3deg]",
  },
  {
    src: img06,
    alt: "Pizzaiolo holding a fresh margherita in front of a tiled pizza oven, wearing a PizzaDAO shirt.",
    caption: "Pizzaiolo · oven floor",
    ref: "PL.06",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    rotate: "md:-rotate-[0.5deg]",
  },
  {
    src: img05,
    alt: "Four people backstage holding slices of pizza, smiling at the camera.",
    caption: "Backstage · drop-in",
    ref: "PL.05",
    span: "md:col-span-6",
    aspect: "aspect-[16/9]",
    rotate: "md:rotate-[0.4deg]",
  },
  {
    src: img07,
    alt: "Six PizzaDAO team members posing on a red carpet at the World Pizza Games.",
    caption: "World Pizza Games · Las Vegas",
    ref: "PL.07",
    span: "md:col-span-6",
    aspect: "aspect-[16/9]",
    rotate: "md:-rotate-[0.3deg]",
  },
];

const PartnerActivations = () => {
  return (
    <section className="paper-soft relative overflow-hidden bg-cream py-12 md:py-16">
      {/* Soft warm wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(44 55% 96%) 0%, hsl(var(--cream)) 50%, hsl(44 60% 97%) 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />

      <div className="container relative">
        {/* Editorial header */}
        <div className="grid grid-cols-12 items-end gap-x-8 gap-y-4 border-b border-ink/15 pb-6 md:gap-x-12">
          <div className="col-span-12 md:col-span-8">
            <p className="overline text-tomato">§ B.01.5 — Plates</p>
            <h2 className="font-display mt-3 text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1] tracking-[-0.02em] text-ink">
              Activation energy, from the field.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="font-serif text-[15px] leading-[1.55] text-ink/65 md:text-[16px]">
              Selected frames from recent brand activations, chapter nights, and
              partner moments — captured by the people who were there.
            </p>
          </div>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-12 md:gap-6">
          {FRAMES.map((f, i) => (
            <figure
              key={f.ref}
              className={`group relative animate-fade-in ${f.span} ${f.rotate ?? ""} transition-transform duration-700 ease-out hover:rotate-0`}
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "both" }}
            >
              <div className="relative overflow-hidden bg-ink/5 shadow-[0_18px_40px_-22px_hsl(0_0%_0%/0.35),0_2px_6px_-2px_hsl(0_0%_0%/0.15)] ring-1 ring-ink/10">
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  className={`block h-full w-full object-cover ${f.aspect} transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]`}
                />
                {/* Grain over the image for tactile feel */}
                <div
                  aria-hidden
                  className="grain pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="font-serif text-[12.5px] leading-tight text-ink/65">
                  {f.caption}
                </span>
                <span className="ui shrink-0 text-[9.5px] font-medium uppercase tracking-[0.24em] text-ink/35">
                  Fig. {f.ref}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Footer rule */}
        <div className="mt-12 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink/8" />
          <span className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-ink/30">
            Field archive · ongoing
          </span>
          <div className="h-px flex-1 bg-ink/8" />
        </div>
      </div>
    </section>
  );
};

export default PartnerActivations;
