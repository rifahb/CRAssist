// // const express = require("express");
// // const mongoose = require("mongoose");
// // const dotenv = require("dotenv");
// // const cors = require("cors");
// // const path = require("path");


// // // Prometheus client
// // const client = require("prom-client");

// // // Load environment variables
// // dotenv.config();

// // const announcementRoutes = require("./routes/announcement");
// // const issueRoutes = require("./routes/issue");
// // const pollRoutes = require("./routes/poll");
// // const userRoutes = require("./routes/users");
// // const feedbackRoutes = require("./routes/feedback");
// // const { router: authRoutes, protect } = require('./routes/auth');
// // const { getSecrets } = require('./vaultClient');
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Prometheus metrics setup
// // const collectDefaultMetrics = client.collectDefaultMetrics;
// // collectDefaultMetrics();

// // // /metrics endpoint for Prometheus to scrape
// // app.get('/metrics', async (req, res) => {
// //   try {
// //     res.set('Content-Type', client.register.contentType);
// //     res.end(await client.register.metrics());
// //   } catch (ex) {
// //     res.status(500).end(ex);
// //   }
// // });

// // // API Routes
// // app.use("/api/users", userRoutes);
// // app.use("/api/auth", authRoutes);
// // app.use("/api/announcements", announcementRoutes);
// // app.use("/api/polls", pollRoutes);
// // app.use("/api/issues", issueRoutes);
// // app.use("/api/feedback", feedbackRoutes);
// // app.use("/uploads", express.static("uploads"));

// // // MongoDB connection and server start
// // mongoose.connect(process.env.MONGO_URL, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // }).then(() => {
// //   console.log("MongoDB connected");
// //   const PORT = process.env.PORT || 5001;
// //   app.listen(PORT, () => 
// //     console.log(`Server running on port ${PORT}`)
// //   );
// // }).catch(err => console.error("DB Error:", err));
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// // Prometheus client
// const client = require("prom-client");

// // Load environment variables (for Vault addr/token and other vars)
// dotenv.config();

// const announcementRoutes = require("./routes/announcement");
// const issueRoutes = require("./routes/issue");
// const pollRoutes = require("./routes/poll");
// const userRoutes = require("./routes/users");
// const feedbackRoutes = require("./routes/feedback");
// const { router: authRoutes, protect } = require('./routes/auth');
// const { getSecrets } = require('./vaultClient');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Prometheus metrics setup
// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics();

// // /metrics endpoint for Prometheus to scrape
// app.get('/metrics', async (req, res) => {
//   try {
//     res.set('Content-Type', client.register.contentType);
//     res.end(await client.register.metrics());
//   } catch (ex) {
//     res.status(500).end(ex);
//   }
// });

// // API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/announcements", announcementRoutes);
// app.use("/api/polls", pollRoutes);
// app.use("/api/issues", issueRoutes);
// app.use("/api/feedback", feedbackRoutes);
// app.use("/uploads", express.static("uploads"));

// // Start server after fetching secrets from Vault
// async function startServer() {
//   try {
//     // Fetch secrets from Vault
//     const secrets = await getSecrets();

//     const dbUser = secrets.DB_USER;
//     const dbPass = secrets.DB_PASS;
//     const dbHost = secrets.DB_HOST || 'localhost';
//     const dbName = secrets.DB_NAME || 'test';

//     // Construct MongoDB URI with secrets
//     const mongoUri = `mongodb://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPass)}@${dbHost}/${dbName}?authSource=admin`;

//     // Connect to MongoDB
//     await mongoose.connect(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     console.log("MongoDB connected");

//     const PORT = process.env.PORT || 5001;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//     process.exit(1);
//   }
// }

// startServer();


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

// Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/uploads", express.static("uploads"));

// MongoDB connection and server start
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => 
    console.log("Server running on port ${PORT}")
  );
}).catch(err => console.error("DB Error:", err));