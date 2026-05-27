import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Window — the shared "card-as-window-on-a-desk" surface for the member
 * dashboard. Every dashboard card uses this chrome so the kitchen reads
 * as one consistent room.
 *
 * Anatomy:
 *   [ sticker ]  § SECTION LABEL                          [ ⋯ ]
 *   ────────────────────────────────────────────────────────────
 *                            content
 *
 * Tones:
 *   - cream  (default) — most cards, calm paper surface
 *   - butter — warmth / celebration moments
 *   - paper  — even quieter, sits behind everything else
 *   - ink    — institutional, used sparingly for serious moments
 *
 * The three-dot menu is visual-only for now; wire later.
 * Stickers live IN the title bar (a Benny, a pepperoni, a calendar).
 * Hand-drawn illustrated moments (BennyPeek etc.) go in the *margins*,
 * not in here — keep this component disciplined.
 */

type Tone = "cream" | "butter" | "paper" | "ink";

export interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  sticker?: React.ReactNode;
  tone?: Tone;
  bodyClassName?: string;
  /** Hide the title bar entirely (rare; e.g. for the hero next-move card) */
  bare?: boolean;
}

const toneClass: Record<Tone, string> = {
  cream: "",
  butter: "window-butter",
  paper: "window-paper",
  ink: "window-ink",
};

const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  (
    { label, sticker, tone = "cream", bare = false, className, bodyClassName, children, ...rest },
    ref,
  ) => {
    return (
      <article ref={ref} className={cn("window", toneClass[tone], className)} {...rest}>
        {!bare && (
          <div className="window-bar">
            {sticker && <span className="window-sticker" aria-hidden>{sticker}</span>}
            <span className="window-bar-label">§ {label}</span>
            <span className="flex-1" />
            <button
              type="button"
              aria-label="Window options"
              className="window-dots"
              tabIndex={-1}
            >
              <i /><i /><i />
            </button>
          </div>
        )}
        <div className={cn("window-body", bodyClassName)}>{children}</div>
      </article>
    );
  },
);
Window.displayName = "Window";

export default Window;
