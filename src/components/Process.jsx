const STEPS = [
  { n: '01', title: 'Discover', desc: 'We learn your business, goals and audience before a single pixel is designed.' },
  { n: '02', title: 'Design', desc: 'A premium, on-brand interface — reviewed with you until it feels exactly right.' },
  { n: '03', title: 'Develop', desc: 'Clean, fast, secure code built on modern frameworks and best practice.' },
  { n: '04', title: 'Deliver', desc: 'Launch, then ongoing maintenance and support so things keep running smoothly.' },
]

export default function Process() {
  return (
    <section id="process" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="eyebrow text-red mb-4">How We Work</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            A clear path from idea to launch.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-line" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative">
              <div className="w-16 h-16 rounded-2xl bg-surface border border-line flex items-center justify-center font-display text-red font-semibold relative z-10">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
