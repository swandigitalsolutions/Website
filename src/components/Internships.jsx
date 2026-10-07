import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { ArrowRight, GraduationCap, Building2, Phone } from 'lucide-react'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'
import Magnetic from './Magnetic'
import CountUp from './CountUp'
import InternshipReel from './InternshipReel'
import {
  DIFFERENTIATORS, JOURNEY, DOMAINS, COMPANY_BENEFITS,
  RESPONSIBILITIES, CREDENTIALS, PILOT_STEPS, AUDIENCES,
} from '../data/internship'

const EASE = [0.22, 1, 0.36, 1]

function sendBrief(brief) {
  try {
    sessionStorage.setItem('sds_planner_brief', brief)
  } catch {
    /* the custom event below still fills the form while the page is open */
  }
  window.dispatchEvent(new CustomEvent('sds:outline-ready', { detail: brief }))
}

export default function Internships() {
  const [audience, setAudience] = useState('student')
  const a = AUDIENCES[audience]

  return (
    <section id="internships" className="sheet sheet-alt overflow-hidden py-20 sm:py-28 md:py-36">
      <div className="absolute inset-0 noise-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">

        {/* ---------------------------------------------------------- intro */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
          <div>
            <SectionEyebrow icon={GraduationCap}>
              New initiative &middot; Industry-Academia Partnership
            </SectionEyebrow>

            <div
              role="group"
              aria-label="View this programme for"
              className="mb-6 inline-flex rounded-full border border-line bg-surface p-1 shadow-card"
            >
              {Object.entries(AUDIENCES).map(([key, v]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAudience(key)}
                  aria-pressed={audience === key}
                  className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 sm:text-sm ${
                    audience === key ? 'text-plainwhite' : 'text-mist hover:text-white'
                  }`}
                >
                  {audience === key && (
                    <motion.span
                      layoutId="audience-pill"
                      className="absolute inset-0 rounded-full bg-fg shadow-card"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-1.5">
                    {key === 'student' ? <GraduationCap size={14} /> : <Building2 size={14} />}
                    {v.label}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={audience}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <SplitText
                  as="h2"
                  onMount
                  className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
                  segments={a.headline}
                />
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                  {a.sub}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
                  <Magnetic strength={0.3}>
                    <a
                      href="#contact"
                      onClick={() => sendBrief(a.brief)}
                      className="btn-shine group inline-flex items-center gap-2 rounded-xl bg-red px-6 py-3.5 text-sm font-medium text-plainwhite shadow-glow transition-colors hover:bg-red-soft"
                    >
                      {a.cta}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </Magnetic>
                  <div className="leading-tight">
                    <CountUp
                      end={Number(a.stat.value)}
                      suffix={a.stat.suffix}
                      className="font-display text-2xl font-semibold text-white"
                    />
                    <div className="text-xs text-mist">{a.stat.label}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <InternshipReel />
        </div>

        {/* -------------------------------------------------- differentiators */}
        <div className="mt-20 sm:mt-28 md:mt-32">
          <p className="eyebrow mb-8 text-mist sm:mb-10">Four things that make it different</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {DIFFERENTIATORS.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                whileHover={{ y: -6 }}
                className="spotlight group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card transition-shadow duration-500 hover:shadow-lift sm:p-6"
              >
                <span className="eyebrow mb-4 text-[10px] text-mist/70">{String(i + 1).padStart(2, '0')}</span>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-red/30 bg-red/10 text-red transition-all duration-500 group-hover:bg-red group-hover:text-[#fff]">
                  <d.icon size={18} />
                </div>
                <h3 className="font-display text-base font-semibold leading-snug sm:text-lg">{d.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-mist sm:text-sm">{d.desc}</p>
                {d.footnote && <p className="mt-3 text-[10px] leading-relaxed text-mist/60">{d.footnote}</p>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------- journey */}
        <JourneyRail />

        {/* --------------------------------------------------------- domains */}
        <div className="mt-20 sm:mt-28 md:mt-32">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3 text-mist">Where interns work</p>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Various domains, various industries.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">
              Matched to each student&rsquo;s branch and skills. Indicative, subject to partner availability.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {DOMAINS.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="spotlight rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface2 text-fg">
                  <d.icon size={18} />
                </div>
                <h4 className="font-display text-base font-semibold leading-snug">{d.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-mist sm:text-sm">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------- company benefits + split */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 sm:mt-28 md:mt-32">
          <div>
            <p className="eyebrow mb-3 text-mist">Why it matters to your company</p>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              How your company benefits.
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {COMPANY_BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red/30 bg-red/10 text-red">
                    <b.icon size={15} />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{b.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-mist">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8"
          >
            <p className="eyebrow mb-1 text-mist">How we work together</p>
            <h4 className="font-display text-xl font-semibold">Clear roles, clear paperwork.</h4>
            <div className="mt-6 space-y-6">
              {Object.values(RESPONSIBILITIES).map((group) => (
                <div key={group.label}>
                  <p className="eyebrow mb-3 text-[10px] text-red">{group.label}</p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-mist sm:text-sm">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------- credentials */}
        <div className="mt-20 sm:mt-28 md:mt-32">
          <p className="eyebrow mb-8 text-mist sm:mb-10">What we offer</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {CREDENTIALS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="spotlight relative overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red/30 bg-red/10 text-red">
                    <c.icon size={18} />
                  </div>
                  <span className="eyebrow rounded-full border border-line bg-surface2 px-2.5 py-1 text-[9px] text-mist">
                    {c.status}
                  </span>
                </div>
                <h4 className="font-display text-base font-semibold leading-snug">{c.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-mist sm:text-sm">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------- CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="on-night relative isolate mt-20 overflow-hidden rounded-[1.75rem] bg-night px-6 py-12 shadow-lift sm:mt-28 sm:rounded-[2rem] sm:px-10 sm:py-16 md:mt-32"
        >
          <div className="pointer-events-none absolute inset-0 noise-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-semibold leading-tight text-plainwhite sm:text-3xl md:text-4xl">
                Let&rsquo;s start with one intern and one real task.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mist sm:text-base">
                A small pilot, run well, is the best way to see the value. We handle the paperwork, the stipend and the follow-up.
              </p>
              <div className="mt-8 flex flex-wrap gap-6 sm:gap-8">
                {PILOT_STEPS.map((s) => (
                  <div key={s.n} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-plainwhite">
                      <s.icon size={16} />
                    </span>
                    <div>
                      <div className="font-display text-sm font-semibold text-plainwhite">{s.title}</div>
                      <div className="text-xs text-mist">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Magnetic strength={0.3}>
                <a
                  href="#contact"
                  onClick={() => sendBrief('Internship pilot enquiry\nWe would like to start a small pilot — one intern, one real task.')}
                  className="btn-shine group inline-flex items-center gap-2 rounded-xl bg-red px-7 py-3.5 text-sm font-medium text-plainwhite shadow-glow transition-colors hover:bg-red-soft"
                >
                  Start a pilot
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <a href="tel:+918310579306" className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-plainwhite">
                <Phone size={14} className="text-red" />
                Karna, Founder &amp; Managing Director &middot; +91 83105 79306
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * The six-step journey, with the connecting rail filling as it scrolls
 * through view — same mechanism as the Process section, reused here with
 * two extra steps and its own copy.
 */
function JourneyRail() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [reached, setReached] = useState(0)

  useMotionValueEvent(fill, 'change', (v) => {
    const next = Math.min(JOURNEY.length, Math.floor(v * (JOURNEY.length - 1) + 1.02))
    setReached((r) => (r === next ? r : next))
  })

  return (
    <div className="mt-20 sm:mt-28 md:mt-32">
      <div className="max-w-2xl">
        <p className="eyebrow mb-3 text-mist">The journey</p>
        <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          From registration to a permanent role.
        </h3>
      </div>

      <div ref={ref} className="relative mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-6 md:gap-8">
        <div className="hidden md:block absolute top-6 left-[8.33%] right-[8.33%] h-[2px] rounded-full bg-line" />
        <motion.div
          style={{ scaleX: fill }}
          className="hidden md:block absolute top-6 left-[8.33%] right-[8.33%] h-[2px] rounded-full bg-red-gradient origin-left"
        />
        {JOURNEY.map((s, i) => {
          const lit = i < reached
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="relative"
            >
              <motion.div
                animate={{ scale: lit ? 1 : 0.92 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border font-display text-xs font-semibold transition-colors duration-500 ${
                  lit ? 'border-red bg-red text-plainwhite shadow-glow' : 'border-line bg-surface text-red shadow-card'
                }`}
              >
                <s.icon size={18} />
                {lit && (
                  <motion.span
                    className="absolute inset-0 rounded-xl border-2 border-red"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                )}
              </motion.div>
              <p className="mt-3 text-xs font-medium leading-snug text-white sm:text-sm">{s.title}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
