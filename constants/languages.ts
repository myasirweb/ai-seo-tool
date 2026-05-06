export type SupportedLanguage = "en" | "ur" | "ar" | "hi"

export interface Language {
  code: SupportedLanguage
  name: string
  nativeName: string
  flag: string
  direction: "ltr" | "rtl"
  geminiInstruction: string
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    direction: "ltr",
    geminiInstruction: "Respond in English.",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
    direction: "rtl",
    geminiInstruction: "Respond in Urdu language (Roman Urdu is acceptable). All keywords, suggestions, and text must be in Urdu.",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    direction: "rtl",
    geminiInstruction: "Respond in Arabic language. All keywords, suggestions, and text must be in Arabic.",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिंदी",
    flag: "🇮🇳",
    direction: "ltr",
    geminiInstruction: "Respond in Hindi language. All keywords, suggestions, and text must be in Hindi.",
  },
]

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0]

export function getLanguageByCode(code: string): Language {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || DEFAULT_LANGUAGE
}
