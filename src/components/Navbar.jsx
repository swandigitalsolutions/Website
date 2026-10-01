import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react'
import useScrollSpy from '../hooks/useScrollSpy'
import Magnetic from './Magnetic'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Planner', href: '#planner' },
  { label: 'Team', href: '#team' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = ['services', 'work', 'planner', 'team', 'why-us', 'process', 'contact']
const EASE = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const lastY = useRef(0)
  const active = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // tuck the bar away while reading downwards, bring it back on scroll up
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 480)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pill = hovered ?? `#${active}`

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3"
    >
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between h-14 sm:h-16 pl-4 pr-2 sm:pl-5 rounded-2xl border transition-all duration-500 ${
          scrolled || open
            ? 'bg-white/80 backdrop-blur-xl border-line shadow-card'
            : 'bg-white/0 border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <motion.img
            src="/swan-mark.webp"
            alt="Swan Digital Solutions"
            className="h-8 sm:h-9 w-auto"
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
          />
          <span className="font-display font-semibold text-base sm:text-lg tracking-tight">
            SWAN <span className="text-red">DIGITAL</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" onMouseLeave={() => setHovered(null)}>
          {LINKS.map((link) => {
            const isActive = `#${active}` === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-3 xl:px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
                  isActive ? 'text-white font-medium' : 'text-mist hover:text-white'
                }`}
              >
                {pill === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full ${isActive && !hovered ? 'bg-red/10' : 'bg-surface2'}`}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute left-1/2 -bottom-0.5 h-1 w-1 -ml-0.5 rounded-full bg-red"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <a href="tel:+918310579306" className="hidden xl:flex items-center gap-2 text-sm text-mist hover:text-white transition-colors">
            <Phone size={15} className="text-red" />
            +91 83105 79306
          </a>
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="btn-shine group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red text-plainwhite text-sm font-medium hover:bg-red-soft transition-colors shadow-glow"
            >
              Get a Quote
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </div>

        <button
          className="lg:hidden text-white h-10 w-10 inline-flex items-center justify-center rounded-xl hover:bg-surface2 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'x' : 'm'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="lg:hidden mx-auto mt-2 max-w-7xl rounded-2xl border border-line bg-white/95 backdrop-blur-xl shadow-lift overflow-hidden"
          >
            <motion.div
              className="px-5 py-4 flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } } }}
            >
              {LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                  className={`flex items-center justify-between py-3 border-b border-line/70 font-display text-lg ${
                    `#${active}` === link.href ? 'text-red' : 'text-white'
                  }`}
                >
                  {link.label}
                  <ArrowUpRight size={16} className="text-mist" />
                </motion.a>
              ))}
              <motion.a
                href="tel:+918310579306"
                variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                className="mt-4 flex items-center gap-2 text-sm text-mist"
              >
                <Phone size={15} className="text-red" /> +91 83105 79306
              </motion.a>
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="mt-4 px-5 py-3 rounded-xl bg-red text-plainwhite text-sm font-medium text-center shadow-glow"
              >
                Get a Quote
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
