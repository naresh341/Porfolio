"use client";

import Lanyard from "@/components/Lanyard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "../components/ui/Footer";
import { SectionHero, GithubActivity, BentoWidgets } from "../components/ui/DashboardWidgets";

export default function AboutPage() {
  return (
    <div className="bg-background w-full overflow-x-hidden">
      {/* ── Standardized Full-Bleed Section Hero ─────────────────────────── */}
      <SectionHero 
        title="ABOUT ME" 
        label="GET TO KNOW MORE ABOUT" 
        tagline="who i am."
        description="Crafting Digital Excellence"
      />

      {/* ── Profile Section ─────────────────────────── */}
      <section className="py-24 px-6 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="col-span-12 lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground">
                  A LITTLE ABOUT ME
                </span>
                <span className="h-px w-12 bg-border/50" />
              </div>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                Nice to meet you. <br /> I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  Naresh
                </span>
              </h3>
              <p className="text-sm font-mono tracking-widest uppercase text-muted-foreground/80">
                Full Stack Developer & UI/UX Enthusiast
              </p>
            </div>

            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
              <p>
                As an engineering-driven developer with <strong>1+ years of professional experience</strong>, I focus on the entire stack—prioritizing clean architecture, seamless performance, and modern solutions that drive real value.
              </p>
              <p>
                I have a strong track record of building complex enterprise systems, from <strong>HRMS platforms handling 500+ users</strong> to AI-driven workflow engines and scalable Next.js applications. My expertise spans across React, Node.js, Python, and cloud integrations.
              </p>
              <p>
                My philosophy is simple:{" "}
                <span className="text-foreground font-medium">
                  build things that last.
                </span>{" "}
                I help startups and businesses bridge the gap between concept and reality with code that performs flawlessly and looks stunning.
              </p>
            </div>

            {/* KPI / Milestone Tiles */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
               <div className="p-4 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm transition-colors hover:border-primary/30">
                 <p className="text-3xl font-black text-foreground">1+</p>
                 <p className="text-[9px] tracking-widest uppercase text-muted-foreground font-mono mt-1">Years Exp.</p>
               </div>
               <div className="p-4 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm transition-colors hover:border-primary/30">
                 <p className="text-3xl font-black text-foreground">4+</p>
                 <p className="text-[9px] tracking-widest uppercase text-muted-foreground font-mono mt-1">Enterprise Apps</p>
               </div>
               <div className="p-4 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm hidden md:block transition-colors hover:border-primary/30">
                 <p className="text-3xl font-black text-foreground">10+</p>
                 <p className="text-[9px] tracking-widest uppercase text-muted-foreground font-mono mt-1">Tech Stack</p>
               </div>
            </div>

            <Link
              href="/experience"
              className="inline-flex items-center gap-4 pt-4 group text-[11px] font-bold tracking-widest uppercase"
            >
              <span className="relative">
                Dive in deeper
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
              </span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-5 w-full h-[500px] lg:h-[700px] relative rounded-[2rem] border border-border/40 bg-card/5 overflow-hidden backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-500/20 blur-[100px] rounded-full pointer-events-none" />
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent />
          </div>
        </div>
      </section>

      {/* ── Reusable Sections (All Full-Bleed) ─────────────────────────── */}
      <GithubActivity />
      <BentoWidgets />

      <Footer />
    </div>
  );
}
