import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

const DEMO_URL = 'https://tile-visualizer-roan.vercel.app/'

export default function TileVisualizerDemo() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative isolate overflow-hidden rounded-3xl border border-line bg-surface shadow-card hover:shadow-lift transition-shadow duration-500"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-red to-transparent"
        animate={{ opacity: [0.25, 0.9, 0.25], scaleX: [0.72, 1, 0.72] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="flex items-center gap-3 border-b border-line bg-surface2 px-4 py-3 sm:px-5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red/30 bg-red/10 text-red">
          <Sparkles size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">Tile visualizer · current build</p>
          <p className="truncate text-xs text-mist">SDS Tiles &amp; Ceramics</p>
        </div>
        <span className="hidden items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3 py-1 text-[10px] font-medium text-[#b45309] sm:inline-flex">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]"
            animate={{ opacity: [0.45, 1, 0.45], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          IN DEVELOPMENT
        </span>
      </div>

      <div className="bg-surface2 p-2 sm:p-3">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_18px_40px_-16px_rgba(16,24,40,0.45)]">
          <video
            className="block aspect-video w-full bg-[#090909] object-contain"
            autoPlay
            loop
            muted
            controls
            playsInline
            preload="auto"
            poster="/work/tile-visualizer-preview.webp"
            aria-label="Current build screen recording of the SDS Tiles and Ceramics tile visualizer, playing in a muted loop"
            onCanPlay={(event) => {
              const video = event.currentTarget
              if (video.paused && video.currentTime === 0) {
                const playback = video.play()
                if (playback) playback.catch(() => {})
              }
            }}
            onEnded={(event) => {
              const video = event.currentTarget
              video.currentTime = 0
              const playback = video.play()
              if (playback) playback.catch(() => {})
            }}
          >
            <source src="/work/tile-visualizer-demo.mp4" type="video/mp4" />
            Your browser does not support embedded video. Open the live tile visualizer instead.
          </video>
        </div>
      </div>

      <figcaption className="flex flex-col gap-3 border-t border-line px-4 py-4 sm:px-5">
        <p className="text-xs leading-relaxed text-mist">
          Still in development: our developers are refining integrations, visual design and tile-combination analysis to make previews more accurate.
        </p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-white transition-colors hover:text-red"
        >
          Open the current live build <ArrowUpRight size={14} />
        </a>
      </figcaption>
    </motion.figure>
  )
}
