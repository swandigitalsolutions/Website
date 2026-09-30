import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import TileVisualizerDemo from './TileVisualizerDemo'

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
    <section id="work" className="relative py-20 sm:py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-red">Selected client projects</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Real work. <span className="text-gradient">Made to fit.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
              Websites, business software and interactive experiences built for the teams behind them.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs text-mist">
            <Briefcase size={14} className="text-red" />
            {PROJECTS.length} featured projects
          </div>
        </div>

        <div className="mb-6 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(250px,0.65fr)] lg:items-center lg:gap-10">
          <TileVisualizerDemo />
          <div className="py-1 lg:py-5">
            <p className="eyebrow mb-3 text-red">AI-powered product experience</p>
            <h3 className="mb-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">
              A live tile visualizer, still being refined.
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-mist sm:text-base">
              The SDS Tiles &amp; Ceramics virtual trial room previews a chosen tile against a photo of a customer’s own space. Our developers are refining integrations, visual design and tile-combination analysis to improve preview accuracy.
            </p>
            <a
              href="https://tile-visualizer-roan.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-white transition-colors hover:border-red/60 hover:bg-red/10"
            >
              Explore the tile visualizer <ArrowUpRight size={16} className="text-red" />
            </a>
            <p className="mt-4 text-xs text-mist/70">Current build shown. Product work is still in progress.</p>
          </div>
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
                className={`rounded-full border px-3.5 py-2 text-xs transition-colors sm:px-4 sm:text-sm ${
                  activeFilter === filter
                    ? 'border-red/60 bg-red/10 text-white'
                    : 'border-line bg-surface text-mist hover:border-red/40 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.025 }}
              whileHover={{ y: -5 }}
              className="card-glare group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-300 hover:border-red/50 hover:shadow-glow"
            >
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} project website in a new tab`}
                className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none"
              />
              <div className={`relative aspect-[2/1] overflow-hidden bg-gradient-to-br ${project.accent}`}>
                <div className="absolute inset-0 noise-grid opacity-10" />
                <img
                  src={project.image}
                  alt={`${project.title} project website`}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => { event.currentTarget.style.display = 'none' }}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-[11px] text-mist">{project.product}</p>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface2 text-white transition-colors group-hover:border-red group-hover:bg-red">
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
