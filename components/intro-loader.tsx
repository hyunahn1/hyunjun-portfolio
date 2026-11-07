"use client";

import { useEffect, useState } from "react";

type Phase = "loading" | "exiting" | "done";

export function IntroLoader() {
  const [count, setCount] = useState(1);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.classList.add("intro-lock");

    if (reducedMotion) {
      const readyFrame = requestAnimationFrame(() => {
        setCount(100);
        setPhase("done");
        root.classList.remove("intro-lock");
        root.classList.add("intro-ready");
      });
      return () => cancelAnimationFrame(readyFrame);
    }

    const duration = 2300;
    const startedAt = performance.now();
    let animationFrame = 0;
    let exitTimer = 0;
    let doneTimer = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2.2);
      setCount(Math.min(100, Math.max(1, Math.floor(eased * 100))));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }

      setCount(100);
      exitTimer = window.setTimeout(() => {
        setPhase("exiting");
        root.classList.add("intro-ready");
      }, 180);
      doneTimer = window.setTimeout(() => {
        setPhase("done");
        root.classList.remove("intro-lock");
      }, 1280);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      root.classList.remove("intro-lock");
    };
  }, []);

  if (phase === "done") return null;

  const formatted = String(count).padStart(3, "0");

  return (
    <div
      className={`intro-loader ${phase === "exiting" ? "is-exiting" : ""}`}
      role="progressbar"
      aria-label="포트폴리오 불러오는 중"
      aria-valuemin={1}
      aria-valuemax={100}
      aria-valuenow={count}
    >
      <div className="loader-orbit" aria-hidden>
        <i />
        <i />
        <i />
      </div>

      <div className="loader-topline">
        <span>AHN HYUNJUN</span>
        <span>SYSTEM INITIALIZING</span>
      </div>

      <div className="loader-count" aria-live="polite">
        {formatted}
      </div>

      <div className="loader-footer">
        <span>LOADING OPERATING SYSTEMS</span>
        <div className="loader-track">
          <i style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <span>{formatted}%</span>
      </div>

      <div className="loader-core" aria-hidden />
    </div>
  );
}
