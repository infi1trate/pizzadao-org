import { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import StatusStrip from "./StatusStrip";
import { useMemberStatus } from "./useMemberStatus";

/**
 * Members dashboard shell — the "OS menu bar" of the kitchen.
 *
 * Top nav (horizontal) holds the seven rooms. The Path (missions/leveling)
 * is intentionally NOT here — it's reached by tapping the Level pill in the
 * status strip below. The avatar on the right opens a dropdown that holds
 * profile / settings / connected accounts / sign out.
 */

const nav = [
  { to: "/dashboard",             label: "Home",        end: true },
  { to: "/dashboard/events",      label: "Events" },
  { to: "/dashboard/family",      label: "Family" },
  { to: "/dashboard/bounties",    label: "Bounties" },
  { to: "/dashboard/shop",        label: "Shop" },
  { to: "/dashboard/arcade",      label: "Arcade" },
  { to: "/dashboard/recognition", label: "Recognition" },
];

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const active = nav.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)));
  const memberStatus = useMemberStatus();

  return (
    <div className="min-h-[100svh] bg-[hsl(44_70%_96%)] text-ink">
      <TopNav />
      <StatusStrip status={memberStatus} />

      <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-12">
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Top nav — the "menu bar" of the OS. Window-chrome metaphor applied
   lightly: hairline under the bar, layered soft shadow, cream surface.
   ──────────────────────────────────────────────────────────────────────── */
const TopNav = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-[hsl(var(--rule-warm))]/50 bg-[hsl(46_85%_94%)]/92 backdrop-blur-md shadow-[0_1px_0_hsl(0_0%_100%/0.6)_inset,0_1px_2px_hsl(30_25%_12%/0.05),0_10px_24px_-18px_hsl(30_25%_12%/0.22)]">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-3 md:gap-6 md:px-8">
        {/* Mark */}
        <Link to="/dashboard" className="flex shrink-0 items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-butter ring-1 ring-ink/10 shadow-[0_1px_2px_hsl(30_25%_12%/0.12),0_2px_0_hsl(40_50%_70%/0.5)_inset]"
          >
            <span className="block h-3 w-3 rounded-full bg-tomato" />
          </span>
          <span className="font-display hidden text-[17px] font-extrabold tracking-tight sm:inline">
            PizzaDAO <span className="text-ink/45 font-medium">/ kitchen</span>
          </span>
        </Link>

        {/* Nav items — horizontally scrollable on small screens */}
        <nav className="-mx-2 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "ui shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-butter text-ink shadow-[0_1px_0_hsl(40_50%_70%/0.5)_inset,0_1px_2px_hsl(30_25%_12%/0.1)]"
                    : "text-ink/65 hover:bg-ink/[0.04] hover:text-ink",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <AvatarMenu />
      </div>
    </header>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Avatar dropdown — profile / settings / connected accounts / sign out.
   Sign out is real; other items route to placeholder pages for now.
   ──────────────────────────────────────────────────────────────────────── */
const AvatarMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  const signOut = async () => {
    setOpen(false);
    try {
      await supabase.auth.signOut();
    } catch {
      /* ignore — still navigate home */
    }
    navigate("/");
  };

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="block h-9 w-9 rounded-full bg-butter ring-1 ring-ink/10 shadow-[0_1px_0_hsl(40_50%_70%/0.5)_inset,0_1px_2px_hsl(30_25%_12%/0.12)] transition-transform hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        style={{ ["--button-radius" as never]: "9999px" }}
      />
      {open && (
        <div
          role="menu"
          className="window absolute right-0 mt-2 w-60 origin-top-right animate-fade-in p-0"
          style={{ borderRadius: 20 }}
        >
          <div className="window-bar" style={{ padding: "0.625rem 0.875rem" }}>
            <span className="window-sticker" aria-hidden>👋</span>
            <span className="window-bar-label">§ Account</span>
            <span className="flex-1" />
            <span className="window-dots" aria-hidden><i /><i /><i /></span>
          </div>
          <div className="p-1.5">
            <MenuItem onClick={() => go("/dashboard/profile")}>My profile</MenuItem>
            <MenuItem onClick={() => go("/dashboard/settings")}>Settings</MenuItem>
            <MenuItem onClick={() => go("/dashboard/connections")}>Connected accounts</MenuItem>
            <div className="my-1.5 h-px bg-[hsl(var(--rule-warm))]/55" />
            <MenuItem onClick={signOut} danger>Sign out</MenuItem>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    type="button"
    role="menuitem"
    onClick={onClick}
    className={cn(
      "ui w-full whitespace-nowrap rounded-xl px-3 py-2 text-left text-[14px] font-medium transition-colors",
      danger
        ? "text-tomato hover:bg-tomato/10"
        : "text-ink/80 hover:bg-ink/[0.05] hover:text-ink",
    )}
  >
    {children}
  </button>
);

export default DashboardLayout;
