const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  location: { type: String, required: true },
  shortCode: { type: String, required: true },
  disease: { type: String, required: true },
  confidence: { type: Number, required: true },
  type: { type: String, required: true },
  time: { type: String, required: true },
  zone: { type: String, required: true },
});

module.exports = mongoose.model("Alert", alertSchema);
