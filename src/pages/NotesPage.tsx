import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { useReveal } from '../hooks/useReveal'
import type React from 'react'

export function NotesPage() {
  const ref = useReveal()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Top nav */}
      <nav style={{ borderBottom: '1px solid #E5E5E5', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/"
            className="font-display"
            style={{ fontSize: '1.5rem', color: '#000', textDecoration: 'none', letterSpacing: '-0.02em' }}
          >
            Yashwanth
          </Link>
          <Link
            to="/"
            className="font-body"
            style={{ fontSize: '0.875rem', color: '#6F6F6F', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            ← Back to portfolio
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header style={{ padding: '5rem 1.5rem 3rem', maxWidth: '80rem', margin: '0 auto' }}>
        <p
          className="font-body"
          style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6F6F6F', marginBottom: '1rem' }}
        >
          Notes
        </p>
        <h1
          className="font-display"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1, letterSpacing: '-1.5px', color: '#000', marginBottom: '1rem' }}
        >
          Thoughts on{' '}
          <span style={{ color: '#6F6F6F' }}>AI & ML.</span>
        </h1>
        <p
          className="font-body"
          style={{ fontSize: '1.0625rem', color: '#6F6F6F', maxWidth: '40rem', lineHeight: 1.7 }}
        >
          Articles about Artificial Intelligence, Machine Learning, and building real software.
          Written by N. V. Yashwanth.
        </p>
      </header>

      {/* Posts list */}
      <main
        ref={ref as React.RefObject<HTMLElement>}
        style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem 6rem' }}
      >
        <div style={{ borderTop: '1px solid #E5E5E5' }}>
          {blogPosts.map((post, i) => (
            <article
              key={post.slug}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}
              style={{ borderBottom: '1px solid #E5E5E5', padding: '2.5rem 0' }}
            >
              <Link
                to={`/notes/${post.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-body"
                          style={{
                            border: '1px solid #E5E5E5',
                            borderRadius: '9999px',
                            padding: '0.15rem 0.7rem',
                            fontSize: '0.6875rem',
                            letterSpacing: '0.08em',
                            color: '#6F6F6F',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2
                      className="font-display"
                      style={{
                        fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                        fontWeight: 400,
                        color: '#000',
                        lineHeight: 1.2,
                        marginBottom: '0.5rem',
                        transition: 'color 200ms ease',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#6F6F6F')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#000')}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="font-body"
                      style={{ fontSize: '0.9375rem', color: '#6F6F6F', lineHeight: 1.6, maxWidth: '48rem' }}
                    >
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Meta */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p className="font-body" style={{ fontSize: '0.8125rem', color: '#6F6F6F', marginBottom: '0.25rem' }}>
                      {post.date}
                    </p>
                    <p className="font-body" style={{ fontSize: '0.8125rem', color: '#000' }}>
                      {post.readTime}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
