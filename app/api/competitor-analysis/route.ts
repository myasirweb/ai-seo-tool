import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { callGemini, parseJSON } from "@/lib/gemini"
import { COMPETITOR_ANALYSIS_SYSTEM_PROMPT } from "@/constants/prompts"
import { CompetitorPageData, CompetitorAnalysisResult } from "@/types/competitor"

async function fetchPageData(url: string): Promise<CompetitorPageData> {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SEOBot/1.0)" },
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    throw new Error(`Cannot fetch ${url}: HTTP ${response.status}`)
  }

  const html = await response.text()

  const extractText = (tag: string) => {
    const match = html.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"))
    return match ? match[1].trim() : ""
  }

  const extractMeta = (name: string) => {
    const match = html.match(
      new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`, "i")
    ) || html.match(
      new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`, "i")
    )
    return match ? match[1].trim() : ""
  }

  const count = (pattern: RegExp) => (html.match(pattern) || []).length

  const title = extractText("title")
  const metaDescription = extractMeta("description")
  const h1Count = count(/<h1[^>]*>/gi)
  const h2Count = count(/<h2[^>]*>/gi)
  const h3Count = count(/<h3[^>]*>/gi)
  const imageCount = count(/<img[^>]*>/gi)
  const imagesWithoutAlt = count(/<img(?![^>]*alt=["'][^"']+["'])[^>]*>/gi)
  const hasCanonical = /<link[^>]*rel=["']canonical["']/i.test(html)
  const hasRobotsMeta = /<meta[^>]*name=["']robots["']/i.test(html)

  const baseUrl = new URL(url).origin
  const internalLinks = count(new RegExp(`href=["']${baseUrl}[^"']*["']`, "gi"))
  const allLinks = count(/href=["']https?:\/\/[^"']*["']/gi)
  const externalLinks = Math.max(0, allLinks - internalLinks)

  const textContent = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  const wordCount = textContent.split(" ").filter((w) => w.length > 0).length

  let score = 0
  if (title.length >= 30 && title.length <= 60) score += 20
  else if (title.length > 0) score += 10
  if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 20
  else if (metaDescription.length > 0) score += 10
  if (h1Count === 1) score += 15
  if (h2Count > 0) score += 10
  if (imagesWithoutAlt === 0 && imageCount > 0) score += 15
  if (internalLinks >= 3) score += 10
  if (wordCount >= 300) score += 10

  return {
    url,
    title,
    titleLength: title.length,
    metaDescription,
    metaLength: metaDescription.length,
    h1Count,
    h2Count,
    h3Count,
    wordCount,
    imageCount,
    imagesWithoutAlt,
    internalLinks,
    externalLinks,
    hasCanonical,
    hasRobotsMeta,
    score,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url1, url2 } = body

    if (!url1 || !url2) {
      return NextResponse.json(
        { error: "Both URL 1 and URL 2 are required" },
        { status: 400 }
      )
    }

    const normalize = (u: string) =>
      u.trim().startsWith("http") ? u.trim() : "https://" + u.trim()

    const [page1, page2] = await Promise.all([
      fetchPageData(normalize(url1)),
      fetchPageData(normalize(url2)),
    ])

    const userMessage = `
Page 1 URL: ${page1.url}
- Title: "${page1.title}" (${page1.titleLength} chars)
- Meta Description: ${page1.metaLength} chars
- H1: ${page1.h1Count}, H2: ${page1.h2Count}, H3: ${page1.h3Count}
- Word Count: ${page1.wordCount}
- Images: ${page1.imageCount} (${page1.imagesWithoutAlt} missing alt)
- Internal Links: ${page1.internalLinks}
- SEO Score: ${page1.score}/100

Page 2 URL: ${page2.url}
- Title: "${page2.title}" (${page2.titleLength} chars)
- Meta Description: ${page2.metaLength} chars
- H1: ${page2.h1Count}, H2: ${page2.h2Count}, H3: ${page2.h3Count}
- Word Count: ${page2.wordCount}
- Images: ${page2.imageCount} (${page2.imagesWithoutAlt} missing alt)
- Internal Links: ${page2.internalLinks}
- SEO Score: ${page2.score}/100
`

    const rawResponse = await callGemini(
      COMPETITOR_ANALYSIS_SYSTEM_PROMPT,
      userMessage
    )
    const aiResult = parseJSON<{
      winners: CompetitorAnalysisResult["winners"]
      overallWinner: CompetitorAnalysisResult["overallWinner"]
      overallReason: string
      page1Suggestions: string[]
      page2Suggestions: string[]
    }>(rawResponse)

    const result: CompetitorAnalysisResult = {
      page1,
      page2,
      winners: aiResult.winners,
      overallWinner: aiResult.overallWinner,
      overallReason: aiResult.overallReason,
      page1Suggestions: aiResult.page1Suggestions,
      page2Suggestions: aiResult.page2Suggestions,
    }

    const db = await getDB()
    await db.collection("competitor_results").insertOne({
      ...result,
      createdAt: new Date(),
    })

    return NextResponse.json({ result })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Competitor analysis failed"
    console.error("Competitor Analysis error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
