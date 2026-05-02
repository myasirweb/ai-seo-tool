import Link from "next/link";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">

      {/* Branding */}
      <div className="flex items-center gap-2 mb-12">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#1D9E75]/10">
          <Zap size={16} className="text-[#1D9E75]" fill="#1D9E75" />
        </div>
        <span className="text-gray-900 font-bold text-base tracking-tight">SEO.AI</span>
      </div>

      {/* 404 number */}
      <p className="text-8xl font-extrabold text-gray-100 leading-none select-none">404</p>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mt-4">Page not found</h1>
      <p className="text-gray-500 text-sm mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>

      {/* Actions */}
      <div className="flex gap-3 mt-8">
        <Link
          href="/dashboard"
          className="px-5 py-2.5 bg-[#1D9E75] hover:bg-[#178a63] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 text-sm font-semibold rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>

    </div>
  );
}
