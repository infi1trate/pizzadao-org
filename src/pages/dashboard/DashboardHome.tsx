import Window from "./components/Window";
import NukeAccount from "./NukeAccount";

/**
 * Dashboard Home — TEMPORARY placeholder while we rebuild.
 *
 * The room is being repainted. One placeholder window is shown so we can
 * verify the shared chrome (title bar, sticker, three-dot menu, layered
 * shadow, soft pill corners) reads correctly before sections are rebuilt.
 *
 * Existing section components (path, week, destinations, onboarding,
 * celebration, next-move) are intentionally NOT rendered here — they will
 * be re-introduced one at a time, each wrapped in <Window>.
 */
const DashboardHome = () => {
  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
        § A note from Benny
      </p>
      <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.94] tracking-tight">
        Welcome to the <span className="handwritten text-tomato">kitchen</span>.
      </h1>
      <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink/70">
        We&rsquo;re repainting the room. New windows go in one at a time.
      </p>

      {/* Single placeholder window — verify chrome reads correctly */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Window label="Your next move" sticker="🍕">
          <p className="ui text-[12px] uppercase tracking-[0.18em] text-ink/45">
            Placeholder
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.02] tracking-tight">
            This is a window.
          </h2>
          <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink/70">
            Title bar up top, sticker on the left, quiet three-dot menu on the
            right. Hairline underneath. Soft layered shadow so it sits on the
            desk. Real content lands here next.
          </p>
        </Window>

        <Window label="The family is cooking" sticker="✶" tone="butter">
          <p className="ui text-[12px] uppercase tracking-[0.18em] text-ink/45">
            Tone: butter
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.02] tracking-tight">
            Same chrome, warmer surface.
          </h2>
          <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink/70">
            Butter for warmth and celebration moments. Cream is the default.
            Ink is reserved for serious institutional cards.
          </p>
        </Window>
      </div>

      <NukeAccount />
    </section>
  );
};

export default DashboardHome;
