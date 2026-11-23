import type { ReactNode } from "react";

type Props = {
  id: string;
  ko: string;
  children: ReactNode;
};

export function Section({ id, ko, children }: Props) {
  return (
    <section id={id} className="content-section scroll-mt-24">
      <h2 className="section-title" data-reveal="side">
        {ko}
      </h2>
      <div className="section-body">{children}</div>
    </section>
  );
}
