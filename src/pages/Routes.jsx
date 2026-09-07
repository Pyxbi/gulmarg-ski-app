import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wind, Eye, Snowflake, CloudSnow, MoveHorizontal, ChevronRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import StatusHeader from '../components/StatusHeader.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { currentWeather, routes } from '../data/mock.js'

function WeatherStat({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-0.5 flex-1">
      <Icon size={15} className="text-glacier" />
      <span className="nums text-[13px] font-bold text-navy">{value}</span>
      <span className="text-[9px] text-slope uppercase tracking-wide">{label}</span>
    </div>
  )
}

export default function Routes() {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, sl: 0, moved: false })

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // Start centered on the mountain.
    el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.42

    const st = drag.current
    const down = (e) => {
      if (e.pointerType === 'touch') return // phones scroll natively
      st.active = true
      st.startX = e.clientX
      st.sl = el.scrollLeft
      st.moved = false
      el.style.cursor = 'grabbing'
      e.preventDefault()
    }
    const move = (e) => {
      if (!st.active) return
      const dx = e.clientX - st.startX
      if (Math.abs(dx) > 4) st.moved = true
      el.scrollLeft = st.sl - dx
    }
    const up = () => {
      st.active = false
      el.style.cursor = 'grab'
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <PageTransition>
      <StatusHeader
        eyebrow={currentWeather.zone}
        title={`${currentWeather.temp}°C · High Elevation`}
        right={<Chip tone="safe">● {currentWeather.status}</Chip>}
      />

      <div className="px-5 pt-1 pb-5">
        <div className="glass-2 rounded-card px-2 py-3.5 flex items-center">
          <WeatherStat icon={Wind} label="Wind" value={`${currentWeather.wind}`} />
          <div className="w-px h-8 bg-perimeter" />
          <WeatherStat icon={Eye} label="Vis km" value={currentWeather.visibility} />
          <div className="w-px h-8 bg-perimeter" />
          <WeatherStat icon={Snowflake} label="Snow cm" value={currentWeather.snowDepth} />
          <div className="w-px h-8 bg-perimeter" />
          <WeatherStat icon={CloudSnow} label="3h snow" value={`${currentWeather.snowChance}%`} />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <h2 className="text-[15px] font-extrabold text-navy leading-tight">Mt. Apharwat · Trail Map</h2>
          <span className="text-[11px] text-slope flex items-center gap-1 shrink-0">
            <MoveHorizontal size={13} /> Drag to explore
          </span>
        </div>
      </div>

      {/* Pannable panorama — drag with mouse, swipe on touch, or use arrows */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="relative overflow-x-auto overflow-y-hidden no-scrollbar overscroll-x-contain cursor-grab select-none"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
        >
          <div className="relative h-[62vh] max-h-[520px] w-max">
            <img
              src="/mountain-panorama.jpg"
              alt="Mt. Apharwat panorama"
              className="h-full w-auto max-w-none block pointer-events-none"
              draggable={false}
            />
            {routes.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.12, type: 'spring', stiffness: 300, damping: 16 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => {
                  if (drag.current.moved) return // ignore click after a drag
                  navigate(`/routes/${r.id}`)
                }}
                className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center"
                style={{ left: `${r.pin.x}%`, top: `${r.pin.y}%` }}
              >
                <div
                  className="px-3 h-9 rounded-full flex items-center gap-1.5 text-[12px] font-bold border-2 border-white shadow-float whitespace-nowrap"
                  style={{ background: r.color, color: r.color === '#10B981' ? '#0E2A47' : '#fff' }}
                >
                  {r.short}
                  <span className="nums opacity-90">{r.temp}°</span>
                </div>
                <span className="w-0.5 h-4 bg-white/90" />
                <span className="w-3 h-3 rounded-full border-2 border-white shadow" style={{ background: r.color }} />
                <motion.span
                  className="absolute bottom-0 w-4 h-4 rounded-full"
                  style={{ background: r.color, opacity: 0.4 }}
                  animate={{ scale: [1, 2.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-24">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[13px] font-bold uppercase tracking-wide text-navy">All routes</h3>
          <span className="text-[11px] text-slope">{routes.length} open · scroll for more</span>
        </div>

        <div className="space-y-2.5">
          {routes.map((r) => (
            <motion.button
              key={r.id}
              whileTap={{ scale: 0.985 }}
              onClick={() => navigate(`/routes/${r.id}`)}
              className="w-full flex items-center gap-3 rounded-card bg-white border border-perimeter shadow-frost p-3 text-left"
            >
              <span
                className="w-10 h-10 rounded-xl grid place-items-center text-white text-[11px] font-extrabold shrink-0"
                style={{ background: r.color, color: r.color === '#10B981' ? '#0E2A47' : '#fff' }}
              >
                {r.short.replace('Route ', '')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-bold text-navy flex items-center gap-1.5">
                  {r.name.split('—')[1]?.trim() || r.name}
                  {r.optimal && <Chip tone="glacier" className="!h-5 !px-1.5 !text-[9px]">★ Optimal</Chip>}
                </div>
                <div className="text-[12px] text-slope truncate">
                  {r.grade} · {r.difficulty} · {r.length} km
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="nums text-[14px] font-bold text-navy">{r.temp}°C</span>
                <span className="text-[10px] text-safe font-semibold">{r.status}</span>
              </div>
              <ChevronRight size={18} className="text-slope shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
