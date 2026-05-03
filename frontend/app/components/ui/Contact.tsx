"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Download, Send, MapPin, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        x: -50,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-background border-t border-border/50 overflow-hidden w-full py-24 md:py-0"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">
        {/* Left: Branding & Info */}
        <div className="col-span-12 lg:col-span-6 space-y-12 contact-reveal">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-primary font-black">
              AVAILABLE FOR PROJECTS
            </span>
            <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter leading-none uppercase select-none">
              Say <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 italic font-playfair font-light lowercase">
                Hello.
              </span>
            </h2>
          </div>

          <div className="space-y-8 max-w-md">
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
              I’m always open to discussing product design, engineering
              architecture or partnership opportunities.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:bhati.naresh43@gmail.com"
                className="group flex items-center gap-4 text-lg font-bold hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-background transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                bhati.naresh43@gmail.com
              </a>
              <div className="flex items-center gap-4 text-lg font-bold text-muted-foreground">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                Mumbai, India
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              {
                icon: <FaGithub className="w-5 h-5" />,
                link: "https://github.com/naresh341",
              },
              {
                icon: <FaLinkedinIn className="w-5 h-5" />,
                link: "https://linkedin.com/in/naresh341",
              },
              {
                icon: <FaXTwitter className="w-5 h-5" />,
                link: "https://twitter.com/naresh341",
              },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.link}
                target="_blank"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <div className="pt-8">
            <Link
              href="/resume.pdf"
              target="_blank"
              className="group inline-flex items-center gap-6"
            >
              <span className="text-xs font-black tracking-widest uppercase border-b border-foreground group-hover:border-primary transition-colors">
                Download Resume
              </span>
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-background transition-all">
                <Download className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right: Modern Form */}
        <div className="col-span-12 lg:col-span-6 lg:pl-16 contact-reveal">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-card border border-border/50 rounded-[2rem] p-8 md:p-12 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">
                  Drop me a line
                </h3>
                <p className="text-sm text-muted-foreground">
                  I usually respond within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-background/50 border border-border/40 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-background/50 border border-border/40 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className="w-full bg-background/50 border border-border/40 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50 text-sm resize-none"
                  />
                </div>
                <button className="w-full py-5 bg-foreground text-background font-black tracking-[0.2em] uppercase text-[10px] rounded-2xl flex items-center justify-center gap-4 hover:bg-primary transition-all group/btn">
                  Dispatch Message
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
