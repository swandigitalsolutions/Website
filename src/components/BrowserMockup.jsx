import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from '../lib/motion'
import { Lock, Circle, ArrowUpRight } from 'lucide-react'
import { FEATURED_PROJECTS } from '../data/projects'

export default function BrowserMockup() {
  const [i, setI] = useState(0)
  const rootRef = useRef(null)
  const inView = useInView(rootRef)
  const go = setI

  // advance, and fetch the next capture, only while the hero is on screen
  useEffect(() => {
    if (!inView) return undefined
    const nextIndex = (i + 1) % FEATURED_PROJECTS.length
    const next = new Image()
    next.decoding = 'async'
    next.src = FEATURED_PROJECTS[nextIndex].image
    const id = setTimeout(() => setI(nextIndex), 4200)
    return () => clearTimeout(id)
  }, [i, inView])

  const project = FEATURED_PROJECTS[i]
  const host = new URL(project.href).hostname

  return (
    <div ref={rootRef} className="relative w-full max-w-md">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="flex h-11 items-center gap-3 border-b border-line bg-surface2 px-4">
          <div className="flex gap-1.5">
            <Circle size={10} className="fill-red/70 text-red/70" />
            <Circle size={10} className="fill-[#F59E0B]/70 text-[#F59E0B]/70" />
            <Circle size={10} className="fill-[#10B981]/70 text-[#10B981]/70" />
          </div>
          <div className="flex h-6 min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-md border border-line bg-ink px-3 text-[11px] text-mist">
            <Lock size={11} className="shrink-0 text-red" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={host}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="truncate font-mono text-fg/70"
              >
                {host}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative aspect-[2/1] bg-ink">
          <AnimatePresence initial={false}>
            <motion.img
              key={project.image}
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              decoding="async"
              width={1600}
              height={800}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`absolute inset-0 h-full w-full object-contain ${i ? 'fade-swap' : ''}`}
            />
          </AnimatePresence>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} website in a new tab`}
            className="absolute inset-0 z-10"
          />
        </div>

        <div className="flex h-10 items-center border-t border-line bg-surface2 px-4">
          {FEATURED_PROJECTS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => go(index)}
              aria-label={`Show ${item.title} in the project preview`}
              aria-pressed={index === i}
              className="group flex h-6 w-6 shrink-0 items-center justify-center"
            >
              <span className={`block h-1.5 rounded-full transition-all ${index === i ? 'w-5 bg-red' : 'w-1.5 bg-line group-hover:bg-mist'}`} />
            </button>
          ))}
          <span className="ml-auto hidden min-w-0 items-center gap-1.5 eyebrow text-[10px] text-mist">
            <span className="truncate">{project.title}</span>
            <ArrowUpRight size={12} className="shrink-0" />
          </span>
        </div>
      </div>

      <div
        style={{ '--d': '0.7s' }}
        className="hero-pop absolute -bottom-5 -right-3 rounded-xl border border-line bg-surface px-4 py-2.5 shadow-card sm:-right-6"
      >
        <div className="font-display text-sm font-semibold leading-none text-white">{FEATURED_PROJECTS.length} client projects</div>
        <div className="mt-1 text-[10px] text-mist">Websites · software · AI</div>
      </div>
    </div>
  )
}
