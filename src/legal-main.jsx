import React, { startTransition } from 'react'
import ReactDOM from 'react-dom/client'
import LegalRoot from './legal-root'
import './index.css'

// Entry for the legal pages. The slug comes from data-legal on #root, written
// by scripts/generate-pages.mjs. In production the HTML is pre-rendered, so it
// is hydrated rather than rendered from scratch.
const root = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <LegalRoot slug={root.dataset.legal} />
  </React.StrictMode>
)
if (root.hasChildNodes()) startTransition(() => { ReactDOM.hydrateRoot(root, tree) })
else ReactDOM.createRoot(root).render(tree)
