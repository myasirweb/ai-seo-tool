"use client"

import { BlogTitleItem } from "@/types/blogTitle"
import CopyButton from "@/components/ui/CopyButton"

interface TitleResultsProps {
  titles: BlogTitleItem[]
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "how-to": { bg: "bg-blue-50", text: "text-blue-700" },
  "listicle": { bg: "bg-green-50", text: "text-green-700" },
  "question": { bg: "bg-purple-50", text: "text-purple-700" },
  "ultimate-guide": { bg: "bg-yellow-50", text: "text-yellow-700" },
  "case-study": { bg: "bg-orange-50", text: "text-orange-700" },
  "news": { bg: "bg-red-50", text: "text-red-700" },
  "comparison": { bg: "bg-pink-50", text: "text-pink-700" },
}

export default function TitleResults({ titles }: TitleResultsProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        {titles.length} Title Ideas Generated
      </p>
      {titles.map((item, index) => {
        const colors = TYPE_COLORS[item.type] || { bg: "bg-gray-50", text: "text-gray-700" }
        return (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-400">
                    #{index + 1}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${colors.bg} ${colors.text}`}
                  >
                    {item.type.replace("-", " ")}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.title.length} chars
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1.5">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.reason}
                </p>
              </div>
              <CopyButton text={item.title} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
