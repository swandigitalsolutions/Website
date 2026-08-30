import Navbar from './components/Navbar'
import Hero from './components/Hero'
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

export default function App() {
  return (
    <div className="bg-ink text-white font-body min-h-screen">
      <Navbar />
      <main>
        <Hero />
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
