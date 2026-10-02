import { motion } from 'framer-motion'
import SplitText from './SplitText'
import SectionEyebrow from './SectionEyebrow'
import {
  ArrowRight, Globe, UtensilsCrossed, GraduationCap, BarChart3,
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
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=640&h=320&q=70',
  },
  {
    icon: UtensilsCrossed,
    title: 'Hotel & Restaurant Websites',
    desc: 'Booking-ready sites with menus, galleries and reservations built for hospitality.',
    accent: 'from-[#F43F5E] to-[#F59E0B]',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=640&h=320&q=70',
  },
  {
    icon: GraduationCap,
    title: 'School Management Systems',
    desc: 'End-to-end platforms for admissions, attendance, fees and communication.',
    accent: 'from-[#8B5CF6] to-[#4F46E5]',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=640&h=320&q=70',
  },
  {
    icon: BarChart3,
    title: 'Business Management Software',
    desc: 'Custom internal tools that streamline operations, inventory and reporting.',
    accent: 'from-[#10B981] to-[#0D9488]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&h=320&q=70',
  },
  {
    icon: TrendingUp,
    title: 'Business Analysis & Growth',
    desc: 'Review business goals, workflows and opportunities, then shape practical steps for sustainable growth.',
    accent: 'from-[#F97316] to-[#DC2626]',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=640&h=320&q=70',
  },
  {
    icon: Code2,
    title: 'Custom Web Applications',
    desc: 'Tailored web apps engineered around your exact workflow, not a template.',
    accent: 'from-[#D946EF] to-[#7C3AED]',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=640&h=320&q=70',
  },
  {
    icon: Settings,
    title: 'Website Maintenance',
    desc: 'Ongoing updates, security patches and performance monitoring, handled for you.',
    accent: 'from-[#F59E0B] to-[#EF4444]',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&h=320&q=70',
  },
  {
    icon: Bot,
    title: 'AI Solutions & Automation',
    desc: 'Practical AI features and automations that save your team real hours.',
    accent: 'from-[#22D3EE] to-[#2563EB]',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=640&h=320&q=70',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing Support',
    desc: 'SEO, content and campaign support that brings the right traffic to your site.',
    accent: 'from-[#EC4899] to-[#E11D48]',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=640&h=320&q=70',
  },
]

export default function Services() {
  return (
    <section id="services" className="sheet sheet-alt py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>Our Services</SectionEyebrow>
            <SplitText
              className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
              segments={['Everything your business needs,', { text: 'built in-house.', className: 'text-gradient' }]}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-sm text-sm sm:text-base text-mist leading-relaxed"
          >
            {SERVICES.length} services, one team — from first website to full business software.
          </motion.p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, index) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="spotlight group relative h-full rounded-2xl border border-line bg-surface overflow-hidden shadow-card hover:shadow-lift transition-shadow duration-500"
              >
                {/* photo banner with brand-colour wash */}
                <div className={`relative h-40 bg-gradient-to-br ${s.accent} overflow-hidden`}>
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={320}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.18]"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} mix-blend-multiply opacity-55 transition-opacity duration-500 group-hover:opacity-35`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/5 to-transparent" />
                  <div className="absolute left-5 bottom-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/25 border border-white/40 backdrop-blur-md shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <s.icon size={22} className="text-plainwhite" />
                  </div>
                  <span className="absolute right-4 top-4 font-mono text-[11px] text-plainwhite bg-black/25 backdrop-blur px-2 py-0.5 rounded-md">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative p-6">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-mist leading-relaxed">{s.desc}</p>
                  <a href="#contact" className="relative z-40 mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-red">
                    Discuss this
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red-gradient group-hover:w-full transition-all duration-700 ease-out" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
