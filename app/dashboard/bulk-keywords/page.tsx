"use client"
import { useState } from "react"
import { useBulkKeywords } from "@/hooks/useBulkKeywords"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import EmptyState from "@/components/ui/EmptyState"
import ErrorBox from "@/components/ui/ErrorBox"
import { SkeletonTable } from "@/components/ui/Skeleton"
import Badge from "@/components/ui/Badge"
import { Layers, Download, Plus, X } from "lucide-react"

export default function BulkKeywordsPage() {
  const [topics, setTopics] = useState(["", ""])
  const { results, loading, error, fetchBulkKeywords, exportToCsv, reset } = useBulkKeywords()

  const addTopic = () => { if (topics.length < 5) setTopics([...topics, ""]) }
  const removeTopic = (i: number) => setTopics(topics.filter((_, idx) => idx !== i))
  const updateTopic = (i: number, val: string) => {
    const updated = [...topics]
    updated[i] = val
    setTopics(updated)
  }
  const handleSubmit = () => {
    const valid = topics.filter((t) => t.trim())
    if (valid.length > 0) fetchBulkKeywords(valid)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Bulk Keyword Research</h2>
        <p className="text-sm text-gray-500">
          Research up to 5 topics at once. Export all results to CSV.
        </p>
      </div>

      <Card className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Enter Topics (max 5)
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {topics.map((topic, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-xs text-gray-400 w-4">{i + 1}.</span>
              <input
                value={topic}
                onChange={(e) => updateTopic(i, e.target.value)}
                placeholder={`Topic ${i + 1} e.g. "content marketing"`}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1D9E75]"
                disabled={loading}
              />
              {topics.length > 1 && (
                <button onClick={() => removeTopic(i)} className="text-gray-300 hover:text-red-400">
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {topics.length < 5 && (
            <Button variant="secondary" size="sm" onClick={addTopic}>
              <Plus size={13} /> Add Topic
            </Button>
          )}
          <Button onClick={handleSubmit} loading={loading} variant="primary">
            <Layers size={14} /> Research All
          </Button>
          {results.length > 0 && (
            <Button variant="secondary" size="sm" onClick={exportToCsv}>
              <Download size={13} /> Export CSV
            </Button>
          )}
        </div>
      </Card>

      <ErrorBox message={error} onRetry={reset} />

      {loading && <Card><SkeletonTable rows={10} /></Card>}

      {!loading && results.length === 0 && !error && (
        <EmptyState icon={Layers} title="No results yet" description="Enter topics above and click Research All." />
      )}

      {results.map((result, i) => (
        <Card key={i} className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-900">
              {result.topic}
              {result.status === "error" && (
                <span className="ml-2 text-xs text-red-500">Failed</span>
              )}
            </p>
            <span className="text-xs text-gray-400">{result.keywords.length} keywords</span>
          </div>
          {result.status === "success" && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Keyword", "Intent", "Difficulty", "Volume"].map((h) => (
                      <th key={h} className="text-left py-2 px-2 text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.keywords.map((k, j) => (
                    <tr key={j} className="border-b border-gray-50">
                      <td className="py-2 px-2 font-medium text-gray-800">{k.keyword}</td>
                      <td className="py-2 px-2"><Badge label={k.intent} variant={k.intent as Parameters<typeof Badge>[0]["variant"]} /></td>
                      <td className="py-2 px-2"><Badge label={k.difficulty} variant={k.difficulty as Parameters<typeof Badge>[0]["variant"]} /></td>
                      <td className="py-2 px-2"><Badge label={k.volume} variant={k.volume === "high" ? "high" : k.volume === "medium" ? "medium" : "low"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
