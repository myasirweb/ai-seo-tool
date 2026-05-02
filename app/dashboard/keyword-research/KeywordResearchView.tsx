"use client";

import { Search } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import KeywordInput from "@/components/keyword-research/KeywordInput";
import KeywordTable from "@/components/keyword-research/KeywordTable";
import Card from "@/components/ui/Card";
import { SkeletonTable } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function KeywordResearchView() {
  const { keywords, loading, error, fetchKeywords } = useKeywords();

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Keyword Research</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Enter a topic to generate SEO-optimized keywords with intent, difficulty, and volume.
        </p>
      </div>

      <Card>
        <KeywordInput onSubmit={fetchKeywords} loading={loading} />
      </Card>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <Card>
          <SkeletonTable rows={10} />
        </Card>
      )}

      {!loading && keywords.length > 0 ? (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700">
              {keywords.length} keywords found
            </p>
          </div>
          <div className="overflow-x-auto -mx-5 px-5">
            <KeywordTable keywords={keywords} />
          </div>
        </Card>
      ) : (
        !loading && !error && keywords.length === 0 && (
          <EmptyState
            icon={Search}
            title="No keywords yet"
            description="Enter a topic above and click Research to generate keyword ideas."
          />
        )
      )}
    </div>
  );
}
