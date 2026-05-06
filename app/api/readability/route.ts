import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { callGemini, parseJSON } from "@/lib/gemini";
import { READABILITY_SYSTEM_PROMPT } from "@/constants/prompts";
import { getLanguageByCode } from "@/constants/languages";
import { analyzeReadability } from "@/lib/readability";
import type { ReadabilityRequest } from "@/types/readability";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: ReadabilityRequest = await req.json();
    const { content, language = "en" } = body as typeof body & { language?: string };

    if (!content || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const analysis = analyzeReadability(content);
    if (analysis === null) {
      return NextResponse.json(
        { error: "Content too short to analyze. Please enter at least a few complete sentences." },
        { status: 400 }
      );
    }

    const { fleschScore, gradeLevel, label, avgSentenceLength, wordCount, sentenceCount } = analysis;

    const db = await getDB();

    const lang = getLanguageByCode(language);
    const userMessage = `${lang.geminiInstruction}\nFlesch score: ${fleschScore} (${label}). Avg sentence length: ${avgSentenceLength} words. Word count: ${wordCount}.\nContent sample:\n${content.slice(0, 800)}`;

    const raw = await callGemini(READABILITY_SYSTEM_PROMPT, userMessage);
    const suggestions = parseJSON<string[]>(raw);

    await db.collection("readability_results").insertOne({ contentSnippet: content.slice(0, 100), fleschScore, gradeLevel, label, avgSentenceLength, wordCount, sentenceCount, suggestions, createdAt: new Date() });

    return NextResponse.json(
      { fleschScore, gradeLevel, label, avgSentenceLength, wordCount, sentenceCount, suggestions },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[readability] POST error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
