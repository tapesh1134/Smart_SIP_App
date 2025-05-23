import mongoose from "mongoose";

const indexSchema = new mongoose.Schema({
  name: String,
  type: String,
  current_value: Number,
  oneYearCAGR: Number,
  risk: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
  }
});

export const Index = mongoose.model("Index", indexSchema);
