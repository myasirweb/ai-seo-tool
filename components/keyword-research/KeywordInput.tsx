"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface KeywordInputProps {
  onSubmit: (topic: string) => void;
  loading: boolean;
}

export default function KeywordInput({ onSubmit, loading }: KeywordInputProps) {
  const [topic, setTopic] = useState("");

  function handleSubmit() {
    const trimmed = topic.trim();
    if (trimmed) onSubmit(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input
          placeholder="e.g. content marketing for startups"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          aria-label="Research topic"
        />
      </div>
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!topic.trim() || loading}
        size="md"
      >
        Research
      </Button>
    </div>
  );
}
