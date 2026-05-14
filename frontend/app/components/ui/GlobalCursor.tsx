"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GlobalCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Set initial position off-screen
    gsap.set([dot, ring], { x: -100, y: -100 });

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { 
        x: e.clientX, 
        y: e.clientY, 
        xPercent: -50,
        yPercent: -50,
        duration: 0.1, 
        ease: "power2.out" 
      });
      gsap.to(ring, { 
        x: e.clientX, 
        y: e.clientY, 
        xPercent: -50,
        yPercent: -50,
        duration: 0.3, 
        ease: "power2.out" 
      });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.5, opacity: 0.4, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, backgroundColor: "transparent", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);

    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[10000] shadow-[0_0_10px_rgba(var(--primary),0.5)]"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-primary/50 pointer-events-none z-[10000]"
      />
    </>
  );
}
