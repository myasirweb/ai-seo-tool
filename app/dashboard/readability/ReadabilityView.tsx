"use client";

import { BookOpen } from "lucide-react";
import { useReadability } from "@/hooks/useReadability";
import ReadabilityInput from "@/components/readability/ReadabilityInput";
import ReadabilityScore from "@/components/readability/ReadabilityScore";
import Card from "@/components/ui/Card";
import { SkeletonStatCards, SkeletonText } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function ReadabilityView() {
  const { result, loading, error, fetchReadability } = useReadability();

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Readability Checker</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Flesch-Kincaid score computed instantly. AI suggestions powered by OpenAI.
        </p>
      </div>

      <Card>
        <ReadabilityInput onSubmit={fetchReadability} loading={loading} />
      </Card>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          <SkeletonStatCards />
          <Card>
            <SkeletonText lines={4} />
          </Card>
        </div>
      )}

      {!loading && result ? (
        <Card>
          <ReadabilityScore result={result} />
        </Card>
      ) : (
        !loading && !error && !result && (
          <EmptyState
            icon={BookOpen}
            title="No content checked yet"
            description="Paste your article or blog post above to check its readability score."
          />
        )
      )}
    </div>
  );
}
