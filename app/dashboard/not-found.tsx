"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function DashboardNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 gap-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100">
        <Search size={32} className="text-gray-400" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">Tool not found</h2>
        <p className="text-sm text-gray-400">This page doesn&apos;t exist in the dashboard.</p>
      </div>

      <Link
        href="/dashboard"
        className="mt-2 px-4 py-2 text-sm font-semibold text-[#1D9E75] hover:underline"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}
