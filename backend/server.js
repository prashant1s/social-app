const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "https://social-app-five-gules.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - redirects to signup
app.get("/", (req, res) => {
  res.redirect("/signup");
});

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Signup endpoint info (for direct browser access)
app.get("/signup", (req, res) => {
  res.json({
    message: "Signup endpoint",
    endpoint: "/api/auth/signup",
    method: "POST",
    body: {
      username: "string (required)",
      email: "string (required)",
      password: "string (required)",
    },
    note: "Use POST method to create an account",
  });
});

// API routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/posts", require("./routes/post.js"));

// Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
} else {
  console.warn("MONGO_URI not set in environment variables");
}

// Start server regardless of MongoDB connection (for health checks)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
