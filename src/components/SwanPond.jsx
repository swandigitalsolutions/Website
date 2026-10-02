/**
 * Water for the footer wordmark: a deep, lit surface whose rippling
 * reflection of "SWAN DIGITAL" wobbles like real water (SVG turbulence
 * displacement), drifting light glints, and full-bodied brand swans
 * swimming across at different depths — each bobbing, breathing its wing,
 * swaying its neck (some dip their heads to the water), trailing a V-shaped
 * wake from the chest and mirrored in the water.
 */
import SwanSilhouette from './SwanSilhouette'

const ASPECT = 115 / 85 // swan drawing width / height
const WATERLINE = 80 / 85 // where the body meets the water in the drawing

// nearer swans are larger, lower on the water, brighter and quicker;
// `d` is how far below the far shore their waterline sits
const SWANS = [
  { size: 34, d: 24, dur: 74, delay: -12, o: 0.6, rest: '62vw', dips: false },
  { size: 48, d: 52, dur: 56, delay: -38, o: 0.85, rest: '22vw', dips: true },
  { size: 66, d: 92, dur: 44, delay: -5, o: 1, rest: '44vw', dips: false },
  { size: 40, d: 36, dur: 66, delay: -50, o: 0.75, rest: '80vw', dips: true },
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
    <div aria-hidden="true" className="pond relative left-1/2 w-[100vw] -translate-x-1/2 h-[150px] sm:h-[190px] [overflow-x:clip] [overflow-y:visible]">
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
      {SWANS.map((s, i) => {
        const H = s.size
        const W = H * ASPECT
        return (
          <div
            key={i}
            className={`pond-swimmer absolute left-0 ${s.dips ? 'ss-dips' : ''}`}
            style={{ top: s.d - H * WATERLINE, opacity: s.o, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s`, '--rest': s.rest }}
          >
            <div className="relative" style={{ width: W, height: H }}>
              {/* V-shaped wake spreading back from the chest */}
              <svg
                className="pond-wake absolute"
                style={{ width: W * 3.2, height: H * 0.5, left: W * 0.8 - W * 3.2, top: H * WATERLINE - H * 0.05 }}
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id={`wake-${i}`} x1="1" x2="0" y1="0" y2="0">
                    <stop offset="0" stopColor="white" stopOpacity="0.6" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M100 2 L0 0" stroke={`url(#wake-${i})`} strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
                <path d="M100 2.5 L0 20" stroke={`url(#wake-${i})`} strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
              </svg>
              {/* rings spreading from the body */}
              <span className="pond-ring" style={{ width: W * 1.1, height: W * 0.2, left: W * -0.1, top: H * WATERLINE - W * 0.1 }} />
              <span className="pond-ring pond-ring--late" style={{ width: W * 1.1, height: W * 0.2, left: W * -0.1, top: H * WATERLINE - W * 0.1 }} />
              {/* the swan, bobbing */}
              <div className="pond-bob absolute inset-0">
                <SwanSilhouette className="h-full w-full drop-shadow-[0_3px_8px_rgba(222,27,40,0.35)]" />
              </div>
              {/* its reflection, starting at the waterline */}
              <div
                className="pond-bob pond-bob--reflect absolute left-0"
                style={{
                  top: H * (WATERLINE * 2 - 1),
                  width: W * 1.45, // room for the head when the neck stretches forward
                  height: H,
                  opacity: 0.38,
                  filter: 'url(#water-ripple) blur(0.4px)',
                  WebkitMaskImage: 'linear-gradient(to top, black, transparent 80%)',
                  maskImage: 'linear-gradient(to top, black, transparent 80%)',
                }}
              >
                <SwanSilhouette style={{ width: W, height: H }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
