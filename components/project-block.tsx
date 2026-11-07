import { MediaGallery } from "@/components/media-gallery";
import type { Project } from "@/content/portfolio";

/**
 * 프로젝트 한 건을 부품 데이터시트처럼 조판한다.
 *   파트넘버 → 제목 → 개요 → 라벨/값 스펙 표 → 기술 스택
 * 스펙 표는 데스크톱에서 2열, 모바일에서는 라벨이 값 위로 쌓인다.
 */
export function ProjectBlock({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.code.toLowerCase()}`}
      className="project-block scroll-mt-24"
    >
      <div className="project-meta">
        <span className="project-code">
          {project.code}
        </span>
        <span className="label">{project.org}</span>
      </div>

      <h3 className="display project-title">{project.title}</h3>
      <p className="mt-1.5 font-mono text-sm text-muted">{project.titleEn}</p>

      <p className="prose-ko project-overview">
        {project.overview}
      </p>

      <dl className="project-specs">
        {project.spec.map((row) => (
          <div
            key={row.label}
            className="project-spec-row"
          >
            <dt className="label">{row.label}</dt>
            <dd className="prose-ko max-w-[62ch] text-[0.9375rem] text-ink/85">
              {row.body.length === 1 ? (
                row.body[0]
              ) : (
                <ul className="space-y-1.5">
                  {row.body.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <span aria-hidden className="mark" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {project.media.length > 0 && (
        <div className="project-gallery">
          <MediaGallery items={project.media} />
        </div>
      )}

      <div className="project-stack">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="project-tech"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-signal underline decoration-signal/30 underline-offset-4 transition-colors hover:decoration-signal"
        >
          <span aria-hidden>→</span> GitHub 저장소
        </a>
      )}
    </article>
  );
}
