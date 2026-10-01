import { accentColors } from '../data/projects'

/**
 * Monogram badge for a client project, cut from the project's own accent
 * colours: glossy squircle, inner bevel and a small industry glyph. Used
 * where an official logo file isn't available.
 */
export default function ProjectMark({ project, size = 40, className = '' }) {
  const [from, to] = accentColors(project)
  const Icon = project.icon
  const letters = project.mark.length

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden font-display font-bold text-plainwhite ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: `linear-gradient(140deg, ${from} 0%, ${to} 100%)`,
        boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.35), inset 0 -2px 6px rgb(0 0 0 / 0.25), 0 6px 16px -6px ${from}`,
        fontSize: size * (letters > 2 ? 0.3 : 0.38),
        letterSpacing: '-0.02em',
      }}
    >
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      <span className="relative">{project.mark}</span>
      <Icon
        className="absolute opacity-60"
        style={{ width: size * 0.26, height: size * 0.26, right: size * 0.08, bottom: size * 0.08 }}
        strokeWidth={2.4}
      />
    </span>
  )
}
