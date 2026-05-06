"use client"
import { SeoCheck } from "@/types/urlAnalyzer"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export default function SeoAuditChecks({ checks }: { checks: SeoCheck[] }) {
  const icons = {
    pass: <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />,
    fail: <XCircle size={15} className="text-red-500 flex-shrink-0" />,
    warning: <AlertCircle size={15} className="text-yellow-500 flex-shrink-0" />,
  }

  return (
    <div className="flex flex-col gap-2">
      {checks.map((check, i) => (
        <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          {icons[check.status]}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-800">{check.name}</span>
              <span className="text-xs text-gray-500 truncate max-w-[200px]">{check.value}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{check.recommendation}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
