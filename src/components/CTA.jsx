import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] bg-red-gradient px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20 text-center">
          <div className="absolute inset-0 noise-grid opacity-10" />
          <h2 className="relative font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
            Ready to make waves online?
          </h2>
          <p className="relative mt-4 text-white/85 max-w-lg mx-auto">
            Tell us about your business — we&rsquo;ll put together a clear plan
            and pricing within a day.
          </p>
          <a
            href="#contact"
            className="relative mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-white font-medium hover:bg-surface2 transition-colors"
          >
            Let&rsquo;s talk
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
