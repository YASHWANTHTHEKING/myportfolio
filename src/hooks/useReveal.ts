import { useEffect, useRef } from 'react'

/**
 * Attach this to a container ref to trigger .reveal → .visible
 * on all child elements with the `.reveal` class when they enter the viewport.
 */
export function useReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll<HTMLElement>('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  return ref
}
