import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { blogs as staticBlogs } from "../data/blogs.js";
import { useEffect, useState } from "react";

const fallback =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200";

const BlogPage = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ FIXED
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const BLOGS_PER_PAGE = 6;

  // SEO
  useEffect(() => {
    document.title = "AI Automation Blog | SmartySols";
  }, []);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs`
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        const merged = [...staticBlogs, ...data];

        const unique = merged.filter(
          (blog, index, self) =>
            index === self.findIndex((b) => b.slug === blog.slug)
        );

        setBlogs(unique);
      } catch (err) {
        console.error(err);
        setBlogs(staticBlogs);
      } finally {
        setLoading(false); // ✅ FIXED
      }
    };

    fetchBlogs();
  }, []);

  // FILTER
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || blog.category === category;

    return matchesSearch && matchesCategory;
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  // CATEGORY LIST
  const categories = [
    "All",
    ...new Set(blogs.map((b) => b.category)),
  ];

  // ⏳ LOADING UI
  if (loading) {
    return (
      <div className="text-center mt-20">
        <p>Loading...</p>
      </div>
    );
  }

  // ❌ EMPTY STATE
  if (!blogs.length) {
    return (
      <div className="text-center mt-20">
        <p>No blogs found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-20">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            Our <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-neutral-600">
            Practical guides on automation & growth
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="p-3 border rounded w-full md:w-1/2"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="p-3 border rounded w-full md:w-1/4"
          >
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBlogs.map((blog) => (
            <motion.div
              key={blog._id || blog.id || blog.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate(`/blogs/${blog.slug}`)}
              className="card cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={blog.image || fallback}
                onError={(e) => (e.target.src = fallback)}
                className="h-52 w-full object-cover"
                alt={blog.title}
              />

              <div className="p-5">
                <p className="text-xs text-accent mb-2">
                  {blog.category}
                </p>

                <h2 className="font-bold text-lg mb-2">
                  {blog.title}
                </h2>

                <p className="text-sm text-neutral-600">
                  {blog.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-accent text-white"
                  : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;