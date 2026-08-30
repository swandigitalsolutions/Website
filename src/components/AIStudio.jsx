import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, RefreshCw, ArrowRight, Layout, Palette, Clock, Layers } from 'lucide-react'

/**
 * "AI Studio" — an on-page concept generator. It *looks* like a model
 * thinking and streaming a result, but every output is composed locally
 * from the tables below. No API, no network, no keys. Tune the copy and
 * palettes here to change what it produces.
 */
const BUSINESSES = {
  hotel: {
    label: 'Hotel / Resort',
    noun: 'stay',
    palette: ['#0E7490', '#22D3EE', '#F59E0B', '#0B1120'],
    sections: ['Hero with live availability', 'Rooms & suites', 'Photo gallery', 'Guest reviews', 'Direct booking'],
    pages: ['Home', 'Rooms', 'Amenities', 'Gallery', 'Contact'],
    stack: ['React front-end', 'Booking engine', 'Headless CMS'],
    weeks: [4, 6],
  },
  school: {
    label: 'School / Institute',
    noun: 'campus',
    palette: ['#4F46E5', '#8B5CF6', '#10B981', '#0B1120'],
    sections: ['Hero with admissions CTA', 'Programs & curriculum', 'Faculty', 'Events & news', 'Parent portal login'],
    pages: ['Home', 'Admissions', 'Academics', 'Campus Life', 'Contact'],
    stack: ['React front-end', 'Management dashboard', 'Role-based auth'],
    weeks: [6, 9],
  },
  restaurant: {
    label: 'Restaurant / Cafe',
    noun: 'table',
    palette: ['#DC2626', '#F59E0B', '#65A30D', '#0B1120'],
    sections: ['Hero with reservation button', 'Digital menu', 'Chef & story', 'Gallery', 'Find us / hours'],
    pages: ['Home', 'Menu', 'Reservations', 'About', 'Contact'],
    stack: ['React front-end', 'Menu CMS', 'Reservation form'],
    weeks: [3, 5],
  },
  retail: {
    label: 'Retail / Store',
    noun: 'storefront',
    palette: ['#0891B2', '#14B8A6', '#F59E0B', '#0B1120'],
    sections: ['Hero with featured products', 'Catalogue', 'Offers', 'Testimonials', 'Store locator'],
    pages: ['Home', 'Shop', 'Offers', 'About', 'Contact'],
    stack: ['React storefront', 'Product catalogue', 'Payment integration'],
    weeks: [5, 8],
  },
  startup: {
    label: 'Startup / SaaS',
    noun: 'product',
    palette: ['#7C3AED', '#D946EF', '#22D3EE', '#0B1120'],
    sections: ['Hero with product demo', 'Features', 'Pricing', 'Social proof', 'Sign-up CTA'],
    pages: ['Home', 'Features', 'Pricing', 'Docs', 'Contact'],
    stack: ['React + Tailwind', 'Marketing CMS', 'Analytics + SEO'],
    weeks: [3, 6],
  },
  other: {
    label: 'Other business',
    noun: 'brand',
    palette: ['#E9202A', '#FF4B54', '#F59E0B', '#0B1120'],
    sections: ['Hero with clear value line', 'Services', 'Why choose us', 'Testimonials', 'Enquiry form'],
    pages: ['Home', 'Services', 'About', 'Work', 'Contact'],
    stack: ['React front-end', 'CMS', 'SEO setup'],
    weeks: [3, 6],
  },
}

const GOALS = {
  bookings: { label: 'Get more bookings', line: 'built to turn visitors into confirmed bookings', addWeeks: 1 },
  sell: { label: 'Sell online', line: 'designed to move browsers to checkout', addWeeks: 2 },
  operations: { label: 'Run operations', line: 'with an admin dashboard your team actually enjoys using', addWeeks: 3 },
  premium: { label: 'Look premium', line: 'with a design that makes you look twice your size', addWeeks: 0 },
  leads: { label: 'Generate leads', line: 'tuned so every page pushes toward an enquiry', addWeeks: 1 },
}

