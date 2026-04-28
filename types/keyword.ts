export interface KeywordItem {
  keyword: string;
  intent: "informational" | "commercial" | "transactional" | "navigational";
  difficulty: "low" | "medium" | "high";
  volume: "low" | "medium" | "high";
}

export interface KeywordResult {
  _id?: string;
  topic: string;
  keywords: KeywordItem[];
  createdAt?: Date;
}

export interface KeywordRequest {
  topic: string;
  count?: number;
}

export type KeywordResponse = { keywords: KeywordItem[] } | { error: string };
