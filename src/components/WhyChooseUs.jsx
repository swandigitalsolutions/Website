import { CheckCircle2, Users } from 'lucide-react'
import SwanMark from './SwanMark'

const POINTS = [
  'Modern, secure & scalable solutions',
  'On-time delivery, every time',
  'Affordable pricing, best value',
  'Dedicated support & maintenance',
  '100% client satisfaction',
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-20 sm:py-28 md:py-36 bg-surface/40 border-y border-line overflow-hidden">
      <SwanMark
        animate={false}
        className="hidden lg:block absolute -right-10 top-0 h-full w-auto opacity-[0.06]"
        strokeWidth={2}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 relative">
        <div>
          <p className="eyebrow text-red mb-4">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-8 sm:mb-10">
            Built for businesses that expect more.
          </h2>

          <ul className="space-y-5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-base sm:text-lg">
                <CheckCircle2 size={22} className="text-red shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-3xl border border-red/30 bg-gradient-to-br from-surface2 to-ink p-7 sm:p-10 shadow-card">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red/10 border border-red/30 mb-6">
              <Users size={26} className="text-red" />
            </div>
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium leading-snug">
              We don&rsquo;t just build websites,
              <br />
              we build your <span className="text-gradient">online success.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
