"use client"
import { useState } from "react"
import { CompetitorAnalysisResult } from "@/types/competitor"

export function useCompetitorAnalysis() {
  const [result, setResult] = useState<CompetitorAnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyze = async (url1: string, url2: string) => {
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const response = await fetch("/api/competitor-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url1, url2 }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Analysis failed")
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setResult(null); setError("") }
  return { result, loading, error, analyze, reset }
}
