/* eslint-disable @next/next/no-img-element */
import type { Cv, CvEntry } from "@/content/portfolio";

function Heading({ children }: { children: string }) {
  return (
    <h2 className="doc-heading mt-4 border-b border-ink pb-1 font-display text-[11pt] font-bold">
      {children}
    </h2>
  );
}

function Entries({ items, subStyle }: { items: CvEntry[]; subStyle: string }) {
  return (
    <div className="mt-2 space-y-2">
      {items.map((e) => (
        <div key={e.title} className="avoid-break">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[9.5pt] font-bold">
              {e.title}
              {/* 불릿 없는 항목(학력)은 부제를 한 줄에 붙여 지면을 아낀다 */}
              {!e.bullets && e.sub && (
                <span className={`font-normal text-muted ${subStyle}`}> · {e.sub}</span>
              )}
            </h3>
            <span className="shrink-0 text-[8.5pt] text-ink/70">{e.period}</span>
          </div>
          {e.bullets && e.sub && <p className={`text-[8.5pt] text-muted ${subStyle}`}>{e.sub}</p>}
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

/** A4 이력서. `npm run pdf` 가 /cv 와 /cv/ko 를 PDF로 렌더한다. */
export function CvDocument({ cv }: { cv: Cv }) {
  const isKo = cv.lang === "ko";
  const subStyle = isKo ? "" : "italic";

  return (
    <main
      lang={cv.lang}
      className={`doc mx-auto w-full max-w-[190mm] bg-white px-8 py-10 text-ink print:px-0 print:py-0 ${
        isKo ? "break-keep" : ""
      }`}
    >
      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="font-display text-[24pt] font-extrabold leading-none tracking-tight">
            {cv.name}
          </h1>
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
        <img src={cv.photo} alt={cv.name} className="h-[38mm] w-[30mm] shrink-0 object-cover" />
      </header>

      <Heading>{cv.labels.summary}</Heading>
      <p className={`mt-2 text-[8.75pt] leading-[1.5] ${isKo ? "" : "text-justify"}`}>
        {cv.summary}
      </p>

      <Heading>{cv.labels.experience}</Heading>
      <Entries items={cv.experience} subStyle={subStyle} />

      <Heading>{cv.labels.projects}</Heading>
      <Entries items={cv.projects} subStyle={subStyle} />

      <Heading>{cv.labels.skills}</Heading>
      <div className="mt-2 space-y-0.5 text-[8.75pt] leading-[1.5]">
        {cv.skills.map((s) => (
          <p key={s.group}>
            <span className="font-bold">{s.group}: </span>
            {s.items}
          </p>
        ))}
      </div>

      <Heading>{cv.labels.education}</Heading>
      <Entries items={cv.education} subStyle={subStyle} />

      <Heading>{cv.labels.awards}</Heading>
      <Entries items={cv.awards} subStyle={subStyle} />
    </main>
  );
}
