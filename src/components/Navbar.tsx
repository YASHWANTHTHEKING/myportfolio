import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav
      className="relative w-full"
      style={{ zIndex: 10 }}
      aria-label="Main navigation"
    >
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '1.5rem 2rem',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-display"
          style={{
            fontSize: '1.875rem',
            letterSpacing: '-0.025em',
            color: '#000000',
            textDecoration: 'none',
            lineHeight: 1,
          }}
          aria-label="N. V. Yashwanth home"
        >
          Yashwanth
        </Link>

        {/* Nav links */}
        <ul
          className="hidden sm:flex items-center gap-8"
          style={{ listStyle: 'none' }}
          role="list"
        >
          {/* Hash-anchor links (scroll) */}
          {[
            { label: 'Home', color: '#000000', href: '#' },
            { label: 'Work', color: '#6F6F6F', href: '#work' },
            { label: 'About', color: '#6F6F6F', href: '#about' },
            { label: 'Contact', color: '#6F6F6F', href: '#contact' },
          ].map(({ label, color, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-body"
                style={{
                  fontSize: '0.875rem',
                  color,
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#000000')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = color)
                }
              >
                {label}
              </a>
            </li>
          ))}

          {/* Notes — React Router link to /notes page */}
          <li>
            <Link
              to="/notes"
              className="font-body"
              style={{
                fontSize: '0.875rem',
                color: '#6F6F6F',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#000000')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#6F6F6F')
              }
            >
              Notes
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <button
          className="font-body cursor-pointer"
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: '0.625rem 1.5rem',
            fontSize: '0.875rem',
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
          aria-label="Say Hello"
          onClick={() => {
            const el = document.getElementById('contact')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Say Hello
        </button>
      </div>
    </nav>
  )
}
