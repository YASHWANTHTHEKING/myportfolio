import React, { useState, useEffect } from 'react';
import Sidebar from './components/ui/Sidebar';
import Home from './components/ui/pages/Home';
import About from './components/ui/pages/About';
import Projects from './components/ui/pages/Projects';
import Blog from './components/ui/pages/Blog';
import Contact from './components/ui/pages/Contact';
import CommandPalette from './components/ui/CommandPalette';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, about, projects, blog, contact
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [theme, setTheme] = useState('dark');

  // Custom Cursor state and Motion values
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Mouse move and hover listeners
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 2);
      dotY.set(e.clientY - 2);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = target.closest('a') || 
                            target.closest('button') || 
                            target.closest('input') || 
                            target.closest('textarea') || 
                            target.closest('[role="button"]') ||
                            target.classList.contains('cursor-pointer') ||
                            (target.tagName && ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName));
      setIsHovered(!!isInteractive);
    };

    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Keyboard shortcut listener for Command Palette (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  // Open specific project details (triggered by Command Palette)
  const openProjectModal = (projId) => {
    setSelectedProjectId(projId);
  };

  return (
    <div className="w-screen h-screen flex flex-col xl:flex-row bg-[var(--bg-primary)] relative text-[var(--text-primary)] transition-colors duration-300 overflow-hidden font-sans select-none">
      
      {/* Custom quiet-luxury Cursor */}
      {!isMobile && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--accent-primary)] pointer-events-none z-[99999]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            animate={{
              scale: isHovered ? 1.5 : 1,
              backgroundColor: isHovered ? "rgba(197, 163, 104, 0.08)" : "rgba(197, 163, 104, 0)",
              borderColor: isHovered ? "var(--accent-primary)" : "rgba(197, 163, 104, 0.25)"
            }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-1 h-1 rounded-full bg-[var(--accent-primary)] pointer-events-none z-[99999]"
            style={{
              x: dotX,
              y: dotY,
            }}
            animate={{
              scale: isHovered ? 0 : 1
            }}
            transition={{ duration: 0.15 }}
          />
        </>
      )}

      {/* Navigation Dock */}
      <Sidebar 
        currentPage={currentPage} 
        changePage={changePage} 
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main viewport frame */}
      <main className="flex-1 relative h-full w-full overflow-hidden select-text">
        
        {/* 2D HTML Content Overlays */}
        <div className="absolute inset-0 z-10 p-4 md:p-8 xl:p-12 overflow-y-auto custom-scrollbar pt-24 xl:pt-12">
          
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <Home key="home" changePage={changePage} />
            )}

            {currentPage === 'about' && (
              <About key="about" />
            )}

            {currentPage === 'projects' && (
              <Projects 
                key="projects" 
                selectedProjectId={selectedProjectId}
                clearSelectedProject={() => setSelectedProjectId(null)}
              />
            )}

            {currentPage === 'blog' && (
              <Blog key="blog" />
            )}

            {currentPage === 'contact' && (
              <Contact key="contact" />
            )}
          </AnimatePresence>
          
        </div>
      </main>

      {/* Global Command Palette Dialog menu */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        changePage={changePage}
        openProjectModal={openProjectModal}
      />
    </div>
  );
}

export default App;
