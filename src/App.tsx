import { VideoBackground } from './components/VideoBackground'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { EducationExperienceSection } from './components/EducationExperienceSection'
import { AchievementsSection } from './components/AchievementsSection'
import { ContactSection } from './components/ContactSection'

function App() {
  return (
    <>
      {/* ── HERO (fullscreen with video) ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: '100svh', backgroundColor: '#ffffff' }}
      >
        <VideoBackground />
        <Navbar />
        <HeroSection />
      </div>

      {/* ── REMAINING SECTIONS ── */}
      <main style={{ backgroundColor: '#ffffff' }}>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationExperienceSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </>
  )
}

export default App
