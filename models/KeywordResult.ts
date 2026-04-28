import mongoose, { Schema, type Model } from "mongoose";
import type { KeywordResult } from "@/types/keyword";

const KeywordItemSchema = new Schema(
  {
    keyword:    { type: String, required: true },
    intent:     { type: String, required: true },
    difficulty: { type: String, required: true },
    volume:     { type: String, required: true },
  },
  { _id: false }
);

const KeywordResultSchema = new Schema<KeywordResult>({
  topic:     { type: String, required: true },
  keywords:  { type: [KeywordItemSchema], required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const KeywordResultModel: Model<KeywordResult> =
  mongoose.models.KeywordResult ||
  mongoose.model<KeywordResult>("KeywordResult", KeywordResultSchema);

export default KeywordResultModel;
