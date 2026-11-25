import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import SectionEyebrow from './SectionEyebrow'
import { COMPANY, LAST_UPDATED, LEGAL_PAGES } from '../data/legal'

// No home-page sections live here, so every nav link points back to /#id.
const NO_LOCAL_IDS = []

function ContactCard() {
  const rows = [
    { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: Phone, label: 'Phone', value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: MapPin, label: 'Location', value: COMPANY.location },
  ]
  return (
    <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-surface shadow-card">
      {rows.map(({ icon: Icon, label, value, href }) => (
        <li key={label} className="flex items-center gap-4 px-5 py-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red/10 text-red">
            <Icon size={18} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-mist">{label}</span>
            {href ? (
              <a href={href} className="break-words font-medium text-fg transition-colors hover:text-red">
                {value}
              </a>
            ) : (
              <span className="font-medium text-fg">{value}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Block({ block }) {
  if (typeof block === 'string') return <p>{block}</p>
  if (block.list)
    return (
      <ul className="space-y-2.5">
        {block.list.map((item) => (
          <li key={item} className="relative pl-5">
            <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-red" />
            {item}
          </li>
        ))}
      </ul>
    )
  if (block.contact) return <ContactCard />
  return null
}

/** /privacy-policy/ and /terms-and-conditions/ — static text, no animation. */
export default function LegalPage({ page }) {
  const other = LEGAL_PAGES.find((p) => p.slug !== page.slug)

  return (
    <div className="text-fg font-body min-h-screen">
      <ScrollProgress />
      <Navbar localIds={NO_LOCAL_IDS} spyIds={NO_LOCAL_IDS} />
      <main>
        <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="aurora absolute -inset-x-24 -top-40 h-[640px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
            <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-mist">
                <li><a href="/" className="transition-colors hover:text-white">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/90">{page.title}</li>
              </ol>
            </nav>
            <SectionEyebrow>{page.eyebrow}</SectionEyebrow>
            <h1 className="max-w-4xl font-display text-[2.4rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">{page.intro}</p>
            <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-1.5 text-xs text-mist shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
              Last updated: <time>{LAST_UPDATED}</time>
            </p>
          </div>
        </section>

        <section className="sheet sheet-alt py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 md:px-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
            <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="On this page" className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                <h2 className="eyebrow mb-3 text-mist">On this page</h2>
                <ol className="space-y-0.5 text-sm">
                  {page.sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-3 rounded-lg px-2 py-2 text-mist transition-colors hover:bg-surface2 hover:text-white"
                      >
                        <span className="pt-0.5 font-mono text-xs text-red">{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className="min-w-0 max-w-3xl">
              {page.sections.map((s, i) => (
                <section key={s.id} id={s.id} className="mb-10 border-b border-line pb-10 last:mb-0 last:border-0">
                  <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                    <span className="font-mono text-sm text-red">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[0.98rem] leading-7 text-white/80">
                    {s.body.map((b, j) => (
                      <Block key={j} block={b} />
                    ))}
                  </div>
                </section>
              ))}

              <div className="mt-12 flex flex-col justify-between gap-4 rounded-2xl border border-line bg-surface p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
                <div>
                  <p className="text-sm text-mist">Also read</p>
                  <p className="font-display text-lg font-semibold">{other.title}</p>
                </div>
                <a
                  href={`/${other.slug}/`}
                  className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-red px-5 text-sm font-medium text-plainwhite transition-colors hover:bg-red-soft"
                >
                  Read the {other.title}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer contactHref="/#contact" />
    </div>
  )
}
