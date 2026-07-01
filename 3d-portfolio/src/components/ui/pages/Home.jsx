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
          setDisplayedText(prev => currentFullText.slice(0, prev.length + 1));
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
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="relative min-h-[80vh] flex flex-col justify-center px-4 md:px-8 py-8"
    >
      <div className="max-w-2xl z-10">
        
        {/* Large Greeting (Engraved-plaque spacing feel, text-secondary) */}
        <div>
          <span className="text-[var(--text-secondary)] font-sans font-bold uppercase tracking-[0.25em] text-xs md:text-sm block mb-3">
            HELLO, I'M
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[var(--text-primary)] leading-tight mb-4">
            N.V. Yashwanth
          </h1>
        </div>

        {/* Typing Subtitle (Underlined in Accent, Text Primary) */}
        <div className="min-h-[2.5rem] md:min-h-[3.5rem] flex items-center mb-6 overflow-visible py-1">
          <span className="text-sm sm:text-base md:text-2xl font-serif font-light text-[var(--text-secondary)] leading-snug">
            A passionate <span className="text-[var(--text-primary)] font-medium underline decoration-accent-primary/40 whitespace-nowrap">{displayedText}</span>
          </span>
          <span className="w-0.5 h-5 md:h-7 bg-accent-primary ml-1.5 animate-pulse shrink-0"></span>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8 max-w-xl font-sans font-medium">
          Passionate Computer Science Engineering student building intelligent applications using Artificial Intelligence, Machine Learning, Computer Vision, Python, Java, and modern web technologies.
        </p>

        {/* CTA Buttons (Cobalt Accent & Cream/Limestone borders) */}
        <div className="flex flex-wrap gap-4 mb-10">
          <a
            href="https://drive.google.com/uc?export=download&id=1qy9O6yapnNRSYLFImESbc2AN2t6fulo_"
            className="flex items-center gap-2 bg-accent-primary hover:bg-transparent text-text-on-accent hover:text-accent-primary border border-accent-primary px-6 py-3.5 rounded-md text-sm font-semibold tracking-wider transition-all duration-500 group cursor-pointer"
          >
            <span>DOWNLOAD RESUME</span>
            <FileText size={16} className="group-hover:scale-105 transition-all duration-500" />
          </a>
          <button 
            onClick={() => changePage('projects')}
            className="flex items-center gap-2 bg-transparent hover:bg-accent-primary text-[var(--text-primary)] hover:text-text-on-accent border border-[var(--border)] hover:border-accent-primary px-6 py-3.5 rounded-md text-sm font-semibold tracking-wider transition-all duration-500 group cursor-pointer"
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-all duration-500" />
          </button>
        </div>

        {/* Social Nodes & Location */}
        <div className="flex flex-wrap items-center gap-5 text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border)] px-3 py-2 rounded-md">
            <MapPin size={14} className="text-[var(--text-secondary)]" />
            <span>Chennai, India</span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/YASHWANTHTHEKING" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 bg-[var(--bg-secondary)] hover:bg-[var(--border)]/30 rounded-md hover:text-accent-primary border border-[var(--border)] transition-all duration-500 cursor-pointer"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/yashwanth-nv-78b5502a4/" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 bg-[var(--bg-secondary)] hover:bg-[var(--border)]/30 rounded-md hover:text-accent-primary border border-[var(--border)] transition-all duration-500 cursor-pointer"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:yash123ace@gmail.com" 
              className="p-2.5 bg-[var(--bg-secondary)] hover:bg-[var(--border)]/30 rounded-md hover:text-accent-primary border border-[var(--border)] transition-all duration-500 cursor-pointer"
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
