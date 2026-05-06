"use client"
import { useState } from "react"
import { UrlAnalyzerResult } from "@/types/urlAnalyzer"

export function useUrlAnalyzer() {
  const [result, setResult] = useState<UrlAnalyzerResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzeUrl = async (url: string) => {
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const response = await fetch("/api/url-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to analyze URL")
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setResult(null); setError("") }
  return { result, loading, error, analyzeUrl, reset }
}
