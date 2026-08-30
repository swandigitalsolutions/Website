import { Building2, GraduationCap, UtensilsCrossed, ShoppingBag, Truck, Hotel } from 'lucide-react'

/**
 * "Trusted by" logo strip — a slow infinite marquee. These are the
 * mock client wordmarks from the Work section; swap `CLIENTS` for real
 * logos (drop SV/PNGs in `public/clients/` and render <img> instead).
 */
const CLIENTS = [
  { name: 'Lakeside Resort', icon: Hotel },
  { name: 'Vidya Public School', icon: GraduationCap },
  { name: 'Meridian Traders', icon: Building2 },
  { name: 'Spice Route Kitchen', icon: UtensilsCrossed },
  { name: 'Coastal Interiors', icon: ShoppingBag },
  { name: 'FleetTrack', icon: Truck },
]

export default function TrustedBy() {
  return (
    <section aria-label="Trusted by" className="relative border-y border-line bg-surface/40 py-8">
      <p className="text-center eyebrow text-mist mb-6">Trusted by teams across industries</p>

      <div className="marquee-mask relative overflow-hidden [--edge:56px] [-webkit-mask-image:linear-gradient(to_right,transparent,black_var(--edge),black_calc(100%-var(--edge)),transparent)] [mask-image:linear-gradient(to_right,transparent,black_var(--edge),black_calc(100%-var(--edge)),transparent)]">
        <div className="marquee-track marquee-track--slow flex w-max items-center gap-12 px-6">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div
              key={i}
              aria-hidden={i >= CLIENTS.length}
              className="flex items-center gap-2.5 text-mist/80 shrink-0 grayscale hover:grayscale-0 hover:text-white transition-all"
            >
              <c.icon size={22} className="text-red" />
              <span className="font-display text-lg font-medium whitespace-nowrap">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
