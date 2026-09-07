export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-card bg-white border border-perimeter shadow-frost p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function Chip({ className = '', children, tone = 'default' }) {
  const tones = {
    default: 'bg-white/85 border-perimeter text-navy',
    frost: 'bg-frost border-ice text-glacier-deep',
    safe: 'bg-safe/10 border-safe/30 text-safe',
    caution: 'bg-caution/10 border-caution/40 text-caution',
    danger: 'bg-danger/10 border-danger/30 text-danger',
    glacier: 'bg-glacier/10 border-glacier/30 text-glacier-deep',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 h-7 rounded-full border text-[11px] font-semibold tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
