import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { callGemini, parseJSON } from "@/lib/gemini"
import { KEYWORD_SYSTEM_PROMPT } from "@/constants/prompts"
import { BulkKeywordTopic } from "@/types/bulkKeywords"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topics } = body

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json({ error: "Topics array is required" }, { status: 400 })
    }

    if (topics.length > 5) {
      return NextResponse.json({ error: "Maximum 5 topics allowed at once" }, { status: 400 })
    }

    const results: BulkKeywordTopic[] = []

    for (const topic of topics) {
      if (!topic.trim()) continue
      try {
        const raw = await callGemini(KEYWORD_SYSTEM_PROMPT, `Topic: ${topic.trim()}. Generate 10 keywords.`)
        const keywords = parseJSON<BulkKeywordTopic["keywords"]>(raw)
        results.push({ topic: topic.trim(), keywords, status: "success" })
      } catch {
        results.push({ topic: topic.trim(), keywords: [], status: "error", error: "Failed to generate" })
      }
    }

    const db = await getDB()
    await db.collection("bulk_keyword_results").insertOne({
      topics,
      results,
      createdAt: new Date(),
    })

    return NextResponse.json({ results })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bulk keyword research failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
