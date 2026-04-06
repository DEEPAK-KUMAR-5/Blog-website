import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

      {/* Desktop Menu */}
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

      {/* Right Section + Hamburger */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-cyan-400 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Sign In */}
        <Link
          to="/login"
          className="hidden md:block text-slate-300 hover:text-white text-sm font-medium transition"
        >
          Sign In
        </Link>

        {/* Sign Up */}
        <Link
          to="/register"
          className="hidden md:block px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-md hover:scale-105 transition-all"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900/95 backdrop-blur-md flex flex-col px-8 py-4 gap-4 z-40">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 text-base font-semibold border-b-2 border-cyan-400 pb-1"
                  : "text-slate-400 hover:text-cyan-400 text-base font-medium transition"
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile Sign In / Sign Up */}
          <div className="flex flex-col gap-2 mt-4">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white text-base font-medium transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-base font-semibold shadow-md hover:scale-105 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;