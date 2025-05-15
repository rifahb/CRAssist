// models/Issue.js
const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  usn: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["open", "resolved"], default: "open" },
});

module.exports = mongoose.model("Issue", issueSchema);