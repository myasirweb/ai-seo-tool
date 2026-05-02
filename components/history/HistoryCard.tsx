"use client"

import { Trash2, Search, FileText, BarChart2, BookOpen, Type } from "lucide-react"

interface HistoryCardProps {
  item: {
    _id: string
    collection: string
    toolName: string
    createdAt: string
    topic?: string
    keyword?: string
    targetKeyword?: string
    score?: number
    fleschScore?: number
    contentSnippet?: string
  }
  onDelete: (id: string, collection: string) => void
}

const TOOL_ICONS: Record<string, React.ReactNode> = {
  keyword_results: <Search size={14} />,
  meta_results: <FileText size={14} />,
  content_score_results: <BarChart2 size={14} />,
  readability_results: <BookOpen size={14} />,
  blog_title_results: <Type size={14} />,
}

const TOOL_COLORS: Record<string, string> = {
  keyword_results: "bg-blue-50 text-blue-600",
  meta_results: "bg-green-50 text-green-600",
  content_score_results: "bg-yellow-50 text-yellow-600",
  readability_results: "bg-purple-50 text-purple-600",
  blog_title_results: "bg-pink-50 text-pink-600",
}

function getPreviewText(item: HistoryCardProps["item"]): string {
  if (item.topic) return item.topic
  if (item.keyword) return item.keyword
  if (item.targetKeyword) return item.targetKeyword
  if (item.contentSnippet) return item.contentSnippet.slice(0, 60) + "..."
  return "—"
}

function getMetaText(item: HistoryCardProps["item"]): string {
  if (item.score !== undefined) return `Score: ${item.score}/100`
  if (item.fleschScore !== undefined) return `Flesch: ${item.fleschScore}`
  return ""
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

export default function HistoryCard({ item, onDelete }: HistoryCardProps) {
  const colorClass = TOOL_COLORS[item.collection] || "bg-gray-50 text-gray-600"
  const icon = TOOL_ICONS[item.collection]
  const meta = getMetaText(item)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {getPreviewText(item)}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-400">{item.toolName}</span>
            {meta && (
              <>
                <span className="text-xs text-gray-300">·</span>
                <span className="text-xs font-semibold text-[#1D9E75]">{meta}</span>
              </>
            )}
            <span className="text-xs text-gray-300">·</span>
            <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(item._id, item.collection)}
        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
        title="Delete this item"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
