/**
 * 포트폴리오의 모든 텍스트는 이 파일에만 있습니다.
 * 내용을 고치고 싶으면 이 파일만 수정하면 됩니다.
 *
 * 내용 기준: CV_Hyunjun.pdf (public/CV_Hyunjun.pdf 로도 배포됨)
 */

export const profile = {
  name: "안현준",
  nameEn: "Ahn Hyunjun",
  role: "AI / ML Engineer",
  headline: ["안녕하세요.", "매일 운영되는 AI를", "만드는 엔지니어입니다."],
  intro:
    "LLM 지식 증류로 F&B 트렌드를 조기 탐지하는 시스템과, XGBoost로 B2B 매장의 재구매 시점을 예측하는 시스템을 설계부터 운영까지 직접 만들었습니다. 두 시스템 모두 매일 무인으로 실행되며, 고정 평가셋·시간 순 검증·홀드아웃으로 모델이 정말 나아졌는지를 숫자로 확인합니다. C/C++·Linux 시스템 프로그래밍 기반 위에서, 모델을 실제 서비스로 연결하는 일에 집중하고 있습니다.",
  availability: [
    { label: "Location", value: "경기 수원" },
    { label: "Language", value: "한국어 / 영어 협업 가능" },
  ],
};

export type Link = { label: string; href: string };

export const links: Link[] = [
  { label: "Email", href: "mailto:ahnhj99999@gmail.com" },
  { label: "GitHub", href: "https://github.com/hyunahn1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hyunjun-ahn-35659b305/" },
  { label: "Blog", href: "https://velog.io/@hyunahn1" },
  { label: "Resume PDF", href: "/CV_Hyunjun.pdf" },
  // /print 페이지를 렌더한 결과물입니다. 내용을 고쳤다면 `npm run pdf` 로 다시 뽑으세요.
  { label: "Portfolio PDF", href: "/portfolio-ahnhyunjun.pdf" },
];

export type SpecRow = { label: string; body: string[] };

/**
 * 사진·영상은 public/media/ 아래에 있습니다.
 * portrait: true 로 두면 세로 사진 비율(3:4)로 표시됩니다.
 */
export type Media = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
  portrait?: boolean;
};

export type Project = {
  code: string;
  org: string;
  title: string;
  titleEn: string;
  overview: string;
  spec: SpecRow[];
  stack: string[];
  media: Media[];
  repo: string | null;
};

