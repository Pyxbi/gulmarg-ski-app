// A telemetry tile: big tabular number + label + optional unit/sub.
export function StatTile({ label, value, unit, sub, icon: Icon, className = '' }) {
  return (
    <div className={`rounded-card bg-frost/70 border border-ice/60 p-3.5 ${className}`}>
      <div className="flex items-center gap-1.5 text-slope text-[11px] font-semibold tracking-wide uppercase">
        {Icon && <Icon size={13} strokeWidth={2.2} />}
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="nums text-[26px] leading-none font-extrabold text-navy">{value}</span>
        {unit && <span className="text-sm font-semibold text-slope">{unit}</span>}
      </div>
      {sub && <div className="mt-0.5 text-[12px] text-slope">{sub}</div>}
    </div>
  )
}
