"use client"

import { useState, useEffect } from "react"

export type HistoryFilter = "all" | "keywords" | "meta" | "contentScores" | "readability" | "blogTitles"

export interface HistoryItem {
  _id: string
  createdAt: string
  collection: string
  [key: string]: unknown
}

export function useHistory() {
  const [data, setData] = useState<{
    keywords: HistoryItem[]
    meta: HistoryItem[]
    contentScores: HistoryItem[]
    readability: HistoryItem[]
    blogTitles: HistoryItem[]
  }>({
    keywords: [],
    meta: [],
    contentScores: [],
    readability: [],
    blogTitles: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<HistoryFilter>("all")

  const fetchHistory = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/history")
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Failed to fetch history")
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load history")
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async (id: string, collection: string) => {
    try {
      await fetch(`/api/history?id=${id}&collection=${collection}`, {
        method: "DELETE",
      })
      await fetchHistory()
    } catch {
      setError("Failed to delete item")
    }
  }

  const clearAll = async () => {
    try {
      await fetch("/api/history?clearAll=true", { method: "DELETE" })
      await fetchHistory()
    } catch {
      setError("Failed to clear history")
    }
  }

  const getFilteredItems = () => {
    const allItems = [
      ...data.keywords.map((i) => ({ ...i, collection: "keyword_results", toolName: "Keyword Research" })),
      ...data.meta.map((i) => ({ ...i, collection: "meta_results", toolName: "Meta Generator" })),
      ...data.contentScores.map((i) => ({ ...i, collection: "content_score_results", toolName: "Content Score" })),
      ...data.readability.map((i) => ({ ...i, collection: "readability_results", toolName: "Readability" })),
      ...data.blogTitles.map((i) => ({ ...i, collection: "blog_title_results", toolName: "Blog Titles" })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    if (filter === "all") return allItems
    if (filter === "keywords") return allItems.filter((i) => i.collection === "keyword_results")
    if (filter === "meta") return allItems.filter((i) => i.collection === "meta_results")
    if (filter === "contentScores") return allItems.filter((i) => i.collection === "content_score_results")
    if (filter === "readability") return allItems.filter((i) => i.collection === "readability_results")
    if (filter === "blogTitles") return allItems.filter((i) => i.collection === "blog_title_results")
    return allItems
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return {
    data,
    loading,
    error,
    filter,
    setFilter,
    fetchHistory,
    deleteItem,
    clearAll,
    filteredItems: getFilteredItems(),
    totalCount: getFilteredItems().length,
  }
}
