const Insight = require("../models/Insight");

exports.getInsights = async (req, res, next) => {
  try {
    const insights = await Insight.find();
    res.json(insights);
  } catch (err) {
    next(err);
  }
};