export const projects: Project[] = [
  {
    code: "PRJ-01",
    org: "만월회 · 사내 AI 시스템 · 2026.09 — 운영 중",
    title: "F&B 신규 트렌드 조기 탐지 — Trend Radar",
    titleEn: "Trend Radar — Early Detection of Emerging F&B Trends with Distilled LLMs",
    overview:
      "SNS·블로그·영상·커뮤니티 글에서 처음 등장한 디저트·음료 이름을 로컬 LLM이 읽어 내고, 그 이름의 검색 곡선을 매일 추적해 '뜰 조짐'을 판정하는 시스템입니다. 2026-09-22부터 사내 GPU 서버에서 매일 06:00 무인으로 실행되며, 결과는 사내 시스템의 트렌드 레이더 탭에 자동 게시됩니다.",
    spec: [
      {
        label: "Problem",
        body: [
          "검색량 순위는 이미 뜬 뒤에야 보이고, 두쫀쿠·버터떡 같은 신조어는 어떤 사전·모델도 모릅니다. 검색이 시작되기 전, 글에서 이름이 처음 나오는 순간부터 추적해야 했습니다. 과거 유행 12개를 재현해 보니 천천히 크는 유행은 검색 첫 신호가 대중화보다 최대 168일 먼저 왔습니다.",
        ],
      },
      {
        label: "My Role",
        body: [
          "설계·데이터 수집·모델 학습·서빙·대시보드까지 1인 개발 (커밋 400여 개)",
          "6종 소스(네이버 블로그·카페, Instagram, YouTube ko/en/ja/zh, 커뮤니티) 일일 수집 파이프라인, 누적 문서 약 15만 건",
          "교사 모델 라벨 + 판단 이유 한 줄을 함께 학습하는 Distilling Step-by-Step 방식으로 Qwen3-4B LoRA SFT (추출·판정 2종)",
          "vLLM 컨테이너 4종을 필요할 때만 기동하는 GPU 서빙 구성, 운영 중 외부 LLM API 비용 0원",
          "검색 곡선 특징(7·14·28일 변화, 가속, 고점 대비 하락 등)으로 유행 여부를 예측하는 분류 모델 + 확산 규칙",
          "근거 구절 대조(환각 차단), 별칭 검증, 이상 숫자 자동 점검 등 단계 사이 데이터 품질 방어",
          "Prometheus·Grafana로 파이프라인 단계별 지표, vLLM 처리량·지연 관측",
        ],
      },
      {
        label: "Challenge",
        body: [
          "처음엔 30B 범용 모델에 프롬프트로 맡겼는데, 손으로 만든 40쌍 시험에선 0.90이던 별칭 판정이 실제 운영 데이터에선 약 70%였습니다. 이후 운영 데이터에서 뽑은 고정 평가셋(판정 500·추출 301)으로만 판단하고, 평가셋 고정 → 기준선 → 변경 → 같은 셋 재측정 순서를 지켰습니다.",
          "추출 모델이 붙인 엉뚱한 별칭('영화')이 검색량에 합산돼 한 이름이 떡볶이의 25배로 부풀려진 사례를 추적해, 별칭 검증 규칙과 641개 이름 정리, 매일 다이제스트 상단의 이상 숫자 점검으로 재발을 막았습니다.",
          "'180일 안에 뜰 확률'을 보여 주던 초기 설계는 헛알림이 많아(문턱 0.5에서 적중 16 · 헛알림 21) 버리고, 단계(발견→주시→유력→유행)와 사람이 확인 가능한 근거로 바꿨습니다.",
        ],
      },
      {
        label: "Result",
        body: [
          "7.5배 작은 4B 증류 모델이 30B 범용 모델을 판정 6개 속성 모두에서 앞섬 — 음식 여부 F1 0.905 → 0.947, 카페 적합 F1 0.846 → 0.942",
          "추출 F1 0.654 → 0.747, 5건 이상 글에 나온 이름은 98% 포착 (운영 6일치 글 62,021건 기준)",
          "실제 유행 정답지 28개 중 27개를 시스템에 등록 (96%)",
          "검색 곡선 예측 AUC 0.839 (시간 기준 홀드아웃, 단순 성장률 규칙 0.656)",
        ],
      },
    ],
    stack: [
      "Python",
      "Qwen3-4B",
      "LoRA SFT",
      "Knowledge Distillation",
      "vLLM",
      "scikit-learn",
      "Naver DataLab API",
      "Prometheus",
      "Grafana",
      "Docker",
    ],
    media: [
      {
        type: "image",
        src: "/media/trend-radar.webp",
        alt: "다크 테마의 트렌드 레이더 화면. 추적 중 10,668개, 주시 330, 유력 15, 유행 5 숫자와 함께 이름별 단계·근거 문장·최근 90일 검색 흐름·떡볶이 대비 검색 배수가 표로 보인다.",
        caption: "트렌드 레이더 — 매일 06:00 자동 갱신. 단계·근거 문장·90일 검색 흐름·떡볶이 대비 배수",
      },
      {
        type: "image",
        src: "/media/trend-judge-scoreboard.webp",
        alt: "판정 스코어보드. 30B·4B 후보 모델 6개와 상용 참조 모델 2개를 같은 평가셋 500개로 7개 속성별 점수로 비교한 표.",
        caption: "판정 스코어보드 — 같은 평가셋 500개로 모든 후보 모델을 채점",
      },
      {
        type: "image",
        src: "/media/trend-judge-chart.webp",
        alt: "판정 6개 속성에서 30B 범용 모델과 4B 증류 모델의 점수를 비교한 막대 그래프. 모든 속성에서 4B가 높다.",
        caption: "4B 증류 모델이 30B 범용 모델을 6개 속성 모두에서 앞섬",
      },
      {
        type: "image",
        src: "/media/trend-grafana.webp",
        alt: "Grafana 운영 대시보드. 일일 파이프라인 종료 코드, 소요 시간, 소스별 수집 문서 수, 단계별 항목 수, 외부 API 호출량, 로컬 LLM 처리량과 지연 패널.",
        caption: "Grafana 운영 화면 — 파이프라인 단계별 지표와 vLLM 처리량·지연",
      },
    ],
    repo: null,
  },
  {
    code: "PRJ-02",
    org: "만월회 · 사내 AI 시스템 · 2026.09 — 운영 중",
    title: "B2B 매장 재구매 시점 예측",
    titleEn: "Reorder Forecasting — When Will a Store Buy Again?",
    overview:
      "카페·베이커리 매장이 어떤 품목을 언제, 몇 개 다시 살지 예측해, 재고가 떨어지기 전에 앱이 재구매 알림과 장바구니 제안을 보내도록 하는 시스템입니다. 2026-09-28부터 Cloud Run Job으로 매일 자동 예측하고, Firestore를 거쳐 앱 푸시로 이어집니다.",
    spec: [
      {
        label: "Problem",
        body: [
          "B2B 식자재 고객은 같은 품목을 일정한 주기로 반복 구매하지만, 매장마다 리듬이 다르고 주문 시점을 놓치면 영업에 차질이 생깁니다. 설계 원칙은 하나였습니다 — 늦은 알림은 비싸고, 조금 이른 알림은 허용한다.",
        ],
      },
      {
        label: "My Role",
        body: [
          "약 2년치 주문 상세 데이터 정제 — '중복처럼 보이는 행'이 부분 배송·취소 구조임을 확인하고 아이템 단위 추적으로 전환",
          "구매 횟수별 예측 전략: 1회차 품목 중앙값, 2회차 직전 간격, 3회차부터 XGBoost(21개 피처)",
          "월별 12구간 시간 순 워크포워드 검증, 모든 피처를 예측 시점 기준으로 재계산해 데이터 누수 차단",
          "알림을 보내지 않는 5% 홀드아웃과 control / treatment 분리로 모델의 자기확증 방지",
          "BigQuery → Cloud Run Job → Firestore → Cloud Functions 배치 파이프라인 구축 (실행 1~2분)",
          "Prometheus·Grafana 실험 대시보드로 후보 모델 벤치마크·최종 시험 기록",
        ],
      },
      {
        label: "Challenge",
        body: [
          "생존분석 14후보, 주기 모델 32구성, TabPFN까지 시도했지만 ±7일 적중은 약 48%에서 멈췄습니다. 오차를 진단해 보니 실패 323건 중 309건이 '일찍 알린' 경우여서, 핵심 지표를 날짜 오차에서 '늦은 알림 비율'로 바꿨습니다.",
          "주기 유형별 전담 모델을 붙인 멀티 에이전트 라우터는 일부 유형에서 늦음을 크게 줄였지만(짧아짐 15.2% → 0.8%) 전체 차이는 0.4%p 이내였습니다. 운영 비용이 낮은 기본 XGBoost를 택해 실행 시간 20초 → 3.6초, PyTorch·42MB 가중치를 배포 이미지에서 뺐습니다.",
          "운영 2주 차에 보정 기록이 0건으로 쌓이던 결함(배송 전 보류 주문이 대조에서 빠짐)을 찾아, 낸 제안을 장부로 보관해 구매 확정일에 대조하도록 수정했습니다.",
        ],
      },
      {
        label: "Result",
        body: [
          "재구매일 오차 8.44일 → 5.56일 (기준 모델 대비 34% 감소)",
          "래칫 보정으로 같은 매장·품목을 반복해서 놓치는 비율 2.5% → 1.0% (재구매 22,311건 백테스트)",
          "매일 약 6천 건의 매장×품목 제안을 관리하며 실제 앱 알림·장바구니 제안으로 운영 중",
        ],
      },
    ],
    stack: [
      "Python",
      "XGBoost",
      "TabPFN",
      "Pandas",
      "BigQuery",
      "Cloud Run Jobs",
      "Firestore",
      "Cloud Functions",
      "Prometheus",
      "Grafana",
      "Docker",
    ],
    media: [
      {
        type: "image",
        src: "/media/reorder-grafana-bench.webp",
        alt: "Grafana 모델 벤치마크 대시보드. 같은 검증 1,196건에서 단순 기준, 전체 이력, 최근 가중치, XGBoost 후보를 비교한 표와 그래프.",
        caption: "모델 벤치마크 — 같은 검증 1,196건에서 기준·전체 이력·최근 가중치·XGBoost 비교",
      },
      {
        type: "image",
        src: "/media/reorder-grafana-final.webp",
        alt: "Grafana 최종 시험 대시보드. 후보를 고정한 뒤 처음 보는 기간 786건으로 평가한 지표 표, 날짜별 오차 그래프, 구매 이력 집단별 약점 표.",
        caption: "최종 시험 — 후보 고정 후 처음 보는 기간으로 평가, 집단별 약점까지 공개",
      },
      {
        type: "image",
        src: "/media/reorder-baseline-xgb.webp",
        alt: "기준 모델 8.44일과 XGBoost 5.56일의 재구매일 MAE를 비교한 막대 그래프",
        caption: "재구매일 MAE — 기준 모델 8.44일 → XGBoost 5.56일",
      },
      {
        type: "image",
        src: "/media/reorder-ratchet.webp",
        alt: "v7과 v8 래칫 보정의 n번째 놓침 건수를 비교한 막대 그래프. v8에서 두 번째·세 번째 놓침이 크게 줄었다.",
        caption: "래칫 보정 — 같은 매장·품목의 두 번째 놓침은 절반 이하, 세 번째는 거의 사라짐",
      },
    ],
    repo: null,
  },
  {
    code: "PRJ-03",
    org: "42 Wolfsburg · Applied Deep Learning",
    title: "아우토반 트럭 주차공간 예측",
    titleEn: "Autobahn Truck Parking Availability Prediction",
    overview:
      "트럭 운전자가 도착할 시점의 주차 가능 여부를 예측해, 운행·휴식 시간 규정 안에서 안전하게 정차할 지점을 고를 수 있도록 돕는 서비스입니다. (진행 중)",
    spec: [
      {
        label: "Problem",
        body: [
          "독일 아우토반에서는 야간 트럭 주차공간 부족 문제가 발생합니다. 하지만 지금 이 순간 공간이 비어 있는지만으로는, 몇 시간 뒤 도착할 시점에 주차가 가능한지 판단할 수 없습니다.",
        ],
      },
      {
        label: "My Role",
        body: [
          "약 16만 건 규모의 독일 Toll Collect SID 통행 데이터 수집 및 전처리",
          "휴게소별 시공간 수요 패턴 분석",
          "시간·위치·경로 맥락·수요를 다루는 피처 파이프라인 구축",
          "LightGBM 베이스라인 학습 및 딥러닝 모델과 성능 비교",
          "TimescaleDB(시계열 저장), Feast(피처 서빙), Redis(예측 캐시) 연동",
          "Kubernetes 기반 추론 스택 배포",
          "Grafana 대시보드로 인제스션·예측 오차(MAE)·잡 상태 모니터링",
          "Flutter로 iOS / Android 공용 내비게이션 클라이언트 구현",
        ],
      },
      {
        label: "Challenge",
        body: [
          "시간대와 요일에 따라 데이터 분포가 크게 달라지는 문제를 확인했습니다. 단일 모델에 의존하는 대신, 계절성 기준값(seasonal baseline)과 머신러닝 모델을 나란히 비교하는 구조를 설계해 어떤 조건에서 모델이 기준값보다 실제로 나은지 검증했습니다.",
        ],
      },
      {
        label: "Result",
        body: [
          "경로를 반영한(route-aware) 예측 모델과 추론 스택을 Kubernetes 위에서 동작시켰고, 사용자의 경로와 예상 도착 시간을 기준으로 주차 가능성을 안내하는 프로토타입을 구현했습니다.",
        ],
      },
    ],
    stack: [
      "Python",
      "PyTorch",
      "LightGBM",
      "Pandas",
      "NumPy",
      "Kubernetes",
      "TimescaleDB",
      "Feast",
      "Redis",
      "Grafana",
      "Flutter",
    ],
    media: [
      {
        type: "image",
        src: "/media/autobahn-grafana.webp",
        alt: "ML Forecast Pipeline 이라는 이름의 Grafana 대시보드. 챔피언 모델 번호, SID 인제스션 속도, 예측 MAE, 잡 상태 패널이 보인다.",
        caption: "Grafana 대시보드 — SID 인제스션·Feast 푸시 지연·수평선별 MAE 모니터링",
        portrait: true,
      },
      {
        type: "image",
        src: "/media/autobahn-flutter-nav.webp",
        alt: "Flutter로 만든 TruckStop Finder 앱이 iOS 시뮬레이터 두 대에서 각각 경로 추천 화면과 로그인 화면을 보여주는 모습",
        caption: "Flutter 클라이언트 — 경로별 휴게소 추천 및 도착 시각 안내 (iOS / Android 공용)",
        portrait: true,
      },
    ],
    repo: null,
  },
  {
    code: "PRJ-04",
    org: "만월회 · 모바일 앱 · 2026.09 — 출시·운영 중",
    title: "디저트맵 — 유행 디저트 판매처 지도 앱",
    titleEn: "Dessert Map — Finding Where Trending Desserts Are Sold",
    overview:
      "'지금 내 근처에서 피자설기 파는 곳이 어디야?'에 3초 안에 답하는 지도 앱입니다. 블로그·카페 글과 지역 검색을 교차 확인해 판매처를 자동 수집하고, 사용자 제보와 관리자 검수로 지도를 살아 있게 유지합니다. App Store·Google Play에 출시했고, 피자설기에서 과일모찌·버터떡·두쫀쿠 등으로 디저트를 넓혀 가고 있습니다.",
    spec: [
      {
        label: "Problem",
        body: [
          "유행 디저트는 파는 곳이 매일 늘지만 정보가 블로그·인스타에 흩어져 있고, 매장마다 판매 시간·가격·판매 여부가 다릅니다. 텍스트에서 매장명을 추측하는 첫 수집기는 '부평떡집'·'대한민국' 같은 오탐을 만들었습니다.",
        ],
      },
      {
        label: "My Role",
        body: [
          "기획부터 수집기·서버·앱·관리자 화면·스토어 출시까지 1인 개발",
          "수집기 재설계: 매장은 지역검색 API가 돌려준 실제 플레이스로만 만들고, 이름+지역이 일치하는 글 2건 이상이면 확정·1건이면 유력·나머지는 검수 대기로 분리",
          "전국 17개 시·도 단위 수집, 매일 자동 갱신과 30일 미노출 매장 정리",
          "Flutter 지도 앱: 내 주변 가까운 순, 가격·판매 시간, 네이버 지도 길찾기, 즐겨찾기, 디저트 종류 선택·검색",
          "'더 이상 안 팔아요' 제보는 서로 다른 사용자 3건 이상일 때만 배지 → 관리자 확인 후 반영 (장난 제보 방지)",
          "관리자 웹: 판매처 후보 검수(최근 180일 근거 필수), 수집 내역, 이용 분석",
          "FastAPI·PostgreSQL 프로토타입에서 Firebase Functions·Firestore·Authentication으로 이전",
        ],
      },
      {
        label: "Result",
        body: [
          "iOS·Android 정식 출시 후 버전별 업데이트 운영 (Flutter 테스트 130여 개)",
          "피자설기에서 과일모찌 140곳·버터떡 108곳·두쫀쿠 251곳 등으로 디저트 카테고리 확장",
          "Trend Radar(PRJ-01)가 찾은 유행 디저트를 지도로 바로 확장하는 흐름으로 연결",
        ],
      },
    ],
    stack: [
      "Flutter",
      "Dart",
      "Python",
      "Firebase Functions",
      "Firestore",
      "Firebase Auth",
      "FastAPI",
      "PostgreSQL",
      "Naver / Kakao API",
    ],
    media: [
      {
        type: "image",
        src: "/media/dessertmap-map.webp",
        alt: "디저트맵 앱 지도 화면. 지도 위 매장 핀과 아래 가까운 매장 목록, 가격이 표시된다.",
        caption: "지도 홈 — 내 주변 판매처와 가격, 가까운 순 목록",
        portrait: true,
      },
      {
        type: "image",
        src: "/media/dessertmap-detail.webp",
        alt: "디저트맵 매장 상세 화면. 피자설기 사진, 매장 주소, 가격, 판매 시간, 네이버 지도 길찾기 버튼.",
        caption: "매장 상세 — 가격·판매 시간·근거 글·길찾기",
        portrait: true,
      },
      {
        type: "image",
        src: "/media/dessertmap-landing.webp",
        alt: "디저트맵 다운로드 페이지. 피자설기 사진 위에 '먹고 싶은 그 순간, 찾고 싶은 그곳' 문구와 App Store·Google Play 버튼.",
        caption: "다운로드 페이지 — App Store·Google Play 출시",
      },
      {
        type: "image",
        src: "/media/dessertmap-admin.webp",
        alt: "디저트맵 관리자 웹의 수집 내역 화면. 검색 결과 1700, 매장 연결 1326, 새 판매처 후보 23 수치와 수집 목록.",
        caption: "관리자 웹 — 수집 내역과 판매처 후보 검수",
      },
    ],
    repo: null,
  },
  {
    code: "PRJ-05",
    org: "만월회 · 모바일 앱 · 2026.09 — 현재",
    title: "만월체크 — 식자재몰 · 레시피 · 사장님 커뮤니티",
    titleEn: "Manwol Check — In-app B2B Grocery Mall, Recipes & Owner Community",
    overview:
      "카페 사장님과 직원이 매뉴얼·근태·급여·레시피·재고를 함께 관리하는 매장 운영 앱입니다. 앱 안의 식자재 주문몰(만월상회)과 레시피 기능을 맡아, 레시피에서 재료를 바로 사고 재고가 떨어질 때쯤 장바구니가 미리 채워지는 흐름을 만들었습니다. 사장님 커뮤니티를 새로 만들고 기존 화면들을 리팩터링해 UI/UX를 다듬었습니다.",
    spec: [
      {
        label: "Problem",
        body: [
          "만월회의 실제 쇼핑몰은 외부 쇼핑몰 빌더(아임웹)에 있고, 이 서비스는 주문 생성 API를 제공하지 않습니다. 앱에서 결제·배송·환불·적립금까지 끝나는 B2B 주문 경험을 만들면서도, 상품·회원·적립금의 원본은 그대로 아임웹에 두어야 했습니다.",
        ],
      },
      {
        label: "식자재몰",
        body: [
          "아임웹 상품·회원·주문을 Cloud Functions로 주기 동기화(Firestore · Cloud SQL)하고, 앱 주문은 자체 장부(PostgreSQL)에 기록해 만월시스템 출고 흐름에 연결",
          "토스페이먼츠 결제, 저장 카드로 비밀번호만 입력하는 바로결제, '밀어서 결제' 인터랙션",
          "배송비를 상품별 배송 템플릿·등급 무료배송·도서산간·면세 배분까지 아임웹과 같은 규칙으로 계산",
          "출고 전 셀프 즉시취소 / 출고 후 반품·환불 요청 분기, 환불 계좌 암호화 저장, 적립금 실시간 반영",
          "상품명 키워드 분류를 아임웹 카테고리 트리로 바꿔 오분류 155개 정리, 회원 등급 전용 카테고리 노출",
          "재구매 예측(PRJ-02)이 알림을 보내는 시각에 스마트 장바구니를 자동으로 채우고, 알림 열기·자동 담기·그대로 결제 이벤트를 기록",
        ],
      },
      {
        label: "레시피",
        body: [
          "레시피 상세의 '재료 구매하기' — 레시피 재료를 식자재몰 상품과 연결해, 옵션·수량을 골라 바로 담는 시트",
          "'약 N번 만들 수 있어요' — 상품명의 묶음 표기(60g×10개, 1kg 3개, 18개입)를 해석하고 g↔ml를 맞춰 한 번 구매로 몇 잔을 만들 수 있는지 계산",
          "내 레시피 / 추천 레시피 탭, 분류 줄, 초성 검색, 폴더 관리로 레시피 탭 재설계, 본사 추천 레시피 푸시 배포",
        ],
      },
      {
        label: "커뮤니티",
        body: [
          "사장님 전용 커뮤니티: 채널, 글·댓글·답글, 저장, 검색, DM, 프로필, 지역 필터, 주간 인기 글, 공유 링크",
          "사업자 인증 표시, 규정 동의, 신고·차단과 운영 대시보드(신고 처리·정지), Remote Config로 출시 빌드에서 켜고 끄기",
        ],
      },
      {
        label: "UI/UX",
        body: [
          "홈을 Figma 새 디자인으로 교체하고 기존 화면을 SEED 디자인 시스템 기준으로 리팩터링",
          "첫 로딩 스켈레톤, iOS 기본 전환, 상품 사진 Hero 전환, 태블릿 폭 대응",
        ],
      },
    ],
    stack: [
      "Flutter",
      "Dart",
      "Firebase",
      "Cloud Functions",
      "Cloud SQL (PostgreSQL)",
      "Firestore",
      "Toss Payments",
      "Remote Config",
      "Figma",
    ],
    media: [
      {
        type: "image",
        src: "/media/omcheck-shop.webp",
        alt: "만월체크 식자재몰 홈. 전체 상품 620개와 상품 검색창, 베이커리/디저트·음료베이스·매장용품 등 카테고리별 상품 수가 사진 타일로 보인다.",
        caption: "식자재몰 — 아임웹 카테고리 트리로 정리한 상품 620개",
        portrait: true,
      },
      {
        type: "image",
        src: "/media/omcheck-recipe.webp",
        alt: "만월체크 레시피 탭. 내 레시피 13·추천 레시피 100 탭, 초성 검색창, 분류 아이콘 줄, 자주 보는 레시피 사진 줄과 내 레시피 목록.",
        caption: "레시피 탭 — 내/추천 레시피, 초성 검색, 분류 줄, 자주 보는 레시피",
        portrait: true,
      },
      {
        type: "image",
        src: "/media/omcheck-community.webp",
        alt: "만월체크 사장님 커뮤니티 홈. 채널 바로가기 아이콘, 배너, 지금 인기 글, 내 채널 목록과 하단 탭.",
        caption: "사장님 커뮤니티 홈 — 채널 바로가기·인기 글·내 채널",
        portrait: true,
      },
      {
        type: "image",
        src: "/media/omcheck-home.webp",
        alt: "만월체크 사장님 홈. 날짜 탭, 오픈·마감 매뉴얼 카드, AI 커피셋팅, 기타 매뉴얼 목록과 하단 탭.",
        caption: "홈 — Figma 새 디자인으로 교체한 날짜 탭·매뉴얼 카드",
        portrait: true,
      },
    ],
    repo: null,
  },
  {
    code: "PRJ-06",
    org: "42 Wolfsburg · SEA:ME Capstone",
    title: "통합 디지털 콕핏",
    titleEn: "Integrated Digital Cockpit",
    overview:
      "Raspberry Pi 4 한 대 위에서 Xen 하이퍼바이저로 도메인을 분리해, 디지털 클러스터·헤드 유닛·주차 보조 기능을 하나의 차량용 콕핏으로 통합한 프로젝트입니다.",
    spec: [
      {
        label: "Problem",
        body: [
          "실제 차량 소프트웨어는 하나의 애플리케이션이 아니라, 서로 다른 신뢰 수준과 실시간 요구를 가진 여러 시스템이 한 하드웨어 위에서 동작하는 구조입니다. 이 혼합 중요도(mixed-criticality) 구조를 축소된 환경에서 직접 구성해보는 것이 목표였습니다.",
        ],
      },
      {
        label: "My Role",
        body: [
          "Xen 하이퍼바이저 기반 Dom0 / DomU 분리 환경 구성",
          "Yocto / BitBake 로 커스텀 Embedded Linux 이미지 빌드",
          "Qt/QML 기반 디지털 클러스터 및 헤드 유닛 HMI 개발",
          "CAN Bus를 통한 차량 데이터 송수신 구현",
          "초음파 센서 기반 Parking Distance Control 구현",
          "도메인 간 데이터 흐름 및 통신 구조 분석",
        ],
      },
      {
        label: "Challenge",
        body: [
          "가상화된 도메인 사이에서 CAN 데이터와 센서 값을 지연 없이 전달하는 것이 가장 어려웠습니다. 계층별로 로그를 남겨 병목이 드라이버·IPC·렌더링 중 어디서 발생하는지 분리해 확인하고, 전달 경로를 단순화하는 방향으로 접근했습니다.",
        ],
      },
      {
        label: "Result",
        body: [
          "센서 입력 → CAN 전송 → 클러스터 화면 표시까지 이어지는 경로를 하나의 보드 위에서 동작시켰고, 전체 스택을 RC카 플랫폼에 이식해 실제 하드웨어에서 동작을 검증했습니다.",
        ],
      },
    ],
    stack: [
      "C++",
      "Xen Hypervisor",
      "Yocto / BitBake",
      "Embedded Linux",
      "Qt / QML",
      "CAN Bus",
      "Raspberry Pi 4",
    ],
    media: [
      {
        type: "image",
        src: "/media/cockpit-cluster.webp",
        alt: "Raspberry Pi에 연결된 와이드 디스플레이에 속도·휠 RPM·랩타임·드라이브 모드가 표시된 디지털 클러스터 화면",
        caption: "인스트루먼트 클러스터 — 속도·휠 RPM·랩타임·배터리 상태 표시",
      },
      {
        type: "image",
        src: "/media/cockpit-head-unit.webp",
        alt: "7인치 디스플레이에 동작 중인 헤드 유닛 미디어 플레이어 화면",
        caption: "헤드 유닛 — 미디어 플레이어 및 차량 상태 연동 UI",
      },
      {
        type: "image",
        src: "/media/cockpit-pdc.webp",
        alt: "초음파 센서가 장착된 RC카와 주차 거리 제어 화면이 표시된 디스플레이",
        caption: "Parking Distance Control — 초음파 센서 거리값 시각화",
      },
      {
        type: "video",
        src: "/media/pdc-demo.mp4",
        poster: "/media/pdc-demo-poster.webp",
        alt: "PDC 시스템이 장애물과의 거리를 실시간으로 표시하는 동작 영상",
        caption: "PDC 동작 영상 — 실제 하드웨어에서 거리 측정·표시 검증",
      },
    ],
    repo: null,
  },
  {
    code: "PRJ-07",
    org: "42 Network · System Administration",
    title: "컨테이너 기반 웹 인프라",
    titleEn: "ContainerWeb — Containerized Web Infrastructure",
    overview:
      "직접 작성한 Debian 이미지로 LEMP 스택을 구성하고, Docker Compose로 선언적으로 오케스트레이션한 멀티 컨테이너 웹 인프라입니다.",
    spec: [
      {
        label: "My Role",
        body: [
          "NGINX · WordPress(PHP-FPM) · MariaDB 컨테이너를 커스텀 Debian 이미지로 직접 빌드",
          "NGINX를 TLS 종단 리버스 프록시로 구성 (TLSv1.2 / 1.3, self-signed 인증서)",
          "FastCGI로 PHP 요청을 PHP-FPM에 전달하는 경로 구성",
          "Docker secrets, 격리된 bridge 네트워크, bind-mount 볼륨으로 보안·영속성 처리",
          "Makefile과 멱등성 있는 셸 스크립트로 빌드·수명주기 자동화",
        ],
      },
      {
        label: "Focus",
        body: [
          "컨테이너 이미지를 베이스에서부터 직접 만들어 각 계층이 무엇을 하는지 확인하는 것에 집중했습니다. 설정을 이미지 안에 숨기지 않고, 재현 가능한 형태로 밖에 드러내는 구조를 지향했습니다.",
        ],
      },
    ],
    stack: [
      "Docker",
      "Docker Compose",
      "NGINX",
      "MariaDB",
      "WordPress / PHP-FPM",
      "Bash",
    ],
    media: [],
    repo: null,
  },
  {
    code: "PRJ-08",
    org: "42 Network · System Administration",
    title: "Kubernetes GitOps 파이프라인",
    titleEn: "Inception-of-Things (IoT) — Kubernetes GitOps",
    overview:
      "Vagrant로 재현 가능한 멀티 노드 K3s 클러스터를 만들고, Argo CD로 Git 저장소와 클러스터 상태를 동기화하는 GitOps 배포 파이프라인을 구성했습니다.",
    spec: [
      {
        label: "My Role",
        body: [
          "Vagrant 기반 멀티 노드 K3s 클러스터(server / agent) 프로비저닝",
          "host 기반 Ingress 라우팅으로 워크로드 외부 노출",
          "K3d를 이용한 로컬 Kubernetes 환경 구성",
          "Argo CD로 Git 매니페스트를 클러스터에 자동 동기화하는 CD 파이프라인 구현",
          "Git 매니페스트 수정만으로 애플리케이션 버전이 롤아웃되는지 반복 검증",
        ],
      },
      {
        label: "Focus",
        body: [
          "‘클러스터에 무엇이 떠 있는가’의 기준을 Git에 두는 방식을 직접 구성해보고, 수동 배포와 무엇이 달라지는지 확인했습니다.",
        ],
      },
    ],
    stack: ["K3s", "K3d", "Vagrant", "Argo CD", "Kubernetes Ingress", "Docker"],
    media: [],
    repo: null,
  },
];

