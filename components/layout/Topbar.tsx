"use client";

import { ChevronRight } from "lucide-react";
import LanguageSelector from "@/components/layout/LanguageSelector";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="flex items-center justify-between h-12 px-6 bg-white border-b border-gray-200 shrink-0">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-400">SEO.AI</span>
        <ChevronRight size={14} className="text-gray-300 shrink-0" />
        <span className="text-gray-700 font-semibold">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSelector />
      </div>
    </header>
  );
}
