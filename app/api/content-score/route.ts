import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { callGemini, parseJSON } from "@/lib/gemini";
import { CONTENT_SCORE_SYSTEM_PROMPT } from "@/constants/prompts";
import { getLanguageByCode } from "@/constants/languages";
import type { ContentScoreRequest, ScoreCategory } from "@/types/contentScore";

interface ScorePayload {
  score: number;
  breakdown: ScoreCategory[];
  tips: string[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: ContentScoreRequest = await req.json();
    const { content, targetKeyword, language = "en" } = body as typeof body & { language?: string };

    if (!content || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    if (!targetKeyword || targetKeyword.trim() === "") {
      return NextResponse.json({ error: "Target keyword is required" }, { status: 400 });
    }
    if (content.trim().length < 50) {
      return NextResponse.json({ error: "Content is too short to score (minimum 50 characters)" }, { status: 400 });
    }

    const db = await getDB();

    const truncatedContent = content.slice(0, 3000);
    const lang = getLanguageByCode(language);
    const userMessage = `${lang.geminiInstruction}\nTarget keyword: ${targetKeyword.trim()}\n\nContent:\n${truncatedContent}`;

    const raw = await callGemini(CONTENT_SCORE_SYSTEM_PROMPT, userMessage);
    const parsed = parseJSON<ScorePayload>(raw);

    const score = Math.min(100, Math.max(0, parsed.score));

    await db.collection("content_score_results").insertOne({ contentSnippet: content.slice(0, 100), targetKeyword: targetKeyword.trim(), score, breakdown: parsed.breakdown, tips: parsed.tips, createdAt: new Date() });

    return NextResponse.json({ score, breakdown: parsed.breakdown, tips: parsed.tips }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[content-score] POST error:", message);
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
