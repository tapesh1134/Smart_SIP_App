const mongoose = require('mongoose');

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

const Fund = mongoose.model('Fund', fundSchema);

module.exports = Fund;
