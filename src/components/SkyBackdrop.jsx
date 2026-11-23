/**
 * A soft sky behind the whole site: dawn lavender → clear day blue →
 * golden afternoon → a periwinkle dusk as you move down the page.
 *
 * The gradient is painted once along the full height of the document
 * (see `body` in index.css) and simply scrolls with the content. The
 * earlier version stacked four fixed full-screen layers and cross-faded
 * them on every scroll frame, which made the GPU blend the whole screen
 * several times per frame — the single biggest cost while scrolling.
 */
export default function SkyBackdrop() {
  return null
}
