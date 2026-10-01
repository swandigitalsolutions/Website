import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Masked word-by-word reveal: every word rises out of its own clipping
 * box. `segments` is a list of strings or { text, className } objects;
 * use '\n' as a segment to force a line break. Animates on mount when
 * `onMount` is set, otherwise the first time it scrolls into view.
 * The full sentence is kept as the accessible label.
 */
export default function SplitText({
  as = 'h2',
  segments,
  className = '',
  delay = 0,
  stagger = 0.06,
  onMount = false,
}) {
  const Tag = motion[as]
  const label = segments
    .map((s) => (typeof s === 'string' ? s : s.text))
    .join(' ')
    .replace(/\s*\n\s*/g, ' ')
    .trim()

  let index = 0
  const trigger = onMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } }

  return (
    <Tag className={className} aria-label={label} {...trigger}>
      {segments.map((seg, si) => {
        if (seg === '\n') return <br key={`br-${si}`} />
        const text = typeof seg === 'string' ? seg : seg.text
        const cls = typeof seg === 'string' ? '' : seg.className || ''
        return text
          .split(' ')
          .filter(Boolean)
          .map((word, wi) => {
            const i = index++
            return (
              <span
                key={`${si}-${wi}`}
                aria-hidden="true"
                className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.24em]"
              >
                <motion.span
                  className={`inline-block will-change-transform ${cls}`}
                  variants={{
                    hidden: { y: '110%', rotate: 4, opacity: 0 },
                    show: {
                      y: '0%',
                      rotate: 0,
                      opacity: 1,
                      transition: { duration: 0.9, ease: EASE, delay: delay + i * stagger },
                    },
                  }}
                >
                  {word}
                </motion.span>
              </span>
            )
          })
      })}
    </Tag>
  )
}
