const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  usn: { type: String, unique: true },
  dob: String, // store as YYYY-MM-DD
  role: { type: String, enum: ["student", "cr"], default: "student" }
});

module.exports = mongoose.model("User", userSchema);
