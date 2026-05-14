// "use client";

// import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
// import { useRef, useState } from "react";
// import { TECH_ICONS } from "./TechIcons";

// interface Project {
//   name: string;
//   description: string;
//   highlights: string[];
//   tags: string[];
//   color: string;
//   role?: string;
//   desktop?: string;
// }

// export default function ProjectCard({
//   project,
//   index,
//   total,
// }: {
//   project: Project;
//   index: number;
//   total: number;
// }) {
//   const panelRef = useRef<HTMLDivElement>(null);
//   const spotlightRef = useRef<HTMLDivElement>(null);
//   const [hovered, setHovered] = useState(false);

//   const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const el = panelRef.current;
//     const spot = spotlightRef.current;
//     if (!el || !spot) return;
//     const r = el.getBoundingClientRect();
//     const x = e.clientX - r.left;
//     const y = e.clientY - r.top;
//     spot.style.left = `${x}px`;
//     spot.style.top = `${y}px`;
//     el.querySelectorAll<HTMLElement>("[data-depth]").forEach((p) => {
//       const d = Number(p.dataset.depth ?? 0);
//       const dx = (x / r.width - 0.5) * d;
//       const dy = (y / r.height - 0.5) * d;
//       p.style.transform = `translate3d(${dx}px,${dy}px,0)`;
//     });
//   };
//   const onEnter = () => setHovered(true);
//   const onLeave = () => {
//     setHovered(false);
//     panelRef.current
//       ?.querySelectorAll<HTMLElement>("[data-depth]")
//       .forEach((p) => (p.style.transform = "translate3d(0,0,0)"));
//   };

//   const num = String(index + 1).padStart(2, "0");
//   const totalStr = String(total).padStart(2, "0");
//   const techArray = project.tech_stack.split(",").map((t) => t.trim());

//   return (
//     <section className="project-panel relative shrink-0 w-screen h-screen flex items-center justify-center overflow-hidden bg-background">
//       {/* Per-project ambient glow */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background: `radial-gradient(ellipse 55% 55% at 72% 50%, ${project.color}12, transparent 70%)`,
//         }}
//         aria-hidden
//       />
//       {/* Fine grid */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage:
//             "linear-gradient(hsl(var(--border)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--border)) 1px,transparent 1px)",
//           backgroundSize: "60px 60px",
//           opacity: 0.18,
//         }}
//         aria-hidden
//       />
//       {/* Mouse spotlight */}
//       <div
//         ref={spotlightRef}
//         className="pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
//         style={{
//           width: 600,
//           height: 600,
//           background: `radial-gradient(circle, ${project.color}08 0%, transparent 70%)`,
//           opacity: hovered ? 1 : 0,
//         }}
//         aria-hidden
//       />

//       {/* Main grid */}
//       <div
//         ref={panelRef}
//         onMouseMove={onMove}
//         onMouseEnter={onEnter}
//         onMouseLeave={onLeave}
//         className="panel-inner relative w-full max-w-[1400px] mx-auto px-8 lg:px-16 grid grid-cols-12 gap-6 lg:gap-14 items-center h-full pt-11"
//       >
//         {/* ── LEFT ──────────────────────────────── */}
//         <div className="col-span-12 lg:col-span-5 flex flex-col gap-5 relative z-10">
//           {/* Index */}
//           <div className="flex items-center gap-3" data-reveal>
//             <span
//               className="font-mono text-xs font-bold"
//               style={{ color: project.color }}
//             >
//               {num}
//             </span>
//             <span
//               className="h-px w-8"
//               style={{ background: project.color, opacity: 0.4 }}
//             />
//             <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
//               {totalStr} Projects
//             </span>
//           </div>

//           {/* Name */}
//           <div data-reveal data-depth="10">
//             <h2 className="text-[clamp(2.8rem,5vw,5.2rem)] font-black tracking-tighter leading-[0.88] text-foreground">
//               {project.name}
//             </h2>
//             {project.role && (
//               <p className="mt-1.5 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
//                 {project.role}
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <p
//             className="text-muted-foreground text-sm leading-relaxed max-w-[44ch]"
//             data-reveal
//             data-depth="5"
//           >
//             {project.description}
//           </p>

