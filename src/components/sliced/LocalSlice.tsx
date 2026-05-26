import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";

type Local = {
  city: string;
  country: string;
  partiesNearby: number;
  miles: number;
  rank: string;
};

const FALLBACK: Local = {
  city: "New York",
  country: "United States",
  partiesNearby: 4,
  miles: 8,
  rank: "Top 3 global pizza zone",
};

const LocalSlice = () => {
  const [local, setLocal] = useState<Local>(FALLBACK);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // Lightweight, no-key locale guess. If it fails, fall back gracefully.
    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (cancelled || !d?.city) return;
        setLocal({
          city: d.city,
          country: d.country_name ?? "",
          partiesNearby: 2 + (d.city.length % 5),
          miles: 3 + (d.city.length % 9),
          rank: `${d.city} joined Pizza Party Sliced 2026`,
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLocal({
      city: query.trim(),
      country: "",
      partiesNearby: 3 + (query.length % 6),
      miles: 2 + (query.length % 10),
      rank: `${query.trim()} joined Pizza Party Sliced 2026`,
    });
  };

  return (
    <section id="local" className="relative bg-butter text-ink">
      <div className="container py-24 md:py-36">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="overline text-tomato">§ 04 · Your local slice</div>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[0.92]">
              You were closer than you think.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-snug text-ink/80">
              We&apos;ll guess where you are. Or tell us — and we&apos;ll show
              you exactly how loud your block got.
            </p>

            <form onSubmit={onSearch} className="mt-8 flex gap-2">
              <label className="sr-only" htmlFor="city-search">Search your city</label>
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                <input
                  id="city-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try Brooklyn, Lagos, Tokyo…"
                  className="ui w-full rounded-full border border-ink/20 bg-cream/70 py-3 pl-10 pr-4 text-sm font-medium placeholder:text-ink/40 focus:border-ink focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-pill bg-ink text-cream hover:bg-tomato"
              >
                Show me
              </button>
            </form>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="relative rounded-3xl border-2 border-ink bg-cream p-7 md:p-10 paper-soft">
              <div className="ui flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.28em] text-ink/60">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> Your slice card
                </span>
                <span>2026</span>
              </div>

              <div className="mt-6">
                <div className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[0.9]">
                  {loading ? "Locating…" : local.city}
                </div>
                {local.country && (
                  <div className="ui mt-2 text-sm font-semibold text-ink/60">{local.country}</div>
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5">
                <div className="rounded-xl bg-tomato p-5 text-cream">
                  <div className="ui text-[10px] font-bold uppercase tracking-[0.22em] opacity-80">
                    Parties within reach
                  </div>
                  <div className="font-display mt-2 text-5xl font-black leading-none">
                    {local.partiesNearby}
                  </div>
                  <div className="ui mt-2 text-xs opacity-90">
                    within {local.miles} miles of you
                  </div>
                </div>
                <div className="rounded-xl bg-ink p-5 text-cream">
                  <div className="ui text-[10px] font-bold uppercase tracking-[0.22em] text-butter">
                    Regional standing
                  </div>
                  <div className="font-display mt-2 text-2xl font-black leading-tight">
                    {local.rank}
                  </div>
                </div>
              </div>

              <p className="ui mt-7 text-sm text-ink/70">
                &ldquo;You were within {local.miles} miles of {local.partiesNearby} pizza
                parties.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSlice;
