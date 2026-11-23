import { motion } from 'motion/react'

/**
 * The brand banner, framed as a cinematic panel that widens and
 * un-tilts as it scrolls into place (it used to sit behind the hero
 * copy, where its own text collided with the headline).
 */
export default function BrandBanner() {

  return (
    <section aria-label="Swan Digital Solutions — your partner in digital growth" className="relative px-3 sm:px-5 pb-10 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl bg-night shadow-lift"
      >
        {/* The banner is a single wide (≈4.7:1) flattened graphic. Shrunk to
            viewport width on a phone its text becomes unreadably small, so
            below sm it keeps a readable minimum width and scrolls
            horizontally instead of shrinking; sm+ shows it full-width as
            before. Edge fades + a one-time swipe hint signal it scrolls. */}
        <div className="scrollbar-none overflow-x-auto overscroll-x-contain sm:overflow-visible">
          <img
            src="/work/swan-home-banner.webp"
            alt="Swan Digital Solutions — Your partner in digital growth. Core capabilities: Web Development, Custom Software, Digital Marketing, AI Solutions, Business Analysis & Growth. Let's build something great together."
            loading="lazy"
            decoding="async"
            className="block h-auto w-[720px] max-w-none sm:w-full"
          />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-night to-transparent sm:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-night to-transparent sm:hidden" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit]" />
        <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-18deg] transition-all duration-[1.4s] ease-out group-hover:left-[130%]" />
      </motion.div>
    </section>
  )
}
