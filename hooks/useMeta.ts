import { useState } from "react";
import type { MetaVariant } from "@/types/meta";

interface UseMetaReturn {
  variants: MetaVariant[];
  loading: boolean;
  error: string;
  fetchMeta: (topic: string, targetKeyword: string, tone?: string) => Promise<void>;
  reset: () => void;
}

export function useMeta(): UseMetaReturn {
  const [variants, setVariants] = useState<MetaVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setVariants([]);
    setLoading(false);
    setError("");
  }

  async function fetchMeta(topic: string, targetKeyword: string, tone?: string): Promise<void> {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, targetKeyword, tone }),
      });

      const data: { variants?: MetaVariant[]; error?: string } = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Failed to generate meta tags. Please try again.");
        return;
      }

      setVariants(data.variants ?? []);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return { variants, loading, error, fetchMeta, reset };
}
