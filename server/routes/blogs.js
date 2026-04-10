const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const slugify = require("slugify");
const adminAuth = require("../middleware/auth");

// GET all published blogs
router.get("/", async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .select("-content"); // don't send full content in list
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// GET single blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

// POST create blog (protect this in production with an auth middleware)
router.post("/", adminAuth, async (req, res) => {
  try {
    // console.log("BODY RECEIVED:", req.body); 

    const { title } = req.body;

    const slug = slugify(title + Date.now(), { lower: true });

    const blog = new Blog({
      ...req.body,
      slug,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.log("BLOG ERROR:", err); // 👈 ADD THIS
    res.status(500).json({ message: "Failed to create blog" });
  }
});

// UPDATE
router.put("/:id",adminAuth, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});

// DELETE
router.delete("/:id", adminAuth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;