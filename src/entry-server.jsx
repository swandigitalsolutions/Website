// Build-time renderer used by scripts/prerender.mjs to bake each page's HTML.
// The home page is rendered section by section: sections listed in islands.js
// are wrapped so the browser can start them individually; the others stay as
// plain HTML and ship no JavaScript.
import React from 'react'
import { renderToString } from 'react-dom/server'
import ServiceRoot from './service-root'
import { ISLANDS } from './islands'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectOrbit from './components/ProjectOrbit'
import Services from './components/Services'
import Works from './components/Works'
import AIStudio from './components/AIStudio'
import WhyChooseUs from './components/WhyChooseUs'
import Process from './components/Process'
import Team from './components/Team'
import Internships from './components/Internships'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

const part = (name, Component) => {
  const html = renderToString(<Component />)
  return ISLANDS[name] ? `<div data-island="${name}" style="display:contents">${html}</div>` : html
}

function renderHome() {
  const main = [
    ['Hero', Hero],
    ['ProjectOrbit', ProjectOrbit],
    ['Services', Services],
    ['Works', Works],
    ['AIStudio', AIStudio],
    ['WhyChooseUs', WhyChooseUs],
    ['Process', Process],
    ['Team', Team],
    ['Internships', Internships],
    ['CTA', CTA],
    ['Contact', Contact],
  ]
    .map(([name, Component]) => part(name, Component))
    .join('')
  return `<div class="text-fg font-body min-h-screen">${part('ScrollProgress', ScrollProgress)}${part('Navbar', Navbar)}<main>${main}</main>${part('Footer', Footer)}<div id="chat-root"></div></div>`
}

export function render(slug) {
  return slug
    ? renderToString(
        <React.StrictMode>
          <ServiceRoot slug={slug} />
        </React.StrictMode>,
      )
    : renderHome()
}
