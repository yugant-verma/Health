const StatEntry = require("../models/StatEntry");

exports.getStats = async (req, res, next) => {
  try {
    const { disease = "All Diseases", period = "Last 7 days" } = req.query;
    const entry = await StatEntry.findOne({ disease, period });
    if (!entry) {
      const fallback = await StatEntry.findOne({ disease: "All Diseases", period: "Last 7 days" });
      return res.json(fallback);
    }
    res.json(entry);
  } catch (err) {
    next(err);
  }
};
