import { useMemo, useState } from 'react'
import { motion } from '../lib/motion'
import { ArrowRight, ArrowUpRight, Bot, Briefcase } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import TileVisualizerDemo from './TileVisualizerDemo'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'

const FILTERS = [
  'All projects',
  'AI & visualization',
  'Business software',
  'Websites & commerce',
]

const INITIAL = 6
const INITIAL_PHONE = 3

export default function Works() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0])
  const [expanded, setExpanded] = useState(false)
  const visibleProjects = useMemo(
    () => activeFilter === FILTERS[0]
      ? PROJECTS
      : PROJECTS.filter((project) => project.group === activeFilter),
    [activeFilter],
  )
  // keep the section short: two rows first, the rest on request
  const shownProjects = expanded ? visibleProjects : visibleProjects.slice(0, INITIAL)
  // phones show 3 before the button, larger screens 6
  const moreOnPhone = !expanded && visibleProjects.length > INITIAL_PHONE
  const moreOnDesktop = !expanded && visibleProjects.length > INITIAL
  const countFor = (filter) =>
    filter === FILTERS[0] ? PROJECTS.length : PROJECTS.filter((p) => p.group === filter).length
  const selectFilter = (filter) => {
    setActiveFilter(filter)
    setExpanded(false)
  }

  return (
    <section id="work" className="sheet py-20 sm:py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>Selected client projects</SectionEyebrow>
            <SplitText
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
              segments={['Real work.', { text: 'Made to fit.', className: 'text-gradient' }]}
            />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
              Websites, business software and interactive experiences built for the teams behind them.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs text-mist">
            <Briefcase size={14} className="text-red" />
            {PROJECTS.length} featured projects
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(250px,0.65fr)] lg:items-center lg:gap-10">
          <TileVisualizerDemo />
          <div
            className="spotlight relative isolate overflow-hidden rounded-3xl border border-red/20 bg-gradient-to-br from-red/[0.07] via-surface to-surface p-5 shadow-card sm:p-7 lg:p-8"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 -z-10 h-48 w-48 rounded-full bg-red/15 blur-3xl" />
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red/30 bg-red/10 text-red">
                <Bot size={19} />
              </span>
              <p className="eyebrow text-red">AI FOR EVERYWHERE</p>
            </div>
            <p className="eyebrow mb-2 text-mist/75">Our AI team · work in focus</p>
            <h3 className="mb-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">
              Custom AI for real-time business growth.
            </h3>
            <p className="text-sm leading-relaxed text-mist sm:text-base">
              Our dedicated AI solutions team builds custom software around your business—from real-time workflows and automation to intelligent customer experiences. We work with you to shape practical solutions that support your goals and help your business grow.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Custom AI software', 'Real-time workflows', 'Business growth'].map((item) => (
                <span key={item} className="rounded-full border border-line bg-white px-3 py-1.5 text-[10px] text-white/80 sm:text-xs">
                  {item}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="btn-shine group relative z-40 mt-6 inline-flex items-center gap-2 rounded-xl bg-red px-5 py-3 text-sm font-medium text-plainwhite shadow-glow transition-colors hover:bg-red-soft"
            >
              Talk to our AI team
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-4 text-xs leading-relaxed text-mist/70">
              Featured team work: the SDS Tiles &amp; Ceramics visualizer shown here, now being refined for more accurate previews.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 border-t border-line pt-8 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-red">Browse the work</p>
            <p className="mt-1 text-sm text-mist">Live sites and software we&rsquo;ve shipped for our clients.</p>
          </div>
          <div
            className="scrollbar-none -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0"
            role="group"
            aria-label="Filter projects by type"
          >
            <div className="flex shrink-0 gap-1 rounded-full border border-line bg-surface p-1 shadow-card">
              {FILTERS.map((filter) => {
                const on = activeFilter === filter
                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={on}
                    onClick={() => selectFilter(filter)}
                    className={`relative inline-flex min-h-[40px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm transition-colors duration-200 ${
                      on ? 'text-plainwhite' : 'text-mist hover:text-fg'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="work-filter"
                        className="absolute inset-0 rounded-full bg-fg"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{filter === FILTERS[0] ? 'All' : filter}</span>
                    <span
                      className={`relative rounded-full px-1.5 py-px font-mono text-[10px] tabular-nums ${
                        on ? 'bg-white/20 text-plainwhite' : 'bg-surface2 text-mist'
                      }`}
                    >
                      {countFor(filter)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div key={activeFilter} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shownProjects.map((project, index) => (
            <article
              key={project.title}
              className={`${!expanded && index >= INITIAL_PHONE ? 'max-sm:hidden ' : ''}group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift`}
            >
              <div className={`relative aspect-[2/1] overflow-hidden border-b border-line bg-gradient-to-br ${project.accent}`}>
                <img
                  src={project.image}
                  alt={`${project.title} website`}
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={800}
                  onError={(event) => { event.currentTarget.style.display = 'none' }}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-3 right-3 inline-flex translate-y-1 items-center gap-1 rounded-full bg-fg px-3 py-1.5 text-xs font-medium text-plainwhite opacity-0 shadow-lift transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  Visit site <ArrowUpRight size={13} />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold leading-snug text-fg">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                    >
                      {project.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 group-hover:border-red group-hover:bg-red group-hover:text-[#fff]"
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-mist">
                  <span className="font-medium text-red">{project.category}</span>
                  <span aria-hidden="true"> · </span>
                  {project.product}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mist">{project.description}</p>
              </div>
            </article>
          ))}
        </div>

        {moreOnPhone && (
          <div className={`mt-8 flex justify-center ${moreOnDesktop ? '' : 'sm:hidden'}`}>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium text-fg shadow-card transition-colors hover:border-red/50"
            >
              Show all {visibleProjects.length} projects
              <ArrowRight size={15} className="rotate-90 text-red" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
