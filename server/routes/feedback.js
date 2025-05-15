const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const { verifyToken } = require("../middleware/auth");

// Submit feedback (any logged-in user)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!feedback) return res.status(400).json({ message: "Feedback is required" });
    const fb = new Feedback({ user: req.user.id, feedback });
    await fb.save();
    res.status(201).json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all feedbacks (CR only)
router.get("/", verifyToken, async (req, res) => {
  if (req.user.role !== "cr") return res.status(403).json({ message: "Forbidden" });
  const feedbacks = await Feedback.find().populate("user", "name usn email");
  res.json(feedbacks);
});

module.exports = router;