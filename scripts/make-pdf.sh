#!/usr/bin/env bash
#
# /print 페이지를 A4 PDF 로 렌더해 public/portfolio-ahnhyunjun.pdf 에 저장한다.
#   사용법: npm run pdf
#
# content/portfolio.ts 를 고친 뒤에는 이 스크립트를 다시 돌려야 PDF가 갱신된다.
set -euo pipefail

PORT="${PORT:-4321}"
OUT="${OUT:-public/portfolio-ahnhyunjun.pdf}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -x "$CHROME" ]; then
  echo "Chrome 을 찾을 수 없습니다: $CHROME" >&2
  echo "CHROME=/경로/to/chrome npm run pdf 로 지정하세요." >&2
  exit 1
fi

# 사진을 원본(1600px)째로 두면 PDF가 16MB 가까이 나온다.
# 지면에서 실제로 쓰이는 크기(약 55mm)에 맞춰 300dpi 정도인 760px JPEG 로 줄인다.
echo "인쇄용 이미지 생성 중..."
mkdir -p public/media/print
for src in public/media/*.webp; do
  name="$(basename "${src%.webp}")"
  sips -s format jpeg -s formatOptions 72 -Z 760 "$src" \
    --out "public/media/print/$name.jpg" >/dev/null
done

npm run build

npx next start -p "$PORT" >/tmp/portfolio-pdf-server.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true' EXIT

for _ in $(seq 1 60); do
  curl -sf -o /dev/null "http://localhost:$PORT/print" && break
  sleep 1
done

"$CHROME" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=20000 \
  --print-to-pdf="$OUT" \
  "http://localhost:$PORT/print"

echo "생성됨: $OUT"
