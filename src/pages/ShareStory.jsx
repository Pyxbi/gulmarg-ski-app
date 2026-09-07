import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Download, Link2, MoreHorizontal, Instagram, Mountain, Check } from 'lucide-react'
import { runSummary as R } from '../data/mock.js'

// Strava-style "Share to Story" sheet, Gulmarg-branded.
function StoryFrame({ transparent, data }) {
  return (
    <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shrink-0">
      {/* background */}
      {transparent ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#3a3a3a',
            backgroundImage:
              'linear-gradient(45deg,#4a4a4a 25%,transparent 25%),linear-gradient(-45deg,#4a4a4a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#4a4a4a 75%),linear-gradient(-45deg,transparent 75%,#4a4a4a 75%)',
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0,0 14px,14px -14px,-14px 0',
          }}
        />
      ) : (
        <div className="absolute inset-0">
          <img src="/ski-story.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          {/* subtle gradient for text legibility */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.35) 100%)' }} />
        </div>
      )}

      {/* label */}
      {transparent && (
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md border border-white/70 text-white text-[10px] font-bold tracking-widest">
          TRANSPARENT
        </div>
      )}

      {/* metrics — around the skier's head */}
      <div
        className="absolute inset-x-0 top-[29%] flex flex-col items-center text-white text-center px-5"
        style={{ textShadow: transparent ? 'none' : '0 1px 5px rgba(0,0,0,0.45)' }}
      >
        <div className="space-y-5">
          {[
            { label: 'Distance', value: `${data.distance} km` },
            { label: 'Top Speed', value: `${data.topSpeed} km/h` },
            { label: 'Time', value: data.time },
          ].map((m) => (
            <div key={m.label}>
              <div className="text-[11px] font-semibold text-white/80 mb-0.5">{m.label}</div>
              <div className="nums text-[24px] font-extrabold leading-none tracking-tight">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* route trace + wordmark grouped near the bottom third */}
      <div
        className="absolute inset-x-0 top-[64%] flex flex-col items-center text-white"
        style={{ textShadow: transparent ? 'none' : '0 1px 5px rgba(0,0,0,0.45)' }}
      >
        <svg width="130" height="60" viewBox="0 0 130 60">
          <path d="M18 12 C 40 18, 30 40, 58 42 S 92 36, 108 54" fill="none" stroke="#3B9CE0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="mt-2 flex items-center gap-1.5 font-extrabold tracking-tight text-[15px]">
          <Mountain size={16} className="text-glacier" /> GULMARG SKI
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 w-16">
      <span className="w-12 h-12 rounded-full bg-frost grid place-items-center text-navy">
        <Icon size={20} />
      </span>
      <span className="text-[11px] text-navy text-center leading-tight">{label}</span>
    </button>
  )
}

export default function ShareStory() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = {
    distance: location.state?.distance ?? R.distance,
    topSpeed: location.state?.topSpeed ?? R.topSpeed,
    time: location.state?.time ?? R.time,
    title: location.state?.title ?? R.title,
  }
  const [page, setPage] = useState(0)
  const [toast, setToast] = useState('')

  const flash = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 1800)
  }
  const shareUrl = `https://gulmarg.ski/run/GM-4821`
  const copy = async (msg) => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      flash(msg)
    } catch {
      flash('Copied')
    }
  }
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Gulmarg run', text: `${data.distance} km · ${data.time}`, url: shareUrl })
      } catch {
        /* dismissed */
      }
    } else {
      flash('Sharing…')
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* top bar */}
      <div className="flex items-center px-4 h-14 border-b border-perimeter shrink-0">
        <button onClick={() => navigate(-1)} className="text-[15px] font-semibold text-navy">Close</button>
        <h1 className="flex-1 text-center text-[16px] font-extrabold text-navy">Share Activity</h1>
        <span className="w-12" />
      </div>

      {/* frames — swipe horizontally */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="min-h-full flex flex-col">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[11%] py-5"
            onScroll={(e) => {
              const el = e.currentTarget
              setPage(Math.round(el.scrollLeft / (el.scrollWidth / 2)))
            }}
          >
            <div className="snap-center shrink-0 w-full"><StoryFrame transparent={false} data={data} /></div>
            <div className="snap-center shrink-0 w-full"><StoryFrame transparent data={data} /></div>
          </div>

          {/* page dots */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1].map((i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-colors ${page === i ? 'bg-navy' : 'bg-perimeter'}`} />
            ))}
          </div>

          {/* share to — pushed toward the bottom */}
          <div className="mt-auto px-6 pt-4 pb-10">
          <h2 className="text-[15px] font-extrabold text-navy mb-4">Share to</h2>
          <button onClick={nativeShare} className="flex items-center gap-3 mb-5">
            <span className="w-12 h-12 rounded-full grid place-items-center text-white" style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
              <Instagram size={22} />
            </span>
            <span className="text-[14px] font-semibold text-navy">Instagram Story</span>
          </button>

          <div className="flex justify-between max-w-[320px]">
            <ActionBtn icon={Copy} label="Copy to Clipboard" onClick={() => copy('Copied to clipboard')} />
            <ActionBtn icon={Download} label="Save" onClick={() => flash('Saved to Photos')} />
            <ActionBtn icon={Link2} label="Copy Link" onClick={() => copy('Link copied')} />
            <ActionBtn icon={MoreHorizontal} label="More" onClick={nativeShare} />
          </div>
          </div>
        </div>
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-navy text-white px-4 h-10 text-[13px] font-semibold shadow-modal"
          >
            <Check size={16} className="text-safe" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
