const express = require("express");
const router = express.Router();
const { protect } = require("./auth");
const User = require("../models/User");

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

module.exports = router;
