// Decides once per page load whether the brand intro plays, so the hero
// can hold its entrance animation until the curtain has lifted.
let decision = null

export const INTRO_MS = 2100

export function shouldPlayIntro() {
  if (decision !== null) return decision
  if (typeof window === 'undefined') return (decision = false)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let seen = false
  try {
    seen = sessionStorage.getItem('sds_intro_seen') === '1'
  } catch {
    seen = false
  }
  decision = !reduce && !seen
  return decision
}

// Seconds the hero should wait before its entrance choreography starts.
export function heroDelay() {
  return shouldPlayIntro() ? INTRO_MS / 1000 - 0.25 : 0.15
}
