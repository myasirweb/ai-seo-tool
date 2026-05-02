"use client";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-7 h-7 border-2",
  lg: "w-10 h-10 border-[3px]",
};

export default function Spinner({ size = "md", color = "#1D9E75" }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={[
          "animate-spin rounded-full border-t-transparent",
          sizeClasses[size],
        ].join(" ")}
        style={{ borderColor: `${color}40`, borderTopColor: "transparent", borderRightColor: color }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
