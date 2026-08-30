import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Wraps children in a subtle pointer-follow tilt (rotateX / rotateY).
 * The bounding rect is measured once on enter (no per-move layout
 * reads), and the whole effect is skipped on coarse pointers.
 */
export default function Tilt({ children, className = '', max = 8, scale = 1.02 }) {
  const rect = useRef(null)
  const enabled = useRef(true)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 15 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 15 })

  const onEnter = (e) => {
    enabled.current = !window.matchMedia('(pointer: coarse)').matches
    if (enabled.current) rect.current = e.currentTarget.getBoundingClientRect()
  }
  const onMove = (e) => {
    if (!enabled.current || !rect.current) return
    const r = rect.current
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
