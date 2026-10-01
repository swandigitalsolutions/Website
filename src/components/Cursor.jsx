import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Premium pointer: a trailing ring that follows the native cursor and
 * swells over links and buttons. Also feeds --mx / --my to any `.spotlight` card
 * under the pointer. Only mounts on fine pointers without reduced motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })

  // Spotlight vars work for every desktop visitor, cursor or not.
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest?.('.spotlight')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHover(!!e.target.closest?.('a, button, [role="button"], input, textarea, video'))
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    const onLeave = () => {
      x.set(-100)
      y.set(-100)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      >
        <motion.div
          animate={{ scale: down ? 0.75 : hover ? 1.9 : 1, opacity: hover ? 0.9 : 0.55 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className={`-ml-5 -mt-5 h-10 w-10 rounded-full border ${
            hover ? 'border-red bg-red/10' : 'border-fg/40'
          } transition-colors duration-200`}
        />
      </motion.div>
    </>
  )
}
