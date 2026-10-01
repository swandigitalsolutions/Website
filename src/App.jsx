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
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import ScrollProgress from './components/ScrollProgress'
import Intro from './components/Intro'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import MoonSky from './components/MoonSky'
import PagePuller from './components/PagePuller'

// Each section choreographs its own entrance (split headings, staggered
// cards, scroll-linked rails), so they are no longer wrapped in <Reveal>.
export default function App() {
  return (
    <div className="text-fg font-body min-h-screen">
      <MoonSky />
      <Intro />
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
        <CTA />
        <Contact />
      </main>
      <Footer />
      <PagePuller />
      <ChatWidget />
    </div>
  )
}
