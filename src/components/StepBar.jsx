import { motion } from 'framer-motion'

// Horizontal 4-step progress bar for the refund flow.
export default function StepBar({ step, total = 4 }) {
  return (
    <div className="flex items-center gap-1.5 px-5 pt-1">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 h-1.5 rounded-full bg-perimeter overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-glacier"
            initial={{ width: 0 }}
            animate={{ width: i < step ? '100%' : i === step - 1 ? '100%' : '0%' }}
            transition={{ duration: 0.4 }}
          />
        </div>
      ))}
    </div>
  )
}
