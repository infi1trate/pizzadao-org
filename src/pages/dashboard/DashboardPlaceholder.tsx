import { useLocation } from "react-router-dom";
import Window from "./components/Window";

/**
 * Temporary placeholder for dashboard rooms not yet built.
 * Uses the shared Window chrome so the room still feels like the kitchen.
 */
const labels: Record<string, { label: string; sticker: string; title: string }> = {
  "/dashboard/events":      { label: "Events",            sticker: "📅", title: "Events" },
  "/dashboard/family":      { label: "The family",        sticker: "👥", title: "The family" },
  "/dashboard/bounties":    { label: "Bounties",          sticker: "🪙", title: "Bounties" },
  "/dashboard/shop":        { label: "Shop",              sticker: "🛍", title: "Shop" },
  "/dashboard/arcade":      { label: "Arcade",            sticker: "🕹", title: "Arcade" },
  "/dashboard/recognition": { label: "Recognition",       sticker: "🏅", title: "Recognition" },
  "/dashboard/profile":     { label: "My profile",        sticker: "🙂", title: "My profile" },
  "/dashboard/settings":    { label: "Settings",          sticker: "⚙",  title: "Settings" },
  "/dashboard/connections": { label: "Connected accounts", sticker: "🔗", title: "Connected accounts" },
};

const DashboardPlaceholder = () => {
  const { pathname } = useLocation();
  const meta = labels[pathname] ?? { label: "Coming soon", sticker: "✶", title: "Coming soon" };

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <Window label={meta.label} sticker={meta.sticker}>
        <p className="ui text-[12px] uppercase tracking-[0.18em] text-ink/45">
          Placeholder
        </p>
        <h1 className="font-display mt-2 text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-[1.02] tracking-tight">
          {meta.title}
        </h1>
        <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink/70">
          This room is being built. The chrome is in; the contents land soon.
        </p>
      </Window>
    </section>
  );
};

export default DashboardPlaceholder;
