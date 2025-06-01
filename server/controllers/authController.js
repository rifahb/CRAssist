const User = require("../models/User");

async function register(req, res) {
  try {
    const { name, email, usn, dob, role, language, darkMode } = req.body;

    // Validate required fields
    if (!name || !email || !usn) {
      return res.status(400).json({ message: "Name, email and USN are required." });
    }

    // Check if user/email exists
    const existingUser = await User.findOne({ $or: [{ email }, { usn }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or USN already registered." });
    }

    // Create user
    const newUser = new User({ name, email, usn, dob, role, language, darkMode });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        usn: newUser.usn,
        dob: newUser.dob,
        role: newUser.role,
        language: newUser.language,
        darkMode: newUser.darkMode
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { register };
