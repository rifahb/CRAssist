const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const announcementRoutes = require("./routes/announcement");
const issueRoutes = require("./routes/issue");
const cors = require("cors");

dotenv.config();

const { router: authRoutes, protect } = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);

app.use("/api/issues", issueRoutes);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}).catch(err => console.error("DB Error:", err));
 // Enable all CORS requests
