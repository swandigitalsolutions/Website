import React, { startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { EAGER_ISLANDS, ISLANDS } from './islands'
import './index.css'

const idle = (fn, timeout = 1500) =>
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 200)))(fn, { timeout })

// Start one section: load only its code, then make its existing HTML interactive.
function start(el) {
  if (el.dataset.started) return
  el.dataset.started = 'true'
  const name = el.dataset.island
  ISLANDS[name]().then(({ default: Component }) => {
    startTransition(() => {
      hydrateRoot(el, <Component />)
    })
  })
}

function bootIslands() {
  const islands = [...document.querySelectorAll('[data-island]')]
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        start(entry.target.parentElement)
      })
    },
    { rootMargin: '500px 0px' },
  )

  islands.forEach((el) => {
    // A tap or keypress inside a section starts it immediately.
    el.addEventListener('pointerdown', () => start(el), { once: true, passive: true })
    el.addEventListener('focusin', () => start(el), { once: true })
    if (EAGER_ISLANDS.includes(el.dataset.island)) idle(() => start(el))
    else if (el.firstElementChild) observer.observe(el.firstElementChild)
  })

  // The chat assistant is not needed for first paint.
  const chat = document.getElementById('chat-root')
  if (chat) {
    setTimeout(() => {
      idle(() => {
        import('./components/ChatWidget').then(({ default: ChatWidget }) => {
          createRoot(chat).render(<ChatWidget />)
        })
      })
    }, 3500)
  }
}

// Production pages are pre-rendered; `npm run dev` renders the full app.
const root = document.getElementById('root')
if (root.hasChildNodes()) {
  bootIslands()
} else {
  import('./App.jsx').then(({ default: App }) => {
    createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  })
}
