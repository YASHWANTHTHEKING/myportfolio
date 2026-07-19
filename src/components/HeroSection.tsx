export function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        paddingTop: 'calc(8rem - 75px)',
        paddingBottom: '10rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        zIndex: 10,
      }}
      aria-labelledby="hero-heading"
    >
      {/* Headline */}
      <h1
        id="hero-heading"
        className="font-display animate-fade-rise"
        style={{
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          maxWidth: '80rem',
          fontWeight: 400,
          lineHeight: 0.95,
          letterSpacing: '-2.46px',
          color: '#000000',
        }}
      >
        Hi, I'm{' '}
        <span style={{ color: '#6F6F6F' }}>Yashwanth</span>
      </h1>

      {/* Sub-tagline */}
      <p
        className="font-body animate-fade-rise-delay"
        style={{
          fontSize: '0.8125rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#6F6F6F',
          marginTop: '1.5rem',
        }}
      >
        AI Engineer &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp; CS Engineering Student
      </p>

      {/* Description */}
      <p
        className="font-body animate-fade-rise-delay"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
          maxWidth: '42rem',
          marginTop: '1.5rem',
          lineHeight: 1.7,
          color: '#6F6F6F',
        }}
      >
        I build AI-powered applications, immersive web experiences, and scalable
        software solutions. Combining beautiful interfaces with powerful AI and
        backend engineering to solve real-world problems.
      </p>

      {/* CTA Button */}
      <button
        className="font-body animate-fade-rise-delay-2 cursor-pointer"
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius: '9999px',
          padding: '1.25rem 3.5rem',
          fontSize: '1rem',
          marginTop: '3rem',
          border: 'none',
          transition: 'transform 200ms ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')
        }
        aria-label="See the work"
        onClick={() => {
          const el = document.getElementById('work')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        See the work
      </button>
    </section>
  )
}
