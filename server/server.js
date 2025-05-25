const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const announcementRoutes = require("./routes/announcement");
const issueRoutes = require("./routes/issue");
const pollRoutes = require("./routes/poll");
const userRoutes = require("./routes/user");
const feedbackRoutes = require("./routes/feedback");  // <--- Add this line
const { router: authRoutes, protect } = require('./routes/auth');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => 
    console.log(`Server running on port ${process.env.PORT}`)
  );
}).catch(err => console.error("DB Error:", err));
