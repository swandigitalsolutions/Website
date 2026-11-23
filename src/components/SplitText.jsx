/**
 * Section heading. `segments` is a list of strings or { text, className }
 * objects; use '\n' as a segment to force a line break. With `onMount`
 * (above the fold) each word rises in with a CSS animation that starts at
 * first paint. Other headings are plain text, so they never wait on anything.
 */
export default function SplitText({
  as: Tag = 'h2',
  segments,
  className = '',
  delay = 0,
  stagger = 0.06,
  onMount = false,
}) {
  let index = 0

  return (
    <Tag className={className}>
      {segments.map((seg, si) => {
        if (seg === '\n') return <br key={`br-${si}`} />
        const text = typeof seg === 'string' ? seg : seg.text
        const cls = typeof seg === 'string' ? '' : seg.className || ''
        return text
          .split(' ')
          .filter(Boolean)
          .map((word, wi) => {
            const i = index++
            return [
              i > 0 ? ' ' : null,
              onMount ? (
                <span key={`${si}-${wi}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                  <span className={`word-rise ${cls}`} style={{ '--d': `${delay + i * stagger}s` }}>
                    {word}
                  </span>
                </span>
              ) : (
                <span key={`${si}-${wi}`} className={`inline-block ${cls}`}>
                  {word}
                </span>
              ),
            ]
          })
      })}
    </Tag>
  )
}
