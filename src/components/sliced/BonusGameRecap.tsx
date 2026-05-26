import { useState } from "react";
import { GAME_STATS } from "./data";
import { useCountUp, useReveal } from "./useReveal";

const TicketCounter = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const n = useCountUp(value, shown, 1800 + delay);
  return (
    <div ref={ref} className="relative">
      <div className="overline text-butter/70">{label}</div>
      <div
        className="font-display mt-1 text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-none text-butter tabular-nums"
        style={{ fontFeatureSettings: '"tnum"' }}
      >
        {n.toLocaleString()}
      </div>
    </div>
  );
};

const BonusGameRecap = () => {
  const [combo, setCombo] = useState(0);
  const [shake, setShake] = useState(false);

  const onTap = () => {
    setCombo((c) => c + 1);
    setShake(true);
    setTimeout(() => setShake(false), 200);
  };

  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, hsl(var(--tomato) / 0.18) 0 12px, transparent 12px 28px)",
        }}
      />
      <div className="container relative py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="overline text-butter">§ 05 · Bonus game recap</div>
          <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] font-black leading-[0.92]">
            The arcade <span className="text-tomato">ate well</span> too.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-snug text-cream/75">
            GlobalPizza.Party players tapped, dropped, and stacked their way into
            the recap. Every counter below is a real thing humans did with their
            thumbs in 2026.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {GAME_STATS.map((g, i) => (
            <div
              key={g.game}
              className="relative overflow-hidden rounded-2xl border border-cream/15 bg-cream/[0.04] p-7 backdrop-blur-sm transition-transform hover:-translate-y-1"
            >
              {/* Carnival bulbs */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, hsl(var(--butter)) 0 8px, hsl(var(--tomato)) 8px 16px)",
                }}
              />
              <div className="flex items-baseline justify-between">
                <div className="font-display text-3xl font-black leading-none">{g.game}</div>
                <div className="ui text-[10px] font-bold uppercase tracking-[0.22em] text-butter">
                  № 0{i + 1}
                </div>
              </div>
              <p className="mt-3 text-sm text-cream/75">{g.blurb}</p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <TicketCounter value={g.taps} label="Taps" delay={i * 120} />
                <TicketCounter value={g.sessions} label="Sessions" delay={i * 120 + 80} />
              </div>
            </div>
          ))}
        </div>

        {/* Mini combo moment */}
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="overline text-cream/55">Tap a floating pizza · live combo</div>
          <button
            type="button"
            onClick={onTap}
            className={`mt-4 inline-flex h-28 w-28 items-center justify-center rounded-full bg-tomato text-5xl shadow-[0_18px_40px_-12px_hsl(var(--tomato)/0.7)] transition-transform allow-touch-hover hover:scale-105 active:scale-95 ${shake ? "animate-[pulse_0.2s_ease-out]" : ""}`}
            aria-label="Tap the pizza"
          >
            🍕
          </button>
          <div className="font-display mt-5 text-4xl font-black text-butter tabular-nums">
            {combo > 0 ? `+${combo} combo` : "Tap me"}
          </div>
          {combo >= 10 && (
            <div className="ui mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-tomato">
              You&apos;re unhinged. We love that.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BonusGameRecap;
