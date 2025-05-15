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
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
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
      const announcement = new Announcement({ title, content, fileUrl });
      await announcement.save();
      res.status(201).json(announcement);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
