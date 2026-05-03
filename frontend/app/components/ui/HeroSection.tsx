"use client";
import { ChartColumnStackedIcon, Download, MapPin } from "lucide-react";
import MatterHero from "./MatterHero";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-20">
      {/* Physics Background */}
      <MatterHero />

      {/* Main Content Layer */}
      <div className="relative z-10 pointer-events-none w-full flex flex-col gap-12">
        
        <div className="flex items-center justify-center pointer-events-auto">
          <button className="group relative inline-flex shadow-lg items-center justify-center p-0.5 rounded-xl active:scale-95 transition-all duration-300 ease-out cursor-pointer">
            <div className="absolute inset-0 rounded-xl border border-white/10" />

            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="flow-light" />
            </div>

            <div
              className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-[10px] bg-background backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:bg-background/80 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
            >
              <Download
                className="h-4 w-4 text-primary 
    transition-all duration-300 ease-out
    group-hover:-translate-y-0.5 group-hover:scale-110"
              />
              <span
                className="text-sm font-medium tracking-wide text-foreground 
    transition-all duration-300 ease-out
    group-hover:tracking-wider group-hover:opacity-90"
              >
                Download Resume
              </span>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center text-center px-6">
          <h1 className="text-[140px] md:text-[220px] lg:text-[300px] font-black tracking-tighter leading-[0.8] mb-4 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
            Naresh
          </h1>

          <div className="space-y-6">
            <p className="uppercase tracking-[0.5em] text-[10px] md:text-xs text-muted-foreground font-mono">
              <span className="text-foreground font-bold">
                Full Stack Developer
              </span>{" "}
              •{" "}
              <span className="text-foreground font-bold">
                Problem Solver
              </span>
            </p>

            <div className="space-y-2 max-w-2xl mx-auto">
              <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-muted-foreground">
                I solve{" "}
                <span className="font-medium text-foreground">real problems</span>{" "}
                with code —
              </p>
              <p className="text-2xl md:text-4xl lg:text-5xl italic font-playfair font-light opacity-90 text-foreground">
                turning{" "}
                <span className="opacity-100">
                  ideas into working solutions
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end px-6 md:px-16 mt-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
               <MapPin className="w-5 h-5" />
            </div>
            <div className="text-center">
               <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-foreground">Based in Mumbai</span>
               <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em]">Maharashtra, INDIA</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
               <ChartColumnStackedIcon className="w-5 h-5" />
            </div>
            <div className="text-center">
               <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-foreground">Full Stack Dev</span>
               <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em]">Product Designer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