/* --- 42 과정에서 수행한 과제 ------------------------------------------- */

export type Course = {
  name: string;
  ko: string;
  desc: string;
  learned: string[];
};

export const curriculumIntro =
  "42는 강의 없이 과제와 동료 평가로 진행됩니다. 정답이 주어지지 않기 때문에 매번 문서와 시스템 콜 매뉴얼을 직접 읽고, 동작을 확인하며 구현했습니다. 아래는 그 과정에서 직접 만들고 평가받은 과제들입니다.";

export const curriculum: { group: string; items: Course[] }[] = [
  {
    group: "C · 시스템 프로그래밍",
    items: [
      {
        name: "ft_printf",
        ko: "표준 출력 함수 재구현",
        desc: "C 표준 printf를 가변 인자와 포맷 파서로 직접 구현하고, 이후 과제에서 재사용할 정적 라이브러리로 묶었습니다.",
        learned: ["가변 인자", "포맷 파싱", "정적 라이브러리", "Makefile"],
      },
      {
        name: "Minishell",
        ko: "셸 구현",
        desc: "bash의 동작을 축소해 구현했습니다. 명령어 파싱부터 fork/exec, 파이프, 리다이렉션, 시그널 처리까지 셸의 실행 경로를 직접 만들었습니다.",
        learned: ["fork / exec", "pipe", "redirection", "signal", "파서 설계"],
      },
      {
        name: "Philosophers",
        ko: "동시성 문제",
        desc: "식사하는 철학자 문제를 스레드와 뮤텍스로 구현하며, 데드락과 기아 상태 없이 자원을 나눠 쓰는 방법을 다뤘습니다.",
        learned: ["pthread", "mutex", "deadlock", "race condition"],
      },
    ],
  },
  {
    group: "네트워크 · 서버",
    items: [
      {
        name: "NetPractice",
        ko: "컴퓨터 네트워크",
        desc: "잘못 구성된 네트워크를 직접 고치는 과제로, IP 주소 체계와 서브넷 마스크, 라우팅 테이블이 어떻게 맞물리는지 익혔습니다.",
        learned: ["TCP / IP", "서브넷", "라우팅"],
      },
      {
        name: "ft_IRC",
        ko: "IRC 서버",
        desc: "RFC 기준의 IRC 서버를 C++로 구현했습니다. 하나의 이벤트 루프로 다수 클라이언트를 논블로킹 처리하고, 채널·권한·명령어 프로토콜을 파싱했습니다.",
        learned: ["논블로킹 I/O", "poll", "프로토콜 파싱", "다중 클라이언트"],
      },
      {
        name: "Webserv",
        ko: "HTTP 서버",
        desc: "HTTP/1.1 서버를 직접 구현했습니다. 설정 파일 파싱, 라우팅, 정적 파일 제공, CGI 실행까지 요청 처리 경로 전체를 다뤘습니다.",
        learned: ["HTTP/1.1", "socket", "CGI", "설정 파서"],
      },
    ],
  },
  {
    group: "리눅스 · 인프라",
    items: [
      {
        name: "Born2beRoot",
        ko: "리눅스 서버 구축",
        desc: "가상머신 위에 Debian 서버를 직접 구축했습니다. LVM 암호화 파티션, SSH·방화벽·sudo 정책, 비밀번호 규칙, 모니터링 스크립트를 설정하며 리눅스 시스템 관리의 기본을 익혔습니다.",
        learned: ["Linux", "LVM", "SSH", "UFW", "cron"],
      },
      {
        name: "Inception",
        ko: "컨테이너 인프라",
        desc: "NGINX·WordPress·MariaDB를 각각의 컨테이너로 분리하고, 이미지를 베이스부터 직접 작성해 Docker Compose로 묶었습니다. (PRJ-07)",
        learned: ["Docker", "Compose", "NGINX", "TLS", "Docker secrets"],
      },
      {
        name: "Inception-of-Things",
        ko: "쿠버네티스 GitOps",
        desc: "Vagrant로 K3s 클러스터를 프로비저닝하고, Argo CD로 Git 저장소와 클러스터 상태를 동기화하는 배포 파이프라인을 구성했습니다. (PRJ-08)",
        learned: ["K3s / K3d", "Argo CD", "GitOps", "Ingress"],
      },
    ],
  },
  {
    group: "C++ · 렌더링 · 함수형",
    items: [
      {
        name: "CPP Modules",
        ko: "C++ 객체지향",
        desc: "C++의 기능을 단계별로 구현했습니다. 상속과 다형성, 연산자 오버로딩, 템플릿, 캐스팅, STL 컨테이너를 직접 다뤘습니다.",
        learned: ["OOP", "템플릿", "STL", "캐스팅", "예외 처리"],
      },
      {
        name: "cub3D",
        ko: "레이캐스팅 렌더러",
        desc: "레이캐스팅으로 3D 시점을 그리는 미로 게임을 만들었습니다. 벡터 연산, 렌더링 루프, 텍스처 매핑과 이벤트 처리를 직접 구현했습니다.",
        learned: ["레이캐스팅", "MiniLibX", "벡터 연산", "이벤트 루프"],
      },
      {
        name: "OCaml",
        ko: "함수형 프로그래밍",
        desc: "불변성, 패턴 매칭, 고차 함수, 타입 시스템을 다루며 명령형과는 다른 방식으로 문제를 나누는 법을 익혔습니다.",
        learned: ["함수형", "패턴 매칭", "타입 추론", "불변성"],
      },
    ],
  },
];

