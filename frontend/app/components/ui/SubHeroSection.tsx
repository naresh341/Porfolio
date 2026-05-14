"use client";

import { motion } from "framer-motion";
import Clock from "./subhero/Clock";
import { ContactCard } from "./subhero/ContactCard";
import CubeCard from "./subhero/CubeCard";
import InterfaceCard from "./subhero/InterfaceCard";
import { LuminaCoreCard } from "./subhero/LuminaCoreCard";
import { PrecisionScannerCard } from "./subhero/PrecisionScannerCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SubHeroSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative w-full py-10 bg-background dark:bg-grid-white/[0.01] bg-grid-black/[0.02] flex items-center justify-center"
    >
      <Clock />

      {/* The Concave Cutout Mask - Sits exactly behind the Clock and uses clip-path to only affect the bottom cards */}
      <div
        className="hidden md:block w-[65vw] h-[65vw] md:w-70 md:h-70 lg:w-90 lg:h-90 xl:w-95 xl:h-95 rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-background border border-border z-10 pointer-events-none shadow-xl dark:shadow-none"
        style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 w-full relative">
        {/* Cube Section */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -10,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        >
          <CubeCard />
        </motion.div>

        {/* Interface Section */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2"
          whileHover={{
            y: -10,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        >
          <InterfaceCard />
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -10,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        >
          <div className="h-70 sm:hidden w-65 md:h-70 md:w-70 lg:h-90 lg:w-90 xl:h-95 xl:w-95 rounded-full absolute left-1/2 -translate-x-1/2 -top-10 -translate-y-[45%] border bg-card border-border shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]" />
          <ContactCard />
        </motion.div>

        {/* Bottom Large Cards - Rendering below the cutout mask */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 p-2 relative z-0"
        >
          <div className="relative overflow-hidden group">
            <div className="inset-0 p-4 rounded-xl h-100 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 overflow-hidden  bg-white/60 border-black/10 shadow  dark:group-hover:border-white/20   dark:bg-transparent dark:border-white/10 dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] ">
              <PrecisionScannerCard />
            </div>
            <div className="md:h-70 md:w-70 lg:h-120 lg:w-120 rounded-full absolute top-0 right-0 -translate-y-[55%] translate-x-[55%] z-0 border  bg-zinc-50 border-black/10   dark:bg-black dark:border-white/10" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="md:col-span-2 p-2 relative z-0"
        >
          <div className="relative overflow-hidden group">
            <div className="inset-0 p-4 rounded-xl h-100 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 overflow-hidden  bg-white/60 border-black/10 shadow  dark:group-hover:border-white/20   dark:bg-transparent dark:border-white/10 dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] "></div>
            <div className="md:h-70 md:w-70 lg:h-120 lg:w-120 rounded-full absolute top-0 left-0 -translate-y-[55%] -translate-x-[55%] z-0 border  bg-zinc-50 border-black/10  shadow-[0_0_40px_rgba(0,0,0,0.05)]  dark:bg-black dark:border-white/15 dark:shadow-[0_0_40px_rgba(255,255,255,0.05)]" />
            <LuminaCoreCard />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SubHeroSection;
