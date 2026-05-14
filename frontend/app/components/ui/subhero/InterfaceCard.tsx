import { MousePointer2 } from "lucide-react";
import { useState } from "react";

const TAB_CONTENT = {
  Motion: {
    heading: "Micro-interactions",
    body: "Subtle movement that confirms intent — never distracting.",
    activeColor: "text-purple-600 dark:text-purple-400",
    activeBorder: "border-purple-500/50 dark:border-purple-400/50",
    fill: "bg-purple-600",
  },
  Type: {
    heading: "Typography",
    body: "Scale, weight, and tracking carry as much meaning as the words themselves.",
    activeColor: "text-blue-600 dark:text-blue-400",
    activeBorder: "border-blue-500/50 dark:border-blue-400/50",
    fill: "bg-blue-600",
  },
  Feedback: {
    heading: "Sensory Feedback",
    body: "Every action deserves a response. State changes should be felt before they're read.",
    activeColor: "text-green-600 dark:text-green-400",
    activeBorder: "border-green-500/50 dark:border-green-400/50",
    fill: "bg-green-600",
  },
  Craft: {
    heading: "Pixel Craft",
    body: "The 1px border. The 2ms delay. The easing curve. Details that separate good from great.",
    activeColor: "text-orange-600 dark:text-orange-400",
    activeBorder: "border-orange-500/50 dark:border-orange-400/50",
    fill: "bg-orange-600",
  },
} as const;

type TabKey = keyof typeof TAB_CONTENT;

const InterfaceCard = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Motion");
  const [hovered, setHovered] = useState(false);

  const tab = TAB_CONTENT[activeTab];
  return (
    <div className="md:col-span-2 p-6 sm:p-8 ">
      <div className="relative overflow-hidden">
        <div className=" inset-0 p-6 rounded-xl flex  md:gap-4 flex-col md:flex-row gap-4 h-110 md:h-75 lg:h-90 xl:h-145 transition-all duration-500 overflow-hidden border bg-card/60 border-border shadow  dark:group-hover:border-primary/20   dark:bg-transparent w-full  dark:shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] ">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex-1 flex flex-col justify-start pt-2 group"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-start gap-3">
                <div className="flex items-center justify-center size-8 rounded-full border border-border bg-foreground/5 dark:bg-transparent">
                  <MousePointer2 size={15} />
                </div>
                <div className="hidden lg:block text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-white/50 font-outfit">
                  Detail-driven UI
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="text-[10px] uppercase tracking-[0.2em] font-outfit">
                  Philosophy
                </div>
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
            <div className="flex justify-between items-center">
              <div>
                <h2
                  className={`text-neutral-900 dark:text-white font-outfit text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] tracking-tight mb-3 `}
                >
                  Interfaces
                  <br />
                  <span
                    className={`font-serif italic font-light text-neutral-500 dark:text-white/40  `}
                  >
                    you can feel
                  </span>
                </h2>
                {/* <p
                  className={`text-sm  lg:text-xs text-neutral-500 dark:text-white/55  max-w-[32ch] lg:max-w-[28ch] leading-relaxed mb-6 lg:mb-0 ${
                    hovered
                      ? tab.activeColor
                      : "text-neutral-500 dark:text-white/40"
                  }`}
                  style={{ opacity: 1, transform: "none" }}
                >
                  {hovered
                    ? ` strive to create digital experiences that feel organic and human, where every pixel has a purpose.`
                    : "sweat spacing, timing, and feedback — the tiny stuff."}
                </p> */}
                <div className="relative h-12 md:h-10 lg:h-8">
                  {/* Default State Paragraph */}
                  <p
                    className={`absolute inset-0 text-sm lg:text-xs text-neutral-600 dark:text-white/50 max-w-[32ch] lg:max-w-[28ch] leading-relaxed transition-all duration-500 ease-in-out ${
                      hovered
                        ? "opacity-0 translate-y-1 invisible"
                        : "opacity-100 translate-y-0 visible"
                    }`}
                  >
                    sweat spacing, timing, and feedback — the tiny stuff.
                  </p>

                  {/* Hover State Paragraph */}
                  <p
                    className={`absolute inset-0 text-sm lg:text-xs max-w-[32ch] lg:max-w-[28ch] leading-relaxed text-neutral-600 dark:text-white/50 transition-all duration-500 ease-in-out ${
                      hovered
                        ? `opacity-100 translate-y-0 visible }`
                        : "opacity-0 -translate-y-1 invisible"
                    }`}
                  >
                    strive to create digital experiences that feel organic and
                    human, where every pixel has a purpose.
                  </p>
                </div>
              </div>

              <div className="flex-none  flex flex-col items-start lg:items-end pt-2 pr-0 lg:pr-4">
                <div className="flex flex-col items-start lg:items-end gap-2 mb-4 w-full lg:w-auto">
                  <div className="relative flex flex-wrap lg:flex-nowrap justify-start lg:justify-end gap-2 lg:gap-1.5 w-full">
                    {(Object.keys(TAB_CONTENT) as TabKey[]).map((key) => {
                      const isActive = key === activeTab;
                      const t = TAB_CONTENT[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setActiveTab(key)}
                          className={`group/btn relative rounded-full border px-3 lg:px-2.5 py-1.5 lg:py-1 text-xs lg:text-[10px] font-outfit tracking-wide overflow-hidden transition-all duration-300 whitespace-nowrap
                          ${
                            isActive
                              ? `${t.activeBorder} ${t.activeColor}`
                              : "border-border text-muted-foreground"
                          }`}
                          tabIndex={0}
                        >
                          <div
                            className={`absolute inset-0 ${t.fill} translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]`}
                          />
                          <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                            {key}
                          </span>
                          {isActive && (
                            <span className="absolute inset-0 rounded-full bg-white/5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  key={activeTab}
                  className="text-left lg:text-right w-full lg:max-w-[200px]"
                  style={{ animation: "fadeUp 0.3s ease both" }}
                >
                  <div className="text-neutral-900 dark:text-white font-outfit text-sm font-semibold tracking-tight mb-1">
                    {tab.heading}
                  </div>
                  <div className="text-xs lg:text-[11px] text-neutral-500 dark:text-white/50 leading-relaxed">
                    {tab.body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ===============================Floating Circle====================================== */}
        <div className="h-70 w-80 md:h-70 md:w-70 lg:h-90 lg:w-90 xl:h-120 xl:w-120 rounded-full absolute left-1/2 -translate-x-1/2 top-full -translate-y-[45%] border  bg-card border-border  shadow-[0_0_40px_rgba(0,0,0,0.05)]  dark:shadow-[0_0_40px_rgba(255,255,255,0.02)]" />
      </div>
    </div>
  );
};

export default InterfaceCard;
