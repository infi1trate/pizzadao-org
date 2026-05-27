import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Users, Award, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusStrip from "./StatusStrip";
import { useMemberStatus } from "./useMemberStatus";

/**
 * Members-only dashboard shell.
 * Design system: Asap/Asap Condensed display, Solway/Asap body, cream background,
 * butter + tomato accents, soft pill nav, warm hairline borders, no harsh dividers.
 *
 * Layout principle: one primary surface, one lit-up next move. The rail is quiet;
 * the canvas does the talking. Sections will be filled in subsequent prompts.
 */

const nav = [
  { to: "/dashboard", label: "Home", icon: Home, end: true },
  { to: "/dashboard/events", label: "Events", icon: Calendar },
  { to: "/dashboard/crew", label: "The Family", icon: Users },
  { to: "/dashboard/recognition", label: "Recognition", icon: Award },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const active = nav.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)));

  return (
    <div className="min-h-[100svh] bg-cream text-ink">
      {/* Quiet top bar — keeps the dashboard distinct from the marketing site */}
      <header className="sticky top-0 z-30 border-b border-[hsl(var(--rule-warm))]/40 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 md:px-8">
          <NavLink to="/dashboard" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-7 w-7 rounded-full bg-tomato shadow-[0_1px_2px_hsl(0_0%_8%/0.12)]"
            />
            <span className="font-display text-[17px] font-extrabold tracking-tight">
              PizzaDAO <span className="text-ink/45 font-medium">/ members</span>
            </span>
          </NavLink>

          <div className="hidden items-center gap-3 md:flex">
            <span className="ui text-[12px] text-ink/55">
              {active ? active.label : "Members"}
            </span>
            <div className="h-7 w-7 rounded-full bg-butter ring-1 ring-ink/10" aria-hidden />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1280px] gap-8 px-5 py-8 md:px-8 md:py-12">
        {/* Side rail — restrained, soft pills, no heavy lines */}
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-24 flex flex-col gap-1">
            {nav.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "ui group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-[14px] font-medium transition-colors",
                    isActive
                      ? "bg-ink text-cream"
                      : "text-ink/70 hover:bg-ink/[0.04] hover:text-ink",
                  )
                }
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Canvas */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom rail */}
      <nav className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-full border border-[hsl(var(--rule-warm))]/50 bg-cream/95 px-3 py-2 shadow-[0_1px_2px_hsl(30_20%_12%/0.04),0_8px_28px_-18px_hsl(30_20%_12%/0.18)] backdrop-blur md:hidden">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 transition-colors",
                isActive ? "bg-ink text-cream" : "text-ink/60",
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span className="ui text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DashboardLayout;
