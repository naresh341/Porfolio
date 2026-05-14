"use client";

import { githubService, spotifyService } from "@/app/services/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedinIn,
  FaPython,
  FaReact,
} from "react-icons/fa6";
import { SiFastapi, SiSpotify } from "react-icons/si";
import Image from "next/image";
const GITHUB_USERNAME = "naresh341";

type GitHubPublicEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: { sha: string; message: string }[];
    action?: string;
    ref?: string;
    ref_type?: string;
    description?: string;
  };
};

function formatRelativeTime(iso: string): string {
  const sec = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return "just now";
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  if (sec < 604800) return `${Math.floor(sec / 86400)}d ago`;
  return new Date(iso).toLocaleDateString();
}

function summarizeEvent(ev: GitHubPublicEvent): {
  title: string;
  meta: string;
  href: string;
} | null {
  const repo = ev.repo?.name ?? "";
  const repoUrl = `https://github.com/${repo}`;

  switch (ev.type) {
    case "PushEvent": {
      const commits = ev.payload?.commits ?? [];
      if (commits.length === 0)
        return {
          title: "Pushed commits",
          meta: repo,
          href: repoUrl,
        };
      const last = commits[commits.length - 1];
      const line = (last.message ?? "").split("\n")[0].slice(0, 120);
      return {
        title: line || "Push",
        meta: `${repo} · ${commits.length} commit${commits.length > 1 ? "s" : ""}`,
        href: `${repoUrl}/commit/${last.sha}`,
      };
    }
    case "PullRequestEvent": {
      const action = ev.payload?.action ?? "updated";
      return {
        title: `Pull request ${action}`,
        meta: repo,
        href: repoUrl,
      };
    }
    case "IssuesEvent": {
      const action = ev.payload?.action ?? "updated";
      return {
        title: `Issue ${action}`,
        meta: repo,
        href: repoUrl,
      };
    }
    case "CreateEvent": {
      const ref = ev.payload?.ref_type ?? "ref";
      return {
        title: `Created ${ref}`,
        meta: repo,
        href: repoUrl,
      };
    }
    case "ReleaseEvent": {
      return {
        title: "Release published",
        meta: repo,
        href: repoUrl,
      };
    }
    case "WatchEvent": {
      return {
        title: "Starred a repository",
        meta: repo,
        href: repoUrl,
      };
    }
    default:
      return {
        title: ev.type
          .replace(/Event$/, "")
          .replace(/([A-Z])/g, " $1")
          .trim(),
        meta: repo,
        href: repoUrl,
      };
  }
}

