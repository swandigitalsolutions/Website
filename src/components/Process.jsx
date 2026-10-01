import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'

const STEPS = [
  { n: '01', title: 'Discover', desc: 'We learn your business, goals and audience before a single pixel is designed.' },
  { n: '02', title: 'Design', desc: 'A premium, on-brand interface — reviewed with you until it feels exactly right.' },
  { n: '03', title: 'Develop', desc: 'Clean, fast, secure code built on modern frameworks and best practice.' },
  { n: '04', title: 'Deliver', desc: 'Launch, then ongoing maintenance and support so things keep running smoothly.' },
]

/**
 * The connecting rail fills as the section scrolls through the viewport;
 * each step lights up once the fill reaches it.
 */
export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [reached, setReached] = useState(0)

  useMotionValueEvent(fill, 'change', (v) => {
    const next = Math.min(STEPS.length, Math.floor(v * (STEPS.length - 1) + 1.02))
    setReached((r) => (r === next ? r : next))
  })

  return (
    <section id="process" className="sheet sheet-alt py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <SectionEyebrow>How We Work</SectionEyebrow>
          <SplitText
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            segments={['A clear path from', { text: 'idea to launch.', className: 'text-gradient' }]}
          />
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-8 right-8 h-[2px] rounded-full bg-line" />
          <motion.div
            style={{ scaleX: fill }}
            className="hidden md:block absolute top-8 left-8 right-8 h-[2px] rounded-full bg-red-gradient origin-left"
          />
          {STEPS.map((s, i) => {
            const lit = i < reached
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                <motion.div
                  animate={{ scale: lit ? 1 : 0.92 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={`relative z-10 w-16 h-16 rounded-2xl border flex items-center justify-center font-display font-semibold transition-colors duration-500 ${
                    lit
                      ? 'bg-red border-red text-plainwhite shadow-glow'
                      : 'bg-surface border-line text-red shadow-card'
                  }`}
                >
                  {s.n}
                  {lit && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl border-2 border-red"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1 }}
                    />
                  )}
                </motion.div>
                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
