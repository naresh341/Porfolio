"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const SKILLS = [
  "React", "Next.js", "TypeScript", "Tailwind", "GSAP", 
  "Matter.js", "Python", "FastAPI", "SQL", "Docker", 
  "AWS", "Git", "Framer", "Three.js", "UI/UX"
];

export default function MatterHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create engine
    const engine = Engine.create();
    engine.gravity.y = 0.05; // Light gravity for "floating" feel
    engine.gravity.x = 0;

    // Create renderer
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Create walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -1000, width, 100, wallOptions); // Higher ceiling for better fall
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height, wallOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions);

    // INVISIBLE SHELF for the name "Naresh" to catch pills
    // Positioning it roughly at the center where the H1 is
    const shelfWidth = width > 768 ? 600 : 300;
    const shelfY = height * 0.5; // Perfectly centered
    const shelf = Bodies.rectangle(width / 2, shelfY, shelfWidth, 20, {
      isStatic: true,
      render: { visible: false },
      chamfer: { radius: 10 }
    });

    // Create pills
    const pills = SKILLS.map((skill) => {
      // Spawn them high above the viewport to "land"
      const x = Math.random() * width;
      const y = -Math.random() * 1000;
      const pillWidth = skill.length * 15 + 60; // Bigger
      const pillHeight = 56; // Bigger

      const body = Bodies.rectangle(x, y, pillWidth, pillHeight, {
        chamfer: { radius: 28 },
        restitution: 0.6, // Slightly less bouncy so they settle
        friction: 0.1,
        frictionAir: 0.01,
        render: {
          fillStyle: "rgba(255, 255, 255, 0.08)", // Brighter glass effect
          strokeStyle: "rgba(255, 255, 255, 0.4)", // Much more visible border
          lineWidth: 2,
        },
      });

      (body as any).label = skill;
      return body;
    });

    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall, shelf, ...pills]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Custom rendering for text labels
    Events.on(render, "afterRender", () => {
      const context = render.context;
      context.font = "bold 15px font-mono"; // Even slightly bigger
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "rgba(255, 255, 255, 1)"; // Pure white text

      pills.forEach((pill: any) => {
        const { x, y } = pill.position;
        const angle = pill.angle;

        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.fillText(pill.label.toUpperCase(), 0, 0);
        context.restore();
      });
    });

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;

      // Update walls
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -1000 });
      Matter.Body.setPosition(leftWall, { x: -50, y: newHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });

      // Update shelf
      const newShelfWidth = newWidth > 768 ? 600 : 300;
      const newShelfY = newHeight * 0.5;
      Matter.Body.setPosition(shelf, { x: newWidth / 2, y: newShelfY });
      // To properly resize the shelf body, we'd need to scale it, 
      // but moving it is usually sufficient for this effect.
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      Composite.clear(engine.world, false);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="block pointer-events-auto opacity-100"
      />
    </div>
  );
}
