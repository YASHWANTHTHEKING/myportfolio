import React from 'react';
import { motion } from 'framer-motion';
import TechSphere from '../../3d/TechSphere';
import { Terminal, Brain, Globe, Database, Cpu, Cloud } from 'lucide-react';

const skillsData = [
  {
    category: 'Programming',
    icon: Terminal,
    color: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'group-hover:border-blue-500/40',
    items: ['Python', 'Java', 'C', 'C++']
  },
  {
    category: 'AI / ML',
    icon: Brain,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'group-hover:border-purple-500/40',
    items: ['TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn', 'Pandas', 'NumPy']
  },
  {
    category: 'Web Development',
    icon: Globe,
    color: 'from-cyan-500/20 to-teal-500/20',
    borderColor: 'group-hover:border-cyan-500/40',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express']
  },
  {
    category: 'Database Systems',
    icon: Database,
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'group-hover:border-emerald-500/40',
    items: ['MySQL', 'MongoDB', 'Neo4j']
  },
  {
    category: 'Tools & Workflow',
    icon: Cpu,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'group-hover:border-orange-500/40',
    items: ['Git', 'GitHub', 'VS Code', 'Docker', 'Linux', 'Postman']
  },
  {
    category: 'Cloud Services',
    icon: Cloud,
    color: 'from-indigo-500/20 to-cyan-500/20',
    borderColor: 'group-hover:border-indigo-500/40',
    items: ['Firebase', 'AWS Basics']
  }
];

const Skills = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-6xl mt-12 xl:mt-20 ml-4 xl:ml-12 pointer-events-auto p-4"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
        Technical Skills
      </h2>
      <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl">
        Hover over the cards to see their glow and interact with the 3D rotating Tag Cloud sphere on the right.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Skills Category Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillsData.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group glass-card p-6 rounded-3xl relative overflow-hidden border border-white/5 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Gradient glow background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}></div>

                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-200">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-200">{group.category}</h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  {group.items.map(skill => (
                    <span 
                      key={skill}
                      className="text-xs bg-slate-950/50 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-white/5 hover:border-indigo-500/30 px-3 py-1.5 rounded-xl transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: 3D Tag Sphere Container */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl flex flex-col justify-center items-center relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent"></div>
          
          <h3 className="text-lg font-bold text-slate-200 mb-4 z-10 flex items-center gap-2">
            <Globe className="text-indigo-400 animate-spin-slow" size={18} />
            3D Tech Sphere
          </h3>

          <TechSphere />
          
          <p className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase mt-4 text-center z-10">
            Drag to rotate • Hover words to highlight
          </p>
        </div>

      </div>
    </motion.div>
  );
};

// CSS Spin effect helper
const spinSlow = {
  animation: 'spin 12s linear infinite',
};

export default Skills;
