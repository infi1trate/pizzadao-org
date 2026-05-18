import { useEffect, useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Pixels of vertical drift across the visible window. Default 40. */
  intensity?: number;
  className?: string;
};

/**
 * Subtle scroll-driven parallax. Wrap a decorative element to drift it
 * vertically as the section enters/exits the viewport. Respects
 * prefers-reduced-motion.
 */
const Parallax = ({ children, intensity = 40, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (above) → 0 (centered) → 1 (below)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(-1, Math.min(1, progress)) * intensity;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
};

export default Parallax;
