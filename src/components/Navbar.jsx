import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-slate-800 px-8 py-4 flex items-center justify-between transition-all">
      {/* Brand Logo */}
      <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
        BlogSpace.
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-8 items-center">
        {['Home', 'Blogs', 'Categories', 'Trending', 'Bookmarks'].map((item) => (
          <Link key={item} to="/" className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors">
            {item}
          </Link>
        ))}
      </div>
      
      {/* Profile Button with Glow */}
      <div>
        <Link 
          to="/dashboard" 
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;