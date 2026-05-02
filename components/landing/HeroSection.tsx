"use client";

import Link from "next/link";

const MOCK_KEYWORDS = [
  {
    keyword:    "ai tools for content marketing",
    intent:     "informational",
    intentColor:"bg-blue-100 text-blue-700",
    difficulty: "medium",
    diffColor:  "bg-yellow-100 text-yellow-700",
    volume:     "high",
    volColor:   "bg-green-100 text-green-700",
  },
  {
    keyword:    "best seo software 2025",
    intent:     "commercial",
    intentColor:"bg-purple-100 text-purple-700",
    difficulty: "high",
    diffColor:  "bg-red-100 text-red-700",
    volume:     "high",
    volColor:   "bg-green-100 text-green-700",
  },
  {
    keyword:    "free keyword research tool",
    intent:     "transactional",
    intentColor:"bg-orange-100 text-orange-700",
    difficulty: "low",
    diffColor:  "bg-green-100 text-green-700",
    volume:     "medium",
    volColor:   "bg-yellow-100 text-yellow-700",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto text-center px-6">

        {/* Badge */}
        <span className="inline-flex items-center bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          ✦ 100% Free · No Login Required
        </span>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          The Free{" "}
          <span className="text-[#1D9E75]">AI SEO Toolkit</span>
          <br />
          Built for Bloggers &amp; Agencies
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 mt-4 mb-8 max-w-2xl mx-auto">
          Keyword research, meta title &amp; description generator, content scorer,
          and readability checker — all powered by AI, all completely free.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/dashboard"
            className="bg-[#1D9E75] text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#178a64] transition-colors duration-150"
          >
            Start for Free →
          </Link>
          <a
            href="#how-it-works"
            className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-base hover:bg-gray-50 transition-colors duration-150"
          >
            See How It Works
          </a>
        </div>

        {/* Trust line */}
        <p className="text-sm text-gray-400 mt-4">
          ✓ No credit card &nbsp; ✓ No account &nbsp; ✓ No limits
        </p>

        {/* Hero visual — mock dashboard (desktop only) */}
        <div className="relative mt-16 max-w-2xl mx-auto hidden md:block">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 text-left">

            {/* Fake topbar */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
              <div className="ml-3 flex-1 bg-gray-100 rounded-md h-5" />
            </div>

            {/* Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-4">
                    Keyword
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-4 whitespace-nowrap">
                    Intent
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-4 whitespace-nowrap">
                    Difficulty
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 whitespace-nowrap">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_KEYWORDS.map((row) => (
                  <tr key={row.keyword}>
                    <td className="py-2.5 pr-4 text-gray-700 font-medium text-xs">{row.keyword}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${row.intentColor}`}>
                        {row.intent}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${row.diffColor}`}>
                        {row.difficulty}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${row.volColor}`}>
                        {row.volume}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fade-to-white gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 rounded-b-2xl bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
