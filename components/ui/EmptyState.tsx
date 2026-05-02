import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="bg-gray-100 rounded-2xl p-4 mb-5">
        <Icon size={40} className="text-gray-400" />
      </div>
      <p className="text-base font-semibold text-gray-700 mb-2">{title}</p>
      <p className="text-sm text-gray-400 max-w-xs">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 text-sm font-semibold text-[#1D9E75] hover:underline"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
