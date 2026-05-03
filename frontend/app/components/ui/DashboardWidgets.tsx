"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { GitHubCalendar } from "react-github-calendar";

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
        title: ev.type.replace(/Event$/, "").replace(/([A-Z])/g, " $1").trim(),
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

  useGSAP(() => {
    gsap.from(".sh-label", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", delay: 0.1 });
    gsap.from(".sh-title", { opacity: 0, y: 80, duration: 1.1, ease: "expo.out", delay: 0.2 });
    gsap.from(".sh-tagline", { opacity: 0, y: 30, duration: 0.9, ease: "power3.out", delay: 0.4 });
    gsap.from(".sh-description", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", delay: 0.6 });
    gsap.from(".sh-ring", { opacity: 0, scale: 0.8, duration: 1.5, ease: "power2.out" });
  }, { scope: containerRef });

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
          <h1 className="sh-title font-black uppercase leading-none tracking-tighter text-foreground"
            style={{ fontSize: "clamp(4.5rem, 18vw, 24rem)", lineHeight: 0.85 }}
          >
            {title}
          </h1>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="sh-tagline font-playfair italic text-muted-foreground/80 font-light"
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
  const [feedStatus, setFeedStatus] = useState<"idle" | "loading" | "error">("loading");

  useEffect(() => {
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
              Live public activity
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/60 ml-auto">
              Refreshes every 2 min
            </span>
          </div>
          <h4 className="text-2xl md:text-3xl font-bold tracking-tight">
            Recent events
          </h4>
          {feedStatus === "loading" && feed.length === 0 && (
            <p className="text-sm text-muted-foreground font-mono">
              Loading from GitHub…
            </p>
          )}
          {feedStatus === "error" && (
            <p className="text-sm text-muted-foreground">
              Could not load live events (rate limit or network). The contribution
              chart above still reflects your public contributions.
            </p>
          )}
          <ul className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {feed.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-border/30 bg-background/40 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-card/40"
                >
                  <p className="text-sm font-medium leading-snug line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                    <span>{item.meta}</span>
                    <span className="text-muted-foreground/50">·</span>
                    <span>{item.when}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`https://github.com/${GITHUB_USERNAME}?tab=activity`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-primary hover:underline"
          >
            View full activity on GitHub
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export const BentoWidgets = () => {
  const [latestCommit, setLatestCommit] = useState<{
    message: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/Porfolio/commits?per_page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          setLatestCommit({
            message: data[0].commit.message,
            date: new Date(data[0].commit.author.date).toLocaleDateString(),
          });
        }
      })
      .catch((err) => console.error("GitHub fetch error:", err));
  }, []);

  return (
    <section className="py-32 border-t border-border/50 w-full px-6 lg:px-16 bg-background">
      <div className="text-center space-y-8 mb-20">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground">
          BEHIND THE CURTAINS
        </span>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
          Decoding logic <br />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 italic font-playfair font-light">
            && the lyrics
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Live GitHub Card */}
        <div className="bg-card border border-border rounded-3xl p-8 text-left space-y-6 group hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 text-primary">
            <FaGithub className="w-6 h-6" />
            <span className="text-lg font-bold italic font-playfair text-foreground">
              Naresh&apos;s GitHub
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                LATEST PUSH // {latestCommit ? latestCommit.date : "LOADING..."}
              </span>
            </div>
            <p className="text-sm font-medium line-clamp-2">
              {latestCommit
                ? latestCommit.message
                : "Fetching latest repository activity..."}
            </p>
          </div>
          <div className="flex gap-4 pt-4 border-t border-border/50 opacity-40">
            <Link
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/naresh341"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com/naresh341"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Guestbook Card */}
        <div className="bg-card border border-border rounded-3xl p-8 text-left space-y-8 group hover:border-orange-500/50 transition-colors">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground">
              VISITORS
            </span>
            <h4 className="text-4xl font-bold tracking-tighter">
              Leave your <br />{" "}
              <span className="text-orange-500 italic font-playfair font-light">
                signature
              </span>
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Let me know you were here.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-card bg-zinc-800"
                />
              ))}
              <div className="flex items-center pl-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Join others
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-full border border-border hover:border-orange-500 transition-colors text-[10px] font-bold uppercase tracking-widest">
              Sign Guestbook →
            </button>
          </div>
        </div>

        {/* Spotify Card */}
        <div className="bg-card border border-border rounded-3xl p-8 text-left space-y-6 group hover:border-green-500/50 transition-colors relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.308c-.217.356-.679.468-1.034.25-2.864-1.75-6.47-2.146-10.718-1.177-.407.093-.815-.162-.908-.569-.093-.407.162-.815.569-.908 4.656-1.066 8.64-.616 11.841 1.338.355.217.467.678.25 1.034zm1.466-3.268c-.273.444-.853.584-1.297.311-3.277-2.014-8.273-2.598-12.15-1.421-.502.152-1.035-.129-1.187-.631-.152-.502.129-1.035.631-1.187 4.417-1.34 9.916-.677 13.693 1.641.444.272.583.852.31 1.297zm.126-3.39c-3.934-2.336-10.428-2.551-14.212-1.402-.603.183-1.24-.167-1.423-.77-.183-.603.167-1.24.77-1.423 4.343-1.318 11.517-1.062 16.03 1.616.543.322.721 1.026.399 1.569-.323.542-1.027.721-1.57.399z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground">
                Last Played
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I recently listened to{" "}
              <span className="text-foreground font-bold italic font-playfair">
                Gasolina
              </span>{" "}
              by <span className="text-foreground font-bold">Daddy Yankee</span>{" "}
              from the album{" "}
              <span className="text-foreground font-bold">
                Barrio Fino (Bonus Track Version)
              </span>
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-zinc-900 border-[10px] border-zinc-800 opacity-20 rotate-12 group-hover:rotate-[30deg] transition-transform duration-700" />
        </div>
      </div>
    </section>
  );
};
