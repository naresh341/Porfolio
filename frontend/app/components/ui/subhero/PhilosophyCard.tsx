"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, Layers, Sparkles } from "lucide-react";
import React, { useState } from "react";

const FloatingTag = ({
  children,
  icon: Icon,
  delay = 0,
}: {
  children: React.ReactNode;
  icon: any;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{
      opacity: [0.4, 0.8, 0.4],
      y: [0, -10, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm"
  >
    <Icon size={12} className="text-white/40" />
    <span className="text-[10px] font-medium text-white/50 uppercase tracking-[0.2em]">
      {children}
    </span>
  </motion.div>
);

export const PhilosophyCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="group relative h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 flex flex-col justify-center"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-600/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full"
        />
      </div>

      {/* Floating Labels */}
      <div className="absolute top-8 right-8 flex flex-col gap-3">
        <FloatingTag icon={Fingerprint} delay={0}>
          Sensory
        </FloatingTag>
        <FloatingTag icon={Layers} delay={2}>
          Layered
        </FloatingTag>
      </div>

      <div className="absolute bottom-8 left-8">
        <FloatingTag icon={Sparkles} delay={1}>
          Refined
        </FloatingTag>
      </div>

      {/* Typography */}
      <div className="relative z-10 space-y-6">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] uppercase tracking-[0.4em] text-white/40 font-bold mb-4"
          >
            Design Philosophy
          </motion.p>
        </div>

        <h3 className="text-5xl lg:text-6xl font-medium tracking-tighter text-white leading-[0.9]">
          Interfaces <br />
          <motion.span
            className="italic font-light text-white/40"
            animate={{
              color: isHovered
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(255, 255, 255, 0.4)",
            }}
          >
            you can feel.
          </motion.span>
        </h3>

        <motion.p
          className="text-white/40 text-lg max-w-[18ch] font-light leading-snug"
          animate={{ opacity: isHovered ? 0.8 : 0.5 }}
        >
          I sweat the spacing, timing, and feedback — the things that make
          software feel alive.
        </motion.p>
      </div>

      {/* Dynamic Glow Response */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-white/[0.02] transition-colors" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-white/[0.05] to-transparent blur-3xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.div>
  );
};
