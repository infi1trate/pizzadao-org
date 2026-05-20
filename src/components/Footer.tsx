import logoLight from "@/assets/logo-light.svg";

const cols = [
  { title: "Sections", items: ["About", "Our Work", "Partners", "Journal", "Join"] },
  { title: "Programs", items: ["Global Pizza Party", "Community Grants", "Field Reports", "Residencies"] },
  { title: "Press", items: [{ label: "Brand System", href: "/brand-system" }, "Editorial Standards", { label: "Contact", href: "/contact" }, "Inquiries"] as Array<string | { label: string; href: string }> },
  { title: "Elsewhere", items: ["Instagram", "X / Twitter", "YouTube", "Newsletter"] },
];

const Footer = () => {
  return (
    <footer className="paper-soft paper-soft-dark paper-drift relative overflow-hidden bg-ink text-cream">
      {/* Faint warm wash — establishment, not promotion */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full opacity-[0.07] blur-[140px]"
        style={{ background: "hsl(var(--tomato))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-[140px]"
        style={{ background: "hsl(var(--butter))" }}
      />

      <div className="container relative py-20 md:py-24">
        <div className="grid grid-cols-12 gap-x-8 gap-y-14 md:gap-x-12">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center">
              <img src={logoLight} alt="PizzaDAO" className="h-8 w-auto md:h-9" />
            </div>
            <p className="font-serif mt-7 max-w-sm text-[15px] leading-[1.65] text-cream/65">
              A global community built around pizza, generosity, and the
              people who show up.
            </p>
            <div className="mt-10 flex items-baseline gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-tomato/80" />
              <span className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/45">
                Made worldwide · Est. 2021
              </span>
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-10 md:col-span-7 md:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="ui text-[9.5px] font-medium uppercase tracking-[0.24em] text-cream/45">
                  {c.title}
                </div>
                <ul className="mt-5 space-y-3">
                  {c.items.map((i) => {
                    const item = typeof i === "string" ? { label: i, href: "#" } : i;
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="font-serif text-[14px] text-cream/80 transition-colors duration-300 hover:text-butter"
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

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 md:flex-row md:items-center">
          <span className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/40">
            © {new Date().getFullYear()} PizzaDAO · A global cultural programme
          </span>
          <div className="flex gap-8">
            <a href="/privacy" className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/50 transition-colors hover:text-butter">Privacy</a>
            <a href="/terms" className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/50 transition-colors hover:text-butter">Terms</a>
            <a href="#" className="ui text-[10px] font-medium uppercase tracking-[0.24em] text-cream/50 transition-colors hover:text-butter">Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
