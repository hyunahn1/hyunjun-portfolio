/**
 * 포트폴리오의 모든 텍스트는 이 파일에만 있습니다.
 * 내용을 고치고 싶으면 이 파일만 수정하면 됩니다.
 *
 * TODO 로 표시된 곳은 현준 님이 직접 채워야 하는 값입니다.
 */

export const profile = {
  name: "안현준",
  nameEn: "Ahn Hyunjun",
  role: "System & Embedded Software Engineer",
  headline: ["안녕하세요.", "실제 환경에서 동작하는", "시스템을 만드는 개발자입니다."],
  intro:
    "C/C++, Linux 및 임베디드 시스템을 중심으로 학습하고 있습니다. 42 Gyeongsan과 42 Wolfsburg에서 시스템 프로그래밍과 자동차 소프트웨어 프로젝트를 수행했으며, 운영체제·통신·AI를 실제 서비스와 연결하는 엔지니어를 목표로 하고 있습니다.",
  availability: [
    { label: "Location", value: "독일 볼프스부르크 (한국 근무 가능)" },
    { label: "Language", value: "한국어 / 영어 협업 가능" },
  ],
};

export type Link = { label: string; href: string };

export const links: Link[] = [
  { label: "Email", href: "mailto:ahnhj99999@gmail.com" },
  { label: "GitHub", href: "https://github.com/hyunahn1" },
  // TODO: 본인 LinkedIn 주소로 교체하세요.
  { label: "LinkedIn", href: "https://www.linkedin.com/in/TODO" },
  // TODO: public/resume.pdf 에 이력서 PDF를 넣으면 이 링크가 동작합니다.
  { label: "Resume PDF", href: "/resume.pdf" },
];

export type SpecRow = { label: string; body: string[] };

export type Project = {
  code: string;
  org: string;
  title: string;
  titleEn: string;
  overview: string;
  spec: SpecRow[];
  stack: string[];
  repo: string | null;
};

export const projects: Project[] = [
  {
    code: "PRJ-01",
    org: "42 Wolfsburg · SEA:ME",
    title: "아우토반 트럭 주차공간 예측 서비스",
    titleEn: "Autobahn Truck Parking Forecast",
    overview:
      "트럭 운전자가 목적지에 도착할 시점의 주차 혼잡도를 예측해 경로 선택을 돕는 서비스입니다.",
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
          "약 16만 건의 주차 데이터 수집 및 분석",
          "LightGBM과 시계열 기반 모델의 예측 성능 비교",
          "예측 모델과 백엔드 API 연동",
          "Kubernetes 기반 서비스 환경 구성 참여",
          "프론트엔드·백엔드·모델 간 데이터 흐름 설계",
          "팀 Git 브랜치 전략 및 코드 리뷰 방식 정립",
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
          "예측 모델을 서비스 API에 연결하고, 사용자의 경로와 예상 도착 시간을 기준으로 주차장 혼잡도를 안내하는 프로토타입을 구현했습니다.",
        ],
      },
    ],
    stack: ["Python", "LightGBM", "FastAPI", "Docker", "Kubernetes", "HERE API"],
    // TODO: 저장소 주소를 넣으면 링크가 표시됩니다.
    repo: null,
  },
  {
    code: "PRJ-02",
    org: "42 Wolfsburg · SEA:ME",
    title: "자동차 임베디드 시스템",
    titleEn: "Automotive Embedded System",
    overview:
      "Raspberry Pi 기반 환경에서 차량 헤드 유닛, 디지털 클러스터, 센서 및 차량 통신 기능을 통합한 자동차 임베디드 프로젝트입니다.",
    spec: [
      {
        label: "Problem",
        body: [
          "실제 차량 소프트웨어는 하나의 애플리케이션이 아니라, 서로 다른 신뢰 수준과 실시간 요구를 가진 여러 시스템이 한 하드웨어 위에서 동작하는 구조입니다. 이 구조를 축소된 환경에서 직접 구성해보는 것이 목표였습니다.",
        ],
      },
      {
        label: "My Role",
        body: [
          "Xen 하이퍼바이저 기반 가상화 환경 구성",
          "Yocto를 활용한 Embedded Linux 이미지 빌드",
          "Qt/QML 기반 디지털 클러스터 HMI 개발",
          "CAN 통신을 통한 차량 데이터 송수신 구현",
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
          "센서 입력에서 CAN 전송, 클러스터 화면 표시까지 이어지는 경로를 하나의 보드 위에서 동작시켰습니다.",
        ],
      },
    ],
    stack: [
      "C++",
      "Embedded Linux",
      "Yocto",
      "Xen Hypervisor",
      "Qt/QML",
      "CAN",
      "Raspberry Pi",
    ],
    repo: null,
  },
  {
    code: "PRJ-03",
    org: "42 Gyeongsan · 42 Network",
    title: "42 시스템 프로그래밍",
    titleEn: "System Programming Projects at 42",
    overview:
      "표준 라이브러리에 의존하지 않고 운영체제 기능을 직접 다루는 C/C++ 프로젝트들입니다. 아래 역량은 개별 과제를 통해 구현하고 동료 평가로 검증했습니다.",
    spec: [
      {
        label: "Selected",
        body: [
          "Minishell — 파서, 프로세스 생성, 파이프, 리다이렉션",
          "Philosophers — 멀티스레딩, 뮤텍스, 데드락 회피",
          "Webserv — HTTP 서버, 소켓, 논블로킹 I/O",
          "Inception — Docker 기반 멀티 컨테이너 인프라",
          "CPP Modules — C++ 객체지향 및 템플릿",
        ],
      },
      {
        label: "Focus",
        body: [
          "프로세스 생성 및 제어, 파일 디스크립터",
          "멀티스레딩과 동기화",
          "수동 메모리 관리 및 누수 추적",
          "소켓 프로그래밍과 Linux 시스템 콜",
          "gdb·valgrind 기반 디버깅",
          "Makefile / CMake 빌드 구성",
        ],
      },
    ],
    stack: ["C", "C++", "Linux", "pthread", "Socket", "Docker", "Makefile", "gdb", "valgrind"],
    repo: "https://github.com/hyunahn1",
  },
];

