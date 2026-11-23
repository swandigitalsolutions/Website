import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'

const STEPS = [
  { n: '01', title: 'Discover', desc: 'We learn your business, goals and audience before a single pixel is designed.' },
  { n: '02', title: 'Design', desc: 'A premium, on-brand interface — reviewed with you until it feels exactly right.' },
  { n: '03', title: 'Develop', desc: 'Clean, fast, secure code built on modern frameworks and best practice.' },
  { n: '04', title: 'Deliver', desc: 'Launch, then ongoing maintenance and support so things keep running smoothly.' },
]

export default function Process() {
  return (
    <section id="process" className="sheet sheet-alt py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <SectionEyebrow>How We Work</SectionEyebrow>
          <SplitText
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            segments={['A clear path from', { text: 'idea to launch.', className: 'text-gradient' }]}
          />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-8 right-8 h-[2px] rounded-full bg-red-gradient" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative">
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-red bg-red font-display font-semibold text-plainwhite shadow-glow">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
