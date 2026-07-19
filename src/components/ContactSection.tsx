import type React from 'react'
import { useReveal } from '../hooks/useReveal'

const contactLinks = [
  {
    label: 'Portfolio',
    value: 'yashwanththeking.github.io/myportfolio',
    href: 'https://yashwanththeking.github.io/myportfolio/',
  },
  {
    label: 'GitHub',
    value: 'github.com/YASHWANTHTHEKING',
    href: 'https://github.com/YASHWANTHTHEKING',
  },
  {
    label: 'LinkedIn',
    value: 'Add your LinkedIn URL',
    href: '#',
  },
  {
    label: 'Email',
    value: 'Add your email address',
    href: '#',
  },
]

export function ContactSection() {
  const ref = useReveal()

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: '8rem 1.5rem 6rem',
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
          Contact
        </p>

        {/* Big heading */}
        <h2
          className="reveal font-display"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-2px',
            color: '#000000',
            marginBottom: '4rem',
            maxWidth: '40rem',
          }}
        >
          Let's build something{' '}
          <span style={{ color: '#6F6F6F' }}>great.</span>
        </h2>

        {/* Info + Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            borderTop: '1px solid #E5E5E5',
            paddingTop: '3rem',
          }}
        >
          {/* Identity */}
          <div className="reveal">
            <p
              className="font-body"
              style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6F6F6F', marginBottom: '0.75rem' }}
            >
              Who
            </p>
            <p className="font-display" style={{ fontSize: '1.5rem', color: '#000', marginBottom: '0.3rem' }}>
              N. V. Yashwanth
            </p>
            <p className="font-body" style={{ fontSize: '0.875rem', color: '#6F6F6F', lineHeight: 1.5 }}>
              AI Engineer · Full Stack Developer
              <br />
              Chennai, Tamil Nadu, India
            </p>
          </div>

          {/* Links */}
          {contactLinks.map((link, i) => (
            <div key={link.label} className={`reveal reveal-delay-${i + 1}`}>
              <p
                className="font-body"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#6F6F6F',
                  marginBottom: '0.75rem',
                }}
              >
                {link.label}
              </p>
              <a
                href={link.href}
                target={link.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="font-body"
                style={{
                  fontSize: '0.9375rem',
                  color: '#000000',
                  textDecoration: 'none',
                  borderBottom: '1px solid #E5E5E5',
                  paddingBottom: '0.1rem',
                  transition: 'border-color 200ms ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor = '#000')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor = '#E5E5E5')
                }
              >
                {link.value}
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="reveal"
          style={{
            borderTop: '1px solid #E5E5E5',
            marginTop: '4rem',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p className="font-body" style={{ fontSize: '0.8125rem', color: '#6F6F6F' }}>
            © 2025 N. V. Yashwanth. All rights reserved.
          </p>
          <p className="font-body" style={{ fontSize: '0.8125rem', color: '#6F6F6F' }}>
            AI Engineer · Full Stack Developer · Chennai, India
          </p>
        </div>
      </div>
    </section>
  )
}
