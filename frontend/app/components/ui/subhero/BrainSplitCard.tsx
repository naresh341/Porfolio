"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Search, PenTool, Code, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    label: "UNDERSTAND",
    body: "I sit with the problem. What does success actually look like? Who uses this, and what slows them down? Good software starts with uncomfortable questions.",
    icon: <Search size={20} />,
    color: "#8b5cf6",
    accent: "from-violet-500/10 to-transparent",
  },
  {
    number: "02",
    title: "Blueprint",
    label: "ARCHITECT",
    body: "I sketch the data flow, API contracts, and component tree before touching a framework. Decisions made here save days of refactoring later.",
    icon: <PenTool size={20} />,
    color: "#3b82f6",
    accent: "from-blue-500/10 to-transparent",
  },
  {
    number: "03",
    title: "Execution",
    label: "BUILD",
    body: "Pixel-tight frontend with Framer Motion, fast backends with FastAPI. I own both sides — no translation layer, no lost context.",
    icon: <Code size={20} />,
    color: "#10b981",
    accent: "from-emerald-500/10 to-transparent",
  },
  {
    number: "04",
    title: "Polishing",
    label: "REFINE",
    body: "The first version works. The final version delights. I iterate on timing, spacing, feedback loops — the details that make users say 'it just works.'",
    icon: <Sparkles size={20} />,
    color: "#f59e0b",
    accent: "from-amber-500/10 to-transparent",
  },
];

export const BrainSplitCard = () => {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <div className="md:col-span-2 p-6 sm:p-8 group h-full">
      <div className="relative h-full overflow-hidden">
        <div className="inset-0 p-8 flex flex-col rounded-3xl h-120 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 bg-card/60 border-border shadow group-hover:border-primary/20 dark:group-hover:border-primary/20 dark:bg-transparent dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]">
          
          {/* Background Ambient Glow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 bg-gradient-to-tr ${step.accent} pointer-events-none`}
            />
          </AnimatePresence>

          {/* Header Section */}
          <div className="relative z-10 flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400 dark:text-white/30 font-bold mb-2">
                Development DNA
              </p>
              <h3 className="text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tighter leading-none">
                Logic <span className="font-serif italic font-light text-neutral-400 dark:text-white/40">over Noise.</span>
              </h3>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[9px] font-mono text-neutral-400 dark:text-white/20 uppercase tracking-widest mb-1">Iteration_Protocol</span>
               <div className="text-2xl font-black font-mono tracking-tighter text-foreground/20">
                 {step.number}
               </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 items-center">
              
              {/* Left: Content Description */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 dark:bg-white/5 border border-border mb-4">
                       <span className="w-1 h-1 rounded-full" style={{ backgroundColor: step.color }} />
                       <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{step.label}</span>
                    </div>
                    <h4 className="text-2xl lg:text-3xl font-black text-foreground mb-4 tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                      {step.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Visual Indicator (Steps List) */}
              <div className="hidden lg:flex flex-col gap-3">
                {STEPS.map((s, i) => (
                  <button
                    key={s.number}
                    onClick={() => setActive(i)}
                    className={`relative flex items-center gap-4 p-3 rounded-2xl border transition-all duration-300 ${
                      active === i 
                        ? "bg-foreground border-foreground text-background dark:bg-white dark:border-white dark:text-neutral-900 shadow-xl scale-105"
                        : "bg-transparent border-transparent text-muted-foreground hover:border-border"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${active === i ? "bg-background/20 dark:bg-neutral-900/10" : "bg-foreground/5 dark:bg-white/5"}`}>
                       {s.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">{s.title}</span>
                    {active === i && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-current"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile/Bottom Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
               <div className="flex gap-4">
                  <button 
                    onClick={() => setActive(prev => Math.max(0, prev - 1))}
                    disabled={active === 0}
                    className="p-2 rounded-full border border-border hover:bg-foreground/5 disabled:opacity-20 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={() => setActive(prev => Math.min(STEPS.length - 1, prev + 1))}
                    disabled={active === STEPS.length - 1}
                    className="p-2 rounded-full border border-border hover:bg-foreground/5 disabled:opacity-20 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
               </div>

               <div className="flex items-center gap-2">
                 {STEPS.map((_, i) => (
                   <div 
                    key={i}
                    className={`h-1 transition-all duration-500 rounded-full ${
                      active === i ? "w-8 bg-foreground dark:bg-white" : "w-2 bg-border"
                    }`}
                   />
                 ))}
               </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Floating Circle */}
        <div className="md:h-70 md:w-70 lg:h-120 lg:w-120 rounded-full absolute top-0 left-0 -translate-y-[55%] -translate-x-[55%] z-0 border bg-card border-border opacity-50 shadow-[0_0_80px_rgba(255,255,255,0.03)]" />
      </div>
    </div>
  );
};
