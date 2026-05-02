"use client";

import { useEffect, useState } from "react";
import type { ScoreCategory } from "@/types/contentScore";

interface ScoreBreakdownProps {
  breakdown: ScoreCategory[];
  tips: string[];
}

function ProgressBar({ score, max }: { score: number; max: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = requestAnimationFrame(() =>
      setWidth(Math.round((Math.min(score, max) / max) * 100))
    );
    return () => cancelAnimationFrame(t);
  }, [score, max]);

  const pct = (score / max) * 100;
  const color =
    pct >= 70 ? "bg-[#1D9E75]" : pct >= 45 ? "bg-yellow-400" : "bg-red-400";

  return (
    <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className={["h-full rounded-full transition-all duration-700 ease-out", color].join(" ")}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function ScoreBreakdown({ breakdown, tips }: ScoreBreakdownProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Breakdown */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Score Breakdown</h3>
        <div className="flex flex-col gap-4">
          {breakdown.map((item) => (
            <div key={item.category} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700">{item.category}</span>
                <span className="text-gray-400 tabular-nums">
                  {item.score}/{item.max}
                </span>
              </div>
              <ProgressBar score={item.score} max={item.max} />
              <p className="text-xs text-gray-500 leading-relaxed">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {tips.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Improvement Tips</h3>
          <ul className="flex flex-col gap-2">
            {tips.map((tip, i) => (
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
