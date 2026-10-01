import { motion } from 'framer-motion'
import { CheckCircle2, Code2, Layout, Sparkles, Wrench } from 'lucide-react'
import SwanMark from './SwanMark'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'

const POINTS = [
  'Websites shaped around your brand and audience',
  'Software designed for the way your team works',
  'AI-powered features applied to real customer needs',
  'Support through launch and ongoing improvements',
]

const CAPABILITIES = [
  { icon: Layout, title: 'Websites', text: 'Brand and commerce experiences' },
  { icon: Code2, title: 'Business software', text: 'Portals and workflow tools' },
  { icon: Sparkles, title: 'AI solutions', text: 'Interactive, applied experiences' },
  { icon: Wrench, title: 'Support', text: 'Maintenance and improvements' },
]

const EASE = [0.22, 1, 0.36, 1]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="sheet overflow-hidden py-20 sm:py-28 md:py-36">
      <div className="absolute inset-0 noise-grid opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <SwanMark
        className="absolute -right-10 top-0 hidden h-full w-auto opacity-[0.12] lg:block"
        strokeWidth={2}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionEyebrow>Why Swan Digital</SectionEyebrow>
            <SplitText
              className="mb-8 font-display text-3xl font-semibold tracking-tight sm:mb-10 sm:text-4xl md:text-5xl"
              segments={['Built around the work your business needs to do.']}
              stagger={0.04}
            />
            <ul className="space-y-5">
              {POINTS.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE }}
                  className="group flex items-start gap-3 text-base sm:text-lg"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 + i * 0.1 }}
                    className="mt-0.5 shrink-0"
                  >
                    <CheckCircle2 size={22} className="text-red" />
                  </motion.span>
                  <span className="bg-[linear-gradient(rgb(var(--red)),rgb(var(--red)))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CAPABILITIES.map(({ icon: Icon, title, text }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 30, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                whileHover={{ y: -6 }}
                style={{ transformPerspective: 900 }}
                className={`spotlight group rounded-2xl border border-line bg-ink p-5 shadow-card transition-shadow duration-500 hover:shadow-lift sm:p-6 ${
                  i % 2 === 1 ? 'sm:mt-8 sm:-mb-8' : ''
                }`}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-red/30 bg-red/10 text-red transition-all duration-500 group-hover:bg-red group-hover:text-[#fff] group-hover:rotate-[-8deg] group-hover:scale-110">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
