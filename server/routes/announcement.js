const express = require('express');
const Announcement = require('../models/announcement');
const multer = require("multer");
const path = require("path");
const { protect , checkCRRole} = require('./auth'); // Protect routes with JWT
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


// Get all announcements (no auth required)
router.get('/',protect, async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const announcements = await Announcement.find({ class: user.class }).sort({ date: -1 }).populate("user", "_id role name");
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching announcements' });
  }
});

// Create an announcement (auth required)
router.post(
  "/",
  protect, // <-- require authentication
  // checkCRRole, // <-- uncomment if only CRs can post
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
       const user = await require('../models/User').findById(req.user.id); // <-- Add this line
      const announcement = new Announcement({ title, content, fileUrl, user: req.user.id ,class: user.class });
      await announcement.save();
      res.status(201).json(announcement);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
// Update announcement
router.put("/:id", protect, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Not found" });

    // Only CR or owner can update
    if (
      req.user.role !== "cr" &&
      (!announcement.user || announcement.user.toString() !== req.user.id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    announcement.title = req.body.title || announcement.title;
    announcement.content = req.body.content || announcement.content;
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete announcement
router.delete("/:id", protect, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Not found" });

    // Only CR or owner can delete
    if (
      req.user.role !== "cr" &&
      (!announcement.user || announcement.user.toString() !== req.user.id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await announcement.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
