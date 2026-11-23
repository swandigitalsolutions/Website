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
    name: 'Yaswanth Kumar',
    role: 'Software Developer',
    image: '/work/team-yaswanth.webp',
    alt: 'Yaswanth Kumar, Software Developer at Swan Digital Solutions',
    position: '50% 18%',
  },
  {
    name: 'Harshith',
    role: 'Digital Marketing',
    image: '/work/team-digital-marketing.webp',
    alt: 'Harshith, Digital Marketing at Swan Digital Solutions',
    position: '50% 30%',
  },
]


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
          <p
            className="max-w-md text-sm leading-relaxed text-mist sm:text-base"
          >
            Software engineering, product delivery, AI-powered solutions and digital marketing, built by the team at Swan Digital Solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((person, index) => (
            <div key={person.role}>
              <Tilt max={6} scale={1.015}>
                <article className="group relative isolate overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-shadow duration-500 hover:shadow-lift">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface2">
                    <img
                      src={person.image}
                      alt={person.alt}
                      width={750}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      style={{ objectPosition: person.position }}
                    />
                  </div>
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
                        className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 text-plainwhite transition-all duration-300 hover:border-red hover:bg-red group-hover:rotate-45"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                    <span className="mt-4 block h-[2px] w-0 bg-red-gradient transition-all duration-700 ease-out group-hover:w-full" />
                  </div>
                </article>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
