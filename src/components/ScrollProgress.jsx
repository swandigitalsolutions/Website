import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin gradient bar pinned under the navbar that fills as the page is
 * scrolled. Uses the document scroll progress (0 → 1).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[55] h-[3px] origin-left bg-red-gradient"
      aria-hidden="true"
    />
  )
}
