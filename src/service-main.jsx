import React from 'react'
import ReactDOM from 'react-dom/client'
import ServiceRoot from './service-root'
import { initAnalytics } from './lib/analytics'
import './index.css'

// Entry for /services/<slug>/ pages. The slug comes from data-service on #root,
// written into each page's HTML by scripts/generate-pages.mjs. In production
// the HTML is pre-rendered, so it is hydrated rather than rendered from scratch.
const root = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <ServiceRoot slug={root.dataset.service} />
  </React.StrictMode>
)
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, tree)
else ReactDOM.createRoot(root).render(tree)

// Google Analytics: production host only, and only after consent.
initAnalytics()
