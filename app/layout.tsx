import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const suit = localFont({
  src: "./fonts/SUIT-Variable.woff2",
  variable: "--font-suit",
  weight: "100 900",
  display: "swap",
});

const paperlogy = localFont({
  src: [
    { path: "./fonts/Paperlogy-7Bold.woff2", weight: "700" },
    { path: "./fonts/Paperlogy-8ExtraBold.woff2", weight: "800" },
  ],
  variable: "--font-paperlogy",
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
    <html lang="ko" className={`${suit.variable} ${paperlogy.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
