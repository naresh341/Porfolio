"use client";
import { useEffect, useState } from "react";
import { Home, Mail, Clock } from "lucide-react";

export function DevToolsGuard({ children }: { children: React.ReactNode }) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const blockKeys = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        e.stopPropagation();
        setBlocked(true);
        return false;
      }
    };

    const blockRightClick = (e: MouseEvent) => e.preventDefault();

    window.addEventListener("keydown", blockKeys, true);
    document.addEventListener("contextmenu", blockRightClick);

    return () => {
      window.removeEventListener("keydown", blockKeys, true);
      document.removeEventListener("contextmenu", blockRightClick);
    };
  }, []);

  if (blocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <div
          className="relative w-[380px] rounded-2xl p-8 flex flex-col items-center gap-6"
          style={{ background: "#111111", border: "1px solid #222222" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ border: "1px solid #2a2a2a", background: "#1a1a1a" }}
          >
            <Clock className="w-6 h-6 text-white/60" />
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase">
              Access Restricted
            </p>
            <h2 className="text-white text-3xl tracking-tight">
              <span className="font-black">DEV TOOLS</span>{" "}
              <span className="font-light italic text-white/60">detected</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mt-1">
              Curious about how this was built?
              <br />
              Let&apos;s connect and chat about it.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => setBlocked(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
            >
              <Home className="w-4 h-4" />
              Return Home
            </button>
            <a
              href="mailto:bhati.naresh43@gmail.com"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-white text-sm font-semibold transition-all"
              style={{ border: "1px solid #2a2a2a" }}
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </div>

          <div className="w-full h-px" style={{ background: "#1e1e1e" }} />

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 text-white/25 text-xs">
              <span>Privacy</span>
              <span>·</span>
              <span>Terms</span>
              <span>·</span>
              <span>About</span>
            </div>
            <p className="text-white/20 text-xs">
              © 2026 Naresh <span className="font-serif italic">Bhati</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
