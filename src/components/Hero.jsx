import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import SwanMark from './SwanMark'
import BrowserMockup from './BrowserMockup'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -top-40 right-0 w-[560px] h-[560px] max-w-full bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 noise-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center relative">
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="eyebrow inline-flex flex-wrap items-center gap-2 text-red mb-5 sm:mb-6"
          >
            <Sparkles size={14} />
            Websites &middot; Business Software &middot; Digital Solutions
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-display text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-7xl sm:leading-[1.05] font-semibold tracking-tight"
          >
            We build digital
            <br />
            things that <span className="text-gradient">glide ahead</span>
            <br />
            of the rest.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 text-base sm:text-lg text-mist max-w-lg leading-relaxed"
          >
            Swan Digital Solutions designs premium websites, business software
            and digital growth systems for hotels, schools and modern
            businesses — engineered to launch fast and scale further.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-red text-white font-medium shadow-glow hover:bg-red-soft transition-colors"
            >
              Start your project
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-line text-white/90 font-medium hover:border-red/60 hover:text-white transition-colors"
            >
              Explore services
            </a>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-10 sm:mt-14 flex items-center gap-6 sm:gap-8 text-sm text-mist"
          >
            <div>
              <div className="font-display text-2xl text-white font-semibold">100%</div>
              client satisfaction
            </div>
            <div className="h-8 w-px bg-line" />
            <div>
              <div className="font-display text-2xl text-white font-semibold">On-time</div>
              delivery, every time
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] bg-radial-glow rounded-full blur-2xl" />
          <SwanMark
            className="absolute -z-0 inset-0 m-auto w-40 h-64 opacity-10 pointer-events-none"
            strokeWidth={3}
          />
          <BrowserMockup />
        </motion.div>
      </div>
    </section>
  )
}
