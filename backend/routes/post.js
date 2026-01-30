const router = require("express").Router();
const Post = require("../models/Post.js");
const auth = require("../middleware/auth.js");

// create post
router.post("/", auth, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    if (!text && !imageUrl)
      return res.status(400).json({ msg: "Text or image required" });

    const post = await Post.create({
      authorId: req.user.id,
      authorUsername: req.user.username,
      text,
      imageUrl,
      likes: [],
      comments: []
    });

    res.json(post);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// get feed
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Get feed error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// like 
router.post("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const index = post.likes.findIndex(
      l => l.userId.toString() === req.user.id
    );

    if (index >= 0) {
      post.likes.splice(index, 1); // unlike
    } else {
      post.likes.push({ userId: req.user.id, username: req.user.username });
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Like post error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// comment
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (!req.body.text) {
      return res.status(400).json({ msg: "Comment text is required" });
    }

    post.comments.push({
      userId: req.user.id,
      username: req.user.username,
      text: req.body.text
    });

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Comment post error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