//           {/* Highlights */}
//           <ul className="space-y-2" data-reveal>
//             {project.highlights.slice(0, 3).map((h, i) => (
//               <li
//                 key={i}
//                 className="flex items-start gap-2.5 text-[13px] text-foreground/75"
//               >
//                 <span
//                   className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
//                   style={{ background: project.color }}
//                 />
//                 {h}
//               </li>
//             ))}
//           </ul>

//           <div className="h-px w-full bg-border" data-reveal />

//           {/* Tech stack with icons */}
//           <div data-reveal>
//             <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
//               Tech Stack
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {project.tags.map((tag) => {
//                 const tech = TECH_ICONS[tag];
//                 return (
//                   <span
//                     key={tag}
//                     className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md border tracking-wide transition-all duration-200 cursor-default hover:scale-105"
//                     style={{
//                       borderColor: tech
//                         ? `${tech.color}35`
//                         : "hsl(var(--border))",
//                       color: tech?.color ?? "hsl(var(--foreground))",
//                       background: tech
//                         ? `${tech.color}0d`
//                         : "hsl(var(--muted))",
//                     }}
//                   >
//                     {tech?.icon}
//                     {tag}
//                   </span>
//                 );
//               })}
//             </div>
//           </div>

//           {/* CTA */}
//           <div className="flex items-center gap-3" data-reveal>
//             <a
//               href="#"
//               className="group inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase rounded-sm transition-all duration-200 hover:scale-[1.02]"
//               style={{ background: project.color, color: "#000" }}
//             >
//               Visit Live <ExternalLink className="h-3 w-3" />
//             </a>
//             <a
//               href="#"
//               className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-[11px] font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-muted transition-all duration-200"
//             >
//               Source <GitBranch className="h-3 w-3" />
//             </a>
//           </div>
//         </div>

//         {/* ── RIGHT: Mockup ──────────────── */}
//         <div
//           className="hidden lg:flex col-span-7 h-[76vh] flex-col gap-3 relative z-10"
//           data-depth="16"
//         >
//           {/* Browser frame */}
//           <div
//             className="relative flex-1 rounded-xl overflow-hidden border border-border/60 bg-card flex flex-col"
//             style={{
//               boxShadow: `0 0 0 1px ${project.color}1a, 0 40px 80px -20px ${project.color}15`,
//             }}
//           >
//             {/* Chrome bar */}
//             <div className="shrink-0 h-8 bg-muted border-b border-border flex items-center gap-1.5 px-4">
//               <span
//                 className="h-2 w-2 rounded-full"
//                 style={{ background: `${project.color}70` }}
//               />
//               <span className="h-2 w-2 rounded-full bg-border" />
//               <span className="h-2 w-2 rounded-full bg-border" />
//               <div className="ml-3 flex-1 max-w-[200px] h-4 bg-background/80 rounded flex items-center px-2.5">
//                 <span className="text-[9px] text-muted-foreground tracking-wider">
//                   {project.name.toLowerCase()}.app
//                 </span>
//               </div>
//               {/* Live indicator */}
//               <div className="ml-auto flex items-center gap-1.5 mr-1">
//                 <span
//                   className="h-1.5 w-1.5 rounded-full animate-pulse"
//                   style={{ background: project.color }}
//                 />
//                 <span className="text-[8px] text-muted-foreground tracking-wider">
//                   Live
//                 </span>
//               </div>
//             </div>

//             {/* Mockup content */}
//             <div className="flex-1 relative overflow-hidden">
//               {/* Dot grid */}
//               <div
//                 className="absolute inset-0"
//                 style={{
//                   backgroundImage: `radial-gradient(${project.color}0a 1px, transparent 1px)`,
//                   backgroundSize: "24px 24px",
//                 }}
//               />
//               {/* Ghost letter */}
//               <div
//                 className="absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none"
//                 style={{
//                   fontSize: "18vw",
//                   color: project.color,
//                   opacity: 0.035,
//                   letterSpacing: "-0.05em",
//                 }}
//               >
//                 {project.name[0]}
//               </div>

//               {/* Abstract UI wireframe */}
//               <div className="absolute inset-0 p-8 flex flex-col gap-4">
//                 {/* Top nav bar */}
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="h-7 w-28 rounded"
//                     style={{ background: `${project.color}20` }}
//                   />
//                   <div className="flex-1 flex gap-2 justify-end">
//                     {[60, 48, 52].map((w, i) => (
//                       <div
//                         key={i}
//                         className="h-5 rounded"
//                         style={{ width: w, background: `${project.color}12` }}
//                       />
//                     ))}
//                     <div
//                       className="h-7 w-20 rounded"
//                       style={{ background: `${project.color}30` }}
//                     />
//                   </div>
//                 </div>

//                 {/* Hero band */}
//                 <div
//                   className="h-32 rounded-lg relative overflow-hidden"
//                   style={{
//                     background: `${project.color}18`,
//                     borderColor: `${project.color}25`,
//                     border: "1px solid",
//                   }}
//                 >
//                   <div className="absolute inset-0 flex flex-col justify-center px-6 gap-2">
//                     <div
//                       className="h-5 w-48 rounded"
//                       style={{ background: `${project.color}40` }}
//                     />
//                     <div
//                       className="h-3 w-72 rounded"
//                       style={{ background: `${project.color}20` }}
//                     />
//                     <div
//                       className="h-3 w-60 rounded"
//                       style={{ background: `${project.color}15` }}
//                     />
//                     <div
//                       className="mt-2 h-7 w-28 rounded"
//                       style={{ background: `${project.color}60` }}
//                     />
//                   </div>
//                 </div>

//                 {/* Card grid */}
//                 <div className="grid grid-cols-3 gap-3 flex-1">
//                   {[0.9, 0.6, 0.75, 0.85, 0.5, 0.7].map((o, i) => (
//                     <div
//                       key={i}
//                       className="rounded-lg"
//                       style={{
//                         background: `${project.color}${Math.round(o * 18)
//                           .toString(16)
//                           .padStart(2, "0")}`,
//                         border: `1px solid ${project.color}20`,
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 3-tile bottom row */}
//           <div className="shrink-0 grid grid-cols-3 gap-3 h-[120px]">
//             <div className="rounded-xl border border-border bg-card p-4 flex flex-col justify-between">
//               <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
//                 Role
//               </span>
//               <div>
//                 <p className="text-foreground font-semibold text-sm">
//                   {project.role ?? "Full-stack"}
//                 </p>
//                 <p className="text-muted-foreground text-[10px]">
//                   Design & Engineering
//                 </p>
//               </div>
//             </div>
//             <div
//               className="rounded-xl border p-4 flex flex-col justify-between"
//               style={{
//                 borderColor: `${project.color}30`,
//                 background: `${project.color}08`,
//               }}
//             >
//               <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
//                 Stack
//               </span>
//               <div>
//                 <p
//                   className="font-black text-2xl tracking-tighter"
//                   style={{ color: project.color }}
//                 >
//                   {project.tags.length}
//                 </p>
//                 <p className="text-muted-foreground text-[10px]">
//                   technologies
//                 </p>
//               </div>
//             </div>
//             <a
//               href="#"
//               className="group rounded-xl border border-border bg-card p-4 flex flex-col justify-between hover:border-foreground/25 transition-all duration-300 cursor-pointer"
//             >
//               <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
//                 Case Study
//               </span>
//               <div className="flex items-end justify-between">
//                 <p className="text-foreground font-semibold text-sm">
//                   View Project
//                 </p>
//                 <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground group-hover:text-background">
//                   <ArrowUpRight className="h-3.5 w-3.5" />
//                 </div>
//               </div>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom marquee */}
//       <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none border-t border-border/40">
//         <div className="flex gap-10 animate-marquee whitespace-nowrap py-2.5 text-[9px] tracking-[0.35em] uppercase text-muted-foreground/50">
//           {Array.from({ length: 4 }).flatMap((_, k) =>
//             [...project.tags, project.name, "scroll →"].map((t, i) => (
//               <span key={`${k}-${i}`} className="flex items-center gap-10">
//                 {t}
//                 <span
//                   className="h-0.5 w-0.5 rounded-full"
//                   style={{ background: project.color, opacity: 0.5 }}
//                 />
//               </span>
//             )),
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
