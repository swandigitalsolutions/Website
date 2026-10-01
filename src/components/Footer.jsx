import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]

export default function Footer() {
  return (
    <footer className="on-night relative overflow-hidden bg-night pt-16 pb-10">
      <div className="absolute inset-0 noise-grid opacity-40 pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/swan-mark.webp" alt="Swan Digital Solutions" className="h-7 w-auto" />
            <span className="font-display text-sm font-medium text-plainwhite">
              SWAN <span className="text-red">DIGITAL</span> SOLUTIONS
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-mist">
            <a href="mailto:swandigitalsolutions@gmail.com" className="hover:text-white transition-colors">
              swandigitalsolutions@gmail.com
            </a>
            <a href="tel:+918310579306" className="hover:text-white transition-colors">
              +91 83105 79306
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-red hover:bg-red"
            >
              <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* oversized wordmark that rises into place */}
        <div aria-hidden="true" className="mt-12 overflow-hidden select-none">
          <motion.div
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display font-semibold tracking-tighter leading-[0.85] text-[18vw] md:text-[14vw] xl:text-[11.5rem] text-center bg-gradient-to-b from-white/[0.14] to-white/[0.02] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]"
          >
            SWAN DIGITAL
          </motion.div>
        </div>

        <p className="mt-8 border-t border-line pt-6 text-xs text-mist text-center">
          &copy; {new Date().getFullYear()} Swan Digital Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
