import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Circle, Lock } from 'lucide-react'
import { JOURNEY } from '../data/internship'

const STAGE_MS = 1900
const EASE = [0.22, 1, 0.36, 1]

const STAGE_DETAIL = [
  'A student submits their branch, skills and interest areas.',
  'A short skill check, then hands-on onboarding with the Swan team.',
  'Matched to a real company in their domain — not a simulation.',
  'Paid, on-site industry work: real tasks, real deadlines, real mentors.',
  'The host company reviews performance against the work assigned.',
  'Strong performers move to a permanent role with a salary hike.',
]

/**
 * A live, looping animation of the internship pipeline — register, train,
 * match, work, hire — standing in for a produced video. Framed honestly as
 * an animated preview of how Swan's placement engine moves a student
 * through the programme, not literal recorded footage.
 */
export default function InternshipReel() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % JOURNEY.length), STAGE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-night shadow-lift">
      <div className="on-night">
        {/* chrome bar, matching the hero's browser-mockup motif */}
        <div className="flex h-11 items-center gap-3 border-b border-line bg-surface2 px-4">
          <div className="flex gap-1.5">
            <Circle size={10} className="fill-red/70 text-red/70" />
            <Circle size={10} className="fill-[#F59E0B]/70 text-[#F59E0B]/70" />
            <Circle size={10} className="fill-[#10B981]/70 text-[#10B981]/70" />
          </div>
          <div className="flex h-6 min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-ink px-3 text-[11px] text-mist">
            <Lock size={11} className="shrink-0 text-red" />
            <span className="truncate font-mono">swan-internship-engine.live</span>
          </div>
          <span className="eyebrow inline-flex shrink-0 items-center gap-1.5 text-[10px] text-red">
            <Sparkles size={12} className="animate-pulse" />
            <span className="hidden sm:inline">LIVE PREVIEW</span>
          </span>
        </div>

        {/* stage */}
        <div className="relative px-6 py-10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0 noise-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/15 blur-3xl transition-all duration-700"
            style={{ transform: `translate(-50%, -50%) scale(${1 + stage * 0.08})` }}
          />

          {/* icon rail */}
          <div className="relative flex items-center justify-between">
            <div className="absolute left-5 right-5 top-1/2 h-px -translate-y-1/2 bg-line" />
            <motion.div
              className="absolute left-5 top-1/2 h-px -translate-y-1/2 bg-red-gradient"
              animate={{ width: `${(stage / (JOURNEY.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ maxWidth: 'calc(100% - 2.5rem)' }}
            />
            {JOURNEY.map(({ icon: Icon }, i) => {
              const lit = i <= stage
              const active = i === stage
              return (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: active ? 1.12 : 1,
                      backgroundColor: lit ? 'rgb(var(--red))' : 'rgb(var(--surface2))',
                      borderColor: lit ? 'rgb(var(--red))' : 'rgb(var(--line))',
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border sm:h-11 sm:w-11"
                  >
                    <Icon size={16} className={lit ? 'text-plainwhite' : 'text-mist'} />
                    {active && (
                      <motion.span
                        className="absolute inset-0 rounded-full border-2 border-red"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                  </motion.div>
                </div>
              )
            })}
          </div>

          {/* caption */}
          <div className="mt-8 min-h-[72px] text-center sm:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="eyebrow text-[10px] text-red">
                  Stage {String(stage + 1).padStart(2, '0')} / {String(JOURNEY.length).padStart(2, '0')}
                </p>
                <h4 className="mt-1.5 font-display text-lg font-semibold text-plainwhite sm:text-xl">
                  {JOURNEY[stage].title}
                </h4>
                <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-mist sm:text-sm">
                  {STAGE_DETAIL[stage]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
