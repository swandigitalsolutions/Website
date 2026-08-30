import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'AI Studio', href: '#ai-studio' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 flex items-center justify-between h-16 sm:h-20">
        <a href="#top" className="flex items-center gap-2.5 group">
          <img src="/swan-logo.png" alt="Swan Digital Solutions" className="h-8 sm:h-9 w-auto" />
          <span className="font-display font-semibold text-base sm:text-lg tracking-tight">
            SWAN <span className="text-red">DIGITAL</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 xl:gap-10">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-mist hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-red group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 xl:gap-5">
          <a href="tel:+918310579306" className="hidden xl:flex items-center gap-2 text-sm text-mist hover:text-white transition-colors">
            <Phone size={15} className="text-red" />
            +91 83105 79306
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-red text-white text-sm font-medium hover:bg-red-soft transition-colors shadow-glow"
          >
            Get a Quote
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-ink border-t border-line overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-mist hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-5 py-3 rounded-full bg-red text-white text-sm font-medium text-center"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
