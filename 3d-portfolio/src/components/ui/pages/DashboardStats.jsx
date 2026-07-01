import React from 'react';
import { motion as motion2d } from 'framer-motion';
import { ExternalLink, Terminal, ShieldAlert } from 'lucide-react';

const Github = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const Linkedin = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const Leetcode = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Clean custom coding bracket representation */}
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);

const profileLinks = [
  {
    name: 'GitHub',
    username: 'YASHWANTHTHEKING',
    url: 'https://github.com/YASHWANTHTHEKING',
    desc: 'Explore open-source repositories, current AI/ML models, computer vision systems, and full-stack software developments.',
    icon: Github,
    colorClass: 'text-indigo-400 border-indigo-500/20 hover:border-indigo-500/40 bg-indigo-500/5',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-500'
  },
  {
    name: 'LeetCode',
    username: 'yash123ace',
    url: 'https://leetcode.com/u/yash123ace/',
    desc: 'Review algorithm challenges, dynamic programming solutions, database query structures, and core data structure implementations.',
    icon: Leetcode,
    colorClass: 'text-amber-500 border-amber-500/20 hover:border-amber-500/40 bg-amber-500/5',
    buttonColor: 'bg-amber-600 hover:bg-amber-500'
  },
  {
    name: 'LinkedIn',
    username: 'Yashwanth N.V.',
    url: 'https://www.linkedin.com/in/yashwanth-nv-78b5502a4/',
    desc: 'Connect professionally, view academic credentials, professional certifications, career milestones, and industry updates.',
    icon: Linkedin,
    colorClass: 'text-sky-400 border-sky-500/20 hover:border-sky-500/40 bg-sky-500/5',
    buttonColor: 'bg-sky-600 hover:bg-sky-500'
  }
];

const DashboardStats = () => {
  return (
    <motion2d.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-4xl mt-12 xl:mt-24 ml-4 xl:ml-12 pointer-events-auto p-4 space-y-10"
    >
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
          Developer Profiles
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl">
          Quick access links to my professional network, codebase repositories, and algorithm problem-solving profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profileLinks.map((profile, idx) => {
          const IconComponent = profile.icon;
          return (
            <motion2d.div 
              key={profile.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
              className={`glass-card p-6 rounded-[2rem] border flex flex-col justify-between space-y-6 transition-all duration-300 ${profile.colorClass}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <IconComponent size={24} />
                    <h3 className="text-lg font-bold text-slate-200">{profile.name}</h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-slate-400 font-mono block">@{profile.username}</span>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {profile.desc}
                  </p>
                </div>
              </div>

              <a 
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center gap-2 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 ${profile.buttonColor}`}
              >
                <span>Visit {profile.name}</span>
                <ExternalLink size={14} />
              </a>
            </motion2d.div>
          );
        })}
      </div>
    </motion2d.div>
  );
};

export default DashboardStats;
