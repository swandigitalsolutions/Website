import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Phone, MapPin, Globe, Code2, Megaphone, ChevronDown } from 'lucide-react'
import Navbar from './Navbar'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'
import Magnetic from './Magnetic'
import Process from './Process'
import Contact from './Contact'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import SmoothScroll from './SmoothScroll'
import Cursor from './Cursor'
import SkyBackdrop from './SkyBackdrop'
import { PROJECTS } from '../data/projects'
import { PUBLISHED_SERVICES } from '../data/services'

const ChatWidget = lazy(() => import('./ChatWidget'))

const ICONS = { globe: Globe, code: Code2, megaphone: Megaphone }
// Sections on this page: those with a nav link scroll in place; the rest link home.
const LOCAL_IDS = ['process', 'contact']
const SPY_IDS = ['top', 'features', 'related-work', 'process', 'faq', 'contact']
const EASE = [0.22, 1, 0.36, 1]
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE } }),
}

/**
 * One page per published service (/services/<slug>/), built from the same
 * components and styles as the home page so it looks like part of the site.
 */
export default function ServicePage({ service }) {
  const [chatReady, setChatReady] = useState(false)
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
    const id = idle(() => setChatReady(true), { timeout: 3000 })
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [])

  const Icon = ICONS[service.icon] || Globe
  const related = service.related
    .map((title) => PROJECTS.find((p) => p.title === title))
    .filter(Boolean)
  const others = PUBLISHED_SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <div className="text-fg font-body min-h-screen">
      <SkyBackdrop />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Navbar localIds={LOCAL_IDS} spyIds={SPY_IDS} />
      <main>
        {/* Intro */}
        <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 md:pt-48 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="aurora absolute -inset-x-24 -top-40 h-[820px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
          </div>
          <div className="absolute inset-0 noise-grid pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
            <motion.nav aria-label="Breadcrumb" custom={0} initial="hidden" animate="show" variants={fadeUp} className="mb-6 sm:mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-mist">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/90">{service.name}</li>
              </ol>
            </motion.nav>

            <motion.div
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="eyebrow inline-flex items-center gap-2.5 rounded-2xl border border-red/20 bg-white/70 backdrop-blur px-3.5 py-2 text-red mb-6 sm:mb-7 shadow-card !tracking-[0.12em] !text-[0.66rem] leading-relaxed"
            >
              <Icon size={14} />
              {service.name}
            </motion.div>

            <SplitText
              as="h1"
              onMount
              delay={0.25}
              stagger={0.07}
              className="max-w-4xl font-display text-[2.4rem] leading-[1.06] sm:text-6xl lg:text-7xl sm:leading-[1.04] font-semibold tracking-tight"
              segments={service.h1}
            />

            <motion.p custom={3} initial="hidden" animate="show" variants={fadeUp} className="mt-7 text-base sm:text-lg text-mist max-w-2xl leading-relaxed">
              {service.intro}
            </motion.p>

            <motion.div
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-9 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Magnetic className="w-full sm:w-auto">
                <a
                  href="#contact"
                  className="btn-shine group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-red text-plainwhite font-medium shadow-glow hover:bg-red-soft transition-colors"
                >
                  Start your project
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <a
                  href="tel:+918310579306"
                  className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-line bg-white/80 backdrop-blur text-white/90 font-medium hover:border-red/50 hover:text-white hover:shadow-card transition-all"
                >
                  <Phone size={16} className="text-red" />
                  +91 83105 79306
                </a>
              </Magnetic>
            </motion.div>

            <motion.p custom={5} initial="hidden" animate="show" variants={fadeUp} className="mt-8 inline-flex items-center gap-2 text-sm text-mist">
              <MapPin size={15} className="text-red" />
              Based in Devanahalli, Karnataka · Serving Devanahalli &amp; Bengaluru
            </motion.p>
          </div>
        </section>

        {/* What we offer */}
        <section id="features" className="sheet sheet-alt py-20 sm:py-28 md:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <SectionEyebrow>What we offer</SectionEyebrow>
              <SplitText
                className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
                segments={service.featuresHeading}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: EASE }}
                  className="spotlight group relative rounded-2xl border border-line bg-surface p-6 shadow-card hover:shadow-lift transition-shadow duration-500"
                >
                  <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red/10 text-red font-mono text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-mist leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related client work */}
        {related.length > 0 && (
          <section id="related-work" className="sheet py-20 sm:py-28 md:py-32">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
              <div className="max-w-2xl mb-10 sm:mb-14">
                <SectionEyebrow>Related client projects</SectionEyebrow>
                <SplitText
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
                  segments={['Real work.', { text: 'Made to fit.', className: 'text-gradient' }]}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
                {related.map((project, index) => (
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: EASE }}
                    whileHover={{ y: -8 }}
                    className="spotlight group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-shadow duration-500 hover:shadow-lift"
                  >
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} project website in a new tab`}
                      className="absolute inset-0 z-40 rounded-2xl focus-visible:outline-none"
                    />
                    <div className={`relative aspect-[2/1] overflow-hidden bg-gradient-to-br ${project.accent}`}>
                      <div className="absolute inset-0 noise-grid opacity-10" />
                      <img
                        src={project.image}
                        alt={`${project.title} project website`}
                        loading="lazy"
                        decoding="async"
                        width={1600}
                        height={800}
                        className="absolute inset-0 h-full w-full object-contain transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p className="text-[11px] text-mist">{project.product}</p>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface2 text-fg transition-all duration-300 group-hover:rotate-45 group-hover:border-red group-hover:bg-red group-hover:text-[#fff]">
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                      <p className="eyebrow mb-1 text-[9px] text-red">{project.category}</p>
                      <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-lg">{project.title}</h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-mist sm:text-sm">{project.description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        <Process />

        {/* FAQ */}
        <section id="faq" className="sheet py-20 sm:py-28 md:py-32">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-10">
            <SectionEyebrow>Questions</SectionEyebrow>
            <SplitText
              className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-10"
              segments={['Common', { text: 'questions.', className: 'text-gradient' }]}
            />
            <div className="space-y-3">
              {service.faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-line bg-surface shadow-card open:shadow-lift transition-shadow">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-base sm:text-lg font-semibold">{f.q}</h3>
                    <ChevronDown size={18} className="shrink-0 text-red transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 sm:px-6 sm:pb-6 -mt-1 text-sm text-mist leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>

            {others.length > 0 && (
              <nav aria-label="Other services" className="mt-14 border-t border-line pt-8">
                <h2 className="eyebrow text-red mb-4">Other services</h2>
                <ul className="flex flex-wrap gap-3">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <a
                        href={`/services/${s.slug}/`}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium hover:border-red/50 hover:text-red transition-colors"
                      >
                        {s.name}
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="/#services" className="inline-flex items-center rounded-full px-4 py-2 text-sm text-mist hover:text-white transition-colors">
                      All services
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      {chatReady && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </div>
  )
}
