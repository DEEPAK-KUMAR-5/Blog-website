import React from "react";

const Blogs = ({ posts }) => {
  const defaultPosts = [
    {
      id: 1,
      title: "React Tips & Tricks",
      author: "Himanshu",
      category: "React",
      description:
        "Learn the best practices for React development with hooks and modern patterns.",
      image: "https://source.unsplash.com/400x250/?react,code",
    },
    {
      id: 2,
      title: "Tailwind Advanced Styling",
      author: "Team",
      category: "CSS",
      description:
        "Create responsive, modern UI designs using TailwindCSS grid, flex, and utilities.",
      image: "https://source.unsplash.com/400x250/?css,design",
    },
    {
      id: 3,
      title: "Node.js Best Practices",
      author: "Backend",
      category: "Node.js",
      description:
        "Master backend development using Node.js, Express, and database integration.",
      image: "https://source.unsplash.com/400x250/?nodejs,backend",
    },
    {
      id: 4,
      title: "JavaScript ES2026 Features",
      author: "Himanshu",
      category: "JS",
      description:
        "Explore the latest JavaScript features and syntax improvements for modern apps.",
      image: "https://source.unsplash.com/400x250/?javascript,code",
    },
  ];

  const data = posts || defaultPosts;

  return (
    <div className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        All Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {data.map((post) => (
          <div
            key={post.id}
            className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col"
          >
            {/* Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            )}

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 break-words">{post.title}</h2>
              <p className="text-slate-400 text-sm mb-2 truncate">By {post.author}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs font-medium bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm flex-1 break-words">{post.description}</p>

              {/* Action Buttons (UI only) */}
              <div className="flex gap-4 mt-3 text-sm text-slate-400">
                <button className="flex items-center gap-1 cursor-pointer">
                  ❤️ Like
                </button>
                <button className="flex items-center gap-1 cursor-pointer">
                  💬 Comment
                </button>
                <button className="flex items-center gap-1 cursor-pointer">
                  🗑 Delete
                </button>
              </div>

              {/* Read / Surf Button (UI only) */}
              <button className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow hover:scale-105 transition cursor-pointer">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;