const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title:     { type: String, required: true },
 slug: { type: String, required: true, unique: true, index: true },
  excerpt:   { type: String, required: true },
  content:   { type: String, required: true },  // full HTML/markdown
  category:  { type: String, required: true },
  image:     { type: String },
  readTime:  { type: String },
  published: { type: Boolean, default: false },  // draft vs live
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", BlogSchema);