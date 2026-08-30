import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/**
 * Portfolio showcase — mock projects. Swap `image` with a real
 * screenshot (drop it in `public/work/` and use "/work/name.jpg")
 * and update the copy. If an image fails to load, a branded gradient
 * with the category label shows instead.
 */
const PROJECTS = [
  {
    title: 'Lakeside Resort',
    category: 'Hotel Website',
    desc: 'Booking-ready site with room galleries, live availability and a reservations flow.',
    tags: ['Website', 'Booking', 'Hospitality'],
    accent: 'from-[#FF4B54] to-[#8C0F16]',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Vidya Public School',
    category: 'School Management System',
    desc: 'Admissions, attendance, fee collection and parent messaging in one dashboard.',
    tags: ['Web App', 'ERP', 'Education'],
    accent: 'from-[#3B82F6] to-[#1E3A8A]',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Meridian Traders',
    category: 'Business Management Software',
    desc: 'Inventory, invoicing and reporting tool built around their warehouse workflow.',
    tags: ['Software', 'Inventory', 'Dashboard'],
    accent: 'from-[#10B981] to-[#065F46]',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Coastal Interiors',
    category: 'Business Website + SEO',
    desc: 'Fast marketing site with a project portfolio and lead capture, tuned for search.',
    tags: ['Website', 'SEO', 'Marketing'],
    accent: 'from-[#F59E0B] to-[#92400E]',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Spice Route Kitchen',
    category: 'Restaurant Website',
    desc: 'Digital menu, photo gallery and table-reservation requests for a busy restaurant.',
    tags: ['Website', 'Menu', 'Reservations'],
    accent: 'from-[#EF4444] to-[#7F1D1D]',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'FleetTrack',
    category: 'Custom Web Application',
    desc: 'Real-time vehicle and job tracking portal with role-based access for dispatchers.',
    tags: ['Web App', 'Realtime', 'Logistics'],
    accent: 'from-[#8B5CF6] to-[#4C1D95]',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Works() {
  return (
    <section id="work" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="eyebrow text-red mb-4">Our Work</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            A look at what we&rsquo;ve <span className="text-gradient">shipped.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROJECTS.map((p) => (
            <motion.article
              key={p.title}
              whileHover={{ y: -8, scale: 1.025 }}
              className="group relative rounded-2xl border border-line bg-surface overflow-hidden shadow-card hover:border-red/50 hover:shadow-glow transition-[border-color,box-shadow] duration-300 cursor-pointer"
            >
              <div className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${p.accent}`}>
                <div className="absolute inset-0 noise-grid opacity-20" />
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/10 to-transparent" />
                <span className="absolute bottom-3 left-4 eyebrow text-white/90 drop-shadow">
                  {p.category}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <span className="shrink-0 w-9 h-9 rounded-full border border-line flex items-center justify-center text-mist group-hover:text-white group-hover:border-red/50 group-hover:bg-red/10 transition-colors">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <p className="mt-3 text-sm text-mist leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-surface2 border border-line text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
