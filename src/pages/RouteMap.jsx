import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Plus, Minus, LocateFixed, Layers, Mountain, Star, ChevronRight, ListTree } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { PrimaryButton, SecondaryButton } from '../components/ui/Button.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { routes } from '../data/mock.js'

function CtrlBtn({ children }) {
  return (
    <button className="w-9 h-9 grid place-items-center bg-white/90 text-navy first:rounded-t-xl last:rounded-b-xl active:bg-frost">
      {children}
    </button>
  )
}

export default function RouteMap() {
  const { id } = useParams()
  const navigate = useNavigate()
  const route = routes.find((r) => r.id === id)
  if (!route) return <Navigate to="/routes" replace />
  const others = routes.filter((r) => r.id !== id)

  return (
    <PageTransition>
      <div className="relative h-full">
        {/* ---- Map area ---- */}
        <div className="relative h-[64vh] max-h-[560px] overflow-hidden bg-gradient-to-b from-[#eaf4fb] via-[#e2eefb] to-[#d7e8f5]">
          <svg width="100%" height="100%" viewBox="0 0 360 560" preserveAspectRatio="xMidYMid slice">
            {/* faint contour lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M-20 ${120 + i * 90} C 90 ${80 + i * 90}, 240 ${170 + i * 90}, 380 ${110 + i * 90}`} fill="none" stroke="#bcd6ea" strokeWidth="1.4" opacity="0.5" />
            ))}
            {/* pine dots */}
            {Array.from({ length: 22 }).map((_, i) => (
              <path key={'p' + i} d="M0 0 l4 10 l-8 0 Z" fill="#a9cbe2" opacity="0.55" transform={`translate(${20 + (i * 71) % 340} ${360 + ((i * 47) % 170)})`} />
            ))}

            {/* other routes — thin dashed */}
            <path d="M110 300 C 150 240, 190 180, 250 96" fill="none" stroke="#8fb4cf" strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" />
            <path d="M70 470 C 110 440, 130 430, 165 470" fill="none" stroke="#8fb4cf" strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" />

            {/* selected route — leaf-shaped ski track */}
            <path d="M255 90 C 305 200, 250 360, 158 476" fill="none" stroke={route.color === '#0E2A47' ? '#0E2A47' : route.color} strokeOpacity="0.35" strokeWidth="16" strokeLinecap="round" />
            <path d="M255 90 C 205 210, 205 370, 158 476" fill="none" stroke="#3B9CE0" strokeOpacity="0.35" strokeWidth="16" strokeLinecap="round" />
            <path d="M255 90 C 255 220, 200 370, 158 476" fill="none" stroke="#3B9CE0" strokeWidth="4" strokeLinecap="round" />
            <path d="M255 90 C 255 220, 200 370, 158 476" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" />

            {/* summit node */}
            <g transform="translate(255 90)">
              <circle r="9" fill="#0E2A47" />
              <circle r="4" fill="#fff" />
              <circle r="14" fill="none" stroke="#0E2A47" strokeOpacity="0.3" strokeWidth="2" />
            </g>
            {/* base node */}
            <g transform="translate(158 476)">
              <circle r="8" fill="#fff" stroke="#0E2A47" strokeWidth="3" />
            </g>
            {/* pink waypoint */}
            <circle cx="185" cy="255" r="7" fill="none" stroke="#EC4899" strokeWidth="3" />
          </svg>

          {/* Back button */}
          <button
            onClick={() => navigate('/routes')}
            className="absolute top-3 left-4 h-10 pl-2 pr-3.5 rounded-full glass flex items-center gap-1 text-[13px] font-semibold text-navy shadow-float"
          >
            <ChevronLeft size={19} /> Full mountain
          </button>

          {/* difficulty legend */}
          <div className="absolute top-16 left-4 glass rounded-full px-3 h-8 flex items-center gap-2.5 text-[11px] font-bold shadow-frost">
            <span className="flex items-center gap-1 text-slope"><span className="w-2 h-2 rounded-full bg-slope" /> Beg</span>
            <span className="flex items-center gap-1 text-glacier"><span className="w-2 h-2 rounded-full bg-glacier" /> Int</span>
            <span className="flex items-center gap-1 text-navy">◆ Exp</span>
          </div>

          {/* map controls */}
          <div className="absolute top-3 right-4 flex flex-col gap-2">
            <div className="flex flex-col rounded-xl overflow-hidden shadow-float divide-y divide-perimeter">
              <CtrlBtn><Plus size={17} /></CtrlBtn>
              <CtrlBtn><Minus size={17} /></CtrlBtn>
            </div>
            <div className="rounded-xl overflow-hidden shadow-float"><CtrlBtn><LocateFixed size={17} className="text-glacier" /></CtrlBtn></div>
            <div className="rounded-xl overflow-hidden shadow-float"><CtrlBtn><Layers size={17} /></CtrlBtn></div>
          </div>

          {/* peak labels */}
          <div className="absolute" style={{ left: '30%', top: '20%' }}>
            <Chip tone="default" className="shadow-float !bg-white/90"><Mountain size={12} /> Apharwat Peak · 3,980m</Chip>
          </div>
          <div className="absolute" style={{ left: '20%', top: '86%' }}>
            <Chip tone="default" className="shadow-float !bg-white/90"><Mountain size={12} /> Kongdoori · 3,050m</Chip>
          </div>

          {/* other route labels */}
          {others.map((r, i) => (
            <div key={r.id} className="absolute" style={{ left: i === 0 ? '6%' : '4%', top: i === 0 ? '40%' : '78%' }}>
              <div className="flex items-center gap-1.5 bg-white/90 rounded-full px-2.5 h-7 shadow-frost text-[11px] font-semibold text-navy">
                <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                {r.short} <span className="nums text-slope">{r.temp}°C</span> · {r.status}
              </div>
            </div>
          ))}

          {/* selected route node bubble */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute flex items-stretch rounded-2xl overflow-hidden shadow-modal"
            style={{ left: '30%', top: '54%' }}
          >
            <div className="bg-navy text-white px-3 py-2">
              <div className="text-[13px] font-extrabold leading-tight">{route.short}</div>
              <div className="text-[11px] text-ice/90 leading-tight">◆ {route.peak}</div>
            </div>
            <div className="bg-glacier text-white px-3 py-2 flex flex-col justify-center">
              <div className="flex items-center gap-1 text-[11px] font-bold"><Star size={11} fill="#fff" /> {route.condition}</div>
            </div>
          </motion.div>
        </div>

        {/* ---- Bottom info sheet ---- */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="px-5 pt-4"
        >
          <div className="flex items-center gap-2 mb-1">
            {route.optimal && <Chip tone="glacier">★ Optimal now</Chip>}
            <Chip tone="frost">◆ {route.grade}</Chip>
            <span className="nums text-[12px] text-slope">{route.length} km</span>
          </div>
          <h1 className="text-[19px] font-extrabold text-navy">{route.name}</h1>
          <p className="text-[12px] text-slope">{route.condition} · {route.difficulty} · {route.duration}</p>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-frost/70 py-2">
              <div className="nums text-[15px] font-bold text-navy">{route.elevationDrop}m</div>
              <div className="text-[10px] text-slope">Drop</div>
            </div>
            <div className="rounded-xl bg-frost/70 py-2">
              <div className="nums text-[15px] font-bold text-navy">{route.temp}°C</div>
              <div className="text-[10px] text-slope">Now</div>
            </div>
            <div className="rounded-xl bg-frost/70 py-2">
              <div className="text-[15px] font-bold text-safe">{route.status}</div>
              <div className="text-[10px] text-slope">Status</div>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <PrimaryButton onClick={() => navigate(`/routes/${id}/forecast`)}>
              <ListTree size={17} /> View 3-hour safety forecast <ChevronRight size={16} />
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/routes')}>
              <ChevronLeft size={16} /> Back to full mountain
            </SecondaryButton>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
