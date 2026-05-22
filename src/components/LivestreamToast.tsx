import { useEffect, useRef, useState } from "react";
import { X, Minus, Play, ExternalLink } from "lucide-react";

const VIDEO_ID = "H5JlCnxBVqQ";
const WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const DISMISS_KEY = "gpp2026_livestream_toast_dismissed";

const embedSrc = (opts: { muted: boolean; autoplay: boolean; controls: boolean }) =>
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1` +
  `&autoplay=${opts.autoplay ? 1 : 0}` +
  `&mute=${opts.muted ? 1 : 0}` +
  `&controls=${opts.controls ? 1 : 0}` +
  `&playsinline=1`;

const LivestreamToast = () => {
  const [visible, setVisible] = useState(false);
  const [popped, setPopped] = useState(false);
  const [minimized, setMinimized] = useState(false);

  // Pop-out window position (desktop)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRef = useRef<{ dx: number; dy: number; dragging: boolean }>({
    dx: 0,
    dy: 0,
    dragging: false,
  });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setVisible(true), 4000);
    return () => window.clearTimeout(t);
  }, []);

  // Initialize pop-out near bottom-right
  useEffect(() => {
    if (!popped) return;
    const w = 480;
    const h = 320;
    const margin = 24;
    setPos({
      x: Math.max(margin, window.innerWidth - w - margin),
      y: Math.max(margin, window.innerHeight - h - margin),
    });
  }, [popped]);

  // Drag handlers
  useEffect(() => {
    if (!popped) return;
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.dragging) return;
      const w = windowRef.current?.offsetWidth ?? 480;
      const h = windowRef.current?.offsetHeight ?? 320;
      const nx = Math.min(
        Math.max(0, e.clientX - dragRef.current.dx),
        window.innerWidth - w,
      );
      const ny = Math.min(
        Math.max(0, e.clientY - dragRef.current.dy),
        window.innerHeight - h,
      );
      setPos({ x: nx, y: ny });
    };
    const onUp = () => {
      dragRef.current.dragging = false;
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [popped]);

  const startDrag = (e: React.MouseEvent) => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    dragRef.current = {
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
      dragging: true,
    };
    document.body.style.userSelect = "none";
  };

  const dismiss = () => {
    setVisible(false);
    setPopped(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!visible) return null;

  // -------- POP-OUT PLAYER --------
  if (popped && !minimized) {
    return (
      <div
        ref={windowRef}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: "min(92vw, 480px)",
        }}
        className="fixed z-[80] overflow-hidden rounded-2xl border border-ink/15 bg-ink text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
      >
        <div
          onMouseDown={startDrag}
          className="flex cursor-grab items-center justify-between gap-3 bg-ink px-3 py-2 active:cursor-grabbing"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tomato opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tomato" />
            </span>
            <span className="ui truncate text-[10px] uppercase tracking-[0.18em] text-cream/80">
              Global Pizza Party · Live
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized(true)}
              aria-label="Minimize"
              className="grid h-7 w-7 place-items-center rounded-full text-cream/80 hover:bg-cream/10 hover:text-cream"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={dismiss}
              aria-label="Close player"
              className="grid h-7 w-7 place-items-center rounded-full text-cream/80 hover:bg-cream/10 hover:text-cream"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            title="PizzaDAO Global Pizza Party livestream"
            src={embedSrc({ muted: false, autoplay: true, controls: true })}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <a
            href={WATCH_URL}
            target="_blank"
            rel="noreferrer"
            className="ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-tomato px-3 py-1.5 text-[11px] font-semibold text-cream transition-colors hover:bg-tomato/90"
          >
            <ExternalLink className="h-3 w-3" />
            Open on YouTube
          </a>
          <span className="ui text-[10px] uppercase tracking-[0.18em] text-cream/55">
            24-hour stream
          </span>
        </div>
      </div>
    );
  }

  // -------- COMPACT TOAST (also minimized state) --------
  return (
    <div
      className="fixed z-[80] left-1/2 -translate-x-1/2 bottom-4 sm:left-auto sm:translate-x-0 sm:right-5 sm:bottom-5 w-[min(92vw,340px)]"
      role="region"
      aria-label="Global Pizza Party livestream"
    >
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream text-ink shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)] ring-1 ring-butter/40">
        {/* Header bar */}
        <div className="flex items-center justify-between gap-2 bg-ink px-3 py-2 text-cream">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tomato opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tomato" />
            </span>
            <span className="ui truncate text-[10px] uppercase tracking-[0.18em]">
              On Air · Global Pizza Party 2026
            </span>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="grid h-6 w-6 place-items-center rounded-full text-cream/80 hover:bg-cream/10 hover:text-cream"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Preview */}
        {!minimized && (
          <button
            onClick={() => setPopped(true)}
            className="group relative block aspect-video w-full overflow-hidden bg-black text-left"
            aria-label="Expand player"
          >
            <iframe
              title="Livestream preview"
              src={embedSrc({ muted: true, autoplay: true, controls: false })}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="pointer-events-none h-full w-full"
              tabIndex={-1}
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-tomato px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream">
              Live
            </span>
          </button>
        )}

        {/* Body */}
        <div className="px-4 pb-4 pt-3">
          <p className="font-display text-lg font-extrabold leading-tight">
            Global Pizza Party is live
          </p>
          <p className="mt-1 text-sm leading-snug text-ink/70">
            Drop into the 24-hour stream.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={WATCH_URL}
              target="_blank"
              rel="noreferrer"
              className="ui inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-tomato px-3 py-2 text-xs font-semibold text-cream transition-colors hover:bg-ink"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Watch live
            </a>
            <button
              onClick={() => {
                setMinimized(false);
                setPopped(true);
              }}
              className="ui inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-ink/20 bg-cream px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-tomato hover:text-tomato"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Pop out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestreamToast;
