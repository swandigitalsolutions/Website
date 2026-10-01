import { useEffect, useRef } from 'react'

/**
 * A soft sky gradient behind the whole site. As you scroll, the colour
 * moves from dawn lavender → clear day blue → golden afternoon → a
 * periwinkle dusk. Never black.
 */

// [top, middle, horizon] per keyframe of the "day"
const HOURS = [
  { at: 0, sky: ['#b8c7ec', '#dfe4f6', '#f7e9ef'] },
  { at: 0.35, sky: ['#9ec3ec', '#d5e6f8', '#f1f6fc'] },
  { at: 0.7, sky: ['#a7b6e6', '#e2dbef', '#f9e3d6'] },
  { at: 1, sky: ['#6475b7', '#9ea8d8', '#ecc9d4'] },
]

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, t) => {
  const A = hex(a)
  const B = hex(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(' ')})`
}

export default function SkyBackdrop() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const root = document.documentElement
    let raf = 0
    const update = () => {
      raf = 0
      const max = Math.max(1, root.scrollHeight - window.innerHeight)
      const p = Math.min(1, Math.max(0, window.scrollY / max))
      let i = 0
      while (i < HOURS.length - 2 && p > HOURS[i + 1].at) i++
      const a = HOURS[i]
      const b = HOURS[i + 1]
      const t = (p - a.at) / (b.at - a.at)
      el.style.setProperty('--sky-top', mix(a.sky[0], b.sky[0], t))
      el.style.setProperty('--sky-mid', mix(a.sky[1], b.sky[1], t))
      el.style.setProperty('--sky-low', mix(a.sky[2], b.sky[2], t))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="sky-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-white/35 to-transparent" />
    </div>
  )
}
