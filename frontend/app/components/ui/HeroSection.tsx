"use client";

import { motion } from "framer-motion";
import { ChartColumnStackedIcon, Download, MapPin } from "lucide-react";
import MatterHero from "./MatterHero";

const HeroSection = () => {
  const handleDownload = async () => {
    try {
      window.open("http://localhost:8000/api/resume/download", "_blank");
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-20">
      {/* Physics Background */}
      <MatterHero />

      {/* Main Content Layer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 3 }} // Wait for IntroLoader
        className="relative z-10 pointer-events-none w-full flex flex-col gap-12"
      >
        
        <div className="flex items-center justify-center pointer-events-auto">
          <button 
            onClick={handleDownload}
            className="group relative inline-flex shadow-2xl items-center justify-center p-[2px] rounded-2xl active:scale-95 transition-all duration-300 ease-out cursor-pointer overflow-hidden"
          >
            {/* The Running Border Light */}
            <div className="absolute inset-0 z-0">
              <div className="flow-light w-[150px] h-[80px]" />
            </div>

            {/* Inner Content */}
            <div
              className="relative z-10 flex items-center gap-3 px-8 py-4 rounded-[14px] bg-background/90 backdrop-blur-xl transition-all duration-300 ease-out group-hover:bg-background/70 border border-white/5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
                <Download className="relative h-5 w-5 text-primary group-hover:-translate-y-0.5 group-hover:scale-110 transition-all" />
              </div>
              <span className="text-base font-black tracking-[0.2em] uppercase text-foreground group-hover:tracking-[0.25em] transition-all">
                Download Resume
              </span>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center text-center px-6">
          <motion.h1 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 3.2, ease: "easeOut" }}
            className="text-[80px] md:text-[140px] lg:text-[180px] font-black tracking-tighter leading-[0.8] mb-4 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
          >
            Naresh
          </motion.h1>

          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
              className="uppercase tracking-[0.5em] text-[10px] md:text-xs text-muted-foreground font-mono"
            >
              <span className="text-foreground font-bold">
                Full Stack Developer
              </span>{" "}
              •{" "}
              <span className="text-foreground font-bold">
                Problem Solver
              </span>
            </motion.p>

            <div className="space-y-2 max-w-2xl mx-auto">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 3.7 }}
                className="text-2xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-muted-foreground"
              >
                I solve{" "}
                <span className="font-medium text-foreground">real problems</span>{" "}
                with code —
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 3.9 }}
                className="text-2xl md:text-4xl lg:text-5xl italic font-playfair font-light opacity-90 text-foreground"
              >
                turning{" "}
                <span className="opacity-100">
                   ideas into working solutions
                </span>
                .
              </motion.p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end px-6 md:px-16 mt-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
               <MapPin className="w-5 h-5" />
            </div>
            <div className="text-center">
               <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-foreground">Based in Mumbai</span>
               <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em]">Maharashtra, INDIA</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.3 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
               <ChartColumnStackedIcon className="w-5 h-5" />
            </div>
            <div className="text-center">
               <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-foreground">Full Stack Dev</span>
               <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em]">Product Designer</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
