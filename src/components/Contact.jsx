import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, Globe, MapPin, Send, Check, Loader2, AlertCircle } from 'lucide-react'

const DETAILS = [
  { icon: Phone, label: 'Call us', value: '+91 83105 79306', href: 'tel:+918310579306' },
  { icon: Mail, label: 'Email us', value: 'swandigitalsolutions@gmail.com', href: 'mailto:swandigitalsolutions@gmail.com' },
  { icon: Globe, label: 'Website', value: 'www.swandigital.com', href: 'https://www.swandigital.com' },
  { icon: MapPin, label: 'Location', value: 'India', href: null },
]

const RECIPIENT = 'swandigitalsolutions@gmail.com'
// FormSubmit delivers the form straight to the inbox — no backend needed.
// The FIRST submission triggers a one-time activation email to RECIPIENT;
// click the link in it once and every later submission arrives automatically.
const ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT}`

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New project enquiry from ${form.name || 'your website'}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && (data.success === 'true' || data.success === true)) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setForm({ name: '', email: '', message: '' })
    setStatus('idle')
  }

  const sending = status === 'sending'

  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <p className="eyebrow text-red mb-4">Contact</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Let&rsquo;s start your project.
          </h2>
          <p className="text-mist max-w-md mb-10 leading-relaxed">
            Reach out directly, or send a message and we&rsquo;ll get back to
            you within one business day.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {DETAILS.map((d) => (
              <a
                key={d.label}
                href={d.href || undefined}
                className={`rounded-2xl border border-line bg-surface p-5 ${d.href ? 'hover:border-red/50 transition-colors' : ''}`}
              >
                <d.icon size={18} className="text-red mb-3" />
                <div className="text-xs text-mist mb-1">{d.label}</div>
                <div className="text-sm font-medium break-words">{d.value}</div>
              </a>
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
                className="rounded-3xl border border-red/30 bg-gradient-to-br from-surface2 to-ink p-8 md:p-12 text-center overflow-hidden"
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
                onSubmit={handleSubmit}
                className="rounded-3xl border border-line bg-surface p-6 sm:p-8 md:p-10 space-y-5"
              >
                <div>
                  <label htmlFor="name" className="text-sm text-mist">Your name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Jordan Lee"
                    className="mt-2 w-full rounded-xl bg-surface2 border border-line px-4 py-3 text-white placeholder:text-mist/50 focus:border-red/50 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-mist">Email address</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-xl bg-surface2 border border-line px-4 py-3 text-white placeholder:text-mist/50 focus:border-red/50 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm text-mist">Tell us about your project</label>
                  <textarea
                    id="message" name="message" rows={4} required
                    value={form.message} onChange={handleChange}
                    placeholder="I need a website for..."
                    className="mt-2 w-full rounded-xl bg-surface2 border border-line px-4 py-3 text-white placeholder:text-mist/50 focus:border-red/50 outline-none transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 text-sm text-red">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    Something went wrong sending your message. Please try again, or
                    email us directly at {RECIPIENT}.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red hover:bg-red-soft transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending…' : 'Send message'}
                  {sending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
