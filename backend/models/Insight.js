const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  type: { type: String, required: true },
  text: { type: String, required: true },
  confidence: { type: Number, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Insight", insightSchema);
