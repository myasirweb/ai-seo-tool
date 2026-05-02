"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Tab = "keywords" | "meta" | "score" | "readability";

const TABS: { id: Tab; label: string; shortLabel: string }[] = [
  { id: "keywords",    label: "Keyword Research", shortLabel: "Keywords" },
  { id: "meta",        label: "Meta Generator",   shortLabel: "Meta"     },
  { id: "score",       label: "Content Score",    shortLabel: "Score"    },
  { id: "readability", label: "Readability",      shortLabel: "Read"     },
];

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-600">
      <CheckCircle2 size={15} className="text-[#1D9E75] mt-0.5 shrink-0" />
      {text}
    </li>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block bg-green-50 text-[#1D9E75] border border-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3">
      {label}
    </span>
  );
}

function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5">
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
        <div className="ml-2 flex-1 bg-gray-100 rounded h-4" />
      </div>
      {children}
    </div>
  );
}

/* ─── Tab previews ─────────────────────────────────────────── */

function KeywordsPreview() {
  const rows = [
    { kw: "ai seo tools",                  intent: "informational", ic: "bg-blue-100 text-blue-700",   diff: "low",    dc: "bg-green-100 text-green-700",  vol: "high",   vc: "bg-green-100 text-green-700"  },
    { kw: "best seo software",             intent: "commercial",    ic: "bg-purple-100 text-purple-700",diff: "medium", dc: "bg-yellow-100 text-yellow-700",vol: "medium", vc: "bg-yellow-100 text-yellow-700"},
    { kw: "how to do keyword research",    intent: "informational", ic: "bg-blue-100 text-blue-700",   diff: "low",    dc: "bg-green-100 text-green-700",  vol: "high",   vc: "bg-green-100 text-green-700"  },
  ];
  return (
    <PreviewShell>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            {["Keyword","Intent","Diff","Volume"].map((h) => (
              <th key={h} className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((r) => (
            <tr key={r.kw}>
              <td className="py-2 pr-2 text-gray-700 font-medium max-w-[120px] truncate">{r.kw}</td>
              <td className="py-2 pr-2"><span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize ${r.ic}`}>{r.intent}</span></td>
              <td className="py-2 pr-2"><span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize ${r.dc}`}>{r.diff}</span></td>
              <td className="py-2"><span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize ${r.vc}`}>{r.vol}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </PreviewShell>
  );
}

function MetaPreview() {
  return (
    <PreviewShell>
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 space-y-0.5">
            <p className="text-[#1a0dab] text-sm font-medium truncate">
              {i === 1 ? "Best AI SEO Tools in 2025 — Free & Powerful" : "Top AI-Powered SEO Tools for Bloggers | Free"}
            </p>
            <p className="text-[#006621] text-[10px]">yourwebsite.com › blog › article-slug</p>
            <p className="text-gray-500 text-xs line-clamp-2">
              {i === 1
                ? "Discover the best AI SEO tools to boost your rankings fast. Free keyword research, meta generator and content scoring tools included."
                : "Looking for AI-powered SEO tools? Get keyword research, meta descriptions, and content scoring — completely free, no login required."}
            </p>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function ScorePreview() {
  const bars = [
    { label: "Keyword Usage",     pct: 88 },
    { label: "Content Structure", pct: 65 },
    { label: "Readability",       pct: 70 },
  ];
  return (
    <PreviewShell>
      <div className="flex items-center gap-6">
        {/* Gauge circle */}
        <div className="flex flex-col items-center shrink-0">
          <div className="w-20 h-20 rounded-full border-4 border-[#1D9E75] flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-[#1D9E75] leading-none">74</span>
            <span className="text-[10px] text-gray-400">/100</span>
          </div>
          <span className="text-xs font-semibold text-[#1D9E75] mt-1.5">Good</span>
        </div>
        {/* Bars */}
        <div className="flex-1 space-y-2.5">
          {bars.map(({ label, pct }) => (
            <div key={label}>
              <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                <span>{label}</span><span>{pct}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#1D9E75]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}

function ReadabilityPreview() {
  const stats = [
    { label: "Flesch Score", value: "72",        color: "text-[#1D9E75]" },
    { label: "Grade Level",  value: "8th grade", color: "text-gray-800"  },
    { label: "Avg Sentence", value: "18 words",  color: "text-[#1D9E75]" },
  ];
  return (
    <PreviewShell>
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
            <p className={`text-lg font-extrabold leading-none ${color}`}>{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        {["Use shorter sentences to improve flow.", "Replace passive voice with active constructions."].map((tip) => (
          <p key={tip} className="flex items-start gap-1.5 text-xs text-gray-500">
            <span className="text-[#1D9E75] font-bold mt-0.5">→</span>{tip}
          </p>
        ))}
      </div>
    </PreviewShell>
  );
}

/* ─── Tab content map ──────────────────────────────────────── */

const TAB_CONTENT: Record<Tab, {
  badge?: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  href: string;
  preview: React.ReactNode;
}> = {
  keywords: {
    badge:       "Keyword Research",
    title:       "Discover What Your Audience is Searching For",
    description: "Enter any topic and receive 10 targeted keyword suggestions, each with search intent, competition level, and volume indicators.",
    bullets:     [
      "Informational, commercial & transactional intent tags",
      "Difficulty: Low, Medium, High ratings",
      "Volume estimates for each keyword",
    ],
    cta:  "Try Keyword Research →",
    href: "/dashboard/keyword-research",
    preview: <KeywordsPreview />,
  },
  meta: {
    title:       "Write Meta Tags That Actually Get Clicks",
    description: "Generate 3 optimized title and description variants with a live Google SERP preview — including character count validation.",
    bullets:     [
      "3 unique variants per request",
      "Auto-enforced character limits",
      "Copy with one click",
    ],
    cta:  "Try Meta Generator →",
    href: "/dashboard/meta-generator",
    preview: <MetaPreview />,
  },
  score: {
    title:       "Know Exactly How SEO-Ready Your Content Is",
    description: "Get a 100-point content score broken down by category, with specific tips to improve each area.",
    bullets:     [
      "6-category breakdown",
      "Specific improvement tips",
      "Keyword density analysis",
    ],
    cta:  "Try Content Score →",
    href: "/dashboard/content-score",
    preview: <ScorePreview />,
  },
  readability: {
    title:       "Make Your Content Easy to Read and Share",
    description: "Check your Flesch-Kincaid readability score instantly, then get AI suggestions to simplify and improve your writing.",
    bullets:     [
      "Instant Flesch-Kincaid score",
      "Grade level assessment",
      "AI writing suggestions",
    ],
    cta:  "Try Readability →",
    href: "/dashboard/readability",
    preview: <ReadabilityPreview />,
  },
};

/* ─── Main component ───────────────────────────────────────── */

export default function ToolPreviewSection() {
  const [activeTab, setActiveTab] = useState<Tab>("keywords");
  const content = TAB_CONTENT[activeTab];

  return (
    <section id="tools" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-[#1D9E75] uppercase mb-3">
            The Tools
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Four Tools. One Toolkit.
          </h2>
          <p className="text-gray-500 mt-3">Click each tool to see what it does.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map(({ id, label, shortLabel }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={[
                "text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150",
                activeTab === id
                  ? "bg-[#1D9E75] text-white"
                  : "text-gray-500 hover:text-gray-700",
              ].join(" ")}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-4">
            {content.badge && <Badge label={content.badge} />}
            <h3 className="text-2xl font-extrabold text-gray-900 leading-snug">
              {content.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{content.description}</p>
            <ul className="space-y-2">
              {content.bullets.map((b) => <Bullet key={b} text={b} />)}
            </ul>
            <Link
              href={content.href}
              className="inline-flex items-center text-sm font-semibold text-[#1D9E75] hover:text-[#166534] transition-colors duration-150 mt-1"
            >
              {content.cta}
            </Link>
          </div>

          {/* Right — preview (desktop only) */}
          <div className="hidden md:block">{content.preview}</div>
        </div>

      </div>
    </section>
  );
}
