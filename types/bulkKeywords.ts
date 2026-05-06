export interface BulkKeywordTopic {
  topic: string
  keywords: {
    keyword: string
    intent: string
    difficulty: string
    volume: string
  }[]
  status: "success" | "error"
  error?: string
}

export interface BulkKeywordRequest {
  topics: string[]
}

export type BulkKeywordResponse =
  | { results: BulkKeywordTopic[] }
  | { error: string }
