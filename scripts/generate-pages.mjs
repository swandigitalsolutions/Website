// Generates services/<slug>/index.html for every PUBLISHED service in
// src/data/services.js, using index.html as the template (same fonts, icons and
// scripts) with the page-head block swapped for page-specific SEO tags.
// Also writes public/sitemap.xml. Drafts produce no file and no sitemap entry.
//
// Runs automatically in `npm run dev` and `npm run build`.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PUBLISHED_SERVICES } from '../src/data/services.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://www.swandigitalsolutions.com'
const BUSINESS_ID = `${SITE}/#business`

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// JSON inside <script> must not be able to close the tag.
const jsonLd = (data) => JSON.stringify(data, null, 2).replace(/</g, '\\u003c')

const template = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
const HEAD_RE = /<!-- page-head:start[^>]*-->[\s\S]*?<!-- page-head:end -->/
if (!HEAD_RE.test(template)) throw new Error('page-head markers not found in index.html')
if (!template.includes('<div id="root"></div>')) throw new Error('root marker not found in index.html')

function serviceHead(s) {
  const url = `${SITE}/services/${s.slug}/`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': BUSINESS_ID,
        name: 'Swan Digital Solutions',
        url: `${SITE}/`,
        telephone: '+91-8310579306',
        address: { '@type': 'PostalAddress', addressLocality: 'Devanahalli', addressRegion: 'Karnataka', addressCountry: 'IN' },
        hasMap: 'https://maps.app.goo.gl/jn6brte3hF1NjiKn7',
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.name,
        serviceType: s.name,
        description: s.description,
        url,
        provider: { '@id': BUSINESS_ID },
        areaServed: [
          { '@type': 'City', name: 'Devanahalli' },
          { '@type': 'City', name: 'Bengaluru' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: s.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: s.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
  return `<!-- page-head:start (generated for /services/${s.slug}/) -->
    <title>${esc(s.title)}</title>
    <meta name="description" content="${esc(s.description)}" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Swan Digital Solutions" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(s.title)}" />
    <meta property="og:description" content="${esc(s.description)}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Swan Digital Solutions — Your Partner in Digital Growth" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(s.title)}" />
    <meta name="twitter:description" content="${esc(s.description)}" />
    <meta name="twitter:image" content="${SITE}/og-image.jpg" />
    <script type="application/ld+json">
${jsonLd(ld)}
    </script>
    <!-- page-head:end -->`
}

const outDir = path.join(root, 'services')
fs.rmSync(outDir, { recursive: true, force: true })

for (const s of PUBLISHED_SERVICES) {
  for (const field of ['title', 'description', 'intro']) {
    if (!s[field]) throw new Error(`Published service "${s.slug}" is missing ${field}`)
  }
  const html = template
    .replace(HEAD_RE, () => serviceHead(s))
    .replace('<div id="root"></div>', `<div id="root" data-service="${esc(s.slug)}"></div>`)
    .replace('src="/src/main.jsx"', 'src="/src/service-main.jsx"')
  fs.mkdirSync(path.join(outDir, s.slug), { recursive: true })
  fs.writeFileSync(path.join(outDir, s.slug, 'index.html'), html)
}

// No <lastmod>: a build date on every URL is not a real modification date,
// and Google ignores <priority>/<changefreq>.
const urls = [`${SITE}/`, ...PUBLISHED_SERVICES.map((s) => `${SITE}/services/${s.slug}/`)]
fs.writeFileSync(
  path.join(root, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`,
)

console.log(`Generated ${PUBLISHED_SERVICES.length} service pages and sitemap.xml (${urls.length} URLs)`)
