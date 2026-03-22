const mongoose = require("mongoose");

const newsItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  source: { type: String, required: true },
  time: { type: String, required: true },
  keywords: [String],
  url: String,
});

module.exports = mongoose.model("NewsItem", newsItemSchema);
