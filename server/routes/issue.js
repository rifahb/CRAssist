// routes/issue.js
const express = require("express");
const Issue = require("../models/Issues.js");
const { verifyToken } = require("../middleware/auth.js");
const router = express.Router();

// POST - Student submits issue
router.post("/", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const usn = req.user.usn;
  const userClass = req.user.class;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const issue = new Issue({ usn, title, description, class: userClass }); // <-- FIXED
    await issue.save();
    res.status(201).json({ message: "Issue submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET - CR views all issues
router.get("/", verifyToken, async (req, res) => {
  if (req.user.role !== "cr" && req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }

  const issues = await Issue.find({ class: req.user.class }).sort({ date: -1 });
  res.json(issues);
});
router.get("/my", verifyToken, async (req, res) => {
  try {
    const issues = await Issue.find({ usn: req.user.usn }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// Update issue
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Not found" });

    // Only owner or CR/teacher can update
    if (
      issue.usn !== req.user.usn &&
      !["cr", "teacher"].includes(req.user.role)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    issue.title = req.body.title || issue.title;
    issue.description = req.body.description || issue.description;
    issue.status = req.body.status || issue.status;
    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete issue
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Not found" });

    // Only owner or CR/teacher can delete
    if (
      issue.usn !== req.user.usn &&
      !["cr", "teacher"].includes(req.user.role)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await issue.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
