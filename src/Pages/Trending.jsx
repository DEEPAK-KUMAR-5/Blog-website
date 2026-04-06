import React from "react";

// Sample trending blogs data
const trendingBlogs = [
  {
    id: 1,
    title: "React 18 New Features",
    category: "React",
    author: "Alice",
    description: "Explore the latest features in React 18 and how to implement them.",
    image: "https://source.unsplash.com/400x250/?react,code",
  },
  {
    id: 2,
    title: "Advanced Tailwind Tips",
    category: "CSS",
    author: "Bob",
    description: "Master Tailwind grid, flex, and animation utilities for modern UI.",
    image: "https://source.unsplash.com/400x250/?css,design",
  },
  {
    id: 3,
    title: "Node.js Performance Tricks",
    category: "Node.js",
    author: "Charlie",
    description: "Optimize your Node.js backend for speed and scalability.",
    image: "https://source.unsplash.com/400x250/?nodejs,backend",
  },
  {
    id: 4,
    title: "Modern JavaScript Features",
    category: "JavaScript",
    author: "Himanshu",
    description: "Learn about the newest ES2026 JavaScript features.",
    image: "https://source.unsplash.com/400x250/?javascript,code",
  },
];

const Trendings = () => {
  return (
    <div className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
        Trending Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {trendingBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col"
          >
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 break-words">{blog.title}</h2>
              <p className="text-slate-400 text-sm mb-2 truncate">By {blog.author}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs font-medium bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm flex-1 break-words">{blog.description}</p>

              {/* Button */}
              <button className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold shadow hover:scale-105 transition">
                Read Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trendings;