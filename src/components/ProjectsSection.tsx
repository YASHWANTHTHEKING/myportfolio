import type React from 'react'
import { useReveal } from '../hooks/useReveal'

const projects = [
  {
    number: '01',
    title: 'AI Resume Analyzer & Candidate Ranking Dashboard',
    category: 'Artificial Intelligence',
    description:
      'An AI-powered recruitment platform that intelligently analyzes resumes using Google Gemini AI. Extracts candidate skills, experience, education, and technical expertise, ranks applicants based on job requirements, generates AI insights, and provides recruiters with an interactive dashboard for efficient hiring decisions.',
    features: ['AI Resume Analysis', 'Candidate Ranking', 'Skill Extraction', 'Recruiter Dashboard', 'AI-generated Feedback'],
    tech: ['React', 'Python', 'Streamlit', 'Google Gemini API', 'Pandas', 'PyPDF'],
    github: '#',
    demo: null,
  },
  {
    number: '02',
    title: 'Interactive 3D Developer Portfolio',
    category: 'Frontend Development',
    description:
      'A modern interactive developer portfolio featuring cinematic animations, immersive 3D graphics, smooth page transitions, and responsive UI. Built to showcase projects and technical skills using the latest frontend technologies and creative web design techniques.',
    features: ['Interactive 3D Models', 'Smooth Animations', 'Responsive Layout', 'Dark Modern UI', 'Performance Optimized'],
    tech: ['React', 'Three.js', 'React Three Fiber', 'Framer Motion', 'Tailwind CSS', 'GSAP'],
    github: '#',
    demo: 'https://yashwanththeking.github.io/myportfolio/',
  },
  {
    number: '03',
    title: 'Face Recognition Attendance System',
    category: 'Artificial Intelligence',
    description:
      'An automated attendance management system that uses Computer Vision and Face Recognition technology to accurately detect and recognize students in real time. Eliminates manual attendance while improving speed and accuracy.',
    features: ['Face Detection', 'Face Recognition', 'Attendance Automation', 'Real-time Recognition', 'Student Database'],
    tech: ['Python', 'OpenCV', 'face_recognition', 'dlib', 'NumPy'],
    github: '#',
    demo: null,
  },
  {
    number: '04',
    title: 'Healthcare Knowledge Graph',
    category: 'Data Engineering',
    description:
      'Designed and developed healthcare knowledge graph models using Neo4j for representing medical entities and their relationships. Focused on organizing healthcare information efficiently for advanced querying and analysis during Data Specialization Internship.',
    features: ['Graph Data Modeling', 'Medical Entity Relations', 'Advanced Querying', 'Data Analysis'],
    tech: ['Neo4j', 'Cypher', 'Python', 'Graph Databases'],
    github: '#',
    demo: null,
  },
]

export function ProjectsSection() {
  const ref = useReveal()

  return (
    <section
      id="work"
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
          Work
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
          Selected{' '}
          <span style={{ color: '#6F6F6F' }}>projects.</span>
        </h2>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {projects.map((project, i) => (
            <article
              key={project.number}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              style={{
                borderTop: '1px solid #E5E5E5',
                padding: '2.5rem 0',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '4rem 1fr',
                  gap: '2rem',
                  alignItems: 'start',
                }}
              >
                {/* Number */}
                <span
                  className="font-body"
                  style={{ fontSize: '0.875rem', color: '#6F6F6F', paddingTop: '0.2rem' }}
                >
                  {project.number}
                </span>

                {/* Content */}
                <div>
                  {/* Header row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div>
                      <span
                        className="font-body"
                        style={{
                          fontSize: '0.6875rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#6F6F6F',
                          display: 'block',
                          marginBottom: '0.4rem',
                        }}
                      >
                        {project.category}
                      </span>
                      <h3
                        className="font-display"
                        style={{
                          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                          fontWeight: 400,
                          color: '#000000',
                          lineHeight: 1.2,
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body"
                          style={{
                            border: '1px solid #000000',
                            borderRadius: '9999px',
                            padding: '0.4rem 1.25rem',
                            fontSize: '0.8125rem',
                            color: '#000000',
                            textDecoration: 'none',
                            transition: 'background 200ms ease, color 200ms ease',
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLAnchorElement
                            el.style.background = '#000000'
                            el.style.color = '#ffffff'
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLAnchorElement
                            el.style.background = 'transparent'
                            el.style.color = '#000000'
                          }}
                        >
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body"
                          style={{
                            backgroundColor: '#000000',
                            borderRadius: '9999px',
                            padding: '0.4rem 1.25rem',
                            fontSize: '0.8125rem',
                            color: '#ffffff',
                            textDecoration: 'none',
                            transition: 'transform 200ms ease',
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)')
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)')
                          }
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="font-body"
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.7,
                      color: '#6F6F6F',
                      maxWidth: '56rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-body"
                        style={{
                          border: '1px solid #E5E5E5',
                          borderRadius: '9999px',
                          padding: '0.2rem 0.75rem',
                          fontSize: '0.75rem',
                          color: '#6F6F6F',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: '1px solid #E5E5E5' }} />
        </div>
      </div>
    </section>
  )
}
