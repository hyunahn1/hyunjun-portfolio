"use client";

import { useEffect, useRef } from "react";

export function ScrollMotion() {
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    root.classList.add("motion-enabled");

    if (reducedMotion) {
      targets.forEach((target) => target.classList.add("is-in-view"));
    }

    const observer = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-in-view");
              observer?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
        );

    targets.forEach((target) => observer?.observe(target));

    let raf = 0;
    const updateProgress = () => {
      raf = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${clamped})`;
      }
      if (labelRef.current) {
        labelRef.current.textContent = String(Math.round(clamped * 100)).padStart(
          3,
          "0",
        );
      }

      // Large trackpad jumps and anchor links can skip an IntersectionObserver
      // boundary entirely. Anything already passed should never remain hidden.
      targets.forEach((target) => {
        if (
          !target.classList.contains("is-in-view") &&
          target.getBoundingClientRect().top < window.innerHeight * 0.92
        ) {
          target.classList.add("is-in-view");
          observer?.unobserve(target);
        }
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("motion-enabled");
    };
  }, []);

  return (
    <div className="scroll-telemetry" aria-hidden>
      <span ref={labelRef}>000</span>
      <div className="scroll-rail">
        <div ref={progressRef} />
      </div>
      <small>SCROLL</small>
    </div>
  );
}
