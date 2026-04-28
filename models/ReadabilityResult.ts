import mongoose, { Schema, type Model } from "mongoose";
import type { ReadabilityResult } from "@/types/readability";

const ReadabilityResultSchema = new Schema<ReadabilityResult>({
  contentSnippet:    { type: String },
  fleschScore:       { type: Number },
  gradeLevel:        { type: String },
  label:             { type: String },
  avgSentenceLength: { type: Number },
  wordCount:         { type: Number },
  sentenceCount:     { type: Number },
  suggestions:       { type: [String] },
  createdAt:         { type: Date, default: () => new Date() },
});

const ReadabilityResultModel: Model<ReadabilityResult> =
  mongoose.models.ReadabilityResult ||
  mongoose.model<ReadabilityResult>("ReadabilityResult", ReadabilityResultSchema);

export default ReadabilityResultModel;
