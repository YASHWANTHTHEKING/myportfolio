import React, { useState } from 'react';
import { 
  Home, User, Briefcase, BookOpen, Mail,
  Sun, Moon, Terminal, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ currentPage, changePage, openCommandPalette, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'blog', icon: BookOpen, label: 'Blog' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  return (
    <>
      {/* Desktop Persistent Dock */}
      <nav className="hidden xl:flex flex-col items-stretch justify-between py-8 px-5 h-[92vh] my-auto ml-6 rounded-md glass-card z-50 shrink-0 select-none w-52">
        
        {/* Brand Logo / Name */}
        <div 
          onClick={() => changePage('home')}
          className="cursor-pointer flex items-center gap-3 px-2 py-1.5"
        >
          <div className="font-bold text-sm tracking-wider text-slate-100 flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary/20 border border-accent-primary/30">
            NY
          </div>
          <span className="font-bold text-sm text-[var(--text-primary)]">Yashwanth</span>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1.5 my-auto py-4">
          {navItems.map(({ id, icon: Icon, label }) => {
            const isActive = currentPage === id;
            return (
              <button
                key={id}
                onClick={() => changePage(id)}
                className="relative flex items-center gap-3 px-3.5 py-3 rounded-md transition-all duration-300 pointer-events-auto cursor-pointer"
                aria-label={label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-accent-primary/10 border border-accent-primary/20 rounded-md"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <Icon 
                  size={18} 
                  className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-accent-primary' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`} 
                />
                <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-accent-primary' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Utility Actions */}
        <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
          {/* Command Palette Button */}
          <button
            onClick={openCommandPalette}
            className="flex items-center gap-3 px-3.5 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-md transition-all duration-200 cursor-pointer"
            title="Search palette"
          >
            <Terminal size={18} />
            <span className="text-sm font-medium">Palette</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3.5 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-md transition-all duration-200 cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm font-medium">Theme</span>
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Floating Header */}
      <div className="xl:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-4 glass-card rounded-md border border-white/5 shadow-lg">
        <div 
          onClick={() => changePage('home')}
          className="font-bold text-base text-[var(--text-primary)] cursor-pointer"
        >
          Yashwanth
        </div>

        <div className="flex items-center gap-2">
          {/* Theme on mobile */}
          <button onClick={toggleTheme} className="p-2 text-[var(--text-secondary)] cursor-pointer">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--text-primary)] bg-accent-primary/10 rounded-lg cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed inset-x-4 top-20 z-40 p-5 glass-card rounded-md flex flex-col gap-3 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navItems.map(({ id, icon: Icon, label }) => {
                const isActive = currentPage === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      changePage(id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all cursor-pointer ${isActive ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' : 'text-[var(--text-secondary)] bg-white/5 hover:bg-white/10'}`}
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
              className="mt-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 border border-white/5 text-accent-primary font-medium rounded-md hover:bg-slate-800 transition-all text-sm cursor-pointer"
            >
              <Terminal size={16} />
              Open Command Palette
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
