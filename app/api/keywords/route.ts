import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { callGemini, parseJSON } from "@/lib/gemini";
import { KEYWORD_SYSTEM_PROMPT } from "@/constants/prompts";
import type { KeywordRequest, KeywordItem } from "@/types/keyword";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: KeywordRequest = await req.json();
    const { topic, count } = body;

    if (!topic || topic.trim() === "") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const db = await getDB();

    const userMessage = `Topic: ${topic.trim()}. Generate ${count ?? 10} keywords.`;
    const raw = await callGemini(KEYWORD_SYSTEM_PROMPT, userMessage);
    const keywords = parseJSON<KeywordItem[]>(raw);

    await db.collection("keyword_results").insertOne({ topic: topic.trim(), keywords, createdAt: new Date() });

    return NextResponse.json({ keywords }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[keywords] POST error:", message);
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
