import { useEffect, useRef } from 'react'

const FADE_DURATION = 0.5 // seconds

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Kick off the rAF loop to handle fade-in / fade-out
    const tick = () => {
      if (!video) return

      const { currentTime, duration } = video

      if (!duration || isNaN(duration)) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const timeLeft = duration - currentTime

      if (currentTime < FADE_DURATION) {
        // Fade IN at start
        video.style.opacity = String(Math.min(currentTime / FADE_DURATION, 1))
      } else if (timeLeft < FADE_DURATION) {
        // Fade OUT near end
        video.style.opacity = String(Math.max(timeLeft / FADE_DURATION, 0))
      } else {
        video.style.opacity = '1'
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    // On ended: wait 100ms, reset, replay
    const handleEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
      }, 100)
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Video */}
      <video
        ref={videoRef}
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '300px',
          inset: 'auto 0 0 0',
          width: '100%',
          height: 'calc(100% - 300px)',
          objectFit: 'cover',
          opacity: 0,
          transition: 'none',
        }}
      />

      {/* Gradient overlay — top fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #ffffff 0%, transparent 35%, transparent 65%, #ffffff 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
