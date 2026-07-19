import type React from 'react'
import { useReveal } from '../hooks/useReveal'

const timeline = [
  {
    type: 'Education',
    title: 'Bachelor of Engineering — Computer Science',
    org: 'Prince Shri Venkateshwara Padmavathi Engineering College',
    location: 'Chennai, Tamil Nadu',
    period: '2023 – 2027',
    detail: 'Current CGPA: 7.65',
    tags: ['AI & ML', 'Data Structures', 'Algorithms', 'Web Development'],
  },
  {
    type: 'Experience',
    title: 'Data Specialization Intern',
    org: 'Quadruple Automation Services',
    location: 'India',
    period: 'Internship',
    detail: 'Healthcare data modeling and AI-related data solutions.',
    tags: ['Neo4j', 'Knowledge Graphs', 'Python', 'Data Analysis', 'Graph Databases'],
  },
]

export function EducationExperienceSection() {
  const ref = useReveal()

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: '8rem 1.5rem',
        backgroundColor: '#FAFAFA',
      }}
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
          Education &amp; Experience
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
          Where I've{' '}
          <span style={{ color: '#6F6F6F' }}>been.</span>
        </h2>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {timeline.map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                borderTop: '1px solid #E5E5E5',
                padding: '2.5rem 0',
                display: 'grid',
                gridTemplateColumns: '8rem 1fr',
                gap: '2rem',
              }}
            >
              {/* Type label */}
              <div>
                <span
                  className="font-body"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#6F6F6F',
                    display: 'block',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.type}
                </span>
                <span
                  className="font-body"
                  style={{ fontSize: '0.8125rem', color: '#000', fontWeight: 500 }}
                >
                  {item.period}
                </span>
              </div>

              {/* Details */}
              <div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                    fontWeight: 400,
                    color: '#000000',
                    marginBottom: '0.3rem',
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: '0.9rem', color: '#6F6F6F', marginBottom: '0.25rem' }}
                >
                  {item.org} · {item.location}
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: '0.875rem', color: '#000', marginBottom: '1rem', fontWeight: 500 }}
                >
                  {item.detail}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body"
                      style={{
                        border: '1px solid #E5E5E5',
                        borderRadius: '9999px',
                        padding: '0.2rem 0.75rem',
                        fontSize: '0.75rem',
                        color: '#6F6F6F',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #E5E5E5' }} />
        </div>
      </div>
    </section>
  )
}
