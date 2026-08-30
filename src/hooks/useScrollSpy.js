import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in view. Pass the list of
 * section ids (without the leading #). Picks the entry closest to the
 * top of the viewport among those intersecting.
 */
export default function useScrollSpy(ids, { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return

    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio)
          else visible.delete(e.target.id)
        })
        if (visible.size) {
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0]
          setActive(top)
        }
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 1] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return active
}
