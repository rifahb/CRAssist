const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Prometheus client
const client = require("prom-client");

// Load environment variables
dotenv.config();

const announcementRoutes = require("./routes/announcement");
const issueRoutes = require("./routes/issue");
const pollRoutes = require("./routes/poll");
const userRoutes = require("./routes/users");
const feedbackRoutes = require("./routes/feedback");
const { router: authRoutes, protect } = require('./routes/auth');
const { getSecrets } = require('./vaultClient');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =======================
// 🧠 Prometheus Setup
// =======================

// Register metrics
const register = client.register;

// Collect default Node.js + system metrics
client.collectDefaultMetrics({ register });

// Custom metric: Count HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'statusCode'],
});

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .inc();
  });
  next();
});

// Optional: Event loop lag gauge
const eventLoopLag = new client.Gauge({
  name: 'custom_event_loop_lag_seconds',
  help: 'Manual tracking of event loop lag'
});
setInterval(() => {
  const start = process.hrtime();
  setImmediate(() => {
    const delta = process.hrtime(start);
    const nanoseconds = delta[0] * 1e9 + delta[1];
    eventLoopLag.set(nanoseconds / 1e9);
  });
}, 500);

// /metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// =======================
// 🔗 API Routes
// =======================
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/uploads", express.static("uploads"));

// =======================
// 🚀 Start Server
// =======================
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}).catch(err => console.error("DB Error:", err));