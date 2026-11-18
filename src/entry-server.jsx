// Build-time renderer used by scripts/prerender.mjs to bake each page's HTML.
// Must render the same trees as the browser entries (main.jsx, service-main.jsx).
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import ServiceRoot from './service-root'

export function render(slug) {
  return renderToString(
    <React.StrictMode>{slug ? <ServiceRoot slug={slug} /> : <App />}</React.StrictMode>,
  )
}
