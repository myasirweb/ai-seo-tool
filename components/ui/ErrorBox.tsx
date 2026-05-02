"use client";

import { AlertCircle } from "lucide-react";

interface ErrorBoxProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorBox({ message, onRetry }: ErrorBoxProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
      <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-red-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs font-medium text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg px-3 py-1 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
