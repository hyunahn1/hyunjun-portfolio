import { MediaGallery } from "@/components/media-gallery";
import { ProjectBlock } from "@/components/project-block";
import { Section } from "@/components/section";
import { SignalTrace } from "@/components/signal-trace";
import { SiteHeader } from "@/components/site-header";
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
  sections,
  skills,
} from "@/content/portfolio";

const section = Object.fromEntries(sections.map((s) => [s.id, s]));

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="mx-auto w-full max-w-[920px] flex-1 px-6 md:px-10">
        {/* --- Hero ------------------------------------------------------ */}
        <section className="pt-16 md:pt-24">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-signal">
            {profile.role}
          </p>

          <h1 className="display mt-6 text-[clamp(2.125rem,6vw,3.75rem)]">
            {profile.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="prose-ko mt-8 max-w-[60ch] text-[1.0625rem] text-muted">
            {profile.intro}
          </p>

          <dl className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-10">
            {profile.availability.map((item) => (
              <div key={item.label} className="flex items-baseline gap-3">
                <dt className="label">{item.label}</dt>
                <dd className="text-sm text-ink/80">{item.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 flex flex-wrap gap-2">
            {links.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`inline-block rounded-sm px-4 py-2.5 font-mono text-xs font-medium tracking-tight transition-colors ${
                    i === 0
                      ? "bg-ink text-paper hover:bg-signal"
                      : "border border-line text-ink hover:border-ink"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <SignalTrace />
          </div>
        </section>

        {/* --- 01 Projects ----------------------------------------------- */}
        <Section {...section.projects}>
          <div className="space-y-20">
            {projects.map((project) => (
              <ProjectBlock key={project.code} project={project} />
            ))}
          </div>
        </Section>

        {/* --- 02 42 Cursus ------------------------------------------------ */}
        <Section {...section.curriculum}>
          <p className="prose-ko max-w-[62ch] text-[1.0625rem] text-ink/85">
            {curriculumIntro}
          </p>

          <a
            href="https://github.com/hyunahn1"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-signal underline decoration-signal/30 underline-offset-4 transition-colors hover:decoration-signal"
          >
            <span aria-hidden>→</span> GitHub 저장소
          </a>

          <div className="mt-10">
            {curriculum.map((group) => (
              <div key={group.group} className="border-t border-line py-8">
                <div className="label">{group.group}</div>
                <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  {group.items.map((course) => (
                    <div key={course.name} className="min-w-0">
                      <h3 className="flex flex-wrap items-baseline gap-x-2.5">
                        <span className="font-mono text-[0.9375rem] font-semibold tracking-tight">
                          {course.name}
                        </span>
                        <span className="text-xs text-muted">{course.ko}</span>
                      </h3>
                      <p className="prose-ko mt-2 text-[0.9375rem] text-ink/85">
                        {course.desc}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {course.learned.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-sm bg-panel px-2 py-1 font-mono text-[0.6875rem] tracking-tight text-muted"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* --- 03 Awards -------------------------------------------------- */}
        <Section {...section.awards}>
          <div>
            {awards.map((award) => (
              <div
                key={award.title + award.event}
                className="grid gap-x-8 gap-y-3 border-t border-line py-7 md:grid-cols-[11rem_1fr]"
              >
                <div className="label pt-1">{award.period}</div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {award.title}
                    <span className="text-muted"> · </span>
                    <span className="font-medium">{award.event}</span>
                  </h3>
                  <p className="mt-0.5 font-mono text-sm text-muted">{award.org}</p>
                  <ul className="mt-4 space-y-1.5">
                    {award.bullets.map((line) => (
                      <li
                        key={line}
                        className="prose-ko flex gap-2.5 text-[0.9375rem] text-ink/85"
                      >
                        <span aria-hidden className="mark" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  {award.media.length > 0 && (
                    <div className="mt-6">
                      <MediaGallery items={award.media} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* --- 04 Experience --------------------------------------------- */}
        <Section {...section.experience}>
          <div>
            {experience.map((job) => (
              <div
                key={job.org}
                className="grid gap-x-8 gap-y-3 border-t border-line py-7 md:grid-cols-[11rem_1fr]"
              >
                <div className="label pt-1">{job.period}</div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{job.org}</h3>
                  <p className="mt-0.5 font-mono text-sm text-muted">
                    {job.program}
                    {job.location && ` · ${job.location}`}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {job.bullets.map((line) => (
                      <li
                        key={line}
                        className="prose-ko flex gap-2.5 text-[0.9375rem] text-ink/85"
                      >
                        <span aria-hidden className="mark" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* --- 05 Skills -------------------------------------------------- */}
        <Section {...section.skills}>
          <div>
            {skills.map((group) => (
              <div
                key={group.group}
                className="grid gap-x-8 gap-y-3 border-t border-line py-6 md:grid-cols-[11rem_1fr]"
              >
                <div className="label pt-1">{group.group}</div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-mono text-sm text-ink/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* --- 06 Education ----------------------------------------------- */}
        <Section {...section.education}>
          <div>
            {education.map((item) => (
              <div
                key={item.school}
                className="grid gap-x-8 gap-y-1 border-t border-line py-6 md:grid-cols-[11rem_1fr]"
              >
                <div className="label pt-1">{item.period}</div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-bold tracking-tight">{item.school}</h3>
                  <p className="text-sm text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* --- 07 About ---------------------------------------------------- */}
        <Section {...section.about}>
          <div className="max-w-[62ch] space-y-5">
            {about.map((para) => (
              <p key={para} className="prose-ko text-[1.0625rem] text-ink/85">
                {para}
              </p>
            ))}
          </div>
        </Section>

        {/* --- 08 Contact -------------------------------------------------- */}
        <Section {...section.contact}>
          <p className="display text-[clamp(1.75rem,4vw,2.5rem)]">
            <span className="block">함께 만들 시스템이 있다면</span>
            <span className="block">언제든 연락 주세요.</span>
          </p>
          <ul className="mt-10 border-b border-line">
            {links.map((link) => (
              <li key={link.label} className="border-t border-line">
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-baseline gap-4 py-4 md:gap-8"
                >
                  <span className="label w-[7rem] shrink-0 transition-colors group-hover:text-signal">
                    {link.label}
                  </span>
                  <span className="break-all font-mono text-sm text-ink transition-colors group-hover:text-signal">
                    {link.href.replace(/^mailto:|^https?:\/\//, "")}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto hidden font-mono text-sm text-line transition-colors group-hover:text-signal md:block"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[920px] flex-wrap items-center justify-between gap-2 px-6 py-8 md:px-10">
          <span className="label">
            © {new Date().getFullYear()} {profile.name} · {profile.nameEn}
          </span>
          <span className="label">Built with Next.js · Deployed on Vercel</span>
        </div>
      </footer>
    </>
  );
}
