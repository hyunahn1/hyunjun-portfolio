"use client";

import { useEffect } from "react";

/**
 * [data-pin] 구간의 스크롤 진행도를 CSS 변수 --p(0~1)로 넘긴다.
 * 장면의 모양은 전부 globals.css 가 --p 로 계산한다.
 */
export function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    root.classList.add("motion-enabled");

    // 화면 가운데를 지나는 단계에 맞춰 케이스 스터디의 고정 화면을 바꾼다.
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const step = entry.target as HTMLElement;
          step
            .closest("[data-case]")
            ?.querySelectorAll<HTMLElement>("[data-panel]")
            .forEach((panel) =>
              panel.classList.toggle(
                "is-active",
                panel.dataset.panel === step.dataset.shot,
              ),
            );
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document
      .querySelectorAll("[data-shot]")
      .forEach((step) => stepObserver.observe(step));

    if (reducedMotion) {
      targets.forEach((target) => target.classList.add("is-in-view"));
      return () => {
        stepObserver.disconnect();
        root.classList.remove("motion-enabled");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    targets.forEach((target) => observer.observe(target));

    const pins = Array.from(
      document.querySelectorAll<HTMLElement>("[data-pin]"),
    ).map((el) => ({ el, current: -1 }));

    let raf = 0;
    let lastFrame = 0;
    const frame = (now = performance.now()) => {
      raf = 0;
      let moving = false;
      // 프레임이 떨어져도 같은 시간에 같은 거리를 따라가게 한다.
      const elapsed = lastFrame ? Math.min(now - lastFrame, 100) : 16;
      const follow = 1 - Math.exp(-elapsed / 90);
      lastFrame = now;

      pins.forEach((pin) => {
        const rect = pin.el.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        const target =
          range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 1;
        // 휠 한 칸이 툭 끊기지 않도록 목표값을 따라가며 감속한다.
        const next =
          pin.current < 0
            ? target
            : pin.current + (target - pin.current) * follow;
        pin.current = Math.abs(target - next) < 0.0005 ? target : next;
        if (pin.current !== target) moving = true;
        pin.el.style.setProperty("--p", pin.current.toFixed(4));
      });

      // 큰 점프나 앵커 이동으로 지나친 요소가 숨은 채 남지 않게 한다.
      targets.forEach((target) => {
        if (
          !target.classList.contains("is-in-view") &&
          target.getBoundingClientRect().top < window.innerHeight * 0.92
        ) {
          target.classList.add("is-in-view");
          observer.unobserve(target);
        }
      });

      if (moving) raf = requestAnimationFrame(frame);
      else lastFrame = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    frame();
    lastFrame = 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      stepObserver.disconnect();
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("motion-enabled");
    };
  }, []);

  return null;
}
