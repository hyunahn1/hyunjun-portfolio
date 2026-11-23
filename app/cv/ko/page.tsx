import type { Metadata } from "next";
import { CvDocument } from "@/components/cv-document";
import { cvKo } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "안현준 이력서",
  robots: { index: false, follow: false },
};

export default function CvKoPage() {
  return <CvDocument cv={cvKo} />;
}
