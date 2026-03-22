const mongoose = require("mongoose");

const statEntrySchema = new mongoose.Schema({
  disease: { type: String, required: true },
  period: { type: String, required: true },
  value: String,
  subtitle: String,
  trend: { type: String, enum: ["up", "down"] },
  spark: [{ v: Number }],
});

module.exports = mongoose.model("StatEntry", statEntrySchema);
