const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  usn: { type: String, unique: true },
  dob: String, // store as YYYY-MM-DD
  role: { type: String, enum: ["student", "cr","teacher"], default: "student" },
   class: { type: String, enum: ["CSE-A", "CSE-B", "CSE-C"], required: true },
  language: { type: String, default: "English" },         // 🔹 Add this line
  darkMode: { type: Boolean, default: true },  
});

module.exports = mongoose.model("User", userSchema);
