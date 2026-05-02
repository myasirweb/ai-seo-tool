import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { callGemini, parseJSON } from "@/lib/gemini";
import { META_SYSTEM_PROMPT } from "@/constants/prompts";
import type { MetaRequest, MetaVariant } from "@/types/meta";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: MetaRequest = await req.json();
    const { topic, targetKeyword, tone } = body;

    if (!topic || topic.trim() === "") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }
    if (!targetKeyword || targetKeyword.trim() === "") {
      return NextResponse.json({ error: "Target keyword is required" }, { status: 400 });
    }

    const db = await getDB();

    const userMessage = `Topic: ${topic.trim()}\nTarget keyword: ${targetKeyword.trim()}\nTone: ${tone ?? "professional"}`;
    const raw = await callGemini(META_SYSTEM_PROMPT, userMessage);
    const variants = parseJSON<MetaVariant[]>(raw);

    const sanitized: MetaVariant[] = variants.map((v) => ({
      title: v.title.length > 60 ? v.title.slice(0, 60).trim() : v.title,
      description: v.description.length > 160 ? v.description.slice(0, 160).trim() : v.description,
    }));

    await db.collection("meta_results").insertOne({ topic: topic.trim(), targetKeyword: targetKeyword.trim(), variants: sanitized, createdAt: new Date() });

    return NextResponse.json({ variants: sanitized }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[meta] POST error:", message);
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
