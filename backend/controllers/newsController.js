const NewsItem = require("../models/NewsItem");

exports.getNews = async (req, res, next) => {
  try {
    const news = await NewsItem.find().sort({ _id: -1 });
    res.json(news);
  } catch (err) {
    next(err);
  }
};
