/**
 * Layout wrapper. The pointer-follow 3D tilt was removed: it ran spring
 * physics on every mouse move. `max` and `scale` are accepted and ignored so
 * existing call sites stay unchanged.
 */
export default function Tilt({ children, className = '' }) {
  return <div className={className}>{children}</div>
}
