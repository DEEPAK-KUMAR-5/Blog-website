const Bookmarks = ({ bookmarks }) => {
  // Fallback data in case backend not ready
  const defaultBookmarks = [
    {
      id: 1,
      title: "React Tips & Tricks",
      category: "React",
      author: "Himanshu",
      description: "Learn the best practices for React development with hooks and modern patterns.",
      image: "https://source.unsplash.com/400x250/?react,code",
    },
    {
      id: 2,
      title: "Tailwind Advanced Styling",
      category: "CSS",
      author: "Team",
      description: "Create responsive, modern UI designs using TailwindCSS grid, flex, and utilities.",
      image: "https://source.unsplash.com/400x250/?css,design",
    },
    {
      id: 3,
      title: "Node.js Best Practices",
      category: "Node.js",
      author: "Backend",
      description: "Master backend development using Node.js, Express, and database integration.",
      image: "https://source.unsplash.com/400x250/?nodejs,backend",
    },
    {
      id: 4,
      title: "JavaScript ES2026 Features",
      category: "JS",
      author: "Himanshu",
      description: "Explore the latest JavaScript features and syntax improvements for modern apps.",
      image: "https://source.unsplash.com/400x250/?javascript,code",
    },
  ];

  const data = bookmarks || defaultBookmarks;

  return (
    <div className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-6  from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        My Bookmarks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {data.map((book) => (
          <div
            key={book.id}
            className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col"
          >
            {/* Image */}
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 ">{book.title}</h2>
              <p className="text-slate-400 text-sm mb-2 truncate">By {book.author}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs font-medium bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
                  {book.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm flex-1 ">{book.description}</p>

              {/* Button */}
              <button className="mt-4 px-4 py-2 rounded-full from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow hover:scale-105 transition">
                Read Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;