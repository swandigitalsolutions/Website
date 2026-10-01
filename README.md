# Swan Digital Solutions — Website

A premium, animated React website for Swan Digital Solutions, built with
Vite, Tailwind CSS and Framer Motion.

## Design & motion
- **Theme** — light "porcelain" palette (cool white canvas, deep navy ink,
  brand red). Tokens live in `src/index.css` (`:root`); navy panels (intro,
  CTA, footer) use the `.on-night` class to flip the tokens locally.
- **Motion system** — brand intro with loading counter and curtain wipe
  (once per session), masked word-by-word headings (`SplitText`),
  magnetic buttons (`Magnetic`), pointer spotlight on cards, trailing cursor
  ring (`Cursor`), hide-on-scroll glass navbar with sliding active pill,
  scroll-linked hero parallax and banner reveal (`BrandBanner`), a process
  rail that fills as you scroll, clip-path team portraits.
- Everything respects `prefers-reduced-motion`.

## What's inside
- **Hero** — animated signature "swan curve" mark, gradient headline
- **Services** — the 8 services from your business card, hover-animated cards
- **Why Choose Us** — your 5 differentiators + "online success" tagline
- **How We Work** — 4-step process
- **CTA** band + **Contact** section with click-to-call/email and a working
  contact form (opens the visitor's email client, pre-filled, addressed to
  swandigitalsolutions@gmail.com)
- Fully responsive, keyboard-focus visible, respects reduced-motion

## Run it locally
You'll need [Node.js](https://nodejs.org) 18+ installed. This project could
not be `npm install`-ed in the sandbox that built it (no internet access
there), so please run these on your own machine:

```bash
cd swan-digital
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Build for production
```bash
npm run build
```
This outputs a static `dist/` folder you can upload to any host
(Vercel, Netlify, Hostinger, GoDaddy, etc.) or point www.swandigitalsolutions.com to.

## Editing content
- Colors, fonts: `tailwind.config.js`
- Contact details, services text: `src/components/Contact.jsx` and
  `src/components/Services.jsx`
- Logo: `public/swan-logo.png` (cropped from your card — swap in a
  transparent-background version for the cleanest result)

## Notes
- The contact form uses `mailto:` (no backend needed). If you'd like a
  real backend form (e.g. with a database or email service like Resend/
  Formspree), that's a quick add-on.
