import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Phone, Mail, MapPin, Send, Check, ArrowUpRight, AlertCircle } from 'lucide-react'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'

const DETAILS = [
  { icon: Phone, label: 'Call us', value: '+91 83105 79306', hint: 'Talk to the team directly', href: 'tel:+918310579306' },
  { icon: Mail, label: 'Email us', value: 'swandigitalsolutions@gmail.com', hint: 'Replies within one business day', href: 'mailto:swandigitalsolutions@gmail.com' },
  { icon: MapPin, label: 'Visit us', value: 'Devanahalli, Bengaluru', hint: 'Open in Google Maps', href: 'https://maps.app.goo.gl/jn6brte3hF1NjiKn7', external: true },
]

const NEXT_STEPS = [
  { n: '01', title: 'We reply', desc: 'Within one business day' },
  { n: '02', title: 'Plan & pricing', desc: 'A clear scope for your goals' },
  { n: '03', title: 'We build', desc: 'Design and development begin' },
]

const PROJECT_TYPES = ['Website', 'Business software', 'Digital marketing', 'AI solution', 'Not sure yet']

const EASE = [0.22, 1, 0.36, 1]
const EMPTY = { name: '', email: '', phone: '', project_type: '', message: '' }

function validate(f) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email, like you@company.com.'
  if (f.phone.trim() && f.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit number, or leave it blank.'
  if (f.message.trim().length < 10) e.message = 'Tell us a little more — at least a sentence.'
  return e
}

