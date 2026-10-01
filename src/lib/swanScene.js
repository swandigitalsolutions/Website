import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * A procedural, real-time 3D mute swan rendered into a transparent canvas.
 * Sculpted from deformed ellipsoids (body, layered wing feathers, tail),
 * a live tapered neck tube that is rebuilt every frame, and a head with
 * an orange beak, black knob and eyes. It breathes, bobs on the water,
 * blinks, follows the pointer, leans into the reel's spin and performs a
 * peck whose contact moment is reported back so the reel can advance.
 *
 * Model space: the swan faces +x, y is up, the waterline is y = 0.
 */

const FEATHER = '#f7f5f1'
const FEATHER_SHADE = '#ebe8e2'
const BEAK = '#e8692a'
const BLACK = '#121212'

const UP = new THREE.Vector3(0, 1, 0)
const ZERO = new THREE.Vector3()

const lerp = (a, b, t) => a + (b - a) * t
const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt))
const easeOutBack = (t) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2)

// neck centreline keyframes in the swan's side plane (x forward, y up)
const NECK_REST = [[0.7, 0.42], [1.02, 0.86], [0.78, 1.42], [0.92, 1.98], [1.18, 2.12]]
const NECK_STRIKE = [[0.7, 0.42], [1.15, 0.8], [1.38, 1.22], [1.74, 1.4], [2.02, 1.24]]
const NECK_BACK = [[0.7, 0.42], [0.96, 0.9], [0.66, 1.46], [0.76, 2.04], [0.98, 2.2]]

function ellipsoid(material, sx, sy, sz, segments = 40) {
  const g = new THREE.SphereGeometry(1, segments, Math.round(segments * 0.75))
  g.scale(sx, sy, sz)
  const m = new THREE.Mesh(g, material)
  m.castShadow = true
  return m
}

function buildBody(material) {
  const g = new THREE.SphereGeometry(1, 72, 54)
  const p = g.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i)
    let { x, y, z } = v
    x *= 1.18
    y *= 0.52
    z *= 0.64
    if (x < -0.35) {
      const k = -x - 0.35
      y += k * k * 0.85 // upturned tail
      z *= 1 - k * 0.45
    }
    if (x > 0.55) y += (x - 0.55) * 0.18 // full, lifted breast
    if (y < 0) y *= 0.7 // flatter keel under the waterline
    p.setXYZ(i, x, y, z)
  }
  g.computeVertexNormals()
  const m = new THREE.Mesh(g, material)
  m.castShadow = true
  return m
}

function buildWing(side, cover, primary) {
  const wing = new THREE.Group()
  const covert = ellipsoid(cover, 0.86, 0.22, 0.3)
  covert.rotation.set(side * 0.24, 0, -0.2)
  wing.add(covert)

  // secondary covert row
  for (let k = 0; k < 4; k++) {
    const f = ellipsoid(cover, 0.42, 0.05, 0.13, 24)
    f.position.set(-0.25 - k * 0.12, 0.1 + k * 0.03, side * (0.08 + k * 0.01))
    f.rotation.set(side * (0.32 + k * 0.03), 0, -0.25 - k * 0.04)
    wing.add(f)
  }
  // fanned primaries, raised like a swan's busking posture
  const primaries = []
  for (let k = 0; k < 6; k++) {
    const f = ellipsoid(primary, 0.52 - k * 0.03, 0.035, 0.11, 24)
    f.position.set(-0.56 - k * 0.07, 0.14 + k * 0.05, side * (0.02 + k * 0.015))
    f.rotation.set(side * (0.3 + k * 0.04), 0, -0.36 - k * 0.06)
    wing.add(f)
    primaries.push(f)
  }
  wing.position.set(-0.1, 0.58, side * 0.37)
  wing.userData.primaries = primaries
  return wing
}

