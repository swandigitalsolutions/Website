import { useEffect, useRef } from 'react'

/**
 * A living daytime-moon sky behind the whole site. As you scroll, the
 * hour moves from moonlit dawn → clear day → golden afternoon → moonrise
 * dusk: the gradient shifts, the moon travels an arc and brightens, clouds
 * drift with parallax and faint stars come out at the end. Never black.
 */

// [top, middle, horizon] per keyframe of the "day"
const HOURS = [
  { at: 0, sky: ['#b8c7ec', '#dfe4f6', '#f7e9ef'], moon: 0.62 },
  { at: 0.35, sky: ['#9ec3ec', '#d5e6f8', '#f1f6fc'], moon: 0.5 },
  { at: 0.7, sky: ['#a7b6e6', '#e2dbef', '#f9e3d6'], moon: 0.66 },
  { at: 1, sky: ['#6475b7', '#9ea8d8', '#ecc9d4'], moon: 0.96 },
]

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, t) => {
  const A = hex(a)
  const B = hex(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(' ')})`
}

// deterministic star field
const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453
    return x - Math.floor(x)
  }
  return { x: r(1) * 100, y: r(2) * 55, s: 1 + r(3) * 1.6, d: r(4) * 5 }
})

const CLOUDS = [
  { top: '12%', left: '-8%', w: 420, o: 0.75, dur: 140, delay: 0, depth: 0.05 },
  { top: '30%', left: '55%', w: 520, o: 0.55, dur: 180, delay: -60, depth: 0.08 },
  { top: '58%', left: '8%', w: 360, o: 0.5, dur: 160, delay: -30, depth: 0.11 },
  { top: '76%', left: '62%', w: 460, o: 0.45, dur: 200, delay: -90, depth: 0.14 },
]

export default function MoonSky() {
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
      el.style.setProperty('--moon-o', String(a.moon + (b.moon - a.moon) * t))
      // moon arc: rises on the right, crosses high, settles left
      el.style.setProperty('--moon-x', `${84 - p * 64}vw`)
      el.style.setProperty('--moon-y', `${20 - Math.sin(p * Math.PI) * 9}vh`)
      el.style.setProperty('--stars', String(Math.max(0, (p - 0.72) / 0.28)))
      el.style.setProperty('--scroll', String(window.scrollY))
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
    <div ref={ref} aria-hidden="true" className="moon-sky pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 stars" style={{ opacity: 'var(--stars)' }}>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
          />
        ))}
      </div>

      <div className="moon">
        <div className="moon-disc" />
      </div>

      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="cloud-wrap"
          style={{ top: c.top, left: c.left, transform: `translate3d(0, calc(var(--scroll, 0) * ${-c.depth}px), 0)` }}
        >
          <div className="cloud" style={{ width: c.w, opacity: c.o, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }} />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-white/35 to-transparent" />
    </div>
  )
}
