import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Blogs from './Pages/Blogs';
import Bookmarks from './Pages/Bookmarks';
import Categories from './Pages/Categories';
import Trending from './Pages/Trending'; // ✅ correct import
import Login from './Pages/Login';
// Backend sample data for Blogs
const backendBlogData = [
  {
    id: 1,
    title: "New React Feature",
    category: "React",
    author: "Alice",
    description: "Learn about the latest React feature and how to use it.",
    image: "https://source.unsplash.com/400x250/?react,code",
  },
  {
    id: 2,
    title: "Tailwind Grid Tricks",
    category: "CSS",
    author: "Bob",
    description: "Master advanced Tailwind grid and layout techniques.",
    image: "https://source.unsplash.com/400x250/?css,design",
  },
];


// Backend sample data for Bookmarks
const backendBookmarksData = [
  { id: 1, title: "New React Feature", category: "React", author: "Alice" },
  { id: 2, title: "Tailwind Grid Tricks", category: "CSS", author: "Bob" },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 relative">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blogs" element={<Blogs posts={backendBlogData} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/bookmarks" element={<Bookmarks bookmarks={backendBookmarksData} />} />
            <Route path="/trending" element={<Trending />} /> {/* ✅ route corrected */}
            <Route path="/login" element={<Login />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;