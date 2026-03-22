const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Hotspot = require("../models/Hotspot");
const Alert = require("../models/Alert");
const Insight = require("../models/Insight");
const NewsItem = require("../models/NewsItem");
const StatEntry = require("../models/StatEntry");
const TrendData = require("../models/TrendData");

const hotspots = [
  { name: "Delhi", coordinates: [77.1025, 28.7041], risk: "high", disease: "Dengue", cases: 1247, riskScore: 87, symptoms: ["Fever", "Joint pain", "Rash", "Headache"], news: ["200+ new dengue cases reported", "Fogging drives intensified"], prediction7d: [180, 210, 230, 260, 280, 250, 240] },
  { name: "Mumbai", coordinates: [72.8777, 19.076], risk: "high", disease: "TB", cases: 892, riskScore: 72, symptoms: ["Cough", "Weight loss", "Night sweats"], news: ["TB cases rise post-monsoon", "New treatment center opens"], prediction7d: [120, 130, 145, 155, 160, 150, 148] },
  { name: "Kolkata", coordinates: [88.3639, 22.5726], risk: "moderate", disease: "Dengue", cases: 654, riskScore: 58, symptoms: ["Fever", "Fatigue", "Muscle pain"], news: ["Dengue surge near Howrah area", "Hospital beds filling up"], prediction7d: [80, 95, 105, 115, 110, 100, 95] },
  { name: "Chennai", coordinates: [80.2707, 13.0827], risk: "moderate", disease: "Dengue", cases: 523, riskScore: 45, symptoms: ["Fever", "Nausea", "Skin rash"], news: ["Seasonal dengue uptick reported"], prediction7d: [60, 70, 80, 85, 90, 82, 78] },
  { name: "Bangalore", coordinates: [77.5946, 12.9716], risk: "low", disease: "Flu", cases: 312, riskScore: 32, symptoms: ["Cough", "Cold", "Sore throat"], news: ["Mild flu season in Karnataka"], prediction7d: [40, 42, 38, 35, 33, 30, 28] },
  { name: "Lucknow", coordinates: [80.9462, 26.8467], risk: "moderate", disease: "Flu", cases: 478, riskScore: 63, symptoms: ["Fever", "Cough", "Body aches"], news: ["Flu outbreak in UP schools", "Vaccination drives planned"], prediction7d: [70, 85, 95, 100, 105, 98, 90] },
  { name: "Hyderabad", coordinates: [78.4867, 17.385], risk: "low", disease: "Dengue", cases: 289, riskScore: 28, symptoms: ["Mild fever", "Headache"], news: ["Cases below seasonal average"], prediction7d: [30, 32, 28, 25, 22, 20, 18] },
  { name: "Jaipur", coordinates: [75.7873, 26.9124], risk: "moderate", disease: "Flu", cases: 367, riskScore: 52, symptoms: ["Fever", "Congestion", "Fatigue"], news: ["Flu cases rising in Rajasthan"], prediction7d: [50, 58, 65, 70, 68, 62, 55] },
  { name: "Ahmedabad", coordinates: [72.5714, 23.0225], risk: "low", disease: "Dengue", cases: 198, riskScore: 22, symptoms: ["Fever", "Headache"], news: ["Stable outbreak levels"], prediction7d: [20, 22, 25, 23, 21, 19, 18] },
  { name: "Pune", coordinates: [73.8567, 18.5204], risk: "moderate", disease: "TB", cases: 445, riskScore: 55, symptoms: ["Persistent cough", "Fatigue", "Weight loss"], news: ["TB screening camps organized", "New drug-resistant strain reported"], prediction7d: [55, 62, 68, 72, 75, 70, 65] },
];