export type Experience = {
  org: string;
  program: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    org: "42 Wolfsburg / SEA:ME",
    program: "Automotive Software & AI Program",
    period: "2026.01 — 현재",
    bullets: [
      "자동차 임베디드 소프트웨어 프로젝트 수행",
      "C/C++, Linux, Yocto, Xen, Qt/QML 활용",
      "다국적 팀과 영어로 프로젝트 협업",
      "모빌리티 문제 해결을 위한 데이터 기반 서비스 개발",
    ],
  },
  {
    org: "42 Gyeongsan",
    program: "Software Engineering Program",
    period: "2024.01 — 2025.12",
    bullets: [
      "C/C++ 기반 프로젝트 중심 학습",
      "운영체제, 네트워크, 알고리즘, 시스템 프로그래밍",
      "동료 평가 및 코드 리뷰 기반 협업",
    ],
  },
  // TODO: 아래 항목의 기간과 담당 업무를 실제 내용으로 채우거나, 필요 없으면 삭제하세요.
  {
    org: "History & Culture Center",
    program: "TODO — 직무명",
    period: "TODO — 기간",
    bullets: ["TODO — 담당했던 업무를 한 줄씩 적어주세요."],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Core", items: ["C", "C++", "Python", "Linux", "Git"] },
  {
    group: "Embedded & System",
    items: [
      "Embedded Linux",
      "Yocto",
      "Xen Hypervisor",
      "Process / Thread",
      "IPC",
      "Socket Programming",
      "CAN Communication",
    ],
  },
  {
    group: "Application & Infra",
    items: ["Qt/QML", "Docker", "Kubernetes", "FastAPI", "Flutter"],
  },
  {
    group: "AI & Data",
    items: ["LightGBM", "Time-series Forecasting", "Pandas", "Model Evaluation"],
  },
];

export type Education = { school: string; detail: string; period: string };

export const education: Education[] = [
  // TODO: 기간을 실제 값으로 채워주세요.
  { school: "42 Network", detail: "42 Gyeongsan · 42 Wolfsburg", period: "2024.01 — 현재" },
  { school: "한국방송통신대학교", detail: "인공지능 전공", period: "TODO — 기간" },
  { school: "영남대학교", detail: "역사학 전공", period: "TODO — 기간" },
];

export const about = [
  "역사학을 전공하며 자료를 분석하고 맥락을 구조화하는 훈련을 받았습니다. 이후 아이디어를 실제로 동작하는 시스템으로 구현하고 싶어 소프트웨어 개발로 진로를 전환했습니다.",
  "42 교육과정에서 C/C++와 시스템 프로그래밍을 학습했고, 현재 독일에서 자동차 임베디드 및 AI 프로젝트를 수행하고 있습니다. 화면 위에서만 끝나지 않고 하드웨어와 실제 데이터에 맞닿는 소프트웨어에 관심이 있습니다.",
  "문제를 먼저 좁게 정의하고, 가장 단순한 방법으로 동작을 확인한 뒤 개선하는 방식으로 일합니다. 모르는 것은 추측하지 않고 로그와 측정으로 확인하려고 합니다.",
];

export const sections = [
  { id: "projects", index: "01", title: "Projects", ko: "프로젝트" },
  { id: "experience", index: "02", title: "Experience", ko: "경력" },
  { id: "skills", index: "03", title: "Skills", ko: "기술" },
  { id: "education", index: "04", title: "Education", ko: "학력" },
  { id: "about", index: "05", title: "About", ko: "소개" },
  { id: "contact", index: "06", title: "Contact", ko: "연락처" },
] as const;
