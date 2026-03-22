const Hotspot = require("../models/Hotspot");

exports.getHotspots = async (req, res, next) => {
  try {
    const { disease, city } = req.query;
    const filter = {};
    if (disease && disease !== "All Diseases") filter.disease = disease;
    if (city) filter.name = { $regex: city, $options: "i" };
    const hotspots = await Hotspot.find(filter);
    res.json(hotspots);
  } catch (err) {
    next(err);
  }
};
