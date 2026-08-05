import type { Project } from "@/content/portfolio";

/**
 * 프로젝트 한 건을 부품 데이터시트처럼 조판한다.
 *   파트넘버 → 제목 → 개요 → 라벨/값 스펙 표 → 기술 스택
 * 스펙 표는 데스크톱에서 2열, 모바일에서는 라벨이 값 위로 쌓인다.
 */
export function ProjectBlock({ project }: { project: Project }) {
  return (
    <article className="border-t-2 border-ink pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-mono text-xs font-semibold tracking-[0.14em] text-signal">
          {project.code}
        </span>
        <span className="label">{project.org}</span>
      </div>

      <h3 className="display mt-4 text-2xl sm:text-[2rem]">{project.title}</h3>
      <p className="mt-1.5 font-mono text-sm text-muted">{project.titleEn}</p>

      <p className="prose-ko mt-5 max-w-[62ch] text-[1.0625rem] text-ink/85">
        {project.overview}
      </p>

      <dl className="mt-8">
        {project.spec.map((row) => (
          <div
            key={row.label}
            className="grid gap-x-8 gap-y-2 border-t border-line py-5 md:grid-cols-[9.5rem_1fr]"
          >
            <dt className="label pt-1 md:border-r md:border-line">{row.label}</dt>
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

      <div className="flex flex-wrap items-center gap-1.5 border-t border-line pt-5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-sm bg-panel px-2 py-1 font-mono text-[0.6875rem] tracking-tight text-muted"
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
