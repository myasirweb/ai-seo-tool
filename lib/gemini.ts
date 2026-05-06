import { GoogleGenerativeAI } from "@google/generative-ai"

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables")
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export function getGeminiClient() {
  return genAI
}

const GEMINI_MODEL = "gemini-2.0-flash-lite"

export async function callGemini(
  systemPrompt: string,
  userMessage: string,
  retries = 3
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
  })

  const fullPrompt = `${systemPrompt}\n\nUser request: ${userMessage}`

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(fullPrompt)
      return result.response.text()
    } catch (error) {
      const message = error instanceof Error ? error.message : ""
      const is429 = message.includes("429") || message.includes("Too Many Requests") || message.includes("RESOURCE_EXHAUSTED")

      if (is429 && attempt < retries) {
        const retryMatch = message.match(/retry.*?(\d+)s/i)
        const waitMs = retryMatch ? parseInt(retryMatch[1]) * 1000 : (attempt + 1) * 5000
        await new Promise((res) => setTimeout(res, waitMs))
        continue
      }

      if (is429) {
        console.error("[Gemini 429 full error]", error)
        throw new Error("Gemini API rate limit reached. Please wait a moment and try again.")
      }

      console.error("[Gemini error]", error)
      throw new Error(`Gemini Error: ${message || "API call failed"}`)
    }
  }

  throw new Error("Gemini API call failed after retries.")
}

export function parseJSON<T>(text: string): T {
  try {
    const cleaned = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()
    return JSON.parse(cleaned) as T
  } catch {
    throw new Error("Failed to parse JSON response from Gemini")
  }
}

export default genAI