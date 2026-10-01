import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import ProjectMark from './ProjectMark'

const N = PROJECTS.length
const STEP = 360 / N
const EASE = [0.22, 1, 0.36, 1]

// shortest signed distance between two angles, in (-180, 180]
const wrap = (deg) => ((((deg + 180) % 360) + 360) % 360) - 180

const PECK_EVERY = 3.4 // seconds between the swan's nudges

/**
 * "Project orbit": every client site stands on a 3D carousel kept turning
 * by a real-time 3D swan at its hub: every few seconds it strikes with its
 * beak and the reel advances one card on contact. The swan watches the
 * pointer, leans into spins, and the ring still picks up speed from page
 * scroll, can be flung by dragging (with inertia), and eases to any card
 * that's tapped. The front-facing project is captioned below.
 */
export default function ProjectOrbit() {
  const stageRef = useRef(null)
  const rot = useMotionValue(0)
  const [front, setFront] = useState(0)
  const [cardW, setCardW] = useState(340)
  const [hovering, setHovering] = useState(false)
  const reduce = useRef(false)
  const canvasRef = useRef(null)
  const swan = useRef(null)
  const [floorFrac, setFloorFrac] = useState(0.72)
  const idle = useRef(0)
  const lastRot = useRef(0)

  // interaction state lives in refs so the frame loop never re-renders
  const target = useRef(null)
  const fling = useRef(0)
  const drag = useRef(null)

  const { scrollY } = useScroll()
  const scrollVel = useVelocity(scrollY)

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      setCardW(Math.round(Math.min(400, Math.max(200, w * 0.3))))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const radius = Math.round((cardW / 2) / Math.tan(Math.PI / N) * 1.12)
  const cardH = Math.round(cardW * 0.5) + 58
  // the swan's canvas stands at the ring's centre (farther away than the
  // front card), so it is drawn larger to read at the right scale
  const swanW = Math.round(cardW * 2.8)
  const swanH = Math.round(cardH * 3)
  const headroom = Math.round(cardH * 0.75)
  const counterRot = useTransform(rot, (r) => -r)

  // load three.js + the swan only when the section is about to be seen
  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return
    let disposed = false
    let io
    const load = async () => {
      try {
        const { createSwanScene } = await import('../lib/swanScene')
        if (disposed) return
        const api = createSwanScene(canvas, { reducedMotion: reduce.current })
        api.resize(canvas.clientWidth, canvas.clientHeight)
        setFloorFrac(api.floorFraction())
        swan.current = api
        io = new IntersectionObserver(([e]) => api.setActive(e.isIntersecting && !document.hidden), { rootMargin: '120px' })
        io.observe(stage)
      } catch {
        swan.current = null // no WebGL: the reel advances on its own
      }
    }
    const pre = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        pre.disconnect()
        load()
      }
    }, { rootMargin: '600px' })
    pre.observe(stage)
    const onVis = () => swan.current?.setActive(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      disposed = true
      pre.disconnect()
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      swan.current?.dispose()
      swan.current = null
    }
  }, [])

  useEffect(() => {
    swan.current?.resize(swanW, swanH)
  }, [swanW, swanH])

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 50) / 1000
    if (drag.current?.active) return
    let r = rot.get()
    if (target.current !== null) {
      const diff = target.current - r
      r += diff * Math.min(1, dt * 7)
      if (Math.abs(diff) < 0.05) {
        r = target.current
        target.current = null
      }
    } else {
      if (!reduce.current) {
        const fromScroll = -scrollVel.get() * 0.018
        r += (fromScroll + fling.current) * dt
      }
      fling.current *= Math.pow(0.04, dt) // inertia decay
      if (Math.abs(fling.current) < 0.5) fling.current = 0
    }
    rot.set(r)

    // the swan reads the ring's angular velocity to lean and look along it
    swan.current?.setSpin((r - lastRot.current) / Math.max(dt, 0.001))
    lastRot.current = r

    // when the reel is at rest and nobody is hovering, the swan nudges it on
    const resting = target.current === null && fling.current === 0 && Math.abs(scrollVel.get()) < 30
    if (!reduce.current && !hovering && resting) {
      idle.current += dt
      if (idle.current >= PECK_EVERY) {
        idle.current = 0
        const next = Math.round(-r / STEP) + 1
        const advance = () => {
          const cur = rot.get()
          target.current = cur + wrap(-next * STEP - cur)
        }
        if (!swan.current?.peck(advance)) advance()
      }
    } else {
      idle.current = 0
    }
  })

  useMotionValueEvent(rot, 'change', (r) => {
    const i = ((Math.round(-r / STEP) % N) + N) % N
    setFront((f) => (f === i ? f : i))
  })

  const goTo = (i) => {
    const current = rot.get()
    fling.current = 0
    target.current = current + wrap(-i * STEP - current)
  }

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, last: e.clientX, t: performance.now(), v: 0, active: false, moved: false, id: e.pointerId }
  }
  const onPointerMove = (e) => {
    const sr = stageRef.current?.getBoundingClientRect()
    if (sr && e.pointerType === 'mouse') {
      swan.current?.look(((e.clientX - sr.left) / sr.width - 0.5) * 2, ((e.clientY - sr.top) / sr.height - 0.5) * 2)
    }
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!d.active) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        d.active = true
        d.moved = true
        target.current = null
        stageRef.current?.setPointerCapture?.(d.id)
      } else if (Math.abs(dy) > 10) {
        drag.current = null // vertical intent: let the page scroll
      }
      return
    }
    const now = performance.now()
    const step = e.clientX - d.last
    const deg = step * (180 / (Math.PI * radius)) * 1.1
    rot.set(rot.get() + deg)
    d.v = (deg / Math.max(1, now - d.t)) * 1000
    d.last = e.clientX
    d.t = now
  }
  const endDrag = () => {
    const d = drag.current
    if (d?.active) fling.current = Math.max(-400, Math.min(400, d.v))
    // keep `moved` around for the click handler that fires right after
    if (d) d.active = false
    setTimeout(() => { if (drag.current === d) drag.current = null }, 0)
  }

  const onCardClick = (e, i) => {
    if (drag.current?.moved) {
      e.preventDefault()
      return
    }
    if (i !== front) {
      e.preventDefault()
      goTo(i)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo((front + 1) % N) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo((front - 1 + N) % N) }
  }

  const project = PROJECTS[front]

  return (
    <section
      aria-label="Selected client projects"
      className="sheet overflow-hidden py-14 sm:py-20"
    >
      <div className="absolute inset-0 noise-grid opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow text-mist">Selected projects across industries</p>
          <p className="mt-2 text-xs text-mist/80">Our swan keeps the reel turning — or drag, scroll and tap the cards yourself</p>
        </div>

        {/* 3D stage */}
        <div
          ref={stageRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client project reel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false)
            swan.current?.look(0, 0)
          }}
          className="relative mx-auto mt-6 select-none touch-pan-y cursor-grab active:cursor-grabbing focus-visible:outline-none"
          style={{ height: headroom + cardH + 120, perspective: 1100, perspectiveOrigin: `50% ${headroom + cardH / 2}px` }}
        >
          {/* floor: glow, orbit track and travelling light */}
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(var(--red)/0.14),transparent)]"
            style={{ width: radius * 2.6, height: 110, top: headroom + cardH - 40 }}
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 overflow-visible"
            style={{ width: radius * 2.2, height: 56, top: headroom + cardH - 24 }}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
          >
            <ellipse cx="100" cy="20" rx="99" ry="19" fill="none" stroke="rgb(var(--fg) / 0.12)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            <ellipse cx="100" cy="20" rx="99" ry="19" fill="none" stroke="rgb(var(--red))" strokeWidth="1.6" strokeDasharray="14 300" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="orbit-dash" pathLength="314" />
          </svg>

          <motion.div
            className="absolute left-1/2"
            style={{
              top: headroom,
              width: cardW,
              height: cardH,
              marginLeft: -cardW / 2,
              transformStyle: 'preserve-3d',
              rotateY: rot,
              z: -radius,
            }}
          >
            {/* the swan: a camera-facing canvas standing at the hub of the ring */}
            <motion.canvas
              ref={canvasRef}
              aria-hidden="true"
              className="pointer-events-none absolute"
              style={{
                width: swanW,
                height: swanH,
                left: (cardW - swanW) / 2,
                top: cardH - floorFrac * swanH,
                rotateY: counterRot,
              }}
            />
            {PROJECTS.map((p, i) => (
              <OrbitCard
                key={p.title}
                project={p}
                index={i}
                rot={rot}
                radius={radius}
                width={cardW}
                height={cardH}
                isFront={i === front}
                onClick={(e) => onCardClick(e, i)}
              />
            ))}
          </motion.div>
        </div>

        {/* caption for the front project */}
        <div className="relative -mt-4 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
          <button
            type="button"
            onClick={() => goTo((front - 1 + N) % N)}
            aria-label="Previous project"
            className="hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg shadow-card transition-all hover:border-red hover:bg-red hover:text-[#fff]"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="min-h-[92px] w-full max-w-xl" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex items-center gap-4"
              >
                <ProjectMark project={project} size={56} />
                <div className="min-w-0 flex-1 text-left">
                  <p className="eyebrow text-[10px] text-red">{project.category}</p>
                  <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl">{project.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-mist">
                    <span className="truncate">{project.product}</span>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 font-medium text-fg hover:text-red"
                    >
                      Visit site <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
                <span className="hidden font-mono text-xs text-mist sm:block tabular-nums">
                  {String(front + 1).padStart(2, '0')}
                  <span className="opacity-50"> / {String(N).padStart(2, '0')}</span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => goTo((front + 1) % N)}
            aria-label="Next project"
            className="hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg shadow-card transition-all hover:border-red hover:bg-red hover:text-[#fff]"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* index rail */}
        <div className="mt-6 flex justify-center gap-1.5">
          {PROJECTS.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Turn to ${p.title}`}
              aria-current={i === front ? 'true' : undefined}
              className="group relative h-6 px-0.5"
            >
              <span className={`block h-1 rounded-full transition-all duration-500 ${i === front ? 'w-8 bg-red' : 'w-3 bg-line group-hover:bg-mist'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function OrbitCard({ project, index, rot, radius, width, height, isFront, onClick }) {
  const base = index * STEP
  // how directly the card faces the viewer: 1 = front, -1 = back
  const facing = useTransform(rot, (r) => Math.cos(((base + r) * Math.PI) / 180))
  const opacity = useTransform(facing, [-1, 0, 1], [0.28, 0.55, 1])
  const brightness = useTransform(facing, [-1, 1], [0.55, 1])
  const filter = useTransform(brightness, (b) => `brightness(${b}) saturate(${0.6 + b * 0.4})`)
  const host = new URL(project.href).hostname

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      draggable={false}
      tabIndex={isFront ? 0 : -1}
      aria-label={isFront ? `Open ${project.title} in a new tab` : `Turn to ${project.title}`}
      className="orbit-card group absolute inset-0 block overflow-hidden rounded-2xl border border-line bg-surface"
      style={{
        transform: `rotateY(${base}deg) translateZ(${radius}px)`,
        opacity,
        filter,
        width,
        height,
        boxShadow: isFront
          ? '0 30px 60px -24px rgba(16,24,40,0.45), 0 0 0 1px rgb(var(--red) / 0.35)'
          : '0 18px 40px -24px rgba(16,24,40,0.35)',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {/* mini browser chrome */}
      <div className="flex h-7 items-center gap-2 border-b border-line bg-surface2 px-2.5">
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]/70" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1 rounded bg-surface px-1.5 py-0.5 text-[9px] text-mist">
          <Lock size={8} className="shrink-0 text-red" />
          <span className="truncate font-mono">{host}</span>
        </span>
      </div>
      <div className={`relative overflow-hidden bg-gradient-to-br ${project.accent}`} style={{ height: height - 58 }}>
        <img
          src={project.image}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex h-[30px] items-center gap-2 px-2.5">
        <ProjectMark project={project} size={20} />
        <span className="truncate font-display text-xs font-semibold text-fg">{project.title}</span>
        <ArrowUpRight size={12} className={`ml-auto shrink-0 transition-colors ${isFront ? 'text-red' : 'text-mist'}`} />
      </div>
    </motion.a>
  )
}
