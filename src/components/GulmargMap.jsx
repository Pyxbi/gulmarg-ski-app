import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TriangleAlert, Plus, Minus } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Real Gulmarg ski area via Leaflet + Esri satellite tiles (no API key needed).
// You = green marker (no name). A red hazard marker appears only after ~10s.

// A slightly westward view keeps the snow field and the Gulmarg label visible together.
const GULMARG = [34.0387, 74.3750]
const YOU = [34.0335, 74.3670]
const TOP_LEFT_GREEN_MARKER = [34.0367, 74.3610]
const WHITE_SLOPE_GREEN_MARKERS = [
  [34.0350, 74.3635],
  [34.0320, 74.3700],
  [34.0295, 74.3650],
  TOP_LEFT_GREEN_MARKER,
  [34.0305, 74.3680],
]
const WHITE_SLOPE_RED_HAZARDS = [
  [34.0330, 74.3615],
  [34.0290, 74.3720],
]

// A CSS-animated coloured dot rendered as a Leaflet divIcon.
const gpsIcon = (tone) =>
  L.divIcon({
    className: '',
    html: `<div style="position:relative"><span class="gps-ring ${tone}"></span><span class="gps-dot ${tone}"></span></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })

export default function GulmargMap() {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const hazardMarker = useRef(null)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: GULMARG,
      zoom: 14,
      zoomControl: false, // phone-first: pinch to zoom
      attributionControl: true,
      // Phone-first: let the page scroll; drag/pinch to move the map.
      scrollWheelZoom: false,
    })
    mapRef.current = map

    // Satellite imagery
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 18, attribution: 'Imagery &copy; Esri' }
    ).addTo(map)
    // Place-name / road labels on top (Google-like hybrid look)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 18, opacity: 0.9 }
    ).addTo(map)

    // You + nearby skiers — green, no labels
    L.marker(YOU, { icon: gpsIcon('safe'), interactive: false }).addTo(map)
    WHITE_SLOPE_GREEN_MARKERS.forEach((position) => {
      L.marker(position, { icon: gpsIcon('safe'), interactive: false }).addTo(map)
    })

    // Hazards — red, only after 10s
    const t = setTimeout(() => {
      hazardMarker.current = []
      WHITE_SLOPE_RED_HAZARDS.forEach((position) => {
        hazardMarker.current.push(
          L.marker(position, { icon: gpsIcon('danger') }).addTo(map)
        )
      })
      setAlert(true)
    }, 10000)

    // Leaflet needs a size recalculation once laid out in the flex column.
    const ro = new ResizeObserver(() => map.invalidateSize())
    ro.observe(containerRef.current)

    return () => {
      clearTimeout(t)
      ro.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [])

  const focusHazard = () => {
    if (mapRef.current) mapRef.current.flyTo(WHITE_SLOPE_RED_HAZARDS[0], 15, { duration: 0.8 })
  }
  const zoom = (dir) => {
    if (mapRef.current) dir > 0 ? mapRef.current.zoomIn() : mapRef.current.zoomOut()
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Legend */}
      <div className="absolute top-3 left-3 z-[500] glass rounded-full px-3 h-8 flex items-center gap-1.5 text-[11px] font-semibold text-navy shadow-frost">
        <span className="w-2 h-2 rounded-full bg-safe animate-pulse" /> Gulmarg Ski Map · Live GPS
      </div>

      {/* Zoom in / out */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-[500] flex flex-col rounded-xl overflow-hidden shadow-float divide-y divide-perimeter">
        <button onClick={() => zoom(1)} className="w-9 h-9 grid place-items-center bg-white/90 text-navy active:bg-frost">
          <Plus size={18} />
        </button>
        <button onClick={() => zoom(-1)} className="w-9 h-9 grid place-items-center bg-white/90 text-navy active:bg-frost">
          <Minus size={18} />
        </button>
      </div>

      {/* Hazard alert card — slides up when the red marker appears */}
      <AnimatePresence>
        {alert && (
          <motion.button
            key="alertcard"
            onClick={focusHazard}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="absolute bottom-3 left-3 right-3 z-[500] rounded-card bg-danger text-white px-4 py-3 flex items-center gap-3 shadow-modal text-left"
          >
            <TriangleAlert size={20} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-extrabold leading-tight">Possible fall detected nearby</div>
              <div className="text-[11px] text-white/85 leading-tight">A skier ~380m away · tap to view the red marker</div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
