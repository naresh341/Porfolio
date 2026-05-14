"use client";

import { projectService, webhookService } from "@/app/services/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, GitBranch, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TECH_ICONS } from "../MiniComponents/TechIcons";

gsap.registerPlugin(ScrollTrigger);

/* ─── types ─────────────────────────────────────────────────────── */
interface Project {
  id: number;
  title: string;
  name: string;
  tagline: string;
  description: string;
  github?: string;
  live?: string;
  image_url?: string;
  color: string;
  tags: string[];
}

function fmt(p: any): Project {
  return {
    ...p,
    name: p.name || p.title || "project",
    github: p.github_link || p.github,
    live: p.live_link || p.live,
    tagline: p.tagline || "Enterprise Solution",
    color: p.color || "#6E6E6E",
    tags: p.tech_stack
      ? p.tech_stack
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [],
  };
}

/* ─── Project Cursor ─── */
const ProjectCursor = ({
  color,
  isVisible,
}: {
  color: string;
  isVisible: boolean;
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
      className="fixed pointer-events-none z-[100] flex items-center justify-center"
      style={{
        left: pos.x,
        top: pos.y,
        x: "-50%",
        y: "-50%",
      }}
    >
      <div
        className="relative w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden"
        style={{ background: color }}
      >
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
          {[..."VIEW PROJECT VIEW PROJECT"].map((char, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1 w-full text-[8px] font-black uppercase tracking-widest text-white origin-[0_46px]"
              style={{ transform: `rotate(${i * 13}deg)` }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-background">
          <ExternalLink className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
};

/* ─── main ───────────────────────────────────────────────────────── */
export default function Workshowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── fetch ── */
  useEffect(() => {
    (async () => {
      try {
        let data = await projectService.getAllProjects();
        if (!data?.length) {
          await webhookService.triggerManualSync();
          data = await projectService.getAllProjects();
        }
        setProjects((data || []).map(fmt));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ── GSAP: scale each card down as the next one scrolls over it ── */
  useGSAP(
    () => {
      if (!projects.length) return;
      const N = projects.length;

      cardWrapRefs.current.forEach((wrap, i) => {
        if (!wrap || i === N - 1) return; // last card doesn't need to shrink
        const inner = cardInnerRefs.current[i];
        if (!inner) return;

        // As this card's section scrolls past, shrink and dim it
        gsap.to(inner, {
          scale: 0.88,
          opacity: 0.5,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Track active index
        ScrollTrigger.create({
          trigger: wrap,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIdx(i),
          onEnterBack: () => setActiveIdx(i),
        });
      });

      // Track last card active state
      const lastWrap = cardWrapRefs.current[N - 1];
      if (lastWrap) {
        ScrollTrigger.create({
          trigger: lastWrap,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIdx(N - 1),
          onEnterBack: () => setActiveIdx(N - 1),
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [projects] },
  );

  /* ── loading ── */
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        <p className="font-mono text-[9px] tracking-[0.6em] uppercase text-muted-foreground/40">
          Loading Projects
        </p>
      </div>
    );
  }
  if (!projects.length) return null;

  const N = projects.length;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-background"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col items-center justify-center pt-24 pb-16 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-xs font-mono tracking-[0.6em] text-muted-foreground uppercase mb-4"
        >
          Crafting Modern Experiences
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(2.5rem,7vw,4.5rem)] font-black tracking-tighter leading-none"
        >
          VENTURE{" "}
          <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            SHOWCASE
          </span>
        </motion.h2>
      </div>

      {/* ── Progress indicator (sticky) ── */}
      <div className="sticky top-4 z-50 flex justify-center pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/40">
          {projects.map((p, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: activeIdx === i ? 20 : 6,
                height: 6,
                background: activeIdx === i ? p.color : "var(--border)",
              }}
            />
          ))}
          <span className="ml-1 font-mono text-[9px] text-muted-foreground tabular-nums">
            <span style={{ color: projects[activeIdx]?.color }}>
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Stacking Cards ── 
           Each wrap is `sticky top-0 h-screen`.
           As you scroll past it, GSAP scrubs scale from 1 → 0.88,
           so the next card appears to slide on top of it.
      ── */}
      <div className="relative">
        <ProjectCursor
          color={hoveredIdx !== null ? projects[hoveredIdx].color : "#fff"}
          isVisible={hoveredIdx !== null}
        />
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              cardWrapRefs.current[i] = el;
            }}
            className="sticky top-0 h-screen flex items-center justify-center px-3 sm:px-6"
            style={{ zIndex: 10 + i }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* The actual card — GSAP will scale/dim this when next card arrives */}
            <div
              ref={(el) => {
                cardInnerRefs.current[i] = el;
              }}
              className="relative  max-w-7xl  w-[calc(100%-1.5rem)] rounded-2xl sm:rounded-[40px] overflow-hidden
                          grid grid-cols-1 lg:grid-cols-[45%_55%] will-change-transform"
              style={{
                height: "clamp(460px, 74vh, 680px)",
                background: "var(--card)",
                border: `1px solid var(--border)`,
                boxShadow: `0 24px 60px rgba(0,0,0,0.15), 0 0 0 0.5px ${project.color}22`,
              }}
            >
              {/* color accent bar — top edge */}
              <div
                className="absolute top-0 left-8 right-8 h-px rounded-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${project.color}80, transparent)`,
                }}
              />

              {/* ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 70% 30%, ${project.color}08, transparent 70%)`,
                }}
              />

              {/* ── LEFT: info ── */}
              <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-16 z-10 gap-6 sm:gap-8">
                {/* index + type */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs sm:text-sm font-black tabular-nums"
                    style={{ color: project.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 opacity-30 bg-foreground" />
                  <span
                    className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1
                               rounded-full border"
                    style={{
                      borderColor: `${project.color}50`,
                      color: project.color,
                      background: `${project.color}15`,
                    }}
                  >
                    Full Stack
                  </span>
                </div>

                {/* title + tagline */}
                <div>
                  <h2
                    className="font-black tracking-tighter leading-tight text-foreground uppercase break-words"
                    style={{ fontSize: "clamp(1.2rem, 3.5vw, 2.8rem)" }}
                  >
                    {project.title}
                  </h2>
                  <p
                    className="mt-2 text-xs sm:text-sm tracking-[0.15em] uppercase font-semibold"
                    style={{ color: project.color }}
                  >
                    {project.tagline}
                  </p>
                </div>

                {/* description */}
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed font-medium">
                  {project.description}
                </p>

                {/* tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 6).map((tag) => {
                    const tech = TECH_ICONS[tag];
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] px-3
                                   py-1.5 rounded-lg border-2 font-bold"
                        style={{
                          borderColor: tech
                            ? `${tech.color}50`
                            : "var(--border)",
                          color: tech?.color ?? "var(--foreground)",
                          background: tech
                            ? `${tech.color}15`
                            : "var(--accent)",
                        }}
                      >
                        {tech?.icon && (
                          <span className="scale-110">{tech.icon}</span>
                        )}
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={project.github || "#"}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                               border-2 border-border text-xs sm:text-sm font-bold tracking-widest
                               uppercase text-foreground/70 hover:border-primary/50 hover:text-foreground
                               transition-all duration-200"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    Source
                  </Link>
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                                 text-xs sm:text-sm font-bold tracking-widest uppercase
                                 hover:opacity-80 transition-all"
                      style={{ background: project.color, color: "#000" }}
                    >
                      Live <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>

              {/* ── RIGHT: image ── */}
              <div className="hidden lg:block relative overflow-hidden">
                {/* left-edge blend */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, var(--card), transparent)",
                  }}
                />
                {/* colour tint */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}10 0%, transparent 50%)`,
                  }}
                />

                {project.image_url ? (
                  <div
                    className="project-img absolute inset-0"
                    style={{
                      backgroundImage: `url(${project.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                      backgroundRepeat: "no-repeat",
                      transition:
                        "background-position 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.backgroundPosition = "bottom";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.backgroundPosition = "top";
                    }}
                  />
                ) : (
                  <WireframeBg color={project.color} />
                )}

                {/* large number watermark */}
                <span
                  className="absolute right-4 bottom-2 font-black leading-none
                             pointer-events-none select-none"
                  style={{
                    fontSize: "clamp(80px, 14vw, 160px)",
                    color: project.color,
                    opacity: 0.06,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom spacer ── */}
      <div className="h-32" />
    </section>
  );
}

/* ─── wireframe fallback ─────────────────────────────────────────── */
function WireframeBg({ color }: { color: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col gap-4 p-8"
      style={{ background: `${color}06` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${color}10 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative z-10 flex flex-col gap-3 h-full">
        <div className="flex gap-3">
          <div
            className="h-7 w-24 rounded-lg"
            style={{ background: `${color}20` }}
          />
          <div
            className="h-7 w-16 rounded-lg"
            style={{ background: `${color}12` }}
          />
        </div>
        <div
          className="h-36 w-full rounded-xl"
          style={{ background: `${color}0c`, border: `0.5px solid ${color}18` }}
        />
        <div className="grid grid-cols-3 gap-3 flex-1">
          {[0, 1, 2].map((v) => (
            <div
              key={v}
              className="rounded-xl"
              style={{
                background: `${color}07`,
                border: `0.5px solid ${color}10`,
              }}
            />
          ))}
        </div>
        <div
          className="h-9 w-1/3 rounded-xl"
          style={{ background: `${color}12` }}
        />
      </div>
    </div>
  );
}
