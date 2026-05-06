"use client"
import { useCompetitorAnalysis } from "@/hooks/useCompetitorAnalysis"
import CompetitorInput from "@/components/competitor-analysis/CompetitorInput"
import CompetitorScoreCard from "@/components/competitor-analysis/CompetitorScoreCard"
import CompetitorTable from "@/components/competitor-analysis/CompetitorTable"
import Card from "@/components/ui/Card"
import EmptyState from "@/components/ui/EmptyState"
import ErrorBox from "@/components/ui/ErrorBox"
import { SkeletonText } from "@/components/ui/Skeleton"
import { GitCompare } from "lucide-react"

export default function CompetitorAnalysisPage() {
  const { result, loading, error, analyze, reset } = useCompetitorAnalysis()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          Competitor Analysis
        </h2>
        <p className="text-sm text-gray-500">
          Compare 2 pages side by side — SEO score, title, meta, headings,
          content, and AI-powered insights on who wins each category.
        </p>
      </div>

      <Card className="mb-4">
        <CompetitorInput onSubmit={analyze} loading={loading} />
      </Card>

      <ErrorBox message={error} onRetry={reset} />

      {loading && (
        <Card>
          <SkeletonText lines={10} />
        </Card>
      )}

      {!loading && !result && !error && (
        <EmptyState
          icon={GitCompare}
          title="No comparison yet"
          description="Enter 2 URLs above to get a detailed SEO comparison."
        />
      )}

      {result && !loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <CompetitorScoreCard
              page={result.page1}
              label="Page 1 — Your Page"
              isWinner={result.overallWinner === "page1"}
            />
            <CompetitorScoreCard
              page={result.page2}
              label="Page 2 — Competitor"
              isWinner={result.overallWinner === "page2"}
            />
          </div>

          <Card className="mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">
                {result.overallWinner === "page1" ? "🏆" :
                 result.overallWinner === "page2" ? "🥈" : "🤝"}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {result.overallWinner === "tie"
                    ? "It's a Tie!"
                    : result.overallWinner === "page1"
                    ? "Page 1 Wins Overall"
                    : "Page 2 Wins Overall"}
                </p>
                <p className="text-xs text-gray-500">{result.overallReason}</p>
              </div>
            </div>
            <CompetitorTable
              winners={result.winners}
              url1={result.page1.url}
              url2={result.page2.url}
            />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Improve Page 1", suggestions: result.page1Suggestions, color: "text-blue-600" },
              { label: "Improve Page 2", suggestions: result.page2Suggestions, color: "text-purple-600" },
            ].map(({ label, suggestions, color }) => (
              <Card key={label}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${color}`}>
                  {label}
                </p>
                {suggestions.map((s, i) => (
                  <div key={i} className="flex gap-2 text-sm text-gray-700 mb-2 leading-relaxed">
                    <span className="text-[#1D9E75] font-bold flex-shrink-0">→</span>
                    {s}
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
