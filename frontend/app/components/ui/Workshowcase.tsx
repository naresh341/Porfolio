"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  GitBranch,
  ExternalLink,
  Star,
  GitFork,
} from "lucide-react";
import Link from "next/link";
import { TECH_ICONS } from "../MiniComponents/TechIcons";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Professional / freelance projects (linked to GitHub)
const projects = [
  {
    index: "01",
    name: "AxionFlow",
    tagline: "AI-powered workflow automation platform",
    description:
      "A modular, AI-first workflow engine built to automate complex multi-step business processes. Features a drag-and-drop pipeline builder, real-time execution logs, and a plugin API.",
    highlights: [
      "AI Pipeline Builder",
      "Real-time Logs",
      "Plugin Architecture",
    ],
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL"],
    color: "#6366f1",
    github: "https://github.com/naresh341/AxionFlow",
    live: null,
    type: "Personal Project",
    status: "In Progress",
  },
  {
    index: "02",
    name: "Deep Pocket Inspection",
    tagline: "AI-driven visual defect detection system",
    description:
      "A computer-vision inspection system for manufacturing quality control. Leverages deep learning to detect surface defects in real-time from camera feeds with high accuracy.",
    highlights: ["Computer Vision", "Real-time Detection", "CNN-based Model"],
    tags: ["Python", "FastAPI", "React"],
    color: "#10b981",
    github: "https://github.com/naresh341/DeepPocketInspection",
    live: null,
    type: "ML / Vision",
    status: "Completed",
  },
  {
    index: "03",
    name: "Doctor Appointment App",
    tagline: "End-to-end clinic management system",
    description:
      "A full-stack appointment scheduling platform for clinics, featuring real-time slot management, patient records, and SMS notification integration.",
    highlights: ["Real-time Booking", "Patient Records", "SMS Notifications"],
    tags: ["React", "Node.js", "MongoDB"],
    color: "#f59e0b",
    github: "https://github.com/naresh341",
    live: null,
    type: "Web App",
    status: "Completed",
  },
  {
    index: "04",
    name: "HRMS Platform",
    tagline: "Enterprise HR & payroll management system",
    description:
      "Comprehensive HR platform built at Tax-0 Smart. Features geofenced attendance, multi-tenant asset tracking, and an automated payroll engine for 500+ users.",
    highlights: ["Geofenced Attendance", "Payroll Engine", "Multi-tenant"],
    tags: ["Next.js", "Python", "MongoDB", "Leaflet"],
    color: "#3b82f6",
    github: "https://github.com/naresh341",
    live: null,
    type: "Enterprise",
    status: "Live @ Taxosmart",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Workshowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const trackAnim = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.floor(self.progress * (projects.length + 0.99));
            setActiveIdx(Math.min(idx, projects.length));
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-slide").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.4, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              containerAnimation: trackAnim,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      id="projects"
      className="relative bg-background w-full border-t border-border/20"
    >
      {/* Horizontal Scroll Showcase */}
      <div
        ref={containerRef}
        className="relative h-screen overflow-hidden bg-background"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-30 px-6 lg:px-20 h-10 flex items-center justify-between border-b border-border/10 pointer-events-none bg-background/90 backdrop-blur-sm">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
            {activeIdx < projects.length ? projects[activeIdx].name : "Archive"}{" "}
            // 0{Math.min(activeIdx + 1, projects.length + 1)}
          </span>
          <div className="flex gap-2">
            {[...projects, { id: "cta" }].map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ${
                  activeIdx === i
                    ? "w-6 h-1.5 bg-foreground"
                    : "w-1.5 h-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
            0{projects.length + 1} Total
          </span>
        </div>

        <div ref={trackRef} className="flex h-full w-fit">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-slide w-screen h-full flex items-center justify-center px-6 lg:px-20 flex-shrink-0 pt-10"
            >
              <ProjectSlide project={project} />
            </div>
          ))}

          {/* CTA Slide */}
          <div className="project-slide w-screen h-full flex items-center justify-center px-6 flex-shrink-0 pt-10">
            <div className="max-w-2xl text-center space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground">
                  There's more
                </span>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
                  Explore the
                  <br />
                  <span className="text-muted-foreground font-light italic">
                    full archive.
                  </span>
                </h2>
              </div>
              <Link
                href="https://github.com/naresh341"
                target="_blank"
                className="group inline-flex items-center gap-4 px-8 py-4 bg-foreground text-background font-black tracking-widest uppercase text-[10px] hover:bg-primary transition-all rounded-xl"
              >
                View GitHub{" "}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT SLIDE ─────────────────────────────────────────────────────────────
function ProjectSlide({ project }: { project: (typeof projects)[0] }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.querySelectorAll<HTMLElement>("[data-depth]").forEach((p) => {
      const d = Number(p.dataset.depth ?? 0);
      const dx = ((e.clientX - r.left) / r.width - 0.5) * d;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * d;
      p.style.transform = `translate3d(${dx}px,${dy}px,0)`;
    });
  };

  const onLeave = () => {
    setHovered(false);
    panelRef.current
      ?.querySelectorAll<HTMLElement>("[data-depth]")
      .forEach((p) => {
        p.style.transform = "translate3d(0,0,0)";
      });
  };

  return (
    <div
      ref={panelRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 40% 50% at 65% 50%, ${project.color}10, transparent 70%)`,
          opacity: hovered ? 1 : 0.5,
        }}
      />

      {/* ── LEFT: Info ── */}
      <div className="lg:col-span-5 flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <span
            className="font-mono text-xs font-bold"
            style={{ color: project.color }}
          >
            {project.index}
          </span>
          <span className="h-px w-8 bg-border" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
            {project.type}
          </span>
          <span
            className="ml-auto px-2.5 py-1 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest border"
            style={{
              borderColor: `${project.color}40`,
              color: project.color,
              backgroundColor: `${project.color}10`,
            }}
          >
            {project.status}
          </span>
        </div>

        <div data-depth="10">
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            {project.name}
          </h3>
          <p className="mt-2 text-sm tracking-widest uppercase text-muted-foreground font-light">
            {project.tagline}
          </p>
        </div>

        <p
          className="text-sm text-muted-foreground leading-relaxed max-w-[44ch]"
          data-depth="4"
        >
          {project.description}
        </p>

        <ul className="space-y-2">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 text-sm text-foreground/75"
            >
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: project.color }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="h-px w-full bg-border/30" />

        <div>
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => {
              const tech = TECH_ICONS[tag];
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg border tracking-wide"
                  style={{
                    borderColor: tech
                      ? `${tech.color}35`
                      : "hsl(var(--border))",
                    color: tech?.color ?? "hsl(var(--foreground))",
                    background: tech ? `${tech.color}0d` : "hsl(var(--muted))",
                  }}
                >
                  {tech?.icon}
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={project.github}
            target="_blank"
            className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-[11px] font-bold tracking-widest uppercase hover:border-foreground transition-all"
          >
            <GitBranch className="w-3.5 h-3.5" /> Source
          </Link>
          {project.live && (
            <Link
              href={project.live}
              target="_blank"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all"
              style={{ backgroundColor: project.color, color: "#000" }}
            >
              Live <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* ── RIGHT: Visual Mockup ── */}
      <div
        className="hidden lg:flex lg:col-span-7 h-[72vh] flex-col gap-3 relative z-10"
        data-depth="14"
      >
        {/* Browser frame */}
        <div
          className="flex-1 rounded-2xl overflow-hidden border border-border/60 bg-card/50 backdrop-blur-sm flex flex-col"
          style={{
            boxShadow: `0 0 0 1px ${project.color}15, 0 40px 80px -20px ${project.color}10`,
          }}
        >
          {/* Chrome bar */}
          <div className="shrink-0 h-9 bg-muted/50 border-b border-border/40 flex items-center gap-1.5 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            <div className="ml-3 flex-1 max-w-[220px] h-5 bg-background/60 border border-border/30 rounded-md flex items-center px-3">
              <span className="text-[9px] text-muted-foreground tracking-wider">
                github.com/naresh341/
                {project.name.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: project.color }}
              />
              <span className="text-[8px] text-muted-foreground tracking-wider">
                {project.status}
              </span>
            </div>
          </div>

          {/* Wireframe content */}
          <div className="flex-1 relative overflow-hidden p-8 flex flex-col gap-5">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(${project.color}08 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />

            {/* Ghost letter */}
            <div
              className="absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: "20vw",
                color: project.color,
                opacity: 0.025,
                letterSpacing: "-0.05em",
              }}
            >
              {project.name[0]}
            </div>

            {/* Wireframe UI */}
            <div className="relative z-10 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3">
                <div
                  className="h-7 w-24 rounded-lg"
                  style={{ background: `${project.color}25` }}
                />
                <div className="flex-1 flex gap-2 justify-end">
                  {[64, 52, 48].map((w, i) => (
                    <div
                      key={i}
                      className="h-5 rounded-md"
                      style={{ width: w, background: `${project.color}12` }}
                    />
                  ))}
                  <div
                    className="h-7 w-20 rounded-lg"
                    style={{ background: `${project.color}35` }}
                  />
                </div>
              </div>

              <div
                className="h-28 rounded-xl flex items-center px-6 gap-4"
                style={{
                  background: `${project.color}12`,
                  border: `1px solid ${project.color}20`,
                }}
              >
                <div className="space-y-2 flex-1">
                  <div
                    className="h-4 w-48 rounded-md"
                    style={{ background: `${project.color}40` }}
                  />
                  <div
                    className="h-3 w-64 rounded-md"
                    style={{ background: `${project.color}20` }}
                  />
                  <div
                    className="h-3 w-52 rounded-md"
                    style={{ background: `${project.color}15` }}
                  />
                </div>
                <div
                  className="h-9 w-24 rounded-xl"
                  style={{ background: `${project.color}50` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 flex-1">
                {[0.8, 0.5, 0.7, 0.9, 0.4, 0.65].map((o, i) => (
                  <div
                    key={i}
                    className="rounded-xl"
                    style={{
                      background: `${project.color}${Math.round(o * 16)
                        .toString(16)
                        .padStart(2, "0")}`,
                      border: `1px solid ${project.color}18`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stat tiles */}
        <div className="shrink-0 grid grid-cols-3 gap-3 h-28">
          <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-4 flex flex-col justify-between">
            <span className="text-[9px] tracking-widest uppercase text-muted-foreground font-mono">
              Type
            </span>
            <div>
              <p className="text-sm font-bold">{project.type}</p>
              <p className="text-[10px] text-muted-foreground">Full Stack</p>
            </div>
          </div>
          <div
            className="rounded-xl border p-4 flex flex-col justify-between"
            style={{
              borderColor: `${project.color}25`,
              background: `${project.color}06`,
            }}
          >
            <span className="text-[9px] tracking-widest uppercase text-muted-foreground font-mono">
              Stack
            </span>
            <div>
              <p
                className="text-2xl font-black"
                style={{ color: project.color }}
              >
                {project.tags.length}
              </p>
              <p className="text-[10px] text-muted-foreground">Technologies</p>
            </div>
          </div>
          <Link
            href={project.github}
            target="_blank"
            className="group rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-4 flex flex-col justify-between hover:border-primary/30 transition-all cursor-pointer"
          >
            <span className="text-[9px] tracking-widest uppercase text-muted-foreground font-mono">
              Source
            </span>
            <div className="flex items-end justify-between">
              <p className="text-sm font-bold">GitHub</p>
              <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center transition-all group-hover:bg-foreground group-hover:border-foreground group-hover:text-background">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
