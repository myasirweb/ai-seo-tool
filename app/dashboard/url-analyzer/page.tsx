"use client"
import { useUrlAnalyzer } from "@/hooks/useUrlAnalyzer"
import UrlInput from "@/components/url-analyzer/UrlInput"
import SeoAuditChecks from "@/components/url-analyzer/SeoAuditChecks"
import Card from "@/components/ui/Card"
import EmptyState from "@/components/ui/EmptyState"
import ErrorBox from "@/components/ui/ErrorBox"
import { SkeletonText, SkeletonGauge } from "@/components/ui/Skeleton"
import { Link2 } from "lucide-react"

export default function UrlAnalyzerPage() {
  const { result, loading, error, analyzeUrl, reset } = useUrlAnalyzer()
  const scoreColor = result
    ? result.score >= 70 ? "text-green-600" : result.score >= 45 ? "text-yellow-600" : "text-red-600"
    : ""

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">URL SEO Analyzer</h2>
        <p className="text-sm text-gray-500">
          Enter any public URL to get a detailed SEO audit — title, meta,
          headings, images, and AI-powered suggestions.
        </p>
      </div>

      <Card className="mb-4">
        <UrlInput onSubmit={analyzeUrl} loading={loading} />
      </Card>

      <ErrorBox message={error} onRetry={reset} />

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card><SkeletonGauge /></Card>
          <Card><SkeletonText lines={8} /></Card>
        </div>
      )}

      {!loading && !result && !error && (
        <EmptyState
          icon={Link2}
          title="No URL analyzed yet"
          description="Enter a URL above to get your SEO audit report."
        />
      )}

      {result && !loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="flex flex-col items-center justify-center text-center py-6">
              <p className={`text-5xl font-extrabold ${scoreColor}`}>{result.score}</p>
              <p className="text-xs text-gray-400 mt-1">SEO Score / 100</p>
              <p className={`text-sm font-semibold mt-2 ${scoreColor}`}>
                {result.score >= 70 ? "Good" : result.score >= 45 ? "Needs Work" : "Poor"}
              </p>
            </Card>
            <Card className="md:col-span-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Page Overview
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Word Count", value: result.pageData.wordCount },
                  { label: "Images", value: result.pageData.imageCount },
                  { label: "Internal Links", value: result.pageData.internalLinks },
                  { label: "H1 Tags", value: result.pageData.h1Count },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                SEO Checks
              </p>
              <SeoAuditChecks checks={result.checks} />
            </Card>
            <Card>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                AI Suggestions
              </p>
              <div className="flex flex-col gap-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-[#1D9E75] font-bold flex-shrink-0">→</span>
                    {s}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
