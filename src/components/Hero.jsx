import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SwanMark from './SwanMark'
import BrowserMockup from './BrowserMockup'
import Tilt from './Tilt'
import CountUp from './CountUp'
import SplitText from './SplitText'
import Magnetic from './Magnetic'
import { heroDelay } from '../lib/intro'

const EASE = [0.22, 1, 0.36, 1]
const D = heroDelay()

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: D + i * 0.12, ease: EASE },
  }),
}

const BADGE_TEXT = 'SWAN DIGITAL SOLUTIONS · INNOVATE · BUILD · GROW · '

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const textY = useTransform(smooth, [0, 1], [0, -90])
  const textOpacity = useTransform(smooth, [0, 0.8], [1, 0])
  const mockY = useTransform(smooth, [0, 1], [0, 70])
  const mockRotate = useTransform(smooth, [0, 1], [0, -4])
  const auroraY = useTransform(smooth, [0, 1], [0, 160])

  return (
    <section ref={ref} id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* animated aurora + grid backdrop */}
      <motion.div style={{ y: auroraY }} className="absolute inset-0 pointer-events-none">
        <div className="aurora absolute -inset-x-24 -top-40 h-[820px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      </motion.div>
      <div className="absolute inset-0 noise-grid pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-center relative">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="eyebrow inline-flex items-center gap-2.5 rounded-2xl border border-red/20 bg-white/70 backdrop-blur px-3.5 py-2 text-red mb-6 sm:mb-7 shadow-card !tracking-[0.12em] !text-[0.66rem] leading-relaxed"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
            </span>
            Websites &middot; Business Software &middot; AI &middot; Business Analysis &amp; Growth
          </motion.div>

          <SplitText
            as="h1"
            onMount
            delay={D + 0.1}
            stagger={0.07}
            className="font-display text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-7xl sm:leading-[1.04] font-semibold tracking-tight"
            segments={[
              'We build digital',
              '\n',
              'things that',
              { text: 'glide ahead', className: 'text-gradient-live' },
              '\n',
              'of the rest.',
            ]}
          />

          <motion.p
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-7 text-base sm:text-lg text-mist max-w-lg leading-relaxed"
          >
            Swan Digital Solutions designs premium websites, business software
            and digital growth systems for hotels, schools and modern
            businesses — engineered to launch fast and scale further.
          </motion.p>

          <motion.div
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-9 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                className="btn-shine group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-red text-plainwhite font-medium shadow-glow hover:bg-red-soft transition-colors"
              >
                Start your project
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#services"
                className="w-full inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-line bg-white/80 backdrop-blur text-white/90 font-medium hover:border-red/50 hover:text-white hover:shadow-card transition-all"
              >
                Explore services
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            custom={6}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-11 sm:mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8 text-sm text-mist"
          >
            <div>
              <CountUp end={8} className="font-display text-2xl text-white font-semibold" />
              <div>featured projects</div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div>
              <div className="font-display text-2xl text-white font-semibold">AI</div>
              <div>tile visualizer</div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div>
              <div className="font-display text-2xl text-white font-semibold">Web + ERP</div>
              <div>websites &amp; software</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: D + 0.35, ease: EASE }}
          style={{ transformPerspective: 1200 }}
          className="relative flex items-center justify-center"
        >
          <motion.div style={{ y: mockY, rotate: mockRotate }} className="relative w-full flex items-center justify-center">
            <div className="absolute w-[300px] sm:w-[460px] h-[300px] sm:h-[460px] bg-radial-glow rounded-full blur-2xl" />
            <SwanMark
              className="absolute -z-0 inset-0 m-auto w-40 h-64 opacity-20 pointer-events-none"
              strokeWidth={3}
            />

            {/* rotating brand badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: D + 1, type: 'spring', stiffness: 160, damping: 16 }}
              className="absolute -top-14 -left-2 sm:-left-8 z-20 hidden sm:block"
            >
              <div className="relative h-28 w-28 rounded-full bg-white/80 backdrop-blur-md border border-line shadow-card">
                <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="fill-fg" style={{ fontSize: 6.2, fontFamily: 'JetBrains Mono, monospace' }}>
                    <textPath href="#badge-circle" textLength="230" lengthAdjust="spacing">{BADGE_TEXT}</textPath>
                  </text>
                </svg>
                <img src="/swan-mark.webp" alt="" className="absolute inset-0 m-auto h-10 w-auto" />
              </div>
            </motion.div>

            <Tilt className="relative z-10 w-full max-w-md" max={9}>
              <BrowserMockup />
            </Tilt>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-mist hover:text-red transition-colors"
        aria-label="Scroll to services"
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-current">
          <motion.span
            className="mt-1.5 h-1.5 w-1 rounded-full bg-current"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
