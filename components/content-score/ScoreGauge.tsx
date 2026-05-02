"use client";

import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
}

function getColor(score: number): string {
  if (score >= 70) return "#1D9E75";
  if (score >= 45) return "#f59e0b";
  return "#ef4444";
}

function getLabel(score: number): string {
  if (score >= 70) return "Good";
  if (score >= 45) return "Needs Work";
  return "Poor";
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(t);
  }, [score]);

  const radius = 54;
  const cx = 80;
  const cy = 80;
  // Semicircle: starts at 180° (left), ends at 0° (right), via bottom
  const circumference = Math.PI * radius; // half-circle arc length
  const progress = animated ? Math.min(100, Math.max(0, score)) / 100 : 0;
  const dashOffset = circumference * (1 - progress);
  const color = getColor(score);
  const label = getLabel(score);

  // Arc path: left → right via bottom (clockwise)
  const startX = cx - radius;
  const startY = cy;
  const endX = cx + radius;
  const endY = cy;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="160" height="90" viewBox="0 0 160 90" aria-label={`Score: ${score} out of 100`}>
        {/* Track arc */}
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.8s ease-out, stroke 0.3s ease" }}
        />
        {/* Score text */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold"
          style={{ fontSize: 26, fontWeight: 700, fill: color }}
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          style={{ fontSize: 12, fill: "#9ca3af" }}
        >
          /100
        </text>
      </svg>
      <span
        className="text-sm font-semibold"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
