"use client";

import { Dot, MapPin, MousePointer2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useClockHands } from "../../Hooks/useClockHands";
import { useTime } from "../../Hooks/useTime";
import RotatingCubeComponent from "../MiniComponents/RotatingCube";
const SubHeroSection = () => {
  const { hourDegrees, minuteDegrees, secondDegrees } = useClockHands();
  const time = useTime();

  return (
    <div className="relative w-full py-14 dark:bg-black bg-white flex items-center justify-center">
      <div className="absolute border-white/20 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50">
        <div className="relative isolate bg-transparent rounded-full w-65 h-65 lg:w-64 lg:h-64 xl:h-105 xl:w-105 mx-auto my-12 flex justify-center items-center group border border-zinc-300 shadow-xl dark:border-white/10 dark:shadow-none ">
          {/* Clock Dial */}
          <Image
            width={600}
            height={500}
            alt="clock"
            src="/images/clockDial.png"
            className="object-contain z-0"
          />

          <div className="absolute h-full overflow-hidden w-full flex justify-center items-center z-60">
            <div
              className="w-full absolute z-60 h-full pointer-events-none will-change-transform transition-transform duration-500 ease-linear"
              style={{ transform: `rotate(${hourDegrees}deg)` }}
            >
              <Image
                alt="hour"
                width={600}
                height={500}
                src="/images/hourHand.png"
                className="object-contain"
              />
            </div>

            {/* Minute Hand */}
            <div
              className="w-full absolute z-20 h-full pointer-events-none will-change-transform transition-transform duration-500 ease-linear"
              style={{ transform: `rotate(${minuteDegrees}deg)` }}
            >
              <Image
                alt="minute"
                width={600}
                height={500}
                src="/images/minuteHand.png"
              />
            </div>

            {/* Second Hand */}
            <div
              className="w-full absolute z-30 h-full pointer-events-none will-change-transform transition-transform duration-100 ease-linear"
              style={{ transform: `rotate(${secondDegrees}deg)` }}
            >
              <Image
                width={600}
                height={500}
                alt="second"
                src="/images/secondHand.png"
              />
            </div>
          </div>

          {/* Overlay for depth */}
          <div className="absolute inset-0 rounded-full bg-linear-to-br to-transparent pointer-events-none z-40 from-black/5 border border-black/5 shadow-lg dark:from-white/5 dark:border-white/5 dark:shadow-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4  w-full relative">
        {/*============================== CUBE SECTION========================================= */}
        <div className="md:col-span-1 p-4 sm:p-8 group">
          <div
            className=" inset-0 p-6 flex flex-col rounded-2xl h-120 md:h-75 lg:h-90 xl:h-145 transition-all duration-500 overflow-hidden group border  bg-white/60 border-black/10   group-hover:border-black/20 dark:group-hover:border-white/20 
          shadow dark:bg-transparent dark:border-white/10 dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]  "
          >
            <div className="relative z-10 flex flex-col gap-1 mb-3">
              <div className="flex items-center gap-1">
                <h1 className="font-outfit text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-none">
                  Naresh
                </h1>
                <span className="text-neutral-400 dark:text-white/40  italic font-normal text-3xl lg:text-4xl ">
                  Bhati
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-neutral-500 dark:text-white/40">
                <MapPin />
                <div className="uppercase whitespace-nowrap flex items-center font-medium tracking-wider">
                  <span>Mumbai, IN</span>
                  <Dot />
                  <span className="text-cyan-400 font-mono ml-1">
                    {time.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex-1 flex items-center justify-center py-2 min-h-[260px]">
              <div
                className="relative w-full h-full"
                style={{ touchAction: "none", pointerEvents: "auto" }}
              >
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[50deg] pointer-events-none"
                  style={{
                    width: "140%",
                    height: 180,
                    filter: "blur(40px)",
                    zIndex: 0,
                  }}
                >
                  <div
                    className="w-full h-full opacity-30 dark:opacity-40"
                    style={{
                      background: "white",
                      maskImage:
                        "linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0))",
                      mixBlendMode: "screen",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    pointerEvents: "auto",
                    background: "transparent",
                    zIndex: 1,
                  }}
                >
                  <div style={{ width: "100%", height: "100%" }}>
                    <RotatingCubeComponent />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex justify-center gap-3 pt-3 mt-auto border-t border-black/5 dark:border-white/5">
              <a
                href="https://www.linkedin.com/in/raj-sharma-23447527b/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-colors drop-shadow-[0_0_8px_rgba(0,0,0,0)] hover:text-blue-500 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] dark:hover:text-cyan-400 dark:hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--streamline"
                  width="1em"
                  height="1em"
                  viewBox="0 0 14 14"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.574 1.767a1.316 1.316 0 0 1-1.287 1.326A1.346 1.346 0 0 1 .99 1.767A1.326 1.326 0 0 1 2.287.5a1.316 1.316 0 0 1 1.287 1.267M1.129 5.449c0-.762.485-.643 1.158-.643s1.148-.119 1.148.643v7.424c0 .772-.485.614-1.148.614s-1.158.158-1.158-.614zm4.306.001c0-.426.158-.585.405-.634s1.1 0 1.396 0c.297 0 .416.485.406.851a2.49 2.49 0 0 1 2.217-.99a2.97 2.97 0 0 1 3.148 3.098v5.068c0 .772-.475.614-1.149.614s-1.148.158-1.148-.614V8.884A1.425 1.425 0 0 0 9.206 7.34A1.435 1.435 0 0 0 7.74 8.914v3.959c0 .772-.485.614-1.158.614s-1.148.158-1.148-.614z"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/softenrj"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-colors drop-shadow-[0_0_8px_rgba(0,0,0,0)] hover:text-blue-500 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] dark:hover:text-cyan-400 dark:hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--mingcute"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M6.315 6.176c-.25-.638-.24-1.367-.129-2.034a6.8 6.8 0 0 1 2.12 1.07c.28.214.647.283.989.18A9.3 9.3 0 0 1 12 5c.961 0 1.874.14 2.703.391c.342.104.709.034.988-.18a6.8 6.8 0 0 1 2.119-1.07c.111.667.12 1.396-.128 2.033c-.15.384-.075.826.208 1.14C18.614 8.117 19 9.04 19 10c0 2.114-1.97 4.187-5.134 4.818c-.792.158-1.101 1.155-.495 1.726c.389.366.629.882.629 1.456v3a1 1 0 0 0 2 0v-3c0-.57-.12-1.112-.334-1.603C18.683 15.35 21 12.993 21 10c0-1.347-.484-2.585-1.287-3.622c.21-.82.191-1.646.111-2.28c-.071-.568-.17-1.312-.57-1.756c-.595-.659-1.58-.271-2.28-.032a9 9 0 0 0-2.125 1.045A11.4 11.4 0 0 0 12 3c-.994 0-1.953.125-2.851.356a9 9 0 0 0-2.125-1.045c-.7-.24-1.686-.628-2.281.031c-.408.452-.493 1.137-.566 1.719l-.005.038c-.08.635-.098 1.462.112 2.283C3.484 7.418 3 8.654 3 10c0 2.992 2.317 5.35 5.334 6.397A4 4 0 0 0 8 17.98l-.168.034c-.717.099-1.176.01-1.488-.122c-.76-.322-1.152-1.133-1.63-1.753c-.298-.385-.732-.866-1.398-1.088a1 1 0 0 0-.632 1.898c.558.186.944 1.142 1.298 1.566c.373.448.869.916 1.58 1.218c.682.29 1.483.393 2.438.276V21a1 1 0 0 0 2 0v-3c0-.574.24-1.09.629-1.456c.607-.572.297-1.568-.495-1.726C6.969 14.187 5 12.114 5 10c0-.958.385-1.881 1.108-2.684c.283-.314.357-.756.207-1.14"
                    />
                  </g>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/raj_s.e"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-colors drop-shadow-[0_0_8px_rgba(0,0,0,0)] hover:text-blue-500 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] dark:hover:text-cyan-400 dark:hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--lets-icons"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M3 11c0-3.771 0-5.657 1.172-6.828S7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172S21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13z"
                    />
                    <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" />
                    <circle
                      cx={12}
                      cy={12}
                      r={3}
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* ================================== INTERFACE ========================================== */}
        <div className="md:col-span-2 p-6 sm:p-8 group">
          <div className="relative overflow-hidden">
            <div className=" inset-0 p-6 rounded-xl flex md:justify-between md:gap-4 flex-col md:flex-row gap-4 h-110 md:h-75 lg:h-90 xl:h-145 transition-all duration-500 overflow-hidden border bg-white/60 border-black/10 shadow  dark:group-hover:border-white/20   dark:bg-transparent w-full  dark:border-white/10 dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] ">
              <div className="flex-1 flex flex-col justify-start pt-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center size-8 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-transparent">
                    <MousePointer2 />
                  </div>
                  <div className="flex flex-col">
                    <span className="hidden lg:block text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-white/50 font-outfit">
                      Detail-driven UI
                    </span>
                    <span className="lg:hidden text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-white/50 font-outfit">
                      UI Philosophy
                    </span>
                  </div>
                </div>
                <div>
                  <h2
                    className="text-neutral-900 dark:text-white font-outfit text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] tracking-tight mb-3"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Interfaces
                    <br />
                    <span className="font-serif italic font-light text-neutral-500 dark:text-white/40">
                      you can feel.
                    </span>
                  </h2>
                  <p
                    className="text-sm lg:text-xs text-neutral-500 dark:text-white/55 max-w-[32ch] lg:max-w-[28ch] leading-relaxed mb-6 lg:mb-0"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    I sweat spacing, timing, and feedback — the tiny stuff.
                  </p>
                </div>

                <div className="flex-none lg:flex-1 flex flex-col items-start lg:items-end pt-2 pr-0 lg:pr-4">
                  <div
                    className="hidden sm:flex flex-col items-end gap-2 mb-6 self-end"
                    style={{ opacity: "0.6" }}
                  >
                    <div className="flex items-center gap-2 text-neutral-500 dark:text-white/45">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-outfit">
                        Philosophy
                      </span>
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-neutral-500 dark:text-white/35"
                      >
                        <path d="M12 0L14.595 9.405L24 12L14.595 14.595L12 24L9.405 14.595L0 12L9.405 9.405L12 0Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-start lg:items-end gap-2 mb-4 w-full lg:w-auto">
                    <div className="relative flex flex-wrap lg:flex-nowrap justify-start lg:justify-end gap-2 lg:gap-1.5 w-full">
                      <button
                        type="button"
                        className="group/btn relative rounded-full border px-3 lg:px-2.5 py-1.5 lg:py-1 text-xs lg:text-[10px] font-outfit tracking-wide overflow-hidden transition-all duration-300 whitespace-nowrap border-neutral-200 dark:border-white/25 text-purple-600 dark:text-purple-400"
                        tabIndex={0}
                      >
                        <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>
                        <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                          Motion
                        </span>
                        <span
                          className="absolute inset-0 rounded-full bg-white/5"
                          style={{ opacity: 1 }}
                        />
                      </button>
                      <button
                        type="button"
                        className="group/btn relative rounded-full border px-3 lg:px-2.5 py-1.5 lg:py-1 text-xs lg:text-[10px] font-outfit tracking-wide overflow-hidden transition-all duration-300 whitespace-nowrap border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/60"
                        tabIndex={0}
                      >
                        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>
                        <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                          Type
                        </span>
                      </button>
                      <button
                        type="button"
                        className="group/btn relative rounded-full border px-3 lg:px-2.5 py-1.5 lg:py-1 text-xs lg:text-[10px] font-outfit tracking-wide overflow-hidden transition-all duration-300 whitespace-nowrap border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/60"
                        tabIndex={0}
                        style={{ transform: "none" }}
                      >
                        <div className="absolute inset-0 bg-green-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>
                        <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                          Feedback
                        </span>
                      </button>
                      <button
                        type="button"
                        className="group/btn relative rounded-full border px-3 lg:px-2.5 py-1.5 lg:py-1 text-xs lg:text-[10px] font-outfit tracking-wide overflow-hidden transition-all duration-300 whitespace-nowrap border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/60"
                        tabIndex={0}
                      >
                        <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>
                        <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                          Craft
                        </span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="text-left lg:text-right w-full lg:max-w-[200px]"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <div className="text-neutral-900 dark:text-white font-outfit text-sm font-semibold tracking-tight mb-1">
                      Micro-interactions
                    </div>
                    <div className="text-xs lg:text-[11px] text-neutral-500 dark:text-white/50 leading-relaxed">
                      Subtle movement that confirms intent — never distracting.
                    </div>
                  </div>
                  <span className="text-xl -mt-1.5 nyght text-transparent bg-clip-text bg-gradient-to-r font-light block  from-blue-600 to-indigo-600  dark:from-cyan-400 dark:to-blue-500">
                    you can feel.
                  </span>
                </div>
              </div>
            </div>
            {/* ===============================Floating Circle====================================== */}
            <div className="h-70 w-80 md:h-70 md:w-70 lg:h-90 lg:w-90 xl:h-120 xl:w-120 rounded-full absolute left-1/2 -translate-x-1/2 top-full -translate-y-[45%] border  bg-zinc-50 border-black/10  shadow-[0_0_40px_rgba(0,0,0,0.05)]  dark:bg-black dark:border-white/15 dark:shadow-[0_0_40px_rgba(255,255,255,0.02)]" />
          </div>
        </div>
        {/* ============================ CONTACT SECTION ============================ */}
        <div className="md:col-span-1 p-6 sm:p-8 group">
          <div className=" inset-0 flex flex-col rounded-2xl h-120 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 overflow-hidden group justify-between p-6 bg-white/60 border-black/10   dark:group-hover:border-white/50   dark:bg-transparent dark:border-white/10 dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]  shadow">
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-12 h-12">
                <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
                  <circle
                    cx={20}
                    cy={20}
                    r={19}
                    className="stroke-neutral-300 dark:stroke-white"
                    strokeOpacity="0.1"
                    strokeWidth={1}
                  ></circle>
                  <path
                    d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20"
                    className="stroke-neutral-900 dark:stroke-white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.4"
                    pathLength={1}
                    strokeDashoffset="0px"
                    strokeDasharray="0.3px 1px"
                  ></path>
                  <path
                    d="M30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20"
                    className="stroke-neutral-900 dark:stroke-white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.1"
                    pathLength={1}
                    strokeDashoffset="0px"
                    strokeDasharray="0.3px 1px"
                  ></path>
                  <circle
                    cx={20}
                    cy={20}
                    r={3}
                    className="fill-neutral-900 dark:fill-white"
                  ></circle>
                </svg>
              </div>

              <Link
                className="group/badge flex w-fit items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 px-3 py-1.5 font-semibold text-neutral-600 dark:text-neutral-300 text-xs transition-all hover:bg-neutral-200 dark:hover:bg-neutral-900 font-outfit"
                href="/book-call"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                </span>
                Available for work
              </Link>
            </div>

            <div className="relative z-10 -mt-4  flex flex-col gap-4">
              <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-[1.1]">
                Lets build something <br />
                <span className="font-serif italic font-light text-neutral-400 dark:text-white/40 lowercase tracking-normal leading-none">
                  that actually works.
                </span>
              </h3>

              <div className="cursor-pointer group/email inline-block w-full border-t border-black/10 dark:border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <svg
                      width={32}
                      height={32}
                      viewBox="0 0 32 32"
                      fill="none"
                      className="overflow-visible"
                    >
                      <path
                        d="M16 8 L23 12 L23 20 L16 24 L9 20 L9 12 Z"
                        className="stroke-neutral-900 dark:stroke-white"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.4"
                        style={{
                          transformOrigin: "50% 50%",
                          transform: "none",
                          transformBox: "fill-box",
                        }}
                      ></path>
                      <circle
                        cx={16}
                        cy={16}
                        r={3}
                        className="fill-neutral-400 dark:fill-white/60"
                        fill="rgba(255,255,255,0.6)"
                        style={{
                          transformOrigin: "50% 50%",
                          transform: "none",
                          transformBox: "fill-box",
                        }}
                      ></circle>
                      <defs>
                        <linearGradient
                          id="ray-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#3b82f6"></stop>
                          <stop offset="50%" stopColor="#8b5cf6"></stop>
                          <stop offset="100%" stopColor="#ec4899"></stop>
                        </linearGradient>
                        <linearGradient
                          id="glow-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.5"
                          ></stop>
                          <stop
                            offset="100%"
                            stopColor="#ec4899"
                            stopOpacity="0.5"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="relative py-2 flex-1">
                    <p className="text-[25px] text-neutral-900 dark:text-white tracking-tight flex overflow-hidden font-cabinet font-bold">
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        h
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        e
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        l
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        l
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        o
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        @
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        p
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        a
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        r
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        t
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        h
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        h
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        .
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        i
                      </span>
                      <span
                        className="inline-block"
                        style={{ transform: "none" }}
                      >
                        n
                      </span>
                    </p>
                    <div
                      className="absolute bottom-0 left-0 w-[75%] h-[3px] rounded-full origin-left bg-gradient-animated"
                      style={{ transform: "scaleX(0)" }}
                    ></div>
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl pointer-events-none"
                      style={{ opacity: 0 }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 ml-[44px]">
                  <p
                    className="text-[9px] uppercase tracking-[0.5em] font-medium min-h-[1em] text-neutral-400 dark:text-white/30"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    Tap to copy email
                  </p>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex justify-center lg:block">
              <button className="group/btn relative w-fit px-6 lg:px-0 lg:w-full h-10 lg:h-12 rounded-[10px] bg-neutral-900 dark:bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.25)] dark:shadow-[0_4px_0_0_#6b6b6b] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.25)] dark:hover:shadow-[0_2px_0_0_#6b6b6b] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all duration-100 ease-out flex items-center justify-center gap-2 cursor-pointer select-none">
                <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.15em] text-white dark:text-neutral-900">
                  Connect Now
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right text-white dark:text-neutral-900 lg:w-3.5 lg:h-3.5"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* =================================== GLOBE ======================================== */}

          <div className="h-70 sm:hidden w-65 md:h-70 md:w-70 lg:h-90 lg:w-90 xl:h-95 xl:w-95 rounded-full absolute left-1/2 -translate-x-1/2 -top-10 -translate-y-[45%] border  bg-zinc-50 border-black/10  shadow-[0_0_40px_rgba(0,0,0,0.05)]  dark:bg-black dark:border-white/20 dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]" />
        </div>
        {/* ===================================GLOBE SECTION ===================================== */}
        <div className="md:col-span-2 p-6 sm:p-8 group">
          <div className="relative overflow-hidden group">
            <div className="inset-0 p-4 rounded-xl h-100 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 overflow-hidden  bg-white/60 border-black/10 shadow  dark:group-hover:border-white/20   dark:bg-transparent dark:border-white/10 dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] ">
              <div className="absolute -left-[20%] -bottom-[25%] w-[80%] aspect-square z-10">
                <div
                  className="w-full h-full"
                  style={{
                    opacity: 1,
                    transition: "opacity 0.3s ease-in-out",
                    position: "absolute",
                    inset: 0,
                  }}
                >
                  <div className="relative w-full h-full">
                    <span
                      className="pointer-events-none select-none absolute"
                      style={{
                        anchorName: "--cobe-india",
                        positionAnchor: "--cobe-india",
                        bottom: "anchor(top)",
                        left: "anchor(center)",
                        transform: "translateX(-50%) translateY(-5px)",
                        opacity: "var(--cobe-visible-india, 0)",
                        transition: "opacity 0.25s",
                        zIndex: 20,
                        fontSize: 9,
                        fontFamily: "ui-monospace, monospace",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "rgb(255, 255, 255)",
                        background: "rgba(255, 255, 255, 0.12)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: 4,
                        padding: "2px 5px",
                        whiteSpace: "nowrap",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      India
                    </span>
                    <span
                      className="pointer-events-none select-none absolute"
                      style={{
                        anchorName: "--cobe-usa",
                        positionAnchor: "--cobe-usa",
                        bottom: "anchor(top)",
                        left: "anchor(center)",
                        transform: "translateX(-50%) translateY(-5px)",
                        opacity: "var(--cobe-visible-usa, 0)",
                        transition: "opacity 0.25s",
                        zIndex: 20,
                        fontSize: 9,
                        fontFamily: "ui-monospace, monospace",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "rgb(255, 255, 255)",
                        background: "rgba(255, 255, 255, 0.12)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: 4,
                        padding: "2px 5px",
                        whiteSpace: "nowrap",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      USA
                    </span>
                    <span
                      className="pointer-events-none select-none absolute"
                      style={{
                        anchorName: "--cobe-uk",
                        positionAnchor: "--cobe-uk",
                        bottom: "anchor(top)",
                        left: "anchor(center)",
                        transform: "translateX(-50%) translateY(-5px)",
                        opacity: "var(--cobe-visible-uk, 0)",
                        transition: "opacity 0.25s",
                        zIndex: 20,
                        fontSize: 9,
                        fontFamily: "ui-monospace, monospace",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "rgb(255, 255, 255)",
                        background: "rgba(255, 255, 255, 0.12)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: 4,
                        padding: "2px 5px",
                        whiteSpace: "nowrap",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      UK
                    </span>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <canvas
                        className="w-full h-full"
                        style={{ contain: "size layout paint", cursor: "grab" }}
                        width={2812}
                        height={2812}
                      ></canvas>
                      <div
                        style={{
                          position: "absolute",
                          width: 1,
                          height: 1,
                          pointerEvents: "none",
                          anchorName: "--cobe-india",
                          left: "50%",
                          top: "41.5813%",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          width: 1,
                          height: 1,
                          pointerEvents: "none",
                          anchorName: "--cobe-usa",
                          left: "61.2845%",
                          top: "15.7784%",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          width: 1,
                          height: 1,
                          pointerEvents: "none",
                          anchorName: "--cobe-uk",
                          left: "24.1909%",
                          top: "19.9351%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgb(245,245,245)_70%)] dark:bg-[radial-gradient(circle_at_center,transparent_40%,black_70%)] z-20 pointer-events-none"></div>
              </div>
              <div className="absolute top-6 left-6 z-50">
                <span className="hidden lg:block text-xs text-neutral-500 dark:text-white/40 tracking-widest uppercase mb-2 font-medium">
                  Available Globally
                </span>
                <h3 className="lg:hidden text-neutral-900 dark:text-white text-xl font-semibold leading-tight">
                  Global
                  <br />
                  Sync
                </h3>
                <h3 className="hidden lg:block text-neutral-900 dark:text-white text-xl font-semibold leading-tight max-w-[60%] lg:max-w-none">
                  Adaptable across
                  <br />
                  time zones
                </h3>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
                <button
                  className="group/btn relative text-sm border rounded-full flex items-center gap-1.5 px-4 py-2 overflow-hidden transition-all duration-300 border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/5 text-neutral-500 dark:text-white/50"
                  tabIndex={0}
                  style={{ transform: "none" }}
                >
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>
                  <span className="relative z-10 opacity-60 group-hover/btn:text-white group-hover/btn:opacity-100 transition-all duration-300">
                    GB
                  </span>
                  <span className="relative z-10 group-hover/btn:text-white group-hover/btn:dark:text-white transition-colors duration-300">
                    UK
                  </span>
                </button>
                <button
                  className="group/btn relative text-sm border rounded-full flex items-center gap-1.5 px-4 py-2 overflow-hidden transition-all duration-300 bg-orange-500/10 text-orange-400 border-orange-500/30"
                  tabIndex={0}
                >
                  <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>
                  <span
                    className="absolute inset-0 rounded-full bg-neutral-200/50 dark:bg-white/5"
                    style={{ opacity: 1 }}
                  ></span>
                  <span className="relative z-10 opacity-60 group-hover/btn:text-white group-hover/btn:opacity-100 transition-all duration-300">
                    IN
                  </span>
                  <span className="relative z-10 group-hover/btn:text-white group-hover/btn:dark:text-white transition-colors duration-300">
                    India
                  </span>
                </button>
                <button
                  className="group/btn relative text-sm border rounded-full flex items-center gap-1.5 px-4 py-2 overflow-hidden transition-all duration-300 border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/5 text-neutral-500 dark:text-white/50"
                  tabIndex={0}
                >
                  <div className="absolute inset-0 bg-green-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>
                  <span className="relative z-10 opacity-60 group-hover/btn:text-white group-hover/btn:opacity-100 transition-all duration-300">
                    US
                  </span>
                  <span className="relative z-10 group-hover/btn:text-white group-hover/btn:dark:text-white transition-colors duration-300">
                    USA
                  </span>
                </button>
              </div>
              <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-1 items-end">
                <div className="flex items-center gap-2 text-white/40">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx={12} cy={10} r={3}></circle>
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z" />
                  </svg>
                  <span className="text-sm uppercase tracking-wider">
                    Remote
                  </span>
                </div>
                <span className="text-white text-base font-medium">India</span>
              </div>

              <div className="relative flex-1 w-full mt-4">
                <div className="inset-0 mx-auto aspect-square w-full max-w-[600px] z-0 pointer-events-auto absolute -top-full -left-[66%] md:top-0 md:-left-1/2">
                  <h1 className="text-[200px]">Hello Globe</h1>
                </div>
              </div>
            </div>
            <div className="md:h-70 md:w-70 lg:h-120 lg:w-120 rounded-full absolute top-0 right-0 -translate-y-[55%] translate-x-[55%] z-0 border  bg-zinc-50 border-black/10   dark:bg-black dark:border-white/10" />
          </div>
        </div>
        {/* =============================================Project Section ================================================================== */}
        <div className="md:col-span-2 p-6 sm:p-8 group">
          <div className="relative overflow-hidden group">
            <div className="inset-0 p-4 rounded-xl h-100 md:h-75 lg:h-90 xl:h-145 border transition-all duration-500 overflow-hidden  bg-white/60 border-black/10 shadow  dark:group-hover:border-white/20   dark:bg-transparent dark:border-white/10 dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] ">
              <div className="flex justify-start md:justify-end items-center gap-1">
                <h3
                  className="text-neutral-900 dark:text-white text-3xl font-bold tracking-tighter relative"
                  style={{ opacity: 1, transform: "none" }}
                >
                  Founder of
                  <span className="relative inline-block">
                    <span
                      className="font-serif italic"
                      style={{
                        background:
                          "linear-gradient(288deg, rgb(255, 128, 0), rgb(255, 0, 204) 53.2394%, rgb(0, 68, 255)) 0% 0% / 200% 200% text",
                        WebkitTextFillColor: "transparent",
                        animation:
                          "6s ease 0s infinite normal none running gradient-x",
                      }}
                    >
                      Rune
                    </span>
                    <div
                      className=" -bottom-1 left-0 h-[2px] bg-gradient-to-r from-neutral-300 via-neutral-200 to-transparent dark:from-white/60 dark:via-white/30 dark:to-transparent"
                      style={{ width: "100%", opacity: 1 }}
                    ></div>
                  </span>
                </h3>
                <p
                  className="text-neutral-500 dark:text-white/40 text-sm mt-2  tracking-wide italic"
                  style={{ opacity: 1, transform: "none" }}
                >
                  <span>&lt;</span>
                  Crafting Digital Experiences <span>/&gt;</span>
                </p>
              </div>

              <div className="flex justify-start md:justify-end mt-2 relative z-10">
                <p className="text-left md:text-right text-[12px] w-full max-w-md  text-zinc-600  dark:text-white/60">
                  Revolutionary AI-powered IDE that turns voice, text, and
                  images into functional applications directly in your browser.
                </p>
              </div>
              <div className="absolute z-100 mt-0 md:mt-0 bottom-5">
                <div className="flex items-center gap-2">
                  <Image
                    width={500}
                    height={500}
                    className="h-8 w-8 md:h-10 md:w-10"
                    alt="Bricks logo"
                    src="/product/bricks.svg"
                  />
                  <p
                    className="split-parent overflow-hidden inline-block whitespace-normal mt-2 text-lg md:text-xl tracking-wide font-bold text-zinc-900 dark:text-white"
                    style={{
                      textAlign: "center",
                      overflowWrap: "break-word",
                      willChange: "transform, opacity",
                    }}
                    aria-label="BRICKS"
                  >
                    <span style={{ whiteSpace: "nowrap" }} />
                  </p>
                  <div
                    className="split-char"
                    aria-hidden="true"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate3d(0px, 0px, 0px)",
                      opacity: 1,
                      willChange: "transform, opacity",
                    }}
                  >
                    B
                  </div>
                  <div
                    className="split-char"
                    aria-hidden="true"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate3d(0px, 0px, 0px)",
                      opacity: 1,
                      willChange: "transform, opacity",
                    }}
                  >
                    R
                  </div>
                  <div
                    className="split-char"
                    aria-hidden="true"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate3d(0px, 0px, 0px)",
                      opacity: 1,
                      willChange: "transform, opacity",
                    }}
                  >
                    I
                  </div>
                  <div
                    className="split-char"
                    aria-hidden="true"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate3d(0px, 0px, 0px)",
                      opacity: 1,
                      willChange: "transform, opacity",
                    }}
                  >
                    C
                  </div>
                  <div
                    className="split-char"
                    aria-hidden="true"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate3d(0px, 0px, 0px)",
                      opacity: 1,
                      willChange: "transform, opacity",
                    }}
                  >
                    K
                  </div>
                  <div
                    className="split-char"
                    aria-hidden="true"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate3d(0px, 0px, 0px)",
                      opacity: 1,
                      willChange: "transform, opacity",
                    }}
                  >
                    S
                  </div>
                  <p />
                </div>
              </div>
              <div
                className="relative shadow-2xl mt-4 bg-transparent md:mt-2 lg:mt-2 xl:mt-4 md:-right-35 h-120 w-full"
                style={{ transform: "translateY(20.5978px)" }}
              >
                <div
                  className="relative inline-block w-full align-middle leading-none "
                  title="Bricks"
                  style={{ aspectRatio: "1203 / 753" }}
                >
                  <div
                    className="pointer-events-none absolute z-0 overflow-hidden"
                    style={{
                      left: "0.0831255%",
                      top: "6.90571%",
                      width: "99.7506%",
                      height: "92.9615%",
                      borderRadius: "0px 0px 11px 11px",
                    }}
                  >
                    <Image
                      src="/product/hero.png"
                      width={1203}
                      height={753}
                      alt="Bricks"
                      className="block size-full object-cover object-top"
                    />
                  </div>
                  {/* SVG */}
                </div>
              </div>
            </div>
            <div className="md:h-70 md:w-70 lg:h-120 lg:w-120 rounded-full absolute top-0 left-0 -translate-y-[55%] -translate-x-[55%] z-0 border  bg-zinc-50 border-black/10  shadow-[0_0_40px_rgba(0,0,0,0.05)]  dark:bg-black dark:border-white/15 dark:shadow-[0_0_40px_rgba(255,255,255,0.05)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeroSection;
