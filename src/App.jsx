import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandBanner from './components/BrandBanner'
import ProjectOrbit from './components/ProjectOrbit'
import Services from './components/Services'
import Works from './components/Works'
import AIStudio from './components/AIStudio'
import WhyChooseUs from './components/WhyChooseUs'
import Process from './components/Process'
import Team from './components/Team'
import Internships from './components/Internships'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import SkyBackdrop from './components/SkyBackdrop'

const ChatWidget = lazy(() => import('./components/ChatWidget'))

// Each section choreographs its own entrance (split headings, staggered
// cards, scroll-linked rails), so they are no longer wrapped in <Reveal>.
export default function App() {
  const [chatReady, setChatReady] = useState(false)
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
    const id = idle(() => setChatReady(true), { timeout: 3000 })
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [])

  return (
    <div className="text-fg font-body min-h-screen">
      <SkyBackdrop />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <BrandBanner />
        <ProjectOrbit />
        <Services />
        <Works />
        <AIStudio />
        <WhyChooseUs />
        <Process />
        <Team />
        <Internships />
        <CTA />
        <Contact />
      </main>
      <Footer />
      {chatReady && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </div>
  )
}
