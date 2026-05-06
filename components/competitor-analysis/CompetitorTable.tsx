"use client"
import { CompetitorWinner } from "@/types/competitor"
import { Trophy, Minus } from "lucide-react"

interface CompetitorTableProps {
  winners: CompetitorWinner[]
  url1: string
  url2: string
}

export default function CompetitorTable({ winners, url1, url2 }: CompetitorTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-100">
            <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
              Category
            </th>
            <th className="text-center py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
              {url1 || "Page 1"}
            </th>
            <th className="text-center py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
              {url2 || "Page 2"}
            </th>
            <th className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
              Reason
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((w, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-3 px-3 font-semibold text-gray-800">{w.category}</td>
              <td className="py-3 px-3 text-center">
                {w.winner === "page1" ? (
                  <Trophy size={16} className="text-[#1D9E75] mx-auto" />
                ) : w.winner === "tie" ? (
                  <Minus size={16} className="text-gray-400 mx-auto" />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="py-3 px-3 text-center">
                {w.winner === "page2" ? (
                  <Trophy size={16} className="text-[#1D9E75] mx-auto" />
                ) : w.winner === "tie" ? (
                  <Minus size={16} className="text-gray-400 mx-auto" />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="py-3 px-3 text-xs text-gray-500">{w.reason}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td className="py-3 px-3 font-bold text-gray-700 text-xs">Score</td>
            <td className="py-3 px-3 text-center text-xs font-bold text-gray-600">
              {winners.filter((w) => w.winner === "page1").length} wins
            </td>
            <td className="py-3 px-3 text-center text-xs font-bold text-gray-600">
              {winners.filter((w) => w.winner === "page2").length} wins
            </td>
            <td className="py-3 px-3 text-xs text-gray-400">
              {winners.filter((w) => w.winner === "tie").length} ties
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