const alerts = [
  { location: "Rohini, Delhi", shortCode: "RD", disease: "Dengue", confidence: 82, type: "Cluster Detected", time: "47 min ago", zone: "North Delhi" },
  { location: "Anand Vihar", shortCode: "AV", disease: "Flu", confidence: 74, type: "Spike Alert", time: "34 min ago", zone: "East Delhi" },
  { location: "Dharavi, Mumbai", shortCode: "DM", disease: "TB", confidence: 68, type: "Dropout Risk", time: "19 min ago", zone: "Mumbai Central" },
  { location: "Howrah, Kolkata", shortCode: "HK", disease: "Dengue", confidence: 71, type: "Cluster Detected", time: "1 hr ago", zone: "South Kolkata" },
  { location: "Lucknow Central", shortCode: "LC", disease: "Flu", confidence: 65, type: "Spike Alert", time: "2 hr ago", zone: "Central UP" },
  { location: "Pune East", shortCode: "PE", disease: "TB", confidence: 60, type: "Cluster Detected", time: "3 hr ago", zone: "Pune District" },
  { location: "Jaipur Old City", shortCode: "JO", disease: "Malaria", confidence: 55, type: "Spike Alert", time: "5 hr ago", zone: "Rajasthan" },
  { location: "Chennai Marina", shortCode: "CM", disease: "Dengue", confidence: 78, type: "Cluster Detected", time: "6 hr ago", zone: "South Chennai" },
];

const insights = [
  { icon: "TrendingUp", type: "Trend Alert", text: "Dengue mentions in Delhi have risen 340% over the past 72 hours, correlating with post-monsoon stagnant water reports.", confidence: 89, color: "text-danger" },
  { icon: "CloudRain", type: "Weather Correlation", text: "Heavy rainfall in Mumbai (120mm in 48h) historically precedes a 2-3 week spike in dengue cases. Preemptive fogging recommended.", confidence: 76, color: "text-info" },
  { icon: "Thermometer", type: "Seasonal Pattern", text: "Flu season peaking in Northern India. Uttar Pradesh and Rajasthan show 15% above historical average for this period.", confidence: 82, color: "text-warning" },
  { icon: "AlertTriangle", type: "Anomaly Detected", text: "Unusual TB mention cluster near Dharavi, Mumbai. 23 social media posts in 24 hours mentioning persistent cough and weight loss.", confidence: 71, color: "text-danger" },
];

const newsItems = [
  { title: "Delhi reports 200+ new dengue cases in single day", source: "Times of India", time: "2h ago", keywords: ["dengue", "Delhi"], url: "#" },
  { title: "Mumbai hospitals prepare for monsoon disease surge", source: "NDTV", time: "4h ago", keywords: ["monsoon", "disease", "Mumbai"], url: "#" },
  { title: "Flu outbreak reported in schools across Uttar Pradesh", source: "Hindustan Times", time: "5h ago", keywords: ["flu", "outbreak", "Uttar Pradesh"], url: "#" },
  { title: "WHO commends India's TB surveillance digital infrastructure", source: "The Hindu", time: "8h ago", keywords: ["TB", "surveillance"], url: "#" },
  { title: "Kolkata sees rising dengue cases near Howrah bridge area", source: "Indian Express", time: "10h ago", keywords: ["dengue", "Kolkata", "Howrah"], url: "#" },
  { title: "Government launches new mobile app for symptom reporting", source: "Economic Times", time: "12h ago", keywords: ["symptoms", "reporting"], url: "#" },
];

