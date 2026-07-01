import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Brain, Heart, Eye, ArrowRight } from 'lucide-react';

const researchInterests = [
  { name: 'Artificial Intelligence', icon: Brain, color: 'text-purple-400 bg-purple-500/10' },
  { name: 'Computer Vision', icon: Eye, color: 'text-indigo-400 bg-indigo-500/10' },
  { name: 'Natural Language Processing', icon: BookOpen, color: 'text-blue-400 bg-blue-500/10' },
  { name: 'Healthcare AI', icon: Heart, color: 'text-pink-400 bg-pink-500/10' }
];

const papers = [
  {
    id: 1,
    title: 'A Comparative Literature Survey on Face Attentiveness Detection Systems',
    domain: 'Computer Vision & Education',
    abstract: 'Synthesizes computational approaches evaluating student engagement. Compares convolution-based networks with vision transformers (ViTs) on head pose yaw/roll and gaze tracking algorithms.',
    date: '2025 Study',
    status: 'Literature Survey Published'
  },
  {
    id: 2,
    title: 'Secure Healthcare Data Acquisition & Cryptographic Hashing models',
    domain: 'Security & Health Informatics',
    abstract: 'Outlines architectures for safe acquisition of biometric health files. Integrates zero-knowledge hashes with cloud-encrypted records to enforce patient-consented access credentials.',
    date: '2024 Project',
    status: 'Research Working Paper'
  },
  {
    id: 3,
    title: 'Anti-Spoofing & Liveness Detection in Low-Cost Biometric Authentication',
    domain: 'AI & Security',
    abstract: 'Investigates low-latency eye aspect ratio (EAR) thresholds and micro-expression frequency to prevent photo and video replay biometric attacks on resource-constrained devices.',
    date: '2024 Research',
    status: 'Technical Project Review'
  }
];

const Research = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-6xl mt-12 xl:mt-24 ml-4 xl:ml-12 pointer-events-auto p-4"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
        Academic Research
      </h2>
      <p className="text-slate-400 text-sm md:text-base mb-10 max-w-xl">
        Academic interest fields, literature surveys, and experimental research architectures in AI-driven healthcare and security.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Research Interests */}
        <div className="lg:col-span-4 glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 space-y-6">
          <h3 className="text-lg font-bold text-slate-200 border-b border-white/5 pb-3">
            Research Interests
          </h3>
          
          <div className="flex flex-col gap-3">
            {researchInterests.map((interest, i) => {
              const Icon = interest.icon;
              return (
                <div 
                  key={interest.name}
                  className="flex items-center gap-3.5 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-indigo-500/20 transition-all duration-300 group"
                >
                  <div className={`p-2.5 rounded-xl ${interest.color} text-slate-200`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-slate-300 group-hover:text-slate-100 transition-colors">
                    {interest.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Papers list */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-200 pl-2">
            Selected Papers & Literature Surveys
          </h3>

          <div className="space-y-4">
            {papers.map((paper, idx) => (
              <motion.div 
                key={paper.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="glass-card p-6 rounded-3xl border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                  <div>
                    <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      {paper.domain}
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-slate-200 mt-2 leading-snug">
                      {paper.title}
                    </h4>
                  </div>
                  
                  <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2.5 py-1 rounded">
                    {paper.date}
                  </span>
                </div>

                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-4">
                  {paper.abstract}
                </p>

                <div className="flex justify-between items-center border-t border-white/5 pt-4 text-xs font-semibold text-slate-500">
                  <span className="text-indigo-400 flex items-center gap-1.5">
                    <FileText size={14} />
                    {paper.status}
                  </span>
                  
                  <span className="flex items-center gap-1 hover:text-slate-300 cursor-pointer">
                    Read Document <ArrowRight size={13} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Research;
