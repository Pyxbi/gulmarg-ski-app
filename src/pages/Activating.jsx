import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import { band } from '../data/mock.js'

const steps = ['Pairing wristband over NFC', 'Syncing lift pass & booking', 'Enabling safety beacon']

export default function Activating() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 850)
    const done = setTimeout(() => navigate('/welcome'), 2900)
    return () => {
      clearInterval(t1)
      clearTimeout(done)
    }
  }, [navigate])

  return (
    <PageTransition>
      <div className="h-full flex flex-col items-center justify-center px-8 text-center">
        <div className="relative w-40 h-40 grid place-items-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border-2 border-glacier/40"
              initial={{ width: 60, height: 60, opacity: 0.8 }}
              animate={{ width: 160, height: 160, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.66, ease: 'easeOut' }}
            />
          ))}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-[3px] border-glacier/20 border-t-glacier"
          />
        </div>

        <h1 className="mt-8 text-[22px] font-extrabold text-navy">Activating your band…</h1>
        <p className="mt-1 text-[13px] text-slope">Band #{band.id}</p>

        <div className="mt-6 space-y-2 w-full max-w-[260px]">
          {steps.map((s, i) => (
            <motion.div
              key={s}
              animate={{ opacity: i <= step ? 1 : 0.35 }}
              className="flex items-center gap-2 text-[13px] font-medium text-navy"
            >
              <span className={`w-2 h-2 rounded-full ${i < step ? 'bg-safe' : i === step ? 'bg-glacier' : 'bg-perimeter'}`} />
              {s}
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
