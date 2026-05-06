"use client"

import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/constants/languages"
import { Globe } from "lucide-react"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border
          border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm"
      >
        <Globe size={13} className="text-gray-500" />
        <span className="text-sm">{language.flag}</span>
        <span className="text-xs font-semibold text-gray-700 hidden sm:block">
          {language.name}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-9 z-40 bg-white border border-gray-200
            rounded-xl shadow-lg py-1.5 w-44">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as SupportedLanguage)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm
                  hover:bg-gray-50 transition-colors ${
                  language.code === lang.code
                    ? "text-[#1D9E75] font-semibold bg-green-50"
                    : "text-gray-700"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                <span className="text-xs text-gray-400 ml-auto">
                  {lang.nativeName}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
