import { lazy, Suspense, useEffect, useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import Navbar from './Navbar'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import SmoothScroll from './SmoothScroll'
import Cursor from './Cursor'
import SkyBackdrop from './SkyBackdrop'
import { openAnalyticsPreferences } from '../lib/analytics'

const ChatWidget = lazy(() => import('./ChatWidget'))

// Publication date of the current policy text. Set it to the day the release
// goes live in production (not the build date), and update it whenever the
// policy text changes.
export const PRIVACY_LAST_UPDATED = '18 November 2026'

const NO_LOCAL_SECTIONS = []
const SPY_IDS = ['top', 'policy']

const COOKIES = [
  { name: '_ga', purpose: 'Distinguishes one visitor from another with a random identifier.', duration: '2 years' },
  { name: '_ga_FK2EM3ZH1P', purpose: 'Keeps track of your visit (session) for our Google Analytics property.', duration: '2 years' },
]

function H2({ id, children }) {
  return <h2 id={id} className="mt-12 first:mt-0 font-display text-2xl sm:text-3xl font-semibold tracking-tight scroll-mt-28">{children}</h2>
}
function H3({ children }) {
  return <h3 className="mt-6 font-display text-lg font-semibold">{children}</h3>
}
function P({ children }) {
  return <p className="mt-4 text-mist leading-relaxed">{children}</p>
}
function UL({ items }) {
  return (
    <ul className="mt-4 space-y-2 text-mist leading-relaxed">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
const A = (props) => <a {...props} className="text-red underline underline-offset-2 hover:text-red-soft" />

/** /privacy-policy/ — built from the same components and styles as the rest of the site. */
export default function PrivacyPage() {
  const [chatReady, setChatReady] = useState(false)
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
    const id = idle(() => setChatReady(true), { timeout: 3000 })
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [])

  return (
    <div className="text-fg font-body min-h-screen">
      <SkyBackdrop />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Navbar localIds={NO_LOCAL_SECTIONS} spyIds={SPY_IDS} />
      <main>
        <section id="top" className="relative pt-32 pb-14 sm:pt-40 sm:pb-16 md:pt-44">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-10">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-mist">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/90">Privacy Policy</li>
              </ol>
            </nav>
            <SectionEyebrow>Legal</SectionEyebrow>
            <SplitText
              as="h1"
              onMount
              className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
              segments={['Privacy', { text: 'Policy.', className: 'text-gradient' }]}
            />
            <p className="mt-6 text-sm text-mist">Last updated: {PRIVACY_LAST_UPDATED}</p>
          </div>
        </section>

        <section id="policy" className="sheet sheet-alt py-16 sm:py-20 md:py-24">
          <article className="max-w-3xl mx-auto px-5 sm:px-6 md:px-10">
            <P>
              This Privacy Policy explains how Swan Digital Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;) collects, uses and protects information when you visit{' '}
              <A href="/">www.swandigitalsolutions.com</A> (the &ldquo;website&rdquo;) or contact us through
              it. We are based in Devanahalli, Karnataka, India.
            </P>

            <H2 id="who-we-are">1. Who we are</H2>
            <P>
              Swan Digital Solutions designs and builds websites, business software and digital growth
              systems. For any question about this policy or your information, contact us using the details
              in section 13.
            </P>

            <H2 id="information-we-collect">2. Information we collect</H2>
            <H3>Information you give us</H3>
            <P>
              When you use the contact form, we receive the name, email address and message you enter. If
              you call or email us, we receive your phone number or email address and what you tell us.
            </P>
            <H3>Analytics information — only with your consent</H3>
            <P>
              If you click &ldquo;Allow&rdquo; in our analytics notice, we use Google Analytics 4 to
              understand how visitors use the website. It collects information such as the pages you view,
              page titles, how far you scroll, the website that referred you, your device and browser type,
              and your approximate location (country and city level, derived from your IP address), linked to
              a random identifier stored in a cookie. We have turned off Google signals and advertising
              personalisation, and we do not send your name, email address, phone number or form contents
              to Google Analytics. If you do not allow analytics, Google Analytics is not loaded at all.
            </P>
            <H3>Information collected when the website loads</H3>
            <UL
              items={[
                'Our hosting provider (Vercel) processes technical information such as your IP address, browser and the time of your request in order to deliver the website and keep it secure.',
                'Our fonts are loaded from Google Fonts, so Google receives your IP address and browser information when a page loads.',
                'Some images on our home page are loaded from Unsplash, which receives your IP address and browser information.',
              ]}
            />
            <H3>Chat assistant</H3>
            <P>
              The chat assistant answers questions inside your browser from a fixed set of answers; we do not
              receive or store your chat messages. If you choose to use voice input, your browser&rsquo;s
              built-in speech recognition service converts your speech to text. That service is provided by
              your browser&rsquo;s maker (for example, Google in Chrome) under its own privacy terms.
            </P>
            <H3>Information stored in your browser</H3>
            <UL
              items={[
                'Your analytics choice (allowed or declined) is saved in your browser’s local storage so we do not ask you again on every page.',
                'If you use the website planner, the outline it creates is kept in your browser’s session storage until you close the tab, so it can be added to the contact form. It is only sent to us if you submit the form.',
              ]}
            />

            <H2 id="how-we-use">3. How we use information</H2>
            <UL
              items={[
                'To reply to your enquiries and prepare quotes.',
                'To provide and support the services you ask us for.',
                'With your consent, to understand how the website is used so we can improve it.',
                'To keep the website working, secure and protected from misuse.',
                'To meet legal obligations.',
              ]}
            />
            <P>We do not sell your personal information, and we do not use it for advertising.</P>

            <H2 id="cookies">4. Cookies and consent</H2>
            <P>
              We use cookies only for Google Analytics, and only after you click &ldquo;Allow&rdquo;. Before
              that, no analytics cookies are set and no analytics data is sent to Google. These cookies are not
              used for advertising.
            </P>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface shadow-card">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Analytics cookies used on this website</caption>
                <thead className="border-b border-line text-fg">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Cookie</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                    <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Expires after</th>
                  </tr>
                </thead>
                <tbody className="text-mist">
                  {COOKIES.map((c) => (
                    <tr key={c.name} className="border-b border-line last:border-0 align-top">
                      <td className="px-4 py-3 font-mono text-xs text-fg whitespace-nowrap">{c.name}</td>
                      <td className="px-4 py-3">{c.purpose}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <H2 id="withdraw">5. Changing or withdrawing your consent</H2>
            <P>
              You can change your choice at any time using{' '}
              <button type="button" onClick={openAnalyticsPreferences} className="text-red underline underline-offset-2 hover:text-red-soft">
                Analytics preferences
              </button>{' '}
              (also linked at the bottom of every page). If you choose &ldquo;Decline&rdquo;, Google Analytics
              stops sending data immediately and its cookies are deleted from this website. Withdrawing consent
              does not affect information collected before you withdrew it. You can also delete cookies and site
              data in your browser settings.
            </P>

            <H2 id="sharing">6. Who we share information with</H2>
            <P>We share information only with service providers that help us run the website and our business:</P>
            <UL
              items={[
                'Google — Google Analytics (only with your consent), Google Fonts, and the email service that receives our enquiries.',
                'FormSubmit (formsubmit.co) — delivers contact form messages to our email inbox.',
                'Vercel — hosts the website.',
                'Unsplash — serves some images on our home page.',
              ]}
            />
            <P>
              We may also disclose information if the law requires it, or to protect our rights, our users or
              the public.
            </P>

            <H2 id="transfers">7. Where information is processed</H2>
            <P>
              Our service providers may process information on servers outside India, including in the United
              States. Where this happens, it is handled under those providers&rsquo; terms and safeguards.
            </P>

            <H2 id="retention">8. How long we keep information</H2>
            <UL
              items={[
                'Enquiries: we keep messages and contact details for as long as needed to respond to you, provide our services and keep reasonable business records, and then delete them.',
                'Google Analytics: data is kept for the retention period set in our Google Analytics account and then deleted automatically by Google. The analytics cookies expire after 2 years, or earlier if you withdraw consent or clear them.',
              ]}
            />

            <H2 id="your-rights">9. Your rights</H2>
            <P>
              Under India&rsquo;s Digital Personal Data Protection Act, 2023, you may ask us for a summary of
              the personal data we hold about you, ask us to correct, complete, update or erase it, withdraw
              consent you have given, nominate another person to exercise your rights, and have your grievances
              addressed. If you are not satisfied with our response, you may complain to the Data Protection
              Board of India. If you live elsewhere, you may have similar rights under your local law. To make
              a request, contact us using the details in section 13.
            </P>

            <H2 id="security">10. Security</H2>
            <P>
              The website is served over an encrypted (HTTPS) connection, and we take reasonable steps to protect
              the information we receive. No method of transmission or storage is completely secure, so we cannot
              guarantee absolute security.
            </P>

            <H2 id="children">11. Children</H2>
            <P>
              The website is intended for businesses and adults. It is not directed at children under 18, and we
              do not knowingly collect their personal data. If you believe a child has sent us personal data,
              please contact us so we can delete it.
            </P>

            <H2 id="other-websites">12. Links to other websites</H2>
            <P>
              The website links to other sites, such as client projects we have built. We are not responsible
              for their content or privacy practices; please read their own policies.
            </P>

            <H2 id="contact-us">13. Contact us</H2>
            <P>For privacy questions, requests or complaints, contact Swan Digital Solutions:</P>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Mail, label: 'Email', value: 'swandigitalsolutions@gmail.com', href: 'mailto:swandigitalsolutions@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 83105 79306', href: 'tel:+918310579306' },
                { icon: MapPin, label: 'Location', value: 'Devanahalli, Karnataka, India', href: null },
              ].map((d) => {
                const Tag = d.href ? 'a' : 'div'
                return (
                  <Tag key={d.label} href={d.href || undefined} className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                    <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red/10 text-red">
                      <d.icon size={17} />
                    </span>
                    <div className="text-xs text-mist mb-1">{d.label}</div>
                    <div className="text-sm font-medium break-words">{d.value}</div>
                  </Tag>
                )
              })}
            </div>

            <H2 id="changes">14. Changes to this policy</H2>
            <P>
              We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top shows
              when it last changed.
            </P>
          </article>
        </section>
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
