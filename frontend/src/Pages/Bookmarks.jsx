import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Heart, Eye } from "lucide-react";
import { API } from "../context/AuthContext";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/posts/user/bookmarks")
      .then((res) => setBookmarks(res.data.data))
      .catch(() => setBookmarks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold  from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-10">
          My Bookmarks
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-slate-800/50 rounded-2xl h-72 animate-pulse border border-slate-700/40" />
            ))}
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <Bookmark size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg">No bookmarks yet.</p>
            <Link to="/" className="mt-3 inline-block text-cyan-400 text-sm hover:underline">Browse posts</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks.map(({ _id, post }) => (
              post && (
                <Link
                  key={_id}
                  to={`/blogs/${post._id}`}
                  className="group bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-44  from-slate-700 to-slate-800 flex items-center justify-center">
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
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;