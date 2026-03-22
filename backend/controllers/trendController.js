const TrendData = require("../models/TrendData");

exports.getTrends = async (req, res, next) => {
  try {
    const { period = "Last 7 days" } = req.query;
    const data = await TrendData.findOne({ period });
    res.json(data || { period, points: [] });
  } catch (err) {
    next(err);
  }
};
