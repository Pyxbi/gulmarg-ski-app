import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BadgeCheck, Compass, CloudSnow, MapPin, Wallet, ChevronRight, BatteryFull, Activity, Snowflake } from 'lucide-react'
import PageTransition, { listContainer, listItem } from '../components/PageTransition.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { band, quickFeatures } from '../data/mock.js'

const icons = { Compass, CloudSnow, MapPin, Wallet }

export default function Welcome() {
  const navigate = useNavigate()
  return (
    <PageTransition>
      <div className="px-5 pt-5 pb-8">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="flex justify-center">
          <div className="w-12 h-12 rounded-full grid place-items-center text-white" style={{ background: 'linear-gradient(180deg,#3B9CE0,#2B88CB)' }}>
            <BadgeCheck size={26} />
          </div>
        </motion.div>
        <h1 className="mt-3 text-center text-[26px] font-extrabold text-navy leading-tight">You're all set!</h1>
        <p className="mt-1 text-center text-[13px] text-slope">
          Band <span className="font-semibold text-navy">#{band.id}</span> is live and synced for the Gulmarg slopes.
        </p>

        {/* Pass card */}
        <div className="mt-5 rounded-hero p-4 text-white overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#0E2A47 0%,#1c4e7a 55%,#2B88CB 100%)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-ice/90">Alpine Access Token</div>
              <div className="text-[17px] font-extrabold">{band.tier}</div>
            </div>
            <Snowflake size={26} className="text-ice/70" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/10 px-3 py-2">
              <div className="text-[10px] text-ice/80 flex items-center gap-1"><BatteryFull size={12} /> Battery</div>
              <div className="nums text-[15px] font-bold">{band.battery}%</div>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2">
              <div className="text-[10px] text-ice/80 flex items-center gap-1"><Activity size={12} /> Fall Sensor</div>
              <div className="text-[15px] font-bold text-emerald-300">Active</div>
            </div>
          </div>
        </div>

        {/* Quick-start */}
        <div className="mt-6 flex items-center justify-between mb-2">
          <h2 className="text-[13px] font-bold uppercase tracking-wide text-navy">Quick-start</h2>
          <span className="text-[11px] text-slope">Essential features</span>
        </div>
        <motion.div variants={listContainer} initial="initial" animate="animate" className="space-y-2.5">
          {quickFeatures.map((f) => {
            const Icon = icons[f.icon]
            return (
              <motion.button
                key={f.key}
                variants={listItem}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(f.to)}
                className="w-full flex items-center gap-3 rounded-card bg-white border border-perimeter p-3 shadow-frost text-left"
              >
                <div className="w-10 h-10 grid place-items-center rounded-xl bg-frost text-glacier shrink-0">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-navy">{f.title}</div>
                  <div className="text-[12px] text-slope truncate">{f.desc}</div>
                </div>
                <Chip tone="frost">{f.badge}</Chip>
                <ChevronRight size={18} className="text-slope shrink-0" />
              </motion.button>
            )
          })}
        </motion.div>

        <div className="mt-6">
          <PrimaryButton onClick={() => navigate('/routes')}>
            Start Skiing <ChevronRight size={18} />
          </PrimaryButton>
        </div>
      </div>
    </PageTransition>
  )
}