const HEADLINES = [
  (b) => `The ${b.label.toLowerCase()} that everyone remembers.`,
  (b) => `Your ${b.noun}, online — and impossible to ignore.`,
  (b) => `A ${b.noun} experience worth showing off.`,
  (b) => `Premium ${b.noun}. Zero friction.`,
]

const THINKING = [
  'Analysing your industry…',
  'Choosing a layout system…',
  'Selecting a colour palette…',
  'Mapping the page structure…',
  'Estimating scope & timeline…',
]

function pick(arr, seed) {
  return arr[Math.abs(seed) % arr.length]
}

export default function AIStudio() {
  const [biz, setBiz] = useState('hotel')
  const [goal, setGoal] = useState('bookings')
  const [phase, setPhase] = useState('idle') // idle | thinking | done
  const [step, setStep] = useState(0)
  const [result, setResult] = useState(null)
  const [typed, setTyped] = useState('')
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => () => clearTimers(), [])

  const generate = () => {
    clearTimers()
    setPhase('thinking')
    setStep(0)
    setResult(null)
    setTyped('')

    THINKING.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), 480 * (i + 1)))
    })

    timers.current.push(
      setTimeout(() => {
        const b = BUSINESSES[biz]
        const g = GOALS[goal]
        const seed = biz.length * 7 + goal.length * 13
        const headline = pick(HEADLINES, seed)(b)
        const [lo, hi] = b.weeks
        setResult({
          headline,
          sub: `A ${b.label.toLowerCase()} website ${g.line}.`,
          palette: b.palette,
          sections: b.sections,
          pages: b.pages,
          stack: b.stack,
          timeline: `${lo + g.addWeeks}–${hi + g.addWeeks} weeks`,
        })
        setPhase('done')
      }, 480 * (THINKING.length + 1) + 200)
    )
  }

  // typewriter for the generated headline
  useEffect(() => {
    if (phase !== 'done' || !result) return
    let i = 0
    const tick = () => {
      i += 1
      setTyped(result.headline.slice(0, i))
      if (i < result.headline.length) {
        timers.current.push(setTimeout(tick, 26))
      }
    }
    tick()
  }, [phase, result])

  return (
    <section id="ai-studio" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(233,32,42,0.10),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(124,58,237,0.10),transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="eyebrow inline-flex items-center gap-2 text-red mb-4">
            <Sparkles size={14} /> AI Studio
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            See your site <span className="text-gradient">concept</span> in seconds.
          </h2>
          <p className="mt-4 text-mist leading-relaxed">
            Pick your business and your goal — our studio assistant sketches a
            starting direction: layout, palette, pages and a rough timeline.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-6 lg:gap-8 items-start">
          {/* controls */}
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <label className="text-xs text-mist">My business is a…</label>
            <div className="mt-2 mb-5 grid grid-cols-2 gap-2">
              {Object.entries(BUSINESSES).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setBiz(k)}
                  className={`text-left text-sm rounded-xl border px-3 py-2.5 transition-colors ${
                    biz === k
                      ? 'border-red/60 bg-red/10 text-white'
                      : 'border-line bg-surface2 text-mist hover:text-white hover:border-red/40'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <label className="text-xs text-mist">My main goal is to…</label>
            <div className="mt-2 mb-6 flex flex-wrap gap-2">
              {Object.entries(GOALS).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setGoal(k)}
                  className={`text-xs rounded-full border px-3 py-1.5 transition-colors ${
                    goal === k
                      ? 'border-red/60 bg-red/10 text-white'
                      : 'border-line bg-surface2 text-mist hover:text-white hover:border-red/40'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <button
              onClick={generate}
              disabled={phase === 'thinking'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red hover:bg-red-soft transition-colors font-medium disabled:opacity-70"
            >
              {phase === 'thinking' ? (
                <>Thinking<span className="inline-flex w-6 justify-between">
                  <Dot d={0} /><Dot d={0.15} /><Dot d={0.3} />
                </span></>
              ) : phase === 'done' ? (
                <><RefreshCw size={16} /> Regenerate</>
              ) : (
                <><Wand2 size={16} /> Generate concept</>
              )}
            </button>
          </div>

          {/* canvas */}
          <div className="relative rounded-3xl border border-line bg-surface min-h-[420px] overflow-hidden">
            <div className="flex items-center gap-2 px-5 h-11 border-b border-line bg-surface2">
              <span className="w-2.5 h-2.5 rounded-full bg-red/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/70" />
              <span className="ml-2 eyebrow text-[10px] text-mist">concept.preview</span>
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-[320px] flex flex-col items-center justify-center text-center text-mist"
                  >
                    <Wand2 size={30} className="text-red mb-4" />
                    <p className="max-w-xs text-sm">
                      Choose your options and hit <span className="text-white">Generate concept</span> to
                      see a starting direction appear here.
                    </p>
                  </motion.div>
                )}

                {phase === 'thinking' && (
                  <motion.ul
                    key="thinking"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-[320px] flex flex-col justify-center gap-3 font-mono text-sm"
                  >
                    {THINKING.map((t, i) => (
                      <li
                        key={t}
                        className={`flex items-center gap-3 transition-colors ${
                          i < step ? 'text-white' : 'text-mist/40'
                        }`}
                      >
                        <span className={`w-4 text-red ${i < step ? '' : 'opacity-30'}`}>
                          {i < step ? '✓' : '·'}
                        </span>
                        {t}
                      </li>
                    ))}
                  </motion.ul>
                )}

                {phase === 'done' && result && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="eyebrow text-red mb-2 flex items-center gap-2"><Layout size={13} /> Hero direction</div>
                      <div className="font-display text-2xl sm:text-3xl font-semibold leading-tight min-h-[2.4em]">
                        {typed}
                        <span className="inline-block w-[2px] h-[1em] align-middle bg-red animate-pulse ml-0.5" />
                      </div>
                      <p className="mt-2 text-sm text-mist">{result.sub}</p>
                    </div>

                    <Stagger className="grid sm:grid-cols-2 gap-5">
                      <Block icon={Palette} title="Colour palette">
                        <div className="flex gap-2">
                          {result.palette.map((c) => (
                            <div key={c} className="flex-1">
                              <div className="h-10 rounded-lg border border-white/10" style={{ background: c }} />
                              <div className="mt-1 text-[10px] text-mist font-mono">{c}</div>
                            </div>
                          ))}
                        </div>
                      </Block>

                      <Block icon={Clock} title="Rough timeline">
                        <div className="font-display text-2xl font-semibold text-white">{result.timeline}</div>
                        <div className="text-xs text-mist mt-1">design → build → launch</div>
                      </Block>

                      <Block icon={Layers} title="Page structure">
                        <div className="flex flex-wrap gap-1.5">
                          {result.pages.map((p) => (
                            <span key={p} className="text-[11px] px-2 py-1 rounded-md bg-surface2 border border-line text-white/80">{p}</span>
                          ))}
                        </div>
                      </Block>

                      <Block icon={Layout} title="Home sections">
                        <ul className="text-xs text-mist space-y-1">
                          {result.sections.map((s) => <li key={s}>— {s}</li>)}
                        </ul>
                      </Block>
                    </Stagger>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {result.stack.map((s) => (
                          <span key={s} className="text-[11px] px-2.5 py-1 rounded-full border border-red/30 bg-red/5 text-white/80">{s}</span>
                        ))}
                      </div>
                      <a
                        href="#contact"
                        className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red text-white text-sm font-medium hover:bg-red-soft transition-colors"
                      >
                        Build this <ArrowRight size={15} />
                      </a>
                    </div>

                    <p className="text-[11px] text-mist/70">
                      Generated on-device as a starting point — your real project is scoped with our team.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Dot({ d }) {
  return (
    <motion.span
      className="w-1 h-1 rounded-full bg-white"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 0.9, repeat: Infinity, delay: d }}
    />
  )
}

function Block({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-line bg-surface2/60 p-4">
      <div className="eyebrow text-red mb-3 flex items-center gap-2"><Icon size={13} /> {title}</div>
      {children}
    </div>
  )
}

function Stagger({ children, className }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      {Array.isArray(children)
        ? children.map((c, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              {c}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
