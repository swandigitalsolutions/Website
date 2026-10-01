import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * A procedural, real-time 3D mute swan rendered into a transparent canvas.
 * Sculpted from deformed ellipsoids (body, layered wing feathers, tail),
 * a live tapered neck tube that is rebuilt every frame, and a head with
 * an orange beak, black knob and eyes. It breathes, bobs on the water,
 * blinks, follows the pointer and leans into the reel's spin. Its display
 * — rising proud and beating both articulated wings — reports the last
 * downstroke so the reel can be thrown back into motion.
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
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

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

const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

/**
 * Loft a closed tube along +z: `section(t)` returns { a, b, y } — the
 * half-width, half-height and vertical offset of the ellipse at t (0..1).
 */
function loft(length, section, segs = 48, radial = 28) {
  const pos = []
  const uv = []
  const index = []
  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const { a, b, y } = section(t)
    for (let j = 0; j <= radial; j++) {
      const th = (j / radial) * Math.PI * 2
      pos.push(Math.cos(th) * a, y + Math.sin(th) * b, t * length)
      uv.push(t, j / radial)
    }
  }
  for (let i = 0; i < segs; i++) {
    for (let j = 0; j < radial; j++) {
      const p = i * (radial + 1) + j
      const q = (i + 1) * (radial + 1) + j
      index.push(p, p + 1, q, q, p + 1, q + 1)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
  g.setIndex(index)
  g.computeVertexNormals()
  return g
}

/**
 * Mute swan head, modelled from reference: a long wedge-shaped head that
 * flows out of the neck, a black forehead knob, black facial skin in a
 * triangle from the bill base back to a small dark eye, and a long
 * orange-red bill with a black base, dark gape line, nostrils and a
 * hooked black nail. Forward is +z.
 */
function buildHead() {
  const head = new THREE.Group()
  const featherCol = new THREE.Color('#f4f0e7')
  const skinCol = new THREE.Color('#050505')

  // skull: deformed sphere tapering into the face, vertex-coloured facial skin
  const sg = new THREE.SphereGeometry(1, 160, 120) // dense enough to carry the facial skin
  const sp = sg.attributes.position
  const colors = []
  const v = new THREE.Vector3()
  for (let i = 0; i < sp.count; i++) {
    v.fromBufferAttribute(sp, i)
    let x = v.x * 0.112
    let y = v.y * 0.122
    const z = v.z * 0.25
    const front = Math.max(0, z / 0.25)
    x *= 1 - 0.42 * front // narrows toward the bill
    y *= 1 - 0.3 * front
    y -= 0.03 * front * front // forehead slopes down into the bill
    if (z < 0) y += 0.012 * (z / 0.25) // smooth join with the neck
    sp.setXYZ(i, x, y, z)

    // black lore skin: a triangle from the eye forward to the bill base
    const k = (z - 0.06) / 0.19 // 0 at the eye, 1 at the bill base
    const upper = 0.056 + k * 0.016
    const lower = 0.024 - k * 0.09
    const inBand = smooth(lower - 0.006, lower + 0.003, y) * (1 - smooth(upper - 0.003, upper + 0.006, y))
    const mask = smooth(0.05, 0.068, z) * inBand
    const c = featherCol.clone().lerp(skinCol, mask)
    colors.push(c.r, c.g, c.b)
  }
  sg.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  sg.computeVertexNormals()
  const skullMat = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.6,
    sheen: 0.45,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color('#ffffff'),
  })
  const skull = new THREE.Mesh(sg, skullMat)
  skull.position.set(0, 0.012, 0)
  skull.castShadow = true
  head.add(skull)

  // the bill: lofted, pitched down; black base → orange-red → black nail
  const L = 0.4
  const bg = loft(L, (t) => ({
    a: 0.056 * Math.pow(1 - t, 0.55) + 0.014,
    b: 0.046 * Math.pow(1 - t, 0.75) + 0.011,
    y: -0.035 * t * t + 0.008 * Math.sin(t * Math.PI), // slight droop, gentle culmen
  }))
  const buv = bg.attributes.uv
  const bcol = []
  const orange = new THREE.Color('#ef5a2c')
  const tipPink = new THREE.Color('#e4574a')
  const black = new THREE.Color('#141414')
  const gape = new THREE.Color('#6d2316')
  for (let i = 0; i < buv.count; i++) {
    const t = buv.getX(i)
    const th = buv.getY(i) * Math.PI * 2
    const c = orange.clone().lerp(tipPink, smooth(0.5, 0.9, t))
    c.lerp(black, 1 - smooth(0.02, 0.06, t)) // facial skin runs onto the base
    c.lerp(black, smooth(0.9, 0.95, t)) // the nail
    const side = Math.abs(Math.cos(th))
    const sn = Math.sin(th)
    const gapeLine = (1 - smooth(0.04, 0.12, Math.abs(sn + 0.28))) * smooth(0.6, 0.9, side) * (1 - smooth(0.82, 0.92, t))
    c.lerp(gape, gapeLine * 0.85)
    bcol.push(c.r, c.g, c.b)
  }
  bg.setAttribute('color', new THREE.Float32BufferAttribute(bcol, 3))
  const billMat = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.25 })
  const bill = new THREE.Mesh(bg, billMat)
  bill.position.set(0, -0.008, 0.19)
  bill.rotation.x = 0.26 // the bill angles down from the forehead line
  bill.castShadow = true
  head.add(bill)

  const blackMat = new THREE.MeshPhysicalMaterial({ color: '#141414', roughness: 0.35, clearcoat: 0.5 })

  const nail = ellipsoid(blackMat, 0.016, 0.013, 0.024, 18)
  nail.position.set(0, -0.022, L - 0.006)
  nail.rotation.x = 0.35
  bill.add(nail)

  for (const sx of [-1, 1]) {
    const n = ellipsoid(blackMat, 0.005, 0.006, 0.022, 10)
    n.position.set(sx * 0.03, 0.02, 0.16)
    bill.add(n)
  }

  // the knob on the forehead at the bill base
  const knob = ellipsoid(blackMat, 0.042, 0.034, 0.064, 32)
  knob.position.set(0, 0.036, 0.205)
  knob.rotation.x = 0.1
  head.add(knob)

  // small dark eyes at the back of the facial skin
  const eyeMat = new THREE.MeshPhysicalMaterial({ color: '#1b0f0b', roughness: 0.08, clearcoat: 1 })
  const eyes = []
  for (const sx of [-1, 1]) {
    const eye = ellipsoid(eyeMat, 0.014, 0.014, 0.012, 16)
    eye.position.set(sx * 0.087, 0.04, 0.066)
    head.add(eye)
    eyes.push(eye)
  }
  head.userData.eyes = eyes
  head.userData.beakTip = new THREE.Vector3(0, -0.008 - Math.sin(0.26) * L - 0.03, 0.19 + Math.cos(0.26) * L)
  return head
}

