import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, RefreshCw, ArrowRight, Layout, Palette, Clock, Layers } from 'lucide-react'

/**
 * Website planner: this on-page tool assembles an outline locally from the
 * selected business type and goal. It does not call an AI model or API.
 */
const BUSINESSES = {
  hotel: {
    label: 'Hotel / Resort',
    market: 'hospitality businesses',
    noun: 'stay',
    palette: ['#0E7490', '#22D3EE', '#F59E0B', '#0B1120'],
    sections: ['Hero with live availability', 'Rooms & suites', 'Photo gallery', 'Guest reviews', 'Direct booking'],
    pages: ['Home', 'Rooms', 'Amenities', 'Gallery', 'Contact'],
    components: ['Booking integration', 'Room availability', 'Content editing'],
    aiOpportunity: 'A guest-support assistant can answer common questions and route booking enquiries to your team.',
    weeks: [4, 6],
  },
  school: {
    label: 'School / Institute',
    market: 'schools and institutes',
    noun: 'campus',
    palette: ['#4F46E5', '#8B5CF6', '#10B981', '#0B1120'],
    sections: ['Hero with admissions CTA', 'Programs & curriculum', 'Faculty', 'Events & news', 'Parent portal login'],
    pages: ['Home', 'Admissions', 'Academics', 'Campus Life', 'Contact'],
    components: ['Admissions enquiry flow', 'Parent portal', 'Content editing'],
    aiOpportunity: 'An admissions assistant can help families find programme information and direct questions to staff.',
    weeks: [6, 9],
  },
  restaurant: {
    label: 'Restaurant / Cafe',
    market: 'restaurants and cafes',
    noun: 'table',
    palette: ['#DC2626', '#F59E0B', '#65A30D', '#0B1120'],
    sections: ['Hero with reservation button', 'Digital menu', 'Chef & story', 'Gallery', 'Find us / hours'],
    pages: ['Home', 'Menu', 'Reservations', 'About', 'Contact'],
    components: ['Digital menu', 'Reservation enquiries', 'Local search setup'],
    aiOpportunity: 'A menu and FAQ assistant can help guests discover dishes, opening hours and reservation options.',
    weeks: [3, 5],
  },
  retail: {
    label: 'Retail / Store',
    market: 'retail businesses',
    noun: 'storefront',
    palette: ['#0891B2', '#14B8A6', '#F59E0B', '#0B1120'],
    sections: ['Hero with featured products', 'Catalogue', 'Offers', 'Testimonials', 'Store locator'],
    pages: ['Home', 'Shop', 'Offers', 'About', 'Contact'],
    components: ['Product catalogue', 'Checkout integration', 'Inventory connection'],
    aiOpportunity: 'Product discovery can be improved with guided recommendations based on a shopper’s needs.',
    weeks: [5, 8],
  },
  startup: {
    label: 'Startup / SaaS',
    market: 'SaaS teams and startups',
    noun: 'product',
    palette: ['#7C3AED', '#D946EF', '#22D3EE', '#0B1120'],
    sections: ['Hero with product demo', 'Features', 'Pricing', 'Social proof', 'Sign-up CTA'],
    pages: ['Home', 'Features', 'Pricing', 'Docs', 'Contact'],
    components: ['Product marketing site', 'Sign-up flow', 'Analytics setup'],
    aiOpportunity: 'A focused AI feature can support your product workflow, customer experience or internal operations.',
    weeks: [3, 6],
  },
  stone: {
    label: 'Stone / Manufacturing',
    market: 'stone and manufacturing businesses',
    noun: 'business',
    palette: ['#57534E', '#D6B56D', '#A8A29E', '#171717'],
    sections: ['Product and capability overview', 'Materials or catalogue', 'Projects and applications', 'Process and quality', 'Quote enquiry'],
    pages: ['Home', 'Products', 'Projects', 'Process', 'Contact'],
    components: ['Product catalogue', 'Project gallery', 'Quote enquiry flow'],
    aiOpportunity: 'Image-based product matching or an internal workflow assistant may help; feasibility depends on your catalogue and data.',
    weeks: [4, 7],
  },
  services: {
    label: 'Professional services',
    market: 'professional service firms',
    noun: 'practice',
    palette: ['#1D4ED8', '#38BDF8', '#F59E0B', '#111827'],
    sections: ['Clear service promise', 'Expertise and approach', 'Case studies', 'Client feedback', 'Consultation enquiry'],
    pages: ['Home', 'Services', 'Case studies', 'About', 'Contact'],
    components: ['Service pages', 'Case study collection', 'Consultation enquiry flow'],
    aiOpportunity: 'A knowledge assistant or enquiry triage flow could reduce repetitive work after we review your processes.',
    weeks: [3, 6],
  },
  other: {
    label: 'Other business',
    market: 'your business',
    noun: 'brand',
    palette: ['#E9202A', '#FF4B54', '#F59E0B', '#0B1120'],
    sections: ['Hero with clear value line', 'Services', 'Why choose us', 'Testimonials', 'Enquiry form'],
    pages: ['Home', 'Services', 'About', 'Work', 'Contact'],
    components: ['Responsive website', 'Content editing', 'Enquiry flow'],
    aiOpportunity: 'We can first map a repetitive or customer-facing workflow, then assess whether a custom AI solution is a good fit.',
    weeks: [3, 6],
  },
}

