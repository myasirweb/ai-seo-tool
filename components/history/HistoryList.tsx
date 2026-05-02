"use client"

import HistoryCard from "./HistoryCard"
import EmptyState from "@/components/ui/EmptyState"
import { History } from "lucide-react"

interface HistoryListProps {
  items: ReturnType<typeof import("@/hooks/useHistory").useHistory>["filteredItems"]
  onDelete: (id: string, collection: string) => void
  loading: boolean
}

export default function HistoryList({ items, onDelete, loading }: HistoryListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No history yet"
        description="Use any tool to start building your search history."
      />
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <HistoryCard
          key={item._id}
          item={item as Parameters<typeof HistoryCard>[0]["item"]}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
