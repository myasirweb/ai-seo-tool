export interface CompetitorPageData {
  url: string
  title: string
  titleLength: number
  metaDescription: string
  metaLength: number
  h1Count: number
  h2Count: number
  h3Count: number
  wordCount: number
  imageCount: number
  imagesWithoutAlt: number
  internalLinks: number
  externalLinks: number
  hasCanonical: boolean
  hasRobotsMeta: boolean
  score: number
}

export interface CompetitorWinner {
  category: string
  winner: "page1" | "page2" | "tie"
  reason: string
}

export interface CompetitorAnalysisResult {
  page1: CompetitorPageData
  page2: CompetitorPageData
  winners: CompetitorWinner[]
  overallWinner: "page1" | "page2" | "tie"
  overallReason: string
  page1Suggestions: string[]
  page2Suggestions: string[]
  createdAt?: Date
}

export interface CompetitorRequest {
  url1: string
  url2: string
}

export type CompetitorResponse =
  | { result: CompetitorAnalysisResult }
  | { error: string }
