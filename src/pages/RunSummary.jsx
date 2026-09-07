import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Share2, Route as RouteIcon, ArrowDownRight, Timer, Gauge, Snowflake, Zap, ShieldCheck, Cloud, ChevronLeft } from 'lucide-react'
import PageTransition, { listContainer, listItem } from '../components/PageTransition.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import { StatTile } from '../components/ui/StatTile.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { runSummary as R } from '../data/mock.js'

const badgeIcons = { 'Powder Master': Snowflake, 'Speed Demon': Zap, 'G-Force Stable': ShieldCheck }

const fmt = (s) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`

export default function RunSummary() {
  const navigate = useNavigate()
  const location = useLocation()
  const elapsed = location.state?.elapsed
  const timeStr = elapsed != null ? fmt(elapsed) : R.time
  const share = () =>
    navigate('/tracking/share', {
      state: { distance: R.distance, vertical: R.vertical, time: timeStr, topSpeed: R.topSpeed, route: R.route, title: R.title },
    })
  return (
    <PageTransition>
      {/* Hero header with traced route */}
      <div className="relative px-5 pt-4 pb-6 text-white overflow-hidden" style={{ background: 'linear-gradient(135deg,#0E2A47 0%,#1c4e7a 60%,#2B88CB 100%)' }}>
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/tracking')} className="w-9 h-9 grid place-items-center rounded-full bg-white/15">
            <ChevronLeft size={20} />
          </button>
          <Chip tone="glacier" className="!bg-white/15 !border-white/20 !text-white">Run Completed</Chip>
          <button onClick={share} className="w-9 h-9 grid place-items-center rounded-full bg-white/15"><Share2 size={17} /></button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px] text-ice/80">
          <RouteIcon size={13} /> {R.route}
        </div>
        <h1 className="text-[24px] font-extrabold leading-tight">{R.title}</h1>
        {/* traced path */}
        <svg className="mt-2" width="100%" height="70" viewBox="0 0 320 70">
          <motion.path
            d="M10 60 C 60 20, 110 55, 160 25 S 260 55, 310 15"
            fill="none"
            stroke="#BFE0F5"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="px-5 pb-8 -mt-2">
        <div className="flex items-center gap-2.5 rounded-card bg-white border border-perimeter shadow-frost p-3">
          <div className="w-10 h-10 rounded-full bg-glacier text-white grid place-items-center font-bold text-[13px]">AS</div>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-bold text-navy">Arjun Sharma</div>
            <div className="text-[11px] text-slope">Smart Band #GM-4821 · RFID Verified</div>
          </div>
          <Chip tone="safe">● Synced</Chip>
        </div>

        {/* telemetry */}
        <h2 className="mt-5 mb-2 text-[13px] font-bold uppercase tracking-wide text-navy">Descent Telemetry</h2>
        <div className="grid grid-cols-2 gap-2.5">
          <StatTile icon={ArrowDownRight} label="Distance" value={R.distance} unit="km" sub="2.4 km off-piste" />
          <StatTile icon={ArrowDownRight} label="Vertical" value={R.vertical} unit="m" sub="Apharwat → Kongdoori" />
          <StatTile icon={Timer} label="Total Time" value={timeStr} sub="Moving time" />
          <StatTile icon={Gauge} label="Top Speed" value={R.topSpeed} unit="km/h" sub="Sector 2" />
        </div>

        {/* badges */}
        <h2 className="mt-5 mb-2 text-[13px] font-bold uppercase tracking-wide text-navy">Session Highlights</h2>
        <motion.div variants={listContainer} initial="initial" animate="animate" className="space-y-2.5">
          {R.badges.map((b) => {
            const Icon = badgeIcons[b.label] || Cloud
            return (
              <motion.div key={b.label} variants={listItem} className="flex items-center gap-3 rounded-card bg-frost/60 border border-ice/50 p-3">
                <div className="w-10 h-10 rounded-xl bg-white grid place-items-center text-glacier shadow-frost"><Icon size={20} /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-navy">{b.label}</div>
                  <div className="text-[12px] text-slope truncate">{b.detail}</div>
                </div>
                {b.xp && <Chip tone="glacier">+{b.xp} XP</Chip>}
              </motion.div>
            )
          })}
        </motion.div>

        <div className="mt-5 pb-24">
          <PrimaryButton onClick={share}><Share2 size={16} /> Share Run to Story / Social</PrimaryButton>
        </div>
      </div>
    </PageTransition>
  )
}
