import { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, Menu, X as XIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import StatusStrip from "./StatusStrip";
import { useMemberStatus } from "./useMemberStatus";

/**
 * Members dashboard shell — the "OS menu bar" of the kitchen.
 *
 * Two top-level states:
 *   - Pre-made (no member status yet) → only Home is active; the rest of
 *     the rooms are dimmed with small lock icons, the status strip is
 *     hidden. The kitchen is intentionally a sheltered antechamber.
 *   - Made → full kitchen unlocked. On the FIRST render after the
 *     celebration finishes, a one-shot "kitchen just opened" reveal
 *     animation plays on the top nav and status strip.
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

const useJustMadeReveal = (isMade: boolean) => {
  const [justMade, setJustMade] = useState(false);
  useEffect(() => {
    if (!isMade) return;
    try {
      if (sessionStorage.getItem("pd-just-made") === "1") {
        setJustMade(true);
        sessionStorage.removeItem("pd-just-made");
      }
    } catch { /* ignore */ }
  }, [isMade]);
  return justMade;
};

const DashboardLayout = () => {
  const memberStatus = useMemberStatus();
  const isMade = memberStatus !== null;
  const justMade = useJustMadeReveal(isMade);

  return (
    <div className="min-h-[100svh] bg-[hsl(44_70%_96%)] text-ink">
      <TopNav isMade={isMade} justMade={justMade} />
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
const TopNav = ({ isMade, justMade }: { isMade: boolean; justMade: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const renderItem = (
    { to, label, end }: (typeof nav)[number],
    variant: "desktop" | "mobile",
  ) => {
    const locked = !isMade && to !== "/dashboard";
    const base =
      variant === "desktop"
        ? "ui shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] font-medium"
        : "ui flex items-center justify-between w-full rounded-2xl px-4 py-3 text-[16px] font-medium";

    if (locked) {
      return (
        <button
          key={to}
          type="button"
          aria-disabled
          title="Unlocks when you're made"
          onClick={() => {
            setMobileOpen(false);
            toast(`${label} unlocks once you're made.`, {
              description: "Finish the 5 steps to open the kitchen.",
            });
          }}
          className={cn(
            base,
            "text-ink/30 cursor-not-allowed",
            variant === "desktop" && "inline-flex items-center gap-1.5",
          )}
        >
          <span className={variant === "mobile" ? "flex items-center gap-2" : "contents"}>
            <Lock className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
            <span className="whitespace-nowrap">{label}</span>
          </span>
        </button>
      );
    }
    return (
      <NavLink
        key={to}
        to={to}
        end={end}
        className={({ isActive }) =>
          cn(
            base,
            "transition-colors",
            isActive
              ? "bg-butter text-ink shadow-[0_1px_0_hsl(40_50%_70%/0.5)_inset,0_1px_2px_hsl(30_25%_12%/0.1)]"
              : "text-ink/65 hover:bg-ink/[0.04] hover:text-ink",
          )
        }
      >
        {label}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[hsl(var(--rule-warm))]/50 bg-[hsl(46_85%_94%)]/92 backdrop-blur-md shadow-[0_1px_0_hsl(0_0%_100%/0.6)_inset,0_1px_2px_hsl(30_25%_12%/0.05),0_10px_24px_-18px_hsl(30_25%_12%/0.22)]">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-3 md:gap-6 md:px-8">
        {/* Mobile hamburger — visible <md only */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream ring-1 ring-ink/10 text-ink/75 hover:text-ink hover:bg-butter/40 transition-colors"
        >
          {mobileOpen ? (
            <XIcon className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Menu className="h-4 w-4" strokeWidth={2} />
          )}
        </button>

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

        {/* Desktop nav — hidden on small screens (mobile uses the sheet) */}
        <nav
          className={cn(
            "hidden md:flex -mx-2 min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            justMade && "[&>*]:animate-fade-in",
          )}
        >
          {nav.map((item) => renderItem(item, "desktop"))}
        </nav>

        {/* Spacer on mobile so the avatar stays on the right */}
        <span className="flex-1 md:hidden" />

        <AvatarMenu />
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-[57px] z-40 bg-ink/40 animate-fade-in"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute inset-x-0 top-0 bg-[hsl(46_85%_94%)] border-b border-[hsl(var(--rule-warm))]/60 shadow-[0_10px_24px_-12px_hsl(30_25%_12%/0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="mx-auto flex max-w-[1280px] flex-col gap-1.5 px-5 py-5">
              {nav.map((item) => renderItem(item, "mobile"))}
            </nav>
          </div>
        </div>
      )}
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
