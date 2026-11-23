/** Section label: a short red rule followed by the mono eyebrow text. */
export default function SectionEyebrow({ children, className = '', icon: Icon }) {
  return (
    <p className={`eyebrow mb-4 flex items-center gap-3 text-red ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-red" />
      <span className="inline-flex items-center gap-2">
        {Icon && <Icon size={14} />}
        {children}
      </span>
    </p>
  )
}
