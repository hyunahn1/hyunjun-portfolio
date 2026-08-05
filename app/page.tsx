export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-zinc-900">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold text-blue-600">
          SYSTEM &amp; EMBEDDED SOFTWARE ENGINEER
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          안녕하세요.
          <br />
          개발자 안현준입니다.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
          C/C++, Linux 및 임베디드 시스템을 중심으로 학습하고 있습니다. 자동차
          소프트웨어와 AI 프로젝트를 통해 실제 환경에서 동작하는 시스템을
          개발해 왔습니다.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://github.com/hyunahn1"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-zinc-900 px-5 py-3 text-white transition hover:bg-zinc-700"
          >
            GitHub
          </a>

          <a
            href="mailto:ahnhj99999@gmail.com"
            className="rounded-lg border border-zinc-300 px-5 py-3 transition hover:bg-zinc-50"
          >
            Email
          </a>
        </div>
      </div>
    </main>
  );
}
