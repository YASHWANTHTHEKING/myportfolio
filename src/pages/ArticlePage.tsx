import { useParams, Link, Navigate } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/notes" replace />

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
  const prev = blogPosts[currentIndex + 1] ?? null
  const next = blogPosts[currentIndex - 1] ?? null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #E5E5E5', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="font-display" style={{ fontSize: '1.5rem', color: '#000', textDecoration: 'none', letterSpacing: '-0.02em' }}>
            Yashwanth
          </Link>
          <Link to="/notes" className="font-body" style={{ fontSize: '0.875rem', color: '#6F6F6F', textDecoration: 'none' }}>
            ← All notes
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article style={{ maxWidth: '48rem', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {post.tags.map((tag) => (
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

        {/* Title */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: '#000',
            marginBottom: '0.75rem',
          }}
        >
          {post.title}
        </h1>

        <p className="font-body" style={{ fontSize: '1.0625rem', color: '#6F6F6F', marginBottom: '1rem', lineHeight: 1.6 }}>
          {post.subtitle}
        </p>

        {/* Meta */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            borderTop: '1px solid #E5E5E5',
            borderBottom: '1px solid #E5E5E5',
            padding: '1rem 0',
            marginBottom: '2.5rem',
          }}
        >
          <span className="font-body" style={{ fontSize: '0.8125rem', color: '#6F6F6F' }}>
            {post.date}
          </span>
          <span className="font-body" style={{ fontSize: '0.8125rem', color: '#6F6F6F' }}>
            {post.readTime}
          </span>
          <span className="font-body" style={{ fontSize: '0.8125rem', color: '#6F6F6F' }}>
            N. V. Yashwanth
          </span>
        </div>

        {/* Content */}
        <div
          className="font-body article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: '#333333',
          }}
        />

        {/* Prev / Next */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            borderTop: '1px solid #E5E5E5',
            marginTop: '4rem',
            paddingTop: '2rem',
          }}
        >
          {prev ? (
            <Link
              to={`/notes/${prev.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <p className="font-body" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6F6F6F', marginBottom: '0.4rem' }}>
                ← Previous
              </p>
              <p className="font-display" style={{ fontSize: '1rem', color: '#000', lineHeight: 1.3 }}>
                {prev.title}
              </p>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={`/notes/${next.slug}`}
              style={{ textDecoration: 'none', textAlign: 'right' }}
            >
              <p className="font-body" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6F6F6F', marginBottom: '0.4rem' }}>
                Next →
              </p>
              <p className="font-display" style={{ fontSize: '1rem', color: '#000', lineHeight: 1.3 }}>
                {next.title}
              </p>
            </Link>
          ) : <div />}
        </div>

        {/* Back CTA */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link
            to="/notes"
            className="font-body"
            style={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '9999px',
              padding: '0.75rem 2rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              display: 'inline-block',
              transition: 'transform 200ms ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)')}
          >
            ← All notes
          </Link>
        </div>
      </article>
    </div>
  )
}
