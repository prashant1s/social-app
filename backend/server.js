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

// Root route
app.get("/", (req, res) => {
   res.json({
        activeStatus: true,
        error: false,
        message: "API is running"
    });
});

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});


// API routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/posts", require("./routes/post.js"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ msg: "Internal server error" });
});

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
