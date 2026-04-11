import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../context/AuthContext";

const COLORS = [
  "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "bg-purple-500/15 text-purple-400 border-purple-500/20",
  "bg-pink-500/15 text-pink-400 border-pink-500/20",
  "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "bg-green-500/15 text-green-400 border-green-500/20",
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    API.get("/posts?limit=100")
      .then((res) => {
        const tagMap = {};
        res.data.data.posts.forEach((post) => {
          post.tags?.forEach((tag) => {
            tagMap[tag] = (tagMap[tag] || 0) + 1;
          });
        });
        setCategories(Object.entries(tagMap).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count));
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (tag) => {
    setSelected(tag);
    setPostsLoading(true);
    try {
      const res = await API.get(`/posts?tag=${encodeURIComponent(tag)}&limit=12`);
      setPosts(res.data.data.posts);
    } catch {
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Categories
        </h1>
        <p className="text-slate-500 text-sm mb-8">Browse posts by topic</p>

        {loading ? (
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-9 w-24 rounded-full bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-slate-500">No categories found.</p>
        ) : (
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(({ tag, count }, i) => (
              <button
                key={tag}
                onClick={() => handleSelect(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition hover:scale-105 ${COLORS[i % COLORS.length]} ${selected === tag ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-cyan-500" : ""}`}
              >
                {tag} <span className="opacity-60 text-xs ml-1">({count})</span>
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">
              Posts tagged <span className="text-cyan-400">"{selected}"</span>
            </h2>
            {postsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-48 bg-slate-800/50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <p className="text-slate-500">No posts in this category.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    to={`/blogs/${post._id}`}
                    className="group bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-36 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <span className="text-3xl">📝</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-200 group-hover:text-white text-sm line-clamp-2 mb-1">{post.title}</h3>
                      <p className="text-xs text-slate-500">By {post.author?.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