function buildHead(feather) {
  const head = new THREE.Group()
  const skull = ellipsoid(feather, 0.12, 0.13, 0.2)
  skull.position.set(0, 0.02, 0.04)
  head.add(skull)

  const beakMat = new THREE.MeshPhysicalMaterial({ color: BEAK, roughness: 0.38, clearcoat: 0.5, clearcoatRoughness: 0.3 })
  const blackMat = new THREE.MeshPhysicalMaterial({ color: BLACK, roughness: 0.3, clearcoat: 0.6 })

  const beakGeo = new THREE.CylinderGeometry(0.016, 0.068, 0.34, 24, 4)
  beakGeo.rotateX(Math.PI / 2)
  beakGeo.scale(0.85, 0.7, 1)
  const beak = new THREE.Mesh(beakGeo, beakMat)
  beak.position.set(0, -0.025, 0.34)
  beak.rotation.x = 0.12
  beak.castShadow = true
  head.add(beak)

  const nail = ellipsoid(blackMat, 0.02, 0.016, 0.03, 16)
  nail.position.set(0, -0.045, 0.505)
  head.add(nail)

  const knob = ellipsoid(blackMat, 0.045, 0.055, 0.05, 20)
  knob.position.set(0, 0.04, 0.2)
  head.add(knob)

  const mask = ellipsoid(blackMat, 0.085, 0.06, 0.06, 20)
  mask.position.set(0, -0.005, 0.18)
  head.add(mask)

  const eyes = []
  for (const s of [-1, 1]) {
    const eye = ellipsoid(blackMat, 0.022, 0.022, 0.022, 16)
    eye.position.set(s * 0.093, 0.045, 0.13)
    head.add(eye)
    eyes.push(eye)
  }
  head.userData.eyes = eyes
  head.userData.beakTip = new THREE.Vector3(0, -0.05, 0.52)
  return head
}

/** Tube with a varying radius whose vertices are rewritten per frame. */
class NeckTube {
  constructor(material, segments = 64, radial = 20) {
    this.segments = segments
    this.radial = radial
    const count = (segments + 1) * (radial + 1)
    this.positions = new Float32Array(count * 3)
    this.normals = new Float32Array(count * 3)
    const index = []
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < radial; j++) {
        const a = i * (radial + 1) + j
        const b = (i + 1) * (radial + 1) + j
        index.push(a, a + 1, b, b, a + 1, b + 1) // outward-facing winding
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    g.setAttribute('normal', new THREE.BufferAttribute(this.normals, 3))
    g.setIndex(index)
    this.geometry = g
    this.mesh = new THREE.Mesh(g, material)
    this.mesh.castShadow = true
    this.mesh.frustumCulled = false
    this.curve = new THREE.CatmullRomCurve3([0, 1, 2, 3, 4].map(() => new THREE.Vector3()), false, 'centripetal')
    this._p = new THREE.Vector3()
    this._t = new THREE.Vector3()
    this._n = new THREE.Vector3()
  }

  radiusAt(u) {
    const base = lerp(0.25, 0.105, Math.pow(u, 0.8))
    return base + 0.05 * Math.exp(-Math.pow((u - 0.06) / 0.1, 2))
  }

  /** points: Vector3[5]; planeNormal: unit normal of the neck's plane */
  update(points, planeNormal) {
    points.forEach((pt, i) => this.curve.points[i].copy(pt))
    const { segments, radial, positions, normals } = this
    for (let i = 0; i <= segments; i++) {
      const u = i / segments
      this.curve.getPointAt(u, this._p)
      this.curve.getTangentAt(u, this._t)
      // in-plane normal: no Frenet flipping at the S-curve's inflection
      this._n.crossVectors(planeNormal, this._t).normalize()
      const r = this.radiusAt(u)
      for (let j = 0; j <= radial; j++) {
        const a = (j / radial) * Math.PI * 2
        const c = Math.cos(a)
        const s = Math.sin(a)
        const nx = c * this._n.x + s * planeNormal.x
        const ny = c * this._n.y + s * planeNormal.y
        const nz = c * this._n.z + s * planeNormal.z
        const k = (i * (radial + 1) + j) * 3
        positions[k] = this._p.x + nx * r
        positions[k + 1] = this._p.y + ny * r
        positions[k + 2] = this._p.z + nz * r
        normals[k] = nx
        normals[k + 1] = ny
        normals[k + 2] = nz
      }
    }
    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.normal.needsUpdate = true
  }
}

function waterTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(214, 224, 240, 0.85)')
  g.addColorStop(0.45, 'rgba(226, 233, 245, 0.5)')
  g.addColorStop(0.85, 'rgba(240, 244, 250, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function createSwanScene(canvas, { reducedMotion = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 0.55

  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 60)
  camera.position.set(0, 2.25, 10.5)
  camera.lookAt(0, 1.0, 0)

  // lighting: soft sky, warm key with shadows, brand-red rim from behind
  scene.add(new THREE.HemisphereLight('#ffffff', '#c9d2e3', 0.75))
  const key = new THREE.DirectionalLight('#fff6ec', 2.4)
  key.position.set(3.5, 6.5, 4.5)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.left = -3
  key.shadow.camera.right = 3
  key.shadow.camera.top = 3
  key.shadow.camera.bottom = -3
  key.shadow.radius = 6
  key.shadow.bias = -0.0005
  scene.add(key)
  const rim = new THREE.DirectionalLight('#ff6b73', 0.55)
  rim.position.set(-4, 3, -5)
  scene.add(rim)
  const fill = new THREE.DirectionalLight('#dfe8ff', 0.5)
  fill.position.set(-5, 2, 4)
  scene.add(fill)

  // materials
  const feather = new THREE.MeshPhysicalMaterial({
    color: FEATHER,
    roughness: 0.62,
    sheen: 1,
    sheenRoughness: 0.45,
    sheenColor: new THREE.Color('#ffffff'),
    clearcoat: 0.12,
    clearcoatRoughness: 0.6,
  })
  const shade = feather.clone()
  shade.color = new THREE.Color(FEATHER_SHADE)

  // the swan
  const root = new THREE.Group()
  root.rotation.y = -0.9
  scene.add(root)

  const bodyGroup = new THREE.Group()
  root.add(bodyGroup)
  const body = buildBody(feather)
  body.position.y = 0.32
  bodyGroup.add(body)

  const tail = ellipsoid(shade, 0.36, 0.11, 0.22)
  tail.position.set(-1.18, 0.66, 0)
  tail.rotation.z = 0.55
  bodyGroup.add(tail)

  const wings = [buildWing(-1, feather, shade), buildWing(1, feather, shade)]
  wings.forEach((w) => bodyGroup.add(w))

  const neck = new NeckTube(feather)
  bodyGroup.add(neck.mesh)
  const head = buildHead(feather)
  bodyGroup.add(head)

  // water, shadow catcher and ripple pool
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(3, 72),
    new THREE.MeshBasicMaterial({ map: waterTexture(), transparent: true, depthWrite: false }),
  )
  water.rotation.x = -Math.PI / 2
  water.renderOrder = 1
  scene.add(water)

  const shadowCatcher = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), new THREE.ShadowMaterial({ opacity: 0.16 }))
  shadowCatcher.rotation.x = -Math.PI / 2
  shadowCatcher.position.y = 0.003
  shadowCatcher.receiveShadow = true
  shadowCatcher.renderOrder = 2
  scene.add(shadowCatcher)

  const ringGeo = new THREE.RingGeometry(0.965, 1, 96)
  ringGeo.rotateX(-Math.PI / 2)
  const ripples = Array.from({ length: 10 }, () => {
    const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: '#8f9bb3', transparent: true, opacity: 0, depthWrite: false }))
    m.position.y = 0.006
    m.visible = false
    m.renderOrder = 3
    m.userData = { life: 0, dur: 1, from: 1, to: 2, peak: 0.3 }
    scene.add(m)
    return m
  })
  const spawnRipple = (x, z, { from = 1.1, to = 3.2, dur = 3, peak = 0.32, color = '#8f9bb3' } = {}) => {
    const r = ripples.find((m) => !m.visible) || ripples[0]
    r.position.x = x
    r.position.z = z
    r.material.color.set(color)
    Object.assign(r.userData, { life: 0, dur, from, to, peak })
    r.visible = true
  }

  // mirrored reflection: a clone whose transforms are synced each frame
  const reflection = root.clone(true)
  reflection.scale.y = -1
  const pairs = []
  const origNodes = []
  root.traverse((o) => origNodes.push(o))
  let n = 0
  reflection.traverse((o) => {
    pairs.push([origNodes[n++], o])
    if (o.isMesh) {
      o.material = o.material.clone()
      o.material.transparent = true
      o.material.opacity = 0.2
      o.material.depthWrite = false
      o.material.side = THREE.DoubleSide
      o.castShadow = false
    }
  })
  // the neck clone must share the live geometry
  pairs.forEach(([a, b]) => { if (a === neck.mesh) b.geometry = neck.geometry })
  reflection.renderOrder = 0
  scene.add(reflection)

  // ---------- behaviour state ----------
  const state = {
    t: 0,
    reach: 0,
    yaw: 0,
    yawTarget: 0,
    lookY: 0,
    lookYTarget: 0,
    spin: 0,
    peck: null, // { t, onContact, fired }
    blink: 0,
    nextBlink: 2.5,
    nextIdleRipple: 0.5,
    ruffle: 0,
    nextRuffle: 6,
    lean: 0,
  }

  const pts = [0, 1, 2, 3, 4].map(() => new THREE.Vector3())
  const planeN = new THREE.Vector3()
  const tmpT = new THREE.Vector3()
  const headDir = new THREE.Vector3()
  const m4 = new THREE.Matrix4()
  const beakWorld = new THREE.Vector3()

  function pose(dt) {
    const s = state
    s.t += dt

    // peck timeline: anticipate → strike → contact → spring back
    let reachTarget = 0
    if (s.peck) {
      s.peck.t += dt / 0.95
      const p = s.peck.t
      if (p < 0.18) reachTarget = -0.28 * Math.sin((p / 0.18) * Math.PI * 0.5)
      else if (p < 0.42) reachTarget = lerp(-0.28, 1, easeOutBack((p - 0.18) / 0.24))
      else reachTarget = lerp(1, 0, Math.min(1, (p - 0.42) / 0.58))
      if (!s.peck.fired && p >= 0.42) {
        s.peck.fired = true
        head.updateWorldMatrix(true, false)
        beakWorld.copy(head.userData.beakTip).applyMatrix4(head.matrixWorld)
        spawnRipple(beakWorld.x, beakWorld.z, { from: 0.08, to: 1.5, dur: 1.4, peak: 0.55, color: '#de1b28' })
        spawnRipple(beakWorld.x, beakWorld.z, { from: 0.04, to: 0.9, dur: 1.1, peak: 0.4, color: '#de1b28' })
        s.ruffle = 1
        s.peck.onContact?.()
      }
      if (p >= 1) s.peck = null
      s.reach = reachTarget // the timeline is already eased
    } else {
      s.reach = damp(s.reach, 0, 6, dt)
    }

    // head turns toward the pointer, and leans into the reel's spin
    const spinLook = THREE.MathUtils.clamp(-s.spin / 120, -0.6, 0.6)
    const idleSway = Math.sin(s.t * 0.7) * 0.12 + Math.sin(s.t * 1.9) * 0.03
    const yawGoal = s.peck ? 0 : s.yawTarget + spinLook + idleSway
    s.yaw = damp(s.yaw, yawGoal, 4, dt)
    s.lookY = damp(s.lookY, s.peck ? 0 : s.lookYTarget, 4, dt)
    s.lean = damp(s.lean, THREE.MathUtils.clamp(-s.spin / 400, -0.08, 0.08), 3, dt)

    // body: breathing, bobbing and a forward rock on the strike
    const strike = Math.max(0, s.reach)
    bodyGroup.position.y = Math.sin(s.t * 1.15) * 0.025 - strike * 0.03
    bodyGroup.rotation.z = Math.sin(s.t * 0.9) * 0.015 - strike * 0.07
    bodyGroup.rotation.x = Math.sin(s.t * 0.75) * 0.012 + s.lean
    body.scale.y = 1 + Math.sin(s.t * 1.6) * 0.014

    // wings: idle feather drift + ruffle burst after a peck or now and then
    s.nextRuffle -= dt
    if (s.nextRuffle <= 0) {
      s.ruffle = 0.7
      s.nextRuffle = 7 + Math.random() * 6
    }
    s.ruffle = damp(s.ruffle, 0, 2.2, dt)
    wings.forEach((w, i) => {
      const side = i === 0 ? -1 : 1
      const shiver = Math.sin(s.t * 38 + i) * 0.03 * s.ruffle
      w.rotation.x = side * (Math.sin(s.t * 1.3 + i) * 0.015 + s.ruffle * 0.12 + shiver)
      w.rotation.z = -s.ruffle * 0.05
      w.userData.primaries.forEach((f, k) => {
        f.rotation.y = Math.sin(s.t * 2.1 + k * 0.6) * 0.02 + shiver * 0.6
      })
    })

    // neck: blend keyframes, lift for vertical look, rotate about its base
    const r = s.reach
    for (let i = 0; i < 5; i++) {
      const rest = NECK_REST[i]
      const other = r >= 0 ? NECK_STRIKE[i] : NECK_BACK[i]
      const k = r >= 0 ? r : Math.min(1, -r / 0.28)
      let x = lerp(rest[0], other[0], k)
      let y = lerp(rest[1], other[1], k)
      const w = i / 4
      y += s.lookY * 0.18 * w
      x += Math.sin(s.t * 1.1) * 0.015 * w
      const bx = NECK_REST[0][0]
      const dx = x - bx
      const yaw = s.yaw * w
      pts[i].set(bx + dx * Math.cos(yaw), y, -dx * Math.sin(yaw))
    }
    planeN.set(Math.sin(s.yaw * 0.6), 0, Math.cos(s.yaw * 0.6)).normalize()
    neck.update(pts, planeN)

    // head sits at the neck tip and points along it, pitched down to strike
    head.position.copy(neck.curve.getPointAt(1, tmpT))
    neck.curve.getTangentAt(1, tmpT)
    headDir.copy(tmpT)
    headDir.y += -0.32 - strike * 0.12 + s.lookY * 0.3
    headDir.x += strike * 0.6 // thrust the beak forward into the card
    headDir.normalize()
    m4.lookAt(headDir, ZERO, UP)
    head.quaternion.setFromRotationMatrix(m4)
    head.rotateZ(Math.sin(s.t * 0.5) * 0.08) // curious head tilt

    // blinking
    s.nextBlink -= dt
    if (s.nextBlink <= 0) {
      s.blink = 1
      s.nextBlink = 2.5 + Math.random() * 3
    }
    s.blink = Math.max(0, s.blink - dt * 8)
    const lid = 1 - Math.sin(s.blink * Math.PI) * 0.9
    head.userData.eyes.forEach((e) => { e.scale.y = lid })

    // ambient ripples from the body
    s.nextIdleRipple -= dt
    if (s.nextIdleRipple <= 0) {
      spawnRipple(0, 0.1, { from: 1.25, to: 2.7, dur: 3.4, peak: 0.28 })
      s.nextIdleRipple = 1.7
    }
    ripples.forEach((m) => {
      if (!m.visible) return
      const u = m.userData
      u.life += dt / u.dur
      if (u.life >= 1) { m.visible = false; return }
      const sc = lerp(u.from, u.to, 1 - Math.pow(1 - u.life, 2))
      m.scale.set(sc, 1, sc * 0.98)
      m.material.opacity = u.peak * Math.sin(Math.min(1, u.life * 4) * Math.PI * 0.5) * (1 - u.life)
    })

    // keep the reflection in lockstep
    for (const [a, b] of pairs) {
      if (a === root) continue
      b.position.copy(a.position)
      b.quaternion.copy(a.quaternion)
      b.scale.copy(a.scale)
    }
  }

  // ---------- sizing / loop ----------
  let width = 1
  let height = 1
  function resize(w, h) {
    width = Math.max(1, Math.round(w))
    height = Math.max(1, Math.round(h))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  let raf = 0
  let running = false
  let last = 0
  const frame = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
    last = now
    pose(dt)
    renderer.render(scene, camera)
    if (running) raf = requestAnimationFrame(frame)
  }

  function setActive(on) {
    if (reducedMotion) {
      pose(0.016)
      renderer.render(scene, camera)
      return
    }
    if (on && !running) {
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    } else if (!on && running) {
      running = false
      cancelAnimationFrame(raf)
    }
  }

  /** Fraction (0 top → 1 bottom) of the canvas height where the water's centre sits. */
  function floorFraction() {
    const v = new THREE.Vector3(0, 0, 0).project(camera)
    return (1 - v.y) / 2
  }

  return {
    resize,
    setActive,
    floorFraction,
    peck(onContact) {
      if (reducedMotion || state.peck) return false
      state.peck = { t: 0, onContact, fired: false }
      return true
    },
    setSpin(v) {
      state.spin = v
    },
    look(x, y) {
      state.yawTarget = THREE.MathUtils.clamp(-x * 0.7, -0.7, 0.7)
      state.lookYTarget = THREE.MathUtils.clamp(-y, -1, 1)
    },
    dispose() {
      setActive(false)
      renderer.dispose()
      pmrem.dispose()
      scene.traverse((o) => {
        if (o.isMesh) {
          o.geometry.dispose()
          o.material.map?.dispose()
          o.material.dispose()
        }
      })
    },
  }
}
