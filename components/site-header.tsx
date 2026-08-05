"use client";

import { useEffect, useState } from "react";
import { profile, sections } from "@/content/portfolio";

export function SiteHeader() {
  const [active, setActive] = useState<string>("");

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
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[920px] items-center gap-6 px-6 md:px-10">
        <a href="#top" className="shrink-0 leading-none">
          <span className="font-mono text-sm font-semibold tracking-tight">
            {profile.name}
          </span>
          <span className="label ml-2 hidden sm:inline">{profile.nameEn}</span>
        </a>

        <nav
          aria-label="섹션"
          className="nav-scroll -mx-2 flex flex-1 items-center gap-1 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-end"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`whitespace-nowrap rounded px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors ${
                active === s.id
                  ? "text-signal"
                  : "text-muted hover:text-ink"
              }`}
            >
              {s.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
