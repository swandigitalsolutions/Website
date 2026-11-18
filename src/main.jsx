import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// In production the HTML is pre-rendered at build time (scripts/prerender.mjs),
// so it is hydrated (made interactive) instead of rendered from scratch.
// In `npm run dev` the root is empty and it renders normally.
const root = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, tree)
else ReactDOM.createRoot(root).render(tree)
