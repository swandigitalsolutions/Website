import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const RING = 28 // px at rest
const RING_HOVER = 40 // px over links and buttons
const RING_DOWN = 22 // px while pressing

/**
 * Precise pointer accent: a small dot pinned exactly to the cursor and a
 * thin ring that follows it tightly. Over links and buttons the ring grows
 * slightly and turns red — outline only, so the text underneath stays
 * clear; over text fields it steps aside for the native caret. Also feeds
 * --mx / --my to any `.spotlight` card under the pointer. Only mounts on
 * fine pointers without reduced motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState('rest') // rest | hover | text
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // stiff and well damped: tracks the pointer closely without wobble
  const rx = useSpring(x, { stiffness: 1100, damping: 60, mass: 0.35 })
  const ry = useSpring(y, { stiffness: 1100, damping: 60, mass: 0.35 })

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
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target
      if (t.closest?.('input, textarea, select, [contenteditable="true"]')) setMode('text')
      else if (t.closest?.('a, button, [role="button"], label, summary')) setMode('hover')
      else setMode('rest')
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    const onLeave = () => setVisible(false)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  const size = down ? RING_DOWN : mode === 'hover' ? RING_HOVER : RING
  const ringShown = visible && mode !== 'text'

  return (
    <>
      {/* trailing ring: outline only, resized (not scaled) so the line stays crisp */}
      <motion.div
        aria-hidden="true"
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      >
        <motion.div
          initial={false}
          animate={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            opacity: ringShown ? 1 : 0,
            borderColor: mode === 'hover' ? 'rgb(222 27 40 / 0.85)' : 'rgb(11 18 32 / 0.35)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 38, mass: 0.6 }}
          className="rounded-full border-[1.5px]"
        />
      </motion.div>

      {/* exact dot on the pointer */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden md:block"
      >
        <motion.div
          initial={false}
          animate={{ scale: ringShown ? (mode === 'hover' ? 0.6 : 1) : 0, opacity: ringShown ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-red"
        />
      </motion.div>
    </>
  )
}
