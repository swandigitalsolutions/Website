/**
 * Water for the footer wordmark: a deep, lit surface whose rippling
 * reflection of "SWAN DIGITAL" wobbles like real water (SVG turbulence
 * displacement), drifting light glints, and the brand swan swimming across
 * at three depths — each bobbing, trailing a V-shaped wake and mirrored
 * in the water.
 */

// nearer swans are larger, lower on the water, brighter and quicker
const SWANS = [
  { size: 34, y: 8, dur: 72, delay: -12, o: 0.6, rest: '62vw' },
  { size: 46, y: 28, dur: 54, delay: -38, o: 0.85, rest: '22vw' },
  { size: 60, y: 54, dur: 42, delay: -5, o: 1, rest: '44vw' },
  { size: 40, y: 18, dur: 64, delay: -50, o: 0.75, rest: '80vw' },
]

const GLINTS = [
  { left: '12%', top: 34, w: 90, dur: 7, delay: 0 },
  { left: '38%', top: 70, w: 140, dur: 9, delay: -3 },
  { left: '61%', top: 22, w: 70, dur: 6, delay: -1.5 },
  { left: '82%', top: 88, w: 110, dur: 8, delay: -5 },
]

const WORDMARK = 'font-display font-semibold tracking-tighter leading-[0.85] text-[18vw] md:text-[14vw] xl:text-[11.5rem] text-center'

export default function SwanPond() {
  return (
    <div aria-hidden="true" className="pond relative left-1/2 w-[100vw] -translate-x-1/2 h-[150px] sm:h-[190px] overflow-hidden">
      {/* the water ripple: turbulence slowly evolving, displacing what it filters */}
      <svg className="absolute h-0 w-0">
        <filter id="water-ripple" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.07" numOctaves="2" seed="7" result="noise">
            <animate attributeName="baseFrequency" dur="11s" values="0.004 0.07;0.006 0.09;0.004 0.07" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* water body */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(46_66_122/0.55)_0%,rgb(20_30_60/0.85)_45%,rgb(9_14_28/0)_100%)]" />

      {/* the wordmark's reflection, rippling */}
      <div className="pond-reflection absolute inset-x-0 top-0 mx-auto max-w-7xl px-6 md:px-10">
        <div className={`${WORDMARK} -scale-y-100 text-white/[0.1]`} style={{ filter: 'url(#water-ripple)' }}>
          SWAN DIGITAL
        </div>
      </div>

      {/* surface texture: slow sliding wave lines */}
      <svg className="pond-waves absolute inset-x-0 top-0 h-full w-[200%]" preserveAspectRatio="none" viewBox="0 0 400 100">
        {[14, 36, 62].map((y, i) => (
          <path
            key={y}
            d={`M0 ${y} ${Array.from({ length: 20 }, (_, k) => `Q${k * 20 + 5} ${y - 1.6} ${k * 20 + 10} ${y} T${k * 20 + 20} ${y}`).join(' ')}`}
            fill="none"
            stroke="white"
            strokeOpacity={0.06 - i * 0.012}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* light glints dancing on the surface */}
      {GLINTS.map((g, i) => (
        <span
          key={i}
          className="pond-glint absolute h-[2px] rounded-full"
          style={{ left: g.left, top: g.top, width: g.w, animationDuration: `${g.dur}s`, animationDelay: `${g.delay}s` }}
        />
      ))}

      {/* the lit waterline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/[0.06] to-transparent" />

      {/* swimming swans */}
      {SWANS.map((s, i) => (
        <div
          key={i}
          className="pond-swimmer absolute left-0"
          style={{ top: s.y, opacity: s.o, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s`, '--rest': s.rest }}
        >
          <div className="relative" style={{ width: s.size * 0.6, height: s.size }}>
            {/* V-shaped wake opening out behind */}
            <svg
              className="pond-wake absolute"
              style={{ width: s.size * 3.4, height: s.size * 0.7, right: s.size * 0.3, top: s.size * 0.72 }}
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={`wake-${i}`} x1="1" x2="0" y1="0" y2="0">
                  <stop offset="0" stopColor="white" stopOpacity="0.55" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M100 4 L0 0" stroke={`url(#wake-${i})`} strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
              <path d="M100 6 L0 20" stroke={`url(#wake-${i})`} strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
            {/* rings spreading from the body */}
            <span className="pond-ring" style={{ width: s.size * 1.4, height: s.size * 0.28, left: -s.size * 0.4, top: s.size * 0.82 }} />
            <span className="pond-ring pond-ring--late" style={{ width: s.size * 1.4, height: s.size * 0.28, left: -s.size * 0.4, top: s.size * 0.82 }} />
            {/* the swan, bobbing */}
            <img src="/swan-mark.webp" alt="" className="pond-bob absolute bottom-0 left-0 h-full w-auto drop-shadow-[0_2px_6px_rgba(222,27,40,0.35)]" />
            {/* its reflection */}
            <img
              src="/swan-mark.webp"
              alt=""
              className="pond-bob absolute left-0 top-full h-full w-auto -scale-y-100 opacity-40 blur-[0.5px]"
              style={{ filter: 'url(#water-ripple)', WebkitMaskImage: 'linear-gradient(to top, black, transparent 85%)', maskImage: 'linear-gradient(to top, black, transparent 85%)' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
