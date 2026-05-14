"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Users,
  Briefcase,
  FileText,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TECH_ICONS } from "../MiniComponents/TechIcons";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    name: "RJSA",
    year: "2024",
    role: "Frontend Developer",
    tech: ["React", "Tailwind CSS", "Framer Motion", "GCP"],
    summary:
      "Spearheaded the frontend architecture alongside a cross-functional team, delivering a high-traffic company platform with buttery-smooth animations and sub-second load times for thousands of daily visitors.",
    link: "https://rjsa.in",
    kpi: [
      { val: "10K+", label: "Daily Users" },
      { val: "100%", label: "Responsive" },
    ],
    color: "#6366f1",
    icon: <Users className="w-4 h-4" />,
  },
  {
    index: "02",
    name: "TaxoSmart Hub",
    year: "2023 — Present",
    role: "Frontend Developer",
    tech: ["React", "Java", "Tailwind CSS", "React-Toastify"],
    summary:
      "Collaborated closely with backend engineers to build a robust financial portal, processing complex tax data and serving dynamic analytics to a massive, active user base.",
    link: "https://taxosmart.com",
    kpi: [
      { val: "5K+", label: "Active Users" },
      { val: "40%", label: "Speed Gain" },
    ],
    color: "#f59e0b",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    index: "03",
    name: "HRMS Platform",
    year: "2023 — Present",
    role: "Frontend Developer",
    tech: ["React", "Java", "Tailwind CSS"],
    summary:
      "Engineered an enterprise HRMS platform in an agile team setup, building intuitive employee portals, geo-fenced attendance interfaces, and comprehensive payroll dashboards.",
    link: "https://hrms.taxosmart.com",
    kpi: [
      { val: "500+", label: "Employees" },
      { val: "4", label: "Core Modules" },
    ],
    color: "#10b981",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    index: "04",
    name: "Vendor Payment & TDS",
    year: "2023",
    role: "Frontend Developer",
    tech: ["React", "Java", "Python", "OCR", "GCP"],
    summary:
      "Integrated Python-powered OCR for automated invoice extraction, working with the backend team to build secure tax workflows and real-time transaction dashboards handling thousands of payments.",
    kpi: [
      { val: "99.9%", label: "Uptime" },
      { val: "12K+", label: "Payments/Mo" },
    ],
    color: "#ec4899",
    icon: <FileText className="w-4 h-4" />,
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".proj-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef },
  );

  const activeColor = hovered !== null ? projects[hovered].color : null;

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-background w-full py-32 border-t border-border/20 overflow-hidden"
    >
      {/* ── Section Header ── */}
      <div className="relative z-10 text-center mb-24 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground/60 mb-6"
        >
          Career Milestones
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Professional <br />
          <span className="font-serif italic font-light bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Experiences
          </span>
        </motion.h2>
      </div>

      {/* Background colour pulse on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: activeColor
            ? `radial-gradient(ellipse 60% 50% at 50% 50%, ${activeColor}06, transparent)`
            : "transparent",
        }}
      />

      {/* ── Project List ── */}
      <div className="relative z-10">
        {projects.map((p, i) => (
          <div
            key={i}
            className="proj-row group relative border-t border-border/20 last:border-b last:border-border/20 cursor-default transition-all duration-300"
            style={{
              borderLeftWidth: hovered === i ? "3px" : "0px",
              borderLeftColor: p.color,
              borderLeftStyle: "solid",
              paddingLeft: hovered === i ? "0" : "0",
              background: hovered === i ? `${p.color}04` : "transparent",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Hover fill */}
            <div
              className="absolute inset-y-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `${p.color}04` }}
            />

            <div className="relative px-6 lg:px-20 py-8 lg:py-10 grid grid-cols-12 gap-6 items-center">
              {/* Index + Year */}
              <div className="col-span-2 md:col-span-1 space-y-1">
                <p
                  className="text-[10px] font-mono font-bold transition-colors duration-300"
                  style={{
                    color:
                      hovered === i ? p.color : "hsl(var(--muted-foreground))",
                  }}
                >
                  {p.index}
                </p>
                <p className="text-[9px] font-mono text-muted-foreground/40 leading-tight">
                  {p.year}
                </p>
              </div>

              {/* PROJECT NAME — BIG */}
              <div className="col-span-10 md:col-span-5 space-y-2">
                <p
                  className="text-[10px] font-mono tracking-[0.3em] uppercase transition-colors"
                  style={{
                    color:
                      hovered === i ? p.color : "hsl(var(--muted-foreground))",
                  }}
                >
                  {p.role}
                </p>
                <h3
                  className="text-[clamp(1.5rem,5vw,3.5rem)] font-black tracking-tighter leading-none transition-all duration-500 group-hover:translate-x-2"
                  style={{
                    color: hovered === i ? p.color : "hsl(var(--foreground))",
                  }}
                >
                  {p.name}
                </h3>
                <p className="text-sm md:text-base text-foreground/80 font-bold hidden md:block leading-relaxed max-w-sm">
                  {p.summary}
                </p>
              </div>

              {/* Tech + KPIs */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t, idx) => {
                    const iconObj = TECH_ICONS[t as keyof typeof TECH_ICONS];
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-wider rounded-md border transition-all duration-300"
                        style={{
                          borderColor:
                            hovered === i
                              ? `${p.color}35`
                              : "hsl(var(--border))",
                          color:
                            hovered === i
                              ? p.color
                              : "hsl(var(--muted-foreground))",
                          background:
                            hovered === i ? `${p.color}08` : "transparent",
                        }}
                      >
                        {iconObj?.icon && (
                          <span className="w-3.5 h-3.5 flex items-center justify-center opacity-80">
                            {iconObj.icon}
                          </span>
                        )}
                        {t}
                      </span>
                    );
                  })}
                </div>
                <div className="flex gap-6">
                  {p.kpi.map((k, idx) => (
                    <div key={idx}>
                      <p
                        className="text-lg font-black tabular-nums transition-colors duration-300"
                        style={{
                          color:
                            hovered === i ? p.color : "hsl(var(--foreground))",
                        }}
                      >
                        {k.val}
                      </p>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                        {k.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link Arrow */}
              <div className="col-span-12 md:col-span-2 flex justify-start md:justify-end mt-4 md:mt-0">
                {p.link ? (
                  <Link href={p.link} target="_blank" rel="noopener noreferrer">
                    <div
                      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-foreground hover:text-background"
                      style={{
                        borderColor:
                          hovered === i ? p.color : "hsl(var(--border))",
                        color:
                          hovered === i
                            ? p.color
                            : "hsl(var(--muted-foreground))",
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                ) : (
                  <div className="w-10 h-10" /> // Spacer for alignment if no link
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
