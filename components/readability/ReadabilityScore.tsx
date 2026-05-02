"use client";

type SuccessResult = {
  fleschScore: number;
  gradeLevel: string;
  label: string;
  avgSentenceLength: number;
  wordCount: number;
  sentenceCount: number;
  suggestions: string[];
};

interface ReadabilityScoreProps {
  result: SuccessResult;
}

function fleschColor(score: number): string {
  if (score >= 70) return "text-[#1D9E75]";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}

function sentenceColor(avg: number): string {
  if (avg <= 20) return "text-[#1D9E75]";
  if (avg <= 30) return "text-yellow-500";
  return "text-red-500";
}

interface StatCardProps {
  title: string;
  value: string;
  valueClass?: string;
  subtitle: string;
}

function StatCard({ title, value, valueClass = "text-gray-900", subtitle }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 bg-gray-50 border border-gray-100 rounded-xl p-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{title}</p>
      <p className={["text-3xl font-bold leading-none", valueClass].join(" ")}>{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
    </div>
  );
}

export default function ReadabilityScore({ result }: ReadabilityScoreProps) {
  const {
    fleschScore,
    gradeLevel,
    label,
    avgSentenceLength,
    wordCount,
    sentenceCount,
    suggestions,
  } = result;

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          title="Flesch Score"
          value={String(fleschScore)}
          valueClass={fleschColor(fleschScore)}
          subtitle={label}
        />
        <StatCard
          title="Grade Level"
          value={gradeLevel}
          subtitle="reading level"
        />
        <StatCard
          title="Avg Sentence"
          value={`${avgSentenceLength}w`}
          valueClass={sentenceColor(avgSentenceLength)}
          subtitle={`${sentenceCount} sentences · ${wordCount} words`}
        />
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">AI Suggestions</h3>
          <ul className="flex flex-col gap-2">
            {suggestions.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-[#1D9E75] font-bold mt-0.5 shrink-0">&rarr;</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
