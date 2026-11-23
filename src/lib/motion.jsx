// A very small stand-in for the parts of the motion library this site uses.
// State changes are animated with native CSS transitions, and values that
// change every frame (the project reel) are written straight to the element,
// so React never re-renders for them.
import { createElement, forwardRef, useEffect, useMemo, useRef, useState } from 'react'

const MOTION_PROPS = ['initial', 'animate', 'exit', 'transition', 'variants', 'custom', 'layout', 'layoutId', 'whileHover', 'whileTap', 'whileInView', 'viewport']
const TRANSFORM_KEYS = ['x', 'y', 'scale', 'scaleX', 'scaleY', 'rotate']
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const STATE_TRANSITION = `transform 300ms ${EASE}, opacity 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out`

class Value {
  constructor(value) {
    this.value = value
    this.listeners = new Set()
  }

  get() {
    return this.value
  }

  set(next) {
    if (next === this.value) return
    this.value = next
    this.listeners.forEach((fn) => fn(next))
  }

  on(fn) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
}

const read = (v) => {
  const value = v instanceof Value ? v.get() : v
  return Array.isArray(value) ? value[value.length - 1] : value
}
const unit = (v, suffix) => (typeof v === 'number' ? `${v}${suffix}` : v)

function transformOf(source) {
  const parts = []
  if (source.x !== undefined || source.y !== undefined) {
    parts.push(`translate3d(${unit(read(source.x) ?? 0, 'px')}, ${unit(read(source.y) ?? 0, 'px')}, 0)`)
  }
  if (source.scale !== undefined) parts.push(`scale(${read(source.scale)})`)
  if (source.scaleX !== undefined) parts.push(`scaleX(${read(source.scaleX)})`)
  if (source.scaleY !== undefined) parts.push(`scaleY(${read(source.scaleY)})`)
  if (source.rotate !== undefined) parts.push(`rotate(${unit(read(source.rotate), 'deg')})`)
  return parts.join(' ')
}

function toCss(source = {}) {
  const css = {}
  for (const [key, value] of Object.entries(source)) {
    if (!TRANSFORM_KEYS.includes(key)) css[key] = read(value)
  }
  const transform = transformOf(source)
  if (transform) css.transform = transform
  return css
}

function create(tag) {
  const Component = forwardRef(function MotionElement(props, forwardedRef) {
    const rest = { ...props }
    const target = typeof props.animate === 'object' ? props.animate : null
    MOTION_PROPS.forEach((key) => delete rest[key])
    const { style, ...domProps } = rest
    const local = useRef(null)
    const latest = useRef(style)
    latest.current = style

    useEffect(() => {
      const values = Object.values(latest.current || {}).filter((v) => v instanceof Value)
      if (!values.length) return undefined
      const write = () => {
        const el = local.current
        if (el) Object.assign(el.style, toCss(latest.current))
      }
      const stops = values.map((v) => v.on(write))
      return () => stops.forEach((stop) => stop())
    }, [])

    const setRef = (el) => {
      local.current = el
      if (typeof forwardedRef === 'function') forwardedRef(el)
      else if (forwardedRef) forwardedRef.current = el
    }
    const css = { ...toCss(style), ...toCss(target || {}) }
    if (target) css.transition = STATE_TRANSITION
    return createElement(tag, { ...domProps, ref: setRef, style: css })
  })
  Component.displayName = `motion.${tag}`
  return Component
}

const cache = {}
export const motion = new Proxy({}, { get: (_, tag) => (cache[tag] ||= create(tag)) })

export const AnimatePresence = ({ children }) => children

export function useMotionValue(initial) {
  const ref = useRef(null)
  if (!ref.current) ref.current = new Value(initial)
  return ref.current
}

export function useTransform(source, fn) {
  const latest = useRef(fn)
  latest.current = fn
  const derived = useMemo(() => new Value(fn(source.get())), [source]) // eslint-disable-line react-hooks/exhaustive-deps
  derived.value = fn(source.get())
  useEffect(() => source.on((v) => derived.set(latest.current(v))), [source, derived])
  return derived
}

export function useMotionValueEvent(value, _event, callback) {
  const latest = useRef(callback)
  latest.current = callback
  useEffect(() => value.on((v) => latest.current(v)), [value])
}

export function useAnimationFrame(callback) {
  const latest = useRef(callback)
  latest.current = callback
  useEffect(() => {
    let raf
    let last = performance.now()
    const tick = (now) => {
      latest.current(now, now - last)
      last = now
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
}

// Reads the scroll position at most once per frame.
export function useScroll() {
  const scrollY = useMotionValue(0)
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      scrollY.set(window.scrollY)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrollY])
  return { scrollY }
}

export function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref])
  return inView
}
