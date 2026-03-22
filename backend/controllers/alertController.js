const Alert = require("../models/Alert");

exports.getAlerts = async (req, res, next) => {
  try {
    const { disease, city } = req.query;
    const filter = {};
    if (disease && disease !== "All Diseases") filter.disease = disease;
    if (city) filter.location = { $regex: city, $options: "i" };
    const alerts = await Alert.find(filter);
    res.json(alerts);
  } catch (err) {
    next(err);
  }
};
