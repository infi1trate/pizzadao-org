import logoLight from "@/assets/logo-light.svg";

const cols = [
  { title: "Sections", items: ["About", "Our Work", "Partners", "Journal", "Join"] },
  { title: "Programs", items: ["Global Pizza Party", "Community Grants", "Field Reports", "Residencies"] },
  { title: "Press", items: [{ label: "Brand System", href: "/brand-system" }, "Editorial Standards", { label: "Contact", href: "/contact" }, "Inquiries"] as Array<string | { label: string; href: string }> },
  { title: "Elsewhere", items: ["Instagram", "X / Twitter", "YouTube", "Newsletter"] },
];

const Footer = () => {
  return (
    <footer className="bg-ink text-cream">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center">
              <img src={logoLight} alt="PizzaDAO" className="h-8 w-auto md:h-9" />
            </div>
            <p className="font-serif mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
              A global community built around pizza, generosity, and the
              people who show up.
            </p>
            <div className="ui mt-8 text-[11px] uppercase tracking-[0.2em] text-cream/45">
              Made worldwide · Est. 2021
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="ui text-[11px] font-semibold uppercase tracking-[0.2em] text-tomato">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2">
                  {c.items.map((i) => {
                    const item = typeof i === "string" ? { label: i, href: "#" } : i;
                    return (
                      <li key={item.label}>
                        <a href={item.href} className="ui text-sm text-cream/85 hover:text-tomato">{item.label}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-6 md:flex-row md:items-center">
          <span className="ui text-xs tracking-wider text-cream/50">
            © {new Date().getFullYear()} PizzaDAO. All slices reserved.
          </span>
          <div className="flex gap-6">
            <a href="/privacy" className="ui text-xs tracking-wider text-cream/60 hover:text-tomato">Privacy</a>
            <a href="/terms" className="ui text-xs tracking-wider text-cream/60 hover:text-tomato">Terms</a>
            <a href="#" className="ui text-xs tracking-wider text-cream/60 hover:text-tomato">Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
