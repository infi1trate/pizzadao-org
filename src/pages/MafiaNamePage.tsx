import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Copy, RefreshCw, Search, Sparkles, X } from "lucide-react";
import logoDark from "@/assets/logo-dark.svg";
import { MAFIA_FILMS, PIZZA_TOPPINGS, TOPPING_EMOJI, type MafiaFilm } from "@/data/mafia-films";
import { TOPPING_IMAGE } from "@/data/topping-images";
import FilmPoster from "@/components/FilmPoster";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type GeneratedName = { name: string; explanation: string; style_tags: string[] };
type Step = "film" | "topping" | "names" | "claim";

const customFilm = (title: string): MafiaFilm => ({
  id: `custom:${title}`,
  title,
  year: new Date().getFullYear(),
  country: "Your pick",
  characters: [],
  tone: ["custom"],
  overview: "A personal favorite, off the canon list.",
});

const MafiaNamePage = () => {
  const [step, setStep] = useState<Step>("film");
  const [film, setFilm] = useState<MafiaFilm | null>(null);
  const [topping, setTopping] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [toppingQuery, setToppingQuery] = useState("");
  const [names, setNames] = useState<GeneratedName[]>([]);
  const [loadingNames, setLoadingNames] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const filteredFilms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MAFIA_FILMS;
    return MAFIA_FILMS.filter(
      (f) => f.title.toLowerCase().includes(q) || f.country.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredToppings = useMemo(() => {
    const q = toppingQuery.trim().toLowerCase();
    if (!q) return PIZZA_TOPPINGS;
    return PIZZA_TOPPINGS.filter((t) => t.toLowerCase().includes(q));
  }, [toppingQuery]);

  const generate = async (chosenFilm: MafiaFilm, chosenTopping: string) => {
    setLoadingNames(true);
    setNames([]);
    setSelectedIdx(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-mafia-names", {
        body: {
          movie: {
            title: chosenFilm.title,
            year: chosenFilm.year,
            country: chosenFilm.country,
            characters: chosenFilm.characters,
            tone: chosenFilm.tone,
            overview: chosenFilm.overview,
          },
          topping: chosenTopping,
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setNames((data as any).names ?? []);
    } catch (e: any) {
      toast({
        title: "The oven hiccuped",
        description: e?.message ?? "Could not generate names. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingNames(false);
    }
  };

  const handleSelectFilm = (f: MafiaFilm) => {
    setFilm(f);
    setStep("topping");
  };

  const handleSelectTopping = async (t: string) => {
    setTopping(t);
    setStep("names");
    if (film) await generate(film, t);
  };

  const handleClaim = async () => {
    if (!film || !topping || selectedIdx === null) return;
    const chosen = editing ? editedName.trim() : names[selectedIdx].name;
    if (!chosen) return;
    setClaiming(true);
    try {
      const { error } = await supabase.from("mafia_name_claims").insert({
        selected_movie_title: film.title,
        selected_movie_id: film.id,
        selected_topping: topping,
        generated_names: names as any,
        selected_name: chosen,
        selected_explanation: names[selectedIdx]?.explanation ?? null,
      });
      if (error) throw error;
      setClaimed(true);
      setStep("claim");
    } catch (e: any) {
      toast({
        title: "Could not seal the envelope",
        description: e?.message ?? "Try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setClaiming(false);
    }
  };

  const finalName = selectedIdx !== null ? (editing ? editedName : names[selectedIdx]?.name) : "";

  const copyName = async () => {
    if (!finalName) return;
    await navigator.clipboard.writeText(finalName);
    toast({ title: "Copied", description: finalName });
  };

  const shareName = async () => {
    if (!finalName) return;
    const text = `I've been made. They call me ${finalName}. — PizzaDAO`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My PizzaDAO mafia name", text });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied share text", description: text });
  };

  const reset = () => {
    setStep("film");
    setFilm(null);
    setTopping(null);
    setNames([]);
    setSelectedIdx(null);
    setEditedName("");
    setEditing(false);
    setClaimed(false);
    setQuery("");
    setToppingQuery("");
  };

  return (
    <main className="relative min-h-[100svh] bg-cream text-ink grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60svh] opacity-60"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 0%, hsl(46 100% 62% / 0.25), transparent 60%), radial-gradient(70% 60% at 95% 10%, hsl(0 93% 60% / 0.10), transparent 65%)",
        }}
      />

      <header className="relative z-20">
        <div className="container flex h-16 items-center justify-between md:h-20">
          <Link to="/pre-launch-demo" className="flex items-center gap-3" aria-label="Back to PizzaDAO">
            <img src={logoDark} alt="PizzaDAO" className="h-6 w-auto md:h-7" />
          </Link>
          <Link
            to="/pre-launch-demo"
            className="ui inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-ink/60 hover:text-tomato"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
        </div>
      </header>

      <section className="relative z-10">
        <div className="container pt-2 pb-10 md:pt-4 md:pb-14">
          <p className="overline text-tomato">§ 01 · A PizzaDAO ceremony</p>
          <h1 className="font-display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-[-0.015em]">
            Get your <span className="text-tomato">mafia name.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/75">
            Pick a mafia movie. Pick a topping. We'll cook you a name worthy of the family.
          </p>

          {/* Step indicator */}
          <ol className="ui mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-ink/45">
            {(["film", "topping", "names", "claim"] as Step[]).map((s, i) => {
              const order = ["film", "topping", "names", "claim"] as Step[];
              const isActive = step === s;
              const isDone = order.indexOf(step) > i;
              return (
                <li key={s} className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
                      isActive
                        ? "border-tomato bg-tomato text-cream"
                        : isDone
                        ? "border-ink bg-ink text-cream"
                        : "border-ink/20 text-ink/40"
                    }`}
                  >
                    {isDone ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  <span className={isActive ? "text-ink" : ""}>
                    {s === "film" ? "Film" : s === "topping" ? "Topping" : s === "names" ? "Name" : "Claim"}
                  </span>
                  {i < 3 && <span className="text-ink/20">·</span>}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* STEP 1: FILM */}
      {step === "film" && (
        <section className="relative z-10">
          <div className="container pb-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-black leading-tight">
                Pick your mafia film.
              </h2>
              <div className="relative w-full md:w-80">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search any mafia movie…"
                  className="h-11 w-full rounded-full border border-ink/15 bg-cream pl-11 pr-4 text-sm placeholder:text-ink/40 focus:border-tomato focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {filteredFilms.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleSelectFilm(f)}
                  className="group relative flex aspect-[2/3] overflow-hidden rounded-2xl border border-ink/10 bg-ink text-left text-cream transition-all hover:-translate-y-0.5 hover:border-tomato hover:shadow-[0_18px_40px_-20px_hsl(0_93%_60%/0.5)]"
                >
                  <FilmPoster film={f} index={MAFIA_FILMS.indexOf(f)} />
                  <span className="pointer-events-none absolute inset-0 ring-0 ring-tomato/0 transition group-hover:ring-2 group-hover:ring-tomato/60 rounded-2xl" />
                </button>
              ))}

              {query.trim() && (
                <button
                  onClick={() => handleSelectFilm(customFilm(query.trim()))}
                  className="group flex aspect-[2/3] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-tomato/40 bg-tomato/5 p-4 text-center text-tomato transition-colors hover:border-tomato hover:bg-tomato/10"
                >
                  <Sparkles className="h-6 w-6" />
                  <span className="font-display text-lg font-black leading-tight">
                    Use "{query.trim()}"
                  </span>
                  <span className="ui text-[10px] uppercase tracking-[0.22em] text-tomato/70">
                    Off the canon list
                  </span>
                </button>
              )}
            </div>

            {filteredFilms.length === 0 && !query.trim() && (
              <p className="mt-10 text-center text-ink/60">No films found.</p>
            )}
          </div>
        </section>
      )}

      {/* STEP 2: TOPPING */}
      {step === "topping" && film && (
        <section className="relative z-10">
          <div className="container pb-20">
            {/* Selected film banner */}
            <div className="rounded-3xl border border-ink/10 bg-ink p-6 text-cream md:p-8">
              <p className="overline text-butter">Good choice. Dangerous taste.</p>
              <div className="mt-3 flex items-baseline justify-between gap-6 flex-wrap">
                <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-black leading-tight">
                  {film.title}
                </h3>
                <p className="ui text-[12px] uppercase tracking-[0.22em] text-cream/60">
                  {film.year} · {film.country}
                </p>
              </div>
              <button
                onClick={() => setStep("film")}
                className="ui mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-cream/60 hover:text-tomato"
              >
                <ArrowLeft className="h-3 w-3" />
                Change film
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-black leading-tight">
                Pick your topping.
              </h2>
              <div className="relative w-full md:w-80">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                <input
                  value={toppingQuery}
                  onChange={(e) => setToppingQuery(e.target.value)}
                  placeholder="Add your own topping…"
                  className="h-11 w-full rounded-full border border-ink/15 bg-cream pl-11 pr-4 text-sm placeholder:text-ink/40 focus:border-tomato focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredToppings.map((t) => (
                <button
                  key={t}
                  onClick={() => handleSelectTopping(t)}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-ink/15 bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-tomato hover:shadow-[0_14px_30px_-18px_hsl(0_93%_60%/0.4)]"
                >
                  <span className="text-3xl leading-none">{TOPPING_EMOJI[t] ?? "🍕"}</span>
                  <span className="font-display text-lg font-black leading-tight">{t}</span>
                </button>
              ))}

              {toppingQuery.trim() && !PIZZA_TOPPINGS.some((t) => t.toLowerCase() === toppingQuery.trim().toLowerCase()) && (
                <button
                  onClick={() => handleSelectTopping(toppingQuery.trim())}
                  className="flex flex-col items-start gap-3 rounded-2xl border-2 border-dashed border-tomato/40 bg-tomato/5 p-5 text-left text-tomato hover:bg-tomato/10"
                >
                  <Sparkles className="h-6 w-6" />
                  <span className="font-display text-lg font-black leading-tight">
                    Use "{toppingQuery.trim()}"
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* STEP 3: NAMES */}
      {step === "names" && film && topping && (
        <section className="relative z-10">
          <div className="container pb-20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="ui flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink/60">
                <span className="rounded-full bg-ink px-3 py-1 text-cream">{film.title}</span>
                <span className="text-ink/30">+</span>
                <span className="rounded-full bg-tomato px-3 py-1 text-cream">
                  {TOPPING_EMOJI[topping] ?? "🍕"} {topping}
                </span>
              </div>
              <button
                onClick={() => film && topping && generate(film, topping)}
                disabled={loadingNames}
                className="ui inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-ink/70 hover:text-tomato disabled:opacity-40"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingNames ? "animate-spin" : ""}`} />
                Regenerate
              </button>
            </div>

            <h2 className="font-display mt-8 text-[clamp(1.75rem,4vw,3rem)] font-black leading-tight">
              Three names. One is yours.
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {loadingNames &&
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] animate-pulse rounded-2xl border border-ink/10 bg-ink/5"
                  />
                ))}
              {!loadingNames &&
                names.map((n, i) => {
                  const isSelected = selectedIdx === i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedIdx(i);
                        setEditedName(n.name);
                        setEditing(false);
                      }}
                      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-6 text-left transition-all ${
                        isSelected
                          ? "border-tomato bg-cream shadow-[0_18px_40px_-18px_hsl(0_93%_60%/0.5)]"
                          : "border-ink/10 bg-card hover:border-ink/30"
                      }`}
                    >
                      <div>
                        <p className="overline text-tomato">Family card · No. {i + 1}</p>
                        <h3 className="font-display mt-4 text-[clamp(1.4rem,2.4vw,2rem)] font-black leading-[1.05] tracking-tight">
                          {n.name}
                        </h3>
                        <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
                          {n.explanation}
                        </p>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {n.style_tags.map((tag) => (
                          <span
                            key={tag}
                            className="ui rounded-full border border-ink/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {isSelected && (
                        <span className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-tomato text-cream">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  );
                })}
              {!loadingNames && names.length === 0 && (
                <div className="md:col-span-3 rounded-2xl border border-ink/10 bg-card p-8 text-center">
                  <p className="text-ink/70">The kitchen's quiet. Try regenerating.</p>
                </div>
              )}
            </div>

            {selectedIdx !== null && !loadingNames && (
              <div className="mt-10 rounded-3xl border border-ink/10 bg-ink p-6 text-cream md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="overline text-butter">Your name, your call</p>
                    {editing ? (
                      <input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        maxLength={120}
                        className="font-display mt-3 w-full rounded-xl border border-cream/20 bg-transparent px-4 py-3 text-[clamp(1.4rem,2.5vw,2rem)] font-black leading-tight tracking-tight text-cream focus:border-tomato focus:outline-none"
                      />
                    ) : (
                      <h3 className="font-display mt-3 text-[clamp(1.6rem,3vw,2.5rem)] font-black leading-tight tracking-tight">
                        {finalName}
                      </h3>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        if (editing) {
                          setEditing(false);
                        } else {
                          setEditing(true);
                          setEditedName(names[selectedIdx].name);
                        }
                      }}
                      className="ui rounded-full border border-cream/20 px-4 py-2 text-[12px] uppercase tracking-[0.2em] hover:border-tomato hover:text-tomato"
                    >
                      {editing ? "Done" : "Edit"}
                    </button>
                    <button
                      onClick={copyName}
                      className="ui inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-4 py-2 text-[12px] uppercase tracking-[0.2em] hover:border-tomato hover:text-tomato"
                    >
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </button>
                    <button
                      onClick={handleClaim}
                      disabled={claiming || !finalName?.trim()}
                      className="btn-pill group bg-tomato text-cream hover:bg-cream hover:text-ink disabled:opacity-50"
                    >
                      {claiming ? "Sealing…" : "Claim this name"}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* STEP 4: CLAIM */}
      {step === "claim" && claimed && (
        <section className="relative z-10">
          <div className="container py-12 md:py-20">
            <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-cream p-8 text-center md:p-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 0%, hsl(46 100% 62% / 0.35), transparent 70%), radial-gradient(80% 60% at 50% 100%, hsl(0 93% 60% / 0.18), transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="mx-auto mb-6 inline-flex">
                  <div className="seal relative grid h-28 w-28 place-items-center rounded-full border-4 border-tomato bg-cream text-tomato shadow-[0_0_0_6px_hsl(0_93%_60%/0.1)]">
                    <div className="text-center leading-tight">
                      <div className="ui text-[8px] uppercase tracking-[0.3em]">PizzaDAO</div>
                      <div className="font-display text-[10px] font-black uppercase tracking-[0.2em]">Made</div>
                      <div className="ui text-[8px] uppercase tracking-[0.3em]">{new Date().getFullYear()}</div>
                    </div>
                  </div>
                </div>
                <p className="overline text-tomato">You've been made.</p>
                <h1 className="font-display mt-4 text-[clamp(2rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.015em]">
                  {finalName}
                </h1>
                {selectedIdx !== null && names[selectedIdx]?.explanation && (
                  <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink/75">
                    {names[selectedIdx].explanation}
                  </p>
                )}

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://discord.pizzadao.xyz/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pill-lg group bg-ink text-cream hover:bg-tomato"
                  >
                    Join the Discord
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <button
                    onClick={shareName}
                    className="btn-pill-lg group border border-ink/20 bg-cream text-ink hover:border-tomato hover:text-tomato"
                  >
                    Share your name
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={reset}
                    className="btn-pill-lg group border border-ink/20 bg-transparent text-ink hover:border-tomato hover:text-tomato"
                  >
                    <X className="h-4 w-4" />
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="relative z-10 border-t border-ink/10">
        <div className="container py-8 text-ink/60">
          <p className="ui text-[11px] uppercase tracking-[0.22em]">
            © {new Date().getFullYear()} PizzaDAO · A small cinematic ritual
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes seal-stamp {
          0% { transform: scale(1.8) rotate(-12deg); opacity: 0; }
          60% { transform: scale(0.95) rotate(-6deg); opacity: 1; }
          100% { transform: scale(1) rotate(-6deg); opacity: 1; }
        }
        .seal { animation: seal-stamp 0.7s cubic-bezier(0.2,0.9,0.3,1.2) both; }
        @media (prefers-reduced-motion: reduce) { .seal { animation: none !important; transform: rotate(-6deg); } }
      `}</style>
    </main>
  );
};

export default MafiaNamePage;