export type Experience = {
  org: string;
  program: string;
  period: string;
  location?: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    org: "만월회 (만월상회)",
    program: "AI 엔지니어 · 사내 개발",
    period: "2026.09 — 현재",
    location: "대한민국",
    bullets: [
      "카페·베이커리 대상 B2B 식자재 이커머스의 사내 AI 시스템 개발",
      "LLM 지식 증류 기반 F&B 트렌드 조기 탐지 시스템 설계·운영 — 사내 GPU 서버에서 매일 무인 실행 (PRJ-01)",
      "XGBoost 기반 매장별 재구매 시점 예측 배치를 Cloud Run에 배포해 앱 알림·장바구니 제안과 연동 (PRJ-02)",
      "디저트 판매처 지도 앱 「디저트맵」을 1인 개발해 App Store·Google Play 출시 (PRJ-04)",
      "매장 운영 앱 「만월체크」의 식자재몰(결제·배송·환불)·레시피(재료 구매 연결) 개발, 사장님 커뮤니티 신설과 기존 화면 UI/UX 리팩터링 담당 (PRJ-05)",
    ],
  },
  {
    org: "삼성현역사문화관",
    program: "연구원 · Researcher",
    period: "2025.03 — 2025.12",
    location: "경산, 대한민국",
    bullets: [
      "유물 데이터셋 관리 및 분석, 역사 기록·전시 자료 컬렉션 데이터베이스 구축 및 유지보수",
      "관내 소프트웨어 시스템 및 내부 디지털 인프라 운영·관리",
      "전시 해설 문안, 소셜 미디어 콘텐츠 등 대외 공개 자료 작성",
    ],
  },
];

