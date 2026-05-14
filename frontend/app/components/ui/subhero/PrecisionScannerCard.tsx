"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code2, Edit3, Rocket, TerminalSquare } from "lucide-react";
import { useEffect, useState } from "react";

const INITIAL_CODE = `import { Naresh } from './developer';

export default function App() {
  return (
    <Naresh
      role="Full Stack Engineer"
      focus="Scalability, UX/UI"
      status="Building the future"
    />
  );
}`;

export const PrecisionScannerCard = () => {
  const [code, setCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCode(INITIAL_CODE.slice(0, i));
      i++;
      if (i > INITIAL_CODE.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const roleMatch = code.match(/role="([^"]*)"/);
  const focusMatch = code.match(/focus="([^"]*)"/);
  const statusMatch = code.match(/status="([^"]*)"/);

  const role = roleMatch ? roleMatch[1] : "";
  const focusStr = focusMatch ? focusMatch[1] : "";
  const focusArray = focusStr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const status = statusMatch ? statusMatch[1] : "";

  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative z-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/20 backdrop-blur-md z-30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-[10px] font-mono text-muted-foreground font-bold tracking-widest uppercase">
          Interactive_Editor.tsx
        </div>
        <div className="flex items-center gap-2">
          {!isTyping && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[8px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 flex items-center gap-1"
            >
              <Edit3 className="w-2 h-2" /> Live
            </motion.span>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative z-20">
        {/* Left Pane - Code */}
        {/* Added pl-12 to push code away from the circular cutout on the left */}
        <div
          className="w-full md:w-1/2 p-6 pl-12 border-b md:border-b-0 md:border-r border-border/50 relative z-10 flex flex-col group/editor overflow-hidden"
          onClick={() => !isTyping && setIsFocused(true)}
        >
          <textarea
            value={code}
            onChange={(e) => !isTyping && setCode(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            readOnly={isTyping}
            spellCheck={false}
            className="w-full h-full bg-transparent resize-none outline-none font-mono text-xs lg:text-sm text-foreground/90 leading-relaxed z-20 custom-scrollbar"
            style={{ caretColor: "hsl(var(--primary))" }}
          />
          {/* Adjusted line numbers to match padding */}
          <div className="absolute top-6 left-6 w-6 flex flex-col font-mono text-[10px] text-muted-foreground/20 leading-relaxed pointer-events-none select-none z-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        </div>

        {/* Right Pane - Preview */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-background/5 relative z-10 overflow-hidden">
          <p className="absolute top-4 right-6 text-[8px] uppercase tracking-widest font-mono font-bold text-muted-foreground/40 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
            Preview
          </p>

          <div className="w-full max-w-[220px] flex flex-col gap-4 relative z-20">
            <AnimatePresence mode="popLayout">
              {role && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-card/80 border border-border flex items-center gap-3 shadow-lg backdrop-blur-sm"
                >
                  <TerminalSquare className="w-4 h-4 text-primary" />
                  <div className="min-w-0">
                    <p className="text-[8px] uppercase text-muted-foreground font-bold">
                      Role
                    </p>
                    <p className="text-xs font-bold truncate">{role}</p>
                  </div>
                </motion.div>
              )}

              {focusArray.length > 0 && (
                <motion.div layout className="flex flex-wrap gap-1.5">
                  {focusArray.map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[9px] font-mono bg-primary/10 border border-primary/20 rounded text-primary"
                    >
                      {f}
                    </span>
                  ))}
                </motion.div>
              )}

              {status && (
                <motion.div
                  layout
                  className="p-3 rounded-xl bg-primary text-primary-foreground shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Rocket className="w-3 h-3" />
                    <p className="text-[8px] uppercase opacity-80 font-bold">
                      Status
                    </p>
                  </div>
                  <p className="text-xs font-black mt-1">{status}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-6 py-3 border-t border-border/50 bg-background/40 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-muted-foreground">
            TSX
          </span>
          {isFocused && (
            <span className="text-[9px] font-mono text-primary animate-pulse">
              EDITING
            </span>
          )}
        </div>
        <div className="text-[9px] font-mono text-emerald-500 font-bold flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />{" "}
          SYNCED
        </div>
      </div>
    </div>
  );
};
