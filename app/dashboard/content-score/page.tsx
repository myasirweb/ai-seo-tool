import type { Metadata } from "next";
import ContentScoreView from "./ContentScoreView";

export const metadata: Metadata = {
  title: "Content Score Analyzer",
  description: "Get a 100-point SEO score for your content with category breakdown and improvement tips.",
};

export default function ContentScorePage() {
  return <ContentScoreView />;
}
