"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Cpu, Globe, Layers, ShieldCheck } from "lucide-react";

const TECH_GROUPS = [
  {
    name: "Frontend",
    icon: <Globe size={14} />,
    color: "from-blue-500/20 to-transparent",
    dot: "bg-blue-500",
    skills: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 98 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind", level: 95 },
      { name: "Framer", level: 88 },
    ],
  },
  {
    name: "Backend",
    icon: <Layers size={14} />,
    color: "from-emerald-500/20 to-transparent",
    dot: "bg-emerald-500",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Python", level: 94 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Prisma", level: 88 },
    ],
  },
  {
    name: "Platform",
    icon: <Cpu size={14} />,
    color: "from-purple-500/20 to-transparent",
    dot: "bg-purple-500",
    skills: [
      { name: "Docker", level: 82 },
      { name: "AWS", level: 75 },
      { name: "Git", level: 90 },
      { name: "CI/CD", level: 85 },
      { name: "Linux", level: 80 },
    ],
  },
];

export const APIPulseCard = () => {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <div className="md:col-span-2 p-6 sm:p-8 group h-full">
      <div className="relative overflow-hidden h-full">
        <div className="inset-0 p-6 flex flex-col rounded-3xl h-120 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 overflow-hidden bg-card/60 border-border shadow group-hover:border-primary/20 dark:group-hover:border-primary/20 dark:bg-transparent dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]">
          
          {/* Background Glow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 bg-gradient-to-br ${TECH_GROUPS[activeGroup].color} pointer-events-none`}
            />
          </AnimatePresence>

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between mb-8">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 dark:text-white/30 font-bold mb-1">
                Technical Arsenal
              </p>
              <h3 className="text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight leading-none">
                Built with the <br />
                <span className="font-serif italic font-light text-neutral-400 dark:text-white/40">
                  right tools.
                </span>
              </h3>
            </div>
            <div className="p-3 rounded-2xl border border-border bg-foreground/5 dark:bg-white/5 backdrop-blur-sm">
               <ShieldCheck className="w-5 h-5 text-primary/60" />
            </div>
          </div>

          {/* Main Content: Group Selector + Skills Grid */}
          <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-8">
            {/* Sidebar Selectors */}
            <div className="flex lg:flex-col gap-2">
              {TECH_GROUPS.map((group, i) => (
                <button
                  key={group.name}
                  onClick={() => setActiveGroup(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border ${
                    activeGroup === i
                      ? "bg-foreground text-background border-foreground dark:bg-white dark:text-neutral-900 dark:border-white shadow-lg"
                      : "bg-transparent text-muted-foreground border-transparent hover:border-border hover:bg-foreground/5"
                  }`}
                >
                  <span className={activeGroup === i ? "text-inherit" : group.dot.replace("bg-", "text-")}>
                    {group.icon}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {group.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Skills List */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroup}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 gap-3"
                >
                  {TECH_GROUPS[activeGroup].skills.map((skill, i) => (
                    <div 
                      key={skill.name}
                      className="group/skill relative flex items-center justify-between p-3.5 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${TECH_GROUPS[activeGroup].dot}`} />
                        <span className="text-sm font-bold tracking-tight text-foreground/90">
                          {skill.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-1 rounded-full bg-border/30 overflow-hidden hidden sm:block">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full ${TECH_GROUPS[activeGroup].dot}`}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground font-bold">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="relative z-10 mt-6 pt-4 border-t border-border flex items-center justify-between">
             <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                <div className="w-2 h-2 rounded-full bg-purple-500/40" />
             </div>
             <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40">
               Secure_Protocol_v2.0
             </span>
          </div>
        </div>

        {/* Floating circle decoration */}
        <div className="md:h-70 md:w-70 lg:h-120 lg:w-120 rounded-full absolute top-0 right-0 -translate-y-[55%] translate-x-[55%] z-0 border bg-card border-border opacity-50" />
      </div>
    </div>
  );
};
