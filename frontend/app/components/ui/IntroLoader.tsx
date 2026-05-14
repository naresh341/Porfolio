"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const Counter = ({ from, to, duration }: { from: number; to: number; duration: number }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration });
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
};

const IntroLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800); // Duration of the intro

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Background Decorative Circles */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 2 }}
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-[120px]"
          />

          <div className="relative overflow-hidden flex flex-col items-center">
            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 font-mono text-4xl md:text-6xl font-black text-white/90 tabular-nums"
            >
              <Counter from={0} to={100} duration={2.2} />
              <span className="text-xl md:text-2xl text-white/40 ml-2">%</span>
            </motion.div>

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
                NARESH
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="text-[10px] md:text-xs font-mono tracking-[0.8em] text-white/40 uppercase mt-6"
              >
                Creative Engineer
              </motion.p>
            </motion.div>

            {/* Scanning Line */}
            <motion.div 
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-white/30 blur-[2px] z-20 pointer-events-none"
            />
          </div>

          {/* Masking the exit animation for a premium feel */}
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.2, delay: 2, ease: [0.85, 0, 0.15, 1] }}
            className="absolute bottom-0 left-0 w-full bg-background z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
