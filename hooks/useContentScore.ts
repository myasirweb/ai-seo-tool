import { useState } from "react";
import type { ContentScoreResponse } from "@/types/contentScore";

type SuccessResult = Extract<ContentScoreResponse, { score: number }>;

interface UseContentScoreReturn {
  result: SuccessResult | null;
  loading: boolean;
  error: string;
  fetchScore: (content: string, targetKeyword: string) => Promise<void>;
  reset: () => void;
}

export function useContentScore(): UseContentScoreReturn {
  const [result, setResult] = useState<SuccessResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setResult(null);
    setLoading(false);
    setError("");
  }

  async function fetchScore(content: string, targetKeyword: string): Promise<void> {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/content-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, targetKeyword }),
      });

      const data: ContentScoreResponse = await res.json();

      if (!res.ok || "error" in data) {
        setError("error" in data ? data.error : "Failed to score content. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, fetchScore, reset };
}