const RECIPIENT = 'swandigitalsolutions@gmail.com'
// FormSubmit delivers the form straight to the inbox — no backend needed.
// This uses a normal form POST (not the AJAX endpoint, which refuses until
// the address is verified). On the FIRST real submission FormSubmit emails
// RECIPIENT a one-time "Activate Form" link — click it once, and from then
// on every submission redirects back here to `?sent=1` and just works.
const ACTION = `https://formsubmit.co/${RECIPIENT}`

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
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

  const handleChange = (e) => {
    const next = { ...form, [e.target.name]: e.target.value }
    setForm(next)
    if (touched[e.target.name]) setErrors(validate(next))
  }
  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
    setErrors(validate(form))
  }
  const handleSubmit = (e) => {
    const found = validate(form)
    setErrors(found)
    setTouched({ name: true, email: true, phone: true, message: true })
    if (Object.keys(found).length) {
      e.preventDefault()
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    setStatus('sending') // the native POST continues to FormSubmit
  }

  const reset = () => {
    setForm(EMPTY)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  const errorOf = (name) => (touched[name] ? errors[name] : undefined)
  const a11y = (name) => ({
    'aria-invalid': !!errorOf(name),
    'aria-describedby': errorOf(name) ? `${name}-error` : undefined,
  })
  const inputCls = (name) =>
    `mt-1.5 block w-full min-h-[44px] rounded-xl border bg-surface2 px-4 py-2.5 text-fg placeholder:text-mist/70 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:bg-surface focus:shadow-[0_0_0_4px_rgb(var(--red)/0.12)] ${
      errorOf(name) ? 'border-red focus:border-red' : 'border-line hover:border-mist/40 focus:border-red/60'
    }`

  return (
    <section id="contact" className="sheet sheet-alt py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-lift lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* left: navy panel with the pitch and direct channels */}
        <div className="on-night relative isolate overflow-hidden bg-night p-6 sm:p-8 lg:p-9">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(var(--red)/0.35),transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.22),transparent)]" />
          <SectionEyebrow>Contact</SectionEyebrow>
          <SplitText
            className="font-display text-3xl font-semibold tracking-tight text-plainwhite sm:text-4xl"
            segments={['Let’s start your', { text: 'project.', className: 'text-gradient' }]}
          />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            Tell us what you&rsquo;re building. We&rsquo;ll come back with a clear
            plan and pricing &mdash; no jargon, no obligation.
          </p>

          <ul className="mt-6 space-y-1">
            {DETAILS.map((d) => (
              <li key={d.label}>
                <a
                  href={d.href}
                  {...(d.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group -mx-3 flex min-h-[56px] items-center gap-3.5 rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-white/[0.06]"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-red-soft transition-colors duration-200 group-hover:border-red group-hover:bg-red group-hover:text-[#fff]">
                    <d.icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] uppercase tracking-wider text-mist">{d.label}</span>
                    <span className="block text-sm font-medium text-plainwhite">
                      {/* let long emails wrap at the @, never mid-word */}
                      {d.value.includes('@') ? <>{d.value.split('@')[0]}<wbr />@{d.value.split('@')[1]}</> : d.value}
                    </span>
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" className="shrink-0 text-mist transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-plainwhite" />
                </a>
              </li>
            ))}
          </ul>

          <ol className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-5 text-xs text-mist" aria-label="What happens next">
            {NEXT_STEPS.map((s) => (
              <li key={s.n} className="inline-flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-red-soft">{s.n}</span>
                <span className="font-medium text-plainwhite">{s.title}</span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-xs text-mist">We reply within one business day.</p>
        </div>

        {/* right: the form */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="thanks"
                role="status"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-red/[0.05] to-surface p-8 text-center md:p-12"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
                  className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red/40 bg-red/15"
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-red/30"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: 2, ease: 'easeOut' }}
                  />
                  <Check size={38} className="text-red" strokeWidth={3} />
                </motion.div>
                <h3 className="mt-7 font-display text-2xl font-semibold md:text-3xl">Thanks for connecting!</h3>
                <p className="mx-auto mt-3 max-w-sm leading-relaxed text-mist">
                  Your message has reached our team &mdash; we&rsquo;ll get back to you
                  shortly, usually within one business day.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 min-h-[44px] rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-red/60"
                >
                  Send another message
                </button>
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
                noValidate
                onSubmit={handleSubmit}
                aria-labelledby="contact-form-title"
                className="p-6 sm:p-8 lg:p-9"
              >
                {/* FormSubmit config */}
                <input type="hidden" name="_subject" value="New project enquiry — Swan Digital website" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}
                {/* honeypot — bots fill this, humans never see it */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <h3 id="contact-form-title" className="sr-only">Send us a message</h3>

                <fieldset className="mb-5">
                  <legend className="text-sm font-medium text-fg">What do you need?</legend>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => {
                      const on = form.project_type === t
                      return (
                        <label
                          key={t}
                          className={`inline-flex min-h-[40px] cursor-pointer select-none items-center rounded-full border px-3.5 text-[13px] transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-red ${
                            on ? 'border-red bg-red text-plainwhite' : 'border-line bg-surface2 text-fg hover:border-mist/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="project_type"
                            value={t}
                            checked={on}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          {on && <Check size={14} className="-ml-1 mr-1.5" aria-hidden="true" />}
                          {t}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="name" label="Your name" required error={errorOf('name')}>
                    <input
                      id="name" name="name" type="text" autoComplete="name" required
                      value={form.name} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Jordan Lee" className={inputCls('name')} {...a11y('name')}
                    />
                  </Field>
                  <Field id="email" label="Email address" required error={errorOf('email')}>
                    <input
                      id="email" name="email" type="email" autoComplete="email" inputMode="email" required
                      value={form.email} onChange={handleChange} onBlur={handleBlur}
                      placeholder="you@company.com" className={inputCls('email')} {...a11y('email')}
                    />
                  </Field>
                  <Field id="phone" label="Phone" optional error={errorOf('phone')} className="sm:col-span-2">
                    <input
                      id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel"
                      value={form.phone} onChange={handleChange} onBlur={handleBlur}
                      placeholder="+91 98765 43210" className={inputCls('phone')} {...a11y('phone')}
                    />
                  </Field>
                  <Field id="message" label="Tell us about your project" required error={errorOf('message')} className="sm:col-span-2">
                    <textarea
                      id="message" name="message" rows={3} required
                      value={form.message} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Your goals, must-have features, timeline — or paste an outline from our website planner."
                      className={`${inputCls('message')} resize-y`} {...a11y('message')}
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-shine group mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-red px-6 py-3.5 font-medium text-plainwhite shadow-glow transition-colors hover:bg-red-soft disabled:opacity-70"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </button>

                <p className="mt-3 text-center text-xs text-mist">
                  Fields marked <span className="text-red">*</span> are required. Prefer email? Write to{' '}
                  <a
                    href={`mailto:${RECIPIENT}`}
                    className="font-medium text-fg underline decoration-line underline-offset-4 hover:decoration-red"
                  >
                    {RECIPIENT}
                  </a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </section>
  )
}

function Field({ id, label, required, optional, error, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {required && <span className="ml-0.5 text-red" aria-hidden="true">*</span>}
        {optional && <span className="ml-1.5 text-xs font-normal text-mist">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-red">
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
