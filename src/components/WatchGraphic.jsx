import { motion } from 'framer-motion'

// Stylised smart ski wristband, with an animated glowing NFC ring.
export default function WatchGraphic({ size = 150 }) {
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full"
        style={{ width: size, height: size, background: 'radial-gradient(circle, rgba(59,156,224,0.35), transparent 65%)' }}
      />
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 100 100" fill="none">
        {/* strap */}
        <rect x="38" y="2" width="24" height="24" rx="7" fill="#0E2A47" />
        <rect x="38" y="74" width="24" height="24" rx="7" fill="#0E2A47" />
        {/* body */}
        <rect x="20" y="20" width="60" height="60" rx="18" fill="#0E2A47" />
        <rect x="24" y="24" width="52" height="52" rx="15" fill="#12325a" />
        {/* face glow */}
        <circle cx="50" cy="50" r="19" fill="#0b2036" stroke="#3B9CE0" strokeWidth="2.5" />
        <path d="M50 40 L50 60 M42 50 L58 50" stroke="#3B9CE0" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="50" r="24" stroke="#3B9CE0" strokeOpacity="0.35" strokeWidth="1.5" />
      </svg>
    </div>
  )
}
