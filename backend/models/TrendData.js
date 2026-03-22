const mongoose = require("mongoose");

const trendDataSchema = new mongoose.Schema({
  period: { type: String, required: true },
  points: [{
    day: String,
    dengue: Number,
    flu: Number,
    tb: Number,
    covid: Number,
    malaria: Number,
  }],
});

module.exports = mongoose.model("TrendData", trendDataSchema);
