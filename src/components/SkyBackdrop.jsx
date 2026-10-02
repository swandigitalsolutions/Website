import { useEffect, useRef } from 'react'

/**
 * A soft sky gradient behind the whole site. As you scroll, the colour
 * moves from dawn lavender → clear day blue → golden afternoon → a
 * periwinkle dusk. Never black.
 *
 * Each hour is its own fixed gradient layer and scrolling only cross-fades
 * their opacity — a compositor-only change, so the full-screen gradient is
 * never repainted while scrolling (smooth on phones).
 */

// [top, middle, horizon] per keyframe of the "day"
const HOURS = [
  { at: 0, sky: ['#b8c7ec', '#dfe4f6', '#f7e9ef'] },
  { at: 0.35, sky: ['#9ec3ec', '#d5e6f8', '#f1f6fc'] },
  { at: 0.7, sky: ['#a7b6e6', '#e2dbef', '#f9e3d6'] },
  { at: 1, sky: ['#6475b7', '#9ea8d8', '#ecc9d4'] },
]

export default function SkyBackdrop() {
  const layers = useRef([])

  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    let max = 1
    const measure = () => {
      max = Math.max(1, root.scrollHeight - window.innerHeight)
    }
    const update = () => {
      raf = 0
      const p = Math.min(1, Math.max(0, window.scrollY / max))
      let i = 0
      while (i < HOURS.length - 2 && p > HOURS[i + 1].at) i++
      const t = (p - HOURS[i].at) / (HOURS[i + 1].at - HOURS[i].at)
      // layer i is fully shown underneath; layer i+1 fades in over it
      layers.current.forEach((el, k) => {
        if (!el) return
        el.style.opacity = String(k <= i ? 1 : k === i + 1 ? t : 0)
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }
    measure()
    update()
    // the page grows as images load, so keep the scroll range current
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {HOURS.map((h, k) => (
        <div
          key={h.at}
          ref={(el) => (layers.current[k] = el)}
          className="absolute inset-0 will-change-[opacity]"
          style={{
            opacity: k === 0 ? 1 : 0,
            background: `linear-gradient(to bottom, ${h.sky[0]} 0%, ${h.sky[1]} 55%, ${h.sky[2]} 100%)`,
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-white/35 to-transparent" />
    </div>
  )
}
