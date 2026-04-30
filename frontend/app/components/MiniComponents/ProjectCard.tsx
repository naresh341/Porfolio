"use client";

import { ArrowUpRight, GitBranchMinus, Globe, Plus } from "lucide-react";
import { useRef } from "react";

export default function projectCard({
  project,
  index,
  total,
}: {
  project: any;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const accent = `hsl(${project.accent})`;

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (glow) {
      glow.style.background = `radial-gradient(420px circle at ${x}px ${y}px, ${accent.replace(")", " / 0.18)")}, transparent 55%)`;
    }
    el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((p) => {
      const depth = Number(p.dataset.parallax || 10);
      const dx = (x / r.width - 0.5) * depth;
      const dy = (y / r.height - 0.5) * depth;
      p.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    });
  };

  const onLeave = () => {
    cardRef.current
      ?.querySelectorAll<HTMLElement>("[data-parallax]")
      .forEach((p) => {
        p.style.transform = "translate3d(0,0,0)";
      });
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <section className="project-panel relative shrink-0 w-screen h-screen flex items-center justify-center px-6 lg:px-16">
      {/* Background ambient blob */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(60% 50% at 70% 50%, ${accent.replace(")", " / 0.15)")}, transparent 70%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-grid-faint opacity-[0.35] pointer-events-none"
        aria-hidden
      />

      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative w-full max-w-7xl grid grid-cols-12 gap-6 lg:gap-10"
      >
        {/* cursor glow overlay */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-3xl pointer-events-none transition-[background] duration-200"
        />

        {/* LEFT META */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between py-4 relative z-10">
          <div className="space-y-7">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
                {/* / Project {String(index + 1).padStart(2, "0")} —{" "} */}
                {/* {String(projects.length).padStart(2, "0")} */}
              </span>
              <span className="h-px w-10" style={{ background: accent }} />
            </div>

            {/* Title with stroked echo */}
            <div className="relative" data-parallax="14">
              <h2
                aria-hidden
                className="absolute -top-3 -left-1 text-6xl lg:text-8xl font-black tracking-tighter text-stroke select-none"
              >
                {project.name}
              </h2>
              <h2 className="relative text-6xl lg:text-8xl font-black tracking-tighter text-foreground hover-glitch">
                {project.name}
              </h2>
            </div>

            <p
              className="text-muted-foreground text-base lg:text-lg max-w-md font-light leading-relaxed"
              data-parallax="6"
            >
              {project.description}
            </p>

            <ul className="space-y-2 max-w-md">
              {project.highlights.slice(0, 3).map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-foreground/85"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: accent }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-foreground/90 bg-card/60 border border-border/60 px-3 py-1.5 rounded-full backdrop-blur-sm hover:border-foreground/40 transition"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-background transition"
                style={{ background: accent }}
              >
                Visit Live
                <Globe className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </a>
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-border/70 text-foreground hover:bg-card/60 transition"
              >
                Repository
                <GitBranchMinus className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT MOCKUPS */}
        <div className="col-span-12 md:col-span-7 grid grid-cols-6 grid-rows-6 gap-3 lg:gap-4 h-[78vh] relative z-10">
          {/* Main desktop */}
          <div
            className="col-span-6 row-span-4 rounded-2xl overflow-hidden border border-border/50 relative group"
            data-parallax="18"
            style={{
              boxShadow: `0 40px 100px -30px ${accent.replace(")", " / 0.45)")}`,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-7 bg-card/80 backdrop-blur flex items-center gap-1.5 px-3 z-10 border-b border-border/40">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-3 text-[10px] text-muted-foreground tracking-wider truncate">
                {project.name.toLowerCase()}.app
              </span>
            </div>
            <img
              src={project.desktop}
              alt={`${project.name} desktop preview`}
              loading={index === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* gradient overlay */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${accent.replace(")", " / 0.4)")}, transparent)`,
              }}
            />
          </div>

          {/* Mobile 1 */}
          <div
            className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-border/50 relative group bg-card"
            data-parallax="24"
          >
            <img
              src={project.mobile1}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-[10px] uppercase tracking-widest text-white/80">
                Mobile · Home
              </div>
            </div>
          </div>

          {/* Mobile 2 */}
          <div
            className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-border/50 relative group bg-card"
            data-parallax="24"
          >
            <img
              src={project.mobile2}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-[10px] uppercase tracking-widest text-white/80">
                Mobile · Detail
              </div>
            </div>
          </div>

          {/* Stat / CTA tile */}
          <div
            className="col-span-2 row-span-2 rounded-2xl border border-border/50 relative overflow-hidden p-4 flex flex-col justify-between"
            data-parallax="20"
            style={{
              background: `linear-gradient(160deg, ${accent.replace(")", " / 0.18)")}, transparent)`,
            }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                Case Study
              </span>
              <Plus className="h-4 w-4 text-foreground/70" />
            </div>
            <div>
              <div
                className="text-4xl font-black tracking-tighter"
                style={{ color: accent }}
              >
                {/* 0{index + 1} */}
              </div>
              <button className="mt-2 inline-flex items-center gap-1.5 text-xs text-foreground/80 hover:text-foreground transition">
                Read more <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee tag strip */}
      <div className="absolute bottom-6 left-0 right-0 overflow-hidden mask-fade-r pointer-events-none">
        <div className="flex gap-10 animate-marquee whitespace-nowrap text-[11px] tracking-[0.3em] uppercase text-muted-foreground/60">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            project.tags
              .concat([project.name, "scroll →", "case study"])
              .map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-10">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-current" />
                </span>
              )),
          )}
        </div>
      </div>
    </section>
  );
}
