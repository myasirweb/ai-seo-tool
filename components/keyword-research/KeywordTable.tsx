"use client";

import type { KeywordItem } from "@/types/keyword";
import Badge from "@/components/ui/Badge";
import CopyButton from "@/components/ui/CopyButton";

interface KeywordTableProps {
  keywords: KeywordItem[];
}

export default function KeywordTable({ keywords }: KeywordTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 w-full">
              Keyword
            </th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 whitespace-nowrap">
              Intent
            </th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 whitespace-nowrap">
              Difficulty
            </th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 whitespace-nowrap">
              Volume
            </th>
            <th className="pb-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {keywords.map((item, index) => (
            <tr key={index} className="group hover:bg-gray-50 transition-colors duration-100">
              <td className="py-3 pr-4 text-gray-800 font-medium">{item.keyword}</td>
              <td className="py-3 pr-4 whitespace-nowrap">
                <Badge label={item.intent} variant={item.intent} />
              </td>
              <td className="py-3 pr-4 whitespace-nowrap">
                <Badge label={item.difficulty} variant={item.difficulty} />
              </td>
              <td className="py-3 pr-4 whitespace-nowrap">
                <Badge label={item.volume} variant={item.volume} />
              </td>
              <td className="py-3 text-right">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                  <CopyButton text={item.keyword} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
