import { motion } from 'motion/react'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'
import { servicePath } from '../data/service-list'
import {
  ArrowRight, Globe, UtensilsCrossed, GraduationCap, BarChart3,
  Code2, Settings, Bot, Megaphone, TrendingUp,
} from 'lucide-react'

// The nine services, grouped into three areas so the section stays compact.
const GROUPS = [
  {
    title: 'Websites',
    icon: Globe,
    slug: 'website-development',
    blurb: 'Fast, modern sites that turn visitors into customers.',
    items: [
      { icon: Globe, title: 'Business Websites', desc: 'Built to represent your brand and convert.' },
      { icon: UtensilsCrossed, title: 'Hotel & Restaurant Websites', desc: 'Menus, galleries and reservations.' },
      { icon: Settings, title: 'Website Maintenance', desc: 'Updates, security and monitoring, handled.' },
    ],
  },
  {
    title: 'Software',
    icon: Code2,
    slug: 'software-development',
    blurb: 'Custom tools engineered around how you actually work.',
    items: [
      { icon: GraduationCap, title: 'School Management Systems', desc: 'Admissions, attendance, fees and messages.' },
      { icon: BarChart3, title: 'Business Management Software', desc: 'Operations, inventory and reporting.' },
      { icon: Code2, title: 'Custom Web Applications', desc: 'Your exact workflow — not a template.' },
    ],
  },
  {
    title: 'Growth & AI',
    icon: TrendingUp,
    blurb: 'Bring in the right customers and save your team hours.',
    items: [
      { icon: Bot, title: 'AI Solutions & Automation', desc: 'Practical AI features and automations.' },
      { icon: Megaphone, title: 'Digital Marketing Support', desc: 'SEO, content and campaigns.' },
      { icon: TrendingUp, title: 'Business Analysis & Growth', desc: 'Clear, practical steps to grow.' },
    ],
  },
]

const COUNT = GROUPS.reduce((n, g) => n + g.items.length, 0)

export default function Services() {
  return (
    <section id="services" className="sheet sheet-alt py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>Our Services</SectionEyebrow>
            <SplitText
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
              segments={['Everything your business needs,', { text: 'built in-house.', className: 'text-gradient' }]}
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist sm:text-base">
            {COUNT} services, one team — from first website to full business software.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 lg:grid-cols-3">
          {GROUPS.map((g, gi) => {
            const page = g.slug ? servicePath(g.slug) : null
            return (
              <motion.article
                key={g.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6"
              >
                <header className="flex items-start gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red text-plainwhite shadow-glow">
                    <g.icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold leading-tight">{g.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-mist">{g.blurb}</p>
                  </div>
                </header>

                <ul className="mt-5 flex-1 divide-y divide-line border-t border-line">
                  {g.items.map((it) => (
                    <li key={it.title} className="flex items-start gap-3 py-3.5">
                      <it.icon size={17} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-[0.95rem] font-medium leading-snug text-fg">{it.title}</p>
                        <p className="mt-0.5 text-xs leading-snug text-mist sm:text-sm">{it.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-sm font-medium">
                  <a href="#contact" className="group inline-flex min-h-[44px] items-center gap-1.5 text-red">
                    Discuss a project
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                  {page && (
                    <a href={page} className="inline-flex min-h-[44px] items-center text-mist underline decoration-line underline-offset-4 transition-colors hover:text-fg hover:decoration-red">
                      Learn more<span className="sr-only"> about {g.title.toLowerCase()}</span>
                    </a>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
