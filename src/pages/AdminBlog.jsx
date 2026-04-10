import { useRef, useState } from "react";

const AdminBlog = () => {
  const [mode, setMode] = useState("manual");
  const fileRef = useRef();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    readTime: "",
    published: true,
  });
  const [topic, setTopic] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const generateBlog = async () => {
    const token = localStorage.getItem("token");
    if (!topic) { alert("Enter topic first"); return; }
    setLoadingAI(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setLoadingAI(false);
    if (data.success) {
      setForm((prev) => ({
        ...prev,
        title: data.blog.title,
        excerpt: data.blog.excerpt,
        content: data.blog.content,
        category: data.blog.category,
        readTime: data.blog.readTime,
      }));
      setMode("manual");
      alert("AI blog generated, now review and publish");
    } else {
      alert("Failed ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!form.title || !form.content) { alert("Fill all fields ❌"); return; }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!form.image) { alert("Please upload image ❌"); return; }
    if (res.ok) {
      alert("Blog Published ✅");
      setForm({ title: "", excerpt: "", content: "", category: "", image: "", readTime: "", published: true });
    } else {
      alert(data.message);
    }
    fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <h1 className="text-2xl font-medium text-gray-900 mb-7 mt-9">Blog panel</h1>

        {/* Mode tabs */}
        <div className="inline-flex gap-1 bg-gray-100 rounded-lg p-1 mb-7">
          <button
            onClick={() => setMode("manual")}
            className={`px-4 py-1.5 rounded-md text-sm transition-all ${
              mode === "manual"
                ? "bg-white text-gray-900 font-medium shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Write manually
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`px-4 py-1.5 rounded-md text-sm transition-all ${
              mode === "ai"
                ? "bg-white text-gray-900 font-medium shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Generate with AI
          </button>
        </div>

        {/* AI section */}
        {mode === "ai" && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-7">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">AI generation</p>
            <div className="flex gap-2">
              <input
                placeholder="Enter a topic — e.g. SaaS, Automation, AI..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
              />
              <button
                type="button"
                onClick={generateBlog}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {loadingAI ? "Generating…" : "Generate blog"}
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Section: Content */}
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100">Content</p>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Title</label>
            <input
              name="title"
              placeholder="Your blog title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Excerpt</label>
            <input
              name="excerpt"
              placeholder="Short summary shown in listings"
              value={form.excerpt}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Category</label>
              <input
                name="category"
                placeholder="e.g. Technology"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Read time</label>
              <input
                name="readTime"
                placeholder="e.g. 5 min read"
                value={form.readTime}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Section: Cover image */}
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100 pt-2">Cover image</p>

          <label className="block border border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:border-gray-400 bg-gray-50 transition-colors">
            <div className="text-gray-400 text-lg mb-1">↑</div>
            <p className="text-sm text-gray-500">Click to upload an image</p>
            <input ref={fileRef} type="file" className="hidden" onChange={handleImageUpload} />
          </label>

          {form.image && (
            <img src={form.image} alt="preview" className="w-full h-44 object-cover rounded-xl border border-gray-200" />
          )}

          {/* Section: Body */}
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100 pt-2">Body</p>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">
              Content <span className="font-normal text-gray-400">(HTML allowed)</span>
            </label>
            <textarea
              name="content"
              placeholder="Write your blog content here…"
              value={form.content}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 h-52 resize-y"
            />
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
              className={`relative w-9 h-5 rounded-full transition-colors ${form.published ? "bg-green-600" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.published ? "left-4" : "left-0.5"}`} />
            </button>
            <span className="text-sm text-gray-600">{form.published ? "Published" : "Draft"}</span>
          </div>

          <button
            disabled={!form.image || !form.content}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            Publish blog
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminBlog;