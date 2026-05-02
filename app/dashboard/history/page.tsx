"use client"

import { useHistory } from "@/hooks/useHistory"
import HistoryFilterTabs from "@/components/history/HistoryFilter"
import HistoryList from "@/components/history/HistoryList"
import Card from "@/components/ui/Card"
import ErrorBox from "@/components/ui/ErrorBox"
import Button from "@/components/ui/Button"
import { RefreshCw, Trash2 } from "lucide-react"

export default function HistoryPage() {
  const {
    loading,
    error,
    filter,
    setFilter,
    fetchHistory,
    deleteItem,
    clearAll,
    filteredItems,
    totalCount,
    data,
  } = useHistory()

  const counts = {
    all: data.keywords.length + data.meta.length + data.contentScores.length + data.readability.length + data.blogTitles.length,
    keywords: data.keywords.length,
    meta: data.meta.length,
    contentScores: data.contentScores.length,
    readability: data.readability.length,
    blogTitles: data.blogTitles.length,
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Search History
          </h2>
          <p className="text-sm text-gray-500">
            Your last 20 searches across all tools — stored in MongoDB.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchHistory}
            disabled={loading}
          >
            <RefreshCw size={13} />
            Refresh
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            disabled={loading}
          >
            <Trash2 size={13} />
            Clear All
          </Button>
        </div>
      </div>

      <ErrorBox message={error} onRetry={fetchHistory} />

      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <HistoryFilterTabs
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
          <span className="text-xs text-gray-400 ml-4 flex-shrink-0">
            {totalCount} results
          </span>
        </div>
        <HistoryList
          items={filteredItems}
          onDelete={deleteItem}
          loading={loading}
        />
      </Card>
    </div>
  )
}
