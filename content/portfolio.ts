/**
 * 포트폴리오의 모든 텍스트는 이 파일에만 있습니다.
 * 내용을 고치고 싶으면 이 파일만 수정하면 됩니다.
 *
 * 내용 기준: CV_Hyunjun.pdf (public/CV_Hyunjun.pdf 로도 배포됨)
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hyunjun-ahn-35659b305/" },
  { label: "Blog", href: "https://velog.io/@hyunahn1" },
  { label: "Resume PDF", href: "/CV_Hyunjun.pdf" },
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
    code: "PRJ-02",
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
          "독일 Toll Collect SID 통행 데이터 수집 및 전처리",
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
    code: "PRJ-03",
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
    code: "PRJ-04",
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
  {
    code: "PRJ-05",
    org: "42 Gyeongsan · Common Core",
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
    stack: ["C", "C++", "Linux", "pthread", "Socket", "Makefile", "gdb", "valgrind"],
    media: [],
    repo: "https://github.com/hyunahn1",
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
  { group: "Languages", items: ["C", "C++", "Python", "Shell Script", "OCaml"] },
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
  {
    group: "AI & Data",
    items: [
      "PyTorch",
      "TensorFlow",
      "LightGBM",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Time-Series Forecasting",
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
  "역사학을 전공하며 자료를 분석하고 맥락을 구조화하는 훈련을 받았습니다. 이후 아이디어를 실제로 동작하는 시스템으로 구현하고 싶어 소프트웨어 개발로 진로를 전환했습니다.",
  "42 교육과정에서 C/C++와 시스템 프로그래밍을 학습했고, 현재 독일에서 자동차 임베디드 및 AI 프로젝트를 수행하고 있습니다. 화면 위에서만 끝나지 않고 하드웨어와 실제 데이터에 맞닿는 소프트웨어에 관심이 있습니다.",
  "문제를 먼저 좁게 정의하고, 가장 단순한 방법으로 동작을 확인한 뒤 개선하는 방식으로 일합니다. 모르는 것은 추측하지 않고 로그와 측정으로 확인하려고 합니다.",
];

export const sections = [
  { id: "projects", index: "01", title: "Projects", ko: "프로젝트" },
  { id: "awards", index: "02", title: "Awards", ko: "수상" },
  { id: "experience", index: "03", title: "Experience", ko: "경력" },
  { id: "skills", index: "04", title: "Skills", ko: "기술" },
  { id: "education", index: "05", title: "Education", ko: "학력" },
  { id: "about", index: "06", title: "About", ko: "소개" },
  { id: "contact", index: "07", title: "Contact", ko: "연락처" },
] as const;
