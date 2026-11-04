/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { cv, type CvEntry } from "@/content/portfolio";

/**
 * 영문 이력서 A4 문서.
 *   npm run pdf  →  public/CV_Hyunjun.pdf 로 렌더된다. 내용은 content/portfolio.ts 의 cv.
 */
export const metadata: Metadata = {
  title: "Hyunjun Ahn — CV",
  robots: { index: false, follow: false },
};

function Heading({ children }: { children: string }) {
  return (
    <h2 className="doc-heading mt-4 border-b border-ink pb-1 text-[10.5pt] font-bold uppercase tracking-[0.04em]">
      {children}
    </h2>
  );
}

function Entries({ items }: { items: CvEntry[] }) {
  return (
    <div className="mt-2 space-y-2">
      {items.map((e) => (
        <div key={e.title} className="avoid-break">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[9.5pt] font-bold">{e.title}</h3>
            <span className="shrink-0 text-[8.5pt] text-ink/70">{e.period}</span>
          </div>
          {e.sub && <p className="text-[8.5pt] italic text-muted">{e.sub}</p>}
          {e.bullets && (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[8.75pt] leading-[1.45]">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default function CvPage() {
  return (
    <main className="doc mx-auto w-full max-w-[190mm] bg-white px-8 py-10 text-ink print:px-0 print:py-0">
      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[24pt] font-bold leading-none tracking-tight">{cv.name}</h1>
          <p className="mt-1.5 text-[10pt] font-semibold text-signal">{cv.role}</p>
          <p className="mt-2 text-[8.5pt] text-ink/80">{cv.contact.join("  |  ")}</p>
          <p className="mt-0.5 text-[8.5pt]">
            {cv.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && <span className="text-muted"> · </span>}
                <a href={l.href} className="text-[#1f3a8a]">
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </div>
        <img src={cv.photo} alt="Hyunjun Ahn" className="h-[38mm] w-[30mm] shrink-0 object-cover" />
      </header>

      <Heading>Summary</Heading>
      <p className="mt-2 text-justify text-[8.75pt] leading-[1.5]">{cv.summary}</p>

      <Heading>Experience</Heading>
      <Entries items={cv.experience} />

      <Heading>Projects</Heading>
      <Entries items={cv.projects} />

      <Heading>Technical Skills</Heading>
      <div className="mt-2 space-y-0.5 text-[8.75pt] leading-[1.5]">
        {cv.skills.map((s) => (
          <p key={s.group}>
            <span className="font-bold">{s.group}: </span>
            {s.items}
          </p>
        ))}
      </div>

      <Heading>Education</Heading>
      <Entries items={cv.education} />

      <Heading>Awards</Heading>
      <Entries items={cv.awards} />
    </main>
  );
}
