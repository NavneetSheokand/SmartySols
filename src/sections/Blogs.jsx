import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../hooks/useInview.js';
import { blogs } from '../data/blogs.js';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      className="flex-shrink-0 w-80 card overflow-hidden group cursor-pointer hover:shadow-large transition-all duration-300"
    >
    <div className="overflow-hidden h-48">
      <img
        src={blog.image}
        alt={`AI automation blog - ${blog.title}`}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
          {blog.category}
        </span>
        <span className="text-xs text-neutral-500">{blog.readTime}</span>
      </div>
      <h3 className="font-display font-bold text-neutral-900 text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {blog.title}
      </h3>
      <p className="text-neutral-600 text-sm line-clamp-2">{blog.excerpt}</p>
      <p className="text-xs text-neutral-400 mt-4">{blog.date}</p>
    </div>
  </div>
);
}


const Blogs = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Auto scroll logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let paused = false;

    const scroll = () => {
      if (!paused && container) {
        scrollAmount += 0.5;
        // Reset when reached end (loop)
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
        }
        container.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(scroll, 10);

    // Pause on hover
    container.addEventListener('mouseenter', () => { paused = true; });
    container.addEventListener('mouseleave', () => { paused = false; });

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Duplicate blogs for seamless loop
  const loopedBlogs = [...blogs, ...blogs];

  return (
    <section id="blogs" ref={ref} className="section-padding bg-neutral-50 overflow-hidden">
      <div className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-accent font-semibold mb-2 uppercase tracking-wide text-sm">
              Insights & Resources
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900">
              From Our <span className="gradient-text">Blog</span>
            </h2>
            <p className="text-neutral-600 mt-3 text-lg">
              Practical guides on automation, development & growth.
            </p>
          </div>
          <motion.button
            onClick={() => navigate('/blogs')}
            className="btn btn-primary hidden md:flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All →
          </motion.button>
        </motion.div>
      </div>

      {/* Scrolling Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6 pb-4"
        style={{ scrollBehavior: 'auto' }}
      >
        {loopedBlogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>

      {/* Mobile View All button */}
      <div className="container-custom mt-8 md:hidden">
        <button
          onClick={() => navigate('/blogs')}
          className="btn btn-primary w-full justify-center"
        >
          View All Blogs →
        </button>
      </div>
    </section>
  );
};

export default Blogs;