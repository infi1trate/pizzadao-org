/**
 * Dashboard Home — placeholder shell.
 * One screen, one next move. Real content arrives in the next prompts.
 */
const DashboardHome = () => {
  return (
    <section className="pb-28 md:pb-0">
      <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">§ Members</p>
      <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.92] tracking-tight">
        Welcome back to{" "}
        <span className="handwritten text-tomato">the family</span>.
      </h1>
      <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink/70">
        This is your home base. Your single next move will live here — one card,
        lit up, every time you visit.
      </p>

      {/* Single next-move card (placeholder for the next prompt) */}
      <div className="mt-10 rounded-[28px] bg-butter/60 p-8 md:p-10 shadow-[0_1px_2px_hsl(30_20%_12%/0.05),0_18px_48px_-24px_hsl(30_20%_12%/0.22)]">
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-ink/55">
          Your next move
        </p>
        <h2 className="font-display mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1] tracking-tight">
          Coming together soon.
        </h2>
        <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink/70">
          Benny&rsquo;s in the back rolling dough. The first card lands here next.
        </p>
        <button
          type="button"
          className="btn-pill-lg mt-6 bg-ink text-cream hover:bg-tomato"
          style={{ ["--button-radius" as never]: "9999px" }}
        >
          <span className="handwritten text-cream">stay tuned</span>
        </button>
      </div>
    </section>
  );
};

export default DashboardHome;
