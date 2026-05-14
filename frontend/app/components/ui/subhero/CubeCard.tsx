import { useState, useEffect } from "react";
import { useTime } from "@/app/Hooks/useTime";
import { Dot, MapPin } from "lucide-react";
import RotatingCubeComponent from "../../MiniComponents/RotatingCube";

const CubeCard = () => {
  const time = useTime();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="md:col-span-1 p-4 sm:p-8 group">
      <div
        className=" inset-0 p-6 flex flex-col rounded-2xl h-120 md:h-75 lg:h-90 xl:h-145 transition-all duration-500 overflow-hidden group border  bg-card/60 border-border   group-hover:border-primary/20 
    shadow dark:bg-transparent dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)]  "
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
          <div className="flex items-center gap-2 mt-2 text-muted-foreground/60">
            <MapPin />
            <div className="uppercase whitespace-nowrap flex items-center font-medium tracking-wider">
              <span>Mumbai, IN</span>
              <Dot />
              <span className="text-cyan-400 font-mono ml-1">
                {mounted ? time.toLocaleTimeString() : "--:--:--"}
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
                  background: "hsl(var(--primary))",
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

        <div className="relative z-10 flex justify-center gap-3 pt-3 mt-auto border-t border-border">
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
  );
};

export default CubeCard;
