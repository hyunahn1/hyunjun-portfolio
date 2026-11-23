import type { Metadata } from "next";
import { CvDocument } from "@/components/cv-document";
import { cv } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Hyunjun Ahn — CV",
  robots: { index: false, follow: false },
};

export default function CvPage() {
  return <CvDocument cv={cv} />;
}
