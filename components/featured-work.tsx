import Image from "next/image";
import { CaseStudy } from "@/components/case-study";
import type { Project } from "@/content/portfolio";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      className="featured-work"
      aria-labelledby="featured-title"
    >
      <div className="featured-heading" data-reveal="heading">
        <h2 id="featured-title">대표 프로젝트 세 가지.</h2>
        <p>
          앱 결제와 장애 대응, 트렌드 예측 AI, 아우토반 주차 예측까지 제가
          중심이 되어 만든 일입니다.
        </p>
      </div>

      {projects.map((project) => {
        const image = project.media[0];
        const outcome = project.spec.find((row) => row.label === "Result")
          ?.body[0];

        return (
          <article key={project.code} id={`project-${project.code.toLowerCase()}`}>
            <div className="work-pin" data-pin>
              <div className="work-stage">
                <div className="work-media">
                  {image && image.type === "image" && (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="100vw"
                      className="work-image"
                    />
                  )}
                </div>
                <div className="work-copy">
                  <h3>{project.title}</h3>
                  {outcome && <p>{outcome}</p>}
                </div>
              </div>
            </div>
            <CaseStudy project={project} />
          </article>
        );
      })}
    </section>
  );
}
