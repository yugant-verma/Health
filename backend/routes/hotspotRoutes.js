const router = require("express").Router();
const { getHotspots } = require("../controllers/hotspotController");

router.get("/", getHotspots);

module.exports = router;
