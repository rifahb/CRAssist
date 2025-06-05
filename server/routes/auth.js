const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {

  let { usn, dob } = req.body;
  try {
    if (!usn || !dob) {
      return res.status(400).json({ message: "USN and DOB required" });
    }
    usn = usn.trim();
    dob = dob.trim();

    const user = await User.findOne({ usn, dob });


    if (!user) {
      return res.status(401).json({ message: "Invalid USN or DOB" });
    }

    const token = jwt.sign(
      { id: user._id, usn: user.usn, role: user.role , name: user.name, email: user.email, class: user.class},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// (Optional) POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, usn, dob, role, class: userClass } = req.body;

  try {
    const user = await User.create({ name, email, usn, dob, role, class: userClass });
    res.status(201).json({ message: "User registered", user: { usn, role, class: userClass } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const protect = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get the token from Authorization header

  if (!token) return res.status(401).json({ message: "Not authorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
    req.user = decoded;  // Store the decoded info in the request
    next();  // Move to the next middleware or route
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};



const checkCRRole = (req, res, next) => {
  if (req.user.role !== "cr" && req.user.role!=="teacher") {
    return res.status(403).json({ message: "Access denied: Only CRs can post announcements" });
  }
  next();
};
module.exports = {
  router,
  protect,
   checkCRRole,
};