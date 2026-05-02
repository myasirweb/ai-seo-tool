import type { Metadata } from "next";
import KeywordResearchView from "./KeywordResearchView";

export const metadata: Metadata = {
  title: "Keyword Research Tool",
  description: "Generate 10 AI-powered keyword suggestions with search intent and difficulty ratings.",
};

export default function KeywordResearchPage() {
  return <KeywordResearchView />;
}
