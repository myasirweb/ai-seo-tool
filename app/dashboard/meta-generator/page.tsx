import type { Metadata } from "next";
import MetaGeneratorView from "./MetaGeneratorView";

export const metadata: Metadata = {
  title: "Meta Title & Description Generator",
  description: "Generate 3 optimized meta title and description variants with a live Google SERP preview.",
};

export default function MetaGeneratorPage() {
  return <MetaGeneratorView />;
}
