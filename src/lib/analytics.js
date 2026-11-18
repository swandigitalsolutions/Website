// Google Analytics 4 (gtag.js), loaded ONLY after the visitor consents.
//
// - Nothing is requested from Google and no analytics cookie is set until the
//   visitor clicks "Allow" in the consent notice (src/components/ConsentBanner.jsx).
// - The choice is stored in localStorage and can be changed at any time from
//   the "Analytics preferences" control in the footer.
// - Runs only on the production host, so previews and local builds never send data.
// - Every page is a full page load (/, /services/<slug>/), so the standard
//   gtag 'config' call records exactly one page_view per page.
// - No personal data is sent by this code: no user IDs, no form contents, no
//   custom events; Google signals and ad personalisation are off. Events after
//   the page_view use the page URL without query parameters (utm_* kept).
//
// Browser-only: nothing at module top level touches window/document, because
// the Footer (which imports openAnalyticsPreferences) is also pre-rendered in Node.
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

export const GA_MEASUREMENT_ID = 'G-FK2EM3ZH1P'
const ALLOWED_HOSTS = ['www.swandigitalsolutions.com']
const STORAGE_KEY = 'sds_analytics_consent' // 'granted' | 'denied'

const isAllowedHost = () => ALLOWED_HOSTS.includes(window.location.hostname)

export function getConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeConsent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
}

/** Page URL without query parameters, except campaign (utm_*) parameters. */
function cleanPageLocation() {
  const url = new URL(window.location.href)
  url.hash = ''
  for (const key of [...url.searchParams.keys()]) {
    if (!key.startsWith('utm_')) url.searchParams.delete(key)
  }
  return url.toString()
}

function gtag() {
  window.dataLayer.push(arguments) // gtag.js expects the arguments object
}

function loadGoogleTag() {
  if (window.__sdsGtagLoaded || !isAllowedHost()) return
  window.__sdsGtagLoaded = true

  window.dataLayer = window.dataLayer || []
  window.gtag = gtag
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('js', new Date())
  // Exactly one page_view per page load: the automatic one sent by 'config'.
  // (Tested: this property's Google tag sends that automatic page_view even with
  // send_page_view:false, so sending a manual one as well would double-count.)
  // The automatic page_view reads the browser URL itself; this site never puts
  // personal data in URLs, GA4 redacts email addresses automatically, and other
  // query parameters can be redacted in GA4 Admin > Data streams > Redact data.
  // 'set' applies the cleaned URL to every later event (e.g. scroll).
  gtag('set', {
    page_location: cleanPageLocation(),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
  gtag('config', GA_MEASUREMENT_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

/** Remove first-party GA cookies (_ga, _ga_<id>) after consent is withdrawn. */
function clearAnalyticsCookies() {
  const host = window.location.hostname
  const domains = ['', host, `.${host.replace(/^www\./, '')}`]
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (name === '_ga' || name.startsWith('_ga_')) {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
      }
    }
  }
}

// Google's documented opt-out switch: while true, gtag.js sends nothing at all
// for this measurement ID (not even cookieless pings).
const DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`

export function grantConsent() {
  storeConsent('granted')
  window[DISABLE_FLAG] = false
  if (window.__sdsGtagLoaded && window.gtag) {
    // Re-allowed after declining on this same page: resume.
    window.gtag('consent', 'update', { analytics_storage: 'granted' })
  } else {
    loadGoogleTag()
  }
}

/** Withdraw consent: stops all further hits immediately and deletes GA cookies. */
export function denyConsent() {
  storeConsent('denied')
  window[DISABLE_FLAG] = true
  if (window.__sdsGtagLoaded && window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: 'denied' })
  }
  clearAnalyticsCookies()
}

// The consent notice is rendered into its own small React root, separate from
// the pre-rendered page tree, so it never affects hydration.
let bannerRoot = null

async function showBanner() {
  const { default: ConsentBanner } = await import('../components/ConsentBanner.jsx')
  if (!bannerRoot) {
    const host = document.createElement('div')
    host.id = 'consent-root'
    document.body.appendChild(host)
    bannerRoot = createRoot(host)
  }
  const close = () => bannerRoot.render(null)
  bannerRoot.render(
    createElement(ConsentBanner, {
      current: getConsent(),
      onAllow: () => { grantConsent(); close() },
      onDecline: () => { denyConsent(); close() },
    }),
  )
}

/** Called once per page from the browser entry points. */
export function initAnalytics() {
  if (!isAllowedHost()) {
    // Off production (localhost, Vercel previews) Google Analytics never loads.
    // `?consent-preview` shows the notice as a first-time visitor sees it, for
    // visual testing; Allow/Decline there only store the choice locally.
    if (new URLSearchParams(window.location.search).has('consent-preview')) showBanner()
    return
  }
  const consent = getConsent()
  if (consent === 'granted') loadGoogleTag()
  else if (consent !== 'denied') showBanner()
}

/** Re-open the consent notice (footer "Analytics preferences"). */
export function openAnalyticsPreferences() {
  showBanner()
}
