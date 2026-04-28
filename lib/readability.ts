import type { ReadabilityResult } from "@/types/readability";

/**
 * Estimates the number of syllables in a single English word.
 * Strips non-alpha characters, handles common suffix rules,
 * and counts contiguous vowel groups as one syllable each.
 */
export function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");

  if (cleaned.length <= 3) return 1;

  let w = cleaned;

  // Remove silent trailing -es, -ed, -e (but keep if vowel precedes -es)
  w = w.replace(/(?:[^aeiou]es|[^aeiou]ed)$/, "");
  w = w.replace(/(?:[^aeiou])e$/, "");

  const matches = w.match(/[aeiou]+/g);
  return Math.max(1, matches ? matches.length : 1);
}

interface GradeEntry {
  minScore: number;
  gradeLevel: string;
  label: string;
}

const GRADE_TABLE: GradeEntry[] = [
  { minScore: 90, gradeLevel: "5th grade",    label: "Very Easy"       },
  { minScore: 80, gradeLevel: "6th grade",    label: "Easy"            },
  { minScore: 70, gradeLevel: "7th grade",    label: "Fairly Easy"     },
  { minScore: 60, gradeLevel: "8-9th grade",  label: "Standard"        },
  { minScore: 50, gradeLevel: "10-12th grade", label: "Fairly Difficult" },
  { minScore: 30, gradeLevel: "College",      label: "Difficult"       },
  { minScore: 0,  gradeLevel: "College+",     label: "Very Difficult"  },
];

/**
 * Analyzes the readability of a body of text using the Flesch Reading Ease formula.
 * Returns null if the text is too short to produce a meaningful score (< 5 words or < 1 sentence).
 * The `suggestions` array is intentionally left empty — it is populated by the AI in the API route.
 */
export function analyzeReadability(
  text: string
): Omit<ReadabilityResult, "_id" | "contentSnippet" | "createdAt"> | null {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);

  if (words.length < 5 || sentences.length < 1) return null;

  const totalSyllables = words.reduce(
    (sum, word) => sum + countSyllables(word),
    0
  );

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = totalSyllables / words.length;

  const rawScore =
    206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;

  const fleschScore = Math.round(Math.min(100, Math.max(0, rawScore)) * 10) / 10;

  const entry =
    GRADE_TABLE.find((g) => fleschScore >= g.minScore) ?? GRADE_TABLE[GRADE_TABLE.length - 1];

  return {
    fleschScore,
    gradeLevel: entry.gradeLevel,
    label: entry.label,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    wordCount: words.length,
    sentenceCount: sentences.length,
    suggestions: [],
  };
}
