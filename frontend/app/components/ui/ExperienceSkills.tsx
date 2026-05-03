"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Users, Briefcase, FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    name: "HRMS Platform",
    year: "2023 — Present",
    role: "Frontend Developer",
    tech: ["Next.js", "Leaflet", "Auth.js", "Tailwind CSS"],
    summary:
      "Geofenced attendance UI, payroll dashboards, employee portal & admin panels for 500+ users.",
    kpi: [
      { val: "500+", label: "Users" },
      { val: "80%", label: "Workflow Cut" },
      { val: "4", label: "Modules" },
    ],
    color: "#10b981",
    icon: <Users className="w-4 h-4" />,
  },
  {
    index: "02",
    name: "Vendor Payment System",
    year: "2023",
    role: "Frontend Developer",
    tech: ["React", "Tailwind CSS", "GCP", "FastAPI (API)"],
    summary:
      "OCR invoice preview, RBAC payment flows & live transaction dashboards integrated with FastAPI.",
    kpi: [
      { val: "99.9%", label: "Uptime" },
      { val: "97%+", label: "OCR Accuracy" },
      { val: "Live", label: "Status" },
    ],
    color: "#6366f1",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    index: "03",
    name: "Tax-0 Smart Finance Hub",
    year: "2023",
    role: "Frontend Developer",
    tech: ["React", "Redux", "Tailwind CSS", "Docker (API)"],
    summary:
      "Unified 5+ legacy tool UIs into one interface — analytics dashboards, data tables & migration flows.",
    kpi: [
      { val: "5+", label: "Tools Unified" },
      { val: "40%", label: "Speed Gain" },
      { val: "1", label: "Interface" },
    ],
    color: "#f59e0b",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    index: "04",
    name: "TDS & Compliance Engine",
    year: "2023",
    role: "Frontend Developer",
    tech: ["React", "Tailwind CSS", "AWS Lambda (API)", "FastAPI (API)"],
    summary:
      "Multi-step tax forms, income bracket inputs & real-time calculation previews via AWS Lambda APIs.",
    kpi: [
      { val: "95%", label: "Error Cut" },
      { val: "<200ms", label: "Response" },
      { val: "Live", label: "Compliance" },
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
            className="proj-row group border-t border-border/20 last:border-b last:border-border/20 cursor-default"
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
              <div className="col-span-10 md:col-span-5">
                <h3
                  className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none transition-colors duration-300"
                  style={{
                    color: hovered === i ? p.color : "hsl(var(--foreground))",
                  }}
                >
                  {p.name}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground font-light hidden md:block leading-relaxed max-w-sm">
                  {p.summary}
                </p>
              </div>

              {/* Tech + KPIs */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-md border transition-all duration-300"
                      style={{
                        borderColor:
                          hovered === i ? `${p.color}35` : "hsl(var(--border))",
                        color:
                          hovered === i
                            ? p.color
                            : "hsl(var(--muted-foreground))",
                        background:
                          hovered === i ? `${p.color}08` : "transparent",
                      }}
                    >
                      {t}
                    </span>
                  ))}
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

              {/* Arrow */}
              <div className="hidden md:flex col-span-2 md:col-span-2 justify-end">
                <div
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: hovered === i ? p.color : "hsl(var(--border))",
                    color:
                      hovered === i ? p.color : "hsl(var(--muted-foreground))",
                  }}
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
