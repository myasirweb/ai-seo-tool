"use client"

import { useState } from "react"
import { BlogTitleItem } from "@/types/blogTitle"
import { useLanguage } from "@/context/LanguageContext"

export function useBlogTitles() {
  const [titles, setTitles] = useState<BlogTitleItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { language } = useLanguage()

  const fetchTitles = async (keyword: string) => {
    if (!keyword.trim()) return
    setLoading(true)
    setError("")
    setTitles([])

    try {
      const response = await fetch("/api/blog-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim(), language: language.code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate blog titles")
      }

      setTitles(data.titles)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setTitles([])
    setError("")
    setLoading(false)
  }

  return { titles, loading, error, fetchTitles, reset }
}
