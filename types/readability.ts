export interface ReadabilityResult {
  _id?: string;
  contentSnippet: string;
  fleschScore: number;
  gradeLevel: string;
  label: string;
  avgSentenceLength: number;
  wordCount: number;
  sentenceCount: number;
  suggestions: string[];
  createdAt?: Date;
}

export interface ReadabilityRequest {
  content: string;
}

export type ReadabilityResponse =
  | Omit<ReadabilityResult, "_id" | "contentSnippet" | "createdAt">
  | { error: string };
