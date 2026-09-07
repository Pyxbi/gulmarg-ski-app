import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Banknote, Landmark, Check, ChevronRight, ShieldCheck } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import StatusHeader from '../components/StatusHeader.jsx'
import StepBar from '../components/StepBar.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { band } from '../data/mock.js'

const methods = [
  { id: 'cash', icon: Banknote, title: 'Cash Dispenser', tag: 'Instant · ₹0 fee', desc: 'Notes dispense at Kiosk #04 tray the moment the band drops in.' },
  { id: 'bank', icon: Landmark, title: 'Bank Transfer (UPI / IMPS)', tag: 'Direct to account', desc: 'Refunded automatically within 4 hours to your UPI ID.' },
]

export default function RefundMethod() {
  const navigate = useNavigate()
  const [sel, setSel] = useState('bank')
  const [upi, setUpi] = useState('arjun@okhdfcbank')

  return (
    <PageTransition>
      <StatusHeader back title="Refund Method" eyebrow="Step 3 of 4" />
      <StepBar step={3} />

      <div className="px-5 pt-4 pb-8">
        <div className="rounded-card bg-frost/70 border border-ice/60 p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slope">Refundable deposit</div>
            <div className="nums text-[22px] font-extrabold text-navy">₹{band.deposit.toLocaleString()}</div>
            <div className="text-[11px] text-slope">Band #{band.id} accepted at Kiosk #04</div>
          </div>
          <ShieldCheck size={30} className="text-glacier" />
        </div>

        <h2 className="mt-5 text-[15px] font-extrabold text-navy">Choose refund method</h2>
        <div className="mt-3 space-y-2.5">
          {methods.map((m) => {
            const active = sel === m.id
            return (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSel(m.id)}
                className={`w-full text-left rounded-card border p-3.5 flex gap-3 transition ${active ? 'bg-white border-glacier ring-2 ring-ice' : 'bg-white border-perimeter'}`}
              >
                <div className={`w-11 h-11 rounded-xl grid place-items-center shrink-0 ${active ? 'bg-glacier text-white' : 'bg-frost text-glacier'}`}>
                  <m.icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-navy">{m.title}</span>
                  </div>
                  <Chip tone="frost" className="mt-1">{m.tag}</Chip>
                  <p className="mt-1.5 text-[12px] text-slope leading-snug">{m.desc}</p>
                </div>
                <span className={`w-5 h-5 rounded-full border-2 grid place-items-center shrink-0 mt-1 ${active ? 'border-glacier bg-glacier text-white' : 'border-perimeter'}`}>
                  {active && <Check size={13} />}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* bank details */}
        <motion.div initial={false} animate={{ height: sel === 'bank' ? 'auto' : 0, opacity: sel === 'bank' ? 1 : 0 }} className="overflow-hidden">
          <div className="mt-3 rounded-card bg-white border border-perimeter p-3.5">
            <label className="text-[11px] font-bold uppercase tracking-wide text-slope">UPI ID or Virtual Payment Address</label>
            <input
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              className="mt-2 w-full h-12 rounded-xl bg-glacierwhite border-[1.5px] border-perimeter px-3 text-[15px] font-semibold text-navy outline-none focus:border-glacier focus:ring-4 focus:ring-ice/60 transition"
            />
            <div className="mt-2 flex gap-1.5 flex-wrap">
              {['@okhdfcbank', '@oksbi', '@paytm'].map((h) => (
                <button key={h} onClick={() => setUpi('arjun' + h)} className="text-[11px] font-semibold text-glacier bg-frost rounded-full px-2.5 py-1">{h}</button>
              ))}
            </div>
            <p className="mt-2 text-[10.5px] text-slope">🔒 RBI-regulated 256-bit encrypted merchant refund, credited directly from the original source account.</p>
          </div>
        </motion.div>

        <div className="mt-5">
          <PrimaryButton onClick={() => navigate('/return/receipt', { state: { method: sel, upi } })}>
            Confirm Refund Method <ChevronRight size={17} />
          </PrimaryButton>
          <p className="mt-2 text-center text-[11px] text-slope nums">Kiosk session expires in 02:45 min</p>
        </div>
      </div>
    </PageTransition>
  )
}
