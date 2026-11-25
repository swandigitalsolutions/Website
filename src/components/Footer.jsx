import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { PUBLISHED_LIST } from '../data/service-list'

const COMPANY = [
  { label: 'Our work', href: '/#work' },
  { label: 'Website planner', href: '/#planner' },
  { label: 'Team', href: '/#team' },
  { label: 'Internships', href: '/#internships' },
  { label: 'How we work', href: '/#process' },
]

const SERVICE_LINKS = PUBLISHED_LIST.map((s) => ({ label: s.name, href: `/services/${s.slug}/` }))

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
]

/**
 * A conventional, professional footer: brand + call to action, three link
 * columns and a slim legal bar. Static — nothing here animates.
 * `contactHref`: pages without a #contact section pass '/#contact'.
 */
export default function Footer({ contactHref = '#contact' }) {
  const year = new Date().getFullYear()

  return (
    <footer className="on-night relative bg-night text-mist">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          {/* brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#top" className="inline-flex items-center gap-2.5" aria-label="Swan Digital Solutions — back to top">
              <img src="/swan-mark.webp" alt="" width="28" height="28" className="h-7 w-auto" />
              <span className="font-display text-sm font-semibold tracking-wide text-plainwhite">
                SWAN <span className="text-red-soft">DIGITAL</span> SOLUTIONS
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Software and website development company in Devanahalli, Bengaluru (Bangalore), serving businesses across Karnataka and beyond.
            </p>
            <a
              href={contactHref}
              className="group mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-red px-5 text-sm font-medium text-plainwhite transition-colors hover:bg-red-soft"
            >
              Start a project
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <FooterColumn title="Services" links={SERVICE_LINKS} />
          <FooterColumn title="Company" links={COMPANY} />

          {/* contact */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-plainwhite">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="tel:+918310579306" className="inline-flex items-start gap-2.5 transition-colors hover:text-plainwhite">
                  <Phone size={15} className="mt-0.5 shrink-0 text-red-soft" aria-hidden="true" />
                  +91 83105 79306
                </a>
              </li>
              <li>
                <a href="mailto:swandigitalsolutions@gmail.com" className="inline-flex items-start gap-2.5 break-all transition-colors hover:text-plainwhite">
                  <Mail size={15} className="mt-0.5 shrink-0 text-red-soft" aria-hidden="true" />
                  swandigitalsolutions@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/jn6brte3hF1NjiKn7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-plainwhite"
                >
                  <MapPin size={15} className="mt-0.5 shrink-0 text-red-soft" aria-hidden="true" />
                  Devanahalli, Karnataka
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* legal bar */}
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
            <p>&copy; {year} Swan Digital Solutions. All rights reserved.</p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-5">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="inline-flex min-h-[40px] items-center transition-colors hover:text-plainwhite">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <a
            href="#top"
            className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/15 px-4 transition-colors hover:border-white/40 hover:text-plainwhite"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-plainwhite">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="transition-colors hover:text-plainwhite">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
