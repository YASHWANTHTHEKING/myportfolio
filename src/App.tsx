import { VideoBackground } from './components/VideoBackground'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'

function App() {
  return (
    <main
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: '#ffffff' }}
    >
      {/* Layer 0 — Video + gradient overlay */}
      <VideoBackground />

      {/* Layer 10 — Navigation */}
      <Navbar />

      {/* Layer 10 — Hero content */}
      <HeroSection />
    </main>
  )
}

export default App
