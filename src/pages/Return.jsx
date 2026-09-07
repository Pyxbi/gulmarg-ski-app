import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QrCode, ScanLine, Wallet, ChevronRight, Keyboard } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import StatusHeader from '../components/StatusHeader.jsx'
import StepBar from '../components/StepBar.jsx'
import { PrimaryButton, SecondaryButton } from '../components/ui/Button.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { band } from '../data/mock.js'

export default function Return() {
  const navigate = useNavigate()
  return (
    <PageTransition>
      <StatusHeader eyebrow="Gulmarg Express" title="Return Band & Refund" />
      <StepBar step={1} />

      <div className="px-5 pt-4 pb-8">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-glacier text-white grid place-items-center text-[12px] font-bold">1</span>
          <span className="text-[13px] font-semibold text-navy">Step 1 of 4 · Scan Kiosk QR Screen</span>
        </div>

        <h2 className="mt-4 text-center text-[20px] font-extrabold text-navy">Return your band</h2>
        <p className="mt-1 text-center text-[13px] text-slope leading-relaxed">
          Locate any Gulmarg Express Return Kiosk at Kongdoori or Base station and scan the QR code on the kiosk screen.
        </p>

        <div className="mt-3 flex justify-center">
          <Chip tone="frost">Base Station #04 · Active Drop Chamber ❄</Chip>
        </div>

        {/* QR frame */}
        <div className="mt-5 mx-auto w-56 h-56 relative rounded-hero bg-white border border-perimeter shadow-frost grid place-items-center">
          {['-top-px -left-px', '-top-px -right-px', '-bottom-px -left-px', '-bottom-px -right-px'].map((pos, i) => (
            <span key={i} className={`absolute ${pos} w-8 h-8 border-glacier`} style={{
              borderTopWidth: pos.includes('top') ? 3 : 0,
              borderBottomWidth: pos.includes('bottom') ? 3 : 0,
              borderLeftWidth: pos.includes('left') ? 3 : 0,
              borderRightWidth: pos.includes('right') ? 3 : 0,
              borderTopLeftRadius: pos.includes('top') && pos.includes('left') ? 16 : 0,
              borderTopRightRadius: pos.includes('top') && pos.includes('right') ? 16 : 0,
              borderBottomLeftRadius: pos.includes('bottom') && pos.includes('left') ? 16 : 0,
              borderBottomRightRadius: pos.includes('bottom') && pos.includes('right') ? 16 : 0,
            }} />
          ))}
          <QrCode size={96} className="text-navy" strokeWidth={1.4} />
          <motion.span
            className="absolute left-6 right-6 h-0.5 rounded bg-glacier shadow-glow"
            animate={{ top: [40, 200, 40] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Chip tone="default" className="absolute bottom-3">#04 · DROP</Chip>
        </div>
        <p className="mt-2 text-center text-[11px] text-slope">Align viewfinder with the physical screen on kiosk</p>

        <div className="mt-4 flex items-center gap-3 rounded-card bg-frost/70 border border-ice/60 px-4 py-3">
          <Wallet size={22} className="text-glacier shrink-0" />
          <div className="text-[12px] text-slope leading-snug">
            <span className="nums font-bold text-navy text-[14px]">₹{band.deposit.toLocaleString()}</span> security deposit — credited instantly to your linked UPI / card upon band verification.
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          <PrimaryButton onClick={() => navigate('/return/verify')}>
            <ScanLine size={17} /> Scan Kiosk QR Code <ChevronRight size={16} />
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/return/verify')}>
            <Keyboard size={16} /> Enter Kiosk ID Manually
          </SecondaryButton>
        </div>
      </div>
    </PageTransition>
  )
}
