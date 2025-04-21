import mongoose from "mongoose";

const fundSchema = new mongoose.Schema({
  schemeCode: {
    type: Number,
    required: true,
    unique: true
  },
  risk: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"]
  }
});

export const Fund = mongoose.model("Fund", fundSchema);
