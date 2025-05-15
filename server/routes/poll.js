const express = require("express");
const Poll = require("../models/Poll");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Only CR can create a poll
router.post("/", verifyToken, async (req, res) => {
  if (req.user.role !== "cr") return res.status(403).json({ message: "Only CR can create polls" });
  const { question, options } = req.body;
  if (!question || !options || options.length < 2) return res.status(400).json({ message: "Invalid poll data" });
  try {
    const poll = await Poll.create({
      question,
      options: options.map(text => ({ text })),
      createdBy: req.user.usn
    });
    res.status(201).json(poll);
  } catch (err) {
     console.error(err); 
    res.status(500).json({ message: "Server error" });
  }
});

// Get all polls
router.get("/", verifyToken, async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (err) {
     console.error(err); 
    res.status(500).json({ message: "Server error" });
  }
});

// Vote in a poll
router.post("/:id/vote", verifyToken, async (req, res) => {
  const { optionIndex } = req.body;
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    if (poll.voters.includes(req.user.usn)) return res.status(400).json({ message: "Already voted" });
    poll.options[optionIndex].votes += 1;
    poll.voters.push(req.user.usn);
    await poll.save();
    res.json(poll);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;