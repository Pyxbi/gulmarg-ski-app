import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Download, Snowflake } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import StatusHeader from '../components/StatusHeader.jsx'
import StepBar from '../components/StepBar.jsx'
import { PrimaryButton, SecondaryButton } from '../components/ui/Button.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { band } from '../data/mock.js'

export default function RefundReceipt() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const isCash = state?.method === 'cash'

  const rows = [
    ['Refund Method', isCash ? 'Cash Dispenser' : `UPI Transfer · ${state?.upi || 'arjun@okhdfcbank'}`],
    ['Estimated Time', isCash ? 'Dispensed now at tray #04' : 'Within 2–4 hours · by 18:30 today'],
    ['Reference ID', 'TXN-GLM-893041'],
    ['Return Location', 'Gulmarg Base #04'],
    ['Wristband ID', `${band.id} · Deactivated`],
  ]

  return (
    <PageTransition>
      <StatusHeader title="Return Receipt" eyebrow="Step 4 of 4 · Completed" right={<Chip tone="safe">Done</Chip>} />
      <StepBar step={4} />

      <div className="px-5 pt-6 pb-8">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 240, damping: 16 }} className="flex justify-center">
          <div className="w-16 h-16 rounded-full grid place-items-center text-white" style={{ background: 'linear-gradient(180deg,#3B9CE0,#2B88CB)' }}>
            <CheckCircle2 size={34} />
          </div>
        </motion.div>

        <h1 className="mt-4 text-center text-[24px] font-extrabold text-navy">Refund on the way!</h1>
        <p className="mt-1 text-center text-[13px] text-slope leading-relaxed">
          Your smart wristband <span className="font-semibold text-navy">#{band.id}</span> has been safely received by Kiosk #04 drop chamber.
        </p>

        <div className="mt-5 rounded-hero border border-perimeter shadow-frost overflow-hidden">
          <div className="text-center py-5 bg-frost/50">
            <div className="text-[10px] font-bold uppercase tracking-wide text-slope">Amount Refunded</div>
            <div className="nums text-[30px] font-extrabold text-glacier-deep">₹{band.deposit.toLocaleString()}.00</div>
            <Chip tone="safe" className="mt-1">● Deposit Clearance Approved</Chip>
          </div>
          <div className="divide-y divide-perimeter">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-4 py-3 text-[13px]">
                <span className="text-slope">{k}</span>
                <span className="font-semibold text-navy text-right max-w-[60%]">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-card bg-frost/70 border border-ice/60 px-4 py-3">
          <Snowflake size={20} className="text-glacier shrink-0" />
          <div className="text-[12px] text-slope leading-snug">
            <span className="font-semibold text-navy">Alpine Journey Saved</span> · 14.2 km · 6 Gondola runs · 3,980m peak
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          <PrimaryButton onClick={() => navigate('/welcome')}>Done</PrimaryButton>
          <SecondaryButton><Download size={16} /> Download PDF Receipt / Share</SecondaryButton>
        </div>
      </div>
    </PageTransition>
  )
}
