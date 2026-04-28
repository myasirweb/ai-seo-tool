import mongoose, { Schema, type Model } from "mongoose";
import type { ContentScoreResult } from "@/types/contentScore";

const ScoreCategorySchema = new Schema(
  {
    category: { type: String, required: true },
    score:    { type: Number, required: true },
    max:      { type: Number, required: true },
    feedback: { type: String, required: true },
  },
  { _id: false }
);

const ContentScoreResultSchema = new Schema<ContentScoreResult>({
  contentSnippet: { type: String, required: true },
  targetKeyword:  { type: String, required: true },
  score:          { type: Number, required: true },
  breakdown:      { type: [ScoreCategorySchema], required: true },
  tips:           { type: [String], required: true },
  createdAt:      { type: Date, default: () => new Date() },
});

const ContentScoreResultModel: Model<ContentScoreResult> =
  mongoose.models.ContentScoreResult ||
  mongoose.model<ContentScoreResult>("ContentScoreResult", ContentScoreResultSchema);

export default ContentScoreResultModel;
