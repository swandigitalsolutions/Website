import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Circle, ArrowUpRight } from 'lucide-react'
import { FEATURED_PROJECTS } from '../data/projects'

export default function BrowserMockup() {
  const [i, setI] = useState(0)
  // which way the card turns: +1 forward (auto-advance, next dot), -1 back
  const [dir, setDir] = useState(1)

  const go = (next) => {
    setDir(next > i || (i === FEATURED_PROJECTS.length - 1 && next === 0) ? 1 : -1)
    setI(next)
  }

  useEffect(() => {
    const id = setInterval(() => go((i + 1) % FEATURED_PROJECTS.length), 4200)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  // warm only the next slide, instead of fetching every capture at once
  useEffect(() => {
    const next = new Image()
    next.decoding = 'async'
    next.src = FEATURED_PROJECTS[(i + 1) % FEATURED_PROJECTS.length].image
  }, [i])

  const project = FEATURED_PROJECTS[i]
  const host = new URL(project.href).hostname

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full max-w-md"
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-card backdrop-blur-sm">
        <div className="flex h-11 items-center gap-3 border-b border-line bg-surface2 px-4">
          <div className="flex gap-1.5">
            <Circle size={10} className="fill-red/70 text-red/70" />
            <Circle size={10} className="fill-[#F59E0B]/70 text-[#F59E0B]/70" />
            <Circle size={10} className="fill-[#10B981]/70 text-[#10B981]/70" />
          </div>
          <div className="flex h-6 min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-md border border-line bg-ink px-3 text-[11px] text-mist">
            <Lock size={11} className="shrink-0 text-red" />
            <AnimatePresence mode="wait">
              <motion.span
                key={host}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="truncate font-mono"
              >
                {host}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative aspect-[2/1] bg-ink" style={{ perspective: 1400 }}>
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.img
              key={project.image}
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              decoding="async"
              custom={dir}
              initial={(d) => ({ opacity: 0, rotateY: d * 90, scale: 0.92 })}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={(d) => ({ opacity: 0, rotateY: d * -90, scale: 0.92 })}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              className="absolute inset-0 h-full w-full object-contain"
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

        <div className="flex h-10 items-center gap-1.5 border-t border-line bg-surface2 px-4">
          {FEATURED_PROJECTS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => go(index)}
              aria-label={`Show ${item.title} in the project preview`}
              aria-pressed={index === i}
              className={`h-1.5 rounded-full transition-all ${index === i ? 'w-6 bg-red' : 'w-1.5 bg-line hover:bg-mist'}`}
            />
          ))}
          <span className="ml-auto inline-flex min-w-0 items-center gap-1.5 eyebrow text-[10px] text-mist">
            <span className="truncate">{project.title}</span>
            <ArrowUpRight size={12} className="shrink-0" />
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 18 }}
        className="absolute -bottom-5 -right-3 rounded-xl border border-line bg-surface px-4 py-2.5 shadow-card sm:-right-6"
      >
        <div className="font-display text-sm font-semibold leading-none text-white">{FEATURED_PROJECTS.length} client projects</div>
        <div className="mt-1 text-[10px] text-mist">Websites · software · AI</div>
      </motion.div>
    </motion.div>
  )
}
