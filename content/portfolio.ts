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
        desc: "NGINX·WordPress·MariaDB를 각각의 컨테이너로 분리하고, 이미지를 베이스부터 직접 작성해 Docker Compose로 묶었습니다. (PRJ-03)",
        learned: ["Docker", "Compose", "NGINX", "TLS", "Docker secrets"],
      },
      {
        name: "Inception-of-Things",
        ko: "쿠버네티스 GitOps",
        desc: "Vagrant로 K3s 클러스터를 프로비저닝하고, Argo CD로 Git 저장소와 클러스터 상태를 동기화하는 배포 파이프라인을 구성했습니다. (PRJ-04)",
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
  "저는 C/C++와 Linux를 기반으로 운영체제, 임베디드 시스템, 통신 및 서비스 통합 경험을 쌓아온 개발자입니다. 역사학을 전공한 뒤 소프트웨어 엔지니어링으로 진로를 전환했고, 42 Gyeongsan과 42 Wolfsburg에서 정답이 정해져 있지 않은 프로젝트를 직접 분석하고 구현하며 개발 역량을 길렀습니다.",
  "42 교육과정에서는 C/C++를 활용해 프로세스, 스레드, 메모리 관리, 동기화, 소켓 통신 등 시스템 프로그래밍의 기초를 학습했습니다. 단순히 기능을 구현하는 데 그치지 않고, 실행 흐름과 자원 사용을 추적하며 문제의 원인을 분석하는 습관을 갖게 되었습니다. 또한 동료 평가와 코드 리뷰를 통해 다른 사람이 이해하고 유지보수할 수 있는 코드를 작성하는 중요성을 배웠습니다.",
  "독일에서는 자동차 임베디드 프로젝트를 수행하며 Raspberry Pi 기반 환경에 Xen 하이퍼바이저와 Yocto Linux를 구성하고, Qt/QML 기반의 헤드 유닛과 디지털 클러스터, CAN 통신 및 센서 기능을 통합했습니다. 이 경험을 통해 소프트웨어가 실제 하드웨어와 연결될 때 발생하는 제약과 구성요소 간 통신의 중요성을 이해했습니다.",
  "또한 약 16만 건의 데이터를 활용한 아우토반 트럭 주차공간 예측 서비스를 팀으로 개발했습니다. 모델 개발뿐 아니라 백엔드와 클라우드 환경의 연동, 데이터 흐름과 서비스 구조를 함께 고민했습니다. 이 과정에서 개별 기능보다 전체 시스템이 안정적으로 연결되고 사용되는 것이 중요하다는 점을 배웠습니다.",
];

export const sections = [
  { id: "projects", index: "01", title: "Projects", ko: "프로젝트" },
  { id: "curriculum", index: "02", title: "42 Cursus", ko: "42 과제" },
  { id: "awards", index: "03", title: "Awards", ko: "수상" },
  { id: "experience", index: "04", title: "Experience", ko: "경력" },
  { id: "skills", index: "05", title: "Skills", ko: "기술" },
  { id: "education", index: "06", title: "Education", ko: "학력" },
  { id: "about", index: "07", title: "About", ko: "소개" },
  { id: "contact", index: "08", title: "Contact", ko: "연락처" },
] as const;
