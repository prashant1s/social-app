const router = require("express").Router();
const Post = require("../models/Post.js");
const auth = require("../middleware/auth.js");

// create post
router.post("/", auth, async (req, res) => {
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
});

// get feed
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// like 
router.post("/:id/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

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
});

// comment
router.post("/:id/comment", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    userId: req.user.id,
    username: req.user.username,
    text: req.body.text
  });

  await post.save();
  res.json(post);
});

module.exports = router;
