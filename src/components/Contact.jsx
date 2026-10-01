import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, Globe, MapPin, Send, Check } from 'lucide-react'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'

const DETAILS = [
  { icon: Phone, label: 'Call us', value: '+91 83105 79306', href: 'tel:+918310579306' },
  { icon: Mail, label: 'Email us', value: 'swandigitalsolutions@gmail.com', href: 'mailto:swandigitalsolutions@gmail.com' },
  { icon: Globe, label: 'Website', value: 'www.swandigitalsolutions.com', href: 'https://www.swandigitalsolutions.com' },
  { icon: MapPin, label: 'Location', value: 'Devanahalli, India', href: null },
]

const RECIPIENT = 'swandigitalsolutions@gmail.com'
// FormSubmit delivers the form straight to the inbox — no backend needed.
// This uses a normal form POST (not the AJAX endpoint, which refuses until
// the address is verified). On the FIRST real submission FormSubmit emails
// RECIPIENT a one-time "Activate Form" link — click it once, and from then
// on every submission redirects back here to `?sent=1` and just works.
const ACTION = `https://formsubmit.co/${RECIPIENT}`

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [nextUrl, setNextUrl] = useState('')

  useEffect(() => {
    const { origin, pathname, search } = window.location
    setNextUrl(`${origin}${pathname}?sent=1#contact`)

    const applyPlannerBrief = (brief) => {
      if (typeof brief === 'string' && brief.trim()) {
        setForm((current) => ({ ...current, message: brief }))
      }
    }
    const onPlannerOutline = (event) => {
      applyPlannerBrief(event.detail)
      try {
        sessionStorage.removeItem('sds_planner_brief')
      } catch {
        // The form is already updated by the event.
      }
    }
    window.addEventListener('sds:outline-ready', onPlannerOutline)

    try {
      const savedBrief = sessionStorage.getItem('sds_planner_brief')
      if (savedBrief) {
        applyPlannerBrief(savedBrief)
        sessionStorage.removeItem('sds_planner_brief')
      }
    } catch {
      // The planner also sends the outline directly while the page is open.
    }

    if (new URLSearchParams(search).get('sent') === '1') {
      setStatus('sent')
      window.history.replaceState({}, '', pathname + '#contact')
      document.getElementById('contact')?.scrollIntoView()
    }

    return () => window.removeEventListener('sds:outline-ready', onPlannerOutline)
  }, [])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const reset = () => {
    setForm({ name: '', email: '', message: '' })
    setStatus('idle')
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <SectionEyebrow>Contact</SectionEyebrow>
          <SplitText
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6"
            segments={['Let’s start your', { text: 'project.', className: 'text-gradient' }]}
          />
          <p className="text-mist max-w-md mb-10 leading-relaxed">
            Reach out directly, or send a message and we&rsquo;ll get back to
            you within one business day.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {DETAILS.map((d, i) => (
              <motion.a
                key={d.label}
                href={d.href || undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={d.href ? { y: -4 } : undefined}
                className="spotlight group rounded-2xl border border-line bg-surface p-5 shadow-card transition-shadow duration-500 hover:shadow-lift"
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red/10 text-red transition-colors duration-300 group-hover:bg-red group-hover:text-[#fff]">
                  <d.icon size={17} />
                </span>
                <div className="text-xs text-mist mb-1">{d.label}</div>
                <div className="text-sm font-medium break-words">{d.value}</div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-red/30 bg-gradient-to-br from-red/[0.06] to-surface shadow-lift p-8 md:p-12 text-center overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
                  className="relative mx-auto w-20 h-20 rounded-full bg-red/15 border border-red/40 flex items-center justify-center"
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-red/30"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <Check size={38} className="text-red" strokeWidth={3} />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-7 font-display text-2xl md:text-3xl font-semibold"
                >
                  Thanks for connecting!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-3 text-mist max-w-sm mx-auto leading-relaxed"
                >
                  Your message has been sent to our team &mdash; we&rsquo;ll get
                  back to you shortly, usually within one business day.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex flex-wrap justify-center gap-3"
                >
                  <button
                    onClick={reset}
                    className="px-5 py-2.5 rounded-full border border-line text-white/90 text-sm font-medium hover:border-red/60 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4 }}
                action={ACTION}
                method="POST"
                onSubmit={() => setStatus('sending')}
                className="rounded-3xl border border-line bg-surface p-6 sm:p-8 md:p-10 space-y-5 shadow-lift"
              >
                {/* FormSubmit config */}
                <input type="hidden" name="_subject" value="New project enquiry — Swan Digital website" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}
                {/* honeypot — bots fill this, humans never see it */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

                <div>
                  <label htmlFor="name" className="text-sm text-mist">Your name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Jordan Lee"
                    className="mt-2 w-full rounded-xl bg-surface2 border border-line px-4 py-3 text-white placeholder:text-mist/50 focus:border-red/60 focus:bg-surface focus:shadow-[0_0_0_4px_rgb(var(--red)/0.1)] outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-mist">Email address</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-xl bg-surface2 border border-line px-4 py-3 text-white placeholder:text-mist/50 focus:border-red/60 focus:bg-surface focus:shadow-[0_0_0_4px_rgb(var(--red)/0.1)] outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm text-mist">Tell us about your project</label>
                  <textarea
                    id="message" name="message" rows={4} required
                    value={form.message} onChange={handleChange}
                    placeholder="Share your goals, required features, or paste an outline from our website planner..."
                    className="mt-2 w-full rounded-xl bg-surface2 border border-line px-4 py-3 text-white placeholder:text-mist/50 focus:border-red/60 focus:bg-surface focus:shadow-[0_0_0_4px_rgb(var(--red)/0.1)] outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-shine group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red text-plainwhite shadow-glow hover:bg-red-soft transition-colors font-medium disabled:opacity-70"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>

                <p className="text-[11px] text-mist/70 text-center">
                  Prefer email? Write to{' '}
                  <a href={`mailto:${RECIPIENT}`} className="text-mist underline hover:text-white">
                    {RECIPIENT}
                  </a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
