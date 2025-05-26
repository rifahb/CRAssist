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
  if (req.user.role !== "cr"&& req.user.role !="teacher") return res.status(403).json({ message: "Forbidden" });
  const feedbacks = await Feedback.find().populate("user", "name usn email");
  if (req.user.role === "teacher") {
    const anonymousFeedbacks = feedbacks.map(fb => ({
      _id: fb._id,
      feedback: fb.feedback,
      createdAt: fb.createdAt,
    }));
    return res.json(anonymousFeedbacks);
  }
  res.json(feedbacks);
});
router.get("/my", verifyToken, async (req, res) => {
  try {
    // const feedbacks = await Feedback.find({ usn: req.user.user}).sort({ createdAt: -1 });
    console.log("req.user.id", req.user.id);
const feedbacks = await Feedback.find({ user: req.user.id }).sort({ createdAt: -1 });
console.log("feedbacks", feedbacks);
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// Update feedback
// Update feedback
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Not found" });

    // Only owner or CR/teacher can update
    if (
      feedback.user.toString() !== req.user.id &&
      !["cr", "teacher"].includes(req.user.role)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    feedback.feedback = req.body.feedback || feedback.feedback;
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete feedback
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Not found" });

    // Only owner or CR/teacher can delete
    if (
      feedback.user.toString() !== req.user.id &&
      !["cr", "teacher"].includes(req.user.role)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await feedback.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;