/** A single flight feather: a thin vane from its base at the origin out along -x. */
function featherMesh(material, len, width) {
  const g = new THREE.SphereGeometry(1, 20, 10)
  g.scale(len / 2, 0.009, width)
  g.translate(-len / 2, 0, 0)
  const m = new THREE.Mesh(g, material)
  m.castShadow = true
  return m
}

/**
 * Articulated spreading wing (right side; mirror with scale.z = -1).
 * Chain: shoulder → elbow → wrist, each carrying its feather tract —
 * coverts on the arm, secondaries on the forearm, fanned primaries on
 * the hand. Posed with setWing(u, flap).
 */
function buildSpreadWing(material, shadeMat) {
  const root = new THREE.Group()
  const shoulder = new THREE.Group()
  shoulder.rotation.order = 'YXZ'
  root.add(shoulder)

  const LA = 0.4
  const LF = 0.55
  const LH = 0.45
  const tracts = []

  for (let i = 0; i < 5; i++) {
    const f = featherMesh(material, 0.34 - i * 0.02, 0.1)
    f.position.set(0, 0.012, 0.04 + i * 0.08)
    f.rotation.y = 0.05 * i
    shoulder.add(f)
    tracts.push(f)
  }
  const elbow = new THREE.Group()
  elbow.position.z = LA
  shoulder.add(elbow)
  for (let i = 0; i < 10; i++) {
    const f = featherMesh(material, 0.56 + (i % 2) * 0.03, 0.09)
    f.position.set(0, -0.004 * (i % 2), 0.02 + i * 0.056)
    f.rotation.y = 0.012 * i
    elbow.add(f)
    tracts.push(f)
    if (i % 2 === 0) {
      const cov = featherMesh(material, 0.3, 0.085)
      cov.position.set(0.02, 0.014, 0.03 + i * 0.056)
      cov.rotation.y = 0.012 * i
      elbow.add(cov)
      tracts.push(cov)
    }
  }
  const wrist = new THREE.Group()
  wrist.position.z = LF
  elbow.add(wrist)
  for (let i = 0; i < 9; i++) {
    const k = i / 8
    const f = featherMesh(shadeMat, 0.56 + k * 0.26, 0.08)
    f.position.set(0, -0.003 * (i % 2), 0.02 + k * LH)
    f.rotation.y = 0.12 + k * 1.15 // fan from trailing back to pointing out
    wrist.add(f)
    tracts.push(f)
  }
  root.userData = { shoulder, elbow, wrist, tracts }
  return root
}

