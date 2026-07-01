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

  // Custom Cursor Follower refs (Direct DOM manipulation to avoid React re-renders on mousemove)
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const updateMouse = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleHoverStart = () => setCursorHovered(true);
    const handleHoverEnd = () => setCursorHovered(false);

    window.addEventListener('mousemove', updateMouse);
    
    // Add hover states to all buttons/links
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [currentPage, isZoomedToLaptop]); // Re-attach when page overlay components mount/unmount

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
    <div className="w-screen h-screen flex flex-col xl:flex-row bg-[#050816] relative text-slate-100 overflow-hidden font-sans select-none">
      
      {/* Background Aurora Glow Blobs */}
      <div className="bg-aurora bg-aurora-1"></div>
      <div className="bg-aurora bg-aurora-2"></div>
      <div className="bg-aurora bg-aurora-3"></div>

      {/* Noise texture overlay */}
      <div className="noise-overlay"></div>

      {/* Mouse Spotlight Lighting Effect */}
      <div className="spotlight-overlay"></div>

      {/* Custom Springy Cursor Follower (Hidden on touchscreen devices) */}
      <div 
        ref={cursorRef}
        className={`hidden md:block custom-cursor ${cursorHovered ? 'custom-cursor-hover' : ''}`}
        style={{ left: '-100px', top: '-100px' }}
      />
      <div 
        ref={cursorDotRef}
        className="hidden md:block custom-cursor-dot"
        style={{ left: '-100px', top: '-100px' }}
      />
      
      {/* 2D Glassmorphic Sidebar/Navbar */}
      <Sidebar 
        currentPage={currentPage} 
        changePage={changePage} 
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
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
                onLaptopHover={(hovered) => setCursorHovered(hovered)}
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
