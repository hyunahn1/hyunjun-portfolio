import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "안현준 | System & Embedded Software Engineer",
  description:
    "C/C++와 Linux를 중심으로 임베디드 시스템과 자동차 소프트웨어를 개발하는 안현준의 포트폴리오입니다.",
  openGraph: {
    title: "안현준 | System & Embedded Software Engineer",
    description:
      "C/C++와 Linux를 중심으로 임베디드 시스템과 자동차 소프트웨어를 개발하는 안현준의 포트폴리오입니다.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${plexMono.variable} h-full antialiased`}>
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
