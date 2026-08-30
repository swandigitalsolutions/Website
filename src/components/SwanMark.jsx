import { motion } from 'framer-motion'

/**
 * The signature element: a single continuous line tracing the swan's
 * neck-to-wing curve — the same gesture as the brand mark, redrawn as
 * a live stroke. Used in the hero (large, animated draw-in) and as a
 * quiet watermark divider between sections.
 */
export default function SwanMark({ className = '', animate = true, strokeWidth = 3 }) {
  const path =
    'M120 20 C150 20 165 45 155 68 C148 84 128 88 120 100 C150 108 172 132 168 168 C164 210 128 248 92 268 C132 258 168 232 182 196 C176 246 138 292 82 308'

  return (
    <svg
      viewBox="0 0 220 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        d={path}
        stroke="url(#swanGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        whileInView={animate ? { pathLength: 1, opacity: 1 } : false}
        viewport={{ once: true }}
        transition={{ duration: 2.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="swanGradient" x1="0" y1="0" x2="220" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF4B54" />
          <stop offset="55%" stopColor="#E9202A" />
          <stop offset="100%" stopColor="#8C0F16" />
        </linearGradient>
      </defs>
    </svg>
  )
}
