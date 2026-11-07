/* eslint-disable @next/next/no-img-element */
import type { Media } from "@/content/portfolio";

/**
 * 프로젝트·수상 증빙 사진과 데모 영상을 격자로 보여준다.
 * 세로 사진과 가로 사진이 섞여 있으므로 비율은 항목마다 지정하고,
 * 잘라내지 않도록 object-contain 으로 여백을 남긴다.
 */
export function MediaGallery({ items }: { items: Media[] }) {
  if (items.length === 0) return null;

  return (
    <div className="media-grid">
      {items.map((item) => (
        <figure key={item.src} className="media-figure">
          <div
            className={`media-frame ${item.portrait ? "is-portrait" : ""}`}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                preload="none"
                className="media-object"
              >
                {item.alt}
              </video>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="media-object"
              />
            )}
          </div>
          <figcaption className="media-caption">
            {item.type === "video" && <span className="text-signal">▶ </span>}
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
