const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.use("/api/hotspots", require("./routes/hotspotRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use("/api/alerts", require("./routes/alertRoutes"));
app.use("/api/trends", require("./routes/trendRoutes"));
app.use("/api/insights", require("./routes/insightRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`EpidemAI API running on port ${PORT}`);
});
