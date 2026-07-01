import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, FileText, ArrowRight, Laptop, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { id: 'home', title: 'Home Page', category: 'Navigation', icon: Terminal, action: 'navigate' },
  { id: 'about', title: 'About & Professional Bio', category: 'Navigation', icon: FileText, action: 'navigate' },
  { id: 'projects', title: 'Featured Projects & Research', category: 'Navigation', icon: Laptop, action: 'navigate' },
  { id: 'blog', title: 'Latest Technical Blogs', category: 'Navigation', icon: FileText, action: 'navigate' },
  { id: 'contact', title: 'Get In Touch', category: 'Navigation', icon: ArrowRight, action: 'navigate' },
  
  // Specific sections mapped to parent pages
  { id: 'about', title: 'Technical Skills & Proficiencies', category: 'Skills', icon: Sparkles, action: 'navigate' },
  { id: 'about', title: 'Education & Career Timeline', category: 'Experience', icon: FileText, action: 'navigate' },
  { id: 'about', title: 'Professional Certifications', category: 'Certificates', icon: FileText, action: 'navigate' },
  { id: 'projects', title: 'Academic Research Papers', category: 'Research', icon: FileText, action: 'navigate' },
  
  // Specific project direct navigation
  { id: 'project-music', title: 'Mood-Based Music Recommendation', category: 'Projects', icon: Laptop, action: 'project' },
  { id: 'project-emotion', title: 'Speech Emotion Recognition', category: 'Projects', icon: Laptop, action: 'project' },
  { id: 'project-face', title: 'Face Recognition Attendance System', category: 'Projects', icon: Laptop, action: 'project' },
  { id: 'project-health', title: 'Healthcare Biometric Authentication', category: 'Projects', icon: Laptop, action: 'project' },
];

const CommandPalette = ({ isOpen, onClose, changePage, openProjectModal }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle global keybindings
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, search, selectedIndex]);

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    if (item.action === 'navigate') {
      changePage(item.id);
    } else if (item.action === 'project') {
      changePage('projects');
      if (openProjectModal) {
        const projectMap = {
          'project-music': 1,
          'project-emotion': 2,
          'project-face': 3,
          'project-health': 4
        };
        setTimeout(() => openProjectModal(projectMap[item.id]), 150);
      }
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl glass-card rounded-md border border-white/10 shadow-2xl overflow-hidden pointer-events-auto bg-slate-900/90 text-slate-100"
          >
            {/* Search Bar */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 bg-slate-900/40">
              <Search className="text-slate-400 shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none text-base font-sans"
              />
              <button 
                onClick={onClose}
                className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-slate-100 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* List area */}
            <div className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-sm font-sans font-medium">
                  No commands found matching "{search}"
                </div>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-md cursor-pointer transition-all duration-150 ${isSelected ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/20' : 'text-slate-300 hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={isSelected ? 'text-accent-primary' : 'text-slate-400'} />
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-sans font-medium">{item.title}</span>
                          <span className="text-xs text-slate-500 font-sans font-normal uppercase tracking-wider">{item.category}</span>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <span className="text-xs text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded font-medium">
                          Enter ↵
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer tips */}
            <div className="px-4 py-2.5 bg-slate-950/40 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-sans font-medium select-none">
              <div className="flex items-center gap-2">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
              </div>
              <div>ESC to Close</div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
