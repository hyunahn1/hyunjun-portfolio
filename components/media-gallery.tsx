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
    <div className="grid items-start gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <figure key={item.src} className="min-w-0">
          <div
            className={`overflow-hidden rounded-sm border border-line bg-panel ${
              item.portrait ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                preload="none"
                className="h-full w-full object-contain"
              >
                {item.alt}
              </video>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            )}
          </div>
          <figcaption className="prose-ko mt-2.5 font-mono text-xs tracking-tight text-muted">
            {item.type === "video" && <span className="text-signal">▶ </span>}
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
