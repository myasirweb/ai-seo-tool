"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D9E75] w-full transition-colors duration-150 placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed",
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