const statEntries = [
  { disease: "All Diseases", period: "Last 24h", value: "347", subtitle: "↑ 8% today", trend: "up", spark: [{v:30},{v:35},{v:42},{v:50},{v:55},{v:60},{v:72}] },
  { disease: "All Diseases", period: "Last 7 days", value: "1,247", subtitle: "↑ 23% this week", trend: "up", spark: [{v:30},{v:45},{v:38},{v:52},{v:48},{v:60},{v:72}] },
  { disease: "All Diseases", period: "Last 30 days", value: "4,892", subtitle: "↑ 15% this month", trend: "up", spark: [{v:20},{v:30},{v:45},{v:42},{v:55},{v:60},{v:65}] },
  { disease: "All Diseases", period: "Last 90 days", value: "12,340", subtitle: "↑ 5% this quarter", trend: "up", spark: [{v:15},{v:22},{v:35},{v:40},{v:48},{v:52},{v:58}] },
  { disease: "Dengue", period: "Last 24h", value: "182", subtitle: "↑ 12% today", trend: "up", spark: [{v:20},{v:28},{v:35},{v:42},{v:50},{v:55},{v:62}] },
  { disease: "Dengue", period: "Last 7 days", value: "723", subtitle: "↑ 28% this week", trend: "up", spark: [{v:25},{v:35},{v:45},{v:55},{v:60},{v:65},{v:72}] },
  { disease: "Dengue", period: "Last 30 days", value: "2,456", subtitle: "↑ 20% this month", trend: "up", spark: [{v:18},{v:28},{v:38},{v:48},{v:55},{v:62},{v:68}] },
  { disease: "Dengue", period: "Last 90 days", value: "6,120", subtitle: "↑ 8% this quarter", trend: "up", spark: [{v:12},{v:20},{v:30},{v:38},{v:45},{v:50},{v:55}] },
  { disease: "Flu", period: "Last 24h", value: "95", subtitle: "↑ 5% today", trend: "up", spark: [{v:10},{v:15},{v:18},{v:22},{v:28},{v:32},{v:38}] },
  { disease: "Flu", period: "Last 7 days", value: "312", subtitle: "↑ 12% this week", trend: "up", spark: [{v:10},{v:18},{v:25},{v:32},{v:28},{v:45},{v:52}] },
  { disease: "Flu", period: "Last 30 days", value: "1,280", subtitle: "↑ 10% this month", trend: "up", spark: [{v:8},{v:15},{v:22},{v:28},{v:35},{v:40},{v:45}] },
  { disease: "Flu", period: "Last 90 days", value: "3,450", subtitle: "↓ 3% this quarter", trend: "down", spark: [{v:50},{v:45},{v:42},{v:38},{v:35},{v:32},{v:30}] },
  { disease: "TB", period: "Last 24h", value: "42", subtitle: "↑ 2% today", trend: "up", spark: [{v:5},{v:6},{v:8},{v:7},{v:9},{v:10},{v:12}] },
  { disease: "TB", period: "Last 7 days", value: "156", subtitle: "↑ 6% this week", trend: "up", spark: [{v:5},{v:8},{v:12},{v:15},{v:18},{v:20},{v:22}] },
  { disease: "TB", period: "Last 30 days", value: "623", subtitle: "↑ 4% this month", trend: "up", spark: [{v:4},{v:7},{v:10},{v:13},{v:16},{v:18},{v:20}] },
  { disease: "TB", period: "Last 90 days", value: "1,890", subtitle: "↓ 5% this quarter", trend: "down", spark: [{v:30},{v:28},{v:25},{v:22},{v:20},{v:18},{v:16}] },
  { disease: "COVID-like", period: "Last 24h", value: "18", subtitle: "↓ 10% today", trend: "down", spark: [{v:25},{v:22},{v:20},{v:18},{v:16},{v:15},{v:14}] },
  { disease: "COVID-like", period: "Last 7 days", value: "45", subtitle: "↓ 15% this week", trend: "down", spark: [{v:20},{v:18},{v:16},{v:14},{v:12},{v:10},{v:8}] },
  { disease: "COVID-like", period: "Last 30 days", value: "312", subtitle: "↓ 20% this month", trend: "down", spark: [{v:30},{v:25},{v:22},{v:18},{v:15},{v:12},{v:10}] },
  { disease: "COVID-like", period: "Last 90 days", value: "580", subtitle: "↓ 30% this quarter", trend: "down", spark: [{v:40},{v:35},{v:28},{v:22},{v:18},{v:14},{v:10}] },
  { disease: "Malaria", period: "Last 24h", value: "10", subtitle: "— Stable", trend: "down", spark: [{v:10},{v:10},{v:11},{v:10},{v:9},{v:10},{v:10}] },
  { disease: "Malaria", period: "Last 7 days", value: "56", subtitle: "↓ 8% this week", trend: "down", spark: [{v:15},{v:13},{v:12},{v:11},{v:10},{v:9},{v:8}] },
  { disease: "Malaria", period: "Last 30 days", value: "221", subtitle: "↓ 12% this month", trend: "down", spark: [{v:25},{v:22},{v:18},{v:15},{v:12},{v:10},{v:8}] },
  { disease: "Malaria", period: "Last 90 days", value: "300", subtitle: "↓ 25% this quarter", trend: "down", spark: [{v:35},{v:30},{v:25},{v:20},{v:15},{v:12},{v:10}] },
];

