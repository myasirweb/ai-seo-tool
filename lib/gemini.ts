import { GoogleGenerativeAI } from "@google/generative-ai"

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables")
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export function getGeminiClient() {
  return genAI
}

export async function callGemini(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel(
      {
        model: "gemini-2.0-flash-lite",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }
    )

    const fullPrompt = `${systemPrompt}\n\nUser request: ${userMessage}`
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gemini API call failed"
    throw new Error(`Gemini Error: ${message}`)
  }
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
