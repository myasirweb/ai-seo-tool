"use client";

import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

export default function Textarea({
  label,
  error,
  id,
  rows = 6,
  className = "",
  ...props
}: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={[
          "border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D9E75] w-full transition-colors duration-150 placeholder:text-gray-400 resize-y disabled:bg-gray-50 disabled:cursor-not-allowed",
          error ? "border-red-400 focus:border-red-400" : "",
          className,
        ]
          .join(" ")
          .trim()}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
