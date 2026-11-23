import type { CSSProperties } from "react";

/** 화면에 고정된 문장이 스크롤에 따라 단어 단위로 밝아진다. */
export function ScrollStatement({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <section
      className="statement-pin"
      data-pin
      style={{ "--n": words.length } as CSSProperties}
    >
      <div className="statement-stage">
        <p className="statement">
          {words.map((word, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
