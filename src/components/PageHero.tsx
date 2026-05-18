type Props = {
  section: string; // "§ A, About"
  title: string;
  italic?: string;
  lede: string;
  meta?: { k: string; v: string }[];
};

const PageHero = ({ section, title, italic, lede, meta }: Props) => {
  return (
    <section className="bg-cream pt-12 md:pt-20">
      <div className="container">
        <div className="border-t-2 border-ink pt-8 md:pt-10">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-8">
              <p className="overline text-tomato">{section}</p>
              <h1 className="font-display mt-5 text-mega font-extrabold leading-[0.86]">
                {title}
                {italic && (
                  <>
                    <br />
                    <span className="text-ink/65">
                      {italic}
                    </span>
                  </>
                )}
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 md:pl-8">
              <p className="text-lg leading-relaxed text-ink/80 md:text-xl">
                {lede}
              </p>
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
    </section>
  );
};

export default PageHero;
