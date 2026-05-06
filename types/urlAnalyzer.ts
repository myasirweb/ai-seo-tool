export interface SeoCheck {
  name: string
  status: "pass" | "fail" | "warning"
  value: string
  recommendation: string
}

export interface UrlAnalyzerResult {
  url: string
  score: number
  checks: SeoCheck[]
  suggestions: string[]
  pageData: {
    title: string
    metaDescription: string
    h1Count: number
    h2Count: number
    h3Count: number
    imageCount: number
    imagesWithoutAlt: number
    internalLinks: number
    externalLinks: number
    wordCount: number
    canonicalUrl: string
    robotsMeta: string
  }
  createdAt?: Date
}

export interface UrlAnalyzerRequest {
  url: string
}

export type UrlAnalyzerResponse =
  | { result: UrlAnalyzerResult }
  | { error: string }
