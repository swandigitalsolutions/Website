// After `vite build`, bake the rendered HTML of every page into dist/ so text,
// headings and links are in the HTML before any JavaScript runs (crawlable
// content, faster first paint). The browser then hydrates it.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

function bake(file, marker, kind, slug) {
  const html = fs.readFileSync(file, 'utf8')
  if (!html.includes(marker)) throw new Error(`Root marker not found in ${file}`)
  const filled = marker.replace('></div>', `>${render(kind, slug)}</div>`)
  fs.writeFileSync(file, html.replace(marker, () => filled))
}

bake(path.join(dist, 'index.html'), '<div id="root"></div>', 'home')
let count = 1
const servicesDir = path.join(dist, 'services')
if (fs.existsSync(servicesDir)) {
  for (const slug of fs.readdirSync(servicesDir)) {
    bake(path.join(servicesDir, slug, 'index.html'), `<div id="root" data-service="${slug}"></div>`, 'service', slug)
    count++
  }
}
const privacyFile = path.join(dist, 'privacy-policy', 'index.html')
if (fs.existsSync(privacyFile)) {
  bake(privacyFile, '<div id="root" data-page="privacy-policy"></div>', 'privacy')
  count++
}
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${count} pages`)
