import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const db = await getDB()

    const [keywords, meta, contentScores, readability, blogTitles] =
      await Promise.all([
        db.collection("keyword_results").find({}).sort({ createdAt: -1 }).limit(20).toArray(),
        db.collection("meta_results").find({}).sort({ createdAt: -1 }).limit(20).toArray(),
        db.collection("content_score_results").find({}).sort({ createdAt: -1 }).limit(20).toArray(),
        db.collection("readability_results").find({}).sort({ createdAt: -1 }).limit(20).toArray(),
        db.collection("blog_title_results").find({}).sort({ createdAt: -1 }).limit(20).toArray(),
      ])

    return NextResponse.json({
      keywords,
      meta,
      contentScores,
      readability,
      blogTitles,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch history"
    console.error("History GET error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const db = await getDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const collection = searchParams.get("collection")
    const clearAll = searchParams.get("clearAll")

    if (clearAll === "true") {
      await Promise.all([
        db.collection("keyword_results").deleteMany({}),
        db.collection("meta_results").deleteMany({}),
        db.collection("content_score_results").deleteMany({}),
        db.collection("readability_results").deleteMany({}),
        db.collection("blog_title_results").deleteMany({}),
      ])
      return NextResponse.json({ success: true, message: "All history cleared" })
    }

    if (!id || !collection) {
      return NextResponse.json(
        { error: "id and collection are required" },
        { status: 400 }
      )
    }

    const validCollections = [
      "keyword_results",
      "meta_results",
      "content_score_results",
      "readability_results",
      "blog_title_results",
    ]

    if (!validCollections.includes(collection)) {
      return NextResponse.json(
        { error: "Invalid collection name" },
        { status: 400 }
      )
    }

    await db.collection(collection).deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true, message: "Item deleted" })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete"
    console.error("History DELETE error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
