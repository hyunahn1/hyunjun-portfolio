/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SPEC_LABEL } from "@/components/project-block";
import {
  about,
  awards,
  curriculum,
  curriculumIntro,
  education,
  experience,
  links,
  mainProjects,
  otherProjects,
  profile,
  skills,
  withoutCode,
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

/** 사이트 안의 PDF 경로는 문서에서 쓸 수 없으니 외부 링크만 싣는다. */
const docLinks = links.filter((l) => !l.href.startsWith("/"));

/**
 * 인쇄용 축소본(scripts/make-pdf.sh 가 만든다)을 가리킨다.
 * 원본 1600px 을 그대로 실으면 PDF가 16MB 를 넘는다.
 */
const printSrc = (src: string) =>
  src.replace("/media/", "/media/print/").replace(/\.webp$/, ".jpg");

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="doc-heading border-b-2 border-ink pb-1.5 font-display text-[16pt] font-extrabold">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((line) => (
        <li key={line} className="prose-ko avoid-break flex gap-2 text-[9pt] leading-[1.55]">
          {/* 인쇄에서는 1~2px 짜리 박스가 행마다 다른 굵기로 반올림되므로 글리프를 쓴다 */}
          <span aria-hidden className="shrink-0 text-signal">
            –
          </span>
          <span>{withoutCode(line)}</span>
        </li>
      ))}
    </ul>
  );
}

function Row({ left, children }: { left: string; children: ReactNode }) {
  return (
    <div className="avoid-break grid grid-cols-[28mm_1fr] gap-x-5 border-t border-line py-3">
      <div className="prose-ko text-[9pt] font-bold">{left}</div>
      <div>{children}</div>
    </div>
  );
}

