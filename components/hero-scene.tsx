"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  size: number;
};

/**
 * The hero's live signal field. It is intentionally drawn on canvas instead
 * of shipping a video: the scene reacts to the visitor and remains light.
 */
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: 0, y: 0, active: false };
    let points: Point[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;

    const makePoints = () => {
      const count = width < 720 ? 28 : 52;
      points = Array.from({ length: count }, (_, index) => ({
        x: ((index * 89) % 997) / 997,
        y: ((index * 137 + 53) % 991) / 991,
        vx: 0.000035 + (index % 4) * 0.000012,
        vy: ((index % 5) - 2) * 0.000004,
        phase: index * 0.73,
        size: index % 11 === 0 ? 2.2 : 1.1,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      makePoints();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      const px = pointer.active ? (pointer.x - 0.5) * 26 : 0;
      const py = pointer.active ? (pointer.y - 0.5) * 18 : 0;
      const positions = points.map((point, index) => {
        const drift = reducedMotion ? 0 : time * point.vx;
        const x =
          (((point.x + drift) % 1.12) - 0.06) * width +
          px * (0.25 + (index % 3) * 0.2);
        const y =
          (point.y + Math.sin(time * point.vy + point.phase) * 0.035) *
            height +
          py * (0.18 + (index % 4) * 0.12);
        return { x, y, point };
      });

      context.lineWidth = 0.7;
      for (let i = 0; i < positions.length; i += 1) {
        for (let j = i + 1; j < positions.length; j += 1) {
          const a = positions[i];
          const b = positions[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          const limit = width < 720 ? 118 : 178;
          if (distance >= limit) continue;

          const strength = (1 - distance / limit) * 0.18;
          context.strokeStyle = `rgba(152, 181, 211, ${strength})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      positions.forEach(({ x, y, point }, index) => {
        const isSignal = index % 11 === 0;
        context.fillStyle = isSignal
          ? "rgba(255, 91, 52, 0.96)"
          : "rgba(214, 228, 242, 0.62)";
        context.beginPath();
        context.arc(x, y, point.size, 0, Math.PI * 2);
        context.fill();

        if (isSignal) {
          const pulse = reducedMotion
            ? 8
            : 7 + Math.sin(time * 0.003 + point.phase) * 3;
          context.strokeStyle = "rgba(255, 91, 52, 0.18)";
          context.lineWidth = 1;
          context.beginPath();
          context.arc(x, y, pulse, 0, Math.PI * 2);
          context.stroke();
        }
      });

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth;
      pointer.y = event.clientY / window.innerHeight;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
