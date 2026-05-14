"use client";

import { Float, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { TECH_ICONS } from "../MiniComponents/TechIcons";
import { useTheme } from "@/app/Context/ThemeContext";

/* ─── Skill data ──────────────────────────────────── */
const SKILLS_ALL = [
  { name: "ReactJS", key: "React" },
  { name: "Next.JS", key: "Next.js" },
  { name: "TypeScript", key: "TypeScript" },
  { name: "Tailwind CSS", key: "Tailwind CSS" },
  { name: "JavaScript", key: "JavaScript" },
  { name: "Redux", key: "Redux" },
  { name: "Node.js", key: "Node.js" },
  { name: "PostgreSQL", key: "PostgreSQL" },
  { name: "MongoDB", key: "MongoDB" },
  { name: "Docker", key: "Docker" },
  { name: "AWS", key: "AWS" },
  { name: "GCP", key: "GCP" },
  { name: "Git", key: "Git" },
  { name: "GitHub", key: "GitHub" },
  { name: "Python", key: "Python" },
  { name: "FastAPI", key: "FastAPI" },
  { name: "Three.js", key: "Three.js" },
  { name: "Framer Motion", key: "Framer Motion" },
  { name: "Vercel", key: "Vercel" },
  { name: "Figma", key: "Figma" },
].map((s) => ({ ...s, ...TECH_ICONS[s.key] }));

const PARTICLE_COUNT = 4000;

const SHAPE_MAP: Record<
  string,
  "sphere" | "ring" | "helix" | "star" | "cube" | "wave"
> = {
  ReactJS: "ring",
  "Next.JS": "cube",
  TypeScript: "sphere",
  "Tailwind CSS": "wave",
  "Node.js": "helix",
  PostgreSQL: "cylinder",
  MongoDB: "sphere",
  Docker: "cube",
  AWS: "star",
  GCP: "star",
  Git: "star",
  GitHub: "star",
  Python: "wave",
  FastAPI: "helix",
  "Three.js": "sphere",
} as any;

function buildPositions() {
  const sphere = new Float32Array(PARTICLE_COUNT * 3);
  const ring = new Float32Array(PARTICLE_COUNT * 3);
  const helix = new Float32Array(PARTICLE_COUNT * 3);
  const star = new Float32Array(PARTICLE_COUNT * 3);
  const wave = new Float32Array(PARTICLE_COUNT * 3);
  const cube = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    // Sphere
    const u = Math.random(),
      v = Math.random();
    const theta = 2 * Math.PI * u,
      phi = Math.acos(2 * v - 1);
    sphere[i3] = 2.4 * Math.sin(phi) * Math.cos(theta);
    sphere[i3 + 1] = 2.4 * Math.sin(phi) * Math.sin(theta);
    sphere[i3 + 2] = 2.4 * Math.cos(phi);

    // Ring (torus)
    const ringAngle = Math.random() * Math.PI * 2;
    const ringR = 2.5 + (Math.random() - 0.5) * 0.4;
    ring[i3] = Math.cos(ringAngle) * ringR;
    ring[i3 + 1] = (Math.random() - 0.5) * 0.3;
    ring[i3 + 2] = Math.sin(ringAngle) * ringR;

    // Helix (DNA)
    const t = (i / PARTICLE_COUNT) * Math.PI * 12 - Math.PI * 6;
    const side = i % 2 === 0 ? 1 : -1;
    helix[i3] = Math.cos(t) * 2.0;
    helix[i3 + 1] = t * 0.22;
    helix[i3 + 2] = Math.sin(t) * 2.0 * side;

    // Star burst
    const starAngle = Math.random() * Math.PI * 2;
    const starArm = Math.floor(Math.random() * 5);
    const starArmAngle = (starArm / 5) * Math.PI * 2 + starAngle * 0.1;
    const starR = Math.random() * 2.5;
    star[i3] = Math.cos(starArmAngle) * starR;
    star[i3 + 1] = (Math.random() - 0.5) * 0.6;
    star[i3 + 2] = Math.sin(starArmAngle) * starR;

    // Wave
    const wx = (Math.random() - 0.5) * 6;
    const wz = (Math.random() - 0.5) * 3;
    wave[i3] = wx;
    wave[i3 + 1] = Math.sin(wx * 1.2) * Math.cos(wz * 0.8) * 1.2;
    wave[i3 + 2] = wz;

    // Cube wireframe
    const face = Math.floor(Math.random() * 6);
    const a = (Math.random() - 0.5) * 4;
    const b = (Math.random() - 0.5) * 4;
    const c = 2;
    if (face === 0) {
      cube[i3] = a;
      cube[i3 + 1] = b;
      cube[i3 + 2] = c;
    } else if (face === 1) {
      cube[i3] = a;
      cube[i3 + 1] = b;
      cube[i3 + 2] = -c;
    } else if (face === 2) {
      cube[i3] = a;
      cube[i3 + 1] = c;
      cube[i3 + 2] = b;
    } else if (face === 3) {
      cube[i3] = a;
      cube[i3 + 1] = -c;
      cube[i3 + 2] = b;
    } else if (face === 4) {
      cube[i3] = c;
      cube[i3 + 1] = a;
      cube[i3 + 2] = b;
    } else {
      cube[i3] = -c;
      cube[i3 + 1] = a;
      cube[i3 + 2] = b;
    }
  }

  return { sphere, ring, helix, star, wave, cube };
}

