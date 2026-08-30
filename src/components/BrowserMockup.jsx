import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Circle } from 'lucide-react'

/**
 * Hero showcase — a live-feeling browser window that cycles through the
 * kind of sites Swan Digital ships. Swap `SHOTS` images for real
 * screenshots (drop them in `public/showcase/` and reference
 * "/showcase/name.jpg"); keep `url` and `label` in sync.
 */
const SHOTS = [
  {
    url: 'swandigital.com/lakeside-resort',
    label: 'Hotel booking site',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
  },
  {
    url: 'swandigital.com/vidya-school',
    label: 'School management portal',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    url: 'swandigital.com/meridian-erp',
    label: 'Business dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
  {
    url: 'swandigital.com/spice-route',
    label: 'Restaurant website',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
]

export default function BrowserMockup() {
  const [i, setI] = useState(0)

  useEffect(() => {
    // warm the cache so the crossfades never show a blank frame
    SHOTS.forEach((s) => { const img = new Image(); img.src = s.image })
    const id = setInterval(() => setI((n) => (n + 1) % SHOTS.length), 3200)
    return () => clearInterval(id)
  }, [])

  const shot = SHOTS[i]

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full max-w-md"
    >
      <div className="relative rounded-2xl border border-line bg-surface/80 backdrop-blur-sm shadow-card overflow-hidden">
        {/* title bar */}
        <div className="flex items-center gap-3 px-4 h-11 border-b border-line bg-surface2">
          <div className="flex gap-1.5">
            <Circle size={10} className="fill-red/70 text-red/70" />
            <Circle size={10} className="fill-[#F59E0B]/70 text-[#F59E0B]/70" />
            <Circle size={10} className="fill-[#10B981]/70 text-[#10B981]/70" />
          </div>
          <div className="flex-1 flex items-center gap-2 h-6 px-3 rounded-md bg-ink border border-line text-[11px] text-mist overflow-hidden">
            <Lock size={11} className="text-red shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={shot.url}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="truncate font-mono"
              >
                {shot.url}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* viewport */}
        <div className="relative aspect-[16/10] bg-ink">
          <AnimatePresence mode="wait">
            <motion.img
              key={shot.image}
              src={shot.image}
              alt={shot.label}
              decoding="async"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />

          <div className="absolute left-3 bottom-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink/80 border border-line text-[11px] text-white/90 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              {shot.label}
            </span>
          </div>
        </div>

        {/* progress dots */}
        <div className="flex items-center gap-1.5 px-4 h-9 border-t border-line bg-surface2">
          {SHOTS.map((s, idx) => (
            <button
              key={s.url}
              onClick={() => setI(idx)}
              aria-label={`Show ${s.label}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? 'w-6 bg-red' : 'w-1.5 bg-line hover:bg-mist'
              }`}
            />
          ))}
          <span className="ml-auto eyebrow text-[10px] text-mist">Live preview</span>
        </div>
      </div>

      {/* floating "shipped" stat chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 16 }}
        className="absolute -bottom-5 -right-3 sm:-right-6 rounded-xl border border-line bg-surface px-4 py-2.5 shadow-card"
      >
        <div className="font-display text-lg font-semibold text-white leading-none">
          40+
        </div>
        <div className="text-[10px] text-mist mt-1">projects shipped</div>
      </motion.div>
    </motion.div>
  )
}
