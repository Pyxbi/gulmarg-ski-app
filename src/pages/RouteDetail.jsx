import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mountain, Clock, TrendingDown, Snowflake, ShieldCheck, AlertTriangle, CheckCircle2, Bookmark, Navigation } from 'lucide-react'
import PageTransition, { listContainer, listItem } from '../components/PageTransition.jsx'
import StatusHeader from '../components/StatusHeader.jsx'
import { PrimaryButton, SecondaryButton } from '../components/ui/Button.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { routes, routeForecast } from '../data/mock.js'

export default function RouteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const route = routes.find((r) => r.id === id)
  if (!route) return <Navigate to="/routes" replace />
  const forecast = routeForecast[id] || []

  return (
    <PageTransition>
      <StatusHeader
        back
        eyebrow="Alpine Descent Corridor"
        title={route.name}
        right={<Chip tone="safe">● Open</Chip>}
      />

      <div className="px-5 pb-8">
        <div className="flex items-center gap-2">
          <Chip tone="default">◆ {route.grade}</Chip>
          <Chip tone="frost">{route.difficulty}</Chip>
          <Chip tone="glacier"><ShieldCheck size={13} /> Patrol Monitored</Chip>
        </div>

        {/* key stats */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-card bg-white border border-perimeter shadow-frost p-3.5">
            <div className="flex items-center gap-1.5 text-slope text-[11px] font-semibold uppercase"><TrendingDown size={13} /> Elevation Drop</div>
            <div className="nums text-[22px] font-extrabold text-navy mt-1">{route.elevationDrop}m</div>
          </div>
          <div className="rounded-card bg-white border border-perimeter shadow-frost p-3.5">
            <div className="flex items-center gap-1.5 text-slope text-[11px] font-semibold uppercase"><Clock size={13} /> Est. Duration</div>
            <div className="nums text-[22px] font-extrabold text-navy mt-1">{route.duration}</div>
          </div>
          <div className="rounded-card bg-white border border-perimeter shadow-frost p-3.5">
            <div className="flex items-center gap-1.5 text-slope text-[11px] font-semibold uppercase"><Snowflake size={13} /> Snow</div>
            <div className="text-[15px] font-bold text-navy mt-1">{route.condition}</div>
          </div>
          <div className="rounded-card bg-white border border-perimeter shadow-frost p-3.5">
            <div className="flex items-center gap-1.5 text-slope text-[11px] font-semibold uppercase"><Mountain size={13} /> Length</div>
            <div className="nums text-[15px] font-bold text-navy mt-1">{route.length} km</div>
          </div>
        </div>

        {/* 3-hour forecast with Safe / Not recommended */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[14px] font-extrabold text-navy">3-Hour Safety Forecast</h2>
            <Chip tone="glacier">Live sensor</Chip>
          </div>
          <motion.div variants={listContainer} initial="initial" animate="animate" className="space-y-2.5">
            {forecast.map((slot) => {
              const safe = slot.verdict === 'Safe'
              return (
                <motion.div
                  key={slot.time}
                  variants={listItem}
                  className={`rounded-card border p-3.5 ${safe ? 'bg-white border-perimeter' : 'bg-caution/5 border-caution/40'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="nums text-[14px] font-bold text-navy">{slot.time}</span>
                    {safe ? (
                      <Chip tone="safe"><CheckCircle2 size={13} /> Safe</Chip>
                    ) : (
                      <Chip tone="caution"><AlertTriangle size={13} /> Not recommended</Chip>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-[12px] text-slope">
                    <span className="nums font-semibold text-navy">{slot.temp}°C</span>
                    <span className="nums">{slot.wind} km/h</span>
                    <span className="truncate">{slot.cond}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
          <p className="mt-2 text-[11px] text-slope flex items-start gap-1.5">
            <AlertTriangle size={13} className="text-caution mt-0.5 shrink-0" />
            "Not recommended" windows carry elevated terrain or weather risk. Ski Patrol advises avoiding these times.
          </p>
        </div>

        <div className="mt-5 space-y-2.5">
          <PrimaryButton onClick={() => navigate('/tracking')}>
            <Navigation size={17} /> Start Navigation
          </PrimaryButton>
          <SecondaryButton>
            <Bookmark size={16} /> Save Route to Smart Band
          </SecondaryButton>
        </div>
      </div>
    </PageTransition>
  )
}
