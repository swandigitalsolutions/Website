import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SwanMark from './SwanMark'

/**
 * First-visit brand reveal: the swan mark draws in, then the panel
 * wipes away. Shown once per browser (localStorage), and skipped
 * entirely for reduced-motion users.
 */
export default function Intro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try {
      seen = localStorage.getItem('sds_intro_seen') === '1'
    } catch {
      seen = false
    }
    if (reduce || seen) return

    setShow(true)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = ''
      try {
        localStorage.setItem('sds_intro_seen', '1')
      } catch {
        /* ignore */
      }
    }, 1700)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute w-[320px] h-[320px] bg-radial-glow rounded-full blur-2xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center gap-4"
          >
            <SwanMark className="w-24 h-36" strokeWidth={4} />
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-display font-semibold tracking-tight text-lg"
            >
              SWAN <span className="text-red">DIGITAL</span>
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
