import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Copy, RefreshCw, Search, Sparkles, X } from "lucide-react";
import logoDark from "@/assets/logo-dark.svg";
import { MAFIA_FILMS, PIZZA_TOPPINGS, TOPPING_EMOJI, type MafiaFilm } from "@/data/mafia-films";
import { TOPPING_IMAGE } from "@/data/topping-images";
import FilmPoster from "@/components/FilmPoster";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { track } from "@/lib/analytics/posthog";
import { EVT } from "@/lib/analytics/events";

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

const TOPPING_DESCRIPTOR: Record<string, string> = {
  Pepperoni: "loud · classic · respected",
  Mushroom: "earthy · quiet · dangerous",
  Basil: "green · honest · sicilian",
  Mozzarella: "soft · loyal · everywhere",
  Anchovy: "salty · brutal · old-school",
  Sausage: "heavy · brooklyn · proud",
  "Hot honey": "sweet · chaotic · respected",
  Ricotta: "creamy · gentle · holy",
  Garlic: "sharp · unforgettable · armed",
  Onion: "tearful · loyal · stubborn",
  Olives: "bitter · sicilian · patient",
  Prosciutto: "elegant · cured · expensive",
  Pineapple: "controversial · sunlit · brave",
  "Jalapeño": "hot · quick · unpredictable",
  "Banana peppers": "tangy · cheerful · sneaky",
  Soppressata: "spicy · cured · feared",
  Meatball: "round · familiar · violent",
  "Roasted red pepper": "sweet · smoky · charming",
  Truffle: "rare · expensive · whispered",
  Artichoke: "armored · roman · stubborn",
  Eggplant: "deep · sicilian · velvet",
  "Broccoli rabe": "bitter · green · honest",
  "Chili crisp": "loud · oily · modern",
  Burrata: "soft · luxurious · creamy",
  Oregano: "dry · grandmotherly · sicilian",
  Parmesan: "sharp · aged · proud",
  Tomato: "red · the beginning · everything",
  "Spicy salami": "hot · cured · dangerous",
};

const toppingDescriptor = (t: string) =>
  TOPPING_DESCRIPTOR[t] ?? "off-canon · your call · respected";

// Three distinct personas — each card carries one. Order matches names[0..2].
const CARD_PERSONALITIES: {
  id: string;
  margin: string;
  toneHint: string;
  fileNo: string;
  rotation: number;
  yOffset: string;
}[] = [
  {
    id: "classic",
    margin: "trusted",
    toneHint: "classic, controlled, respected, quiet authority",
    fileNo: "01",
    rotation: -1.2,
    yOffset: "lg:translate-y-0",
  },
  {
    id: "wildcard",
    margin: "dangerous",
    toneHint: "chaotic, unpredictable, feared, wild eyes",
    fileNo: "02",
    rotation: 0.9,
    yOffset: "lg:translate-y-6",
  },
  {
    id: "operator",
    margin: "real earner",
    toneHint: "smooth, charming, calculating, sharp dresser",
    fileNo: "03",
    rotation: -0.6,
    yOffset: "lg:translate-y-2",
  },
];


const filmAtmosphere = (f: MafiaFilm) => {
  const t = f.tone[0] ?? "personal";
  return t.charAt(0).toUpperCase() + t.slice(1) + ".";
};

// Deterministic family archive number from name + day
const familyArchiveNo = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const n = Math.abs(h) % 90000 + 10000;
  return n.toString();
};

