import type { ReactNode } from "react";

type Props = {
  section: string; // "§ A, About"
  title: string;
  italic?: string;
  lede: string;
  meta?: { k: string; v: string }[];
  /** A word inside the title to receive the red marker underline accent. */
  accentWord?: string;
  /** Tiny handwritten margin note near the headline. */
  note?: string;
  /** Optional taped polaroid image in the hero corner. */
  tapedImage?: { src: string; alt: string; caption?: string };
};

const PageHero = ({
  section,
  title,
  italic,
  lede,
  meta,
  accentWord,
  note,
  tapedImage,
}: Props) => {
  // Wrap one word in the title with the marker underline, if specified.
  const renderTitle = () => {
    if (!accentWord) return title;
    const idx = title.toLowerCase().lastIndexOf(accentWord.toLowerCase());
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const match = title.slice(idx, idx + accentWord.length);
    const after = title.slice(idx + accentWord.length);
    return (
      <>
        {before}
        <span className="underline-scribble text-ink">{match}</span>
        {after}
      </>
    );
  };

  return (
    <section className="paper-soft paper-drift relative overflow-hidden bg-cream pt-12 md:pt-20">
      {/* Faint corner wash — atmosphere, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "hsl(var(--tomato))" }}
      />

      <div className="container relative">
        <div className="border-t-2 border-ink pt-8 md:pt-10">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-8">
              <div className="flex items-baseline gap-3">
                <p className="overline text-tomato">{section}</p>
                {note && (
                  <span className="handwritten -rotate-2 text-tomato text-[0.78rem] md:text-sm leading-none">
                    “{note}”
                  </span>
                )}
              </div>
              <h1 className="font-display mt-5 text-mega font-extrabold leading-[0.84] tracking-[-0.02em] md:leading-[0.82]">
                {renderTitle()}
                {italic && (
                  <>
                    <br />
                    <span className="text-ink/65">{italic}</span>
                  </>
                )}
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 md:pl-8">
              <p className="text-lg leading-relaxed text-ink/80 md:text-xl">
                {lede}
              </p>

              {tapedImage && (
                <figure className="taped photo-hover mt-10 hidden w-[68%] -rotate-2 bg-cream-warm p-2 pb-3 shadow-[0_18px_40px_-22px_hsl(0_0%_0%/0.35)] md:ml-auto md:block">
                  <img
                    src={tapedImage.src}
                    alt={tapedImage.alt}
                    loading="eager"
                    className="grain block aspect-[4/5] w-full object-cover"
                  />
                  {tapedImage.caption && (
                    <figcaption className="ui mt-2 px-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                      {tapedImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </div>

          {meta && (
            <dl className="mt-16 grid grid-cols-2 gap-6 border-y border-ink/20 py-6 md:mt-24 md:grid-cols-4">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt className="ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                    {m.k}
                  </dt>
                  <dd className="font-display mt-2 text-3xl font-extrabold leading-none md:text-4xl">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {/* Hand-cut bottom rule — slightly imperfect hairline */}
      <div className="container relative mt-16 md:mt-24">
        <div className="h-px w-full bg-ink/15" />
        <div className="absolute left-[12%] -top-[1px] h-[2px] w-[22%] bg-tomato" />
      </div>
    </section>
  );
};

export default PageHero;
