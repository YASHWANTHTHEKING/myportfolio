import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, FileText, ArrowRight } from 'lucide-react';

const Github = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const Linkedin = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const roles = [
  'AI Developer',
  'Machine Learning Engineer',
  'Software Developer',
  'Full Stack Developer',
  'Python Developer',
  'Java Programmer',
  'Problem Solver',
  'Open Source Learner'
];

const Home = ({ changePage }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const currentFullText = roles[currentRoleIndex];
    let timer;

    if (isDeleting) {
      if (displayedText === '') {
        // Done deleting, move to next word
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        // Delete next character
        timer = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, 50);
      }
    } else {
      if (displayedText === currentFullText) {
        // Done typing, hold for 2000ms
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        // Type next character
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative min-h-[80vh] flex flex-col justify-center px-4 md:px-8 py-8"
    >
      <div className="max-w-2xl z-10">
        
        {/* Large Greeting */}
        <div>
          <span className="text-indigo-400 font-bold uppercase tracking-wider text-xs md:text-sm block mb-3">
            HELLO, I'M
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight mb-4">
            N.V. Yashwanth
          </h1>
        </div>

        {/* Typing Subtitle (overflow-visible to prevent underline or font descender clipping) */}
        <div className="h-12 md:h-14 flex items-center mb-6 overflow-visible">
          <span className="text-lg md:text-2xl font-semibold text-slate-300 leading-snug">
            A passionate <span className="text-indigo-400 font-bold underline decoration-indigo-500/40">{displayedText}</span>
          </span>
          <span className="w-1 h-5 md:h-7 bg-indigo-400 ml-1.5 animate-pulse shrink-0"></span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
          Passionate Computer Science Engineering student building intelligent applications using Artificial Intelligence, Machine Learning, Computer Vision, Python, Java, and modern web technologies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <a
            href="#"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all duration-200 group cursor-pointer"
          >
            <span>Download Resume</span>
            <FileText size={16} className="group-hover:scale-105 transition-all" />
          </a>
          <button 
            onClick={() => changePage('projects')}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-100 border border-white/10 px-6 py-3.5 rounded-xl text-sm font-semibold hover:border-white/20 transition-all duration-200 group cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Social Nodes & Location */}
        <div className="flex flex-wrap items-center gap-5 text-slate-400 text-xs font-semibold">
          <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-2 rounded-xl">
            <MapPin size={14} className="text-indigo-400" />
            <span>Chennai, India</span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/YASHWANTHTHEKING" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 bg-white/5 hover:bg-indigo-500/10 rounded-xl hover:text-indigo-400 border border-white/5 transition-all cursor-pointer"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/yashwanth-nv-78b5502a4/" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 bg-white/5 hover:bg-indigo-500/10 rounded-xl hover:text-indigo-400 border border-white/5 transition-all cursor-pointer"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:yash123ace@gmail.com" 
              className="p-2.5 bg-white/5 hover:bg-indigo-500/10 rounded-xl hover:text-indigo-400 border border-white/5 transition-all cursor-pointer"
              title="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default Home;
