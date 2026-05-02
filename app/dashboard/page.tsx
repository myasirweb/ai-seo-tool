"use client";

import Link from "next/link";
import { Search, FileText, BarChart2, BookOpen, ChevronRight, Zap, Type, History } from "lucide-react";
import Card from "@/components/ui/Card";

interface ToolCard {
  href: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const TOOLS: ToolCard[] = [
  {
    href:        "/dashboard/keyword-research",
    label:       "Keyword Research",
    description: "Generate SEO-optimized keywords with search intent, difficulty, and volume insights.",
    icon:        Search,
    iconBg:      "bg-blue-50",
    iconColor:   "text-blue-500",
  },
  {
    href:        "/dashboard/meta-generator",
    label:       "Meta Generator",
    description: "Create compelling meta titles and descriptions tailored to your target keyword.",
    icon:        FileText,
    iconBg:      "bg-green-50",
    iconColor:   "text-[#1D9E75]",
  },
  {
    href:        "/dashboard/content-score",
    label:       "Content Score",
    description: "Score your content for SEO quality and get actionable improvement tips.",
    icon:        BarChart2,
    iconBg:      "bg-yellow-50",
    iconColor:   "text-yellow-500",
  },
  {
    href:        "/dashboard/readability",
    label:       "Readability",
    description: "Measure reading ease with the Flesch score and receive AI writing suggestions.",
    icon:        BookOpen,
    iconBg:      "bg-purple-50",
    iconColor:   "text-purple-500",
  },
  {
    href:        "/dashboard/blog-titles",
    label:       "Blog Title Generator",
    description: "Generate 10 SEO-optimized blog title ideas with type labels and copywriting tips.",
    icon:        Type,
    iconBg:      "bg-pink-50",
    iconColor:   "text-pink-600",
  },
  {
    href:        "/dashboard/history",
    label:       "Search History",
    description: "View your last 20 searches across all tools, filter by type, and manage your history.",
    icon:        History,
    iconBg:      "bg-orange-50",
    iconColor:   "text-orange-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to SEO.AI</h1>
        <p className="mt-1 text-gray-500 text-sm">
          A free AI-powered toolkit for bloggers, agencies, and businesses.
        </p>
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TOOLS.map(({ href, label, description, icon: Icon, iconBg, iconColor }) => (
          <Card key={href} className="flex flex-col gap-4 hover:shadow-sm transition-shadow duration-150">
            {/* Icon */}
            <div
              className={[
                "flex items-center justify-center rounded-xl shrink-0",
                "w-[42px] h-[42px]",
                iconBg,
              ].join(" ")}
            >
              <Icon size={20} className={iconColor} />
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{label}</p>
              <p className="mt-0.5 text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>

            {/* Link */}
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#1D9E75] hover:text-[#166534] transition-colors duration-150"
            >
              Open tool
              <ChevronRight size={14} />
            </Link>
          </Card>
        ))}
      </div>

      {/* Quick tip */}
      <div className="flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3.5">
        <Zap size={16} className="text-[#1D9E75] mt-0.5 shrink-0" fill="#1D9E75" />
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold">Tip:</span> Start with Keyword Research, then use those
          keywords in the Meta Generator and Content Score tools for best results.
        </p>
      </div>
    </div>
  );
}
