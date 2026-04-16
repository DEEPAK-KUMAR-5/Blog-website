import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/register");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Categories", path: "/categories" },
    { name: "Bookmarks", path: "/bookmarks" },
    { name: "Messages", path: "/messages" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link
        to={user ? "/" : "/register"}
        className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight"
      >
        BlogSpace.
      </Link>

      {/* Nav Links — only when logged in */}
      {user && (
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 text-sm font-semibold border-b-2 border-cyan-400 pb-1"
                  : "text-slate-400 hover:text-cyan-400 text-sm font-medium transition"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow hover:scale-105 transition-all"
            >
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0f172a&color=22d3ee`
                }
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-cyan-500/40"
              />
              <span className="text-sm text-slate-300 hidden md:block">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <Link
            to="/register"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow hover:scale-105 transition-all"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
