import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {blogs as staticBlogs} from "../data/blogs";


const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // 🔥 Scroll Progress (FIXED)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight <= 0) return;

      const progressValue = (window.scrollY / totalHeight) * 100;
      setProgress(progressValue);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 📡 Fetch Blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const staticBlog = staticBlogs.find(b => b.slug === slug);

      if (staticBlog) {
        setBlog(staticBlog);
        setLoading(false);
        return;
      }


        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs/${slug}`
        );

        if (!res.ok) throw new Error("Blog not found");

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

useEffect(() => {
  if (!blog) return;
    document.title = `${blog.title} | SmartySols`;
    const meta = document.querySelector("meta[name='description']");
    
    if (meta) {
      meta.setAttribute("content", blog.excerpt);
    }
  }
, [blog]);

  // 🔗 Share
  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${window.location.href}`
    );
  };

 

  useEffect(() => {
  if (!blog) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";

    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.image,
      author: {
        "@type": "Organization",
        name: "SmartySols",
      },
      datePublished: blog.createdAt,
    });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }
, [blog]);

 // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // ❌ Error
  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4">
        <p className="text-neutral-600 text-xl">Blog not found.</p>
        <button
          onClick={() => navigate("/blogs")}
          className="btn btn-primary"
        >
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* 🔥 Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-accent z-50"
        style={{ width: `${progress}%` }}
      />

      {/* 🔙 Back Button */}
      <div className="fixed top-20 left-6 z-40">
        <button
          onClick={() => navigate("/blogs")}
          className="bg-white shadow-md px-4 py-2 rounded-full text-sm hover:scale-105 transition"
        >
          ← Back
        </button>
      </div>

      {/* 🖼 Hero Section */}
      <div className="w-full h-[300px] md:h-[450px] relative">
        <img
  src={blog.image}
  loading="lazy"
  onError={(e) => {
    e.target.src = fallback;
  }}
  alt={`AI automation blog - ${blog.title}`}
  className="w-full h-full object-cover"
/>

        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-8 text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 📄 Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
            {blog.category}
          </span>

          <span>{blog.readTime}</span>

          <span>
  {blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN")
    : blog.date}
</span>
        </div>

        {/* ✨ Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            prose 
            prose-lg 
            max-w-none

            prose-h1:text-4xl
            prose-h1:font-bold

            prose-h2:text-2xl
            prose-h2:font-semibold

            prose-p:text-neutral-700
            prose-p:leading-relaxed

            prose-strong:text-black

            prose-ul:list-disc
            prose-ul:pl-5

            prose-img:rounded-xl
            prose-img:shadow-md
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* 🔗 Share */}
        <div className="mt-12 pt-6 border-t flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Share this article:
          </p>

          <div className="flex gap-3">
            <button
              onClick={shareLinkedIn}
              className="btn btn-secondary text-sm"
            >
              LinkedIn
            </button>

            <button
              onClick={shareTwitter}
              className="btn btn-secondary text-sm"
            >
              Twitter
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};


export default BlogPostPage;