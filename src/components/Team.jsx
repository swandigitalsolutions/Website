import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const TEAM = [
  {
    name: 'Karna',
    role: 'Founder & MD, Swan Digital Solutions',
    image: '/work/team-founder.webp',
    alt: 'Founder and Managing Director of Swan Digital Solutions',
    position: '50% 37%',
  },
  {
    name: 'Yeshwanth',
    role: 'Experienced Senior Software Developer',
    image: '/work/team-senior-developer.webp',
    alt: 'Senior Software Developer at Swan Digital Solutions',
    position: '50% 35%',
  },
  {
    name: 'Indra',
    role: 'Software Developer & AI-Powered Solutions Developer',
    image: '/work/team-ai-developer.webp',
    alt: 'Software Developer and AI-Powered Solutions Developer at Swan Digital Solutions',
    position: '50% 35%',
  },
]

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden py-20 sm:py-28 md:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(233,32,42,0.08),transparent_35%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-red">The people behind the work</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Skilled hands. <span className="text-gradient">Thoughtful software.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-mist sm:text-base">
            Software engineering, product delivery and AI-powered solutions, built by the team at Swan Digital Solutions.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((person, index) => (
            <motion.article
              key={person.role}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative isolate overflow-hidden rounded-3xl border border-line bg-surface"
            >
              <div className="aspect-[4/4.5] overflow-hidden bg-surface2">
                <img
                  src={person.image}
                  alt={person.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  style={{ objectPosition: person.position }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-5 pb-5 pt-20 sm:px-6 sm:pb-6">
                <p className="eyebrow mb-2 text-red">Swan Digital Solutions</p>
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-white/85 sm:text-base">
                      {person.role}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    aria-label={`Contact Swan Digital Solutions about ${person.role}`}
                    className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-red hover:bg-red"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
