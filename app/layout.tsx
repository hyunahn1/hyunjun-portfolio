import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const wantedSans = localFont({
  src: "./fonts/WantedSansVariable.woff2",
  variable: "--font-wanted-sans",
  weight: "400 1000",
  display: "swap",
});

const description =
  "역사학을 전공하고 42에서 시스템 프로그래밍을 공부한 AI 엔지니어 안현준의 포트폴리오입니다.";

export const metadata: Metadata = {
  title: "안현준 | AI / ML Engineer",
  description,
  openGraph: {
    title: "안현준 | AI / ML Engineer",
    description,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${wantedSans.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
