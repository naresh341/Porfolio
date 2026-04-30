"use client";
import { ChartColumnStackedIcon, Download, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <button className="group relative inline-flex shadow-lg items-center justify-center p-0.5 rounded-xl active:scale-95 transition-all duration-300 ease-out">
          <div className="absolute inset-0 rounded-xl border " />

          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="flow-light" />
          </div>

          <div
            className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-[10px] bg-background backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:bg-background/80 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
"
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

      <div className="flex flex-col items-center text-center">
        <h1 className="text-[280px] font-bold ">Naresh</h1>

        <div className="mt-[-30px] space-y-4">
          <p className="uppercase tracking-[0.4em] text-[13px] text-muted-foreground">
            <span className="text-foreground font-semibold">
              Full Stack Developer
            </span>{" "}
            •{" "}
            <span className="text-foreground font-semibold">
              Problem Solver
            </span>
          </p>

          <p className="text-3xl md:text-5xl font-light leading-tight tracking-tight opacity-90">
            I solve{" "}
            <span className="font-medium text-foreground">real problems</span>{" "}
            with code —
            <br />
            <span className="italic font-serif opacity-70">
              turning{" "}
              <span className="text-foreground">
                ideas into working solutions
              </span>
              .
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center px-10 mt-10">
        <div className="flex flex-col items-center gap-1">
          <MapPin />
          <span className="font-bold uppercase ">Based in Mumbai</span>
          <span className="text-md opacity-80 uppercase">INDIA</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <ChartColumnStackedIcon />
          <span className="font-bold uppercase ">Full Stack Dev</span>
          <span className="text-sm opacity-80 uppercase">Designer</span>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
