const mongoose = require("mongoose");

const hotspotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: { type: [Number], required: true },
  risk: { type: String, enum: ["high", "moderate", "low"], required: true },
  disease: { type: String, required: true },
  cases: { type: Number, required: true },
  riskScore: { type: Number, required: true },
  symptoms: [String],
  news: [String],
  prediction7d: [Number],
});

module.exports = mongoose.model("Hotspot", hotspotSchema);
