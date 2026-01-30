const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    passwordHash: hash
  });

  res.json({ msg: "User created" });
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET
  );

  res.json({ token, username: user.username });
});

module.exports = router;
