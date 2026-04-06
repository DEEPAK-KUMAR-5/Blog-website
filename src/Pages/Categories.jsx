import React from "react";

// Sample categories data
const categories = [
  { id: 1, name: "React", description: "All blogs related to React JS", color: "from-cyan-400 to-blue-500" },
  { id: 2, name: "JavaScript", description: "JS tips, tricks & updates", color: "from-yellow-400 to-orange-500" },
  { id: 3, name: "CSS", description: "Design, Tailwind & layouts", color: "from-purple-400 to-pink-500" },
  { id: 4, name: "Node.js", description: "Backend & server-side", color: "from-green-400 to-teal-500" },
  { id: 5, name: "MongoDB", description: "Database & storage", color: "from-indigo-400 to-purple-500" },
  { id: 6, name: "Web Design", description: "UI/UX & modern designs", color: "from-pink-400 to-rose-500" },
];

const Categories = () => {
  return (
    <div className="p-8 min-h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Blog Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-fr">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col"
          >
            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h2 className={`text-2xl font-semibold mb-2 break-words bg-clip-text text-transparent bg-gradient-to-r ${cat.color}`}>
                {cat.name}
              </h2>

              <p className="text-slate-300 text-sm flex-1 break-words mb-4">{cat.description}</p>

              {/* Button */}
              <button className={`mt-auto px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-semibold shadow hover:scale-105 transition`}>
                Explore {cat.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;