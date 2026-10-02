import { useId } from 'react'

/**
 * A full-bodied swan in the brand's glossy red, drawn side-on facing
 * right: upturned tail, raised feathered wing, S-curved neck, head with
 * an orange bill, black knob and eye. Parts are grouped so they can move
 * independently (`.ss-wing`, `.ss-neck`, `.ss-tail`). viewBox is 115×85
 * with the waterline at y = 80.
 */
export default function SwanSilhouette({ className = '', style }) {
  const id = useId().replace(/:/g, '')
  const body = `ssb-${id}`
  const wing = `ssw-${id}`
  const bill = `ssk-${id}`
  const gloss = `ssg-${id}`

  return (
    <svg viewBox="0 0 115 85" className={className} style={{ overflow: 'visible', ...style }} aria-hidden="true">
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5a62" />
          <stop offset="0.55" stopColor="#de1b28" />
          <stop offset="1" stopColor="#8c0f16" />
        </linearGradient>
        <linearGradient id={wing} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#ff8a90" />
          <stop offset="0.5" stopColor="#ef2f3a" />
          <stop offset="1" stopColor="#a5121b" />
        </linearGradient>
        <linearGradient id={bill} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff9a4a" />
          <stop offset="1" stopColor="#e8471f" />
        </linearGradient>
        <linearGradient id={gloss} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* tail, flicks now and then */}
      <g className="ss-tail" style={{ transformOrigin: '22px 62px' }}>
        <path d="M24 62 C19 59 14 55 11 49 C13 48.5 15 49 17 50 C22 53 27 55 31 57 Z" fill={`url(#${body})`} />
      </g>

      {/* body */}
      <path
        d="M14 66 C14 58 20 55 30 56 C44 58 58 58 70 60 C80 61 88 64 90 70 C91 76 86 80 76 81 L26 81 C18 80 14 74 14 66 Z"
        fill={`url(#${body})`}
      />
      <path d="M30 59 C46 61 62 61 76 63" stroke={`url(#${gloss})`} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />

      {/* neck and head, sway and occasionally dip to the water */}
      <g className="ss-neck" style={{ transformOrigin: '84px 64px' }}>
        <path
          d="M80 63 C87 53 85 45 81 37 C77 29 82 17 89 11 C94 7.5 99.5 10 100 13.5 L100.5 17 C99 19 95.5 20.5 93 19.5 C90.5 22 91 28 93 34 C97 44 98 56 90 70 Z"
          fill={`url(#${body})`}
        />
        <path d="M91 33 C95 41 96 50 92 60" stroke={`url(#${gloss})`} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.65" />
        {/* bill, knob, eye */}
        <path d="M99.5 13 L111.5 17.2 C110.5 19.2 104.5 19.4 100 18.2 Z" fill={`url(#${bill})`} />
        <circle cx="111" cy="17.4" r="0.9" fill="#1a0d0a" />
        <path d="M96.4 12.7 C97.8 12.3 99 12.4 100 12.9 L100.3 17.3 C99.2 17.3 98 16.8 97.2 16 Z" fill="#141414" />
        <ellipse cx="100.4" cy="12.5" rx="1.5" ry="1.15" fill="#141414" />
        <circle cx="95.6" cy="13.1" r="0.9" fill="#0b0b0b" />
        <circle cx="95.85" cy="12.85" r="0.28" fill="#ffffff" opacity="0.9" />
      </g>

      {/* raised wing with layered feathers, breathes gently */}
      <g className="ss-wing" style={{ transformOrigin: '34px 58px' }}>
        <path
          d="M28 61 C28 47 38 37 54 34 C66 32 75 37 79 45 C78 50 76 55 74 60 C71 60 69 61 67 63 C65 61 62 61 59 62 C56 61 53 61 50 62.5 C46 61 42 61 38 62 C35 61 31 61 28 61 Z"
          fill={`url(#${wing})`}
        />
        {/* feather rows */}
        <path d="M33 59 C35 50 42 43 52 40" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M44 60 C46 51 53 45 63 43" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M56 60 C58 53 64 48 73 47" stroke="#ffffff" strokeOpacity="0.24" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M67 61 C68 56 71 52 76 50" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M40 42 C47 38 56 36 66 37" stroke={`url(#${gloss})`} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
      </g>
    </svg>
  )
}
