import React, { useState, useEffect, useRef, Suspense } from 'react';
import Sidebar from './components/ui/Sidebar';
import Loader from './components/ui/Loader';
import DeskScene from './components/3d/DeskScene';
import Home from './components/ui/pages/Home';
import About from './components/ui/pages/About';
import Skills from './components/ui/pages/Skills';
import ExperienceTimeline from './components/ui/pages/ExperienceTimeline';
import ProjectOverlay from './components/ui/pages/ProjectOverlay';
import DashboardStats from './components/ui/pages/DashboardStats';
import Certifications from './components/ui/pages/Certifications';
import Research from './components/ui/pages/Research';
import Blog from './components/ui/pages/Blog';
import Contact from './components/ui/pages/Contact';
import CommandPalette from './components/ui/CommandPalette';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, about, skills, experience, projects, stats, certifications, research, blog, contact
  const [isZoomedToLaptop, setIsZoomedToLaptop] = useState(false);
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

  // Mouse coords for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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



  // View transition logic for clicking laptop
  const handleLaptopClick = () => {
    setIsZoomedToLaptop(true);
    setCurrentPage('projects');
  };

  const handleBackToDesk = () => {
    setIsZoomedToLaptop(false);
    setCurrentPage('home');
  };

  const changePage = (page) => {
    setCurrentPage(page);
    if (page === 'projects') {
      setIsZoomedToLaptop(true);
    } else {
      setIsZoomedToLaptop(false);
    }
  };

  // Open specific project details (triggered by Command Palette)
  const openProjectModal = (projId) => {
    setSelectedProjectId(projId);
  };

  return (
    <div className="w-screen h-screen flex flex-col xl:flex-row bg-[var(--bg-primary)] relative text-[var(--text-primary)] transition-colors duration-300 overflow-hidden font-sans select-none">
      
      {/* Background Aurora Glow Blobs */}
      <div className="bg-aurora bg-aurora-1"></div>
      <div className="bg-aurora bg-aurora-2"></div>
      <div className="bg-aurora bg-aurora-3"></div>

      {/* Noise texture overlay */}
      <div className="noise-overlay"></div>

      {/* Mouse Spotlight Lighting Effect */}
      <div className="spotlight-overlay"></div>


      
      {/* 2D Glassmorphic Sidebar/Navbar */}
      <Sidebar 
        currentPage={currentPage} 
        changePage={changePage} 
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main viewport frame */}
      <main className="flex-1 relative h-full w-full">
        
        {/* 3D Canvas Scene active only on Home & Projects pages to prevent background rendering lag */}
        {(currentPage === 'home' || currentPage === 'projects') && (
          <div className="absolute inset-0 z-0">
            <Suspense fallback={<Loader />}>
              <DeskScene 
                isZoomedToLaptop={isZoomedToLaptop} 
                onLaptopClick={handleLaptopClick} 
                theme={theme}
              />
            </Suspense>
          </div>
        )}

        {/* 2D HTML Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-8 xl:p-12 overflow-y-auto custom-scrollbar pt-24 xl:pt-12">
          
          <AnimatePresence mode="wait">
            {currentPage === 'home' && !isZoomedToLaptop && (
              <Home key="home" changePage={changePage} />
            )}

            {currentPage === 'about' && (
              <About key="about" />
            )}

            {currentPage === 'skills' && (
              <Skills key="skills" />
            )}

            {currentPage === 'experience' && (
              <ExperienceTimeline key="experience" />
            )}

            {currentPage === 'projects' && isZoomedToLaptop && (
              <ProjectOverlay 
                key="projects" 
                onBack={handleBackToDesk} 
                selectedProjectId={selectedProjectId}
                clearSelectedProject={() => setSelectedProjectId(null)}
              />
            )}

            {currentPage === 'stats' && (
              <DashboardStats key="stats" />
            )}

            {currentPage === 'certifications' && (
              <Certifications key="certifications" />
            )}

            {currentPage === 'research' && (
              <Research key="research" />
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
