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
    <section id={id} className="scroll-mt-24 py-14 md:py-18">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm font-semibold text-signal">{index}</span>
        <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.18em]">
          {title}
        </h2>
        <span aria-hidden className="h-px flex-1 bg-line" />
        <span className="label">{ko}</span>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
