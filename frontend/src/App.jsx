import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Blogs from "./Pages/Blogs";
import BlogDetail from "./Pages/BlogDetail";
import Bookmarks from "./Pages/Bookmarks";
import Categories from "./Pages/Categories";
import Dashboard from "./Pages/Dashboard";
import ChatDrawer from "./components/ChatDrawer";

const App = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Routes>
        {/* ── Guest-only routes ───────────────────────────────── */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        {/* ── Protected routes ────────────────────────────────── */}
        <Route path="/"            element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/blogs"       element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/blogs/:id"   element={<ProtectedRoute><BlogDetail /></ProtectedRoute>} />
        <Route path="/bookmarks"   element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="/categories"  element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* ── Catch-all: guests → /register, users → / ────────── */}
        <Route path="*" element={<Navigate to={user ? "/" : "/register"} replace />} />
      </Routes>
      <ChatDrawer />
    </div>
  );
};

export default App;
