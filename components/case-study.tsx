import Image from "next/image";
import { PayDemo } from "@/components/pay-demo";
import { SPEC_LABEL } from "@/components/project-block";
import { withoutCode, type Project } from "@/content/portfolio";

/** 글을 읽어 내려가면 옆에 고정된 화면이 그 단계의 장면으로 바뀐다. */
export function CaseStudy({ project }: { project: Project }) {
  const shots = project.spec.map(
    (_, i) => project.stage?.[i] ?? Math.min(i, project.media.length - 1),
  );
  const panels = [...new Set(shots)];

  return (
    <div className="case" data-case>
      <p className="case-overview" data-reveal="body">
        {project.overview}
      </p>
      <p className="case-org">{project.org}</p>

      <div className="case-grid">
        <div className="case-stage">
          {panels.map((shot, i) => {
            const media = shot === "pay" ? null : project.media[shot];
            return (
              <figure
                key={shot}
                data-panel={shot}
                className={`case-panel ${i === 0 ? "is-active" : ""}`}
              >
                {shot === "pay" ? (
                  <PayDemo />
                ) : (
                  media?.type === "image" && (
                    <>
                      <div className="case-shot">
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          sizes="(min-width: 900px) 42vw, 82vw"
                        />
                      </div>
                      <figcaption>{media.caption}</figcaption>
                    </>
                  )
                )}
              </figure>
            );
          })}
        </div>

        <div>
          {project.spec.map((row, i) => (
            <section key={row.label} className="case-step" data-shot={shots[i]}>
              <h4 data-reveal="row">{SPEC_LABEL[row.label] ?? row.label}</h4>
              <div data-reveal="body">
                {row.body.length === 1 ? (
                  <p className="prose-ko">{withoutCode(row.body[0])}</p>
                ) : (
                  <ul className="space-y-3">
                    {row.body.map((line) => (
                      <li key={line} className="prose-ko flex gap-3">
                        <span aria-hidden className="mark" />
                        <span>{withoutCode(line)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <p className="project-stack">{project.stack.join(", ")}</p>
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
        </div>
      </div>
    </div>
  );
}
