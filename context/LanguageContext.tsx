"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import {
  SupportedLanguage,
  Language,
  DEFAULT_LANGUAGE,
  getLanguageByCode,
} from "@/constants/languages"

interface LanguageContextType {
  language: Language
  setLanguage: (code: SupportedLanguage) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    const saved = localStorage.getItem("seo-tool-language")
    if (saved) setLanguageState(getLanguageByCode(saved))
  }, [])

  const setLanguage = (code: SupportedLanguage) => {
    const lang = getLanguageByCode(code)
    setLanguageState(lang)
    localStorage.setItem("seo-tool-language", code)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
