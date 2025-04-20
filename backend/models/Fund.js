import mongoose from "mongoose";

const fundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  risk: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"]
  },
  cagr: {
    type: Number,
    required: true
  }
});

export const Fund = mongoose.model("Fund", fundSchema);
