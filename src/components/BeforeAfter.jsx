import { useRef, useState, useCallback } from 'react'
import { MoveHorizontal } from 'lucide-react'
import SiteMock from './SiteMock'

/**
 * Drag-to-compare slider showing a dated template (left) vs a modern
 * rebuild (right). Both sides are real rendered pages (see SiteMock) —
 * swap them for screenshots of an actual project when you have one.
 * Pointer-down anywhere starts the compare; arrow keys nudge the handle.
 */
export default function BeforeAfter() {
  const wrap = useRef(null)
  const [pos, setPos] = useState(52)
  const dragging = useRef(false)

  const move = useCallback((clientX) => {
    const r = wrap.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)))
  }, [])

  const pointX = (e) => (e.touches ? e.touches[0].clientX : e.clientX)
  const start = (e) => { dragging.current = true; move(pointX(e)) }
  const drag = (e) => { if (dragging.current) move(pointX(e)) }
  const end = () => { dragging.current = false }
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(2, p - 4))
    if (e.key === 'ArrowRight') setPos((p) => Math.min(98, p + 4))
  }

  return (
    <div
      ref={wrap}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-line bg-surface2 select-none touch-none cursor-ew-resize shadow-card"
      onMouseDown={start}
      onMouseMove={drag}
      onMouseUp={end}
      onMouseLeave={end}
      onTouchStart={start}
      onTouchMove={drag}
      onTouchEnd={end}
    >
      {/* after — full size */}
      <SiteMock variant="after" />
      <span className="absolute top-3 right-3 z-20 eyebrow text-[10px] px-2 py-1 rounded-md bg-ink/80 border border-line text-white/90">
        After · Swan rebuild
      </span>

      {/* before — revealed from the left via clip-path */}
      <div className="absolute inset-0 z-10" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="absolute inset-0" style={{ filter: 'grayscale(0.2) contrast(0.96)' }}>
          <SiteMock variant="before" />
        </div>
        <span className="absolute top-3 left-3 eyebrow text-[10px] px-2 py-1 rounded-md bg-ink/80 border border-line text-white/90">
          Before
        </span>
      </div>

      {/* handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKey}
        className="absolute top-0 bottom-0 -ml-5 w-10 z-20 flex items-center justify-center outline-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-0 bottom-0 w-0.5 bg-red" />
        <div className="relative w-10 h-10 rounded-full bg-red text-plainwhite shadow-glow flex items-center justify-center">
          <MoveHorizontal size={18} />
        </div>
      </div>
    </div>
  )
}
