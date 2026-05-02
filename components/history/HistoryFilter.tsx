"use client"

import { HistoryFilter } from "@/hooks/useHistory"

interface HistoryFilterProps {
  activeFilter: HistoryFilter
  onFilterChange: (filter: HistoryFilter) => void
  counts: Record<string, number>
}

const FILTERS: { key: HistoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "keywords", label: "Keywords" },
  { key: "meta", label: "Meta" },
  { key: "contentScores", label: "Content Score" },
  { key: "readability", label: "Readability" },
  { key: "blogTitles", label: "Blog Titles" },
]

export default function HistoryFilterTabs({
  activeFilter,
  onFilterChange,
  counts,
}: HistoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === key
              ? "bg-[#1D9E75] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {label}
          {counts[key] !== undefined && (
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
              activeFilter === key ? "bg-white/20" : "bg-gray-200"
            }`}>
              {counts[key]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
