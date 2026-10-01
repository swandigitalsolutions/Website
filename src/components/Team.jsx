import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'
import Tilt from './Tilt'

// `name` is optional — a card without one shows its role as the heading.
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
  {
    role: 'Digital Marketing',
    image: '/work/team-digital-marketing.webp',
    alt: 'Digital Marketing at Swan Digital Solutions',
    position: '50% 30%',
  },
]

const EASE = [0.22, 1, 0.36, 1]

export default function Team() {
  return (
    <section id="team" className="sheet overflow-hidden py-20 sm:py-28 md:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(222,27,40,0.07),transparent_38%),radial-gradient(circle_at_10%_90%,rgba(99,102,241,0.06),transparent_40%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>The people behind the work</SectionEyebrow>
            <SplitText
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
              segments={['Skilled hands.', { text: 'Thoughtful software.', className: 'text-gradient' }]}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md text-sm leading-relaxed text-mist sm:text-base"
          >
            Software engineering, product delivery, AI-powered solutions and digital marketing, built by the team at Swan Digital Solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((person, index) => (
            <motion.div
              key={person.role}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
            >
              <Tilt max={6} scale={1.015}>
                <article className="group relative isolate overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-shadow duration-500 hover:shadow-lift">
                  <motion.div
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1.2, delay: 0.1 + index * 0.12, ease: [0.76, 0, 0.24, 1] }}
                    className="aspect-[4/5] overflow-hidden bg-surface2"
                  >
                    <motion.img
                      src={person.image}
                      alt={person.alt}
                      loading="lazy"
                      initial={{ scale: 1.25 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 1.6, delay: 0.1 + index * 0.12, ease: EASE }}
                      className="h-full w-full object-cover transition-[filter] duration-700 group-hover:saturate-[1.15]"
                      style={{ objectPosition: person.position }}
                    />
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/75 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
                    <p className="eyebrow mb-2 text-[10px] text-red-soft">Swan Digital Solutions</p>
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold leading-snug text-plainwhite sm:text-xl">
                          {person.name ?? person.role}
                        </h3>
                        {person.name && (
                          <p className="mt-1 text-sm leading-snug text-[#d5d9e3]">
                            {person.role}
                          </p>
                        )}
                      </div>
                      <a
                        href="#contact"
                        aria-label={`Contact Swan Digital Solutions about ${person.role}`}
                        className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-plainwhite backdrop-blur transition-all duration-300 hover:border-red hover:bg-red group-hover:rotate-45"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                    <span className="mt-4 block h-[2px] w-0 bg-red-gradient transition-all duration-700 ease-out group-hover:w-full" />
                  </div>
                </article>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
