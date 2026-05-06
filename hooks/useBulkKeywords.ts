"use client"
import { useState } from "react"
import { BulkKeywordTopic } from "@/types/bulkKeywords"

export function useBulkKeywords() {
  const [results, setResults] = useState<BulkKeywordTopic[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchBulkKeywords = async (topics: string[]) => {
    setLoading(true)
    setError("")
    setResults([])
    try {
      const response = await fetch("/api/bulk-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed")
      setResults(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const exportToCsv = () => {
    const rows = [["Topic", "Keyword", "Intent", "Difficulty", "Volume"]]
    results.forEach((r) => {
      r.keywords.forEach((k) => {
        rows.push([r.topic, k.keyword, k.intent, k.difficulty, k.volume])
      })
    })
    const csv = rows.map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bulk-keywords.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => { setResults([]); setError("") }
  return { results, loading, error, fetchBulkKeywords, exportToCsv, reset }
}
