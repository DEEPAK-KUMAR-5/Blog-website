import { useState } from 'react';

const Dashboard = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('Drafts');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for our tabs
  const contentData = {
    Drafts: [1, 2, 3, 4],
    Published: [5, 6],
    Archived: [7]
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] relative">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/30 p-8 flex flex-col gap-8">
        <div className="text-cyan-400 flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span className="font-semibold text-lg tracking-wide text-white">Menu</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          {['Dashboard', 'Content', 'Add New', 'Comments', 'Stats'].map((item, i) => (
            <button 
              key={item} 
              onClick={() => item === 'Add New' && setIsModalOpen(true)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${i === 1 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 lg:p-14">
        <h2 className="text-3xl font-bold text-white mb-8">Manage Content</h2>

        {/* INTERACTIVE TABS */}
        <div className="flex gap-8 mb-10 border-b border-slate-800">
          {['Drafts', 'Published', 'Archived'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-semibold text-sm tracking-wide transition-all ${
                activeTab === tab 
                  ? 'text-cyan-400 border-b-2 border-cyan-400' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab} ({contentData[tab].length})
            </button>
          ))}
        </div>

        {/* DYNAMIC CONTENT LIST */}
        <div className="flex flex-col gap-4 max-w-4xl">
          {contentData[activeTab].map((item) => (
            <div key={item} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 flex justify-between items-center hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer group shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors text-lg">
                    {activeTab === 'Drafts' ? 'Untitled Draft' : 'Published Article'} #{item}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">Last edited just now</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-slate-500 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all px-4 py-2 bg-slate-900 rounded-lg text-sm font-medium hover:scale-105 active:scale-95"
              >
                Edit Post
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* POP-UP MODAL (Glassmorphism overlay) */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl shadow-cyan-500/10 max-w-md w-full m-4">
            <h3 className="text-2xl font-bold text-white mb-4">Edit Content</h3>
            <p className="text-slate-400 text-sm mb-6">Make changes to your post here. This is an interactive modal powered by React state!</p>
            
            <input type="text" placeholder="Post Title" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white focus:border-cyan-500 outline-none" />
            
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg text-slate-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;