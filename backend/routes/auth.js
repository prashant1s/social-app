const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// signup
router.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash: hash
    });

    res.json({ msg: "User created" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// login
router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
