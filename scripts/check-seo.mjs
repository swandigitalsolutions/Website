// Automated SEO checks on the built site in dist/. Run after `npm run build`:
//   npm run check:seo
// Exits with code 1 if any check fails.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ALL_SERVICES, PUBLISHED_SERVICES } from '../src/data/services.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = 'https://www.swandigitalsolutions.com'

let failures = 0
const fail = (msg) => { failures++; console.log(`  FAIL  ${msg}`) }
const ok = (msg) => console.log(`  ok    ${msg}`)
const check = (cond, msg) => (cond ? ok(msg) : fail(msg))

const pages = [
  { path: '/', file: 'index.html' },
  ...PUBLISHED_SERVICES.map((s) => ({ path: `/services/${s.slug}/`, file: `services/${s.slug}/index.html`, service: s })),
  // Listed in the sitemap after the main pages.
  { path: '/privacy-policy/', file: 'privacy-policy/index.html' },
]
const drafts = ALL_SERVICES.filter((s) => s.status !== 'published')

const attr = (html, re) => (html.match(re) || [])[1]
const titles = new Set()
const descriptions = new Set()
const allHtml = []

for (const p of pages) {
  console.log(`\n${p.path}`)
  const file = path.join(dist, p.file)
  if (!fs.existsSync(file)) { fail(`file missing: dist/${p.file}`); continue }
  const html = fs.readFileSync(file, 'utf8')
  allHtml.push({ path: p.path, html })
  const url = SITE + p.path
  const body = html.slice(html.indexOf('<body'))

  const title = attr(html, /<title>([^<]*)<\/title>/)
  check(title && !titles.has(title), `unique <title>: ${title}`)
  titles.add(title)
  const desc = attr(html, /<meta name="description" content="([^"]*)"/)
  check(desc && !descriptions.has(desc) && desc.length >= 70 && desc.length <= 170, `unique meta description (${desc?.length} chars)`)
  descriptions.add(desc)
  check(attr(html, /<link rel="canonical" href="([^"]*)"/) === url, `canonical = ${url}`)
  check(attr(html, /<meta property="og:url" content="([^"]*)"/) === url, 'og:url matches canonical')
  check(/<meta property="og:title"/.test(html) && /<meta property="og:image" content="https:\/\//.test(html), 'og:title and absolute og:image present')
  check(!/noindex/i.test(html), 'not noindexed')

  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  let types = []
  try {
    for (const b of ldBlocks) {
      const data = JSON.parse(b[1])
      types.push(...(data['@graph'] || [data]).map((n) => n['@type']))
    }
    check(ldBlocks.length > 0, `JSON-LD parses: ${types.join(', ')}`)
  } catch (e) {
    fail(`JSON-LD invalid: ${e.message}`)
  }
  const ldText = ldBlocks.map((b) => b[1]).join('')
  check(!/streetAddress|postalCode|geo"|openingHours|aggregateRating|review/i.test(ldText), 'no unverified address/geo/hours/review fields')
  if (p.service) check(types.includes('Service') && types.includes('BreadcrumbList'), 'Service + BreadcrumbList schema')

  const h1s = [...body.matchAll(/<h1[\s>]/g)].length
  check(h1s === 1, `exactly one <h1> (found ${h1s})`)
  const text = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
  const words = text.split(' ').filter(Boolean).length
  check(words > 300, `pre-rendered text in HTML (${words} words)`)
  const imgs = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
  check(imgs.every((i) => /\balt="/.test(i)), `all ${imgs.length} <img> have alt`)
  // Analytics must load only after consent (src/lib/analytics.js), never from the HTML.
  check(!/googletagmanager|google-analytics|gtag\(|G-FK2EM3ZH1P/.test(html), 'no Google tag in HTML (loaded only after consent)')
  if (p.service) {
    check(/aria-label="Breadcrumb"/.test(body), 'visible breadcrumb')
    check(text.includes('Devanahalli') && text.includes('Bengaluru'), 'mentions Devanahalli and Bengaluru')
  }
}

console.log('\nsite-wide')
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]).sort()
const expected = pages.map((p) => SITE + p.path).sort()
check(JSON.stringify(locs) === JSON.stringify(expected), `sitemap.xml lists exactly the ${expected.length} published pages`)
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8')
check(/^Sitemap: https:\/\/www\.swandigitalsolutions\.com\/sitemap\.xml$/m.test(robots) && !/Disallow: \/\s*$/m.test(robots), 'robots.txt allows crawling and points to sitemap')
check(fs.existsSync(path.join(dist, 'og-image.jpg')), 'og-image.jpg is published')

for (const d of drafts) {
  const p = `/services/${d.slug}/`
  check(!fs.existsSync(path.join(dist, 'services', d.slug)), `draft ${p} not generated`)
  check(!sitemap.includes(p), `draft ${p} not in sitemap`)
  check(!allHtml.some(({ html }) => html.includes(`href="${p}"`) || html.includes(`href="/services/${d.slug}"`)), `draft ${p} not linked`)
}

const internal = new Set()
for (const { html } of allHtml) for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) internal.add(m[1])
const missing = [...internal].filter((h) => {
  const f = path.join(dist, h, h.endsWith('/') ? 'index.html' : '')
  return !fs.existsSync(f)
})
check(missing.length === 0, `all internal links resolve (${internal.size} checked)${missing.length ? ': ' + missing.join(', ') : ''}`)

console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll SEO checks passed')
process.exit(failures ? 1 : 0)
