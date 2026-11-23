/**
 * Scrolling is left to the browser on purpose.
 *
 * Native scrolling runs on the compositor thread, so it stays perfectly
 * smooth even while JavaScript or rendering is busy. A JS smooth-scroll
 * library (Lenis, used here before) moves the page from the main thread
 * instead, so any main-thread work shows up as scroll stutter — and its
 * inertia reads as input lag.
 *
 * Anchor links (#section) still glide: `scroll-behavior: smooth` and the
 * `scroll-margin-top` offset for the fixed navbar live in index.css.
 */
export default function SmoothScroll() {
  return null
}
