"use client";

import { useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ContentInputProps {
  onSubmit: (content: string, keyword: string) => void;
  loading: boolean;
}

function wordCount(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export default function ContentInput({ onSubmit, loading }: ContentInputProps) {
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");

  function handleSubmit() {
    const c = content.trim();
    const k = keyword.trim();
    if (c && k) onSubmit(c, k);
  }

  const canSubmit = content.trim().length >= 50 && keyword.trim() !== "" && !loading;
  const words = wordCount(content);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Textarea
          label="Content"
          placeholder="Paste your article or blog post content here..."
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <p className="text-xs text-gray-400 self-end">
          {words} {words === 1 ? "word" : "words"}
        </p>
      </div>

      <Input
        label="Target keyword"
        placeholder="e.g. content marketing"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={loading}
      />

      <div>
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!canSubmit}
          size="md"
        >
          Analyze Content
        </Button>
        {content.trim().length > 0 && content.trim().length < 50 && (
          <p className="mt-1.5 text-xs text-gray-400">
            Minimum 50 characters required ({content.trim().length}/50)
          </p>
        )}
      </div>
    </div>
  );
}
