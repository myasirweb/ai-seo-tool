import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { callGemini, parseJSON } from "@/lib/gemini"
import { URL_ANALYZER_SYSTEM_PROMPT } from "@/constants/prompts"
import { SeoCheck, UrlAnalyzerResult } from "@/types/urlAnalyzer"

function extractText(html: string, tag: string): string {
  const match = html.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"))
  return match ? match[1].trim() : ""
}

function extractMeta(html: string, name: string): string {
  const match = html.match(
    new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`, "i")
  ) || html.match(
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`, "i")
  )
  return match ? match[1].trim() : ""
}

function countMatches(html: string, pattern: RegExp): number {
  return (html.match(pattern) || []).length
}

function analyzeHTML(html: string, url: string) {
  const title = extractText(html, "title")
  const metaDescription = extractMeta(html, "description")
  const canonicalUrl = (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) || [])[1] || ""
  const robotsMeta = extractMeta(html, "robots")

  const h1Count = countMatches(html, /<h1[^>]*>/gi)
  const h2Count = countMatches(html, /<h2[^>]*>/gi)
  const h3Count = countMatches(html, /<h3[^>]*>/gi)
  const imageCount = countMatches(html, /<img[^>]*>/gi)
  const imagesWithoutAlt = countMatches(html, /<img(?![^>]*alt=["'][^"']+["'])[^>]*>/gi)

  const baseUrl = new URL(url).origin
  const internalLinks = countMatches(html, new RegExp(`href=["']${baseUrl}[^"']*["']`, "gi"))
  const externalLinks = countMatches(html, /href=["']https?:\/\/[^"']*["']/gi) - internalLinks

  const textContent = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  const wordCount = textContent.split(" ").filter((w) => w.length > 0).length

  const checks: SeoCheck[] = [
    {
      name: "Title Tag",
      status: title.length >= 30 && title.length <= 60 ? "pass" : title.length > 0 ? "warning" : "fail",
      value: title ? `"${title}" (${title.length} chars)` : "Missing",
      recommendation: title.length === 0 ? "Add a title tag between 50-60 characters" :
        title.length > 60 ? "Title is too long — keep it under 60 characters" :
        title.length < 30 ? "Title is too short — aim for 50-60 characters" : "Good length",
    },
    {
      name: "Meta Description",
      status: metaDescription.length >= 120 && metaDescription.length <= 160 ? "pass" :
        metaDescription.length > 0 ? "warning" : "fail",
      value: metaDescription ? `${metaDescription.length} chars` : "Missing",
      recommendation: metaDescription.length === 0 ? "Add a meta description between 120-160 characters" :
        metaDescription.length > 160 ? "Too long — keep under 160 characters" :
        metaDescription.length < 120 ? "Too short — aim for 120-160 characters" : "Good",
    },
    {
      name: "H1 Tag",
      status: h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warning",
      value: `${h1Count} H1 tag${h1Count !== 1 ? "s" : ""} found`,
      recommendation: h1Count === 0 ? "Add exactly one H1 tag to the page" :
        h1Count > 1 ? "Use only one H1 tag per page" : "Perfect",
    },
    {
      name: "Heading Structure",
      status: h2Count > 0 ? "pass" : "warning",
      value: `H2: ${h2Count}, H3: ${h3Count}`,
      recommendation: h2Count === 0 ? "Add H2 subheadings to structure your content" : "Good structure",
    },
    {
      name: "Image Alt Text",
      status: imagesWithoutAlt === 0 ? "pass" : imagesWithoutAlt <= 2 ? "warning" : "fail",
      value: `${imagesWithoutAlt} of ${imageCount} images missing alt text`,
      recommendation: imagesWithoutAlt > 0 ? `Add alt text to ${imagesWithoutAlt} image(s)` : "All images have alt text",
    },
    {
      name: "Internal Links",
      status: internalLinks >= 3 ? "pass" : internalLinks >= 1 ? "warning" : "fail",
      value: `${internalLinks} internal links found`,
      recommendation: internalLinks === 0 ? "Add internal links to other pages on your site" :
        internalLinks < 3 ? "Add more internal links for better SEO" : "Good",
    },
    {
      name: "Content Length",
      status: wordCount >= 300 ? "pass" : wordCount >= 150 ? "warning" : "fail",
      value: `${wordCount} words`,
      recommendation: wordCount < 300 ? "Add more content — aim for at least 300 words" : "Good content length",
    },
    {
      name: "Canonical URL",
      status: canonicalUrl ? "pass" : "warning",
      value: canonicalUrl || "Not set",
      recommendation: !canonicalUrl ? "Add a canonical URL tag to prevent duplicate content issues" : "Good",
    },
  ]

  return {
    title, metaDescription, h1Count, h2Count, h3Count,
    imageCount, imagesWithoutAlt, internalLinks,
    externalLinks: Math.max(0, externalLinks),
    wordCount, canonicalUrl, robotsMeta, checks,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Valid URL is required" }, { status: 400 })
    }

    let normalizedUrl = url.trim()
    if (!normalizedUrl.startsWith("http")) {
      normalizedUrl = "https://" + normalizedUrl
    }

    const fetchResponse = await fetch(normalizedUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SEOBot/1.0)" },
      signal: AbortSignal.timeout(10000),
    })

    if (!fetchResponse.ok) {
      return NextResponse.json(
        { error: `Could not fetch URL: HTTP ${fetchResponse.status}` },
        { status: 400 }
      )
    }

    const html = await fetchResponse.text()
    const { checks, ...pageData } = analyzeHTML(html, normalizedUrl)

    const passCount = checks.filter((c) => c.status === "pass").length
    const baseScore = Math.round((passCount / checks.length) * 70)

    const userMessage = `
URL: ${normalizedUrl}
Title: "${pageData.title}" (${pageData.title.length} chars)
Meta Description: "${pageData.metaDescription}" (${pageData.metaDescription.length} chars)
H1 tags: ${pageData.h1Count}
H2 tags: ${pageData.h2Count}
Images: ${pageData.imageCount} total, ${pageData.imagesWithoutAlt} missing alt text
Internal links: ${pageData.internalLinks}
Word count: ${pageData.wordCount}
Canonical: ${pageData.canonicalUrl || "not set"}
`
    const rawResponse = await callGemini(URL_ANALYZER_SYSTEM_PROMPT, userMessage)
    const aiResult = parseJSON<{ score: number; suggestions: string[] }>(rawResponse)

    const finalScore = Math.min(100, Math.max(0, Math.round((baseScore + aiResult.score) / 2)))

    const result: UrlAnalyzerResult = {
      url: normalizedUrl,
      score: finalScore,
      checks,
      suggestions: aiResult.suggestions,
      pageData,
    }

    const db = await getDB()
    await db.collection("url_analyzer_results").insertOne({
      ...result,
      createdAt: new Date(),
    })

    return NextResponse.json({ result })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to analyze URL"
    console.error("URL Analyzer error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
