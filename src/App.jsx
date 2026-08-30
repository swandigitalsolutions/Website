import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import Works from './components/Works'
import AIStudio from './components/AIStudio'
import WhyChooseUs from './components/WhyChooseUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Reveal from './components/Reveal'
import ScrollProgress from './components/ScrollProgress'
import Intro from './components/Intro'
import SmoothScroll from './components/SmoothScroll'

export default function App() {
  return (
    <div className="bg-ink text-fg font-body min-h-screen">
      <Intro />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Reveal><Services /></Reveal>
        <Reveal><Works /></Reveal>
        <Reveal><AIStudio /></Reveal>
        <Reveal><WhyChooseUs /></Reveal>
        <Reveal><Process /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><CTA /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
