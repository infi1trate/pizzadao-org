import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/#work" },
  { label: "Partners", href: "/partners" },
  { label: "Community", href: "/community" },
];

type Props = { solid?: boolean };

const SiteNav = ({ solid = false }: Props) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const onRed = !solid && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        onRed
          ? "bg-transparent"
          : "bg-cream/90 backdrop-blur shadow-[0_1px_0_0_hsl(var(--ink)/0.10)]"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center" aria-label="PizzaDAO home">
          <img
            src={onRed ? logoLight : logoDark}
            alt="PizzaDAO"
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.href}
              className={`ui text-sm font-medium tracking-wide transition-colors ${
                onRed
                  ? "text-cream/90 hover:text-butter"
                  : "text-foreground/80 hover:text-tomato"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://app.pizzadao.org"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-pill border ${
              onRed
                ? "border-cream/40 text-cream/90 hover:border-cream hover:text-cream"
                : "border-ink/30 text-ink/80 hover:border-ink hover:text-ink"
            }`}
          >
            Member login
          </a>
          <Link
            to="/join"
            className={`btn-pill ${
              onRed
                ? "bg-cream text-ink hover:bg-butter"
                : "bg-ink text-cream hover:bg-tomato"
            }`}
          >
            Join
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`-mr-2 flex h-11 w-11 items-center justify-center md:hidden ${
            onRed ? "text-cream" : "text-ink"
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream">
          <div className="container flex flex-col gap-0 border-t border-ink/15 py-2">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.href}
                onClick={() => setOpen(false)}
                className="ui flex min-h-[52px] items-center border-b border-ink/10 text-base font-semibold tracking-wide text-foreground/85 transition-colors hover:text-tomato"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/join"
              onClick={() => setOpen(false)}
              className="btn-pill mt-4 mb-3 bg-tomato text-cream"
            >
              Join the Pizza Mafia →
            </Link>
            <div className="mt-2 flex gap-6 border-t border-ink/10 pt-4">
              <Link
                to="/privacy"
                onClick={() => setOpen(false)}
                className="ui text-xs uppercase tracking-[0.18em] text-ink/55 hover:text-tomato"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                onClick={() => setOpen(false)}
                className="ui text-xs uppercase tracking-[0.18em] text-ink/55 hover:text-tomato"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
