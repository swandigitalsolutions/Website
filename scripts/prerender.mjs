// After `vite build`, bake the rendered HTML of every page into dist/ so text,
// headings and links are in the HTML before any JavaScript runs (crawlable
// content, faster first paint). The browser then hydrates it.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { LEGAL_PAGES } from '../src/data/legal.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const { render, renderLegal } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

function bake(file, slug, legal = false) {
  const html = fs
    .readFileSync(file, 'utf8')
    .replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g, (_, href) => {
      const css = fs.readFileSync(path.join(dist, href), 'utf8').replace(/<\/style/gi, '<\\/style')
      return `<style>${css}</style>`
    })
    // Paint the pre-rendered page first. The app starts once the page has
    // loaded and the browser is idle, or at once on the first tap or key press.
    .replace(/\s*<link rel="modulepreload"[^>]*>/g, '')
    .replace(/<script type="module"[^>]*src="(\/assets\/[^"]+\.js)"[^>]*><\/script>/, (_, src) => `<script>(function(){var d=0;function g(){if(d)return;d=1;import(${JSON.stringify(src)})}addEventListener('pointerdown',g,{once:true,passive:true});addEventListener('keydown',g,{once:true});function i(){(window.requestIdleCallback||function(f){setTimeout(f,200)})(g,{timeout:1500})}document.readyState==='complete'?i():addEventListener('load',i,{once:true})})()</script>`)
  const marker = legal
    ? `<div id="root" data-legal="${slug}"></div>`
    : slug ? `<div id="root" data-service="${slug}"></div>` : '<div id="root"></div>'
  if (!html.includes(marker)) throw new Error(`Root marker not found in ${file}`)
  const filled = marker.replace('></div>', `>${legal ? renderLegal(slug) : render(slug)}</div>`)
  fs.writeFileSync(file, html.replace(marker, () => filled))
}

bake(path.join(dist, 'index.html'))
let count = 1
const servicesDir = path.join(dist, 'services')
if (fs.existsSync(servicesDir)) {
  for (const slug of fs.readdirSync(servicesDir)) {
    bake(path.join(servicesDir, slug, 'index.html'), slug)
    count++
  }
}
for (const page of LEGAL_PAGES) {
  bake(path.join(dist, page.slug, 'index.html'), page.slug, true)
  count++
}
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${count} pages`)
