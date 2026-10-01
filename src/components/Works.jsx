import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
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

export default function Works() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0])
  const visibleProjects = useMemo(
    () => activeFilter === FILTERS[0]
      ? PROJECTS
      : PROJECTS.filter((project) => project.group === activeFilter),
    [activeFilter],
  )

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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
          </motion.div>
        </div>

        <div className="mb-7 flex flex-col gap-4 border-t border-line pt-7 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-mist">Browse the work</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative rounded-full border px-3.5 py-2 text-xs transition-colors duration-300 sm:px-4 sm:text-sm ${
                  activeFilter === filter
                    ? 'border-transparent text-plainwhite'
                    : 'border-line bg-surface text-mist hover:border-red/40 hover:text-white'
                }`}
              >
                {activeFilter === filter && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full bg-fg shadow-card"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{filter}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="spotlight group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-shadow duration-500 hover:shadow-lift"
            >
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} project website in a new tab`}
                className="absolute inset-0 z-40 rounded-2xl focus-visible:outline-none"
              />
              <div className={`relative aspect-[2/1] overflow-hidden bg-gradient-to-br ${project.accent}`}>
                <div className="absolute inset-0 noise-grid opacity-10" />
                <img
                  src={project.image}
                  alt={`${project.title} project website`}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => { event.currentTarget.style.display = 'none' }}
                  className="absolute inset-0 h-full w-full object-contain transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
                />
              </div>

              <div className="p-4 sm:p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-[11px] text-mist">{project.product}</p>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface2 text-fg transition-all duration-300 group-hover:rotate-45 group-hover:border-red group-hover:bg-red group-hover:text-[#fff]">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
                <p className="eyebrow mb-1 text-[9px] text-red">{project.category}</p>
                <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-lg">{project.title}</h3>
                <p className="mt-2.5 min-h-[4.5em] text-xs leading-relaxed text-mist sm:text-sm">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line bg-surface2 px-2.5 py-1 text-[10px] text-white/75">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 truncate border-t border-line pt-3 font-mono text-[10px] text-mist/70">
                  {new URL(project.href).hostname}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
