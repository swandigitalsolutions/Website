import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SwanMark from './SwanMark'
import { INTRO_MS, shouldPlayIntro } from '../lib/intro'

const EASE = [0.76, 0, 0.24, 1]

/**
 * Brand reveal once per browser session: the swan mark draws in while a
 * counter runs to 100, then a two-layer curtain (red, then navy) lifts
 * away to uncover the page. Skipped for reduced-motion users.
 */
export default function Intro() {
  const [show, setShow] = useState(shouldPlayIntro)

  useEffect(() => {
    if (!show) return
    document.body.style.overflow = 'hidden'

    const t = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = ''
      try {
        sessionStorage.setItem('sds_intro_seen', '1')
      } catch {
        /* ignore */
      }
    }, INTRO_MS)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" className="fixed inset-0 z-[100] pointer-events-auto" aria-hidden="true">
          {/* red trailing curtain */}
          <motion.div
            className="absolute inset-0 bg-red-gradient"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.9, ease: EASE, delay: 0.12 } }}
          />
          {/* navy lead curtain */}
          <motion.div
            className="on-night absolute inset-0 flex items-center justify-center bg-night overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: EASE } }}
          >
            <div className="absolute inset-0 noise-grid opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
            <div className="absolute w-[420px] h-[420px] bg-radial-glow rounded-full blur-2xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col items-center gap-5"
            >
              <SwanMark className="w-24 h-36" strokeWidth={4} />
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-semibold tracking-[0.2em] text-xl text-plainwhite"
                >
                  SWAN <span className="text-red">DIGITAL</span>
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="eyebrow text-[10px] text-mist"
              >
                Innovate · Build · Grow
              </motion.p>
            </motion.div>

            <IntroCounter />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Kept separate so the per-frame counter doesn't re-render the intro.
function IntroCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const run = INTRO_MS - 600
    const tick = (now) => {
      const t = Math.min((now - start) / run, 1)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div className="absolute bottom-8 inset-x-8 sm:inset-x-12 flex items-end justify-between">
        <span className="eyebrow text-[10px] text-mist">Loading experience</span>
        <span className="font-display text-5xl sm:text-7xl font-semibold tabular-nums text-plainwhite">
          {count}
          <span className="text-red">%</span>
        </span>
      </div>
      <div className="absolute bottom-0 left-0 h-[3px] bg-red-gradient" style={{ width: `${count}%` }} />
    </>
  )
}