export type Award = {
  title: string;
  event: string;
  org: string;
  period: string;
  bullets: string[];
  media: Media[];
};

export const awards: Award[] = [
  {
    title: "Rising Star Award",
    event: "2025 Hackathon by 42 in Asia",
    org: "CDG · 42 Gyeongsan",
    period: "2025.11",
    bullets: [
      "복잡한 다국어 행정 문서를 디지털화하는 지능형 문서 처리(IDP) 시스템 개발",
      "PaddleOCR-VL(OCR) · XLM-RoBERTa(분류) · Ollama(요약)를 연결한 모듈형 AI 에이전트 파이프라인 설계",
      "전체 시스템을 Docker로 컨테이너화해 빠르게 배포",
    ],
    media: [
      {
        type: "image",
        src: "/media/asia-hackathon.webp",
        alt: "‘HACKATHON 2025 BY 42 IN ASIA’ 무대 앞에서 팀원들과 함께 42 아시아해커톤 현수막을 들고 찍은 단체 사진",
        caption: "2025 Hackathon by 42 in Asia · 방콕 — 팀 단체 사진",
      },
    ],
  },
  {
    title: "대상 (Grand Prize)",
    event: "ESG 리빙랩 매칭 해커톤",
    org: "교육부",
    period: "2024.12",
    bullets: [
      "광고대행사 ‘텀즈원’과 협업한 팀 프로젝트를 리드하고, 컨셉부터 최종 발표까지 주도",
      "ESG 중심 사내 소프트웨어 시스템의 전체 구조와 업무 흐름 설계",
      "협업 기업의 요구사항에 맞춰 최종 제안 내용을 조율",
    ],
    media: [
      {
        type: "image",
        src: "/media/esg-hackathon.webp",
        alt: "ESG 리빙랩 매칭데이 행사장에서 ‘대상’이라고 적힌 상장 패널을 들고 서 있는 모습",
        caption: "ESG 리빙랩 매칭데이 — 대상 수상",
        portrait: true,
      },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI & ML",
    items: [
      "LLM Fine-tuning (LoRA SFT)",
      "Knowledge Distillation",
      "vLLM",
      "Qwen",
      "PyTorch",
      "XGBoost",
      "LightGBM",
      "TabPFN",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Time-Series Forecasting",
      "RAG",
    ],
  },
  {
    group: "MLOps & Data",
    items: [
      "Prometheus",
      "Grafana",
      "BigQuery",
      "Cloud Run Jobs",
      "Firestore",
      "Feast",
      "TimescaleDB",
      "Redis",
      "Walk-forward Validation",
      "Holdout / A/B",
    ],
  },
  { group: "Languages", items: ["Python", "C", "C++", "TypeScript", "Shell Script", "OCaml"] },
  {
    group: "Embedded",
    items: [
      "Yocto / BitBake",
      "Xen Hypervisor",
      "Embedded Linux",
      "RTOS",
      "CAN Bus",
      "Raspberry Pi 4",
    ],
  },
  {
    group: "Software & Infra",
    items: [
      "Linux",
      "Git",
      "Docker",
      "Docker Compose",
      "Kubernetes (K3s / K3d)",
      "Argo CD",
      "Vagrant",
      "NGINX",
      "Qt / QML",
      "OpenGL",
    ],
  },
];

export type Education = { school: string; detail: string; period: string };

export const education: Education[] = [
  {
    school: "한국방송통신대학교 PRIME College",
    detail: "인공지능 전공 (B.S.)",
    period: "2026.03 — 현재",
  },
  {
    school: "42 Wolfsburg — SEA:ME",
    detail: "Automotive Embedded AI · 폭스바겐코리아 후원",
    period: "2026.01 — 현재",
  },
  {
    school: "42 Gyeongsan — Common Core",
    detail: "C, C++, Unix, 알고리즘, 시스템 프로그래밍",
    period: "2024.01 — 2026.01",
  },
  { school: "영남대학교", detail: "역사학 전공 (B.A.)", period: "2018.03 — 2024.02" },
];

export const about = [
  "저는 데이터를 모델로, 모델을 매일 돌아가는 서비스로 만드는 AI 엔지니어입니다. 역사학을 전공한 뒤 소프트웨어 엔지니어링으로 진로를 전환했고, 42 Gyeongsan과 42 Wolfsburg에서 C/C++·Linux 시스템 프로그래밍을 기반으로 개발 역량을 길렀습니다. 지금은 한국방송통신대학교에서 인공지능을 전공하고 있습니다.",
  "회사에서는 두 개의 AI 시스템을 설계부터 운영까지 직접 만들었습니다. 하나는 SNS·블로그 글에서 새 디저트 이름을 찾아 유행 조짐을 판정하는 트렌드 레이더로, 상용 대형 모델의 라벨로 Qwen3-4B를 증류해 30B 범용 모델보다 정확하면서 외부 API 비용 없이 사내 GPU에서 돌아가게 했습니다. 다른 하나는 매장별 재구매 시점을 예측해 앱 알림으로 연결하는 시스템으로, XGBoost와 알림 규칙을 Cloud Run 배치로 운영하고 있습니다.",
  "두 프로젝트에서 가장 크게 배운 것은 '모델이 좋아졌다'를 감이 아니라 숫자로 증명하는 법입니다. 평가셋을 먼저 고정하고, 미래 데이터가 섞이지 않게 시간 순으로 검증하고, 홀드아웃으로 모델이 스스로를 평가하는 자기확증을 막았습니다. 더 복잡한 모델이 일부 집단에서 이겨도 전체에서 차이가 없으면 운영 비용이 낮은 쪽을 택했고, 실패한 실험도 수치와 함께 기록으로 남겼습니다.",
  "42와 독일에서 다룬 운영체제·임베디드·인프라 경험은 지금도 바탕이 됩니다. Xen·Yocto 기반 차량 콕핏, Kubernetes 위의 아우토반 트럭 주차 예측 서비스를 거치며 개별 기능보다 전체 시스템이 안정적으로 연결되는 것이 중요하다는 점을 배웠고, 그 관점으로 모델 서빙·관측·데이터 품질까지 함께 챙기고 있습니다.",
];

export const sections = [
  { id: "projects", index: "01", title: "Projects", ko: "프로젝트" },
  { id: "experience", index: "02", title: "Experience", ko: "경력" },
  { id: "skills", index: "03", title: "Skills", ko: "기술" },
  { id: "awards", index: "04", title: "Awards", ko: "수상" },
  { id: "curriculum", index: "05", title: "42 Cursus", ko: "42 과제" },
  { id: "education", index: "06", title: "Education", ko: "학력" },
  { id: "about", index: "07", title: "About", ko: "소개" },
  { id: "contact", index: "08", title: "Contact", ko: "연락처" },
] as const;

/* --- 영문 이력서 (/cv → public/CV_Hyunjun.pdf, `npm run pdf` 로 생성) ------ */

export type CvEntry = {
  title: string;
  sub?: string;
  period: string;
  bullets?: string[];
};

export const cv = {
  name: "Hyunjun Ahn",
  role: "AI / ML Engineer",
  contact: ["ahnhj99999@gmail.com", "+82 10-2553-3735", "Suwon, South Korea"],
  links: [
    { label: "github.com/hyunahn1", href: "https://github.com/hyunahn1" },
    {
      label: "linkedin.com/in/hyunjun-ahn",
      href: "https://www.linkedin.com/in/hyunjun-ahn-35659b305/",
    },
    { label: "velog.io/@hyunahn1", href: "https://velog.io/@hyunahn1" },
    { label: "hyunjun-portfolio-ten.vercel.app", href: "https://hyunjun-portfolio-ten.vercel.app" },
  ],
  photo: "/media/profile.jpg",
  summary:
    "AI engineer who takes models from raw data to systems that run every day. I designed, trained, and operate two production AI systems end to end: an F&B trend radar built on a distilled 4B LLM that outperforms a 30B general model at zero external API cost, and a reorder forecasting service that drives in-app restock alerts. I treat evaluation as the core of the work — frozen eval sets, time-ordered validation, and holdouts so that every \"it got better\" is a number, not a feeling. My foundation is C/C++ and Linux systems programming from the 42 curriculum, which shapes how I approach serving, observability, and data quality.",
  experience: [
    {
      title: "Manwol · AI Engineer",
      sub: "B2B food-service e-commerce for cafés and bakeries · Suwon, South Korea",
      period: "Sep 2026 – Present",
      bullets: [
        "Own the company's in-house AI systems from data collection and model training to serving, dashboards, and daily operation",
        "Shipped two production AI systems (Trend Radar, Reorder Forecasting — see Projects), both running unattended every day",
        "Built and launched Dessert Map, a Flutter map app for trending desserts, on the App Store and Google Play as a solo developer",
        "Built the in-app grocery mall and recipe features of the Manwol Check store-operations app, launched its owner community, and led UI/UX refactoring",
      ],
    },
    {
      title: "Samseonghyeon History and Culture Museum · Researcher",
      sub: "Gyeongsan, South Korea",
      period: "Mar 2025 – Dec 2025",
      bullets: [
        "Managed and analyzed artifact datasets; organized and maintained collection databases for historical records and exhibition documentation",
      ],
    },
  ] as CvEntry[],
  projects: [
    {
      title: "Trend Radar — Early Detection of Emerging F&B Trends · Manwol",
      sub: "Python, Qwen3-4B, LoRA SFT, Knowledge Distillation, vLLM, scikit-learn, Prometheus, Grafana",
      period: "2026 – Present",
      bullets: [
        "Built a daily pipeline that reads ~150K posts from 6 sources (Naver blog/café, Instagram, YouTube in ko/en/ja/zh, communities), extracts newly appearing food names with a local LLM, and tracks their search curves to flag trends before they go mainstream",
        "Distilled Qwen3-4B from teacher-model labels with rationales (Distilling Step-by-Step, LoRA SFT); the 7.5× smaller model beats a 30B general model on all 6 judgment attributes (food F1 0.905 → 0.947, café-fit F1 0.846 → 0.942) and lifts extraction F1 0.654 → 0.747",
        "Serves 4 vLLM containers on demand on an in-house GPU at zero external LLM API cost; captures 98% of names mentioned in 5+ posts and registered 27 of 28 real trends in the gold set",
        "Trend classifier on search-curve features reaches AUC 0.839 on a time-based holdout (growth-rate rule: 0.656); added source-span grounding, alias validation, and daily anomaly checks after tracing a 25× search-volume inflation to a bad alias",
      ],
    },
    {
      title: "Reorder Forecasting — Predicting When Stores Buy Again · Manwol",
      sub: "Python, XGBoost, TabPFN, Pandas, BigQuery, Cloud Run Jobs, Firestore, Cloud Functions, Grafana",
      period: "2026 – Present",
      bullets: [
        "Predicts per store × item reorder date and quantity so the app can push restock alerts and pre-filled carts; runs daily as a Cloud Run Job → Firestore → Cloud Functions pipeline",
        "XGBoost cut reorder-date MAE by 34% (8.44 → 5.56 days) under 12-fold monthly walk-forward validation with all features recomputed as of prediction time to prevent leakage",
        "Re-framed the target from date error to late-alert rate after error analysis; a ratchet correction cut repeat misses 2.5% → 1.0% across 22,311 reorders, and a 5% no-alert holdout guards against self-confirming evaluation",
        "Built a cadence-type multi-agent router (TabPFN / quantile XGBoost) but kept the simpler model in production when the overall gain was under 0.4 pp — runtime 20s → 3.6s and PyTorch dropped from the image",
      ],
    },
    {
      title: "Dessert Map — Store Finder App for Trending Desserts · Manwol",
      sub: "Flutter, Python, Firebase Functions, Firestore, FastAPI, PostgreSQL, Naver / Kakao APIs",
      period: "2026 – Present",
      bullets: [
        "Solo-built and shipped an iOS / Android app that maps where trending desserts are sold; a daily collector across 17 provinces creates stores only from verified place results and confirms sales with 2+ matching posts, removing false positives from name guessing",
        "Expanded to several dessert categories (up to 251 stores each) with crowd reports gated by 3+ distinct users and an admin review console",
      ],
    },
    {
      title: "Manwol Check — In-app B2B Grocery Mall, Recipes & Community · Manwol",
      sub: "Flutter, Firebase Cloud Functions, Cloud SQL (PostgreSQL), Firestore, Toss Payments, Remote Config",
      period: "2026 – Present",
      bullets: [
        "Built in-app B2B ordering on top of an external store builder with no order-creation API: synced products / members via Cloud Functions, kept app orders in a PostgreSQL ledger feeding fulfillment, and implemented Toss payments, saved-card one-tap checkout, shipping-fee rules, self-cancel vs. return flows, and encrypted refund accounts",
        "Linked recipes to the mall — \"buy ingredients\" sheet and a \"makes about N servings\" estimate parsed from pack sizes (60g×10, 1kg ×3) with g↔ml conversion — and auto-filled smart carts at the reorder model's alert time",
        "Launched an owner community (channels, search, DMs, reporting / blocking, moderation dashboard) and refactored screens onto the SEED design system",
      ],
    },
    {
      title: "Autobahn Truck Parking Availability Prediction · Applied Deep Learning",
      sub: "Python, PyTorch, LightGBM, Kubernetes, TimescaleDB, Feast, Redis, Grafana, Flutter",
      period: "2026 – Present",
      bullets: [
        "Forecasting rest-area parking availability from ~160K Toll Collect SID records (LightGBM and deep models vs. a seasonal baseline), served on Kubernetes with TimescaleDB, Feast, Redis, and Grafana MAE monitoring",
      ],
    },
    {
      title: "Integrated Digital Cockpit · SEA:ME Capstone",
      sub: "Xen Hypervisor, Yocto / BitBake, Raspberry Pi 4, Qt / QML, CAN Bus",
      period: "2026",
      bullets: [
        "Built a mixed-criticality cockpit on a Raspberry Pi 4 with Xen Dom0 / DomU separation, integrating a digital cluster, Qt head unit, and ultrasonic parking distance control into a custom Yocto image, validated on an RC car",
      ],
    },
  ] as CvEntry[],
  skills: [
    {
      group: "AI / ML",
      items:
        "LLM fine-tuning (LoRA SFT), knowledge distillation, vLLM, PyTorch, XGBoost, LightGBM, TabPFN, scikit-learn, Pandas, NumPy, time-series forecasting",
    },
    {
      group: "MLOps & Data",
      items:
        "Walk-forward validation, holdout / A/B design, Prometheus, Grafana, BigQuery, Cloud Run, Firestore, Feast, TimescaleDB, Redis, Docker, Kubernetes",
    },
    { group: "Languages", items: "Python, C, C++, TypeScript, Shell Script, OCaml" },
    { group: "Systems", items: "Linux, Yocto / BitBake, Xen Hypervisor, CAN Bus, Qt / QML, Argo CD, NGINX" },
  ],
  education: [
    {
      title: "Korea National Open University – PRIME College",
      sub: "B.S. in Artificial Intelligence",
      period: "Mar 2026 – Present",
    },
    {
      title: "42 Wolfsburg – SEA:ME Program",
      sub: "Automotive Embedded AI · Sponsored by Volkswagen Korea",
      period: "Jan 2026 – Present",
    },
    {
      title: "42 Gyeongsan Common Core",
      sub: "C, C++, Unix, algorithms, systems programming",
      period: "Jan 2024 – Jan 2026",
    },
    { title: "Yeungnam University", sub: "B.A. in History", period: "Mar 2018 – Feb 2024" },
  ] as CvEntry[],
  awards: [
    {
      title: "Rising Star Award · 2025 Hackathon by 42 in Asia",
      sub: "CDG · 42 Gyeongsan",
      period: "Nov 2025",
      bullets: [
        "Built an intelligent document processing pipeline for multilingual government documents: PaddleOCR-VL (OCR), XLM-RoBERTa (classification), Ollama (summarization), containerized with Docker",
      ],
    },
    {
      title: "Grand Prize · ESG Living Lab Matching Hackathon",
      sub: "Ministry of Education, Republic of Korea",
      period: "Dec 2024",
      bullets: [
        "Led a team with advertising agency ‘Terms One’ from concept to final presentation, architecting an ESG-focused internal software system",
      ],
    },
  ] as CvEntry[],
};
