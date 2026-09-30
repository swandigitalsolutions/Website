import { CheckCircle2, Code2, Layout, Sparkles, Wrench } from 'lucide-react'
import SwanMark from './SwanMark'

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

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden border-y border-line bg-surface/40 py-20 sm:py-28 md:py-36">
      <SwanMark
        animate={false}
        className="absolute -right-10 top-0 hidden h-full w-auto opacity-[0.06] lg:block"
        strokeWidth={2}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-4 text-red">Why Swan Digital</p>
            <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight sm:mb-10 sm:text-4xl md:text-5xl">
              Built around the work your business needs to do.
            </h2>
            <ul className="space-y-5">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base sm:text-lg">
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-red" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CAPABILITIES.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-red/40 sm:p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-red/30 bg-red/10 text-red">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
