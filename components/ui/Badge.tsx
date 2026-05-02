"use client";

type BadgeVariant =
  | "informational"
  | "commercial"
  | "transactional"
  | "navigational"
  | "low"
  | "medium"
  | "high";

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  informational: "bg-blue-100 text-blue-700",
  commercial:    "bg-purple-100 text-purple-700",
  transactional: "bg-orange-100 text-orange-700",
  navigational:  "bg-gray-100 text-gray-700",
  low:           "bg-green-100 text-green-700",
  medium:        "bg-yellow-100 text-yellow-700",
  high:          "bg-red-100 text-red-700",
};

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={[
        "inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize",
        variantClasses[variant],
      ].join(" ")}
    >
      {label}
    </span>
  );
}
