/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  about,
  awards,
  curriculum,
  curriculumIntro,
  education,
  experience,
  links,
  profile,
  projects,
  skills,
} from "@/content/portfolio";

/**
 * A4 인쇄용 문서.
 *   npm run pdf  →  headless Chrome 이 이 페이지를 public/portfolio-ahnhyunjun.pdf 로 렌더한다.
 * 화면용 페이지(app/page.tsx)와 같은 content/portfolio.ts 를 읽으므로
 * 내용을 고치면 PDF도 다시 뽑기만 하면 된다.
 */
export const metadata: Metadata = {
  title: "안현준 포트폴리오",
  robots: { index: false, follow: false },
};

/** PDF 안에서 PDF 자신을 가리키는 링크는 뺀다. */
const docLinks = links.filter((l) => l.label !== "Portfolio PDF");

/**
 * 인쇄용 축소본(scripts/make-pdf.sh 가 만든다)을 가리킨다.
 * 원본 1600px 을 그대로 실으면 PDF가 16MB 를 넘는다.
 */
const printSrc = (src: string) =>
  src.replace("/media/", "/media/print/").replace(/\.webp$/, ".jpg");

function Heading({ index, title, ko }: { index: string; title: string; ko: string }) {
  return (
    <div className="doc-heading flex items-baseline gap-3 border-b-2 border-ink pb-1.5">
      <span className="font-mono text-[9pt] font-semibold text-signal">{index}</span>
      <h2 className="font-mono text-[9pt] font-semibold uppercase tracking-[0.16em]">
        {title}
      </h2>
      <span aria-hidden className="h-px flex-1" />
      <span className="font-mono text-[8pt] tracking-[0.1em] text-muted">{ko}</span>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((line) => (
        <li key={line} className="prose-ko avoid-break flex gap-2 text-[9pt] leading-[1.55]">
          {/* 인쇄에서는 1~2px 짜리 박스가 행마다 다른 굵기로 반올림되므로 글리프를 쓴다 */}
          <span aria-hidden className="shrink-0 font-mono text-signal">
            –
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrintPage() {
  return (
    <main className="doc mx-auto w-full max-w-[190mm] px-8 py-10 print:px-0 print:py-0">
      {/* --- 표지 머리글 ------------------------------------------------- */}
      <header className="avoid-break border-b-2 border-ink pb-5">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h1 className="display text-[26pt] leading-none">{profile.name}</h1>
            <p className="mt-1.5 font-mono text-[9pt] tracking-tight text-muted">
              {profile.nameEn} · {profile.role}
            </p>
          </div>
          <ul className="text-right font-mono text-[8pt] leading-[1.7] text-muted">
            {docLinks.map((link) => (
              <li key={link.label}>
                <span className="text-ink/50">{link.label} </span>
                {link.href.replace(/^mailto:|^https?:\/\//, "")}
              </li>
            ))}
          </ul>
        </div>

        <p className="prose-ko mt-5 max-w-[150mm] text-[9.5pt] leading-[1.65] text-ink/85">
          {profile.intro}
        </p>

        <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-1 font-mono text-[8pt] text-muted">
          {profile.availability.map((item) => (
            <div key={item.label} className="flex gap-2">
              <dt className="text-ink/50">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* --- 01 Projects --------------------------------------------------- */}
      <section className="mt-8">
        <Heading index="01" title="Projects" ko="프로젝트" />
        <div className="mt-5 space-y-7">
          {/* 프로젝트 한 건이 한 쪽을 넘기므로 통째로 avoid-break 하지 않는다.
              대신 제목·스펙 행·사진 묶음처럼 작은 단위만 쪼개지지 않게 막는다. */}
          {projects.map((project) => (
            <article key={project.code}>
              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-mono text-[8pt] font-semibold tracking-[0.12em] text-signal">
                    {project.code}
                  </span>
                  <span className="font-mono text-[8pt] tracking-[0.1em] text-muted">
                    {project.org}
                  </span>
                </div>

                <h3 className="display mt-1.5 text-[13pt]">{project.title}</h3>
                <p className="font-mono text-[8.5pt] text-muted">{project.titleEn}</p>

                <p className="prose-ko mt-2 text-[9pt] leading-[1.6] text-ink/85">
                  {project.overview}
                </p>
              </div>

              <dl className="mt-3">
                {project.spec.map((row) => (
                  <div
                    key={row.label}
                    className="avoid-break grid grid-cols-[22mm_1fr] gap-x-4 border-t border-line py-2"
                  >
                    <dt className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="prose-ko text-[9pt] leading-[1.55] text-ink/85">
                      {row.body.length === 1 ? (
                        row.body[0]
                      ) : (
                        <Bullets items={row.body} />
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-2 border-t border-line pt-2 font-mono text-[7.5pt] leading-[1.6] text-muted">
                {project.stack.join("  ·  ")}
              </p>

              {project.media.length > 0 && (
                <div className="avoid-break mt-3 flex flex-wrap gap-3">
                  {project.media.map((item) => (
                    <figure
                      key={item.src}
                      className={item.portrait ? "w-[38mm]" : "w-[54mm]"}
                    >
                      <img
                        src={printSrc(
                          item.type === "video" ? (item.poster ?? item.src) : item.src,
                        )}
                        alt={item.alt}
                        className={`w-full rounded-[2px] border border-line bg-panel object-contain ${
                          item.portrait ? "h-[50mm]" : "h-[40mm]"
                        }`}
                      />
                      <figcaption className="mt-1 font-mono text-[7pt] leading-[1.45] text-muted">
                        {item.type === "video" && "[영상] "}
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* --- 02 42 Cursus -------------------------------------------------- */}
      <section className="mt-8">
        <Heading index="02" title="42 Cursus" ko="42 과제" />
        <p className="prose-ko mt-4 max-w-[150mm] text-[9pt] leading-[1.6] text-ink/85">
          {curriculumIntro}
        </p>
        <div className="mt-4">
          {curriculum.map((group) => (
            <div key={group.group} className="avoid-break border-t border-line py-3.5">
              <div className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">
                {group.group}
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-x-8 gap-y-3.5">
                {group.items.map((course) => (
                  <div key={course.name} className="avoid-break">
                    <h3 className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-mono text-[9pt] font-semibold tracking-tight">
                        {course.name}
                      </span>
                      <span className="text-[7.5pt] text-muted">{course.ko}</span>
                    </h3>
                    <p className="prose-ko mt-1 text-[8.5pt] leading-[1.5] text-ink/85">
                      {course.desc}
                    </p>
                    <p className="mt-1 font-mono text-[7pt] leading-[1.5] text-muted">
                      {course.learned.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 03 Awards ----------------------------------------------------- */}
      <section className="mt-8">
        <Heading index="03" title="Awards" ko="수상" />
        <div className="mt-4">
          {awards.map((award) => (
            <div
              key={award.title + award.event}
              className="avoid-break grid grid-cols-[26mm_1fr] gap-x-5 border-t border-line py-3.5"
            >
              <div className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">
                {award.period}
              </div>
              <div>
                <h3 className="text-[11pt] font-bold tracking-tight">
                  {award.title}
                  <span className="text-muted"> · </span>
                  <span className="font-medium">{award.event}</span>
                </h3>
                <p className="font-mono text-[8pt] text-muted">{award.org}</p>
                <Bullets items={award.bullets} />
                {award.media.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-3">
                    {award.media.map((item) => (
                      <figure
                        key={item.src}
                        className={item.portrait ? "w-[34mm]" : "w-[46mm]"}
                      >
                        <img
                          src={printSrc(item.src)}
                          alt={item.alt}
                          className={`w-full rounded-[2px] border border-line bg-panel object-contain ${
                            item.portrait ? "h-[44mm]" : "h-[34mm]"
                          }`}
                        />
                        <figcaption className="mt-1 font-mono text-[7pt] leading-[1.45] text-muted">
                          {item.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 04 Experience ------------------------------------------------- */}
      <section className="mt-8">
        <Heading index="04" title="Experience" ko="경력" />
        <div className="mt-4">
          {experience.map((job) => (
            <div
              key={job.org}
              className="avoid-break grid grid-cols-[26mm_1fr] gap-x-5 border-t border-line py-3.5"
            >
              <div className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">
                {job.period}
              </div>
              <div>
                <h3 className="text-[11pt] font-bold tracking-tight">{job.org}</h3>
                <p className="font-mono text-[8pt] text-muted">
                  {job.program}
                  {job.location && ` · ${job.location}`}
                </p>
                <Bullets items={job.bullets} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 05 Skills ----------------------------------------------------- */}
      <section className="mt-8">
        <Heading index="05" title="Skills" ko="기술" />
        <div className="mt-4">
          {skills.map((group) => (
            <div
              key={group.group}
              className="avoid-break grid grid-cols-[26mm_1fr] gap-x-5 border-t border-line py-2.5"
            >
              <div className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">
                {group.group}
              </div>
              <p className="font-mono text-[8.5pt] leading-[1.6] text-ink/85">
                {group.items.join("  ·  ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 06 Education -------------------------------------------------- */}
      <section className="mt-8">
        <Heading index="06" title="Education" ko="학력" />
        <div className="mt-4">
          {education.map((item) => (
            <div
              key={item.school}
              className="avoid-break grid grid-cols-[26mm_1fr] gap-x-5 border-t border-line py-2.5"
            >
              <div className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-muted">
                {item.period}
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-[10pt] font-bold tracking-tight">{item.school}</h3>
                <p className="text-[8.5pt] text-muted">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 07 About ------------------------------------------------------ */}
      <section className="avoid-break mt-8">
        <Heading index="07" title="About" ko="소개" />
        <div className="mt-4 space-y-3">
          {about.map((para) => (
            <p
              key={para}
              className="prose-ko max-w-[160mm] text-[9pt] leading-[1.65] text-ink/85"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      <footer className="mt-8 border-t border-line pt-3 font-mono text-[7.5pt] text-muted">
        {profile.name} · {profile.nameEn} · {docLinks[0].href.replace(/^mailto:/, "")}
      </footer>
    </main>
  );
}
