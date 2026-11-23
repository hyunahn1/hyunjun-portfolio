import Image from "next/image";
import { FeaturedWork } from "@/components/featured-work";
import { HeroScene } from "@/components/hero-scene";
import { IntroLoader } from "@/components/intro-loader";
import { MediaGallery } from "@/components/media-gallery";
import { ProjectBlock } from "@/components/project-block";
import { ScrollMotion } from "@/components/scroll-motion";
import { ScrollStatement } from "@/components/scroll-statement";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
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
  sections,
  skills,
  withoutCode,
} from "@/content/portfolio";

const section = Object.fromEntries(sections.map((s) => [s.id, s]));

export default function Home() {
  return (
    <>
      <IntroLoader />
      <ScrollMotion />
      <SiteHeader />

      <main id="top" className="flex-1">
        <div className="hero-pin" data-pin>
          <section className="hero-shell">
            <Image
              src="/media/hero-signal-field.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-art"
            />
            <HeroScene />
            <div className="hero-shade" aria-hidden />

            <div className="hero-inner">
              <h1 className="hero-title" lang="en" aria-label={profile.headline.join(" ")}>
                {profile.headline.map((line) => (
                  <span key={line} className="hero-line">
                    <span className="hero-line-inner">{line}{" "}</span>
                  </span>
                ))}
              </h1>

              <div className="hero-lower">
                <p className="hero-intro">{profile.heroIntro}</p>
                <div className="hero-actions">
                  <a href="#about" className="hero-action-primary">
                    제 이야기 보기
                  </a>
                  <a href="#projects" className="hero-action-secondary">
                    프로젝트 보기
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ScrollStatement text={profile.statement} />
        <FeaturedWork projects={mainProjects} />

        <div className="site-content">
          <Section id="other-projects" ko="그 외 프로젝트">
            {otherProjects.map((project) => (
              <details key={project.code} className="other-project">
                <summary>
                  <span>{project.title}</span>
                  <small>{project.org}</small>
                </summary>
                <ProjectBlock project={project} />
              </details>
            ))}
          </Section>

          <Section {...section.experience}>
            {experience.map((job) => (
              <div key={job.org} className="entry" data-reveal="body">
                <div className="entry-key">{job.period}</div>
                <div>
                  <h3 className="entry-title">{job.org}</h3>
                  <p className="entry-sub">
                    {job.program}
                    {job.location && `, ${job.location}`}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {job.bullets.map((line) => (
                      <li key={line} className="prose-ko flex gap-3 text-[1.0625rem]">
                        <span aria-hidden className="mark" />
                        <span>{withoutCode(line)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </Section>

          <Section {...section.skills}>
            {skills.map((group) => (
              <div key={group.group} className="entry" data-reveal="body">
                <div className="entry-key">{group.group}</div>
                <p className="prose-ko text-[1.0625rem]">{group.items.join(", ")}</p>
              </div>
            ))}
          </Section>

          <Section {...section.awards}>
            {awards.map((award) => (
              <div key={award.title + award.event} className="entry" data-reveal="body">
                <div className="entry-key">{award.period}</div>
                <div>
                  <h3 className="entry-title">
                    {award.title}, {award.event}
                  </h3>
                  <p className="entry-sub">{award.org}</p>
                  <ul className="mt-4 space-y-2">
                    {award.bullets.map((line) => (
                      <li key={line} className="prose-ko flex gap-3 text-[1.0625rem]">
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
          </Section>

          <Section {...section.curriculum}>
            <p className="prose-ko max-w-[62ch] text-[1.1875rem]" data-reveal="body">
              {curriculumIntro}
            </p>

            <a
              href="https://github.com/hyunahn1"
              target="_blank"
              rel="noreferrer"
              className="text-link mt-4 inline-block"
            >
              GitHub 저장소
            </a>

            <div className="mt-10">
              {curriculum.map((group) => (
                <div key={group.group} className="course-group">
                  <h3 className="entry-title" data-reveal="row">
                    {group.group}
                  </h3>
                  <div className="mt-6 grid gap-x-10 gap-y-9 sm:grid-cols-2">
                    {group.items.map((course) => (
                      <div key={course.name} className="min-w-0" data-reveal="body">
                        <h4 className="course-name">
                          {course.name}
                          <span>{course.ko}</span>
                        </h4>
                        <p className="prose-ko mt-2 text-[1.0625rem]">{withoutCode(course.desc)}</p>
                        <p className="course-learned">{course.learned.join(", ")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section {...section.education}>
            {education.map((item) => (
              <div key={item.school} className="entry" data-reveal="body">
                <div className="entry-key">{item.period}</div>
                <div>
                  <h3 className="entry-title">{item.school}</h3>
                  <p className="entry-sub">{item.detail}</p>
                </div>
              </div>
            ))}
          </Section>

          <Section {...section.about}>
            <div className="max-w-[62ch] space-y-6">
              {about.map((para) => (
                <p key={para} className="prose-ko text-[1.1875rem]" data-reveal="body">
                  {para}
                </p>
              ))}
            </div>
          </Section>

          <Section {...section.contact}>
            <p className="display text-[clamp(2rem,4.4vw,3.25rem)]" data-reveal="title">
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
                    className="contact-link"
                  >
                    <span className="contact-key">{link.label}</span>
                    <span className="break-all">
                      {link.href.replace(/^mailto:|^https?:\/\//, "")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          © {new Date().getFullYear()} {profile.name}
        </div>
      </footer>
    </>
  );
}
