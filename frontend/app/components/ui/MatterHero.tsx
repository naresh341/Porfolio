"use client";

import { useTheme } from "@/app/Context/ThemeContext";
import Matter from "matter-js";
import { useEffect, useMemo, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TECH_ICONS } from "../MiniComponents/TechIcons";

export default function MatterHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconCacheRef = useRef<Record<string, HTMLImageElement>>({});
  const { theme } = useTheme();

  const SKILLS = useMemo(
    () =>
      Object.entries(TECH_ICONS).map(([name, data]) => ({
        name,
        color: data.color,
        iconJSX: data.icon,
      })),
    [],
  );

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // =========================
    // CACHE ICONS
    // =========================
    SKILLS.forEach((skill) => {
      if (!iconCacheRef.current[skill.name]) {
        try {
          const svgString = renderToStaticMarkup(
            skill.iconJSX as React.ReactElement,
          );

          const img = new Image();

          const svgBase64 = btoa(unescape(encodeURIComponent(svgString)));

          img.src = `data:image/svg+xml;base64,${svgBase64}`;

          iconCacheRef.current[skill.name] = img;
        } catch (err) {
          console.error(`Failed to cache icon for ${skill.name}:`, err);
        }
      }
    });

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
      Bounds,
      Body,
    } = Matter;

    // =========================
    // DIMENSIONS
    // =========================
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // =========================
    // ENGINE
    // =========================
    const engine = Engine.create();

    engine.gravity.y = 0.25;

    // =========================
    // RENDER
    // =========================
    const render = Render.create({
      canvas: canvasRef.current,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    });

    // =========================
    // WALLS
    // =========================
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };

    const ground = Bodies.rectangle(
      width / 2,
      height + 40,
      width,
      80,
      wallOptions,
    );

    const leftWall = Bodies.rectangle(-40, height / 2, 80, height, wallOptions);

    const rightWall = Bodies.rectangle(
      width + 40,
      height / 2,
      80,
      height,
      wallOptions,
    );

    // =========================
    // CENTER SHELF
    // =========================
    const shelf = Bodies.rectangle(
      width / 2,
      height * 0.65,
      width > 768 ? 550 : 260,
      10,
      {
        isStatic: true,
        render: { visible: false },
      },
    );

    // =========================
    // PILLS
    // =========================
    const pills = SKILLS.map((skill) => {
      const pillWidth = skill.name.length * 10 + 90;

      const body = Bodies.rectangle(
        Math.random() * width,
        -Math.random() * 2000,
        pillWidth,
        52,
        {
          chamfer: { radius: 14 },

          restitution: 0.4,

          friction: 0.1,

          frictionAir: 0.02,

          inertia: Infinity,

          density: 0.002,

          render: {
            visible: false,
          },
        },
      );

      (body as any).label = skill.name;
      (body as any).skillColor = skill.color;

      return body;
    });

    Composite.add(engine.world, [ground, leftWall, rightWall, shelf, ...pills]);

    // =========================
    // MOUSE
    // =========================
    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    render.mouse = mouse;

    // =========================
    // CUSTOM RENDER
    // =========================
    Events.on(render, "afterRender", () => {
      const context = render.context;

      pills.forEach((pill: any) => {
        const { x, y } = pill.position;

        const angle = pill.angle;

        const color = pill.skillColor;

        const label = pill.label;

        const iconImg = iconCacheRef.current[label];

        const isHovered = Bounds.contains(pill.bounds, mouse.position);

        context.save();

        context.translate(x, y);

        context.rotate(angle);

        // subtle hover scale
        context.scale(isHovered ? 1.04 : 1, isHovered ? 1.04 : 1);

        const w = pill.bounds.max.x - pill.bounds.min.x;

        const h = 52;

        // =========================
        // MAIN CARD
        // =========================
        context.beginPath();

        context.roundRect(-w / 2, -h / 2, w, h, 14);

        context.fillStyle =
          theme === "dark" ? "rgba(12,12,12,0.96)" : "rgba(255,255,255,0.96)";

        context.fill();

        // =========================
        // BORDER
        // =========================
        context.beginPath();

        context.roundRect(-w / 2, -h / 2, w, h, 14);

        context.lineWidth = 1;

        context.strokeStyle =
          theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

        context.stroke();

        // =========================
        // LEFT ACCENT
        // =========================
        context.beginPath();

        context.roundRect(-w / 2, -h / 2, 5, h, 14);

        context.fillStyle = color;

        context.fill();

        // =========================
        // ICON
        // =========================
        if (iconImg && iconImg.complete && iconImg.naturalWidth !== 0) {
          const iconSize = 24;

          context.drawImage(
            iconImg,
            -w / 2 + 16,
            -iconSize / 2,
            iconSize,
            iconSize,
          );
        }

        // =========================
        // TEXT
        // =========================
        context.font = "600 14px Inter, system-ui, sans-serif";

        context.textAlign = "left";

        context.textBaseline = "middle";

        context.fillStyle = theme === "dark" ? "#f5f5f5" : "#111111";

        context.fillText(label, -w / 2 + 52, 1);

        // =========================
        // STATUS DOT
        // =========================
        context.beginPath();

        context.arc(w / 2 - 18, 0, 4, 0, Math.PI * 2);

        context.fillStyle = color;

        context.fill();

        context.restore();
      });
    });

    // =========================
    // RUNNER
    // =========================
    const runner = Runner.create();

    Runner.run(runner, engine);

    Render.run(render);

    // =========================
    // RESIZE
    // =========================
    const handleResize = () => {
      if (!containerRef.current) return;

      const newWidth = containerRef.current.clientWidth;

      const newHeight = containerRef.current.clientHeight;

      render.canvas.width = newWidth;

      render.canvas.height = newHeight;

      Body.setPosition(ground, {
        x: newWidth / 2,
        y: newHeight + 40,
      });

      Body.setPosition(leftWall, {
        x: -40,
        y: newHeight / 2,
      });

      Body.setPosition(rightWall, {
        x: newWidth + 40,
        y: newHeight / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    // =========================
    // CLEANUP
    // =========================
    return () => {
      window.removeEventListener("resize", handleResize);

      Render.stop(render);

      Runner.stop(runner);

      Engine.clear(engine);

      Composite.clear(engine.world, false);
    };
  }, [theme, SKILLS]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
