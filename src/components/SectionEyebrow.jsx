import { motion } from 'framer-motion'

/**
 * Section label: a red rule draws in, then the mono eyebrow text fades
 * across. Shared by every section heading so the rhythm stays consistent.
 */
export default function SectionEyebrow({ children, className = '', icon: Icon }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className={`eyebrow mb-4 flex items-center gap-3 text-red ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="h-px w-8 origin-left bg-red"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
      />
      <motion.span
        className="inline-flex items-center gap-2"
        variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.25 } } }}
      >
        {Icon && <Icon size={14} />}
        {children}
      </motion.span>
    </motion.p>
  )
}
