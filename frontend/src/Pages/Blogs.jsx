import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, Eye } from "lucide-react";
import { API } from "../context/AuthContext";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page, limit: 12 });
        if (search) params.append("search", search);
        const res = await API.get(`/posts?${params}`);
        setPosts(res.data.data.posts);
        setTotalPages(res.data.data.totalPages);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            All Blogs
          </h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl pl-8 pr-4 py-2 focus:outline-none focus:border-cyan-500 transition placeholder-slate-500 w-52"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:scale-105 transition-all">
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-slate-800/50 rounded-2xl h-72 animate-pulse border border-slate-700/40" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-slate-500">No posts found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blogs/${post._id}`}
                  className="group bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col"
                >
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-44 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[11px] font-medium bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-base font-semibold text-slate-200 group-hover:text-white mb-1 line-clamp-2">{post.title}</h2>
                    <p className="text-slate-500 text-xs mb-3 flex-1 line-clamp-2">
                      {post.content?.replace(/<[^>]*>/g, "").slice(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/40">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.name}&background=0f172a&color=22d3ee&size=32`}
                          alt={post.author?.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-slate-400">{post.author?.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-xs">
                        <span className="flex items-center gap-1"><Heart size={11} />{post.likeCount}</span>
                        <span className="flex items-center gap-1"><Eye size={11} />{post.views}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 text-sm rounded-xl border border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition">Previous</button>
                <span className="text-slate-500 text-sm">Page {page} of {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 text-sm rounded-xl border border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
