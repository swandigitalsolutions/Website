// Content of the service pages at /services/<slug>/.
//
// Names and published/draft status live in ./service-list.js. Only published
// services are built, linked and listed in sitemap.xml; drafts produce no URL
// at all until they are reviewed and switched to 'published' there.
//
// Every published claim here is taken from content already on the site
// (service cards, process, project data) or from confirmed business facts.
// Do not add claims (numbers, guarantees, platforms, client results) that
// have not been confirmed by the business.
//
// After editing, `npm run build` regenerates the page HTML and sitemap.xml.
// This file is imported by Node build scripts, so keep it plain JS (no JSX).
import { SERVICE_LIST } from './service-list.js'

const CONTENT = [
  {
    slug: 'website-development',
    icon: 'globe',
    title: 'Website Development in Devanahalli & Bengaluru | Swan Digital Solutions',
    description:
      'Fast, modern business websites designed and built by Swan Digital Solutions in Devanahalli, Karnataka — for businesses in Devanahalli, Bengaluru and beyond.',
    h1: ['Website development', { text: 'in Devanahalli.', className: 'text-gradient' }],
    intro:
      'Swan Digital Solutions designs and builds fast, modern websites that represent your brand and turn visitors into customers. We are based in Devanahalli and work with businesses across Devanahalli and Bengaluru, and with clients further away remotely.',
    featuresHeading: ['Websites built around', { text: 'your business.', className: 'text-gradient' }],
    features: [
      { title: 'Business websites', desc: 'Fast, modern websites built to represent your brand and convert visitors into customers.' },
      { title: 'Hotel & restaurant websites', desc: 'Booking-ready sites with menus, galleries and reservations built for hospitality.' },
      { title: 'On-brand design', desc: 'A premium, on-brand interface, reviewed with you until it feels exactly right.' },
      { title: 'Clean, fast code', desc: 'Built on modern frameworks and best practice, so pages stay quick and secure.' },
      { title: 'Maintenance after launch', desc: 'Ongoing updates, security patches and performance monitoring, handled for you.' },
    ],
    related: ['KMG Stones', 'Petravera Stone', 'Discipline Karate Institute', 'Meridian Motor Heritage', 'Sāri'],
    faqs: [
      {
        q: 'Do you work with businesses outside Devanahalli?',
        a: 'Yes. We are based in Devanahalli, serve businesses in Bengaluru, and work with clients elsewhere remotely.',
      },
      {
        q: 'How much does a website cost?',
        a: 'Pricing is scoped to the project. Share your requirements through the contact form or call +91 83105 79306 to request a quote.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'Timelines depend on the project’s scope. Share your requirements with the team to discuss a suitable plan.',
      },
      {
        q: 'Do you support the website after launch?',
        a: 'Yes. Our website maintenance service covers ongoing updates, security patches and performance monitoring.',
      },
    ],
  },
  {
    slug: 'software-development',
    icon: 'code',
    title: 'Software Development in Devanahalli & Bengaluru | Swan Digital Solutions',
    description:
      'Custom web applications, business management software and school management systems by Swan Digital Solutions, Devanahalli — serving Devanahalli and Bengaluru.',
    h1: ['Custom software development', { text: 'in Devanahalli.', className: 'text-gradient' }],
    intro:
      'From custom web applications to business management software and school management systems, Swan Digital Solutions builds software engineered around your exact workflow — not a template. We are based in Devanahalli and work with organisations across Devanahalli and Bengaluru.',
    featuresHeading: ['Software shaped around', { text: 'how you work.', className: 'text-gradient' }],
    features: [
      { title: 'Custom web applications', desc: 'Tailored web apps engineered around your exact workflow, not a template.' },
      { title: 'Business management software', desc: 'Custom internal tools that streamline operations, inventory and reporting.' },
      { title: 'School management systems', desc: 'End-to-end platforms for admissions, attendance, fees and communication.' },
      { title: 'Role-based access', desc: 'Separate sign-in paths for each role — like the Admin, Teacher and Parent logins in our school portal.' },
      { title: 'Multi-business workspaces', desc: 'One system for related businesses — StoneQuarryERP has dedicated workspaces for KMG Stones and Murudeshwara Stones.' },
    ],
    related: ['StoneQuarryERP', 'J S Public Pre Primary School', 'SDS Tiles & Ceramics'],
    faqs: [
      {
        q: 'What kind of software do you build?',
        a: 'Custom web applications, business management software such as ERP portals, and school management systems. Our work includes an ERP portal for stone businesses and a school portal with separate Admin, Teacher and Parent sign-ins.',
      },
      {
        q: 'Do you work with businesses outside Devanahalli?',
        a: 'Yes. We are based in Devanahalli, serve businesses in Bengaluru, and work with clients elsewhere remotely.',
      },
      {
        q: 'How much does custom software cost?',
        a: 'Pricing is scoped to the project. Share your requirements through the contact form or call +91 83105 79306 to request a quote.',
      },
      {
        q: 'How long does a software project take?',
        a: 'Timelines depend on the project’s scope. Share your requirements with the team to discuss a suitable plan.',
      },
    ],
  },
  {
    slug: 'digital-marketing',
    icon: 'megaphone',
    title: 'Digital Marketing in Devanahalli & Bengaluru | Swan Digital Solutions',
    description:
      'Digital marketing support from Swan Digital Solutions in Devanahalli — SEO, content and campaign support that brings the right traffic to your website.',
    h1: ['Digital marketing', { text: 'in Devanahalli.', className: 'text-gradient' }],
    intro:
      'A website works best when the right people find it. Swan Digital Solutions provides digital marketing support — SEO, content and campaign support — for businesses in Devanahalli and Bengaluru, alongside the websites we build.',
    featuresHeading: ['Bring the right people', { text: 'to your site.', className: 'text-gradient' }],
    features: [
      { title: 'SEO support', desc: 'Help your website get found when customers search for what you offer.' },
      { title: 'Content support', desc: 'Content for your website that speaks to the customers you want to reach.' },
      { title: 'Campaign support', desc: 'Campaign support that brings the right traffic to your site.' },
    ],
    related: [],
    faqs: [
      {
        q: 'Can you guarantee first place on Google?',
        a: 'No. Search rankings are decided by Google, and no honest provider can guarantee a position.',
      },
      {
        q: 'Do you work with businesses outside Devanahalli?',
        a: 'Yes. We are based in Devanahalli, serve businesses in Bengaluru, and work with clients elsewhere remotely.',
      },
      {
        q: 'How much does digital marketing cost?',
        a: 'Pricing is scoped to the work. Share your goals through the contact form or call +91 83105 79306 to request a quote.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // DRAFTS — not built, not linked, not in sitemap.xml.
  // Fill in reviewed, accurate content, then set status: 'published' in
  // service-list.js.
  // ---------------------------------------------------------------------------
  {
    slug: 'seo',
    icon: 'search',
    title: 'SEO Services in Devanahalli & Bengaluru | Swan Digital Solutions',
    description: null, // TODO: confirmed description of the SEO service
    h1: ['SEO services', { text: 'in Devanahalli.', className: 'text-gradient' }],
    intro: null, // TODO: what the SEO service includes, in the business's own words
    featuresHeading: ['Get found by', { text: 'local customers.', className: 'text-gradient' }],
    features: [], // TODO: confirmed deliverables (e.g. technical SEO, on-page, local SEO / Google Business Profile, reporting)
    related: [], // TODO: only client projects where SEO work was actually delivered
    faqs: [], // TODO
  },
  {
    slug: 'social-media-marketing',
    icon: 'share',
    title: 'Social Media Marketing in Devanahalli & Bengaluru | Swan Digital Solutions',
    description: null, // TODO
    h1: ['Social media marketing', { text: 'in Devanahalli.', className: 'text-gradient' }],
    intro: null, // TODO
    featuresHeading: ['Show up where', { text: 'customers scroll.', className: 'text-gradient' }],
    features: [], // TODO: confirmed platforms and deliverables
    related: [], // TODO
    faqs: [], // TODO
  },
]

/** Every service with its content, name and status merged in. */
export const ALL_SERVICES = SERVICE_LIST.map((entry) => {
  const content = CONTENT.find((c) => c.slug === entry.slug)
  if (!content) throw new Error(`No content in services.js for "${entry.slug}"`)
  return { ...content, ...entry }
})

export const PUBLISHED_SERVICES = ALL_SERVICES.filter((s) => s.status === 'published')

export const serviceBySlug = (slug) => PUBLISHED_SERVICES.find((s) => s.slug === slug)
