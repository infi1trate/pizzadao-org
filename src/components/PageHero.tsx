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
  // Wrap one word in a string with the marker underline, if it matches accentWord.
  const renderWithAccent = (text: string) => {
    if (!accentWord) return text;
    const idx = text.toLowerCase().lastIndexOf(accentWord.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + accentWord.length);
    const after = text.slice(idx + accentWord.length);
    return (
      <>
        {before}
        <span className="underline-scribble text-ink">{match}</span>
        {after}
      </>
    );
  };

  // Stack italic across two lines when it contains the accent word — drops
  // the trailing word onto its own line for editorial emphasis.
  const renderItalic = (text: string) => {
    const parts = text.trim().split(/\s+/);
    if (parts.length < 2) return <>{renderWithAccent(text)}</>;
    const last = parts[parts.length - 1];
    const head = parts.slice(0, -1).join(" ");
    return (
      <>
        {renderWithAccent(head)}
        <br />
        <span className="block pl-[0.06em]">{renderWithAccent(last)}</span>
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
        {/* Archival ref in the top corner */}
        <div className="flex items-center justify-between pb-3">
          <span className="ui text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            GPP archive · vol. 04
          </span>
          <span className="ui flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-tomato" />
            Ongoing, est. 2021
          </span>
        </div>
        <div className="border-t border-ink/40 pt-10 md:pt-14">
          <div className="grid grid-cols-12 items-end gap-x-8 gap-y-10 md:gap-x-12">
            <div className="col-span-12 md:col-span-8 animate-fade-in">
              <div className="flex items-baseline gap-3">
                <p className="overline text-tomato">{section}</p>
                {note && (
                  <span className="handwritten -rotate-2 text-tomato text-[0.78rem] md:text-sm leading-none">
                    “{note}”
                  </span>
                )}
              </div>
              <h1 className="font-display mt-6 text-mega font-extrabold leading-[0.82] tracking-[-0.025em] md:mt-7 md:leading-[0.8]">
                {renderWithAccent(title)}
                {italic && (
                  <>
                    <br />
                    <span className="text-ink/65">{renderItalic(italic)}</span>
                  </>
                )}
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 md:pl-10 md:pb-3 animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "both" }}>
              <p className="font-serif text-[15.5px] leading-[1.6] text-ink/70 md:text-[15px] md:leading-[1.65]">
                {lede}
              </p>

              {tapedImage && (
                <figure className="taped mt-10 hidden w-[72%] -rotate-[2.2deg] bg-cream-warm p-3 pb-4 shadow-[0_28px_56px_-26px_hsl(0_0%_0%/0.4),0_6px_18px_-8px_hsl(0_0%_0%/0.18)] transition-transform duration-700 hover:rotate-0 md:ml-auto md:block">
                  <div className="paper-soft">
                    <img
                      src={tapedImage.src}
                      alt={tapedImage.alt}
                      loading="eager"
                      className="grain photo-hover block aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  {tapedImage.caption && (
                    <figcaption className="handwritten mt-3 px-1 text-ink/85 text-[0.9rem] leading-tight">
                      {tapedImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </div>

          {meta && (
            <div className="mt-24 md:mt-32">
              <div className="flex items-baseline justify-between pb-5">
                <p className="overline text-ink/45">Programme — by the numbers</p>
                <p className="ui hidden text-[9.5px] font-medium uppercase tracking-[0.24em] text-ink/35 md:block">
                  Fig. i — Reach, 2020–2025
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ink/15 pt-10 md:grid-cols-4 md:gap-x-14">
                {meta.map((m, i) => (
                  <div
                    key={m.k}
                    className="flex flex-col gap-3 animate-fade-in"
                    style={{ animationDelay: `${200 + i * 80}ms`, animationFillMode: "both" }}
                  >
                    <dt className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-ink/45">
                      {m.k}
                    </dt>
                    <dd className="font-display text-[2.25rem] font-extrabold leading-[0.95] tracking-[-0.02em] md:text-[2.75rem]">
                      {m.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
