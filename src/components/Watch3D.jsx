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

// A 3D rugged sports smart-band (orange strap / black case), à la the team's
// reference wristband. Screen sits dark/off in this "ready" state.
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

    // ---- Lighting (neutral product-shot with warm rim) ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.65))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(4, 6, 8)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 0.6)
    fill.position.set(-6, -2, 5)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffdcb0, 1.0)
    rim.position.set(-3, 4, -6)
    scene.add(rim)
    const spec = new THREE.PointLight(0xffffff, 1.2, 24)
    spec.position.set(1.5, 2.5, 4)
    scene.add(spec)

    const watch = new THREE.Group()
    scene.add(watch)

    // ---- Materials ----
    const caseBlack = new THREE.MeshStandardMaterial({ color: 0x1c1c1f, metalness: 0.5, roughness: 0.42 })
    const rubber = new THREE.MeshStandardMaterial({ color: 0x141416, metalness: 0.2, roughness: 0.7 })
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, metalness: 0.25, roughness: 0.07 })
    const orange = new THREE.MeshStandardMaterial({ color: 0xf26a21, metalness: 0.2, roughness: 0.5 })
    const orangeSoft = new THREE.MeshStandardMaterial({ color: 0xef6a22, metalness: 0.1, roughness: 0.62 })
    const grey = new THREE.MeshStandardMaterial({ color: 0xc3c6c9, metalness: 0.35, roughness: 0.45 })

    // ---- Rugged case (black bumper) ----
    const bumper = new THREE.Mesh(extrude(roundedRect(3.35, 3.9, 0.55), 0.7), caseBlack)
    bumper.position.z = -0.05
    watch.add(bumper)

    // Corner guards — small protruding rugged tabs
    const guardGeo = extrude(roundedRect(0.72, 0.72, 0.22), 0.95, 0.08)
    ;[[-1.42, -1.72], [1.42, -1.72], [-1.42, 1.72], [1.42, 1.72]].forEach(([x, y]) => {
      const g = new THREE.Mesh(guardGeo, caseBlack)
      g.position.set(x, y, 0)
      watch.add(g)
    })

    // Inner body + glossy dark screen
    const body = new THREE.Mesh(extrude(roundedRect(2.75, 3.35, 0.7), 0.55), rubber)
    body.position.z = 0.18
    watch.add(body)

    const face = new THREE.Mesh(extrude(roundedRect(2.42, 3.0, 0.6), 0.08), screenMat)
    face.position.z = 0.44
    watch.add(face)

    // Faint screen reflection strip so the glass reads as glossy
    const glare = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 2.6),
      new THREE.MeshBasicMaterial({ color: 0x2a3340, transparent: true, opacity: 0.25 })
    )
    glare.position.set(-0.55, 0.15, 0.49)
    glare.rotation.z = 0.18
    watch.add(glare)

    // ---- Orange side crown + button ----
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.34, 24), orange)
    crown.rotation.z = Math.PI / 2
    crown.position.set(1.78, 0.42, 0.12)
    watch.add(crown)
    const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.42, 20), orange)
    btn.rotation.z = Math.PI / 2
    btn.position.set(1.76, -0.55, 0.12)
    watch.add(btn)

    // ---- Orange straps with grey reflective centre stripe ----
    const makeStrap = (y, rot, withHoles) => {
      const g = new THREE.Group()
      const strap = new THREE.Mesh(extrude(roundedRect(2.25, 2.3, 0.55), 0.34), orangeSoft)
      g.add(strap)
      // grey reflective stripe down the middle
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.48, 2.3, 0.05), grey)
      stripe.position.z = 0.22
      g.add(stripe)
      // strap holes on the far segment (like the reference lower band)
      if (withHoles) {
        for (let i = 0; i < 4; i++) {
          const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 16), caseBlack)
          hole.rotation.x = Math.PI / 2
          hole.position.set(0, -0.5 - i * 0.35, 0.18)
          g.add(hole)
        }
      }
      g.position.set(0, y, -0.15)
      g.rotation.x = rot
      return g
    }
    watch.add(makeStrap(2.85, 0.55, false))
    watch.add(makeStrap(-2.85, -0.55, true))

    watch.scale.setScalar(1.02)

    // ---- Interaction: gentle drag to rotate ----
    let targetY = -0.3
    let targetX = 0.08
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
      if (!dragging && !reduce) targetY = -0.3 + Math.sin(t * 0.5) * 0.35
      curY += (targetY - curY) * 0.08
      curX += (targetX - curX) * 0.08
      watch.rotation.y = curY
      watch.rotation.x = curX
      watch.position.y = reduce ? 0 : Math.sin(t * 1.1) * 0.12
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

  return <div ref={mountRef} style={{ width: '100%', height }} aria-label="3D rugged smart ski wristband" />
}
