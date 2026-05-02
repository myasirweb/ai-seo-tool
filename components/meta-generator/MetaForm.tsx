"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface MetaFormProps {
  onSubmit: (topic: string, keyword: string, tone?: string) => void;
  loading: boolean;
}

const TONES = ["Professional", "Friendly", "Urgent", "Curiosity"] as const;

export default function MetaForm({ onSubmit, loading }: MetaFormProps) {
  const [topic, setTopic]     = useState("");
  const [keyword, setKeyword] = useState("");
  const [tone, setTone]       = useState<string>("");

  function handleSubmit() {
    const t = topic.trim();
    const k = keyword.trim();
    if (t && k) onSubmit(t, k, tone || undefined);
  }

  const canSubmit = topic.trim() !== "" && keyword.trim() !== "" && !loading;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Page topic"
          placeholder="e.g. Best productivity apps 2025"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={loading}
        />
        <Input
          label="Target keyword"
          placeholder="e.g. productivity apps"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex flex-col gap-1.5 w-full sm:w-48">
          <label className="text-sm font-medium text-gray-700">Tone (optional)</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            disabled={loading}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D9E75] transition-colors duration-150 bg-white text-gray-700 disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Professional</option>
            {TONES.map((t) => (
              <option key={t} value={t.toLowerCase()}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!canSubmit}
          size="md"
        >
          Generate Variants
        </Button>
      </div>
    </div>
  );
}
