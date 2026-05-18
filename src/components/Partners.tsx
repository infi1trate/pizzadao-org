const partners = [
  { name: "BASF", role: "Materials", desc: "We built a place for free flowing pizza on chain as part of the larger ecosystem effort." },
  { name: "PRIVY", role: "Identity", desc: "We built a piece of infrastructure for private, decentralized membership management." },
  { name: "SUPERCHILD", role: "Creative", desc: "We developed a multi-line zine, knife zine, a sister zine to wider creative work." },
  { name: "MRBEAST", role: "Distribution", desc: "Cross-platform storytelling that put a slice in the hands of millions." },
];

const Partners = () => {
  return (
    <section id="partners" className="bg-cream py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-12 items-end gap-6 border-b-2 border-ink pb-8">
          <div className="col-span-12 md:col-span-8">
            <p className="overline text-tomato">§ 06, Partners</p>
            <h2 className="font-display mt-3 text-display-1 font-extrabold">
              Selected
              <br />
              Collaborators.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="font-serif text-base leading-relaxed text-foreground/75">
              We partner with operators, creators, and institutions who take
              their craft seriously, and who don’t mind getting flour on
              their hands.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <div key={p.name} className="bg-cream p-6 md:p-8">
              <div className="ui text-[10px] uppercase tracking-wider text-foreground/50">{p.role}</div>
              <div className="font-display mt-2 text-3xl font-extrabold tracking-tight">
                {p.name}
              </div>
              <div className="rule mt-4 mb-4" />
              <p className="font-serif text-sm leading-relaxed text-foreground/75">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
