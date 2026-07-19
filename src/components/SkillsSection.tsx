import type React from 'react'
import { useReveal } from '../hooks/useReveal'

const skillGroups = [
  {
    category: 'Programming Languages',
    skills: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'React Three Fiber', 'GSAP', 'Responsive Design'],
  },
  {
    category: 'Backend',
    skills: ['FastAPI', 'Spring Boot', 'Node.js', 'REST APIs', 'Authentication', 'API Integration'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'Neo4j', 'Redis'],
  },
  {
    category: 'Artificial Intelligence',
    skills: ['Google Gemini API', 'Machine Learning', 'Computer Vision', 'OpenCV', 'Face Recognition', 'TensorFlow', 'PyTorch', 'NLP', 'Prompt Engineering'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'IntelliJ IDEA', 'Postman', 'Figma'],
  },
]

export function SkillsSection() {
  const ref = useReveal()

  return (
    <section
      id="skills"
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
          Skills
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
          What I work{' '}
          <span style={{ color: '#6F6F6F' }}>with.</span>
        </h2>

        {/* Skill groups grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '3rem',
          }}
        >
          {skillGroups.map(({ category, skills }, i) => (
            <div
              key={category}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)}`}
            >
              <p
                className="font-body"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#000000',
                  fontWeight: 500,
                  marginBottom: '1rem',
                  borderBottom: '1px solid #E5E5E5',
                  paddingBottom: '0.75rem',
                }}
              >
                {category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-body"
                    style={{
                      border: '1px solid #E5E5E5',
                      borderRadius: '9999px',
                      padding: '0.3rem 0.875rem',
                      fontSize: '0.8125rem',
                      color: '#6F6F6F',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
