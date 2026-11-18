// Build-time renderer used by scripts/prerender.mjs to bake each page's HTML.
// Must render the same trees as the browser entries
// (main.jsx, service-main.jsx, privacy-main.jsx).
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import ServiceRoot from './service-root'
import PrivacyPage from './components/PrivacyPage'

/** kind: 'home' | 'service' | 'privacy'; slug is used for service pages. */
export function render(kind, slug) {
  const page =
    kind === 'service' ? <ServiceRoot slug={slug} /> : kind === 'privacy' ? <PrivacyPage /> : <App />
  return renderToString(<React.StrictMode>{page}</React.StrictMode>)
}
