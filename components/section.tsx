import type { ReactNode } from "react";

type Props = {
  id: string;
  index: string;
  title: string;
  ko: string;
  children: ReactNode;
};

/**
 * 데이터시트의 장(章) 머리말처럼: 번호 → 제목 → 남은 폭을 채우는 괘선.
 */
export function Section({ id, index, title, ko, children }: Props) {
  return (
    <section id={id} className="content-section scroll-mt-24">
      <div className="section-watermark" aria-hidden>
        <div className="section-watermark-track">
          <span>{title}</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="section-heading" data-reveal="side">
        <span className="section-index">{index}</span>
        <div>
          <h2>{title}</h2>
          <p>{ko}</p>
        </div>
      </div>
      <div className="section-body" data-reveal="body">{children}</div>
    </section>
  );
}
