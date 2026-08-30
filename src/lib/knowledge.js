/**
 * Self-contained knowledge base for the Swan Digital assistant.
 *
 * Every entry is drawn directly from this website's own content
 * (Hero, Services, Why Choose Us, Process, Contact). The assistant
 * scores the visitor's message against each entry's keywords and
 * returns the best match — no external API, works fully offline.
 *
 * To "retrain" the bot, just edit the entries below.
 */

export const COMPANY = {
  name: 'Swan Digital Solutions',
  phone: '+91 83105 79306',
  phoneHref: 'tel:+918310579306',
  email: 'swandigitalsolutions@gmail.com',
  website: 'www.swandigital.com',
  location: 'India',
}

export const KB = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'good morning', 'good evening', 'namaste'],
    answer:
      "Hi! I'm the Swan Digital assistant. Ask me about our services, how we work, pricing, or how to get in touch.",
  },
  {
    id: 'about',
    keywords: ['who are you', 'about', 'company', 'swan digital', 'what do you do', 'what is swan'],
    answer:
      'Swan Digital Solutions designs premium websites, business software and digital growth systems for hotels, schools and modern businesses — engineered to launch fast and scale further. Everything is built in-house.',
  },
  {
    id: 'services-overview',
    keywords: ['services', 'what do you offer', 'offerings', 'what can you build', 'help with', 'products'],
    answer:
      'We offer eight core services: Business Websites, Hotel & Restaurant Websites, School Management Systems, Business Management Software, Custom Web Applications, Website Maintenance, AI Solutions & Automation, and Digital Marketing Support.',
  },
  {
    id: 'websites',
    keywords: ['website', 'web site', 'business website', 'landing page', 'company site', 'brochure site'],
    answer:
      'Our Business Websites are fast, modern sites built to represent your brand and convert visitors into customers.',
  },
  {
    id: 'hotel',
    keywords: ['hotel', 'restaurant', 'hospitality', 'booking', 'reservation', 'menu', 'cafe', 'resort'],
    answer:
      'For hospitality we build booking-ready hotel & restaurant websites with menus, galleries and reservations designed for the way hotels and restaurants actually work.',
  },
  {
    id: 'school',
    keywords: ['school', 'college', 'education', 'student', 'admission', 'attendance', 'fees', 'institute', 'erp'],
    answer:
      'Our School Management Systems are end-to-end platforms covering admissions, attendance, fees and parent–school communication.',
  },
  {
    id: 'software',
    keywords: ['software', 'management software', 'internal tool', 'inventory', 'reporting', 'operations', 'crm', 'erp'],
    answer:
      'We build Business Management Software — custom internal tools that streamline operations, inventory and reporting for your team.',
  },
  {
    id: 'webapp',
    keywords: ['web app', 'web application', 'custom app', 'portal', 'dashboard', 'saas', 'workflow'],
    answer:
      'Custom Web Applications are tailored and engineered around your exact workflow — not a template.',
  },
  {
    id: 'maintenance',
    keywords: ['maintenance', 'support', 'updates', 'security', 'patches', 'monitoring', 'upkeep', 'amc'],
    answer:
      'Website Maintenance covers ongoing updates, security patches and performance monitoring, handled for you. We also provide dedicated support after launch.',
  },
  {
    id: 'ai',
    keywords: ['ai', 'artificial intelligence', 'automation', 'chatbot', 'bot', 'automate', 'machine learning'],
    answer:
      'Our AI Solutions & Automation service adds practical AI features and automations that save your team real hours — this chat assistant is one small example.',
  },
  {
    id: 'marketing',
    keywords: ['marketing', 'seo', 'traffic', 'campaign', 'content', 'ads', 'social media', 'ranking', 'google'],
    answer:
      'Digital Marketing Support includes SEO, content and campaign support that brings the right traffic to your site.',
  },
  {
    id: 'process',
    keywords: ['process', 'how do you work', 'steps', 'approach', 'workflow', 'how it works', 'methodology'],
    answer:
      'We work in four clear steps: 1) Discover — learn your business, goals and audience; 2) Design — a premium, on-brand interface reviewed with you; 3) Develop — clean, fast, secure code on modern frameworks; 4) Deliver — launch, then ongoing maintenance and support.',
  },
  {
    id: 'why-us',
    keywords: ['why choose', 'why you', 'why swan', 'different', 'better', 'benefits', 'advantage'],
    answer:
      'Why clients choose us: modern, secure & scalable solutions; on-time delivery every time; affordable pricing with the best value; dedicated support & maintenance; and 100% client satisfaction.',
  },
  {
    id: 'timeline',
    keywords: ['how long', 'timeline', 'time', 'delivery', 'deadline', 'fast', 'when', 'duration', 'turnaround'],
    answer:
      "We're engineered to launch fast, and we deliver on time, every time. Share your scope with us and we'll give you a clear timeline within a day.",
  },
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'quote', 'budget', 'rate', 'how much', 'charges', 'estimate'],
    answer:
      "Pricing is affordable and quoted per project for the best value. Tell us about your business and we'll put together a clear plan and pricing within one business day. Use “Get a Quote”, or email swandigitalsolutions@gmail.com.",
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'get in touch', 'talk', 'call', 'phone', 'email', 'enquiry', 'inquiry', 'hire', 'start'],
    answer:
      'You can call +91 83105 79306, email swandigitalsolutions@gmail.com, or use the contact form on this site — we reply within one business day.',
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'based', 'office', 'address', 'country', 'remote'],
    answer:
      'Swan Digital Solutions is based in India and works with clients remotely.',
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'great', 'cool'],
    answer: "You're welcome! Anything else you'd like to know about Swan Digital?",
  },
]

const STOP = new Set([
  'the', 'a', 'an', 'is', 'are', 'do', 'does', 'you', 'your', 'i', 'we', 'to',
  'of', 'for', 'and', 'or', 'can', 'me', 'my', 'with', 'on', 'in', 'it', 'that',
  'this', 'have', 'has', 'about', 'please', 'tell', 'give', 'want', 'need',
])

const FALLBACK =
  "I'm not certain about that one. I can help with our services, process, timelines, pricing and contact details — or reach the team directly at swandigitalsolutions@gmail.com / +91 83105 79306.";

/**
 * Score the query against every KB entry and return the best answer.
 * Swap this function for a `fetch('/api/chat')` call if a backend is
 * added later — the widget only depends on this signature.
 */
export function getAnswer(rawQuery) {
  const query = (rawQuery || '').toLowerCase().trim()
  if (!query) return FALLBACK

  const words = query
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))

  let best = null
  let bestScore = 0

  for (const entry of KB) {
    let score = 0
    for (const kw of entry.keywords) {
      if (query.includes(kw)) {
        // multi-word phrase matches count for more
        score += kw.includes(' ') ? 4 : 2
        continue
      }
      for (const w of words) {
        if (kw === w) score += 2
        else if (kw.includes(w) || w.includes(kw)) score += 1
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  return bestScore >= 2 && best ? best.answer : FALLBACK
}
