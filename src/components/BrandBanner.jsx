import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * The brand banner, framed as a cinematic panel that widens and
 * un-tilts as it scrolls into place (it used to sit behind the hero
 * copy, where its own text collided with the headline).
 */
export default function BrandBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 })
  const scale = useTransform(p, [0, 1], [0.86, 1])
  const rotateX = useTransform(p, [0, 1], [22, 0])
  const radius = useTransform(p, [0, 1], [40, 24])
  const imgScale = useTransform(p, [0, 1], [1.12, 1])

  return (
    <section aria-label="Swan Digital Solutions — your partner in digital growth" className="relative px-3 sm:px-5 pb-10 sm:pb-16">
      <motion.div
        ref={ref}
        style={{ scale, rotateX, borderRadius: radius, transformPerspective: 1400 }}
        className="group relative mx-auto max-w-[1400px] overflow-hidden bg-night shadow-lift"
      >
        <motion.img
          src="/work/swan-home-banner.webp"
          alt="Swan Digital Solutions — Your partner in digital growth. Core capabilities: Web Development, Custom Software, Digital Marketing, AI Solutions, Business Analysis & Growth. Let's build something great together."
          loading="lazy"
          decoding="async"
          style={{ scale: imgScale }}
          className="block w-full h-auto"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit]" />
        <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-18deg] transition-all duration-[1.4s] ease-out group-hover:left-[130%]" />
      </motion.div>
    </section>
  )
}
