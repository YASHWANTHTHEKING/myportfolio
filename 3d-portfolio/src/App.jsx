import React, { useState, useEffect } from 'react';
import Sidebar from './components/ui/Sidebar';
import Home from './components/ui/pages/Home';
import About from './components/ui/pages/About';
import Projects from './components/ui/pages/Projects';
import Blog from './components/ui/pages/Blog';
import Contact from './components/ui/pages/Contact';
import CommandPalette from './components/ui/CommandPalette';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, about, projects, blog, contact
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [theme, setTheme] = useState('dark');

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
    <div className="w-screen h-screen flex flex-col xl:flex-row bg-[var(--bg-primary)] relative text-[var(--text-primary)] transition-colors duration-300 overflow-hidden font-sans">
      
      {/* Navigation Dock */}
      <Sidebar 
        currentPage={currentPage} 
        changePage={changePage} 
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main viewport frame */}
      <main className="flex-1 relative h-full w-full overflow-hidden">
        
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
