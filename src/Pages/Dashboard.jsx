import { useState, useEffect } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Drafts");
  const [darkMode, setDarkMode] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    bio: "Web Developer",
    description: "I build awesome apps",
    phone: "1234567890",
    location: "Delhi, India",
    image: "",
  });

  // LocalStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    const savedTheme = localStorage.getItem("theme");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const contentData = {
    Drafts: [1, 2, 3, 4],
    Published: [5, 6],
    Archived: [7],
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white">
        
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 border-r border-slate-800 bg-slate-900/30 p-6 flex-col gap-6">
          <div className="text-cyan-400 text-lg font-bold">Menu</div>
          <nav className="flex flex-col gap-2">
            {["Dashboard", "Content", "Add New", "Comments", "Stats"].map((item, i) => (
              <button
                key={item}
                className={`text-left px-4 py-2 rounded-lg ${
                  i === 1
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Manage Content
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 md:gap-8 mb-8 border-b border-slate-800">
            {["Drafts", "Published", "Archived", "Profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold ${
                  activeTab === tab
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
                {tab !== "Profile" && ` (${contentData[tab].length})`}
              </button>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-slate-800/70 p-6 rounded-xl shadow-md">
              <p className="text-sm text-slate-400">Total Posts</p>
              <p className="text-2xl font-bold">120</p>
            </div>
            <div className="bg-slate-800/70 p-6 rounded-xl shadow-md">
              <p className="text-sm text-slate-400">Total Users</p>
              <p className="text-2xl font-bold">350</p>
            </div>
            <div className="bg-slate-800/70 p-6 rounded-xl shadow-md">
              <p className="text-sm text-slate-400">Likes</p>
              <p className="text-2xl font-bold">540</p>
            </div>
            <div className="bg-slate-800/70 p-6 rounded-xl shadow-md">
              <p className="text-sm text-slate-400">Comments</p>
              <p className="text-2xl font-bold">280</p>
            </div>
          </div>

          {/* Dark Mode Toggle BELOW Stats */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-medium">Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
                darkMode ? "bg-cyan-500 justify-end" : "bg-slate-400 justify-start"
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </button>
          </div>

          {/* Content / Profile */}
          {activeTab !== "Profile" ? (
            <div className="flex flex-col gap-4 max-w-4xl">
              {contentData[activeTab].map((item) => (
                <div
                  key={item}
                  className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 flex justify-between items-center hover:bg-slate-800 hover:border-slate-600 transition-all"
                >
                  <p className="text-slate-200 text-sm md:text-base">
                    {activeTab === "Drafts"
                      ? "Untitled Draft"
                      : "Published Article"}{" "}
                    #{item}
                  </p>
                  <button className="text-cyan-400 text-sm">Edit Post</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Profile 👤</h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="bg-cyan-500 px-4 py-1 rounded-lg text-black text-sm font-semibold hover:scale-105 transition"
                >
                  {editMode ? "Cancel" : "Edit"}
                </button>
              </div>

              {/* IMAGE */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={profile.image || "https://via.placeholder.com/60"}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {editMode && (
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfile({ ...profile, image: URL.createObjectURL(file) });
                      }
                    }}
                    className="text-sm text-slate-300"
                  />
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name","phone","location","bio"].map((field) => (
                  editMode ? (
                    <input
                      key={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={profile[field]}
                      onChange={(e) =>
                        setProfile({ ...profile, [field]: e.target.value })
                      }
                      className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
                    />
                  ) : (
                    <div key={field} className="text-slate-200 py-2">
                      <span className="font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}: </span>
                      {profile[field] || "-"}
                    </div>
                  )
                ))}
              </div>

              {/* Description */}
              {editMode ? (
                <textarea
                  placeholder="Description"
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  className="w-full mt-4 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
                />
              ) : (
                <p className="text-slate-300 mt-4">{profile.description || "-"}</p>
              )}

              {/* Save Button */}
              {editMode && (
                <button
                  onClick={() => setEditMode(false)}
                  className="mt-4 bg-cyan-500 px-5 py-2 rounded-lg text-black font-semibold hover:scale-105 transition"
                >
                  Save Profile
                </button>
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;