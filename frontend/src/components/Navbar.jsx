import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Categories', path: '/categories' },
    { name: 'Trending', path: '/trending' },
    { name: 'Bookmarks', path: '/bookmarks' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-slate-800 px-8 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight"
      >
        BlogSpace.
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 items-center">
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

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Sign In */}
        <Link
          to="/login"
          className="text-slate-300 hover:text-white text-sm font-medium transition"
        >
          Sign In
        </Link>

        {/* Sign Up */}
        <Link
          to="/register"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-md hover:scale-105 transition-all"
        >
          Get Started
        </Link>

        {/* Dashboard Button */}
        <Link
          to="/dashboard"
          className="hidden md:flex px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 transition-all"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;