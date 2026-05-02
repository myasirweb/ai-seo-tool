import { useState } from "react";
import type { KeywordItem } from "@/types/keyword";

interface UseKeywordsReturn {
  keywords: KeywordItem[];
  loading: boolean;
  error: string;
  fetchKeywords: (topic: string) => Promise<void>;
  reset: () => void;
}

export function useKeywords(): UseKeywordsReturn {
  const [keywords, setKeywords] = useState<KeywordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setKeywords([]);
    setLoading(false);
    setError("");
  }

  async function fetchKeywords(topic: string): Promise<void> {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data: { keywords?: KeywordItem[]; error?: string } = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Failed to fetch keywords. Please try again.");
        return;
      }

      setKeywords(data.keywords ?? []);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return { keywords, loading, error, fetchKeywords, reset };
}
