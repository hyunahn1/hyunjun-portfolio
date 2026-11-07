"use client";

import { useEffect, useState } from "react";
import { profile, sections } from "@/content/portfolio";

export function SiteHeader() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      // 화면 상단 1/3 지점을 지나는 섹션을 현재 위치로 본다
      { rootMargin: "-88px 0px -66% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const primarySections = sections.filter((section) =>
    ["projects", "experience", "about", "contact"].includes(section.id),
  );

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <a href="#top" className="site-brand">
          <span className="font-mono text-sm font-semibold tracking-tight">
            {profile.name}
          </span>
          <span className="site-brand-en">{profile.nameEn}</span>
        </a>

        <nav aria-label="섹션" className="site-nav">
          {primarySections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={active === s.id ? "is-active" : undefined}
            >
              {s.title}
            </a>
          ))}
        </nav>

        <a href="mailto:ahnhj99999@gmail.com" className="site-contact">
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
