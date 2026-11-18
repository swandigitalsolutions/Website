import { useEffect, useRef } from 'react'

/**
 * Analytics consent notice. Mounted by src/lib/analytics.js into its own root
 * (not part of the pre-rendered page), only on the production host, and only
 * when the visitor has not chosen yet or re-opens it from the footer.
 * Uses the site's existing colours, radius and button styles.
 */
export default function ConsentBanner({ current, onAllow, onDecline }) {
  const allowRef = useRef(null)
  useEffect(() => {
    // Move focus here only when re-opened on purpose (a choice already exists).
    if (current) allowRef.current?.focus()
  }, [current])

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed inset-x-3 bottom-28 z-[55] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-sm rounded-2xl border border-line bg-surface/95 backdrop-blur-xl p-5 shadow-lift text-fg"
    >
      <p id="consent-title" className="font-display text-base font-semibold">Analytics cookies</p>
      <p id="consent-desc" className="mt-2 text-sm text-mist leading-relaxed">
        With your permission, we use Google Analytics cookies to understand how visitors use this
        site so we can improve it. No advertising tracking. You can change this any time from
        &ldquo;Analytics preferences&rdquo; in the footer. Read our{' '}
        <a href="/privacy-policy/" className="text-red underline underline-offset-2 hover:text-red-soft">
          Privacy Policy
        </a>
        .
      </p>
      {current && (
        <p className="mt-2 text-xs text-mist">
          Current choice: {current === 'granted' ? 'allowed' : 'declined'}.
        </p>
      )}
      <div className="mt-4 flex gap-3">
        <button
          ref={allowRef}
          type="button"
          onClick={onAllow}
          className="flex-1 rounded-xl bg-red px-4 py-2.5 text-sm font-medium text-plainwhite shadow-glow hover:bg-red-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/60 focus-visible:ring-offset-2"
        >
          Allow
        </button>
        <button
          type="button"
          onClick={onDecline}
          className="flex-1 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-white/90 hover:border-red/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/60 focus-visible:ring-offset-2"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
