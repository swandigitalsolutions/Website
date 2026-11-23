/**
 * Thin bar at the top of the page that fills as you scroll. It is driven by
 * the browser's scroll timeline (see `.scroll-progress` in index.css), so it
 * uses no JavaScript and cannot delay scrolling.
 */
export default function ScrollProgress() {
  return <div aria-hidden="true" className="scroll-progress fixed top-0 left-0 right-0 z-[55] h-[3px] origin-left bg-red-gradient" />
}
