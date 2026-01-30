const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  authorUsername: String,
  text: String,
  imageUrl: String,

  likes: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String
    }
  ],

  comments: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);

