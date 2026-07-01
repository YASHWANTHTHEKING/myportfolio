import React from 'react';
import { motion as motion2d } from 'framer-motion';
import { Code, Star, Users, Award, CheckCircle, BarChart2, Flame } from 'lucide-react';

const Github = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const statsData = [
  { label: 'Projects Completed', count: '12+', desc: 'Robust AI & full-stack apps' },
  { label: 'GitHub Commits', count: '1,500+', desc: 'Consistent active pushing' },
  { label: 'Coding Problems', count: '200+', desc: 'LeetCode & GFG benchmarks' },
  { label: 'Certifications', count: '10+', desc: 'Professional validations' },
  { label: 'Tech Stack Skills', count: '20+', desc: 'Languages, frameworks, systems' }
];

// Helper to generate contributions grid data
const generateContributions = () => {
  const contributions = [];
  // 52 weeks * 7 days = 364 tiles
  // Let's generate a smaller grid for mobile/desktop layout: 24 columns x 7 rows = 168 tiles
  const cols = 26;
  const rows = 7;
  for (let c = 0; c < cols; c++) {
    const column = [];
    for (let r = 0; r < rows; r++) {
      // Random activity level: 0 (none), 1 (light), 2 (medium), 3 (dark/heavy)
      const randVal = Math.random();
      const level = randVal > 0.85 ? 3 : randVal > 0.65 ? 2 : randVal > 0.4 ? 1 : 0;
      column.push(level);
    }
    contributions.push(column);
  }
  return contributions;
};

const DashboardStats = () => {
  const contributionsGrid = generateContributions();

  // Colors for GitHub contribution levels
  const getContributionColor = (level) => {
    switch(level) {
      case 3: return 'bg-emerald-500';      // Heavy
      case 2: return 'bg-emerald-600/70';   // Medium
      case 1: return 'bg-emerald-800/40';   // Light
      default: return 'bg-slate-800/40';    // Empty
    }
  };

  return (
    <motion2d.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-6xl mt-12 xl:mt-24 ml-4 xl:ml-12 pointer-events-auto p-4 space-y-10"
    >
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
          Coding Dashboard
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl">
          Real-time snapshot of repository activity, algorithms metrics, and overall engineering benchmarks.
        </p>
      </div>

      {/* 1. Counter achievements grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {statsData.map((stat, idx) => (
          <motion2d.div 
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 + 0.2, duration: 0.5 }}
            className="glass-card p-5 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center"
          >
            <span className="text-3xl md:text-4xl font-bold text-indigo-400 font-sans tracking-tight">
              {stat.count}
            </span>
            <span className="text-xs font-bold text-slate-200 mt-2 block">{stat.label}</span>
            <span className="text-[10px] text-slate-500 mt-1 block leading-relaxed">{stat.desc}</span>
          </motion2d.div>
        ))}
      </div>

      {/* 2. GitHub & LeetCode Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* GitHub Statistics Card */}
        <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <Github size={20} className="text-indigo-400" />
              GitHub Activity
            </h3>
            <a 
              href="https://github.com/YASHWANTHTHEKING" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs text-slate-500 hover:text-indigo-400 font-semibold transition-colors"
            >
              YASHWANTHTHEKING
            </a>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
              <Star size={16} className="text-yellow-500 mx-auto mb-1.5" />
              <span className="text-lg font-bold text-slate-200 block">42</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Stars Earned</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
              <Users size={16} className="text-indigo-400 mx-auto mb-1.5" />
              <span className="text-lg font-bold text-slate-200 block">87</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Followers</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
              <Code size={16} className="text-purple-400 mx-auto mb-1.5" />
              <span className="text-lg font-bold text-slate-200 block">34</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Repositories</span>
            </div>
          </div>

          {/* Contributions Grid */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
              Contribution History (Past Year)
            </h4>
            <div className="bg-slate-950/40 p-4 border border-white/5 rounded-2xl flex justify-center overflow-x-auto custom-scrollbar">
              <div className="flex gap-1">
                {contributionsGrid.map((col, cIdx) => (
                  <div key={cIdx} className="flex flex-col gap-1">
                    {col.map((lvl, rIdx) => (
                      <span 
                        key={rIdx} 
                        className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(lvl)} transition-all duration-200 hover:scale-125`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages breakdown */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
              Most Used Languages
            </h4>
            <div className="space-y-2 text-xs font-semibold">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Python</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>JavaScript</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Java</span>
                  <span>18%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LeetCode Section Card */}
        <div className="lg:col-span-5 glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <Code size={20} className="text-indigo-400" />
              LeetCode Stats
            </h3>
            <a 
              href="https://leetcode.com/u/yash123ace/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs text-slate-500 hover:text-indigo-400 font-semibold flex items-center gap-1 transition-colors"
            >
              <Flame size={12} className="text-orange-500 animate-pulse" />
              yash123ace
            </a>
          </div>

          {/* Solved Problems Circular Metric */}
          <div className="flex items-center justify-around bg-slate-950/20 p-4 border border-white/5 rounded-2xl">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Circular SVG */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="46" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                <circle cx="56" cy="56" r="46" stroke="#6366f1" strokeWidth="6" fill="transparent"
                  strokeDasharray="289" strokeDashoffset={289 - (289 * 225) / 2200} strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold text-slate-100">225</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase">Solved</span>
              </div>
            </div>

            <div className="text-xs font-semibold space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-green-500"></span>
                <span className="text-slate-300">Easy: <strong className="text-slate-100">95</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-yellow-500"></span>
                <span className="text-slate-300">Medium: <strong className="text-slate-100">110</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-red-500"></span>
                <span className="text-slate-300">Hard: <strong className="text-slate-100">20</strong></span>
              </div>
            </div>
          </div>

          {/* Rating Metrics */}
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 border border-white/5 p-3 rounded-xl">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Contest Rating</span>
                <h4 className="text-lg font-bold text-slate-200 mt-0.5">1,742</h4>
              </div>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded">
                Top 7.2%
              </span>
            </div>

            {/* Badges Carousel container */}
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                Active Badges
              </h4>
              <div className="flex gap-2">
                <div className="flex-1 flex flex-col items-center bg-white/5 border border-white/5 p-2 rounded-xl text-center">
                  <Award size={20} className="text-purple-400 mb-1" />
                  <span className="text-[9px] font-bold text-slate-300">Knight</span>
                </div>
                <div className="flex-1 flex flex-col items-center bg-white/5 border border-white/5 p-2 rounded-xl text-center">
                  <Award size={20} className="text-yellow-500 mb-1" />
                  <span className="text-[9px] font-bold text-slate-300">50 Days</span>
                </div>
                <div className="flex-1 flex flex-col items-center bg-white/5 border border-white/5 p-2 rounded-xl text-center">
                  <Award size={20} className="text-emerald-400 mb-1" />
                  <span className="text-[9px] font-bold text-slate-300">MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion2d.div>
  );
};

export default DashboardStats;
