"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LimelightNav } from "@/components/limelight-nav";
import {
  Bookmark,
  Command,
  Home,
  Moon,
  PlusCircle,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "@/app/Context/ThemeContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", icon: <Home />, label: "Home" },
    { id: "about", icon: <Bookmark />, label: "About" },
    { id: "work", icon: <PlusCircle />, label: "Work" },
    { id: "more", icon: <User />, label: "More" },
  ];

  return (
    <>
      <div className="sticky  top-0 left-0 w-full z-40  py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 min-w-[120px]">
          <div
            className={`font-semibold transition-all duration-500 ${
              isScrolled ? "scale-110" : "scale-100"
            }`}
          >
            NA
          </div>

          <div
            className={`w-px h-6 transition-all duration-500 ${
              isScrolled ? "opacity-0" : "opacity-100 bg-border"
            }`}
          />

          <div className="leading-tight overflow-hidden">
            <div
              className={`text-sm font-medium whitespace-nowrap transition-all duration-500 ${
                isScrolled ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"
              }`}
            >
              Creative Engineering
            </div>

            <div
              className={`text-xs text-muted-foreground whitespace-nowrap transition-all duration-500 ${
                isScrolled ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"
              }`}
            >
              Building the Future
            </div>
          </div>
        </div>

        <button className="w-11 h-11 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-accent transition">
          <Command className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={
          isScrolled
            ? {
                left: "50%",
                x: "-50%",
                y: 20,
                scale: 1,
              }
            : {
                left: "calc(100% - 80px)",
                x: "-100%",
                y: 0,
                scale: 0.95,
              }
        }
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 20,
        }}
        className="fixed top-4 z-50"
      >
        <div className="flex items-center bg-card/80 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden">
          <LimelightNav items={navItems} />

          <span className="w-px h-6 bg-border" />

          <button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center hover:bg-accent transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