export const SectionHero = ({
  title,
  label,
  tagline,
  description,
}: {
  title: string;
  label: string;
  tagline: string;
  description?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".sh-label", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".sh-title", {
        opacity: 0,
        y: 80,
        duration: 1.1,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".sh-tagline", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.4,
      });
      gsap.from(".sh-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.from(".sh-ring", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[95vh] flex flex-col items-center justify-center bg-background overflow-hidden border-b border-border/10"
    >
      {/* Cinematic Shadowy Rings & Glows */}
      <div className="sh-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] max-w-[1400px] max-h-[1400px] rounded-full border border-white/[0.02] blur-[1px] pointer-events-none" />
      <div className="sh-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[1000px] max-h-[1000px] rounded-full border border-white/[0.015] blur-[2px] pointer-events-none" />
      <div className="sh-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full border border-white/[0.01] blur-[3px] pointer-events-none" />

      {/* Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.015)_0%,_transparent_80%)] pointer-events-none" />

      <div className="relative z-10 text-center px-4 space-y-12 md:space-y-16">
        <div className="space-y-6">
          <p className="sh-label text-[11px] md:text-xs font-mono tracking-[0.8em] uppercase text-muted-foreground/60">
            {label}
          </p>
          <h1
            className="sh-title font-black uppercase leading-[0.8] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
          >
            {title}
          </h1>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <p
            className="sh-tagline font-playfair italic text-muted-foreground/80 font-light"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            {tagline}
          </p>
          {description && (
            <p className="sh-description text-sm md:text-base text-muted-foreground/40 font-mono uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export const GithubActivity = () => {
  const [feed, setFeed] = useState<
    { id: string; title: string; meta: string; href: string; when: string }[]
  >([]);
  const [feedStatus, setFeedStatus] = useState<"idle" | "loading" | "error">(
    "loading",
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=12`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const data: GitHubPublicEvent[] = await res.json();
        if (cancelled) return;
        const items = data
          .map((ev) => {
            const s = summarizeEvent(ev);
            if (!s) return null;
            return {
              id: ev.id,
              title: s.title,
              meta: s.meta,
              href: s.href,
              when: formatRelativeTime(ev.created_at),
            };
          })
          .filter(Boolean) as {
          id: string;
          title: string;
          meta: string;
          href: string;
          when: string;
        }[];
        setFeed(items);
        setFeedStatus("idle");
      } catch {
        if (!cancelled) setFeedStatus("error");
      }
    };

    load();
    const interval = setInterval(load, 120_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-32 px-6 lg:px-16 w-full bg-background">
      <div className="text-center space-y-12 mb-16 flex flex-col items-center">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground">
          MY CODE JOURNEY
        </span>
        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter">
          GitHub Activity <br />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 italic font-playfair font-light">
            && Open Source
          </span>
        </h3>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-start">
        <div className="w-full overflow-x-auto pb-4 flex justify-center xl:justify-end">
          <div className="p-8 rounded-[2rem] border border-border/40 bg-card/5 backdrop-blur-sm shadow-2xl">
            <GitHubCalendar
              username={GITHUB_USERNAME}
              colorScheme="dark"
              theme={{
                dark: ["#1a1a1a", "#4a1d35", "#831843", "#be185d", "#ec4899"],
              }}
              fontSize={14}
              blockSize={12}
              blockMargin={6}
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/40 bg-card/5 backdrop-blur-sm p-8 shadow-2xl text-left space-y-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-muted-foreground">
              Latest Commit
            </span>
          </div>

          {feedStatus === "loading" && feed.length === 0 && (
            <p className="text-sm text-muted-foreground font-mono animate-pulse">
              Fetching from GitHub…
            </p>
          )}
          {feedStatus === "error" && (
            <p className="text-sm text-muted-foreground">
              Could not load live events (rate limit or network).
            </p>
          )}

          {/* Show only the single latest commit */}
          {mounted &&
            feed.length > 0 &&
            (() => {
              const item = feed[0];
              return (
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-border/30 bg-background/40 px-6 py-5 transition-all hover:border-emerald-500/40 hover:bg-card/40 hover:shadow-[0_0_20px_-10px_rgba(16,185,129,0.4)]"
                >
                  <p className="text-xl md:text-2xl font-bold leading-snug text-foreground group-hover:text-emerald-400 transition-colors">
                    &ldquo;{item.title}&rdquo;
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    <span className="text-emerald-500/80 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-tighter">
                      ~/{item.meta.split("/")[1] ?? item.meta}
                    </span>
                    <span className="text-muted-foreground/50">·</span>
                    <span>{item.when}</span>
                  </p>
                </Link>
              );
            })()}

          <Link
            href={`https://github.com/${GITHUB_USERNAME}?tab=activity`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-primary hover:underline"
          >
            View all activity on GitHub
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const BentoWidgets = () => {
  const [latestCommit, setLatestCommit] = useState<{
    message: string;
    repo: string;
    date: string;
  } | null>(null);
  const [spotifyData, setSpotifyData] = useState<any>(null);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const data = await githubService.getLatestGlobalCommit("naresh341");
        if (data) {
          setLatestCommit({
            message: data.message,
            repo: data.repo,
            date: new Date(data.date).toLocaleDateString(),
          });
        }
      } catch (err) {
        console.error("Error fetching global GitHub activity:", err);
      }
    };

    const fetchSpotify = async () => {
      try {
        const data = await spotifyService.getNowPlaying();
        setSpotifyData(data);
      } catch (err) {
        setSpotifyData({ isPlaying: false });
      }
    };

    fetchGithub();
    fetchSpotify();

    const githubInterval = setInterval(fetchGithub, 60000);
    const spotifyInterval = setInterval(fetchSpotify, 10000);
    return () => {
      clearInterval(githubInterval);
      clearInterval(spotifyInterval);
    };
  }, []);

  return (
    <section className="py-24 w-full px-6 lg:px-16 bg-background text-foreground selection:bg-primary/30">
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 mb-4 uppercase">
          BEHIND THE CURTAINS
        </p>
        <h2 className="text-[clamp(2rem,7vw,4.5rem)] font-bold tracking-tight leading-[1.1]">
          Decoding logic <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 italic font-serif font-light">
            && the lyrics
          </span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
      >
        {/* --- CARD 1: GITHUB --- */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
          className="group relative bg-card border border-border rounded-[2rem] p-10 h-[320px] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-15px_rgba(16,185,129,0.3)]"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/10 transition-all duration-700" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-foreground/5 rounded-lg border border-border group-hover:border-emerald-500/50 transition-colors">
                <FaGithub className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-muted-foreground">
                Naresh's Github
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-tighter">
                Live
              </span>
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
              Latest Commit
            </span>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
              {latestCommit
                ? `"${latestCommit.message}"`
                : '"Vibing with high-performance code..."'}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                ~/
              </span>
              <span className="text-xs font-mono text-red-500/80 bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10 uppercase tracking-tighter">
                {latestCommit?.repo || "Active-Project"}
              </span>
            </div>
          </div>

          <div className="relative z-10 flex gap-5 pt-6 border-t border-border/10">
            <FaGithub className="w-4 h-4 text-muted-foreground hover:text-foreground transition-all hover:scale-110 cursor-pointer" />
            <FaLinkedinIn className="w-4 h-4 text-muted-foreground hover:text-blue-400 transition-all hover:scale-110 cursor-pointer" />
          </div>
        </motion.div>

        {/* --- CARD 2: SPOTIFY --- */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
          className="group relative bg-card border border-border rounded-[2rem] p-10 h-[320px] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-[#1DB954]/40 hover:shadow-[0_0_30px_-15px_rgba(29,185,84,0.3)]"
        >
          <div
            className="absolute inset-0 opacity-[0.03] grayscale group-hover:opacity-[0.08] group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
            style={{
              backgroundImage: `url(${spotifyData?.albumImageUrl || "/images/Humraah.jpg"})`,
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1DB954]/10 rounded-lg border border-[#1DB954]/20">
                <SiSpotify className="w-5 h-5 text-[#1DB954]" />
              </div>
              <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-[0.2em]">
                {spotifyData?.isPlaying ? "Now Playing" : "Recently Played"}
              </span>
            </div>
            <div className="flex gap-[3px] items-end h-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-[2px] bg-[#1DB954] rounded-full animate-audio-bar bar-${i}`}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 max-w-[65%] mt-4">
            <p className="text-muted-foreground text-lg leading-relaxed font-light">
              I&apos;m currently listening to{" "}
              <span className="text-foreground font-bold tracking-tight">
                &quot;{spotifyData?.title || "Humraah"}&quot;
              </span>{" "}
              by{" "}
              <span className="text-foreground font-medium opacity-80">
                {spotifyData?.artist || "Sachet Tandon"}
              </span>
              .
            </p>
          </div>

          <div className="absolute bottom-8 right-8 w-40 h-40 pointer-events-none">
            <div
              className={`absolute bottom-4 right-4 w-28 h-28 rounded-full border-[10px] border-border/50 bg-[#121212] shadow-2xl z-0 transition-opacity duration-500 ${spotifyData?.isPlaying || true ? "animate-spin-slow" : "opacity-40"}`}
            >
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-[35%] rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                <div className="w-2 h-2 bg-zinc-700 rounded-full" />
              </div>
            </div>
            <div className="absolute bottom-0 right-12 w-32 h-24 rounded-xl overflow-hidden border border-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 rotate-[-4deg] group-hover:rotate-0 group-hover:translate-x-2 transition-all duration-700 bg-zinc-900">
              <Image
                width={200}
                height={200}
                src={spotifyData?.albumImageUrl || "/images/Humraah.jpg"}
                className="w-full h-full object-cover"
                alt="Album Art"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-audio-bar {
          animation: audio-pulse 1s ease-in-out infinite;
        }
        .bar-1 {
          height: 40%;
          animation-delay: 0.1s;
        }
        .bar-2 {
          height: 80%;
          animation-delay: 0.2s;
        }
        .bar-3 {
          height: 60%;
          animation-delay: 0.3s;
        }
        .bar-4 {
          height: 90%;
          animation-delay: 0s;
        }
        @keyframes audio-pulse {
          0%,
          100% {
            height: 30%;
          }
          50% {
            height: 100%;
          }
        }
      `}</style>
    </section>
  );
};
