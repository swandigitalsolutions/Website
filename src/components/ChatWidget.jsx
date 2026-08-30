import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Mic, Volume2, VolumeX } from 'lucide-react'
import { getAnswer } from '../lib/knowledge'

const GREETING =
  "Hi! I'm the Swan Digital assistant, trained on this website. Ask me about our services, process, pricing or how to get in touch — by text or voice."

// Browser speech APIs (Chrome / Edge / Safari). Undefined elsewhere.
const SpeechRecognition =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition)

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: GREETING }])
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [speak, setSpeak] = useState(true)

  const scrollRef = useRef(null)
  const recognitionRef = useRef(null)
  const speakRef = useRef(speak)
  speakRef.current = speak

  const voiceSupported = Boolean(SpeechRecognition)
  const ttsSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const say = (text) => {
    if (!ttsSupported || !speakRef.current) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 1.02
    u.pitch = 1
    window.speechSynthesis.speak(u)
  }

  const respond = (question) => {
    const answer = getAnswer(question)
    setMessages((m) => [...m, { from: 'bot', text: answer }])
    say(answer)
  }

  const send = (raw) => {
    const text = (raw ?? input).trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    // small delay so the reply feels conversational
    setTimeout(() => respond(text), 250)
  }

  // ----- Voice input -----
  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const startListening = () => {
    if (!voiceSupported) return
    if (listening) return stopListening()

    if (ttsSupported) window.speechSynthesis.cancel()

    const rec = new SpeechRecognition()
    rec.lang = 'en-IN'
    rec.interimResults = false
    rec.maxAlternatives = 1

    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      send(transcript)
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => setListening(false)

    recognitionRef.current = rec
    setListening(true)
    rec.start()
  }

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort?.()
      if (ttsSupported) window.speechSynthesis.cancel()
    }
  }, [ttsSupported])

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        className="fixed bottom-5 right-5 z-[60] w-[4.25rem] h-[4.25rem] rounded-full bg-red text-white shadow-glow flex items-center justify-center hover:bg-red-soft transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={30} />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={30} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-5 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[70vh] max-h-[560px] flex flex-col rounded-3xl border border-line bg-surface shadow-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-line bg-surface2">
              <div className="w-9 h-9 rounded-full bg-red/15 border border-red/40 flex items-center justify-center">
                <MessageCircle size={17} className="text-red" />
              </div>
              <div className="flex-1">
                <div className="font-display text-sm font-semibold leading-tight">Swan Assistant</div>
                <div className="text-[11px] text-mist">Trained on this website</div>
              </div>
              {ttsSupported && (
                <button
                  onClick={() => {
                    if (speak) window.speechSynthesis.cancel()
                    setSpeak((s) => !s)
                  }}
                  aria-label={speak ? 'Mute spoken replies' : 'Unmute spoken replies'}
                  className="text-mist hover:text-white transition-colors"
                >
                  {speak ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
              )}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-red text-white rounded-br-sm'
                        : 'bg-surface2 border border-line text-white/90 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {listening && (
                <div className="flex justify-end">
                  <div className="text-[11px] text-red eyebrow">Listening…</div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
              className="border-t border-line p-3 flex items-center gap-2 bg-surface2"
            >
              {voiceSupported && (
                <button
                  type="button"
                  onClick={startListening}
                  aria-label={listening ? 'Stop voice input' : 'Start voice input'}
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    listening
                      ? 'bg-red text-white animate-pulse'
                      : 'border border-line text-mist hover:text-white hover:border-red/50'
                  }`}
                >
                  <Mic size={18} />
                </button>
              )}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={voiceSupported ? 'Type or tap the mic…' : 'Ask a question…'}
                className="flex-1 rounded-full bg-surface border border-line px-4 py-2.5 text-sm text-white placeholder:text-mist/60 focus:border-red/50 outline-none transition-colors"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="shrink-0 w-10 h-10 rounded-full bg-red text-white flex items-center justify-center hover:bg-red-soft transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
