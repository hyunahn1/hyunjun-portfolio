"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Phase = "idle" | "verifying" | "done";

/** 만월체크의 '밀어서 결제'를 직접 밀어 보는 체험. 실제 결제는 일어나지 않는다. */
export function PayDemo() {
  const [value, setValue] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (phase !== "verifying") return;
    const timer = window.setTimeout(() => setPhase("done"), 1200);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const pay = () => {
    setValue(100);
    setPhase("verifying");
  };

  const release = () => {
    setDragging(false);
    if (phase !== "idle") return;
    if (value >= 92) pay();
    else setValue(0);
  };

  const reset = () => {
    setValue(0);
    setPhase("idle");
  };

  return (
    <div className={`pay-demo is-${phase}`}>
      <div className="pay-order">
        <p>식자재 주문</p>
        <strong>5,500원</strong>
        <p>만월페이 저장 카드</p>
      </div>

      <div className="pay-status" aria-live="polite">
        {phase === "idle" && <p>아래 버튼을 오른쪽 끝까지 밀어 보세요</p>}
        {phase === "verifying" && (
          <>
            <i className="pay-ring" aria-hidden />
            <p>Face ID 확인 중</p>
          </>
        )}
        {phase === "done" && (
          <>
            <i className="pay-check" aria-hidden />
            <p>결제 완료</p>
            <button type="button" onClick={reset}>
              다시 해보기
            </button>
          </>
        )}
      </div>

      <div
        className={`pay-slider ${dragging ? "is-dragging" : ""}`}
        style={{ "--v": value / 100 } as CSSProperties}
      >
        <span className="pay-label" aria-hidden>
          밀어서 5,500원 결제
        </span>
        <span className="pay-handle" aria-hidden />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          disabled={phase !== "idle"}
          aria-label="밀어서 결제 체험"
          onChange={(event) => setValue(Number(event.target.value))}
          onPointerDown={() => setDragging(true)}
          onPointerUp={release}
          onPointerCancel={release}
          onKeyDown={(event) => {
            if (event.key === "Enter") pay();
          }}
          onKeyUp={() => {
            if (phase === "idle" && value >= 92) pay();
          }}
        />
      </div>
      <p className="pay-note">실제 결제는 되지 않는 체험이에요.</p>
    </div>
  );
}
