const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
   fileUrl: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } ,
  class: { type: String, required: true },// <-- Add this line
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