export default function PrintPage() {
  return (
    <main className="doc mx-auto w-full max-w-[190mm] px-8 py-10 print:px-0 print:py-0">
      <header className="avoid-break border-b-2 border-ink pb-5">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h1 className="display text-[28pt] leading-none">{profile.name}</h1>
            <p className="mt-2 text-[10pt] font-semibold">
              {profile.nameEn}, {profile.role}
            </p>
          </div>
          <ul className="text-right text-[8.5pt] leading-[1.7]">
            {docLinks.map((link) => (
              <li key={link.label}>
                {link.href.replace(/^mailto:|^https?:\/\//, "")}
              </li>
            ))}
          </ul>
        </div>

        <p className="prose-ko mt-5 max-w-[160mm] text-[10pt] leading-[1.65]">
          {profile.intro}
        </p>
        <p className="mt-2 text-[8.5pt] font-medium">
          {profile.availability.map((item) => item.value).join(", ")}
        </p>
      </header>

      <Section title="대표 프로젝트">
        <div className="mt-5 space-y-9">
          {/* 프로젝트 한 건이 한 쪽을 넘기므로 통째로 avoid-break 하지 않는다.
              대신 제목·스펙 행·사진 묶음처럼 작은 단위만 쪼개지지 않게 막는다. */}
          {mainProjects.map((project) => (
            <article key={project.code}>
              <div className="avoid-break">
                <h3 className="display text-[15pt]">{project.title}</h3>
                <p className="mt-1 text-[8.5pt] font-medium">{project.titleEn}</p>
                <p className="text-[8.5pt] font-medium">{project.org}</p>
                <p className="prose-ko mt-2.5 text-[9.5pt] leading-[1.6]">
                  {project.overview}
                </p>
              </div>

              <dl className="mt-3">
                {project.spec.map((row) => (
                  <div
                    key={row.label}
                    className="avoid-break grid grid-cols-[24mm_1fr] gap-x-4 border-t border-line py-2"
                  >
                    <dt className="prose-ko text-[9pt] font-bold">
                      {SPEC_LABEL[row.label] ?? row.label}
                    </dt>
                    <dd className="prose-ko text-[9pt] leading-[1.55]">
                      {row.body.length === 1 ? (
                        withoutCode(row.body[0])
                      ) : (
                        <Bullets items={row.body} />
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="border-t border-line pt-2 text-[8.5pt] font-medium leading-[1.6]">
                {project.stack.join(", ")}
              </p>

              {project.media.length > 0 && (
                <div className="avoid-break mt-3 flex flex-wrap gap-3">
                  {project.media.map((item) => (
                    <figure key={item.src} className={item.portrait ? "w-[38mm]" : "w-[54mm]"}>
                      <img
                        src={printSrc(
                          item.type === "video" ? (item.poster ?? item.src) : item.src,
                        )}
                        alt={item.alt}
                        className={`w-full rounded-[2px] border border-line bg-panel object-contain ${
                          item.portrait ? "h-[50mm]" : "h-[40mm]"
                        }`}
                      />
                      <figcaption className="prose-ko mt-1 text-[8pt] leading-[1.45]">
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section title="그 외 프로젝트">
        <div className="mt-3">
          {otherProjects.map((project) => (
            <div key={project.code} className="avoid-break border-t border-line py-3 first:border-t-0">
              <h3 className="text-[11pt] font-bold">{project.title}</h3>
              <p className="text-[8.5pt] font-medium">{project.org}</p>
              <p className="prose-ko mt-1.5 text-[9pt] leading-[1.55]">{project.overview}</p>
              <p className="mt-1 text-[8.5pt] font-medium leading-[1.55]">
                {project.stack.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="경력">
        <div className="mt-3">
          {experience.map((job) => (
            <Row key={job.org} left={job.period}>
              <h3 className="text-[11pt] font-bold">{job.org}</h3>
              <p className="text-[8.5pt] font-medium">
                {job.program}
                {job.location && `, ${job.location}`}
              </p>
              <Bullets items={job.bullets} />
            </Row>
          ))}
        </div>
      </Section>

      <Section title="기술">
        <div className="mt-3">
          {skills.map((group) => (
            <Row key={group.group} left={group.group}>
              <p className="text-[9pt] leading-[1.6]">{group.items.join(", ")}</p>
            </Row>
          ))}
        </div>
      </Section>

      <Section title="수상">
        <div className="mt-3">
          {awards.map((award) => (
            <Row key={award.title + award.event} left={award.period}>
              <h3 className="text-[11pt] font-bold">
                {award.title}, {award.event}
              </h3>
              <p className="text-[8.5pt] font-medium">{award.org}</p>
              <Bullets items={award.bullets} />
              {award.media.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-3">
                  {award.media.map((item) => (
                    <figure key={item.src} className={item.portrait ? "w-[34mm]" : "w-[46mm]"}>
                      <img
                        src={printSrc(item.src)}
                        alt={item.alt}
                        className={`w-full rounded-[2px] border border-line bg-panel object-contain ${
                          item.portrait ? "h-[44mm]" : "h-[34mm]"
                        }`}
                      />
                      <figcaption className="prose-ko mt-1 text-[8pt] leading-[1.45]">
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </Row>
          ))}
        </div>
      </Section>

      <Section title="42 과제">
        <p className="prose-ko mt-3 max-w-[160mm] text-[9pt] leading-[1.6]">{curriculumIntro}</p>
        <div className="mt-3">
          {curriculum.map((group) => (
            <div key={group.group} className="avoid-break border-t border-line py-3">
              <h3 className="text-[10pt] font-bold">{group.group}</h3>
              <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-3">
                {group.items.map((course) => (
                  <div key={course.name} className="avoid-break">
                    <h4 className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[9.5pt] font-bold">{course.name}</span>
                      <span className="text-[8.5pt] font-medium">{course.ko}</span>
                    </h4>
                    <p className="prose-ko mt-1 text-[8.5pt] leading-[1.5]">
                      {withoutCode(course.desc)}
                    </p>
                    <p className="mt-1 text-[8pt] font-medium leading-[1.5]">
                      {course.learned.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="학력">
        <div className="mt-3">
          {education.map((item) => (
            <Row key={item.school} left={item.period}>
              <h3 className="text-[10pt] font-bold">{item.school}</h3>
              <p className="text-[8.5pt] font-medium">{item.detail}</p>
            </Row>
          ))}
        </div>
      </Section>

      <div className="avoid-break">
        <Section title="소개">
          <div className="mt-4 space-y-3">
            {about.map((para) => (
              <p key={para} className="prose-ko max-w-[165mm] text-[9pt] leading-[1.65]">
                {para}
              </p>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
