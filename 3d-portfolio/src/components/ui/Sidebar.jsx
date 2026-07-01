import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, User, Code, Clock, Briefcase, 
  Award, BookOpen, Mail, BarChart2,
  Sun, Moon, Volume2, VolumeX, Terminal, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ currentPage, changePage, openCommandPalette, theme, toggleTheme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Synthwave Web Audio Loop (completely self-contained!)
  const startMusic = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Simple ambient lo-fi synth synthesizer loop using Web Audio API
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime); // Low volume
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      // Note sequences (synthwave arpeggio: C3, G3, A3, F3, etc.)
      const notes = [130.81, 196.00, 220.00, 174.61]; // Hz
      let noteIndex = 0;

      const playNext = () => {
        if (!isPlaying && audioCtxRef.current) return;
        
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(notes[noteIndex], ctx.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        filter.Q.setValueAtTime(1, ctx.currentTime);
        
        osc.connect(filter);
        filter.connect(gainNode);
        
        osc.start();
        
        // Envelope
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
        
        osc.stop(ctx.currentTime + 2.0);
        
        noteIndex = (noteIndex + 1) % notes.length;
        
        // Schedule next note
        setTimeout(playNext, 2000);
      };

      setIsPlaying(true);
      playNext();
    } catch (e) {
      console.error("Web Audio API failed to initialize", e);
    }
  };

  const stopMusic = () => {
    setIsPlaying(false);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'experience', icon: Clock, label: 'Experience' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'stats', icon: BarChart2, label: 'Profiles' },
    { id: 'certifications', icon: Award, label: 'Certs' },
    { id: 'research', icon: BookOpen, label: 'Research' },
    { id: 'blog', icon: BookOpen, label: 'Blog' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  return (
    <>
      {/* Desktop Persistent Glassmorphic Dock */}
      <nav className="hidden xl:flex flex-col items-center justify-between py-8 px-4 h-[92vh] my-auto ml-6 rounded-3xl glass-card border border-white/10 z-50 shrink-0 select-none w-24">
        
        {/* Brand Logo */}
        <div 
          onClick={() => changePage('home')}
          className="cursor-pointer font-bold text-xl tracking-wider text-slate-100 flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:scale-105 transition-all duration-300"
        >
          NY
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-3 my-auto overflow-y-auto py-4 max-h-[50vh] no-scrollbar">
          {navItems.map(({ id, icon: Icon, label }) => {
            const isActive = currentPage === id;
            return (
              <button
                key={id}
                onClick={() => changePage(id)}
                className="relative group flex items-center justify-center p-3.5 w-12 h-12 rounded-xl transition-all duration-300 pointer-events-auto"
                aria-label={label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-indigo-500/20 border border-indigo-500/40 rounded-xl"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <Icon 
                  size={20} 
                  className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-100'}`} 
                />
                
                {/* Desktop Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-1 bg-slate-900/90 text-slate-100 text-xs font-semibold rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 shadow-xl border border-white/5 whitespace-nowrap">
                  {label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Utility Actions (Audio, Palette, Theme) */}
        <div className="flex flex-col gap-3">
          {/* Command Palette Button */}
          <button
            onClick={openCommandPalette}
            className="p-3 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-xl transition-all duration-200 group relative"
            title="Search palette"
          >
            <Terminal size={18} />
            <div className="absolute left-full ml-4 px-3 py-1 bg-slate-900/90 text-slate-100 text-xs font-semibold rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 shadow-xl border border-white/5 whitespace-nowrap">
              Palette <kbd className="ml-1 bg-slate-800 px-1 rounded text-[10px]">Ctrl+K</kbd>
            </div>
          </button>

          {/* Synthwave music player */}
          <button
            onClick={toggleMusic}
            className={`p-3 rounded-xl transition-all duration-200 relative group ${isPlaying ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-slate-100'}`}
            title="Ambient Music"
          >
            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <div className="absolute left-full ml-4 px-3 py-1 bg-slate-900/90 text-slate-100 text-xs font-semibold rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 shadow-xl border border-white/5 whitespace-nowrap">
              {isPlaying ? 'Mute Music' : 'Ambient Music'}
            </div>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-xl transition-all duration-200"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Floating Header */}
      <div className="xl:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-4 glass-card rounded-2xl border border-white/5 shadow-lg">
        <div 
          onClick={() => changePage('home')}
          className="font-bold text-lg text-slate-100 cursor-pointer"
        >
          Yashwanth
        </div>

        <div className="flex items-center gap-3">
          {/* Music on mobile */}
          <button onClick={toggleMusic} className={`p-2 rounded-lg ${isPlaying ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'}`}>
            {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Theme on mobile */}
          <button onClick={toggleTheme} className="p-2 text-slate-400">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-100 bg-indigo-500/10 rounded-lg"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed inset-x-4 top-20 z-40 p-6 glass-card rounded-3xl border border-white/10 flex flex-col gap-3 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map(({ id, icon: Icon, label }) => {
                const isActive = currentPage === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      changePage(id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 bg-white/5 hover:bg-white/10'}`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                );
              })}
            </div>
            
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                openCommandPalette();
              }}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-900 border border-white/5 text-indigo-400 font-medium rounded-xl hover:bg-slate-800 transition-all text-sm"
            >
              <Terminal size={16} />
              Open Command Palette (Ctrl+K)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
