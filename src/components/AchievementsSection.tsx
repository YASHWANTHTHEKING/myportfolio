import type React from 'react'
import { useReveal } from '../hooks/useReveal'

const achievements = [
  'Neo4j Certified — Healthcare Data Specialization',
  'Completed Data Specialization Internship at Quadruple Automation Services',
  'Built AI Resume Analyzer with Google Gemini API',
  'Developed Face Recognition Attendance System using OpenCV',
  'Designed Healthcare Knowledge Graph with Neo4j',
  'Built Interactive 3D Portfolio with Three.js & React Three Fiber',
  'Strong foundation in Data Structures & Algorithms',
  'Passionate about AI Research and Software Engineering',
]

const interests = [
  'Artificial Intelligence', 'Machine Learning', 'Large Language Models',
  'Full Stack Development', 'Computer Vision', 'Knowledge Graphs',
  '3D Web Development', 'Modern UI Design', 'Backend Development',
]

export function AchievementsSection() {
  const ref = useReveal()

  return (
    <section
      id="achievements"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '8rem 1.5rem' }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
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
          Achievements &amp; Interests
        </p>

        <h2
          className="reveal font-display"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-1.5px',
            color: '#000000',
            marginBottom: '4rem',
          }}
        >
          What I've{' '}
          <span style={{ color: '#6F6F6F' }}>accomplished.</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem',
          }}
        >
          {/* Achievements */}
          <div>
            <p
              className="reveal font-body"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#000',
                fontWeight: 500,
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #E5E5E5',
              }}
            >
              Achievements
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {achievements.map((a, i) => (
                <li
                  key={a}
                  className={`reveal reveal-delay-${Math.min(i + 1, 6)} font-body`}
                  style={{
                    fontSize: '0.9375rem',
                    color: '#6F6F6F',
                    lineHeight: 1.6,
                    paddingLeft: '1rem',
                    borderLeft: '2px solid #E5E5E5',
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Interests */}
          <div>
            <p
              className="reveal font-body"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#000',
                fontWeight: 500,
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #E5E5E5',
              }}
            >
              Interests
            </p>
            <div className="reveal reveal-delay-1" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="font-body"
                  style={{
                    border: '1px solid #E5E5E5',
                    borderRadius: '9999px',
                    padding: '0.375rem 1rem',
                    fontSize: '0.875rem',
                    color: '#000',
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Looking for */}
            <p
              className="reveal reveal-delay-2 font-body"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#000',
                fontWeight: 500,
                marginBottom: '1rem',
                marginTop: '2.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #E5E5E5',
              }}
            >
              Open to
            </p>
            <div className="reveal reveal-delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                'Software Engineering Internship',
                'AI/ML Internship',
                'Full Stack Developer Role',
                'Research Opportunities',
                'Freelance AI Projects',
                'Open Source Collaboration',
              ].map((opp) => (
                <span
                  key={opp}
                  className="font-body"
                  style={{
                    backgroundColor: '#000000',
                    borderRadius: '9999px',
                    padding: '0.375rem 1rem',
                    fontSize: '0.8125rem',
                    color: '#ffffff',
                  }}
                >
                  {opp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
