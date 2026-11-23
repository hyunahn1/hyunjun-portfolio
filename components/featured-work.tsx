import Image from "next/image";
import type { Project } from "@/content/portfolio";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const featured = [projects[0], projects[1], projects[3]];

  return (
    <section className="featured-work" aria-labelledby="featured-title">
      <div className="featured-heading" data-reveal="heading">
        <h2 id="featured-title">데이터에서 운영까지.</h2>
        <p>
          모델 성능표에 멈추지 않고, 실제 사용자가 만나는 서비스까지 연결한
          작업입니다.
        </p>
      </div>

      {featured.map((project) => {
        const image = project.media[0];
        const outcome = project.spec.find((row) => row.label === "Result")
          ?.body[0];

        return (
          <div key={project.code} className="work-pin" data-pin>
            <a
              href={`#project-${project.code.toLowerCase()}`}
              className="work-stage"
            >
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
            </a>
          </div>
        );
      })}
    </section>
  );
}
