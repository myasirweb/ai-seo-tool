"use client";

import { useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

interface ReadabilityInputProps {
  onSubmit: (content: string) => void;
  loading: boolean;
}

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function countSentences(text: string): number {
  const matches = text.trim().match(/[^.!?]*[.!?]+/g);
  return matches ? matches.length : 0;
}

export default function ReadabilityInput({ onSubmit, loading }: ReadabilityInputProps) {
  const [content, setContent] = useState("");

  function handleSubmit() {
    const trimmed = content.trim();
    if (trimmed) onSubmit(trimmed);
  }

  const words = countWords(content);
  const sentences = countSentences(content);
  const canSubmit = content.trim() !== "" && !loading;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Textarea
          label="Content"
          placeholder="Paste your article, blog post, or any text here to check its readability..."
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <p className="text-xs text-gray-400 self-end">
          {words} {words === 1 ? "word" : "words"} &middot; {sentences}{" "}
          {sentences === 1 ? "sentence" : "sentences"}
        </p>
      </div>

      <div>
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!canSubmit}
          size="md"
        >
          Check Readability
        </Button>
      </div>
    </div>
  );
}
