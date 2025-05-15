// routes/issue.js
const express = require("express");
const Issue = require("../models/Issues.js");
const { verifyToken } = require("../middleware/auth.js");
const router = express.Router();

// POST - Student submits issue
router.post("/", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const usn = req.user.usn;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const issue = new Issue({ usn, title, description });
    await issue.save();
    res.status(201).json({ message: "Issue submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET - CR views all issues
router.get("/", verifyToken, async (req, res) => {
  if (req.user.role !== "cr") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const issues = await Issue.find().sort({ date: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Error fetching issues" });
  }
});
module.exports = router;
