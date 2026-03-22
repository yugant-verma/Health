const router = require("express").Router();
const { getTrends } = require("../controllers/trendController");

router.get("/", getTrends);

module.exports = router;
