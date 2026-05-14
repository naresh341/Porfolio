"use client";

import { motion } from "framer-motion";
import { LayeredText } from "../../MiniComponents/LayeredText";

export const VisionCard = () => {
  return (
    <div className="p-6 sm:p-8 group h-full">
      <div className="relative overflow-hidden h-full">
        {/* Project Base Background and Border */}
        <div className="inset-0 p-6 sm:p-8 flex flex-col rounded-3xl h-120 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 overflow-hidden bg-card/60 border-border shadow group-hover:border-primary/20 dark:group-hover:border-primary/20 dark:bg-transparent dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]">
          
          {/* Header */}
          <div className="relative z-10 flex items-start justify-between w-full">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 dark:text-white/30 font-bold mb-1">
                Core Philosophy
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
          </div>

          {/* Main Content: The Layered Text */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full scale-75 sm:scale-90 lg:scale-100">
            <LayeredText 
              fontSize="48px"
              fontSizeMd="28px"
              lineHeight={45}
              lineHeightMd={28}
              className="py-0"
            />
          </div>

        </div>

        {/* Floating circle decoration (Project Base Standard) */}
        <div className="md:h-70 md:w-70 lg:h-120 lg:w-120 rounded-full absolute top-0 right-0 -translate-y-[55%] translate-x-[55%] z-0 border bg-card border-border opacity-40 pointer-events-none transition-transform duration-700 group-hover:scale-105" />
      </div>
    </div>
  );
};
