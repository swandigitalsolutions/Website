// Which service pages exist. Kept separate from the page content
// (src/data/services.js) so home-page links don't pull that text into the
// home page's JavaScript.
//
// Only 'published' services get a page, links and a sitemap entry. To publish
// a draft, complete its content in services.js and change its status here.
// Plain JS (no JSX): also imported by the Node build scripts.

export const SERVICE_LIST = [
  { slug: 'website-development', name: 'Website Development', status: 'published' },
  { slug: 'software-development', name: 'Software Development', status: 'published' },
  { slug: 'digital-marketing', name: 'Digital Marketing', status: 'draft' }, // content to be expanded before publishing
  { slug: 'seo', name: 'SEO Services', status: 'draft' },
  { slug: 'social-media-marketing', name: 'Social Media Marketing', status: 'draft' },
]

export const PUBLISHED_LIST = SERVICE_LIST.filter((s) => s.status === 'published')

/** URL path of a published service page, or null if it is a draft / unknown. */
export const servicePath = (slug) =>
  PUBLISHED_LIST.some((s) => s.slug === slug) ? `/services/${slug}/` : null
