"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Database } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

const PROJECTS = [
  {
    id: "prescripto",
    title: "Prescripto",
    category: "Healthcare Platform",
    description:
      "Advanced healthcare management system with automated scheduling.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    color: "#3b82f6",
  },
  {
    id: "ochi",
    title: "Ochi Design",
    category: "Creative Agency",
    description:
      "High-end motion-driven design showcase for an award-winning studio.",
    tech: ["GSAP", "Framer Motion", "React", "Locomotive"],
    color: "#ff4d4d",
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    category: "SaaS Application",
    description:
      "Enterprise-level project management system with real-time sync.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    color: "#10b981",
  },
  {
    id: "excel",
    title: "Dynamic Excel",
    category: "Data System",
    description: "Cloud-based spreadsheet engine with complex formula support.",
    tech: ["Wasm", "TypeScript", "React", "Canvas API"],
    color: "#f59e0b",
  },
];

export const ProjectVaultCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="group relative h-[600px] overflow-hidden rounded-3xl border border-border bg-card flex flex-col"
    >
      {/* Background Holographic Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${PROJECTS[activeIndex].color}, transparent 70%)`,
            }}
          />
        </AnimatePresence>

        {/* Scanned Lines Effect */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-10 flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Database size={14} className="text-white/30" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 font-bold">
              Project_Vault.db
            </span>
          </div>
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter text-foreground leading-none">
            Project <br />
            <span className="text-foreground/40">Intelligence Vault</span>
          </h3>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
            Active_Archive
          </span>
          <span className="text-xl font-bold text-foreground/80 tabular-nums">
            0{activeIndex + 1} <span className="text-foreground/20">/</span> 0
            {PROJECTS.length}
          </span>
        </div>
      </div>

      {/* Selector Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-10">
        <div className="space-y-4">
          {PROJECTS.map((project, idx) => (
            <button
              key={project.id}
              onMouseEnter={() => setActiveIndex(idx)}
              className="group/item flex items-center gap-6 text-left transition-all duration-500"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: activeIndex === idx ? 1 : 0.5,
                    opacity: activeIndex === idx ? 1 : 0.2,
                  }}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                {activeIndex === idx && (
                  <motion.div
                    layoutId="active-ring"
                    className="absolute w-6 h-6 border border-white/20 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>

              <div className="space-y-0.5">
                <span
                  className={`block text-2xl font-bold tracking-tight transition-colors duration-300 ${activeIndex === idx ? "text-foreground" : "text-foreground/20 group-hover/item:text-foreground/40"}`}
                >
                  {project.title}
                </span>
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="block text-[10px] uppercase tracking-widest text-foreground/40 font-bold"
                    >
                      {project.category}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Details Footer (Overlay) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative z-10 p-10 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-[2px]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-sm">
              <p className="text-foreground/60 text-sm leading-relaxed">
                {PROJECTS[activeIndex].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {PROJECTS[activeIndex].tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded border border-border bg-foreground/5 text-[9px] text-muted-foreground uppercase tracking-widest font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-foreground/5 text-[10px] text-foreground uppercase tracking-widest font-black hover:bg-foreground hover:text-background transition-all group/link">
                View Project{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                />
              </button>
              <button className="p-2 rounded-lg border border-border bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors">
                <FaGithub size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Border Effect */}
      <div className="absolute inset-0 rounded-3xl border border-border/50 pointer-events-none group-hover:border-primary/20 transition-colors duration-500" />
    </motion.div>
  );
};
