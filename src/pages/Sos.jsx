import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertOctagon, Heart, Mountain, Snowflake, Radio, MapPin, X, PhoneCall } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'

export default function Sos() {
  const navigate = useNavigate()
  const [count, setCount] = useState(18)

  useEffect(() => {
    if (count <= 0) return
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count])

  return (
    <PageTransition>
      <div className="min-h-full bg-gradient-to-b from-[#fff1f2] to-[#fef2f2]">
        {/* Alert banner */}
        <motion.div
          animate={{ opacity: [1, 0.65, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="flex items-center justify-between px-5 py-2.5 bg-danger text-white"
        >
          <span className="flex items-center gap-1.5 text-[12px] font-bold tracking-wide">
            <AlertOctagon size={15} /> IMPACT DETECTED · 14:22:08
          </span>
          <span className="text-[11px] font-bold">● LIVE</span>
        </motion.div>

        <div className="px-5 pt-4 pb-10">
          <p className="text-[13px] font-semibold text-danger">
            Band #GM-3910 registered a high-G deceleration on Route B.
          </p>

          {/* mini map with red dot */}
          <div className="mt-3 relative h-[190px] rounded-card overflow-hidden border border-danger/20 bg-gradient-to-b from-[#eaf4fb] to-[#dceaf6]">
            <svg width="100%" height="100%" viewBox="0 0 360 190" preserveAspectRatio="xMidYMid slice">
              <path d="M0 90 L90 40 L180 80 L360 40 L360 190 L0 190 Z" fill="#ffffff" opacity="0.7" />
            </svg>
            {/* your dot */}
            <div className="absolute w-6 h-6 rounded-full bg-glacier border-[3px] border-white grid place-items-center text-[8px] font-bold text-white" style={{ left: 60, top: 120 }}>You</div>
            {/* red fall dot */}
            <div className="absolute" style={{ left: 210, top: 60 }}>
              <motion.span className="absolute -inset-5 rounded-full bg-danger/30" animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }} transition={{ duration: 1.3, repeat: Infinity }} />
              <div className="relative w-8 h-8 rounded-full bg-danger border-[3px] border-white grid place-items-center">
                <MapPin size={15} className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 glass rounded-full px-2.5 h-7 flex items-center gap-1 text-[10px] font-bold text-danger">
              Mark S. · Fall detected · 85m away
            </div>
          </div>

          {/* victim vitals */}
          <div className="mt-3 rounded-card bg-white border border-danger/20 shadow-frost p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-danger/10 text-danger grid place-items-center font-bold">MS</div>
                <div>
                  <div className="text-[15px] font-bold text-navy">Mark Stevens</div>
                  <div className="text-[11px] text-slope">Band #GM-3910 · Nordic Pro</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-danger">CRITICAL</div>
                <div className="nums text-[11px] text-slope">No motion 45s</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-frost/70 py-2">
                <div className="nums text-[14px] font-bold text-danger flex items-center justify-center gap-1"><Heart size={12} /> 112</div>
                <div className="text-[10px] text-slope">BPM</div>
              </div>
              <div className="rounded-xl bg-frost/70 py-2">
                <div className="nums text-[14px] font-bold text-navy flex items-center justify-center gap-1"><Mountain size={12} /> 3,210</div>
                <div className="text-[10px] text-slope">Alt m</div>
              </div>
              <div className="rounded-xl bg-frost/70 py-2">
                <div className="nums text-[14px] font-bold text-navy flex items-center justify-center gap-1"><Snowflake size={12} /> -7</div>
                <div className="text-[10px] text-slope">°C</div>
              </div>
            </div>
          </div>

          {/* auto-dispatch */}
          <div className="mt-3 rounded-card bg-danger/5 border border-danger/30 p-3.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[12px] font-bold text-danger"><Radio size={14} /> Rescue Auto-Dispatch</span>
              <span className="nums text-[11px] font-bold text-white bg-danger rounded-full px-2 py-0.5">{count}s</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full h-12 rounded-full bg-danger text-white font-bold text-[14px] tracking-wide"
              style={{ boxShadow: '0 6px 18px -2px rgba(225,29,72,0.5)' }}
              onClick={() => navigate('/tracking')}
            >
              CONFIRM · DISPATCH PATROL NOW
            </motion.button>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button onClick={() => navigate('/tracking')} className="h-11 rounded-full bg-white border border-perimeter text-navy font-semibold text-[13px] flex items-center justify-center gap-1.5">
                <MapPin size={15} /> I'm Going
              </button>
              <button onClick={() => navigate('/tracking')} className="h-11 rounded-full bg-white border border-perimeter text-slope font-semibold text-[13px] flex items-center justify-center gap-1.5">
                <X size={15} /> False Alarm
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-card bg-white border border-perimeter px-4 py-3">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-navy">
              <PhoneCall size={16} className="text-glacier" /> Apharwat Base Rescue Radio
            </span>
            <span className="text-[12px] font-bold text-glacier">Call · Ch 4</span>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
