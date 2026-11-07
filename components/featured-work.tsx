import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/content/portfolio";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const featured = [projects[0], projects[1], projects[3]];

  return (
    <section className="featured-work" aria-labelledby="featured-title">
      <div className="featured-heading" data-reveal="heading">
        <p>Selected systems</p>
        <h2 id="featured-title">데이터에서 운영까지.</h2>
        <span>
          모델 성능표에 멈추지 않고, 실제 사용자가 만나는 서비스까지 연결한
          작업입니다.
        </span>
      </div>

      <div className="featured-grid">
        {featured.map((project, index) => {
          const image = project.media[0];
          const outcome = project.spec.find((row) => row.label === "Result")
            ?.body[0];

          return (
            <a
              key={project.code}
              href={`#project-${project.code.toLowerCase()}`}
              className={`featured-card featured-card-${index + 1}`}
              data-reveal="media"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
            >
              <div className="featured-media">
                {image && image.type === "image" && (
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes={index === 0 ? "(min-width: 900px) 62vw, 100vw" : "(min-width: 900px) 32vw, 100vw"}
                    className="featured-image"
                  />
                )}
                <span className="featured-code">{project.code}</span>
                <span className="featured-open" aria-hidden>
                  열기 ↗
                </span>
              </div>
              <div className="featured-copy">
                <h3>{project.title}</h3>
                {outcome && <p>{outcome}</p>}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
