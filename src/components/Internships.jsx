import { useState } from 'react'
import { motion, AnimatePresence } from '../lib/motion'
import { ArrowRight, GraduationCap, Building2, Phone } from 'lucide-react'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'
import Magnetic from './Magnetic'
import CountUp from './CountUp'
import InternshipReel from './InternshipReel'
import {
  DIFFERENTIATORS, DOMAINS, COMPANY_BENEFITS,
  RESPONSIBILITIES, CREDENTIALS, PILOT_STEPS, AUDIENCES,
} from '../data/internship'

const EASE = [0.22, 1, 0.36, 1]

function sendBrief(brief) {
  try {
    sessionStorage.setItem('sds_planner_brief', brief)
  } catch {
    /* the custom event below still fills the form while the page is open */
  }
  window.dispatchEvent(new CustomEvent('sds:outline-ready', { detail: brief }))
}

export default function Internships() {
  const [audience, setAudience] = useState('student')
  const a = AUDIENCES[audience]

  return (
    <section id="internships" className="sheet sheet-alt overflow-hidden py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 noise-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">

        {/* ---------------------------------------------------------- intro */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
          <div>
            <SectionEyebrow icon={GraduationCap}>
              New initiative &middot; Industry-Academia Partnership
            </SectionEyebrow>

            <div
              role="group"
              aria-label="View this programme for"
              className="mb-6 inline-flex rounded-full border border-line bg-surface p-1 shadow-card"
            >
              {Object.entries(AUDIENCES).map(([key, v]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAudience(key)}
                  aria-pressed={audience === key}
                  className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 sm:text-sm ${
                    audience === key ? 'text-plainwhite' : 'text-mist hover:text-white'
                  }`}
                >
                  {audience === key && (
                    <motion.span
                      layoutId="audience-pill"
                      className="absolute inset-0 rounded-full bg-fg shadow-card"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-1.5">
                    {key === 'student' ? <GraduationCap size={14} /> : <Building2 size={14} />}
                    {v.label}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={audience}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <SplitText
                  as="h2"
                  onMount
                  className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
                  segments={a.headline}
                />
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                  {a.sub}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
                  <Magnetic strength={0.3}>
                    <a
                      href="#contact"
                      onClick={() => sendBrief(a.brief)}
                      className="btn-shine group inline-flex items-center gap-2 rounded-xl bg-red px-6 py-3.5 text-sm font-medium text-plainwhite shadow-glow transition-colors hover:bg-red-soft"
                    >
                      {a.cta}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </Magnetic>
                  <div className="leading-tight">
                    <CountUp
                      end={Number(a.stat.value)}
                      suffix={a.stat.suffix}
                      className="font-display text-2xl font-semibold text-white"
                    />
                    <div className="text-xs text-mist">{a.stat.label}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <InternshipReel />
        </div>

        {/* ------------------------------------------ what makes it different */}
        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((d) => (
            <li key={d.title} className="flex items-start gap-3.5 bg-surface p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red">
                <d.icon size={18} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[0.95rem] font-semibold leading-snug">{d.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-mist">{d.desc}</p>
                {d.footnote && <p className="mt-1.5 text-[10px] leading-relaxed text-mist">{d.footnote}</p>}
              </div>
            </li>
          ))}
        </ul>

        {/* ------------------------------------ where interns work + benefits */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <p className="eyebrow text-red">Where interns work</p>
            <p className="mt-1 text-sm text-mist">Matched to each student&rsquo;s branch and skills.</p>
            <ul className="mt-4 divide-y divide-line border-t border-line">
              {DOMAINS.map((d) => (
                <li key={d.title} className="flex items-start gap-3 py-3">
                  <d.icon size={17} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-fg">{d.title}</p>
                    <p className="text-xs leading-relaxed text-mist">{d.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-mist">Indicative, subject to partner availability.</p>
          </div>

          <div className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <p className="eyebrow text-red">How your company benefits</p>
            <p className="mt-1 text-sm text-mist">Real work done, with none of the hiring overhead.</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-5 gap-y-3.5 border-t border-line pt-4 sm:grid-cols-2">
              {COMPANY_BENEFITS.map((b) => (
                <li key={b.title} className="flex items-start gap-2.5">
                  <b.icon size={16} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug text-fg">{b.title}</p>
                    <p className="text-xs leading-relaxed text-mist">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <details className="group mt-auto border-t border-line pt-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="mt-3 flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 rounded-lg text-sm font-medium text-fg">
                How we work together &mdash; who does what
                <ArrowRight size={15} className="shrink-0 text-red transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
              </summary>
              <div className="grid grid-cols-1 gap-5 pb-1 pt-2 sm:grid-cols-2">
                {Object.values(RESPONSIBILITIES).map((group) => (
                  <div key={group.label}>
                    <p className="eyebrow mb-2 text-[10px] text-red">{group.label}</p>
                    <ul className="space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-mist">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* -------------------------------------------------------------- CTA */}
        <div
          className="on-night relative isolate mt-5 overflow-hidden rounded-[1.75rem] bg-night px-6 py-10 shadow-lift sm:rounded-[2rem] sm:px-10 sm:py-12"
        >
          <div className="pointer-events-none absolute inset-0 noise-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-semibold leading-tight text-plainwhite sm:text-3xl md:text-4xl">
                Let&rsquo;s start with one intern and one real task.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mist sm:text-base">
                A small pilot, run well, is the best way to see the value. We handle the paperwork, the stipend and the follow-up.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Credentials">
                {CREDENTIALS.map((c) => (
                  <li
                    key={c.title}
                    title={c.desc}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-plainwhite"
                  >
                    <c.icon size={13} className="text-red-soft" aria-hidden="true" />
                    {c.title}
                    <span className="text-mist">· {c.status}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-6 sm:gap-8">
                {PILOT_STEPS.map((s) => (
                  <div key={s.n} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-plainwhite">
                      <s.icon size={16} />
                    </span>
                    <div>
                      <div className="font-display text-sm font-semibold text-plainwhite">{s.title}</div>
                      <div className="text-xs text-mist">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Magnetic strength={0.3}>
                <a
                  href="#contact"
                  onClick={() => sendBrief('Internship pilot enquiry\nWe would like to start a small pilot — one intern, one real task.')}
                  className="btn-shine group inline-flex items-center gap-2 rounded-xl bg-red px-7 py-3.5 text-sm font-medium text-plainwhite shadow-glow transition-colors hover:bg-red-soft"
                >
                  Start a pilot
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <a href="tel:+918310579306" className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-plainwhite">
                <Phone size={14} className="text-red" />
                Karna, Founder &amp; Managing Director &middot; +91 83105 79306
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
