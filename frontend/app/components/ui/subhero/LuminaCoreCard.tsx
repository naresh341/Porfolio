"use client";

import { useTheme } from "@/app/Context/ThemeContext";
import React, { useEffect, useRef, useState } from "react";

const WORDS = ["SUCCESS", "CONTINUE", "IMPACT", "BUILD", "GROW"];

export const LuminaCoreCard = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const stateRef = useRef({
    mx: -999,
    my: -999,
    lx: -999,
    ly: -999,
    vx: 0,
    vy: 0,
  });
  const { theme } = useTheme();

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % WORDS.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0;

    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    const particles: {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      s: number;
    }[] = [];

    const resize = () => {
      w = canvas.parentElement!.clientWidth;
      h = canvas.parentElement!.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      off.width = w * dpr;
      off.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const init = () => {
      if (w === 0 || h === 0) return;
      particles.length = 0;
      // Pre-allocate particles
      for (let i = 0; i < 6000; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          tx: Math.random() * w,
          ty: Math.random() * h,
          vx: 0,
          vy: 0,
          s: Math.random() * 1.5 + 0.5,
        });
      }
      updateText();
    };

    const updateText = () => {
      if (w === 0 || h === 0) return;
      offCtx.clearRect(0, 0, off.width, off.height);
      offCtx.fillStyle = "#fff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      const isMobile = w < 500;
      const fontSize = isMobile ? w * 0.15 : w * 0.12;
      offCtx.font = `900 ${fontSize * dpr}px 'Inter', sans-serif`;

      const word = WORDS[active];
      offCtx.fillText(word, (w / 2) * dpr, (h / 2) * dpr);

      const id = offCtx.getImageData(0, 0, off.width, off.height);
      const data = id.data;
      const points = [];

      for (let y = 0; y < off.height; y += 4) {
        for (let x = 0; x < off.width; x += 4) {
          const i = (y * off.width + x) * 4;
          if (data[i + 3] > 128) {
            points.push({ x: x / dpr, y: y / dpr });
          }
        }
      }

      // Assign target positions
      for (let i = 0; i < particles.length; i++) {
        const pt = points[i % points.length];
        particles[i].tx = pt
          ? pt.x + (Math.random() - 0.5) * 2
          : Math.random() * w;
        particles[i].ty = pt
          ? pt.y + (Math.random() - 0.5) * 2
          : Math.random() * h;
      }
    };

    updateText();
    const ro = new ResizeObserver(() => requestAnimationFrame(resize));
    ro.observe(canvas.parentElement);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const st = stateRef.current;
      const r = 80;

      ctx.fillStyle =
        theme === "dark" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";

      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction
        if (st.mx !== -999) {
          const dx = p.x - st.mx;
          const dy = p.y - st.my;
          const distSq = dx * dx + dy * dy;
          if (distSq < r * r) {
            const dist = Math.sqrt(distSq);
            const f = (r - dist) / r;
            p.vx += (dx / dist) * f * st.vx * 0.3;
            p.vy += (dy / dist) * f * st.vy * 0.3;
          }
        }

        // Spring physics
        p.vx += (p.tx - p.x) * 0.04;
        p.vy += (p.ty - p.y) * 0.04;
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;

        ctx.rect(p.x, p.y, p.s, p.s);
      }
      ctx.fill();

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [active, theme]);

  const onMove = (e: React.MouseEvent) => {
    const b = (e.target as HTMLElement).getBoundingClientRect();
    const nx = e.clientX - b.left;
    const ny = e.clientY - b.top;
    const st = stateRef.current;

    st.vx = nx - (st.lx === -999 ? nx : st.lx);
    st.vy = ny - (st.ly === -999 ? ny : st.ly);
    st.mx = st.lx = nx;
    st.my = st.ly = ny;
  };

  const onLeave = () => {
    stateRef.current.mx = -999;
    stateRef.current.my = -999;
    stateRef.current.lx = -999;
    stateRef.current.ly = -999;
  };

  return (
    <div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-20 transition-opacity duration-500 group-hover:opacity-100 dark:group-hover:opacity-40">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-transparent blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="absolute inset-0 w-full h-full">
        <canvas
          ref={ref}
          className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 p-8 flex flex-col justify-between z-20">
        <div className="flex justify-between items-center pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground">
              Fluid Sim · GLSL
            </span>
          </div>
          <span className="text-[10px] font-bold text-foreground/40 font-mono tracking-tighter">
            6K_PTCL
          </span>
        </div>
      </div>
    </div>
  );
};
