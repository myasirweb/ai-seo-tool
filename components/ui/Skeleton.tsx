import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse bg-gray-200 rounded", className)} />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-[60%]" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("bg-white border border-gray-200 rounded-xl p-5", className)}>
      <div className="flex items-start gap-4">
        <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
        <div className="flex-1 flex flex-col gap-2 pt-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

interface SkeletonTableProps {
  rows?: number;
}

const colWidths = ["w-1/4", "w-1/3", "w-1/5", "w-1/6"];

export function SkeletonTable({ rows = 5 }: SkeletonTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 bg-gray-50 px-4 py-3 border-b border-gray-200">
        {colWidths.map((w, i) => (
          <Skeleton key={i} className={cn("h-4", w)} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-gray-100 last:border-0"
        >
          {colWidths.map((w, col) => (
            <Skeleton key={col} className={cn("h-4", w)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonGauge({ className }: SkeletonProps) {
  return (
    <div className={cn("w-32 h-32 rounded-full animate-pulse bg-gray-200 mx-auto", className)} />
  );
}

export function SkeletonStatCards({ className }: SkeletonProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-xl" />
      ))}
    </div>
  );
}
