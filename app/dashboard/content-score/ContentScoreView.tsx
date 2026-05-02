"use client";

import { BarChart2 } from "lucide-react";
import { useContentScore } from "@/hooks/useContentScore";
import ContentInput from "@/components/content-score/ContentInput";
import ScoreGauge from "@/components/content-score/ScoreGauge";
import ScoreBreakdown from "@/components/content-score/ScoreBreakdown";
import Card from "@/components/ui/Card";
import { SkeletonGauge, SkeletonText } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function ContentScoreView() {
  const { result, loading, error, fetchScore } = useContentScore();

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Content Score</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Paste your content and target keyword to receive an SEO quality score with actionable feedback.
        </p>
      </div>

      <Card>
        <ContentInput onSubmit={fetchScore} loading={loading} />
      </Card>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="flex flex-col items-center justify-center py-6">
            <SkeletonGauge />
          </Card>
          <Card>
            <SkeletonText lines={6} />
          </Card>
        </div>
      )}

      {!loading && result ? (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5">
          <Card className="flex flex-col items-center justify-center py-6 mx-auto w-full">
            <p className="text-sm font-semibold text-gray-700 mb-4">Overall Score</p>
            <ScoreGauge score={result.score} />
          </Card>
          <Card>
            <ScoreBreakdown breakdown={result.breakdown} tips={result.tips} />
          </Card>
        </div>
      ) : (
        !loading && !error && !result && (
          <EmptyState
            icon={BarChart2}
            title="No content analyzed yet"
            description="Paste your content and target keyword above to get a detailed SEO score."
          />
        )
      )}
    </div>
  );
}
