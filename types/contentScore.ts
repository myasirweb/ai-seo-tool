export interface ScoreCategory {
  category: string;
  score: number;
  max: number;
  feedback: string;
}

export interface ContentScoreResult {
  _id?: string;
  contentSnippet: string;
  targetKeyword: string;
  score: number;
  breakdown: ScoreCategory[];
  tips: string[];
  createdAt?: Date;
}

export interface ContentScoreRequest {
  content: string;
  targetKeyword: string;
}

export type ContentScoreResponse =
  | { score: number; breakdown: ScoreCategory[]; tips: string[] }
  | { error: string };
