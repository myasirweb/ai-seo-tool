/**
 * Content scoring logic is handled inline in app/api/content-score/route.ts
 * via the AI prompt in constants/prompts.ts (CONTENT_SCORE_SYSTEM_PROMPT).
 *
 * This file is reserved for any future client-side or pre-processing
 * content analysis utilities (e.g. keyword density, word count checks).
 */

export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length;
}

export function getKeywordDensity(text: string, keyword: string): number {
  if (!keyword.trim()) return 0;
  const words = text.toLowerCase().split(/\s+/);
  const kw = keyword.toLowerCase().trim();
  const matches = words.filter((w) => w.includes(kw)).length;
  return words.length > 0 ? Math.round((matches / words.length) * 1000) / 10 : 0;
}
