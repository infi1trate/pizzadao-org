import { useState, type ReactNode, type FormEvent } from "react";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "pd-unlocked";
const PASSWORD = "cowabunga";

const PasswordGate = ({ children }: { children: ReactNode }) => {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1",
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <main className="relative min-h-[100svh] bg-cream text-ink grain flex items-center justify-center px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60svh] opacity-60"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 0%, hsl(46 100% 62% / 0.25), transparent 60%), radial-gradient(70% 60% at 95% 10%, hsl(0 93% 60% / 0.10), transparent 65%)",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
          § Members only
        </p>
        <h1 className="font-display mt-4 text-[clamp(2.5rem,6vw,4rem)] font-black leading-[0.9] tracking-[-0.015em]">
          The oven&rsquo;s
          <br />
          <span className="text-tomato">still warming.</span>
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink/75">
          The full site opens soon. Enter the password to step inside, or{" "}
          <a href="/pre-launch" className="underline decoration-tomato underline-offset-4 hover:text-tomato">
            visit the pre-launch page
          </a>
          .
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
          <Input
            type="password"
            autoFocus
            placeholder="Password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            className="h-12 rounded-full border-ink/20 bg-cream px-5 text-base focus-visible:ring-tomato"
          />
          {error && (
            <p className="ui text-[12px] text-tomato">
              Wrong password. Try again.
            </p>
          )}
          <button
            type="submit"
            className="btn-pill-lg bg-ink text-cream hover:bg-tomato"
          >
            Unlock
          </button>
        </form>
      </div>
    </main>
  );
};

export default PasswordGate;
