const router = require("express").Router();
const { getInsights } = require("../controllers/insightController");

router.get("/", getInsights);

module.exports = router;
