import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { callGemini, parseJSON } from "@/lib/gemini"
import { BLOG_TITLE_SYSTEM_PROMPT } from "@/constants/prompts"
import { getLanguageByCode } from "@/constants/languages"
import { BlogTitleItem } from "@/types/blogTitle"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { keyword, count = 10, language = "en" } = body

    if (!keyword || typeof keyword !== "string" || keyword.trim().length === 0) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      )
    }

    const lang = getLanguageByCode(language)
    const userMessage = `${lang.geminiInstruction}\nTarget keyword: "${keyword.trim()}". Generate ${count} blog titles.`
    const rawResponse = await callGemini(BLOG_TITLE_SYSTEM_PROMPT, userMessage)
    const titles = parseJSON<BlogTitleItem[]>(rawResponse)

    const db = await getDB()
    await db.collection("blog_title_results").insertOne({
      keyword: keyword.trim(),
      titles,
      createdAt: new Date(),
    })

    return NextResponse.json({ titles })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate blog titles"
    console.error("Blog titles API error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
