import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Top context bar (NOT navigation): eyebrow + title, optional back + right slot.
export default function StatusHeader({ eyebrow, title, back = false, right, onBack }) {
  const navigate = useNavigate()
  return (
    <div className="px-5 pt-3 pb-2 flex items-center gap-3">
      {back && (
        <button
          onClick={onBack || (() => navigate(-1))}
          className="w-9 h-9 -ml-1 grid place-items-center rounded-full hover:bg-frost active:scale-95 transition"
          aria-label="Back"
        >
          <ChevronLeft size={22} className="text-navy" />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-glacier">
            {eyebrow}
          </div>
        )}
        {title && (
          <h1 className="text-[19px] font-extrabold text-navy leading-tight truncate">
            {title}
          </h1>
        )}
      </div>
      {right}
    </div>
  )
}
