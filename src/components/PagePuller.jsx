import { useEffect, useRef } from 'react'

/**
 * The page-turning swan. Every `.sheet` section is a page laid over the
 * sky; as the next page's top edge rises into view, a 3D swan glides onto
 * that edge, grips it in its beak and hauls it up as you scroll. The paper
 * lifts into a tent where the beak holds it — the faster the scroll, the
 * harder the pull. Once the page is through it lets go and glides off,
 * returning for the next one. Before the first scroll it waits at the
 * bottom of the screen holding the first page's edge.
 */

const SIZE_DESKTOP = 300
const SIZE_MOBILE = 210
const ENGAGE_TOP = 0.24 // release once the edge rises above 24% of the viewport
const WAIT_GAP = 26 // px above the bottom where the swan waits at page top
const ASPECT = 1.5 // canvas width / height, room for the whole swan

export default function PagePuller() {
  const canvasRef = useRef(null)
  const svgRef = useRef(null)
  const tentRef = useRef(null)
  const shadowRef = useRef(null)
  const lipRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const svg = svgRef.current
    let api = null
    let raf = 0
    let disposed = false
    let sheets = []
    const colors = new Map()

    const collect = () => {
      sheets = [...document.querySelectorAll('.sheet')]
      sheets.forEach((el) => {
        if (!colors.has(el)) colors.set(el, getComputedStyle(el).backgroundColor)
      })
    }

    // state machine: holding a sheet edge, releasing it, or idle
    const st = {
      held: null, // element whose edge the swan holds, or 'wait'
      phase: 'idle', // 'in' | 'hold' | 'out' | 'idle'
      vis: 0,
      y: 0,
      lastScroll: window.scrollY,
      vel: 0,
      last: performance.now(),
    }

    const size = () => (window.innerWidth < 768 ? SIZE_MOBILE : SIZE_DESKTOP)
    let S = size()
    let floorFrac = 0.75

    const pickCandidate = (vh) => {
      for (const el of sheets) {
        const top = el.getBoundingClientRect().top
        if (top > vh * ENGAGE_TOP && top <= vh + 4) return el
      }
      if (window.scrollY < 60) return 'wait'
      return null
    }
    const edgeY = (held, vh) => {
      if (held === 'wait') return vh - WAIT_GAP
      const top = held.getBoundingClientRect().top
      return Math.min(top, vh - WAIT_GAP)
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - st.last) / 1000 || 0.016)
      st.last = now
      const vh = window.innerHeight
      const vw = window.innerWidth

      // scroll velocity (px/s), smoothed
      const sy = window.scrollY
      const inst = (sy - st.lastScroll) / dt
      st.lastScroll = sy
      st.vel += (inst - st.vel) * Math.min(1, dt * 10)

      const cand = pickCandidate(vh)
      if (st.phase === 'idle' && cand) {
        st.held = cand
        st.phase = 'in'
      } else if ((st.phase === 'in' || st.phase === 'hold') && cand !== st.held) {
        st.phase = 'out' // the page went through (or a new one took over)
      }

      if (st.phase === 'in') {
        st.vis = Math.min(1, st.vis + dt * 2.6)
        if (st.vis >= 1) st.phase = 'hold'
      } else if (st.phase === 'out') {
        st.vis = Math.max(0, st.vis - dt * 2.2)
        if (st.vis <= 0) {
          st.phase = 'idle'
          st.held = null
        }
      }

      if (!st.held || st.vis <= 0 || !api) {
        svg.style.opacity = '0'
        canvas.style.opacity = '0'
        return
      }

      // the haul: a light grip at rest, harder the faster the page moves up
      const pulling = Math.max(0, st.vel)
      const pull = st.phase === 'out' ? 1 : Math.min(1, 0.12 + pulling / 1400)
      api.setPull(pull)

      const target = edgeY(st.held, vh)
      st.y = st.phase === 'in' && st.vis < 0.05 ? target : st.y + (target - st.y) * Math.min(1, dt * 18)

      const ease = st.vis * st.vis * (3 - 2 * st.vis)
      // glide in from the right, glide off up and to the right
      const offX = (1 - ease) * (st.phase === 'out' ? 140 : 220)
      const offY = st.phase === 'out' ? -(1 - ease) * 60 : 0
      const anchorX = vw * (vw < 768 ? 0.42 : 0.66) // clear of the chat button on phones
      const left = anchorX - S * ASPECT * 0.62 + offX
      const top = st.y - floorFrac * S + offY

      api.step(dt)
      canvas.style.transform = `translate3d(${left}px, ${top}px, 0)`
      canvas.style.opacity = String(ease)

      // paper tent: base on the page edge, apex at the beak tip
      const beak = api.beakScreen()
      const px = left + beak.x
      const py = Math.min(st.y - 1, top + beak.y)
      const h = Math.max(0, st.y - py) * ease
      const apexY = st.y - h
      const w = 70 + h * 1.9
      const base = st.y
      const d = `M${px - w} ${base} C${px - w * 0.45} ${base} ${px - w * 0.22} ${apexY} ${px} ${apexY} C${px + w * 0.22} ${apexY} ${px + w * 0.45} ${base} ${px + w} ${base} Z`
      tentRef.current.setAttribute('d', d)
      shadowRef.current.setAttribute('d', d)
      shadowRef.current.setAttribute('transform', `translate(0 ${3 + h * 0.08})`)
      lipRef.current.setAttribute('d', `M${px - w} ${base} C${px - w * 0.45} ${base} ${px - w * 0.22} ${apexY} ${px} ${apexY} C${px + w * 0.22} ${apexY} ${px + w * 0.45} ${base} ${px + w} ${base}`)
      const fill = st.held === 'wait' ? colors.get(sheets[0]) : colors.get(st.held)
      tentRef.current.setAttribute('fill', fill || 'rgb(250, 251, 255)')
      svg.style.opacity = h > 0.5 ? '1' : '0'
    }

    const onResize = () => {
      S = size()
      canvas.style.width = `${S * ASPECT}px`
      canvas.style.height = `${S}px`
      api?.resize(S * ASPECT, S)
      if (api) floorFrac = api.floorFraction()
      collect()
    }

    // load after the page has settled so the hero gets the first frames
    const start = async () => {
      try {
        const { createSwanScene } = await import('../lib/swanScene')
        if (disposed) return
        api = createSwanScene(canvas, { mode: 'puller' })
        onResize()
        raf = requestAnimationFrame(frame)
      } catch {
        api = null // no WebGL: the site simply scrolls normally
      }
    }
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200))
    const idleId = idle(start, { timeout: 2500 })

    window.addEventListener('resize', onResize)
    const mo = new MutationObserver(collect)
    mo.observe(document.querySelector('main') || document.body, { childList: true, subtree: false })
    collect()

    return () => {
      disposed = true
      ;(window.cancelIdleCallback || clearTimeout)(idleId)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      mo.disconnect()
      api?.dispose()
    }
  }, [])

  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 h-full w-full transition-opacity duration-200"
        style={{ opacity: 0 }}
      >
        <defs>
          <filter id="tent-shadow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <linearGradient id="tent-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#c9d3ea" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path ref={shadowRef} fill="rgba(25, 35, 75, 0.22)" filter="url(#tent-shadow)" />
        <path ref={tentRef} />
        <path ref={lipRef} fill="none" stroke="url(#tent-shade)" strokeWidth="1.5" />
      </svg>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40"
        style={{ opacity: 0, width: SIZE_DESKTOP * ASPECT, height: SIZE_DESKTOP }}
      />
    </>
  )
}
