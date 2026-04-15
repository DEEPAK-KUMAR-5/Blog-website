import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Plus, Edit2, Trash2, Eye, Heart, X, Upload,
  FileText, Globe, Lock, LayoutDashboard,
} from "lucide-react";
import { API } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";

const EMPTY_FORM = { title: "", content: "", tags: "", isPublic: true };

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("published");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const fileRef = useRef();

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/posts/user/my");
      setPosts(res.data.data);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyPosts(); }, []);

  const published = posts.filter((p) => p.isPublic);
  const drafts = posts.filter((p) => !p.isPublic);
  const displayed = activeTab === "published" ? published : drafts;

  const openCreate = () => {
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setImage(null);
    setImagePreview(null);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content,
      tags: post.tags?.join(", ") || "",
      isPublic: post.isPublic,
    });
    setImage(null);
    setImagePreview(post.image || null);
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setImage(null);
    setImagePreview(null);
    setError("");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("tags", form.tags);
      formData.append("isPublic", form.isPublic);
      if (image) formData.append("image", image);

      if (editingPost) {
        await API.patch(`/posts/${editingPost._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/posts", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      closeModal();
      fetchMyPosts();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch {}
    setDeleteId(null);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-col border-r border-slate-800 bg-slate-900/50 p-6 gap-6 sticky top-[57px] h-[calc(100vh-57px)]">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=0f172a&color=22d3ee`}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-700"
          />
          <div>
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-500">Author</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {[
            { label: "Overview", icon: LayoutDashboard, tab: null },
            { label: "Published", icon: Globe, tab: "published", count: published.length },
            { label: "Drafts", icon: Lock, tab: "drafts", count: drafts.length },
          ].map(({ label, icon: Icon, tab, count }) => (
            <button
              key={label}
              onClick={() => tab !== null && setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                activeTab === tab
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon size={16} />
              {label}
              {count !== undefined && (
                <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={openCreate}
          className="mt-auto flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl  from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:scale-105 transition-all shadow"
        >
          <Plus size={16} /> New Post
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your posts</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl  from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:scale-105 transition-all shadow md:hidden"
          >
            <Plus size={15} /> New Post
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Posts", value: posts.length, color: "text-cyan-400" },
            { label: "Published", value: published.length, color: "text-green-400" },
            { label: "Drafts", value: drafts.length, color: "text-amber-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-slate-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-slate-800 mb-6">
          {[
            { key: "published", label: "Published", count: published.length },
            { key: "drafts", label: "Drafts", count: drafts.length },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`pb-3 text-sm font-semibold transition-all ${
                activeTab === key
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-slate-800/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p className="mb-3">No {activeTab} posts yet.</p>
            <button onClick={openCreate} className="text-cyan-400 text-sm hover:underline">
              Create your first post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((post) => (
              <div
                key={post._id}
                className="group flex items-center gap-4 bg-slate-800/50 border border-slate-700/40 rounded-2xl p-4 hover:border-slate-600 hover:bg-slate-800 transition-all"
              >
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-14 h-14 rounded-xl object-cover " />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-700/60 flex items-center justify-center  text-xl">
                    📝
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-200 group-hover:text-white transition truncate text-sm">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-1"><Heart size={11} />{post.likeCount}</span>
                    <span className="flex items-center gap-1"><Eye size={11} />{post.views}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Link
                    to={`/blogs/${post._id}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 transition"
                    title="View"
                  >
                    <Eye size={15} />
                  </Link>
                  <button
                    onClick={() => openEdit(post)}
                    className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-700/50 transition"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteId(post._id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700/50 transition"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} id="post-form" className="space-y-4">
                {/* Image upload */}
                <div
                  className="relative w-full h-40 rounded-xl border-2 border-dashed border-slate-700 hover:border-cyan-500 transition cursor-pointer overflow-hidden flex items-center justify-center bg-slate-800/40"
                  onClick={() => fileRef.current.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-slate-500">
                      <Upload size={24} className="mx-auto mb-2" />
                      <p className="text-sm">Click to upload cover image</p>
                      <p className="text-xs opacity-60">Optional</p>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>

                <input
                  type="text"
                  placeholder="Post title *"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition placeholder-slate-500"
                />

                <textarea
                  placeholder="Write your post content here... *"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={8}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition placeholder-slate-500 resize-none"
                />

                <input
                  type="text"
                  placeholder="Tags (comma separated, e.g. React, CSS, Node.js)"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition placeholder-slate-500"
                />

                {/* Publish toggle */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/60 border border-slate-700/40 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {form.isPublic ? "Published" : "Draft (private)"}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {form.isPublic ? "Visible to everyone" : "Only visible to you"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, isPublic: !form.isPublic })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.isPublic ? "bg-cyan-500" : "bg-slate-600"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isPublic ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-800">
              <button
                onClick={closeModal}
                className="px-5 py-2 text-sm text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                form="post-form"
                type="submit"
                disabled={submitting}
                className="px-6 py-2 rounded-xl  from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Saving..." : editingPost ? "Save Changes" : "Publish Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Post?</h3>
            <p className="text-slate-400 text-sm mb-6">This action cannot be undone. The post will be permanently deleted.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;