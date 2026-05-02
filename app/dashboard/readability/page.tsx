import type { Metadata } from "next";
import ReadabilityView from "./ReadabilityView";

export const metadata: Metadata = {
  title: "Readability Checker",
  description: "Check your content's Flesch-Kincaid readability score and get AI writing suggestions.",
};

export default function ReadabilityPage() {
  return <ReadabilityView />;
}