const GOALS = {
  bookings: { label: 'Get more bookings', line: 'built to turn interest into booking enquiries', addWeeks: 1 },
  sell: { label: 'Sell online', line: 'designed to guide shoppers from discovery to checkout', addWeeks: 2 },
  operations: { label: 'Run operations', line: 'with tools that help your team manage day-to-day work', addWeeks: 3 },
  premium: { label: 'Look premium', line: 'with a distinctive design that builds trust', addWeeks: 0 },
  leads: { label: 'Generate leads', line: 'with clear paths from discovery to enquiry', addWeeks: 1 },
  ai: { label: 'Explore AI solutions', line: 'mapped to a real workflow and a clear business outcome', addWeeks: 2 },
}

const HEADLINES = [
  (b) => `The ${b.label.toLowerCase()} that everyone remembers.`,
  (b) => `Your ${b.noun}, online — and impossible to ignore.`,
  (b) => `A ${b.noun} experience worth showing off.`,
  (b) => `Premium ${b.noun}. Zero friction.`,
]

const PLANNING_STEPS = [
  'Matching a layout direction…',
  'Choosing a colour palette…',
  'Mapping the page structure…',
  'Preparing an indicative scope…',
  'Putting your outline together…',
]

function pick(arr, seed) {
  return arr[Math.abs(seed) % arr.length]
}

function buildEnquiryBrief(business, goal, result) {
  return [
    'Website planner outline',
    `Business type: ${business.label}`,
    `Main goal: ${GOALS[goal].label}`,
    `Suggested direction: ${result.headline}`,
    result.sub,
    `Suggested pages: ${result.pages.join(', ')}`,
    `Suggested home page sections: ${result.sections.join('; ')}`,
    `Possible components: ${result.components.join(', ')}`,
    ...(result.goalKey === 'ai'
      ? ['Schedule: to be scoped after workflow and technical discovery']
      : [`Indicative planning range: ${result.timeline} (to be confirmed after discovery)`]),
    ...(goal === 'ai' ? [`AI opportunity to explore: ${result.aiOpportunity}`] : []),
  ].join('\n')
}

