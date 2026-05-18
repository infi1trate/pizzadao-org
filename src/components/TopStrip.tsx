const TopStrip = () => {
  const items = [
    "Est. 2021",
    "Global Pizza Party",
    "75+ Cities",
    "Pizza · Art · Internet Culture",
    "Vol. V, Dispatch No. 26",
    "Open to the Public",
    "Made by humans, fueled by cheese",
  ];
  const loop = [...items, ...items, ...items];
  return (
    <div className="border-b border-ink/15 bg-cream-warm">
      <div className="overflow-hidden py-2">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {loop.map((t, i) => (
            <span key={i} className="ui text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80">
              {t} <span className="ml-10 text-tomato">★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopStrip;
