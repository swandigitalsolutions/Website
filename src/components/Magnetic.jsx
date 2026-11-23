/**
 * Layout wrapper. The pointer-following "magnetic" effect was removed: it read
 * layout and ran springs on every mouse move, so buttons felt delayed.
 * `strength` is accepted and ignored so existing call sites stay unchanged.
 */
export default function Magnetic({ children, className = '' }) {
  return <div className={`inline-flex ${className}`}>{children}</div>
}
