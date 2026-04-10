const express = require("express");
const router = express.Router();
const generateBlog = require("../services/aiMultiAgent");
const Blog = require("../models/Blog");
const slugify = require("slugify");
const adminAuth = require("../middleware/auth");
const axios = require("axios");

 const extractExcerpt = (html) => {
  const match = html.match(/<p>(.*?)<\/p>/);
  return match ? match[1].slice(0, 150) + "..." : "";
};

router.post("/generate", adminAuth, async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic required" });
    }

    const content = await generateBlog(topic);
   
   
const excerpt = extractExcerpt(content);

    const slug = slugify(topic + Date.now(), { lower: true });

    const blog = new Blog({
      title: topic,
      excerpt,
      content,
      category: "AI",
      readTime: "5 min",
      slug,
    });

    res.json({ success: true, blog });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI generation failed" });
  }
});

module.exports = router;