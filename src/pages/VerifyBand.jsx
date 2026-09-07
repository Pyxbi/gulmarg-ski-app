import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Nfc } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import StatusHeader from '../components/StatusHeader.jsx'
import StepBar from '../components/StepBar.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import WatchGraphic from '../components/WatchGraphic.jsx'
import { band } from '../data/mock.js'

const PIN = band.id.replace('-', '').slice(-4) // 4821

export default function VerifyBand() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const verified = code === PIN

  return (
    <PageTransition>
      <StatusHeader back title="Verify Band Code" eyebrow="Step 2 of 4" />
      <StepBar step={2} />

      <div className="px-5 pt-4 pb-8">
        <div className="flex flex-col items-center">
          <WatchGraphic size={120} />
          <p className="mt-2 text-[13px] text-slope text-center max-w-[260px]">
            Enter the 4-digit band code shown when you first activated Band <span className="font-semibold text-navy">#{band.id}</span>.
          </p>
        </div>

        {/* code input */}
        <div className="mt-6">
          <label className="text-[11px] font-bold uppercase tracking-wide text-slope">Band code</label>
          <div className="mt-2 relative">
            <input
              inputMode="numeric"
              maxLength={4}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="4821"
              className="w-full h-14 rounded-card bg-white border-[1.5px] border-perimeter px-4 text-[22px] font-bold tracking-[0.4em] nums text-navy outline-none focus:border-glacier focus:ring-4 focus:ring-ice/60 transition"
            />
            {verified && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-safe">
                <CheckCircle2 size={24} />
              </motion.span>
            )}
          </div>
          <p className="mt-2 text-[11px] text-slope flex items-center gap-1">
            <Nfc size={13} className="text-glacier" /> Or tap your band on the kiosk NFC pad to auto-fill.
          </p>
          <button onClick={() => setCode(PIN)} className="mt-1 text-[11px] font-semibold text-glacier">
            Demo: auto-fill code
          </button>
        </div>

        <div className="mt-8">
          <PrimaryButton disabled={!verified} onClick={() => navigate('/return/method')} className={!verified ? 'opacity-40 pointer-events-none' : ''}>
            Verify & Continue <ChevronRight size={17} />
          </PrimaryButton>
        </div>
      </div>
    </PageTransition>
  )
}
