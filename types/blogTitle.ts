export type TitleType =
  | "how-to"
  | "listicle"
  | "question"
  | "ultimate-guide"
  | "case-study"
  | "news"
  | "comparison"

export interface BlogTitleItem {
  title: string
  type: TitleType
  reason: string
}

export interface BlogTitleRequest {
  keyword: string
  count?: number
}

export type BlogTitleResponse =
  | { titles: BlogTitleItem[] }
  | { error: string }

export interface BlogTitleResult {
  _id?: string
  keyword: string
  titles: BlogTitleItem[]
  createdAt?: Date
}
