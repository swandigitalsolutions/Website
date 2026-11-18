import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import SwanPond from './SwanPond'
import { PUBLISHED_LIST } from '../data/service-list'
import { openAnalyticsPreferences } from '../lib/analytics'

const EASE = [0.22, 1, 0.36, 1]
const PROMOS = ['Innovate', 'Build', 'Grow']

export default function Footer() {
  return (
    <footer className="on-night relative overflow-hidden bg-night pt-16 pb-10">
      <div className="absolute inset-0 noise-grid opacity-40 pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/swan-mark.webp" alt="Swan Digital Solutions" className="h-7 w-auto" />
            <span className="font-display text-sm font-medium text-plainwhite">
              SWAN <span className="text-red">DIGITAL</span> SOLUTIONS
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-mist">
            {/* min-h-6 + -my-1: 24px-tall tap target without changing the layout */}
            <a href="mailto:swandigitalsolutions@gmail.com" className="inline-flex min-h-6 -my-1 items-center hover:text-white transition-colors">
              swandigitalsolutions@gmail.com
            </a>
            <a href="tel:+918310579306" className="inline-flex min-h-6 -my-1 items-center hover:text-white transition-colors">
              +91 83105 79306
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-red hover:bg-red"
            >
              <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* location + crawlable links to the service pages */}
        <nav
          aria-label="Services"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-mist"
        >
          <span>Devanahalli, Karnataka</span>
          {PUBLISHED_LIST.map((s) => (
            <a key={s.slug} href={`/services/${s.slug}/`} className="inline-flex min-h-6 -my-1 items-center hover:text-white transition-colors">
              {s.name}
            </a>
          ))}
        </nav>

        {/* brand promise, each marked with the swan */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {PROMOS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: EASE }}
              className="promo-float inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1.5 pl-2 pr-4 text-xs font-medium tracking-[0.18em] uppercase text-plainwhite backdrop-blur"
              style={{ animationDelay: `${-i * 1.6}s` }}
            >
              <img src="/swan-mark.webp" alt="" className="h-5 w-auto" />
              {word}
            </motion.span>
          ))}
        </div>

        {/* oversized wordmark that rises into place, standing on the water */}
        <div aria-hidden="true" className="mt-8 overflow-hidden select-none">
          <motion.div
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display font-semibold tracking-tighter leading-[0.85] text-[18vw] md:text-[14vw] xl:text-[11.5rem] text-center bg-gradient-to-b from-white/[0.14] to-white/[0.02] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]"
          >
            SWAN DIGITAL
          </motion.div>
        </div>

        <SwanPond />

        {/* leading-6 + inline-block links: 24px-tall tap targets that never overlap when the line wraps */}
        <p className="mt-2 border-t border-line pt-6 text-xs leading-6 text-mist text-center">
          &copy; {new Date().getFullYear()} Swan Digital Solutions. All rights reserved.
          <span aria-hidden="true" className="mx-2">&middot;</span>
          <a href="/privacy-policy/" className="inline-block underline-offset-2 hover:text-white hover:underline transition-colors">
            Privacy Policy
          </a>
          <span aria-hidden="true" className="mx-2">&middot;</span>
          <button
            type="button"
            onClick={openAnalyticsPreferences}
            className="inline-block underline-offset-2 hover:text-white hover:underline transition-colors"
          >
            Analytics preferences
          </button>
        </p>
      </div>
    </footer>
  )
}
