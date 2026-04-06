import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Router>
      {/* Added a subtle background glow behind the whole app */}
      <div className="min-h-screen bg-slate-900 text-slate-100 relative selection:bg-cyan-500/30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;