"use client";

import { Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { name: "Home", href: "#" },
      { name: "Projects", href: "#projects" },
      { name: "Experience", href: "#experience" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ] as { name: string; href: string; external?: boolean }[],
  },
  {
    title: "Connect",
    links: [
      { name: "GitHub", href: "https://github.com/naresh341", external: true },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/naresh-bhati-b72249250",
        external: true,
      },
      {
        name: "Email",
        href: "mailto:nareshbhati341@gmail.com",
        external: true,
      },
    ],
  },
];

const SocialIcons = {
  Github: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
    </svg>
  ),
  Linkedin: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  Email: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Floating animation for the ring
      gsap.to(ringRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle rotation for the glow
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={containerRef}
      className="relative bg-background pt-24 pb-12 px-6 lg:px-16 overflow-hidden border-t border-border/20"
    >
      {/* Top Section: CTA */}
      <div className="mx-auto mb-24">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left: Big CTA text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-muted-foreground">
              Available for work
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              Let&apos;s create <br />
              <span className="text-muted-foreground italic font-light">
                something real.
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-6 mt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-2xl border-2 border-foreground/30 hover:border-foreground bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 cursor-pointer"
              >
                <Mail className="w-5 h-5 text-foreground" />
                <span className="text-base font-black tracking-[0.25em] uppercase text-foreground group-hover:tracking-[0.35em] transition-all duration-300">
                  Get in touch
                </span>
              </a>
              <a
                href="mailto:nareshbhati341@gmail.com"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                nareshbhati341@gmail.com
              </a>
            </div>
          </div>

          {/* Animated Floating Ring */}
          <div className="relative shrink-0">
            <div
              ref={ringRef}
              className="w-40 h-40 md:w-52 md:h-52 rounded-full relative flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border-[6px] border-primary/30 shadow-[0_0_60px_rgba(59,130,246,0.3),inset_0_0_30px_rgba(59,130,246,0.2)]" />
              <div className="absolute inset-0 rounded-full border-t-4 border-l-4 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)]" />
              <div className="w-full h-full rounded-full bg-background/40 backdrop-blur-sm border border-border/10" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-primary/10 blur-[100px] rounded-full -z-10" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Links and Logo */}
      <div className="mx-auto">
        <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-[32px] p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            {/* Logo and Tagline */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <h3 className="text-4xl font-black tracking-tighter uppercase">
                NARESH
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-75">
                Building digital experiences that matter, one line of code at a
                time. Crafting interfaces that feel alive, solving problems that
                make a difference. Every pixel has a purpose.
              </p>

              <div className="flex gap-6">
                <Link
                  href="https://github.com/naresh341"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {SocialIcons.Github}
                </Link>
                <Link
                  href="https://linkedin.com/in/naresh-bhati-b72249250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {SocialIcons.Linkedin}
                </Link>
                <Link
                  href="mailto:nareshbhati341@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {SocialIcons.Email}
                </Link>
              </div>
            </div>

            {/* Links Columns */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-12">
              {footerLinks.map((section, i) => (
                <div key={i} className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                    {section.title}
                  </h4>
                  <ul className="space-y-4">
                    {section.links.map((link, j) => (
                      <li key={j}>
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          onClick={
                            !link.external && link.href.startsWith("#")
                              ? (e) => {
                                  e.preventDefault();
                                  const el = document.querySelector(
                                    link.href === "#" ? "body" : link.href,
                                  );
                                  if (link.href === "#")
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  else
                                    el?.scrollIntoView({ behavior: "smooth" });
                                }
                              : undefined
                          }
                          className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1.5 group"
                        >
                          {link.name}
                          {link.external && (
                            <svg
                              className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M1 9L9 1M9 1H4M9 1V6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              © {new Date().getFullYear()} Naresh Bhati. All rights reserved.
            </p>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to top
              <div className="p-2 rounded-full border border-border group-hover:border-primary group-hover:bg-primary/5 transition-all">
                <ArrowUp className="w-3 h-3 text-primary" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
