"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 gap-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50">
        <AlertTriangle size={32} className="text-orange-400" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
        <p className="text-sm text-gray-400 max-w-sm">{error.message}</p>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={reset}
          className="px-4 py-2 text-sm font-medium text-white bg-[#1D9E75] hover:bg-[#178a63] rounded-lg transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/dashboard"
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
