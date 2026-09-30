import { CLIENTS } from '../data/projects'

export default function TrustedBy() {
  return (
    <section aria-label="Featured client projects" className="relative border-y border-line bg-surface/40 py-8">
      <p className="eyebrow mb-6 text-center text-mist">Selected projects across industries</p>
      <div className="marquee-mask relative overflow-hidden [--edge:56px] [-webkit-mask-image:linear-gradient(to_right,transparent,black_var(--edge),black_calc(100%-var(--edge)),transparent)] [mask-image:linear-gradient(to_right,transparent,black_var(--edge),black_calc(100%-var(--edge)),transparent)]">
        <div className="marquee-track marquee-track--slow flex w-max items-center gap-10 px-6 sm:gap-12">
          {[...CLIENTS, ...CLIENTS].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              aria-hidden={index >= CLIENTS.length}
              className="flex shrink-0 items-center gap-2.5 text-mist/80 transition-colors hover:text-white"
            >
              <client.icon size={21} className="text-red" />
              <span className="whitespace-nowrap font-display text-base font-medium sm:text-lg">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
