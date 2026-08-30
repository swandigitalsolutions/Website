import { motion } from 'framer-motion'

/**
 * Wraps a section so it eases up into view the first time it's
 * scrolled to. Keeps the animation consistent across the whole page.
 */
export default function Reveal({ children, className = '', delay = 0, y = 44 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
