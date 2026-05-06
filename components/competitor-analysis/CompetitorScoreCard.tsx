"use client"
import { CompetitorPageData } from "@/types/competitor"

interface CompetitorScoreCardProps {
  page: CompetitorPageData
  label: string
  isWinner: boolean
}

export default function CompetitorScoreCard({
  page, label, isWinner
}: CompetitorScoreCardProps) {
  const scoreColor = page.score >= 70
    ? "text-green-600" : page.score >= 45
    ? "text-yellow-600" : "text-red-600"

  return (
    <div className={`bg-white rounded-xl border-2 p-5 ${
      isWinner ? "border-[#1D9E75]" : "border-gray-200"
    }`}>
      {isWinner && (
        <div className="inline-flex items-center gap-1 bg-green-50 text-green-700
          text-xs font-bold px-2 py-0.5 rounded-full mb-3">
          🏆 Winner
        </div>
      )}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-xs text-gray-500 truncate mb-3">{page.url}</p>
      <div className={`text-4xl font-extrabold ${scoreColor} mb-1`}>
        {page.score}
      </div>
      <p className="text-xs text-gray-400 mb-4">SEO Score / 100</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Words", value: page.wordCount },
          { label: "H1 Tags", value: page.h1Count },
          { label: "Images", value: page.imageCount },
          { label: "Int. Links", value: page.internalLinks },
        ].map(({ label: l, value }) => (
          <div key={l} className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-sm font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400">{l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
