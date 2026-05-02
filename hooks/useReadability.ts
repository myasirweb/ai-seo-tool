import { useState } from "react";
import type { ReadabilityResponse } from "@/types/readability";

type SuccessResult = Extract<ReadabilityResponse, { fleschScore: number }>;

interface UseReadabilityReturn {
  result: SuccessResult | null;
  loading: boolean;
  error: string;
  fetchReadability: (content: string) => Promise<void>;
  reset: () => void;
}

export function useReadability(): UseReadabilityReturn {
  const [result, setResult] = useState<SuccessResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setResult(null);
    setLoading(false);
    setError("");
  }

  async function fetchReadability(content: string): Promise<void> {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/readability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data: ReadabilityResponse = await res.json();

      if (!res.ok || "error" in data) {
        setError("error" in data ? data.error : "Failed to analyze readability. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, fetchReadability, reset };
}