const MafiaNamePage = () => {
  const [step, setStep] = useState<Step>("film");
  const [film, setFilm] = useState<MafiaFilm | null>(null);
  const [topping, setTopping] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [toppingQuery, setToppingQuery] = useState("");
  const [filmDrawerOpen, setFilmDrawerOpen] = useState(false);
  const [toppingDrawerOpen, setToppingDrawerOpen] = useState(false);

  const [names, setNames] = useState<GeneratedName[]>([]);
  const [loadingNames, setLoadingNames] = useState(false);
  const [revealPhase, setRevealPhase] = useState<"idle" | "cycling" | "settled">("idle");
  const [cycleTick, setCycleTick] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [finalePhase, setFinalePhase] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [cardAvatars, setCardAvatars] = useState<(string | null)[]>([null, null, null]);
  const [cardAvatarLoading, setCardAvatarLoading] = useState<boolean[]>([false, false, false]);

  const generateCountRef = useRef(0);
  const filmInputRef = useRef<HTMLInputElement>(null);
  const toppingInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    track(EVT.MAFIA_STARTED, {});
  }, []);

  // Cycling animation while loading
  useEffect(() => {
    if (revealPhase !== "cycling") return;
    const id = window.setInterval(() => setCycleTick((t) => t + 1), 80);
    return () => window.clearInterval(id);
  }, [revealPhase]);

  // Finale sequencing
  useEffect(() => {
    if (step !== "claim" || !claimed) return;
    setFinalePhase(0);
    const timers = [
      setTimeout(() => setFinalePhase(1), 200),   // vignette
      setTimeout(() => setFinalePhase(2), 700),   // seal stamps
      setTimeout(() => setFinalePhase(3), 1300),  // "you've been made"
      setTimeout(() => setFinalePhase(4), 1900),  // name reveal
      setTimeout(() => setFinalePhase(5), 2500),  // description
      setTimeout(() => setFinalePhase(6), 3100),  // CTAs
    ];
    return () => timers.forEach(clearTimeout);
  }, [step, claimed]);

  const filteredFilms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MAFIA_FILMS.slice(0, 24);
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
    setRevealPhase("cycling");
    generateCountRef.current += 1;
    if (generateCountRef.current > 1) {
      track(EVT.MAFIA_NAME_REGENERATED, {
        attempt: generateCountRef.current,
        movie: chosenFilm.title,
        topping: chosenTopping,
      });
    }
    const startedAt = Date.now();
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
      const generated = (data as any).names ?? [];
      // Hold cycling for at least 1500ms for the ceremony to land
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, 1500 - elapsed);
      await new Promise((r) => setTimeout(r, wait));
      setNames(generated);
      setRevealPhase("settled");
      // Avatars are NOT pre-generated for each card.
      // The avatar is earned — it is only generated after the user claims a name.
      track(EVT.MAFIA_NAMES_GENERATED, {
        count: generated.length,
        movie: chosenFilm.title,
        topping: chosenTopping,
      });
    } catch (e: any) {
      setRevealPhase("idle");
      track(EVT.MAFIA_GENERATE_FAILED, {
        reason: e?.message ?? "unknown",
        movie: chosenFilm.title,
        topping: chosenTopping,
      });
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
    setQuery("");
    setFilmDrawerOpen(false);
    setStep("topping");
    setTimeout(() => toppingInputRef.current?.focus(), 200);
    track(EVT.MAFIA_MOVIE_PICKED, {
      movie_id: f.id,
      movie_title: f.title,
      custom: f.id.startsWith("custom:"),
    });
  };

  const handleSelectTopping = async (t: string) => {
    setTopping(t);
    setToppingQuery("");
    setToppingDrawerOpen(false);
    setStep("names");
    track(EVT.MAFIA_TOPPING_PICKED, { topping: t });
    if (film) await generate(film, t);
  };

  const generateAvatar = async (chosenName: string, opts: { redraw?: boolean } = {}) => {
    if (!film || !topping) return;
    setAvatarLoading(true);
    setAvatarUrl(null);
    const startedAt = performance.now();
    track(EVT.MAFIA_AVATAR_STARTED, {
      mafia_name: chosenName,
      movie: film.title,
      topping,
      redraw: Boolean(opts.redraw),
    });
    try {
      const { data, error } = await supabase.functions.invoke("generate-mafia-avatar", {
        body: {
          name: chosenName,
          topping,
          filmTitle: film.title,
          filmTone: film.tone,
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const img = (data as any)?.image;
      if (img) {
        setAvatarUrl(img);
        track(EVT.MAFIA_AVATAR_GENERATED, {
          mafia_name: chosenName,
          movie: film.title,
          topping,
          latency_ms: Math.round(performance.now() - startedAt),
          redraw: Boolean(opts.redraw),
        });
      } else {
        track(EVT.MAFIA_AVATAR_FAILED, {
          mafia_name: chosenName,
          movie: film.title,
          topping,
          reason: "no_image_returned",
        });
      }
    } catch (e: any) {
      // Silent - dossier still works without avatar
      console.warn("avatar gen failed", e);
      track(EVT.MAFIA_AVATAR_FAILED, {
        mafia_name: chosenName,
        movie: film.title,
        topping,
        reason: e?.message ?? "unknown",
      });
    } finally {
      setAvatarLoading(false);
    }
  };

  const generateCardAvatars = async (
    namesList: GeneratedName[],
    chosenFilm: MafiaFilm,
    chosenTopping: string,
  ) => {
    const slice = namesList.slice(0, 3);
    setCardAvatars([null, null, null]);
    setCardAvatarLoading(slice.map(() => true).concat(Array(3 - slice.length).fill(false)).slice(0, 3));
    await Promise.all(
      slice.map(async (n, i) => {
        try {
          const personaTone = [
            ...(chosenFilm.tone ?? []),
            CARD_PERSONALITIES[i]?.toneHint ?? "",
          ].filter(Boolean);
          const { data, error } = await supabase.functions.invoke("generate-mafia-avatar", {
            body: {
              name: n.name,
              topping: chosenTopping,
              filmTitle: chosenFilm.title,
              filmTone: personaTone,
            },
          });
          if (error) throw error;
          const img = (data as any)?.image;
          if (img) {
            setCardAvatars((prev) => {
              const next = [...prev];
              next[i] = img;
              return next;
            });
          }
        } catch (e) {
          // silent — card still works without avatar
        } finally {
          setCardAvatarLoading((prev) => {
            const next = [...prev];
            next[i] = false;
            return next;
          });
        }
      }),
    );
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
      track(EVT.MAFIA_NAME_CLAIMED, {
        name: chosen,
        movie: film.title,
        topping,
        edited: editing,
        generate_attempts: generateCountRef.current,
      });
      setClaimed(true);
      setStep("claim");
      // Avatar is only generated *after* the name is claimed.
      generateAvatar(chosen);
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
    const text = `Just got made.\n\n${finalName} 🍕\n\npizzadao.org`;
    const url = "https://pizzadao.org/get-your-mafia-name";
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
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
    setRevealPhase("idle");
    setFinalePhase(0);
    setAvatarUrl(null);
    setAvatarLoading(false);
    setCardAvatars([null, null, null]);
    setCardAvatarLoading([false, false, false]);
  };

  const topThree = names.slice(0, 3);


  // Names used during the cycling animation - pull characters from canon for flavor
  const cyclePool = useMemo(() => {
    const chars = MAFIA_FILMS.flatMap((f) => f.characters);
    const fragments = [
      "the Quiet", "the Hand", "the Oven", "Two Knives", "the Sicilian",
      "the Patient", "the Whisper", "the Last Call", "the Ledger", "Hot Sauce",
      "the Sunday", "the Vow", "the Velvet", "the Crumb", "Cold Slice",
    ];
    return [...chars, ...fragments];
  }, []);

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

      {step !== "claim" && (
        <section className="relative z-10">
          <div className="container pt-2 pb-6 md:pt-4 md:pb-10">
            <p className="overline text-tomato">§ 01 · PizzaDAO initiation</p>
            <h1 className="font-display mt-4 max-w-[14ch] text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-[-0.015em] [text-wrap:balance]">
              Enter the{" "}
              <span className="text-tomato">PizzaDAO underworld.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/75">
              Pick the vibe. Choose your topping. The pizza decides who you are.
            </p>
          </div>
        </section>
      )}

      {/* STEP 1 / 2: cinematic inputs */}
      {(step === "film" || step === "topping") && (
        <section className="relative z-10">
          <div className="container pb-24">
            {/* FILM input or selected card */}
            {!film ? (
              <CinematicInput
                inputRef={filmInputRef}
                label="§ 02 · The vibe"
                placeholder="What kind of operation is this?"
                value={query}
                onChange={setQuery}
                open={filmDrawerOpen}
                onOpen={() => setFilmDrawerOpen(true)}
                onClose={() => setFilmDrawerOpen(false)}
              >
                <FilmDrawer
                  films={filteredFilms}
                  query={query}
                  onPick={handleSelectFilm}
                />
              </CinematicInput>
            ) : (
              <SelectedFilmCard film={film} onChange={() => { setFilm(null); setStep("film"); setTimeout(() => filmInputRef.current?.focus(), 100); }} />
            )}

            {/* TOPPING input (only once film picked) */}
            {step === "topping" && (
              <div className="mt-14">
                <CinematicInput
                  inputRef={toppingInputRef}
                  label="§ 03 · Your topping (this is you)"
                  placeholder="What's your topping?"
                  value={toppingQuery}
                  onChange={setToppingQuery}
                  open={toppingDrawerOpen}
                  onOpen={() => setToppingDrawerOpen(true)}
                  onClose={() => setToppingDrawerOpen(false)}
                >
                  <ToppingDrawer
                    toppings={filteredToppings}
                    query={toppingQuery}
                    onPick={handleSelectTopping}
                  />
                </CinematicInput>
              </div>
            )}
          </div>
        </section>
      )}

      {/* STEP 3: NAMES - ceremonial reveal */}
      {step === "names" && film && topping && (
        <section className="relative z-10">
          <div className="container pb-24">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => { setStep("topping"); setTopping(null); setNames([]); setSelectedIdx(null); setRevealPhase("idle"); }}
                className="ui inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-ink/55 hover:text-tomato"
              >
                <ArrowLeft className="h-3 w-3" />
                Change inputs
              </button>
              <button
                onClick={() => film && topping && generate(film, topping)}
                disabled={loadingNames}
                className="ui inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-ink/65 hover:text-tomato disabled:opacity-40"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingNames ? "animate-spin" : ""}`} />
                Re-cast
              </button>
            </div>

            <div className="mt-10 text-center md:mt-14">
              <p className="overline text-tomato">§ 04 · The naming</p>
              <h2 className="font-display mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.95] tracking-[-0.01em]">
                The pizza has spoken.
              </h2>
              <p className="ui mt-4 text-[12px] uppercase tracking-[0.28em] text-ink/45">
                One of these belongs to you.
              </p>
            </div>

            {/* Reveal stage */}
            <div className="relative mt-12 md:mt-16">
              {/* spotlight */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700 ${revealPhase === "idle" ? "opacity-0" : "opacity-100"}`}
                style={{
                  background:
                    "radial-gradient(50% 60% at 50% 30%, hsl(46 100% 62% / 0.35), transparent 70%), radial-gradient(60% 50% at 50% 90%, hsl(0 93% 60% / 0.12), transparent 70%)",
                }}
              />

              {revealPhase === "cycling" && (
                <CyclingStage pool={cyclePool} tick={cycleTick} />
              )}

              {revealPhase === "settled" && topThree.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
                  {topThree.map((n, i) => (
                    <FamilyFileCard
                      key={i}
                      name={n}
                      index={i}
                      persona={CARD_PERSONALITIES[i]}
                      isSelected={selectedIdx === i}
                      anySelected={selectedIdx !== null}
                      onSelect={() => { setSelectedIdx(i); setEditedName(n.name); setEditing(false); }}
                    />
                  ))}
                </div>
              )}

              {revealPhase === "idle" && !loadingNames && names.length === 0 && (
                <div className="rounded-2xl border border-ink/10 bg-card p-8 text-center">
                  <p className="text-ink/70">The kitchen's quiet. Try re-casting.</p>
                </div>
              )}
            </div>
          </div>

          {/* Ceremonial selection dock */}
          <div
            className={`sticky bottom-4 z-30 mx-4 transition-all duration-500 md:mx-auto md:max-w-3xl ${
              selectedIdx !== null && !loadingNames
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-6 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-cream/15 bg-ink/95 px-6 py-5 text-cream shadow-[0_30px_60px_-30px_hsl(0_93%_60%/0.45)] backdrop-blur md:px-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(60% 80% at 20% 0%, hsl(46 100% 62% / 0.18), transparent 70%), radial-gradient(60% 80% at 100% 100%, hsl(0 93% 60% / 0.18), transparent 70%)",
                }}
              />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="overline text-butter">Your name, your call</p>
                  {editing ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      maxLength={120}
                      className="font-display mt-2 w-full rounded-xl border border-cream/20 bg-transparent px-3 py-2 text-[clamp(1.3rem,2.2vw,1.8rem)] font-black leading-tight tracking-tight text-cream focus:border-tomato focus:outline-none"
                    />
                  ) : (
                    <h3 className="font-display mt-2 truncate text-[clamp(1.4rem,2.6vw,2.1rem)] font-black leading-tight tracking-tight">
                      {finalName}
                    </h3>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      if (editing) setEditing(false);
                      else { setEditing(true); if (selectedIdx !== null) setEditedName(names[selectedIdx].name); }
                    }}
                    className="ui rounded-full border border-cream/20 px-4 py-2 text-[11px] uppercase tracking-[0.22em] hover:border-tomato hover:text-tomato"
                  >
                    {editing ? "Done" : "Edit"}
                  </button>
                  <button
                    onClick={copyName}
                    className="ui inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-4 py-2 text-[11px] uppercase tracking-[0.22em] hover:border-tomato hover:text-tomato"
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
          </div>
        </section>
      )}

      {/* STEP 4: FINALE */}
      {step === "claim" && claimed && (
        <FinaleScene
          phase={finalePhase}
          finalName={finalName}
          description={selectedIdx !== null ? names[selectedIdx]?.explanation : ""}
          film={film}
          topping={topping}
          avatarUrl={avatarUrl}
          avatarLoading={avatarLoading}
          onRegenerateAvatar={() => {
            track(EVT.MAFIA_AVATAR_REDRAW, {
              mafia_name: finalName,
              movie: film?.title,
              topping,
            });
            generateAvatar(finalName, { redraw: true });
          }}
          onShare={shareName}
          onReset={reset}
        />
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
          0% { transform: scale(2.2) rotate(-14deg); opacity: 0; filter: blur(6px); }
          55% { transform: scale(0.92) rotate(-7deg); opacity: 1; filter: blur(0); }
          70% { transform: scale(1.03) rotate(-6deg); }
          100% { transform: scale(1) rotate(-6deg); opacity: 1; }
        }
        @keyframes seal-ink-spread {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.1); opacity: 0.5; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes paper-shake {
          0% { transform: translate(0,0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-1px, 1px); }
          80% { transform: translate(1px, 0); }
          100% { transform: translate(0,0); }
        }
        @keyframes film-flicker {
          0%,100% { opacity: 0.06; }
          5% { opacity: 0.12; }
          50% { opacity: 0.04; }
          75% { opacity: 0.10; }
        }
        @keyframes dust-drift {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-10px) translateX(8px); }
        }
        @keyframes cycle-blur-in {
          from { filter: blur(8px); opacity: 0; transform: translateY(8px); }
          to { filter: blur(0); opacity: 1; transform: translateY(0); }
        }
        .seal-stamp { animation: seal-stamp 0.75s cubic-bezier(0.2,0.9,0.3,1.25) both; }
        .seal-spread { animation: seal-ink-spread 0.9s ease-out both; }
        .paper-shake { animation: paper-shake 0.5s ease-out both; }
        .film-flicker { animation: film-flicker 3.4s steps(2) infinite; }
        .dust-drift { animation: dust-drift 6s ease-in-out infinite alternate; }
        .cycle-in { animation: cycle-blur-in 0.18s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .seal-stamp, .seal-spread, .paper-shake, .film-flicker, .dust-drift, .cycle-in {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
};

/* ---------------- Components ---------------- */

function CinematicInput({
  inputRef,
  label,
  placeholder,
  value,
  onChange,
  open,
  onOpen,
  onClose,
  children,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <p className="overline text-tomato">{label}</p>
      <div
        className="relative mt-4 overflow-hidden rounded-[28px] border border-ink/12 bg-cream shadow-[0_30px_60px_-40px_hsl(46_100%_50%/0.35)] transition-shadow focus-within:shadow-[0_30px_60px_-30px_hsl(0_93%_60%/0.35)]"
      >
        {/* faint projected-light texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(120% 80% at 0% 0%, hsl(46 100% 62% / 0.14), transparent 60%), radial-gradient(80% 60% at 100% 100%, hsl(0 93% 60% / 0.06), transparent 70%)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-40" />

        <label className="relative flex items-center gap-4 px-5 py-5 md:gap-6 md:px-8 md:py-7">
          <Search className="h-5 w-5 shrink-0 text-ink/35 md:h-6 md:w-6" />
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => { onChange(e.target.value); if (!open) onOpen(); }}
            onFocus={onOpen}
            placeholder={placeholder}
            className="font-display w-full bg-transparent text-[clamp(1.4rem,3.2vw,2.4rem)] font-black leading-tight tracking-tight text-ink placeholder:text-ink/30 focus:outline-none"
          />
          {open && (
            <button
              type="button"
              onClick={onClose}
              className="ui hidden shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-ink/55 hover:border-tomato hover:text-tomato md:inline-flex"
            >
              Close
            </button>
          )}
        </label>
      </div>

      {/* contextual drawer */}
      <div
        className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.2,0.9,0.3,1)] ${
          open ? "mt-5 max-h-[70vh] opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-[24px] border border-ink/10 bg-card/60 p-4 backdrop-blur md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function FilmDrawer({ films, query, onPick }: { films: MafiaFilm[]; query: string; onPick: (f: MafiaFilm) => void; }) {
  return (
    <div>
      <p className="ui text-[10px] uppercase tracking-[0.28em] text-ink/45">
        {query ? "Matches" : "Recently respected"}
      </p>
      <div className="mt-4 -mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-2">
        {films.map((f) => (
          <button
            key={f.id}
            onClick={() => onPick(f)}
            className="group relative flex aspect-[2/3] w-[130px] shrink-0 snap-start overflow-hidden rounded-xl border border-ink/10 bg-ink text-left text-cream transition-all hover:-translate-y-0.5 hover:border-tomato hover:shadow-[0_18px_30px_-18px_hsl(0_93%_60%/0.55)] md:w-[150px]"
          >
            <FilmPoster film={f} index={MAFIA_FILMS.indexOf(f)} />
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-tomato/0 transition group-hover:ring-2 group-hover:ring-tomato/60" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-2">
              <span className="ui block truncate text-[10px] uppercase tracking-[0.18em] text-cream/85">
                {f.title}
              </span>
            </span>
          </button>
        ))}

        {query.trim() && (
          <button
            onClick={() => onPick(customFilm(query.trim()))}
            className="group flex aspect-[2/3] w-[150px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-tomato/40 bg-tomato/5 p-3 text-center text-tomato transition-colors hover:border-tomato hover:bg-tomato/10"
          >
            <Sparkles className="h-5 w-5" />
            <span className="font-display text-sm font-black leading-tight">Use "{query.trim()}"</span>
            <span className="ui text-[9px] uppercase tracking-[0.22em] text-tomato/70">Off canon</span>
          </button>
        )}
      </div>
      <p className="ui mt-3 text-[10px] uppercase tracking-[0.24em] text-ink/35">
        Scroll → · or keep typing
      </p>
    </div>
  );
}

function SelectedFilmCard({ film, onChange }: { film: MafiaFilm; onChange: () => void }) {
  return (
    <div>
      <p className="overline text-tomato">§ 02 · The film</p>
      <div className="mt-4 flex items-end justify-between gap-6 border-b border-ink/15 pb-6">
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-black uppercase leading-[0.95] tracking-[-0.01em] text-ink">
            {film.title}
          </h3>
          <p className="ui mt-3 text-[12px] uppercase tracking-[0.28em] text-ink/55">
            {film.year} · {film.country}
          </p>
          <p className="mt-3 max-w-md text-[15px] italic text-ink/65">
            "{filmAtmosphere(film)}"
          </p>
        </div>
        <button
          onClick={onChange}
          className="ui shrink-0 rounded-full border border-ink/20 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-ink/60 hover:border-tomato hover:text-tomato"
        >
          Change
        </button>
      </div>
    </div>
  );
}

const FEATURED_TOPPINGS = [
  "Pepperoni",
  "Mushroom",
  "Anchovy",
  "Basil",
  "Hot honey",
  "Sausage",
  "Pineapple",
  "Truffle",
] as const;

const TOPPING_ANNOTATION: Record<string, string> = {
  Pepperoni: "classic",
  Mushroom: "earthy",
  Anchovy: "dangerous",
  Basil: "respect",
  "Hot honey": "wild",
  Sausage: "trusted",
  Pineapple: "brave",
  Truffle: "good choice",
};

function ToppingDrawer({ toppings, query, onPick }: { toppings: string[]; query: string; onPick: (t: string) => void }) {
  const q = query.trim().toLowerCase();
  const featured = FEATURED_TOPPINGS.filter((t) =>
    toppings.some((x) => x === t)
  );
  const supporting = toppings.filter(
    (t) => !FEATURED_TOPPINGS.includes(t as typeof FEATURED_TOPPINGS[number])
  );

  return (
    <div className="relative">
      {/* Faded fabric — softened checkercloth: two low-opacity diagonal washes
          blurred together, no hard repeating grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -m-3 rounded-3xl"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 20% 0%, hsl(0 93% 60% / 0.06), transparent 60%), radial-gradient(120% 80% at 80% 100%, hsl(20 60% 40% / 0.05), transparent 60%), repeating-linear-gradient(45deg, hsl(0 93% 60% / 0.035) 0 14px, transparent 14px 28px), repeating-linear-gradient(-45deg, hsl(0 93% 60% / 0.025) 0 14px, transparent 14px 28px)",
          filter: "blur(0.3px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -m-3 rounded-3xl grain"
        style={{ mixBlendMode: "multiply", opacity: 0.5 }}
      />

      <p className="relative ui text-[10px] uppercase tracking-[0.28em] text-ink/45">
        {q ? "Matches" : "The headliners"}
      </p>

      {/* FEATURED — large character-portrait cards */}
      {featured.length > 0 && (
        <div className="relative mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {featured.map((t, i) => {
            const img = TOPPING_IMAGE[t];
            const annotation = TOPPING_ANNOTATION[t] ?? "respect";
            const rot = ((i * 7) % 5) - 2;
            return (
              <button
                key={t}
                onClick={() => onPick(t)}
                style={{ transform: `rotate(${rot * 0.25}deg)` }}
                className="group relative flex flex-col overflow-visible rounded-[20px] border border-ink/10 bg-cream text-left shadow-[0_14px_30px_-18px_hsl(20_30%_15%/0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:scale-[1.03] hover:border-tomato/60 hover:shadow-[0_28px_50px_-18px_hsl(0_93%_60%/0.45)] focus-visible:-translate-y-1.5 focus-visible:rotate-0 focus-visible:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato/60"
              >
                {/* Warm glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 -z-10 rounded-[24px] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 40%, hsl(46 100% 62% / 0.6), transparent 70%)",
                  }}
                />
                {/* Square ingredient portrait — consistent crop */}
                <span className="relative block aspect-square w-full overflow-hidden rounded-t-[20px] bg-ink/5">
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full scale-[1.04] object-cover transition-transform duration-500 group-hover:scale-[1.1]"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center text-5xl">
                      {TOPPING_EMOJI[t] ?? "🍕"}
                    </span>
                  )}
                  {/* Warm cinematic vignette */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 30% 20%, hsl(46 80% 75% / 0.18), transparent 55%), radial-gradient(120% 80% at 80% 100%, hsl(20 50% 10% / 0.35), transparent 60%)",
                    }}
                  />
                  {/* Handwritten annotation — appears on hover/focus */}
                  <span
                    aria-hidden
                    className="handwritten pointer-events-none absolute -top-3 right-2 rotate-[-8deg] rounded-full bg-cream px-2.5 py-1 text-[12px] text-tomato opacity-0 shadow-[0_6px_14px_-8px_hsl(0_93%_60%/0.5)] transition-all duration-300 group-hover:-top-4 group-hover:opacity-100 group-focus-visible:-top-4 group-focus-visible:opacity-100"
                  >
                    {annotation}
                  </span>
                </span>
                <span className="flex flex-col gap-0.5 px-3 py-3">
                  <span className="font-display text-[16px] font-black leading-tight tracking-tight text-ink">
                    {t}
                  </span>
                  <span className="ui text-[9.5px] uppercase tracking-[0.18em] text-ink/45">
                    {toppingDescriptor(t)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* SUPPORTING — smaller, calmer chips */}
      {supporting.length > 0 && (
        <>
          <p className="relative ui mt-10 text-[10px] uppercase tracking-[0.28em] text-ink/40">
            From the back of the kitchen
          </p>
          <div className="relative mt-4 flex flex-wrap gap-2.5">
            {supporting.map((t, i) => {
              const rot = ((i * 11) % 5) - 2;
              return (
                <button
                  key={t}
                  onClick={() => onPick(t)}
                  style={{ transform: `rotate(${rot * 0.2}deg)` }}
                  className="group inline-flex items-center gap-2 rounded-full border border-ink/12 bg-cream/80 px-3.5 py-1.5 text-left shadow-[0_4px_10px_-8px_hsl(20_30%_15%/0.35)] transition-all hover:-translate-y-0.5 hover:rotate-0 hover:border-tomato/60 hover:bg-cream hover:shadow-[0_10px_20px_-10px_hsl(0_93%_60%/0.4)]"
                >
                  <span className="text-sm leading-none">
                    {TOPPING_EMOJI[t] ?? "·"}
                  </span>
                  <span className="font-display text-[13.5px] font-bold tracking-tight text-ink/85">
                    {t}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {q && !toppings.some((t) => t.toLowerCase() === q) && (
        <button
          onClick={() => onPick(query.trim())}
          className="relative mt-6 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-tomato/40 bg-tomato/5 px-5 py-2.5 text-tomato hover:bg-tomato/10"
        >
          <Sparkles className="h-4 w-4" />
          <span className="font-display text-[16px] font-black">Use "{query.trim()}"</span>
        </button>
      )}

      <p className="relative ui mt-8 text-[10px] uppercase tracking-[0.24em] text-ink/35">
        Tap to choose · or type your own
      </p>
    </div>
  );
}


function CyclingStage({ pool, tick }: { pool: string[]; tick: number }) {
  const current = pool[tick % pool.length];
  const NOTES = ["nah", "too obvious", "watch this guy", "capo material", "this one?", "earner", "skip it"];
  // pick a slowly-rotating scribble note (changes every ~6 ticks)
  const note = NOTES[Math.floor(tick / 6) % NOTES.length];
  const crossed = pool[(tick + 3) % pool.length];
  const crossed2 = pool[(tick + 7) % pool.length];

  return (
    <div className="relative grid place-items-center py-20 md:py-28">
      <p className="overline text-tomato/80">The family is deliberating</p>

      {/* crossed-out candidates scribbled in margins */}
      <span className="handwritten pointer-events-none absolute left-[8%] top-[18%] hidden rotate-[-8deg] text-[18px] text-ink/55 md:block">
        <span className="relative">
          {crossed}
          <span aria-hidden className="absolute left-0 top-1/2 h-[2px] w-full bg-tomato/80" />
        </span>
      </span>
      <span className="handwritten pointer-events-none absolute right-[10%] top-[28%] hidden rotate-[6deg] text-[16px] text-ink/45 md:block">
        <span className="relative">
          {crossed2}
          <span aria-hidden className="absolute left-0 top-1/2 h-[2px] w-full bg-tomato/70" />
        </span>
      </span>
      <span className="handwritten pointer-events-none absolute right-[14%] bottom-[20%] hidden rotate-[-4deg] text-[20px] text-tomato md:block">
        {note}
      </span>

      <div className="mt-6 h-[clamp(3rem,7vw,5.5rem)] overflow-hidden">
        <div key={tick} className="cycle-in font-display text-[clamp(2rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.015em] text-ink/80" style={{ filter: "blur(0.4px)" }}>
          {current}
        </div>
      </div>
      <div className="mt-6 flex gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tomato" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tomato [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tomato [animation-delay:240ms]" />
      </div>
    </div>
  );
}

function FamilyFileCard({
  name,
  index,
  persona,
  isSelected,
  anySelected,
  onSelect,
}: {
  name: GeneratedName;
  index: number;
  persona: typeof CARD_PERSONALITIES[number];
  isSelected: boolean;
  anySelected: boolean;
  onSelect: () => void;
}) {
  const dimmed = anySelected && !isSelected;
  // Monogram from the alias initials — a tiny dossier mark, not an avatar
  const initials = name.name
    .replace(/["'"]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <button
      onClick={onSelect}
      style={{
        transform: `rotate(${isSelected ? 0 : persona.rotation}deg)`,
      }}
      className={`group relative flex flex-col rounded-[20px] border bg-cream p-4 pt-5 text-left transition-all duration-500 md:p-5 md:pt-6 ${persona.yOffset} ${
        isSelected
          ? "-translate-y-2 border-tomato/70 shadow-[0_36px_70px_-28px_hsl(0_93%_60%/0.55)] z-10"
          : "border-ink/12 hover:-translate-y-1.5 hover:rotate-0 hover:border-ink/30 hover:shadow-[0_22px_45px_-22px_hsl(0_0%_0%/0.4)]"
      } ${dimmed ? "opacity-90" : "opacity-100"}`}
    >
      {/* Layered paper texture */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[20px] grain opacity-40" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px]"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 0% 0%, hsl(40 35% 92% / 0.6), transparent 55%), radial-gradient(120% 80% at 100% 100%, hsl(28 30% 80% / 0.25), transparent 55%)",
        }}
      />
      {/* Subtle edge wear */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px]"
        style={{
          boxShadow:
            "inset 0 0 0 1px hsl(28 25% 18% / 0.04), inset 0 -22px 32px -28px hsl(28 30% 18% / 0.22)",
        }}
      />
      {/* Warm spotlight on hover/selected */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-500 ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70"
        }`}
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, hsl(46 100% 62% / 0.14), transparent 70%)",
        }}
      />

      {/* Header — file number only */}
      <div className="relative">
        <p className="ui text-[10px] uppercase tracking-[0.28em] text-ink/50">
          § Family file no. {persona.fileNo}
        </p>
      </div>

      {/* Implied portrait — monogram seal, no narration */}
      <div className="relative mt-4 flex items-center gap-3">
        <span
          aria-hidden
          className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-[1.5px] border-dashed border-ink/35 bg-cream/60 text-ink/70"
          style={{ transform: "rotate(-4deg)" }}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full grain opacity-40" />
          <span className="font-display relative text-[18px] font-black tracking-tight">
            {initials || "—"}
          </span>
        </span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      {/* Alias */}
      <h3 className="font-display relative mt-4 text-[clamp(1.35rem,1.6vw,1.85rem)] font-black leading-[1.05] tracking-[-0.01em] text-ink [text-wrap:balance]">
        {name.name}
        <span
          aria-hidden
          className={`absolute -bottom-1 left-0 h-[3px] bg-tomato transition-all duration-500 ${
            isSelected ? "w-[72%] opacity-100" : "w-0 opacity-0"
          }`}
          style={{ borderRadius: 2 }}
        />
      </h3>

      {/* Descriptor */}
      <p className="relative mt-2.5 text-[14px] leading-relaxed text-ink/75">
        {name.explanation}
      </p>

      {/* Tags — capped at 4, kept flavorful */}
      {name.style_tags?.length > 0 && (
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {name.style_tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="ui rounded-full border border-ink/15 bg-cream/60 px-2 py-0.5 text-[9.5px] uppercase tracking-[0.18em] text-ink/55"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* The single handwritten annotation — the only human voice on the card */}
      <span
        aria-hidden
        className={`handwritten pointer-events-none absolute -bottom-3 right-5 rotate-[-6deg] text-[17px] transition-all duration-500 ${
          isSelected ? "text-tomato opacity-100" : "text-ink/45 opacity-80"
        }`}
      >
        {persona.margin}
      </span>
    </button>
  );
}



