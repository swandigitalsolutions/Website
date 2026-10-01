import { motion } from 'framer-motion'
import {
  Globe, UtensilsCrossed, GraduationCap, BarChart3,
  Code2, Settings, Bot, Megaphone, TrendingUp,
} from 'lucide-react'

/**
 * `image` — a relevant photo shown as the card banner. These point to
 * Unsplash CDN URLs so they work out of the box; swap any of them for a
 * local file (drop it in `public/services/` and use "/services/name.jpg").
 * If an image fails to load, the `accent` gradient shows instead.
 */
const SERVICES = [
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'Fast, modern websites built to represent your brand and convert visitors into customers.',
    accent: 'from-[#3B82F6] to-[#0EA5E9]',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: UtensilsCrossed,
    title: 'Hotel & Restaurant Websites',
    desc: 'Booking-ready sites with menus, galleries and reservations built for hospitality.',
    accent: 'from-[#F43F5E] to-[#F59E0B]',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: GraduationCap,
    title: 'School Management Systems',
    desc: 'End-to-end platforms for admissions, attendance, fees and communication.',
    accent: 'from-[#8B5CF6] to-[#4F46E5]',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: BarChart3,
    title: 'Business Management Software',
    desc: 'Custom internal tools that streamline operations, inventory and reporting.',
    accent: 'from-[#10B981] to-[#0D9488]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: TrendingUp,
    title: 'Business Analysis & Growth',
    desc: 'Review business goals, workflows and opportunities, then shape practical steps for sustainable growth.',
    accent: 'from-[#F97316] to-[#DC2626]',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Code2,
    title: 'Custom Web Applications',
    desc: 'Tailored web apps engineered around your exact workflow, not a template.',
    accent: 'from-[#D946EF] to-[#7C3AED]',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Settings,
    title: 'Website Maintenance',
    desc: 'Ongoing updates, security patches and performance monitoring, handled for you.',
    accent: 'from-[#F59E0B] to-[#EF4444]',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Bot,
    title: 'AI Solutions & Automation',
    desc: 'Practical AI features and automations that save your team real hours.',
    accent: 'from-[#22D3EE] to-[#2563EB]',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing Support',
    desc: 'SEO, content and campaign support that brings the right traffic to your site.',
    accent: 'from-[#EC4899] to-[#E11D48]',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-red mb-4">Our Services</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Everything your business needs, <span className="text-gradient">built in-house.</span>
          </h2>
        </div>

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -8, scale: 1.035, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
              className="card-glare group relative rounded-2xl border border-line bg-surface overflow-hidden hover:border-red/50 hover:shadow-glow transition-[border-color,box-shadow] duration-300 cursor-pointer"
            >
              {/* photo banner with brand-colour wash */}
              <div className={`relative h-32 bg-gradient-to-br ${s.accent} overflow-hidden`}>
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} mix-blend-multiply opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                <div className="absolute left-5 bottom-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <s.icon size={22} className="text-white" />
                </div>
              </div>

              <div className="relative p-6">
                <h3 className="font-display text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{s.desc}</p>
              </div>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-gradient group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
