import { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: 1,
      title: "The Future of UI Design in 2026",
      category: "Technology",
      isFeatured: false,
      likes: 12,
      user: {
        name: "Himanshu",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      content: "Full content of UI Design article here..."
    },
    {
      id: 2,
      title: "Why React is Still King",
      category: "Programming",
      isFeatured: false,
      likes: 8,
      user: {
        name: "Alice",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      content: "Full content of React article here..."
    },
    {
      id: 3,
      title: "Mastering Modern Web Development Tools",
      category: "Featured",
      isFeatured: true,
      likes: 20,
      user: {
        name: "Bob",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg"
      },
      content: "Full content of Web Dev Tools article here..."
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Search */}
      <div className="flex justify-center mb-12">
        <div className="relative group w-full max-w-md">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="relative w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-full px-6 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="flex flex-col gap-8 col-span-1">
          {filteredArticles.filter(a => !a.isFeatured).map(article => (
            <div key={article.id} className="group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col">
              <div className="h-32 bg-slate-700/30 w-full group-hover:bg-slate-700/50 transition-colors"></div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                
                {/* Article Info */}
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2 block">{article.category}</span>
                  <h3 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-2">{article.title}</h3>
                </div>

                {/* User Info + Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.user.avatar}
                      alt={article.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-slate-200 text-sm">{article.user.name}</span>
                  </div>
                  <div className="flex gap-4 text-slate-400 text-sm">
                    <button className="flex items-center gap-1">❤️ {article.likes}</button>
                    <button className="flex items-center gap-1">💬 0</button>
                    <button className="flex items-center gap-1">👀 Read</button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Featured Column */}
        {filteredArticles.filter(a => a.isFeatured).map(article => (
          <div key={article.id} className="relative rounded-3xl overflow-hidden border border-slate-700/50 col-span-1 lg:col-span-2 group min-h-[500px] cursor-pointer shadow-2xl hover:border-cyan-500/30 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent z-10"></div>

            <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-semibold tracking-wide backdrop-blur-sm mb-4 inline-block hover:bg-blue-500/40 transition-colors">
                FEATURED
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-cyan-300 transition-colors">
                {article.title}
              </h1>

              {/* User Info + Buttons */}
              <div className="flex justify-between items-center mt-8">
                <div className="flex items-center gap-3">
                  <img
                    src={article.user.avatar}
                    alt={article.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="text-white font-medium">{article.user.name}</p>
                    <p className="text-slate-400 text-xs">Author</p>
                  </div>
                </div>
                <div className="flex gap-4 text-slate-300 text-sm">
                  <button className="flex items-center gap-1">❤️ {article.likes}</button>
                  <button className="flex items-center gap-1">💬 0</button>
                  <button className="flex items-center gap-1">👀 Read</button>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;