"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToastContext } from "@/context/ToastContext";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastContext();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("Copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access denied — silently ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-1"
    >
      {copied ? <Check size={15} className="text-[#1D9E75]" /> : <Copy size={15} />}
    </button>
  );
}
