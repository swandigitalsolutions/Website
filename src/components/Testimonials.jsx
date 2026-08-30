import { Star, Quote } from 'lucide-react'
import SwanMark from './SwanMark'

/**
 * Client reviews. Placeholder copy — swap in real names, roles and
 * quotes as projects wrap. Keep each quote to 2–4 sentences.
 */
const REVIEWS = [
  {
    quote:
      'Swan Digital rebuilt our hotel website with online booking and a proper gallery. Reservations through the site are up and it finally looks like the property we run.',
    name: 'Priya Nair',
    role: 'Owner, Backwater Retreat',
    rating: 5,
  },
  {
    quote:
      'The school management system handles admissions, attendance and fees in one place. Our office staff saves hours every week and parents stopped calling for updates.',
    name: 'Rajesh Kumar',
    role: 'Principal, Vidya Public School',
    rating: 5,
  },
  {
    quote:
      'They delivered our custom inventory dashboard on time and stayed for support afterwards. Clean, fast and built exactly around how we actually work.',
    name: 'Aisha Fernandes',
    role: 'Operations Head, Meridian Traders',
    rating: 5,
  },
  {
    quote:
      'Professional from the first call. The new site loads instantly, ranks better on Google, and the enquiry form brings in real leads every week.',
    name: 'Vikram Shetty',
    role: 'Founder, Coastal Interiors',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative py-20 sm:py-28 md:py-36 bg-surface/40 border-y border-line overflow-hidden"
    >
      <SwanMark
        animate={false}
        className="hidden lg:block absolute -left-10 top-0 h-full w-auto opacity-[0.06]"
        strokeWidth={2}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 relative">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="eyebrow text-red mb-4">Client Reviews</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            What our clients <span className="text-gradient">say.</span>
          </h2>
        </div>
      </div>

      {/* Auto-scrolling marquee — cards side by side, looping slowly.
          Pauses on hover; falls back to manual scroll for reduced-motion. */}
      <div className="marquee-mask relative mt-12 sm:mt-16 overflow-hidden [--edge:48px] sm:[--edge:64px] [-webkit-mask-image:linear-gradient(to_right,transparent,black_var(--edge),black_calc(100%-var(--edge)),transparent)] [mask-image:linear-gradient(to_right,transparent,black_var(--edge),black_calc(100%-var(--edge)),transparent)]">
        <div className="marquee-track flex w-max gap-4 sm:gap-5 px-4 sm:px-5">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <figure
              key={i}
              aria-hidden={i >= REVIEWS.length}
              className="relative w-[280px] sm:w-[360px] shrink-0 rounded-2xl border border-line bg-surface p-6 sm:p-7 flex flex-col"
            >
              <Quote size={26} className="text-red/40 mb-4" />

              <div className="flex gap-1 mb-4" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={15} className="fill-red text-red" />
                ))}
              </div>

              <blockquote className="text-[15px] text-white/90 leading-relaxed flex-1">
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 pt-5 border-t border-line">
                <div className="font-display text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-mist mt-0.5">{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
