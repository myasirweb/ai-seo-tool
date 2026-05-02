"use client";

import type { MetaVariant } from "@/types/meta";
import CopyButton from "@/components/ui/CopyButton";

interface MetaPreviewProps {
  variant: MetaVariant;
  index: number;
}

function CharCount({ value, max }: { value: number; max: number }) {
  const over = value > max;
  return (
    <span className={over ? "text-red-500" : "text-[#1D9E75]"}>
      {value}/{max}
    </span>
  );
}

export default function MetaPreview({ variant, index }: MetaPreviewProps) {
  const copyText = `Title: ${variant.title}\nDescription: ${variant.description}`;

  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Variant {index + 1}
        </span>
        <CopyButton text={copyText} />
      </div>

      {/* SERP preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 space-y-0.5">
        <p className="text-[#1a0dab] text-sm md:text-base font-medium leading-snug truncate">
          {variant.title}
        </p>
        <p className="text-[#006621] text-xs">
          yourwebsite.com &rsaquo; blog &rsaquo; article-slug
        </p>
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2">
          {variant.description}
        </p>
      </div>

      {/* Character counters */}
      <div className="flex gap-6 text-xs text-gray-400">
        <span>
          Title: <CharCount value={variant.title.length} max={60} />
        </span>
        <span>
          Description: <CharCount value={variant.description.length} max={160} />
        </span>
      </div>
    </div>
  );
}
