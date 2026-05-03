"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { TECH_ICONS } from "../MiniComponents/TechIcons";

/* ─── Skill data ──────────────────────────────────── */
const SKILL_ROWS: { name: string; icon?: React.ReactNode; color?: string }[][] = [
  [
    { name: "ReactJS", ...TECH_ICONS["React"] },
    { name: "Next.JS", ...TECH_ICONS["Next.js"] },
    { name: "TypeScript", ...TECH_ICONS["TypeScript"] },
    { name: "Tailwind CSS", ...TECH_ICONS["Tailwind CSS"] },
    { name: "Motion", ...TECH_ICONS["Framer Motion"] },
  ],
  [
    { name: "Node.js", ...TECH_ICONS["Node.js"] },
    { name: "Express.js", ...TECH_ICONS["Express.js"] },
    { name: "PostgreSQL", ...TECH_ICONS["PostgreSQL"] },
    { name: "MongoDB", ...TECH_ICONS["MongoDB"] },
    { name: "REST APIs", color: "#94a3b8" },
  ],
  [
    { name: "Git", ...TECH_ICONS["Git"] },
    { name: "GitHub", ...TECH_ICONS["GitHub"] },
    { name: "Vercel", ...TECH_ICONS["Vercel"] },
    { name: "Figma", ...TECH_ICONS["Figma"] },
    { name: "AI Integration", ...TECH_ICONS["Rune's AI"] },
  ],
  [
    { name: "AWS", ...TECH_ICONS["AWS"] },
    { name: "Docker", ...TECH_ICONS["Docker"] },
  ],
];

/* ─── Three.js distorted sphere ─────────────────── */
function DistortSphere({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotY = useRef(0);
  const timerRef = useRef<THREE.Timer | null>(null);

  useEffect(() => {
    const timer = new THREE.Timer();
    if (typeof document !== "undefined") timer.connect(document);
    timerRef.current = timer;
    return () => {
      timer.dispose();
    };
  }, []);

  useFrame(() => {
    if (!meshRef.current || !timerRef.current) return;
    timerRef.current.update();
    const elapsed = timerRef.current.getElapsed();
    targetRotY.current = scrollY.current * 0.003;
    meshRef.current.rotation.y += (targetRotY.current - meshRef.current.rotation.y) * 0.05 + 0.003;
    meshRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.15;
    meshRef.current.rotation.z = Math.cos(elapsed * 0.3) * 0.08;
  });

  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[1.8, 128, 128]} />
      <MeshDistortMaterial
        color="#0a0a0a"
        roughness={0.15}
        metalness={0.9}
        distort={0.38}
        speed={2.2}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

/* ─── Skill badge ────────────────────────────────── */
function SkillBadge({ name, icon, color }: { name: string; icon?: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-[12px] font-medium tracking-wide cursor-default select-none transition-all duration-200 hover:scale-105 hover:border-opacity-60"
      style={{
        background: color ? `${color}0d` : "hsl(var(--card))",
        borderColor: color ? `${color}30` : "hsl(var(--border))",
        color: color ?? "hsl(var(--foreground))",
      }}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {name}
    </span>
  );
}

/* ─── Main export ────────────────────────────────── */
export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background border-t border-border overflow-hidden">
      {/* Faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--border)) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.15,
        }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 py-20">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px w-10 bg-border" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Expertise</span>
        </div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground text-center mb-2">MY SKILLSET</p>

        {/* Big heading */}
        <h2 className="text-center text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-2">
          The Magic{" "}
          <span className="italic font-serif font-light bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Behind
          </span>
        </h2>
        <p className="text-center text-sm text-muted-foreground mb-10 max-w-md mx-auto">
          A curated stack of technologies I reach for when building modern, production-grade applications.
        </p>

        {/* Three.js sphere */}
        <div className="relative h-[320px] md:h-[380px] mx-auto" style={{ maxWidth: 400 }}>
          {/* Radial glow under sphere */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 blur-2xl rounded-full pointer-events-none"
            style={{ background: "linear-gradient(90deg,#7c3aed,#ec4899)", opacity: 0.35 }}
          />
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <pointLight position={[-4, -2, -4]} intensity={0.8} color="#7c3aed" />
            <pointLight position={[4, 2, 4]} intensity={0.6} color="#ec4899" />
            <Suspense fallback={null}>
              <Environment preset="city" />
              <DistortSphere scrollY={scrollY} />
            </Suspense>
          </Canvas>
        </div>

        {/* Skill badge rows */}
        <div className="mt-10 space-y-3 flex flex-col items-center">
          {SKILL_ROWS.map((row, ri) => (
            <div key={ri} className="flex flex-wrap gap-2.5 justify-center">
              {row.map((skill) => (
                <SkillBadge key={skill.name} {...skill} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
