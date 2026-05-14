"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const ContactCard = () => {
  const [copied, setCopied] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const email = "bhati.naresh43@gmail.com";

  const handleCopy = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    const { clientX, clientY } = e;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight,
      },
      colors: ["#3b82f6", "#ffffff", "#22c55e"],
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const emailChars = email.split("");

  return (
    <motion.div
      onMouseEnter={() => setIsEmailHovered(true)}
      onMouseLeave={() => setIsEmailHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="md:col-span-1 p-6 sm:p-8 group">
        <div className=" inset-0 flex flex-col rounded-2xl h-120 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 overflow-hidden group justify-between p-6 bg-card/60 border-border   dark:group-hover:border-primary/50   dark:bg-transparent dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]  shadow">
          <div className="relative z-10 flex justify-between items-start">
            <div className="w-12 h-12 relative flex justify-center items-center">
              <motion.svg
                width={40}
                height={40}
                viewBox="0 0 40 40"
                fill="none"
                animate={{ rotate: isEmailHovered ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <circle
                  cx={20}
                  cy={20}
                  r={19}
                  className="stroke-neutral-300 dark:stroke-white"
                  strokeOpacity="0.1"
                  strokeWidth={1}
                />
                <path
                  d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20"
                  className="stroke-neutral-900 dark:stroke-white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                <path
                  d="M30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20"
                  className="stroke-neutral-900 dark:stroke-white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.1"
                />
              </motion.svg>
              <div className="absolute  w-1.5 h-1.5 bg-neutral-900 dark:bg-white rounded-full" />
            </div>

            <Link
              className="group/badge flex w-fit items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 font-semibold text-muted-foreground text-xs transition-all hover:bg-foreground/5 font-outfit"
              href="/contact"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
              </span>
              Available for work
            </Link>
          </div>

          <div className="relative z-10 -mt-4  flex flex-col gap-4">
            <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-[1.1]">
              Lets build something <br />
              <span className="font-serif italic font-light text-neutral-400 dark:text-white/40 lowercase tracking-normal leading-none">
                that actually works.
              </span>
            </h3>

            <div className="cursor-pointer group/email inline-block w-full border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: isEmailHovered ? 360 : 0 }}
                  transition={{ type: "spring", stiffness: 60, damping: 12 }}
                  className="shrink-0"
                >
                  <svg
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="none"
                    className="overflow-visible"
                  >
                    <path
                      d="M16 8 L23 12 L23 20 L16 24 L9 20 L9 12 Z"
                      className="stroke-neutral-900 dark:stroke-white"
                      strokeWidth="1.5"
                      opacity={isEmailHovered ? 1 : 0.4}
                    />
                    <circle
                      cx={16}
                      cy={16}
                      r={3}
                      className="fill-neutral-400 dark:fill-white"
                    />
                  </svg>
                </motion.div>
                <div
                  className="relative py-2 flex-1"
                  onClick={handleCopy}
                  onMouseLeave={() => setIsEmailHovered(false)}
                >
                  {emailChars.map((char, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: isEmailHovered ? -8 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                        delay: i * 0.02,
                      }}
                      className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <div className="mt-3 relative h-[2px] w-full bg-foreground/5 dark:bg-white/5 overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ x: isEmailHovered ? "0%" : "-100%" }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 ml-[44px]">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] font-bold text-green-500 uppercase tracking-[0.2em]"
                    >
                      ✓ Copied to clipboard
                    </motion.p>
                  ) : (
                    <p className="text-[9px] uppercase tracking-[0.4em] font-medium text-neutral-400 dark:text-white/30">
                      Tap to copy email
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex justify-center lg:block">
            <button className="group/btn relative w-fit px-6 lg:px-0 lg:w-full h-10 lg:h-12 rounded-[10px] bg-foreground dark:bg-primary shadow-[0_4px_0_0_rgba(0,0,0,0.25)] dark:shadow-[0_4px_0_0_#6b6b6b] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.25)] dark:hover:shadow-[0_2px_0_0_#6b6b6b] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all duration-100 ease-out flex items-center justify-center gap-2 cursor-pointer select-none">
              <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.15em] text-background dark:text-primary-foreground">
                Connect Now
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right text-background dark:text-primary-foreground lg:w-3.5 lg:h-3.5"
                aria-hidden="true"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="h-70 sm:hidden w-65 md:h-70 md:w-70 lg:h-90 lg:w-90 xl:h-95 xl:w-95 rounded-full absolute left-1/2 -translate-x-1/2 -top-10 -translate-y-[45%] border  bg-card border-border  shadow-[0_0_40px_rgba(0,0,0,0.05)]  dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]" />
      </div>
    </motion.div>
  );
};
