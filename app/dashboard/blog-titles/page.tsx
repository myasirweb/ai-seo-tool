"use client"

import { useBlogTitles } from "@/hooks/useBlogTitles"
import TitleInput from "@/components/blog-titles/TitleInput"
import TitleResults from "@/components/blog-titles/TitleResults"
import Card from "@/components/ui/Card"
import EmptyState from "@/components/ui/EmptyState"
import ErrorBox from "@/components/ui/ErrorBox"
import { SkeletonText } from "@/components/ui/Skeleton"
import { Type } from "lucide-react"

export default function BlogTitlesPage() {
  const { titles, loading, error, fetchTitles, reset } = useBlogTitles()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          Blog Title Generator
        </h2>
        <p className="text-sm text-gray-500">
          Enter your target keyword and get 10 SEO-optimized blog title ideas
          with type labels and copywriting tips.
        </p>
      </div>

      <Card className="mb-4">
        <TitleInput onSubmit={fetchTitles} loading={loading} />
      </Card>

      <ErrorBox message={error} onRetry={reset} />

      {loading && (
        <Card>
          <SkeletonText lines={10} />
        </Card>
      )}

      {!loading && titles.length === 0 && !error && (
        <EmptyState
          icon={Type}
          title="No titles generated yet"
          description="Enter your target keyword above and click Generate Titles."
        />
      )}

      {!loading && titles.length > 0 && (
        <Card>
          <TitleResults titles={titles} />
        </Card>
      )}
    </div>
  )
}