function InteractiveParticles({
  activeShape,
  theme,
}: {
  activeShape: string;
  theme: string;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  const shapes = useMemo(() => buildPositions(), []);
  const currentPos = useMemo(() => new Float32Array(shapes.sphere), [shapes]); // Initialize with sphere

  useFrame((_, delta) => {
    const target = (shapes as any)[activeShape] ?? shapes.sphere;
    const lerpFactor = Math.min(delta * 4, 1); // Dynamic lerp

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      currentPos[i3] = THREE.MathUtils.lerp(
        currentPos[i3],
        target[i3],
        lerpFactor,
      );
      currentPos[i3 + 1] = THREE.MathUtils.lerp(
        currentPos[i3 + 1],
        target[i3 + 1],
        lerpFactor,
      );
      currentPos[i3 + 2] = THREE.MathUtils.lerp(
        currentPos[i3 + 2],
        target[i3 + 2],
        lerpFactor,
      );

      // Smooth Mouse Interaction
      const mx = (mouse.x * viewport.width) / 2;
      const my = (mouse.y * viewport.height) / 2;
      const dx = currentPos[i3] - mx;
      const dy = currentPos[i3 + 1] - my;
      const distSq = dx * dx + dy * dy;
      const radius = 2.0;

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq);
        const force = (radius - dist) / radius;
        currentPos[i3] += dx * force * 0.1;
        currentPos[i3 + 1] += dy * force * 0.1;
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += delta * 0.15;
    }
  });

  // In light mode: dark particles so they're visible
  const color = theme === "dark" ? "#ffffff" : "#111111";
  const size = theme === "dark" ? 0.03 : 0.04;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={currentPos}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={theme === "dark" ? 0.85 : 0.9}
      />
    </points>
  );
}

export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string>("sphere");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { theme } = useTheme();

  const activeShape = hoveredSkill
    ? ((SHAPE_MAP as any)[hoveredSkill] ?? "sphere")
    : ((SHAPE_MAP as any)[activeSkill] ?? "sphere");

  const activeSkillData = SKILLS_ALL.find(
    (s) => s.name === (hoveredSkill ?? activeSkill),
  );

  return (
    <section className="relative overflow-hidden py-20 bg-background border-t border-border/20">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Particle Canvas — TOP */}
        <div className="relative h-[380px] w-full mb-4 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
                <InteractiveParticles activeShape={activeShape} theme={theme} />
              </Float>
            </Suspense>
          </Canvas>
          {activeSkillData?.color && (
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-1000"
              style={{
                background: `radial-gradient(ellipse 40% 50% at 50% 50%, ${activeSkillData.color}15, transparent 70%)`,
              }}
            />
          )}
        </div>

        {/* Section Label — BELOW canvas */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground font-mono mb-2">
            My Skillset
          </p>
          <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter text-foreground mt-1 leading-[0.9]">
            The Magic{" "}
            <span className="font-serif italic font-light bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Behind
            </span>
          </h2>

          {/* Fixed Height Container to prevent jumping */}
          <div className="h-8 flex items-center justify-center mt-2">
            {activeSkillData?.name && (
              <motion.p
                key={activeSkillData.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-mono tracking-widest uppercase"
                style={{
                  color: activeSkillData.color ?? "var(--muted-foreground)",
                }}
              >
                {activeSkillData.name} — {activeShape} shape
              </motion.p>
            )}
          </div>
        </div>

        {/* Skill Badges — white border style */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
          {SKILLS_ALL.map((skill) => {
            const isActive = activeSkill === skill.name;
            return (
              <motion.button
                key={skill.name}
                onClick={() => setActiveSkill(skill.name)}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-xl border-2 text-sm md:text-base font-bold transition-all duration-200"
                style={{
                  borderColor: isActive
                    ? (skill.color ?? "white")
                    : "rgba(255,255,255,0.18)",
                  color: isActive
                    ? (skill.color ?? "var(--foreground)")
                    : "var(--foreground)",
                  background: isActive
                    ? `${skill.color ?? "#fff"}12`
                    : "transparent",
                  boxShadow: isActive
                    ? `0 0 12px ${skill.color ?? "#fff"}30`
                    : "none",
                }}
              >
                {skill.icon && (
                  <span className="shrink-0 scale-110 md:scale-125 transition-transform">
                    {skill.icon}
                  </span>
                )}
                {skill.name}
              </motion.button>
            );
          })}
        </div>

        {/* Bottom hint */}
        <p className="text-center text-[9px] font-mono tracking-[0.4em] uppercase text-muted-foreground/40 mt-8">
          Hover a skill to morph the particles
        </p>
      </div>
    </section>
  );
}
