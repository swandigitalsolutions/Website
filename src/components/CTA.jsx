import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import SplitText from './SplitText'
import Magnetic from './Magnetic'
import SwanMark from './SwanMark'

export default function CTA() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="on-night relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] bg-night px-6 py-14 sm:px-8 sm:py-20 md:px-16 md:py-24 text-center shadow-lift">
          {/* drifting brand glows */}
          <motion.div
            aria-hidden="true"
            className="absolute -top-56 -left-44 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--red)/0.4),transparent)] will-change-transform"
            animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-56 -right-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.3),transparent)] will-change-transform"
            animate={{ x: [0, -70, 0], y: [0, -30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 -z-10 noise-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <SwanMark className="absolute -z-10 right-6 top-1/2 -translate-y-1/2 hidden md:block h-[120%] w-auto opacity-25" strokeWidth={2} />

          <SplitText
            className="relative font-display text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl mx-auto"
            segments={['Ready to make', { text: 'waves online?', className: 'text-gradient-live' }]}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative mt-5 text-mist max-w-lg mx-auto"
          >
            Tell us about your business — we&rsquo;ll put together a clear plan
            and pricing within a day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative mt-9"
          >
            <Magnetic strength={0.4}>
              <a
                href="#contact"
                className="btn-shine group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-red text-plainwhite font-medium shadow-glow hover:bg-red-soft transition-colors"
              >
                Let&rsquo;s talk
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
