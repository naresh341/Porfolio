"use client";

import { profileService } from "@/app/services/api";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Send } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

/* ── project-type chips ─────────────────────────────────────────────────── */
const PROJECT_TYPES = [
  "Full Stack Dev",
  "Backend / API",
  "Frontend / UI",
  "Open to Discuss",
];

const SOCIAL = [
  {
    icon: <FaGithub className="w-4 h-4" />,
    href: "https://github.com/naresh341",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn className="w-4 h-4" />,
    href: "https://linkedin.com/in/naresh341",
    label: "LinkedIn",
  },
  {
    icon: <FaXTwitter className="w-4 h-4" />,
    href: "https://twitter.com/naresh341",
    label: "Twitter / X",
  },
];

/* ── component ──────────────────────────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  /* ── GSAP scroll reveal ── */
  useGSAP(
    () => {
      // heading chars stagger
      gsap.from(".c-word", {
        y: "105%",
        duration: 1.1,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // left panel items
      gsap.from(".c-left-item", {
        x: -36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 75%",
        },
      });

      // right form
      gsap.from(".c-right-item", {
        x: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 75%",
        },
      });

      // divider line draw
      gsap.from(".c-divider", {
        scaleY: 0,
        duration: 1.2,
        ease: "expo.out",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef },
  );

  /* ── form handlers ── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await profileService.sendContactMessage({
        ...formData,
        projectType: selectedType ?? "Open to Discuss",
      });
      setStatus({
        type: "success",
        msg: "Message sent — I'll be in touch shortly.",
      });
      setFormData({ name: "", email: "", message: "" });
      setSelectedType(null);
    } catch {
      setStatus({
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ── markup ─────────────────────────────────────────────────────────── */
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-background border-t border-border/20 overflow-hidden flex flex-col"
    >
      {/* ── ambient background blobs ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* ── section label ────────────────────────────────────────────────── */}
      <div className="relative z-10 px-6 lg:px-16 pt-16 pb-10 flex items-center gap-4">
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-muted-foreground">
          05 — Contact
        </span>
        <span className="flex-1 h-px bg-border/30" />
      </div>

      <div ref={headingRef} className="relative z-10 px-6 lg:px-16 pb-16">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.5rem,9vw,8rem)] font-black tracking-tighter leading-[0.9] text-foreground"
        >
          Let&apos;s build <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.3)]">
            your vision.
          </span>
        </motion.h2>
      </div>

      {/* ── two-column body ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 px-6 lg:px-16 pb-20 gap-16 lg:gap-0">
        {/* ── LEFT: info (5 Columns) ─────────────────────────────────────────────────── */}
        <div
          ref={leftRef}
          className="lg:col-span-5 flex flex-col justify-between gap-12 pr-0 lg:pr-20"
        >
          <div className="space-y-8">
            <p className="c-left-item text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Have a groundbreaking idea? Let&apos;s collaborate to turn it into
              a
              <span className="text-foreground font-medium">
                {" "}
                digital reality
              </span>
              .
            </p>

            <div className="c-left-item flex flex-col gap-6">
              <a
                href="mailto:bhati.naresh43@gmail.com"
                className="group w-fit flex flex-col gap-1"
              >
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground/60">
                  Email Me
                </span>
                <span className="text-2xl font-bold border-b-2 border-transparent group-hover:border-primary transition-all">
                  bhati.naresh43@gmail.com
                </span>
              </a>

              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground/60">
                  Location
                </span>
                <span className="text-lg font-medium text-foreground/80">
                  Mumbai, India · IST (UTC+5:30)
                </span>
              </div>
            </div>
          </div>

          {/* social links */}
          <div className="c-left-item space-y-6">
            <div className="flex gap-4">
              {SOCIAL.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  className="w-12 h-12 rounded-2xl border border-border/50 flex items-center justify-center hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300"
                >
                  {s.icon}
                </Link>
              ))}
            </div>

            <a
              href={profileService.getResumeUrl()}
              download
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all"
            >
              <Download className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold uppercase tracking-widest">
                Download CV
              </span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: form (7 Columns) ────────────────────────────────────────────────── */}
        <div ref={rightRef} className="lg:col-span-7">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Form Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground/60 ml-2">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-all placeholder:text-muted-foreground/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground/60 ml-2">
                    Email
                  </label>
                  <input
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-all placeholder:text-muted-foreground/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground/60 ml-2">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
                        selectedType === type
                          ? "bg-primary text-background border-primary"
                          : "bg-background/50 border-border/50 hover:border-primary/30"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground/60 ml-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What's on your mind?"
                  className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-all placeholder:text-muted-foreground/20 resize-none"
                />
              </div>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl text-xs font-bold text-center ${
                    status.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {status.msg}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full h-[72px] rounded-2xl overflow-hidden active:scale-95 transition-all duration-300 ease-out cursor-pointer p-[2px]"
              >
                {/* The Running Border Light */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flow-light w-[150px] h-[80px]" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full rounded-[14px] bg-background/90 backdrop-blur-xl flex items-center justify-center gap-4 border border-white/5 group-hover:bg-background/70 transition-all duration-300">
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-foreground">
                    {loading ? "Sending..." : "Send Message"}
                  </span>
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
                    <Send className="relative w-5 h-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── footer strip ─────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-border/20 px-6 lg:px-16 py-8 flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground/40">
          © 2026 Naresh Bhati
        </span>
        <div className="flex gap-6">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground/40">
            Design x Engineering
          </span>
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground/40">
            Mumbai · India
          </span>
        </div>
      </div>
    </section>
  );
}
