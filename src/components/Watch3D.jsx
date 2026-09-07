import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Rounded-rectangle shape helper (for the watch body, screen and straps).
function roundedRect(w, h, r) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

function extrude(shape, depth, bevel = 0.06) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 24,
  })
  g.center()
  return g
}

// A 3D smart-ski wristband/watch rendered with Three.js.
export default function Watch3D({ height = 260 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const width = mount.clientWidth
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0, 8.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    // ---- Lighting (cool alpine key + warm fill) ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0xffffff, 1.5)
    key.position.set(4, 6, 8)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x3b9ce0, 1.4)
    rim.position.set(-6, -2, 4)
    scene.add(rim)
    const glow = new THREE.PointLight(0x3b9ce0, 3, 20)
    glow.position.set(0, 0, 3)
    scene.add(glow)

    const watch = new THREE.Group()
    scene.add(watch)

    // ---- Materials ----
    const navy = new THREE.MeshStandardMaterial({ color: 0x0e2a47, metalness: 0.55, roughness: 0.35 })
    const bezel = new THREE.MeshStandardMaterial({ color: 0x12325a, metalness: 0.8, roughness: 0.25 })
    const screen = new THREE.MeshStandardMaterial({ color: 0x081a30, metalness: 0.3, roughness: 0.15 })
    const glacier = new THREE.MeshStandardMaterial({
      color: 0x3b9ce0,
      emissive: 0x3b9ce0,
      emissiveIntensity: 0.9,
      metalness: 0.4,
      roughness: 0.3,
    })
    const ice = new THREE.MeshStandardMaterial({ color: 0xbfe0f5, emissive: 0x9fd4f2, emissiveIntensity: 0.5 })

    // ---- Body ----
    const body = new THREE.Mesh(extrude(roundedRect(3.1, 3.6, 0.9), 0.55), navy)
    watch.add(body)

    // Bezel ring (metallic frame)
    const bezelMesh = new THREE.Mesh(extrude(roundedRect(2.7, 3.15, 0.8), 0.2), bezel)
    bezelMesh.position.z = 0.36
    watch.add(bezelMesh)

    // Screen face
    const face = new THREE.Mesh(extrude(roundedRect(2.35, 2.8, 0.7), 0.06), screen)
    face.position.z = 0.5
    watch.add(face)

    // ---- Clock: glowing ring + ticks + hands ("o'clock" dial) ----
    const dial = new THREE.Group()
    dial.position.z = 0.6
    watch.add(dial)

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.055, 20, 64), glacier)
    dial.add(ring)

    // hour ticks
    for (let i = 0; i < 12; i++) {
      const major = i % 3 === 0
      const tick = new THREE.Mesh(
        new THREE.BoxGeometry(major ? 0.09 : 0.05, major ? 0.22 : 0.13, 0.04),
        major ? glacier : ice,
      )
      const a = (i / 12) * Math.PI * 2
      const r = 0.78
      tick.position.set(Math.sin(a) * r, Math.cos(a) * r, 0.02)
      tick.rotation.z = -a
      dial.add(tick)
    }

    // hands
    const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.05), ice)
    hourHand.geometry.translate(0, 0.25, 0)
    hourHand.rotation.z = -Math.PI / 3
    dial.add(hourHand)

    const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.72, 0.05), glacier)
    minHand.geometry.translate(0, 0.36, 0)
    minHand.rotation.z = Math.PI / 5
    dial.add(minHand)

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 20), glacier)
    cap.rotation.x = Math.PI / 2
    cap.position.z = 0.05
    dial.add(cap)

    // Side crown button
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.3, 20), bezel)
    crown.rotation.z = Math.PI / 2
    crown.position.set(1.62, 0.3, 0.2)
    watch.add(crown)

    // ---- Straps ----
    const strapMat = new THREE.MeshStandardMaterial({ color: 0x0b2036, metalness: 0.3, roughness: 0.6 })
    const strapTop = new THREE.Mesh(extrude(roundedRect(2.2, 2.0, 0.5), 0.35), strapMat)
    strapTop.position.set(0, 2.55, -0.15)
    strapTop.rotation.x = 0.5
    watch.add(strapTop)
    const strapBot = new THREE.Mesh(extrude(roundedRect(2.2, 2.0, 0.5), 0.35), strapMat)
    strapBot.position.set(0, -2.55, -0.15)
    strapBot.rotation.x = -0.5
    watch.add(strapBot)

    watch.scale.setScalar(1.05)

    // ---- Interaction: gentle drag to rotate ----
    let targetY = -0.35
    let targetX = 0.1
    let curY = targetY
    let curX = targetX
    let dragging = false
    let lastX = 0
    let lastY = 0

    const onDown = (e) => {
      dragging = true
      lastX = e.clientX ?? e.touches?.[0]?.clientX
      lastY = e.clientY ?? e.touches?.[0]?.clientY
    }
    const onMove = (e) => {
      if (!dragging) return
      const cx = e.clientX ?? e.touches?.[0]?.clientX
      const cy = e.clientY ?? e.touches?.[0]?.clientY
      targetY += (cx - lastX) * 0.01
      targetX += (cy - lastY) * 0.01
      targetX = Math.max(-0.6, Math.min(0.6, targetX))
      lastX = cx
      lastY = cy
    }
    const onUp = () => (dragging = false)
    const el = renderer.domElement
    el.style.cursor = 'grab'
    el.style.touchAction = 'pan-y'
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    // ---- Animate ----
    let raf
    const clock = new THREE.Clock()
    const render = () => {
      const t = clock.getElapsedTime()
      if (!dragging && !reduce) targetY = -0.35 + Math.sin(t * 0.5) * 0.35
      curY += (targetY - curY) * 0.08
      curX += (targetX - curX) * 0.08
      watch.rotation.y = curY
      watch.rotation.x = curX
      watch.position.y = reduce ? 0 : Math.sin(t * 1.1) * 0.12
      ring.material.emissiveIntensity = 0.7 + Math.sin(t * 2) * 0.3
      renderer.render(scene, camera)
      raf = requestAnimationFrame(render)
    }
    render()

    // ---- Resize ----
    const onResize = () => {
      const w = mount.clientWidth
      camera.aspect = w / height
      camera.updateProjectionMatrix()
      renderer.setSize(w, height)
    }
    window.addEventListener('resize', onResize)

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      renderer.dispose()
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) o.material.dispose()
      })
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [height])

  return <div ref={mountRef} style={{ width: '100%', height }} aria-label="3D smart ski wristband" />
}
