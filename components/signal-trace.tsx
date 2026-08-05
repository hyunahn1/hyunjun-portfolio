/**
 * 히어로 하단의 디지털 신호 파형.
 * 페이지가 열릴 때 왼쪽에서 오른쪽으로 한 번만 그려진다.
 * (prefers-reduced-motion 이면 즉시 완성된 상태로 표시)
 */
const WAVE =
  "M0,32 H40 V8 H90 V32 H140 V8 H170 V32 H250 V8 H300 V32 H330 V8 H410 V32 " +
  "H440 V8 H520 V32 H600 V8 H630 V32 H710 V8 H760 V32 H840 V8 H870 V32 " +
  "H950 V8 H1030 V32 H1060 V8 H1140 V32 H1200";

export function SignalTrace() {
  return (
    <svg
      className="trace w-full h-10"
      viewBox="0 0 1200 40"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={WAVE}
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
