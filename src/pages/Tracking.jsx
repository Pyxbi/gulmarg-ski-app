import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Siren, Play, MapPin, Square, CircleDot } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import GulmargMap from '../components/GulmargMap.jsx'

const fmt = (s) => {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}m ${String(sec).padStart(2, '0')}s`
}

export default function Tracking() {
  const navigate = useNavigate()
  const [recording, setRecording] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (recording) {
      timer.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    }
    return () => clearInterval(timer.current)
  }, [recording])

  const start = () => {
    setElapsed(0)
    setRecording(true)
  }
  const finish = () => {
    setRecording(false)
    navigate('/tracking/summary', { state: { elapsed } })
  }

  return (
    <PageTransition>
      <div className="relative h-full flex flex-col">
        <div className="relative flex-1 min-h-0">
          <GulmargMap />

          <button
            onClick={() => navigate('/tracking/sos')}
            className="absolute top-3 right-3 z-[500] flex items-center gap-1 h-8 px-3 rounded-full bg-danger text-white text-[12px] font-bold shadow-float"
          >
            <Siren size={14} /> SOS
          </button>

          {/* Recording pill over the map */}
          {recording && (
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-1.5 h-8 px-3 rounded-full bg-navy/90 text-white text-[12px] font-bold shadow-float"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-danger"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              REC
            </motion.div>
          )}
        </div>

        {/* Bottom action bar */}
        <div className="px-5 pt-3 pb-6 shrink-0">
          {!recording ? (
            <>
              <div className="mb-2.5 flex items-center gap-1.5 text-[12px] text-slope">
                <MapPin size={13} className="text-safe" />
                You are the <span className="font-semibold text-safe">green marker</span> · RTK GPS, high accuracy
              </div>
              <PrimaryButton onClick={start}>
                <Play size={16} /> Record My Journey
              </PrimaryButton>
            </>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-center gap-2 text-navy">
                <CircleDot size={16} className="text-danger" />
                <span className="nums text-[30px] font-extrabold tracking-tight leading-none">{fmt(elapsed)}</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={finish}
                className="flex items-center justify-center gap-2 w-full rounded-full text-white font-semibold text-[15px] h-[54px] bg-danger shadow-[0_4px_14px_rgba(225,29,72,0.35)]"
              >
                <Square size={15} fill="#fff" /> Finish My Journey
              </motion.button>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