function FinaleScene({
  phase,
  finalName,
  description,
  film,
  topping,
  avatarUrl,
  avatarLoading,
  onRegenerateAvatar,
  onShare,
  onReset,
}: {
  phase: number;
  finalName: string;
  description?: string;
  film: MafiaFilm | null;
  topping: string | null;
  avatarUrl: string | null;
  avatarLoading: boolean;
  onRegenerateAvatar: () => void;
  onShare: () => void;
  onReset: () => void;
}) {
  const archive = useMemo(() => familyArchiveNo(finalName + new Date().toDateString()), [finalName]);

  const downloadAvatar = async () => {
    if (!avatarUrl) return;
    try {
      const res = await fetch(avatarUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${finalName.replace(/[^a-z0-9]+/gi, "_")}_pizzadao.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      track(EVT.MAFIA_AVATAR_DOWNLOADED, {
        mafia_name: finalName,
        movie: film?.title,
        topping,
      });
    } catch {
      // ignore
    }
  };

  const copyImage = async () => {
    if (!avatarUrl) return;
    try {
      const res = await fetch(avatarUrl);
      const blob = await res.blob();
      const pngBlob: Blob = blob.type === "image/png"
        ? blob
        : await new Promise<Blob>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
              const c = document.createElement("canvas");
              c.width = img.width;
              c.height = img.height;
              c.getContext("2d")!.drawImage(img, 0, 0);
              c.toBlob((b) => resolve(b || blob), "image/png");
            };
            img.src = URL.createObjectURL(blob);
          });
      // @ts-ignore — ClipboardItem types vary across TS lib versions
      await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
      toast({ title: "Portrait copied", description: "Paste it anywhere — Discord, X, chats." });
    } catch {
      toast({ title: "Couldn't copy image", description: "Try downloading instead." });
    }
  };




  return (
    <section className="relative z-10">
      {/* Vignette */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}
        style={{
          background:
            "radial-gradient(70% 60% at 50% 40%, transparent 30%, hsl(20 25% 8% / 0.65) 100%)",
        }}
      />
      <div aria-hidden className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
        <div className="dust-drift absolute inset-0">
          <div className="film-flicker absolute inset-0 grain" />
        </div>
      </div>

      <div className="container relative z-10 py-10 md:py-14">
        {/* Dossier paper */}
        <div
          className={`relative mx-auto max-w-2xl ${phase >= 2 ? "paper-shake" : ""}`}
          style={{ transform: "rotate(-0.4deg)" }}
        >
          <div
            className="relative overflow-hidden rounded-[14px] border border-ink/15 bg-[hsl(40_38%_94%)] p-5 shadow-[0_50px_90px_-40px_hsl(20_30%_8%/0.7)] md:p-7"
            style={{
              backgroundImage:
                "radial-gradient(120% 70% at 50% 0%, hsl(46 100% 62% / 0.13), transparent 60%), radial-gradient(80% 60% at 100% 100%, hsl(20 40% 25% / 0.08), transparent 70%)",
            }}
          >
            {/* Layered materiality: fibrous stock + offset print noise + ambient grain */}
            <div aria-hidden className="film-flicker pointer-events-none absolute inset-0 grain opacity-50" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(92deg, hsl(28 20% 15% / 0.018) 0 1px, transparent 1px 3px), repeating-linear-gradient(2deg, hsl(28 20% 15% / 0.015) 0 1px, transparent 1px 4px)",
                mixBlendMode: "multiply",
              }}
            />
            {/* soft vignette lighting */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 0%, transparent 55%, hsl(20 30% 8% / 0.12) 100%)",
              }}
            />
            {/* edge wear */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[14px]"
              style={{
                boxShadow:
                  "inset 0 0 0 1px hsl(28 25% 18% / 0.05), inset 0 -22px 28px -24px hsl(28 30% 18% / 0.25), inset 0 22px 28px -28px hsl(40 35% 95% / 0.6)",
              }}
            />
            {/* coffee stain */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 top-12 h-24 w-24 rounded-full opacity-[0.12]"
              style={{ background: "radial-gradient(circle, hsl(20 50% 20%) 0%, transparent 70%)" }}
            />

            {/* TOP ROW: paperclip · family record label · archive # */}
            <div className="relative flex items-center gap-3 pb-2.5">
              <span
                aria-hidden
                className="inline-block h-5 w-3 shrink-0 rounded-full border-[2px] border-ink/45"
                style={{ borderBottomColor: "transparent", transform: "rotate(-12deg)" }}
              />
              <p className="ui flex-1 truncate text-[10px] uppercase tracking-[0.32em] text-ink/60">
                PizzaDAO · Family Record
              </p>
              <p className="ui shrink-0 text-[10px] uppercase tracking-[0.32em] text-ink/55">
                № {archive}
              </p>
            </div>
            <div className="relative h-px bg-ink/20" />

            {/* MAIN BODY: avatar | alias + approval + descriptor — tightened */}
            <div className="relative mt-4 grid grid-cols-[104px_1fr] gap-4 md:mt-5 md:grid-cols-[150px_1fr] md:gap-6">
              {/* Avatar */}
              <div className="relative">
                <div
                  className={`relative grid aspect-square w-full place-items-center overflow-hidden rounded-full border-[3px] border-ink/85 bg-butter/40 shadow-[0_16px_28px_-14px_hsl(20_30%_10%/0.5)] ${phase >= 2 ? "seal-stamp" : "opacity-0"}`}
                  style={{ transform: "rotate(-2deg)" }}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={`${finalName} mafia portrait`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid place-items-center text-center text-ink/55">
                      {avatarLoading ? (
                        <>
                          <div className="mb-1.5 h-5 w-5 animate-spin rounded-full border-2 border-tomato border-t-transparent" />
                          <p className="ui text-[8.5px] uppercase tracking-[0.28em]">
                            Inking<br />portrait
                          </p>
                        </>
                      ) : (
                        <p className="ui text-[8.5px] uppercase tracking-[0.28em]">Portrait<br />pending</p>
                      )}
                    </div>
                  )}
                  {/* photocopy softness on the portrait itself */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full grain opacity-30"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
              </div>

              {/* Alias + approval + descriptor — denser */}
              <div className="min-w-0 flex flex-col justify-center">
                <p className={`ui text-[9.5px] uppercase tracking-[0.32em] text-tomato transition-opacity duration-500 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
                  Status · Made
                </p>
                <h1
                  className={`font-display mt-1.5 text-[clamp(1.6rem,4.4vw,3rem)] font-black leading-[0.95] tracking-[-0.015em] text-ink transition-all duration-700 ${
                    phase >= 4 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 blur-sm"
                  }`}
                >
                  {finalName}
                </h1>
                <span
                  aria-hidden
                  className={`handwritten mt-1 inline-block rotate-[-3deg] text-[15px] text-tomato transition-opacity duration-500 ${phase >= 5 ? "opacity-100" : "opacity-0"}`}
                >
                  approved — Benny
                </span>
                {description && (
                  <p className={`mt-2 max-w-prose text-[13.5px] italic leading-snug text-ink/75 transition-opacity duration-700 ${phase >= 5 ? "opacity-100" : "opacity-0"}`}>
                    "{description}"
                  </p>
                )}
              </div>
            </div>

            {/* COMPACT METADATA ROW — tightened */}
            <div className={`relative mt-4 grid grid-cols-2 gap-x-5 gap-y-2.5 border-t border-ink/15 pt-3 transition-opacity duration-700 md:grid-cols-4 ${phase >= 5 ? "opacity-100" : "opacity-0"}`}>
              <DossierField label="Film" value={film?.title ?? "—"} />
              <DossierField label="Topping" value={topping ?? "—"} />
              <DossierField label="Initiated" value={`${new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`} />
              <DossierField label="Archive" value={`№ ${archive}`} />
            </div>

            {/* ONE stamped badge — embossed, uneven pressure, hand-stamped feel */}
            {phase >= 2 && (
              <span
                aria-hidden
                className="seal-stamp pointer-events-none absolute right-2 top-[62%] z-20 md:right-5 md:top-[40%]"
                style={{ transform: "rotate(-11deg)" }}
              >
                <span aria-hidden className="seal-spread absolute inset-0 -m-2 rounded-full bg-tomato/15" />
                {/* embossed shadow beneath the stamp (paper indent) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1"
                  style={{
                    borderRadius: "49% 51% 52% 48% / 50% 49% 51% 50%",
                    boxShadow:
                      "0 2px 0 hsl(40 35% 80% / 0.5), 0 10px 18px -10px hsl(20 40% 10% / 0.45)",
                  }}
                />
                <span
                  className="relative grid h-[68px] w-[68px] place-items-center text-tomato sm:h-[78px] sm:w-[78px] md:h-[100px] md:w-[100px]"
                  style={{
                    backgroundImage:
                      "radial-gradient(60% 60% at 32% 28%, hsl(0 93% 60% / 0.18), transparent 70%), radial-gradient(40% 40% at 75% 75%, hsl(0 93% 40% / 0.12), transparent 70%)",
                    border: "3px solid hsl(0 93% 45% / 0.82)",
                    boxShadow:
                      "inset 0 0 0 2px hsl(0 93% 45% / 0.28), inset 0 6px 14px -6px hsl(0 93% 30% / 0.5), inset 0 -4px 10px -6px hsl(40 35% 95% / 0.35), 0 6px 12px -8px hsl(20 40% 10% / 0.4)",
                    borderRadius: "48% 52% 53% 47% / 51% 48% 52% 49%",
                    filter: "contrast(1.06) saturate(1.04)",
                  }}
                >
                  {/* paper-absorption distress */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 grain"
                    style={{ borderRadius: "inherit", mixBlendMode: "multiply", opacity: 0.75 }}
                  />
                  {/* uneven pressure: faded patches where ink barely touched */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      borderRadius: "inherit",
                      backgroundImage:
                        "radial-gradient(25% 20% at 18% 22%, hsl(40 35% 94% / 0.55), transparent 70%), radial-gradient(18% 16% at 85% 60%, hsl(40 35% 94% / 0.45), transparent 70%)",
                      mixBlendMode: "screen",
                    }}
                  />
                  {/* uneven ink bleed pockets */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      borderRadius: "inherit",
                      backgroundImage:
                        "radial-gradient(20% 18% at 70% 25%, hsl(0 93% 30% / 0.38), transparent 70%), radial-gradient(15% 14% at 25% 75%, hsl(0 93% 30% / 0.32), transparent 70%), radial-gradient(8% 8% at 80% 80%, hsl(0 93% 30% / 0.5), transparent 70%)",
                      mixBlendMode: "multiply",
                    }}
                  />
                  <div className="relative text-center leading-tight">
                    <div className="font-display text-[10.5px] font-black uppercase tracking-[0.18em] md:text-[12px]">Officially</div>
                    <div className="font-display text-[15px] font-black uppercase tracking-[0.14em] md:text-[18px]">Made</div>
                    <div className="ui mt-0.5 text-[7.5px] uppercase tracking-[0.32em] opacity-80">PizzaDAO</div>
                  </div>
                </span>
              </span>
            )}
          </div>


          {/* Actions */}
          <div className={`mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-500 ${phase >= 6 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
            <button
              onClick={onShare}
              className="btn-pill-lg group whitespace-nowrap bg-tomato text-cream hover:bg-cream hover:text-ink"
            >
              Share on X
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            {avatarUrl && (
              <>
                <button
                  onClick={downloadAvatar}
                  className="btn-pill-lg group whitespace-nowrap border border-cream/30 bg-ink text-cream hover:bg-tomato"
                >
                  Download avatar
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={copyImage}
                  className="btn-pill-lg group whitespace-nowrap border border-cream/30 bg-transparent text-cream hover:border-tomato hover:text-tomato"
                >
                  <Copy className="h-4 w-4" />
                  Copy image
                </button>
              </>
            )}

            <button
              onClick={onRegenerateAvatar}
              disabled={avatarLoading}
              className="btn-pill-lg group border border-cream/30 bg-transparent text-cream hover:border-tomato hover:text-tomato disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${avatarLoading ? "animate-spin" : ""}`} />
              {avatarUrl ? "Re-draw portrait" : "Try portrait again"}
            </button>
            <a
              href="https://discord.pizzadao.xyz/"
              target="_blank"
              rel="noreferrer"
              className="btn-pill-lg group border border-cream/30 bg-transparent text-cream hover:border-tomato hover:text-tomato"
            >
              Join the Discord
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={onReset}
              className="btn-pill-lg group border border-cream/20 bg-transparent text-cream/80 hover:border-tomato hover:text-tomato"
            >
              <X className="h-4 w-4" />
              Start over
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DossierField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="ui text-[9px] uppercase tracking-[0.3em] text-ink/45">{label}</p>
      <p className="font-display mt-1.5 text-[15px] font-black leading-tight tracking-tight text-ink">
        {value}
      </p>
    </div>
  );
}

export default MafiaNamePage;