export default function AIStudio() {
  const [biz, setBiz] = useState('hotel')
  const [goal, setGoal] = useState('bookings')
  const [phase, setPhase] = useState('idle') // idle | planning | done
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
    setPhase('planning')
    setStep(0)
    setResult(null)
    setTyped('')

    PLANNING_STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), 480 * (i + 1)))
    })

    timers.current.push(
      setTimeout(() => {
        const b = BUSINESSES[biz]
        const g = GOALS[goal]
        const seed = biz.length * 7 + goal.length * 13
        const headline = goal === 'ai'
          ? `AI for ${b.label}: built around real work.`
          : goal === 'operations'
            ? `A clearer system for ${b.label} operations.`
            : pick(HEADLINES, seed)(b)
        const [lo, hi] = b.weeks
        const workflowFocused = goal === 'operations' || goal === 'ai'
        const pages = workflowFocused
          ? ['Overview', 'Core workflow', 'Team dashboard', 'Reports', 'Settings & access']
          : b.pages
        const sections = workflowFocused
          ? ['User roles and permissions', 'Core tasks and workflow states', 'Operational dashboard', 'Reports and alerts', 'Support and audit history']
          : b.sections
        const components = goal === 'ai'
          ? ['Workflow discovery', 'Custom AI feature', 'Human review controls', 'System integrations']
          : goal === 'operations'
            ? ['Role-based access', 'Operational dashboard', 'Reporting', 'Workflow automation']
            : b.components
        const sub = goal === 'ai'
          ? `Explore a custom AI opportunity for ${b.market}, ${g.line}.`
          : goal === 'operations'
            ? `A business system for ${b.market}, ${g.line}.`
            : `A tailored website for ${b.market} ${g.line}.`
        setResult({
          headline,
          sub,
          palette: b.palette,
          sections,
          pages,
          components,
          aiOpportunity: b.aiOpportunity,
          goalKey: goal,
          timeline: goal === 'ai' ? 'Scope after discovery' : `${lo + g.addWeeks}–${hi + g.addWeeks} weeks`,
        })
        setPhase('done')
      }, 480 * (PLANNING_STEPS.length + 1) + 200)
    )
  }

  const selectBusiness = (value) => {
    clearTimers()
    setBiz(value)
    setPhase('idle')
    setResult(null)
    setTyped('')
  }

  const selectGoal = (value) => {
    clearTimers()
    setGoal(value)
    setPhase('idle')
    setResult(null)
    setTyped('')
  }

  const discussOutline = () => {
    if (!result) return
    const brief = buildEnquiryBrief(BUSINESSES[biz], goal, result)
    try {
      sessionStorage.setItem('sds_planner_brief', brief)
    } catch {
      // The same-page event below still fills the contact form if storage is disabled.
    }
    window.dispatchEvent(new CustomEvent('sds:outline-ready', { detail: brief }))
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
    <section id="planner" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(233,32,42,0.10),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(124,58,237,0.10),transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="eyebrow inline-flex items-center gap-2 text-red mb-4">
            <Sparkles size={14} /> Website planner
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Start with a <span className="text-gradient">clear plan.</span>
          </h2>
          <p className="mt-4 text-mist leading-relaxed">
            Build a practical first brief for a website, business system or AI-enabled workflow. Choose what your business does and the result you need; the planner suggests content, useful features and an indicative schedule. These are structured starting recommendations, not live AI analysis or a fixed quote. Our team will confirm feasibility, integrations and scope with you.
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
                  type="button"
                  onClick={() => selectBusiness(k)}
                  disabled={phase === 'planning'}
                  aria-pressed={biz === k}
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
                  type="button"
                  onClick={() => selectGoal(k)}
                  disabled={phase === 'planning'}
                  aria-pressed={goal === k}
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
              type="button"
              onClick={generate}
              disabled={phase === 'planning'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red text-plainwhite hover:bg-red-soft transition-colors font-medium disabled:opacity-70"
            >
              {phase === 'planning' ? (
                <>Building outline<span className="inline-flex w-6 justify-between">
                  <Dot d={0} /><Dot d={0.15} /><Dot d={0.3} />
                </span></>
              ) : phase === 'done' ? (
                <><RefreshCw size={16} /> Regenerate</>
              ) : (
                <><Wand2 size={16} /> Create my outline</>
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
                      Choose a business and the outcome you want, then create a first brief to see suggested pages, features and a visual direction here.
                    </p>
                  </motion.div>
                )}

                {phase === 'planning' && (
                  <motion.ul
                    key="planning"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-[320px] flex flex-col justify-center gap-3 font-mono text-sm"
                  >
                    {PLANNING_STEPS.map((t, i) => (
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
                      <div className="eyebrow text-red mb-2 flex items-center gap-2"><Layout size={13} /> Suggested direction</div>
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

                      <Block icon={Clock} title={result.goalKey === 'ai' ? 'Schedule' : 'Planning estimate'}>
                        <div className="font-display text-2xl font-semibold text-white">{result.timeline}</div>
                        <div className="text-xs text-mist mt-1">
                          {result.goalKey === 'ai' ? 'Depends on workflow review and feasibility' : 'A starting range; confirmed after discovery'}
                        </div>
                      </Block>

                      <Block icon={Layers} title={result.goalKey === 'operations' || result.goalKey === 'ai' ? 'Suggested screens' : 'Suggested pages'}>
                        <div className="flex flex-wrap gap-1.5">
                          {result.pages.map((p) => (
                            <span key={p} className="text-[11px] px-2 py-1 rounded-md bg-surface2 border border-line text-white/80">{p}</span>
                          ))}
                        </div>
                      </Block>

                      <Block icon={Layout} title={result.goalKey === 'operations' || result.goalKey === 'ai' ? 'Core system areas' : 'Suggested home sections'}>
                        <ul className="text-xs text-mist space-y-1">
                          {result.sections.map((s) => <li key={s}>— {s}</li>)}
                        </ul>
                      </Block>

                      {result.goalKey === 'ai' && (
                        <Block icon={Sparkles} title="AI opportunity to explore">
                          <p className="text-xs text-mist leading-relaxed">{result.aiOpportunity}</p>
                        </Block>
                      )}
                    </Stagger>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {result.components.map((s) => (
                          <span key={s} className="text-[11px] px-2.5 py-1 rounded-full border border-red/30 bg-red/5 text-white/80">{s}</span>
                        ))}
                      </div>
                      <a
                        href="#contact"
                        onClick={discussOutline}
                        className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red text-plainwhite text-sm font-medium hover:bg-red-soft transition-colors"
                      >
                        Use this outline in my enquiry <ArrowRight size={15} />
                      </a>
                    </div>

                    <p className="text-[11px] text-mist/70">
                      This is a planning aid generated from your selections, not an AI-generated design or fixed quote. Your outline will be added to the contact form so our team can discuss it with you.
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
