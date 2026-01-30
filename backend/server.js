const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app  = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/auth.js"));
app.use("/api/posts", require("./routes/post.js"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

   
  })
  .catch(err => console.error(err));