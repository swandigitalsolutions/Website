import { motion } from 'framer-motion'

// one 40-unit sine wavelength, tiled so sliding by -40 loops seamlessly
const wave = (y, amp) => {
  let d = `M-40 ${y}`
  for (let x = -40; x < 160; x += 40) {
    d += ` q10 ${-amp} 20 0 t20 0`
  }
  return d
}

/**
 * Scroll cue that fits the "glide ahead" line: the swan floats on a
 * moving waterline, bobbing gently and sending out ripples. On hover it
 * glides forward and the cue drops a little to invite the scroll.
 */
export default function SwanGlide({ href = '#services', delay = 0 }) {
  return (
    <motion.a
      href={href}
      aria-label="Scroll to services"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group flex flex-col items-center gap-1.5 text-mist"
    >
      <div className="relative h-[52px] w-[132px]">
        {/* water */}
        <svg
          viewBox="0 0 120 44"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
          }}
        >
          <g className="wave-slide wave-slide--slow">
            <path d={wave(36, 2.2)} fill="none" stroke="rgb(var(--fg) / 0.16)" strokeWidth="1" />
          </g>
          <g className="wave-slide">
            <path d={wave(32, 3)} fill="none" stroke="rgb(var(--red))" strokeWidth="1.4" strokeLinecap="round" />
          </g>
          {/* ripples spreading from the swan */}
          {[0, 1, 2].map((i) => (
            <motion.ellipse
              key={i}
              cx="60"
              cy="32"
              rx="8"
              ry="1.6"
              fill="none"
              stroke="rgb(var(--red))"
              strokeWidth="0.8"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 3.2], opacity: [0.7, 0] }}
              transition={{ duration: 2.7, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
              style={{ transformOrigin: '60px 32px', transformBox: 'view-box' }}
            />
          ))}
        </svg>

        {/* the swan */}
        <motion.div
          className="absolute left-1/2 top-0 -ml-[11px]"
          variants={{ hover: { x: 14, transition: { type: 'spring', stiffness: 120, damping: 12 } } }}
        >
          <motion.img
            src="/swan-mark.webp"
            alt=""
            className="h-[34px] w-auto drop-shadow-[0_4px_6px_rgba(222,27,40,0.35)]"
            animate={{ y: [0, -3, 0], rotate: [-4, 3, -4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <motion.span
        className="eyebrow flex items-center gap-2 text-[10px] transition-colors group-hover:text-red"
        variants={{ hover: { y: 3 } }}
      >
        Glide down
        <motion.svg
          width="9"
          height="12"
          viewBox="0 0 9 12"
          fill="none"
          aria-hidden="true"
          animate={{ y: [0, 3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M4.5 1v9M1 7l3.5 3.5L8 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.span>
    </motion.a>
  )
}
