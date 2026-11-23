
import { ArrowRight } from 'lucide-react'
import SwanMark from './SwanMark'
import BrowserMockup from './BrowserMockup'
import Tilt from './Tilt'
import CountUp from './CountUp'
import SplitText from './SplitText'
import Magnetic from './Magnetic'
import { heroDelay } from '../lib/intro'
import { PROJECTS } from '../data/projects'

const D = heroDelay()

// hero entrance runs in CSS (`.hero-in` in index.css) so it starts with the
// first paint — `--d` is each element's delay in seconds
const delay = (i) => ({ '--d': `${(D + i * 0.08).toFixed(2)}s` })

const BADGE_TEXT = 'SWAN DIGITAL SOLUTIONS · INNOVATE · BUILD · GROW · '

export default function Hero() {
  // No scroll-linked parallax here: when the page is pre-rendered there is
  // no scroll position, so it baked the hero text into the HTML fully faded
  // out (opacity 0) until JavaScript loaded — the main cause of a slow LCP.

  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* animated aurora + grid backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora absolute -inset-x-24 -top-40 h-[820px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      </div>
      <div className="absolute inset-0 noise-grid pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-center relative">
        <div>
          <div
            style={delay(0)}
            className="hero-in eyebrow inline-flex items-center gap-2.5 rounded-2xl border border-red/20 bg-white/90 px-3.5 py-2 text-red mb-6 sm:mb-7 shadow-card !tracking-[0.12em] !text-[0.66rem] leading-relaxed"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
            </span>
            Websites &middot; Business Software &middot; AI &middot; Business Analysis &amp; Growth
          </div>

          <SplitText
            as="h1"
            onMount
            delay={D + 0.1}
            stagger={0.07}
            className="font-display text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-7xl sm:leading-[1.04] font-semibold tracking-tight"
            segments={[
              'Software company',
              '\n',
              'in Devanahalli,',
              '\n',
              { text: 'Bengaluru.', className: 'text-gradient-live' },
            ]}
          />

          <p
            style={delay(4)}
            className="hero-in mt-7 text-base sm:text-lg text-mist max-w-lg leading-relaxed"
          >
            Swan Digital Solutions is a software and website development company
            in Devanahalli, Bengaluru (Bangalore), building custom software, ERP,
            school management systems, AI solutions and business websites.
          </p>

          <div
            style={delay(5)}
            className="hero-in mt-9 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                className="btn-shine group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-red text-plainwhite font-medium shadow-glow hover:bg-red-soft transition-colors"
              >
                Start your project
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#services"
                className="w-full inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-line bg-white/90 text-white/90 font-medium hover:border-red/50 hover:text-white hover:shadow-card transition-all"
              >
                Explore services
              </a>
            </Magnetic>
          </div>

          <div
            style={delay(6)}
            className="hero-in mt-11 sm:mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8 text-sm text-mist"
          >
            <div>
              <CountUp end={PROJECTS.length} className="font-display text-2xl text-white font-semibold" />
              <div>featured projects</div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div>
              <div className="font-display text-2xl text-white font-semibold">AI</div>
              <div>tile visualizer</div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div>
              <div className="font-display text-2xl text-white font-semibold">Web + ERP</div>
              <div>websites &amp; software</div>
            </div>
          </div>
        </div>

        <div style={delay(3)} className="hero-in relative flex items-center justify-center">
          <div className="relative w-full flex items-center justify-center">
            <div className="absolute w-[300px] sm:w-[460px] h-[300px] sm:h-[460px] bg-radial-glow rounded-full" />
            <SwanMark
              className="absolute -z-0 inset-0 m-auto w-40 h-64 opacity-20 pointer-events-none"
              strokeWidth={3}
            />

            {/* rotating brand badge */}
            <div style={delay(8)} className="hero-pop absolute -top-14 -left-2 sm:-left-8 z-20 hidden sm:block">
              <div className="relative h-28 w-28 rounded-full bg-white/95 border border-line shadow-card">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="fill-fg" style={{ fontSize: 6.2, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
                    <textPath href="#badge-circle" textLength="230" lengthAdjust="spacing">{BADGE_TEXT}</textPath>
                  </text>
                </svg>
                <img src="/swan-mark.webp" alt="" className="absolute inset-0 m-auto h-10 w-auto" />
              </div>
            </div>

            <Tilt className="relative z-10 w-full max-w-md" max={9}>
              <BrowserMockup />
            </Tilt>
          </div>
        </div>
      </div>

    </section>
  )
}
