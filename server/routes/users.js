const express = require("express");
const { protect } = require("./auth");
const User = require("../models/User");
const Issue = require("../models/Issues");
const Feedback = require("../models/Feedback");

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  console.log("PUT /me req.body:", req.body);
  const { email, dob, language, darkMode } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.email = email || user.email;
    user.dob = dob || user.dob;
    user.language = language || user.language;
    user.darkMode = darkMode !== undefined ? darkMode : user.darkMode;

    await user.save();

    res.json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/me", protect, async (req, res) => {
  const { dob } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Format both to YYYY-MM-DD before comparing
    const inputDob = new Date(dob).toISOString().split("T")[0];
    const storedDob = new Date(user.dob).toISOString().split("T")[0];

    if (inputDob !== storedDob) {
      return res.status(403).json({ message: "DOB does not match. Cannot delete account." });
    }

    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "✅ Account deleted successfully." });

  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/me/data", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const issues = await Issue.find({ usn: user.usn });
    const feedback = await Feedback.find({ usn: user.usn });

    res.json({
      profile: {
        name: user.name,
        email: user.email,
        usn: user.usn,
        role: user.role
      },
      issues,
      feedback
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get data" });
  }
});




module.exports = router;
