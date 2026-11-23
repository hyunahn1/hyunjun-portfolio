import { MediaGallery } from "@/components/media-gallery";
import { withoutCode, type Project } from "@/content/portfolio";

// content 의 영문 키는 인쇄용 문서와 공유하므로 화면에서만 한글로 보여준다.
export const SPEC_LABEL: Record<string, string> = {
  Problem: "문제",
  "My Role": "맡은 일",
  Challenge: "어려웠던 점",
  Result: "결과",
  Focus: "집중한 부분",
};

export function ProjectBlock({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.code.toLowerCase()}`}
      className="project-block scroll-mt-24"
    >
      <h3 className="display project-title" data-reveal="title">
        {project.title}
      </h3>
      <div data-reveal="row">
        <p className="project-sub">{project.titleEn}</p>
        <p className="project-sub">{project.org}</p>
      </div>

      <p className="prose-ko project-overview" data-reveal="body">
        {project.overview}
      </p>

      <dl className="project-specs">
        {project.spec.map((row) => (
          <div key={row.label} className="project-spec-row" data-reveal="body">
            <dt>{SPEC_LABEL[row.label] ?? row.label}</dt>
            <dd className="prose-ko max-w-[62ch] text-[1.0625rem]">
              {row.body.length === 1 ? (
                withoutCode(row.body[0])
              ) : (
                <ul className="space-y-2">
                  {row.body.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span aria-hidden className="mark" />
                      <span>{withoutCode(line)}</span>
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

      <p className="project-stack" data-reveal="row">
        {project.stack.join(", ")}
      </p>

      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="text-link mt-5 inline-block"
        >
          GitHub 저장소
        </a>
      )}
    </article>
  );
}
