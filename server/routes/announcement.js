const express = require('express');
const Announcement = require('../models/announcement');
const { protect } = require('./auth'); // Protect routes with JWT
const router = express.Router();

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
router.post('/', protect, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newAnnouncement = new Announcement({ title, content });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ message: 'Error creating announcement' });
  }
});

module.exports = router;
