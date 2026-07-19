import type React from 'react'
import { useReveal } from '../hooks/useReveal'

const tags = [
  'Problem Solver', 'Fast Learner', 'Team Player',
  'Creative Thinker', 'Curious Builder', 'Detail Oriented',
]

export function AboutSection() {
  const ref = useReveal()

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: '8rem 1.5rem',
        maxWidth: '80rem',
        margin: '0 auto',
      }}
    >
      {/* Label */}
      <p
        className="reveal font-body"
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#6F6F6F',
          marginBottom: '1.5rem',
        }}
      >
        About
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
        {/* Heading + bio */}
        <div>
          <h2
            className="reveal font-display"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-1.5px',
              color: '#000000',
              marginBottom: '2rem',
            }}
          >
            Building{' '}
            <span style={{ color: '#6F6F6F' }}>intelligent</span>
            <br />
            software.
          </h2>

          <p
            className="reveal reveal-delay-1 font-body"
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              color: '#6F6F6F',
              maxWidth: '52rem',
              marginBottom: '1.25rem',
            }}
          >
            I'm <strong style={{ color: '#000' }}>N. V. Yashwanth</strong>, a
            Computer Science Engineering student with a strong passion for
            Artificial Intelligence, Machine Learning, and Full Stack
            Development.
          </p>

          <p
            className="reveal reveal-delay-2 font-body"
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              color: '#6F6F6F',
              maxWidth: '52rem',
              marginBottom: '1.25rem',
            }}
          >
            I love designing and developing intelligent software that combines
            modern UI/UX with scalable backend architecture. My interests
            include AI-powered web applications, Computer Vision, Knowledge
            Graphs, Large Language Models, and immersive 3D web experiences.
          </p>

          <p
            className="reveal reveal-delay-3 font-body"
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              color: '#6F6F6F',
              maxWidth: '52rem',
            }}
          >
            Whether it's building AI Resume Analyzers, Face Recognition
            Systems, Healthcare Knowledge Graphs, or Interactive 3D Portfolios,
            I focus on creating products that are practical, efficient, and
            visually appealing.
          </p>
        </div>

        {/* Personality tags */}
        <div className="reveal reveal-delay-2">
          <p
            className="font-body"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#6F6F6F',
              marginBottom: '1rem',
            }}
          >
            Personality
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-body"
                style={{
                  border: '1px solid #E5E5E5',
                  borderRadius: '9999px',
                  padding: '0.375rem 1rem',
                  fontSize: '0.875rem',
                  color: '#000000',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
