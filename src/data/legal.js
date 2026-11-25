/**
 * Legal page content (/privacy-policy/, /terms-and-conditions/). Plain data —
 * rendered as text by LegalPage, never as HTML. Plain JS (no JSX): also
 * imported by the Node build scripts.
 *
 * Block types inside `body`:
 *   'string'                 → paragraph
 *   { list: [...] }          → bulleted list
 *   { contact: true }        → the company contact card
 *
 * Review this copy with your own adviser before relying on it.
 */

export const COMPANY = {
  name: 'Swan Digital Solutions',
  email: 'swandigitalsolutions@gmail.com',
  phone: '+91 83105 79306',
  phoneHref: 'tel:+918310579306',
  location: 'Devanahalli, Bengaluru Rural, Karnataka, India',
  site: 'https://www.swandigitalsolutions.com',
}

export const LAST_UPDATED = '25 November 2026'

export const PRIVACY = {
  slug: 'privacy-policy',
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  seoTitle: 'Privacy Policy | Swan Digital Solutions',
  description:
    'How Swan Digital Solutions collects, uses and protects your personal data, your rights under India’s DPDP Act 2023, and how to contact us.',
  intro:
    'This policy explains what information Swan Digital Solutions collects when you visit our website or contact us, why we collect it, and the choices you have. We collect as little as we can, and we never sell your data.',
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: [
        `${COMPANY.name} ("we", "us", "our") is a web design and software studio based in ${COMPANY.location}. We are responsible for the personal data described in this policy and act as the "Data Fiduciary" under India's Digital Personal Data Protection Act, 2023.`,
      ],
    },
    {
      id: 'what-we-collect',
      title: 'Information we collect',
      body: [
        'We only collect information you choose to give us, plus a small amount of technical data needed to run the site.',
        {
          list: [
            'Contact form: your name, email address, phone number (optional), the type of project and the message you write. If you use the website planner or the internship section, the brief it creates is added to your message.',
            'Direct contact: anything you send us by email, phone or WhatsApp, such as project details, files, your business name or, for internships, your CV and college details.',
            'Client projects: billing details, business information and content you provide so we can deliver the work you hire us for.',
            'Technical data: your browser and device send standard information (such as IP address and browser type) to our hosting provider when the page loads. We do not use this to identify you.',
          ],
        },
        'We do not knowingly collect sensitive personal data, and the site is not intended for children under 18.',
      ],
    },
    {
      id: 'how-we-use',
      title: 'How we use your information',
      body: [
        {
          list: [
            'To reply to your enquiry and prepare quotes or proposals.',
            'To plan, deliver, support and invoice the projects you engage us for.',
            'To keep the website secure and stop spam or abuse of the contact form.',
            'To meet our legal, tax and accounting obligations.',
          ],
        },
        'We will not send you marketing emails unless you ask us to, and you can opt out at any time.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and browser storage',
      body: [
        'We do not use advertising or tracking cookies, and we do not run third-party analytics on this site. Our fonts are served from our own website, not from Google Fonts.',
        'When you use the website planner or the internship section, the brief it creates is kept in your browser’s session storage ("sds_planner_brief") so it can be filled into the contact form. It never leaves your device unless you submit the form, and your browser deletes it when you close the tab.',
        'The website planner and the chat assistant run entirely in your browser. What you choose or type into them is not sent to us or to any server.',
      ],
    },
    {
      id: 'sharing',
      title: 'Who we share it with',
      body: [
        'We share personal data only with the service providers we need to run our business, and only for that purpose:',
        {
          list: [
            'FormSubmit (formsubmit.co) — delivers contact-form messages to our inbox.',
            'Google — hosts our email (Gmail).',
            'Vercel — hosts this website and keeps standard server logs.',
          ],
        },
        'We may also disclose information if required by law, a court order or a government authority. We never sell or rent your personal data.',
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep it',
      body: [
        'Enquiries that do not turn into a project are deleted within 24 months. Client and invoice records are kept for as long as Indian tax and accounting law requires (generally 8 years), then deleted.',
      ],
    },
    {
      id: 'security',
      title: 'How we protect it',
      body: [
        'The site is served over HTTPS, access to our inbox and project files is limited to our team and protected by two-factor authentication, and the contact form has spam protection. No method of transmission over the internet is completely secure, but we take reasonable steps to protect your information.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: [
        'Under the Digital Personal Data Protection Act, 2023 and other applicable law, you can:',
        {
          list: [
            'Ask for a summary of the personal data we hold about you.',
            'Ask us to correct, complete or update it.',
            'Ask us to delete it, where we are not required to keep it by law.',
            'Withdraw consent you have given us.',
            'Nominate another person to exercise these rights on your behalf.',
            'Raise a grievance with us, and then with the Data Protection Board of India if it is not resolved.',
          ],
        },
        'Email us to use any of these rights. We will respond within 30 days.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: [
        'We may update this policy from time to time. The "Last updated" date at the top of this page shows when it last changed. Significant changes will be highlighted on the site.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact and grievances',
      body: [
        'For any privacy question, request or complaint, contact our grievance officer:',
        { contact: true },
      ],
    },
  ],
}

export const TERMS = {
  slug: 'terms-and-conditions',
  eyebrow: 'Legal',
  title: 'Terms & Conditions',
  seoTitle: 'Terms & Conditions | Swan Digital Solutions',
  description:
    'Terms for using the Swan Digital Solutions website and our software, website and digital marketing services: quotes, payments, ownership and support.',
  intro:
    'These terms cover your use of this website and the services Swan Digital Solutions provides. By using the site or engaging us for a project, you agree to them. Where a signed proposal or agreement says something different, that document takes priority.',
  sections: [
    {
      id: 'about',
      title: 'About these terms',
      body: [
        `This website is operated by ${COMPANY.name}, based in ${COMPANY.location}. "You" means the person or business using the site or hiring us. "Services" means the work we provide, including website development, software development, school management software, ERP and business software, hotel and restaurant websites, AI solutions and automation, and digital marketing.`,
      ],
    },
    {
      id: 'website-use',
      title: 'Using this website',
      body: [
        {
          list: [
            'Use the site only for lawful purposes.',
            'Do not attempt to hack, overload or disrupt the site, or send spam through the contact form.',
            'Do not copy or reuse our designs, text, logo or case studies without written permission.',
          ],
        },
        'Information on the site is for general guidance. Prices, timelines and features shown are indicative until confirmed in a written quote.',
      ],
    },
    {
      id: 'quotes',
      title: 'Quotes and project scope',
      body: [
        'Every project starts with a written quote or proposal that sets out the scope, deliverables, timeline and price. Quotes are valid for 30 days. Work outside the agreed scope is a change request and will be quoted separately before we start it.',
      ],
    },
    {
      id: 'payments',
      title: 'Payments',
      body: [
        {
          list: [
            'Unless the proposal says otherwise, we take a 50% advance before work begins and the balance before launch or handover.',
            'Invoices are due within 7 days. Prices are in Indian Rupees and exclude GST, which is added where applicable.',
            'We may pause work or take a site offline if payment is more than 15 days overdue.',
            'Recurring services, such as maintenance, hosting or marketing, are billed in advance for each period.',
          ],
        },
      ],
    },
    {
      id: 'client-duties',
      title: 'Your responsibilities',
      body: [
        {
          list: [
            'Provide content, images, logins and feedback on time. Delays on your side may move the delivery date.',
            'Make sure you own or have permission to use everything you give us, including text, photos, logos and data.',
            'Review and approve each stage. Approval of a stage means it is accepted.',
          ],
        },
      ],
    },
    {
      id: 'revisions',
      title: 'Revisions and delivery',
      body: [
        'Each proposal includes a set number of revision rounds. Further revisions are billed at our standard hourly rate. Timelines are estimates and depend on prompt feedback and content from you.',
      ],
    },
    {
      id: 'ownership',
      title: 'Ownership and intellectual property',
      body: [
        'Once you have paid in full, you own the final design, content and custom code we create for your project. We keep ownership of our pre-existing tools, frameworks and reusable components, and grant you a permanent licence to use them as part of your project.',
        'Third-party items, such as themes, plugins, fonts, stock images or software libraries, remain subject to their own licences.',
        'We may show your project in our portfolio and on social media unless you ask us in writing not to.',
      ],
    },
    {
      id: 'third-party',
      title: 'Hosting, domains and third-party services',
      body: [
        'Domains, hosting, email, payment gateways and other third-party services are provided by their own companies under their own terms. We are not responsible for their outages, price changes or policies. Renewal of domains and hosting is your responsibility unless it is included in a maintenance plan.',
      ],
    },
    {
      id: 'cancellation',
      title: 'Cancellation and refunds',
      body: [
        'You can cancel a project at any time by giving us notice in writing. You will pay for the work completed up to that date. The advance payment is non-refundable once work has started. Recurring plans can be cancelled with 30 days’ notice.',
      ],
    },
    {
      id: 'warranty',
      title: 'Support and warranty',
      body: [
        'We fix bugs in the work we delivered free of charge for 30 days after launch. This does not cover changes made by you or others, third-party updates, or new features. Ongoing support is available through a maintenance plan.',
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      body: [
        'We build with care, but we cannot guarantee specific business results such as search rankings, traffic or sales. To the extent the law allows, our total liability for any claim is limited to the amount you paid us for the service in question, and we are not liable for indirect losses such as lost profits or data.',
      ],
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      body: [
        'We keep your business information, logins and data confidential and use them only to deliver your project. Our Privacy Policy explains how we handle personal data.',
      ],
    },
    {
      id: 'law',
      title: 'Governing law',
      body: [
        'These terms are governed by the laws of India. We will first try to resolve any dispute through good-faith discussion. If that fails, the courts in Bengaluru, Karnataka have exclusive jurisdiction.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: [
        'We may update these terms from time to time. The version on this page at the time you sign a proposal applies to that project.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: ['Questions about these terms? Get in touch:', { contact: true }],
    },
  ],
}

export const LEGAL_PAGES = [PRIVACY, TERMS]
export const legalBySlug = (slug) => LEGAL_PAGES.find((p) => p.slug === slug)
