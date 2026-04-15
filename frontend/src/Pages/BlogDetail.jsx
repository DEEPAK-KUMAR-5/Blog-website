import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Eye, Bookmark, ArrowLeft, Send } from "lucide-react";
import { API } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          API.get(`/posts/${id}`),
          API.get(`/posts/${id}/comments`),
        ]);
        setPost(postRes.data.data);
        setComments(commentsRes.data.data);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!user) return;
    try {
      const res = await API.post(`/posts/${id}/like`);
      setLiked(res.data.data.liked);
      setPost((p) => ({ ...p, likeCount: p.likeCount + (res.data.data.liked ? 1 : -1) }));
    } catch {}
  };

  const handleBookmark = async () => {
    if (!user) return;
    try {
      const res = await API.post(`/posts/${id}/bookmark`);
      setBookmarked(res.data.data.bookmarked);
    } catch {}
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    try {
      const res = await API.post(`/posts/${id}/comments`, { text: commentText });
      setComments((prev) => [res.data.data, ...prev]);
      setCommentText("");
    } catch {}
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        <div className="text-center">
          <p className="text-lg mb-4">Post not found</p>
          <Link to="/" className="text-cyan-400 hover:underline">Go home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm mb-8 transition">
          <ArrowLeft size={16} /> Back to posts
        </Link>

        {/* Cover Image */}
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8 border border-slate-700/40" />
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium bg-cyan-500/15 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.name}&background=0f172a&color=22d3ee`}
              alt={post.author?.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-700"
            />
            <div>
              <p className="text-sm font-medium text-slate-200">{post.author?.name}</p>
              <p className="text-xs text-slate-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className={`flex items-center gap-1.5 text-sm transition ${liked ? "text-red-400" : "text-slate-400 hover:text-red-400"}`}>
              <Heart size={16} fill={liked ? "currentColor" : "none"} /> {post.likeCount}
            </button>
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <Eye size={16} /> {post.views}
            </span>
            <button onClick={handleBookmark} className={`transition ${bookmarked ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"}`}>
              <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed text-base whitespace-pre-wrap mb-12">
          {post.content}
        </div>

        {/* Comments */}
        <div className="border-t border-slate-800 pt-8">
          <h3 className="text-lg font-semibold text-white mb-6">Comments ({comments.length})</h3>

          {user && (
            <form onSubmit={handleComment} className="flex gap-3 mb-8">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0f172a&color=22d3ee&size=32`}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
              />
              <div className="flex-1 flex gap-2">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition placeholder-slate-500"
                />
                <button type="submit" className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl transition">
                  <Send size={16} />
                </button>
              </div>
            </form>
          )}

          <div className="space-y-5">
            {comments.map((c) => (
              <div key={c._id} className="flex gap-3">
                <img
                  src={c.user?.avatar || `https://ui-avatars.com/api/?name=${c.user?.name}&background=0f172a&color=22d3ee&size=32`}
                  alt={c.user?.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-3 flex-1">
                  <p className="text-xs font-medium text-cyan-400 mb-1">{c.user?.name}</p>
                  <p className="text-sm text-slate-300">{c.text}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-4">No comments yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
