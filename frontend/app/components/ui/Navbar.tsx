"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LimelightNav } from "@/components/limelight-nav";
import {
  Bookmark,
  Command,
  ExpandIcon,
  Home,
  Moon,
  Phone,
  PlusCircle,
  Sun,
} from "lucide-react";
import { useTheme } from "@/app/Context/ThemeContext";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      id: "home",
      icon: <Home />,
      label: "Home",
      onClick: () => router.push("/"),
    },
    {
      id: "about",
      icon: <Bookmark />,
      label: "About",
      onClick: () => router.push("/about"),
    },
    {
      id: "project",
      icon: <PlusCircle />,
      label: "Project",
      onClick: () => router.push("/projects"),
    },
    {
      id: "experience",
      icon: <ExpandIcon />,
      label: "Experience",
      onClick: () => router.push("/experience"),
    },
    {
      id: "contact",
      icon: <Phone />,
      label: "Contact",
      onClick: () => router.push("/contact"),
    },
  ];

  // Map pathname to active index for LimelightNav
  const activeIndex = navItems.findIndex((item) => {
    if (item.id === "home") return pathname === "/";
    return pathname.startsWith(
      `/${item.id === "project" ? "projects" : item.id}`,
    );
  });

  return (
    <>
      <div className="sticky top-0 left-0 w-full z-40 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 min-w-[120px]">
          <div
            className={`font-semibold transition-all duration-500 cursor-pointer ${
              isScrolled ? "scale-110" : "scale-100"
            }`}
            onClick={() => router.push("/")}
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

      <div 
        className={`fixed top-4 left-0 w-full z-[100] px-5 flex pointer-events-none transition-[justify-content] duration-700 ease-out ${
          isScrolled ? "justify-center" : "justify-end"
        }`}
      >
        <motion.div
          layout
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, scale: isScrolled ? 1 : 0.95 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            delay: mounted ? 0 : 3.5,
          }}
          className="pointer-events-auto"
        >
        <div className="flex items-center bg-card/80 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden">
          <LimelightNav
            items={navItems}
            defaultActiveIndex={activeIndex === -1 ? 0 : activeIndex}
          />

          <span className="w-px h-6 bg-border" />

          {/* Download Resume Button */}
          <button
            onClick={() => {
              try {
                window.open("http://localhost:8000/api/resume/download", "_blank");
              } catch (e) {
                console.error(e);
              }
            }}
            className="hidden md:flex h-full px-5 items-center gap-2.5 transition-colors border-x border-border group hover:bg-primary/5 dark:hover:bg-primary/10"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background shadow-md group-hover:scale-110 transition-transform duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-[1px] transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
              Resume
            </span>
          </button>

          <span className="w-px h-6 bg-border" />

          <button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center hover:bg-accent transition"
          >
            {mounted && (theme === "dark" ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            ))}
          </button>
        </div>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
