"use client";

import { FileText } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import MetaForm from "@/components/meta-generator/MetaForm";
import MetaPreview from "@/components/meta-generator/MetaPreview";
import Card from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function MetaGeneratorView() {
  const { variants, loading, error, fetchMeta } = useMeta();

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Meta Generator</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Generate 3 unique meta title and description variants optimized for your target keyword.
        </p>
      </div>

      <Card>
        <MetaForm onSubmit={fetchMeta} loading={loading} />
      </Card>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!loading && variants.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-700">{variants.length} variants generated</p>
          {variants.map((variant, i) => (
            <Card key={i}>
              <MetaPreview variant={variant} index={i} />
            </Card>
          ))}
        </div>
      ) : (
        !loading && !error && variants.length === 0 && (
          <EmptyState
            icon={FileText}
            title="No variants generated yet"
            description="Enter your page topic and target keyword to generate meta title and description variants."
          />
        )
      )}
    </div>
  );
}