/** u: 0 tucked under the folded coverts → 1 fully spread; flap: -1 up … 1 down. */
function setWing(wing, u, flap) {
  const { shoulder, elbow, wrist, tracts } = wing.userData
  shoulder.rotation.y = lerp(-1.35, -0.12, u)
  // raised high over the back like a displaying mute swan; beats sweep down from there
  shoulder.rotation.x = lerp(0.12, -1.05, u) + flap * 0.55 * u
  elbow.rotation.y = lerp(1.1, 0.02, u) - flap * 0.08 * u
  wrist.rotation.y = lerp(-1.5, -0.1, u) + flap * 0.12 * u
  wrist.rotation.x = flap * 0.18 * u // the hand lags through the stroke
  const grow = smooth(0, 0.45, u)
  tracts.forEach((f) => f.scale.setScalar(Math.max(0.001, grow)))
  wing.visible = u > 0.01
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

  // full wings that unfold from under the coverts for the display
  const wingMat = feather.clone()
  wingMat.side = THREE.DoubleSide
  const wingShade = shade.clone()
  wingShade.side = THREE.DoubleSide
  const spread = [-1, 1].map((side) => {
    const w = buildSpreadWing(wingMat, wingShade)
    w.position.set(0.12, 0.66, side * 0.34)
    w.scale.z = side
    setWing(w, 0, 0)
    bodyGroup.add(w)
    return w
  })

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
    display: null, // { t, onGust, beats, prevFlap, gusted }
    unfold: 0,
    flap: 0,
    proud: 0,
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

    // wing display: rise proud, unfold both wings, three full beats (the
    // last downstroke throws the gust that sets the reel turning), fold away
    let unfold = 0
    let flap = 0
    if (s.display) {
      const d = s.display
      d.t += dt
      const t = d.t
      const OPEN = 0.8
      const BEATS_END = 2.9
      const CLOSE = 3.7
      if (t < OPEN) unfold = easeInOut(t / OPEN)
      else if (t < BEATS_END) unfold = 1
      else unfold = 1 - easeInOut(Math.min(1, (t - BEATS_END) / (CLOSE - BEATS_END)))

      const start = OPEN * 0.55
      if (t > start && t < BEATS_END + 0.2) {
        const ph = ((t - start) / (BEATS_END - start)) * 3
        const warped = ph + 0.13 * Math.sin(ph * Math.PI * 2) // quicker downstroke
        const env = Math.min(1, (t - start) / 0.3) * Math.min(1, (BEATS_END + 0.2 - t) / 0.35)
        flap = -Math.cos(warped * Math.PI * 2) * env
      }
      // bottom of each downstroke: spray on the water, and the gust on the last
      if (d.prevFlap < 0.85 && flap >= 0.85) {
        d.beats++
        spread.forEach((w) => {
          w.userData.wrist.getWorldPosition(beakWorld)
          spawnRipple(beakWorld.x, beakWorld.z, { from: 0.1, to: 1.2, dur: 1.3, peak: 0.5 })
        })
        spawnRipple(0, 0.1, { from: 0.9, to: 2.4, dur: 1.6, peak: 0.4 })
        if (d.beats >= 3 && !d.gusted) {
          d.gusted = true
          d.onGust?.()
        }
      }
      d.prevFlap = flap
      if (t >= CLOSE) {
        if (!d.gusted) d.onGust?.()
        s.display = null
        s.ruffle = 1 // settle the feathers
      }
    }
    s.unfold = unfold
    s.flap = flap
    s.proud = damp(s.proud, s.display ? 1 : 0, 3.5, dt)
    // neck draws back and up into the proud display posture
    s.reach = damp(s.reach, -0.28 * s.proud, 6, dt)
    // turn broadside to show the spread wings, then swing back
    root.rotation.y = -0.9 + 0.62 * easeInOut(Math.min(1, s.proud))

    // head turns toward the pointer, and leans into the reel's spin
    const spinLook = THREE.MathUtils.clamp(-s.spin / 120, -0.6, 0.6)
    const idleSway = Math.sin(s.t * 0.7) * 0.12 + Math.sin(s.t * 1.9) * 0.03
    const yawGoal = s.display ? 0 : s.yawTarget + spinLook + idleSway
    s.yaw = damp(s.yaw, yawGoal, 4, dt)
    s.lookY = damp(s.lookY, s.display ? 0.25 : s.lookYTarget, 4, dt)
    s.lean = damp(s.lean, THREE.MathUtils.clamp(-s.spin / 400, -0.08, 0.08), 3, dt)

    // body: breathing, bobbing and a forward rock on the strike
    const strike = Math.max(0, s.reach)
    const lift = s.proud * 0.07 + Math.max(0, s.flap) * 0.05 * s.unfold
    bodyGroup.position.y = Math.sin(s.t * 1.15) * 0.025 - strike * 0.03 + lift
    bodyGroup.rotation.z = Math.sin(s.t * 0.9) * 0.015 - strike * 0.07 + s.proud * 0.1
    bodyGroup.rotation.x = Math.sin(s.t * 0.75) * 0.012 + s.lean
    body.scale.y = 1 + Math.sin(s.t * 1.6) * 0.014

    // wings: idle feather drift + ruffle burst after a display or now and then
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
      w.rotation.z = -s.ruffle * 0.05 - s.unfold * 0.12
      w.rotation.x += side * s.unfold * 0.38
      w.userData.primaries.forEach((f, k) => {
        f.rotation.y = Math.sin(s.t * 2.1 + k * 0.6) * 0.02 + shiver * 0.6
      })
    })

    spread.forEach((w) => setWing(w, s.unfold, s.flap))

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
      b.visible = a.visible
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

  const api = {
    resize,
    setActive,
    floorFraction,
    /** Spread and beat both wings; `onGust` fires on the last downstroke. */
    display(onGust) {
      if (reducedMotion || state.display) return false
      state.display = { t: 0, onGust, beats: 0, prevFlap: 0, gusted: false }
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
  // dev-only: step the simulation deterministically (stripped from builds)
  if (import.meta.env.DEV) {
    api.debugStep = (seconds, fps = 60) => {
      for (let i = 0; i < Math.round(seconds * fps); i++) pose(1 / fps)
      renderer.render(scene, camera)
    }
  }
  return api
}
