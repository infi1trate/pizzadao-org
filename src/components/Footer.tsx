import { useEffect, useState } from "react";
import logoLight from "@/assets/logo-light.svg";

const cols = [
  { title: "More", items: ["About", "Global Pizza Party", { label: "Partners", href: "/partners" }, "Journal", "Join"] as Array<string | { label: string; href: string }> },
  { title: "Press", items: [{ label: "Brand System", href: "https://pizzadao.xyz/brand" }, "Editorial Standards", { label: "Contact", href: "/contact" }, "Inquiries"] as Array<string | { label: string; href: string }> },
  { title: "Elsewhere", items: [{ label: "Instagram", href: "https://www.instagram.com/Pizza_DAO/" }, { label: "X / Twitter", href: "https://x.com/Pizza_DAO" }, { label: "YouTube", href: "https://www.youtube.com/@PizzaDAO" }, { label: "Newsletter", href: "/#newsletter" }] as Array<string | { label: string; href: string }> },
];

const PHRASES = [
  "Pizza the planet",
  "Slice by slice",
  "See you May 22",
  "The internet needed a table",
  "People kept showing up",
  "Every city does it differently",
  "Global Pizza Party",
  "Powered by mozzarella",
  "Internet coordination, real-world pizza",
  "Somewhere near you, pizza is already bringing people together",
];

const RotatingTagline = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length);
        setShow(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/40 transition-opacity duration-500"
      style={{ opacity: show ? 1 : 0 }}
    >
      {PHRASES[index]}
    </span>
  );
};

const Footer = () => {
  return (
    <footer className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-ink text-cream">
      {/* Restrained warm atmosphere - establishment, not promotion */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-24 h-[440px] w-[440px] rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: "hsl(var(--tomato))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "hsl(var(--butter))" }}
      />
      {/* Soft grain - calm texture */}
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.10]" />
      {/* Faint edge rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-cream/8" aria-hidden />

      <div className="container relative py-16 md:py-20">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 md:gap-x-12">
          {/* Left: identity + promise */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center">
              <img src={logoLight} alt="PizzaDAO" className="h-7 w-auto md:h-8" />
            </div>
            <p className="font-serif mt-5 max-w-sm text-[15px] leading-[1.6] text-cream/60">
              A global community built around pizza, generosity, and the people who show up.
            </p>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-tomato/70" />
              <RotatingTagline />
            </div>
          </div>

          {/* Right: link columns */}
          <div className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-10 md:col-span-7 md:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/40">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((i) => {
                    const item = typeof i === "string" ? { label: i, href: "#" } : i;
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="font-serif text-[14px] text-cream/75 transition-colors duration-300 hover:text-butter"
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar - calm, established */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/8 pt-6 md:flex-row md:items-center">
          <span className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/35">
            © {new Date().getFullYear()} PizzaDAO · A global cultural programme
          </span>
          <div className="flex gap-6">
            <a href="/privacy" className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/45 transition-colors hover:text-butter">Privacy</a>
            <a href="/terms" className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/45 transition-colors hover:text-butter">Terms</a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
