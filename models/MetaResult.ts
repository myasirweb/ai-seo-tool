import mongoose, { Schema, type Model } from "mongoose";
import type { MetaResult } from "@/types/meta";

const MetaVariantSchema = new Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const MetaResultSchema = new Schema<MetaResult>({
  topic:         { type: String, required: true },
  targetKeyword: { type: String, required: true },
  variants:      { type: [MetaVariantSchema], required: true },
  createdAt:     { type: Date, default: () => new Date() },
});

const MetaResultModel: Model<MetaResult> =
  mongoose.models.MetaResult ||
  mongoose.model<MetaResult>("MetaResult", MetaResultSchema);

export default MetaResultModel;
