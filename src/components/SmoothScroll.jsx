import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Enables Lenis inertia scrolling for the whole page and wires anchor
 * links (#section) through it so they glide instead of jumping.
 * Skipped for users who prefer reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Skip on reduced-motion and on touch devices — mobiles already have
    // native momentum scrolling, and Lenis adds a constant rAF there.
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return
    }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80 })
      history.pushState(null, '', id)
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  return null
}