const trendDataSets = [
  { period: "Last 24h", points: [
    { day: "00:00", dengue: 15, flu: 5, tb: 1, covid: 2, malaria: 1 },
    { day: "04:00", dengue: 20, flu: 8, tb: 2, covid: 1, malaria: 1 },
    { day: "08:00", dengue: 35, flu: 12, tb: 3, covid: 3, malaria: 2 },
    { day: "12:00", dengue: 50, flu: 18, tb: 4, covid: 2, malaria: 2 },
    { day: "16:00", dengue: 45, flu: 15, tb: 3, covid: 4, malaria: 3 },
    { day: "20:00", dengue: 60, flu: 22, tb: 5, covid: 3, malaria: 2 },
    { day: "Now", dengue: 72, flu: 25, tb: 4, covid: 2, malaria: 1 },
  ]},
  { period: "Last 7 days", points: [
    { day: "Mon", dengue: 120, flu: 45, tb: 12, covid: 8, malaria: 5 },
    { day: "Tue", dengue: 135, flu: 50, tb: 14, covid: 7, malaria: 6 },
    { day: "Wed", dengue: 115, flu: 62, tb: 11, covid: 9, malaria: 4 },
    { day: "Thu", dengue: 180, flu: 58, tb: 15, covid: 6, malaria: 7 },
    { day: "Fri", dengue: 210, flu: 72, tb: 13, covid: 10, malaria: 5 },
    { day: "Sat", dengue: 195, flu: 85, tb: 16, covid: 8, malaria: 6 },
    { day: "Sun", dengue: 230, flu: 78, tb: 12, covid: 5, malaria: 4 },
  ]},
  { period: "Last 30 days", points: [
    { day: "Wk1", dengue: 450, flu: 180, tb: 48, covid: 25, malaria: 18 },
    { day: "Wk2", dengue: 520, flu: 210, tb: 55, covid: 22, malaria: 20 },
    { day: "Wk3", dengue: 610, flu: 250, tb: 52, covid: 30, malaria: 22 },
    { day: "Wk4", dengue: 580, flu: 230, tb: 60, covid: 18, malaria: 15 },
  ]},
  { period: "Last 90 days", points: [
    { day: "Jan", dengue: 1200, flu: 600, tb: 180, covid: 80, malaria: 55 },
    { day: "Feb", dengue: 1500, flu: 550, tb: 200, covid: 60, malaria: 48 },
    { day: "Mar", dengue: 1800, flu: 480, tb: 190, covid: 45, malaria: 40 },
  ]},
];

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/epidemai";
  await mongoose.connect(uri);
  console.log("Connected to MongoDB for seeding");

  await Hotspot.deleteMany({});
  await Alert.deleteMany({});
  await Insight.deleteMany({});
  await NewsItem.deleteMany({});
  await StatEntry.deleteMany({});
  await TrendData.deleteMany({});

  await Hotspot.insertMany(hotspots);
  await Alert.insertMany(alerts);
  await Insight.insertMany(insights);
  await NewsItem.insertMany(newsItems);
  await StatEntry.insertMany(statEntries);
  await TrendData.insertMany(trendDataSets);

  console.log("Database seeded successfully");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
