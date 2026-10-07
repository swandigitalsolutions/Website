// Decides once per page load whether the brand intro plays, so the hero
// can hold its entrance animation until the curtain has lifted.
let decision = null

export const INTRO_MS = 1300

// The brand curtain used to hold every device on a "Loading experience…"
// screen for over a second before any content painted. Removed so the page
// renders straight away everywhere; this always returns false but keeps its
// shape so Intro.jsx (now permanently inert) and callers need no changes.
export function shouldPlayIntro() {
  return (decision = false)
}

// Seconds the hero should wait before its entrance choreography starts.
export function heroDelay() {
  return 0.15
}
